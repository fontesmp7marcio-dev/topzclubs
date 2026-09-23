import webpush from 'web-push';
import fs from 'fs';
import path from 'path';
import { supabaseAdmin, fetchSharedFavorites, fetchUserBets } from './supabase';
import { USER_FAVORITE_CLUBS_DATA } from '../src/data/favoriteClubs';
import { scrapeFotMobMatchesByDate } from './fotmobScraper';
import { getBrasiliaTodayStr } from '../src/utils/dateUtils';

// Types
export interface NotificationSettings {
  fireTemplate: string;
  lossTemplate: string;
  betProgressTemplate: string;
  betWonTemplate: string;
  betLostTemplate: string;
  notifyFire: boolean;
  notifyLoss: boolean;
  notifyBets: boolean;
}

export interface NotificationLog {
  id: string;
  type: 'foguinho' | 'derrota' | 'bilhete_progresso' | 'bilhete_green' | 'bilhete_red' | 'teste';
  title: string;
  body: string;
  timestamp: string;
  successCount: number;
}

// Helper to extract clean games summary for push notifications
function getBetGamesSummary(bet: any): string {
  if (Array.isArray(bet.legs) && bet.legs.length > 0) {
    const summaryList = bet.legs.map((leg: any) => {
      if (leg.matchTitle) return leg.matchTitle;
      if (leg.team1 && leg.team2) return `${leg.team1} x ${leg.team2}`;
      return leg.marketLabel || leg.market || 'Jogo';
    });
    if (summaryList.length <= 2) {
      return summaryList.join(', ');
    }
    return `${summaryList[0]} + ${summaryList.length - 1} jogo(s)`;
  }
  return bet.title || 'Bilhete';
}

// Default settings
export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  fireTemplate: '🔥 O favorito {time} entrou no Método Foguinho! Fim de jogo: {placar}.',
  lossTemplate: '🔻 O {time} perdeu a partida! Placar final: {placar}.',
  betProgressTemplate: '📊 Jogo encerrado no bilhete "{titulo}" ({jogos})! Faltam apenas {restantes} partida(s).',
  betWonTemplate: '🟢 DEU GREEN! Seu bilhete "{titulo}" ({jogos}) bateu perfeitamente!',
  betLostTemplate: '🔴 Fim de jogo. Seu bilhete "{titulo}" ({jogos}) não bateu desta vez.',
  notifyFire: true,
  notifyLoss: true,
  notifyBets: true,
};

// VAPID keys persistence
const VAPID_FILE = path.join(process.cwd(), 'vapid-keys.json');

let vapidKeys: { publicKey: string; privateKey: string };

try {
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    vapidKeys = {
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY,
    };
  } else if (fs.existsSync(VAPID_FILE)) {
    const raw = fs.readFileSync(VAPID_FILE, 'utf-8');
    vapidKeys = JSON.parse(raw);
  } else {
    vapidKeys = webpush.generateVAPIDKeys();
    fs.writeFileSync(VAPID_FILE, JSON.stringify(vapidKeys, null, 2), 'utf-8');
  }
} catch (e) {
  console.warn('Error loading VAPID keys, generating in-memory keys:', e);
  vapidKeys = webpush.generateVAPIDKeys();
}

// Configure webpush
webpush.setVapidDetails(
  'mailto:contato@topzclubs.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// In-memory fallback stores
let subscriptions: webpush.PushSubscription[] = [];
let currentSettings: NotificationSettings = { ...DEFAULT_NOTIFICATION_SETTINGS };
let notificationLogs: NotificationLog[] = [];
const processedEvents = new Set<string>();

// Helper to get public VAPID key
export function getVapidPublicKey() {
  return vapidKeys.publicKey;
}

// Helper to get settings
export function getNotificationSettings(): NotificationSettings {
  return currentSettings;
}

// Helper to update settings
export async function updateNotificationSettings(newSettings: Partial<NotificationSettings>): Promise<NotificationSettings> {
  currentSettings = { ...currentSettings, ...newSettings };
  try {
    await supabaseAdmin
      .from('notification_settings')
      .upsert({
        id: 1,
        settings: currentSettings,
        updated_at: new Date().toISOString(),
      });
  } catch (err) {
    console.warn('Could not save settings to Supabase, falling back to memory:', err);
  }
  return currentSettings;
}

// Helper to get logs
export function getNotificationLogs(): NotificationLog[] {
  return notificationLogs.slice(-50).reverse();
}

// Load subscriptions and settings from Supabase
export async function loadFromSupabase() {
  try {
    // 1. Load settings
    const { data: settingsData, error: settingsError } = await supabaseAdmin
      .from('notification_settings')
      .select('settings')
      .eq('id', 1)
      .maybeSingle();

    if (settingsData && settingsData.settings) {
      currentSettings = { ...DEFAULT_NOTIFICATION_SETTINGS, ...settingsData.settings };
      console.log('[Push Notifications] Loaded templates and configurations from Supabase.');
    }

    // 2. Load subscriptions
    const { data: subData, error: subError } = await supabaseAdmin
      .from('push_subscriptions')
      .select('subscription_data');

    if (subData && subData.length > 0) {
      const loadedSubs = subData.map((row: any) => row.subscription_data as webpush.PushSubscription);
      // Filter out any duplicates
      const uniqueSubs = loadedSubs.filter(
        (sub, index, self) => self.findIndex((s) => s.endpoint === sub.endpoint) === index
      );
      subscriptions = uniqueSubs;
      console.log(`[Push Notifications] Loaded ${subscriptions.length} active devices from Supabase.`);
    }
  } catch (err) {
    console.warn('[Push Notifications] Error synchronizing from Supabase, operating in in-memory mode:', err);
  }
}

// Add push subscription
export async function addSubscription(sub: webpush.PushSubscription) {
  if (!sub || !sub.endpoint) return;

  // Avoid duplicates in memory
  const exists = subscriptions.some((s) => s.endpoint === sub.endpoint);
  if (!exists) {
    subscriptions.push(sub);
  }

  // Attempt to store in Supabase table `push_subscriptions` if table exists
  try {
    await supabaseAdmin
      .from('push_subscriptions')
      .upsert({
        endpoint: sub.endpoint,
        subscription_data: sub,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'endpoint' });
  } catch (err) {
    // Graceful fallback to memory
  }
}

// Remove push subscription
export async function removeSubscription(endpoint: string) {
  subscriptions = subscriptions.filter((s) => s.endpoint !== endpoint);
  try {
    await supabaseAdmin.from('push_subscriptions').delete().eq('endpoint', endpoint);
  } catch (e) {
    // Ignore
  }
}

// Send push notification to all subscribers
export async function sendPushToAll(payload: {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
  type?: NotificationLog['type'];
}) {
  const jsonPayload = JSON.stringify({
    title: payload.title,
    body: payload.body,
    icon: payload.icon || '/pwa-192x192.png',
    badge: payload.badge || '/favicon.png',
    url: payload.url || '/',
    tag: payload.tag || `topzclubs-${Date.now()}`,
    type: payload.type || 'geral',
  });

  let successCount = 0;
  const deadEndpoints: string[] = [];

  const promises = subscriptions.map(async (sub) => {
    try {
      await webpush.sendNotification(sub, jsonPayload, {
        TTL: 24 * 60 * 60, // 24 hours TTL so message arrives when device comes back online
        urgency: 'high',   // High priority to wake up Android/iOS lock screens
        headers: {
          'Urgency': 'high',
        },
      });
      successCount++;
    } catch (error: any) {
      if (error?.statusCode === 404 || error?.statusCode === 410) {
        deadEndpoints.push(sub.endpoint);
      } else {
        console.warn('Push error for endpoint:', error?.message);
      }
    }
  });

  await Promise.allSettled(promises);

  // Clean up dead subscriptions
  if (deadEndpoints.length > 0) {
    subscriptions = subscriptions.filter((s) => !deadEndpoints.includes(s.endpoint));
    deadEndpoints.forEach((ep) => removeSubscription(ep).catch(() => {}));
  }

  // Record log
  const logItem: NotificationLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: payload.type || 'teste',
    title: payload.title,
    body: payload.body,
    timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    successCount,
  };
  notificationLogs.push(logItem);
  if (notificationLogs.length > 100) {
    notificationLogs = notificationLogs.slice(-100);
  }

  return { success: true, delivered: successCount, total: subscriptions.length };
}

// Helper to normalize club names for 100% fuzzy matching
function normalizeClubName(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\b(cr|fc|sc|ec|se|ac|cf|ca|cd|sp|rj|mg|rs|pr|ba|pe|ce|go|sc|clube|esporte|futebol)\b/gi, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

// Background Monitor: checks matches and active bets
let isMonitoring = false;

export async function checkMatchesAndBets() {
  if (isMonitoring) return;
  isMonitoring = true;

  try {
    const todayStr = getBrasiliaTodayStr();
    
    // 1. Get favorite clubs list from Supabase with fallback
    let favoritesList: { id: number; name: string }[] = USER_FAVORITE_CLUBS_DATA;
    try {
      const shared = await fetchSharedFavorites();
      if (shared && shared.length > 0) {
        favoritesList = shared;
      }
    } catch (e) {
      // Use fallback
    }

    const favIds = new Set<number>(favoritesList.map((f) => Number(f.id)).filter((id) => !isNaN(id) && id > 0));
    const favNormalizedMap = favoritesList.map((f) => ({
      id: f.id,
      name: f.name,
      normalized: normalizeClubName(f.name),
    }));

    // Helper to check if a team is in favorites
    const isFavoriteTeam = (teamId?: number | string, teamName?: string) => {
      if (teamId && favIds.has(Number(teamId))) {
        return true;
      }
      if (teamName) {
        const norm = normalizeClubName(teamName);
        if (!norm) return false;
        return favNormalizedMap.some((fav) => {
          return fav.normalized === norm || norm.includes(fav.normalized) || fav.normalized.includes(norm);
        });
      }
      return false;
    };

    // 2. Fetch today matches from FotMob
    let matches: any[] = [];
    try {
      const fotmobData: any = await scrapeFotMobMatchesByDate(todayStr);
      if (Array.isArray(fotmobData)) {
        matches = fotmobData;
      } else if (fotmobData && Array.isArray(fotmobData.matches)) {
        matches = fotmobData.matches;
      }
    } catch (e) {
      // FotMob query failed silently
    }

    // Process finished matches for favorites
    if (matches.length > 0) {
      for (const m of matches) {
        const isFinished = 
          m.status === 'finished' || 
          m.status?.finished === true || 
          m.time === 'FT' || 
          m.time === 'Encerrado' ||
          (Array.isArray(m.score?.ft) && m.status !== 'live');

        if (!isFinished) continue;

        // Parse scores safely from various FotMob representations
        let homeScore: number | null = null;
        let awayScore: number | null = null;

        if (typeof m.homeScore === 'number') {
          homeScore = m.homeScore;
        } else if (Array.isArray(m.score?.ft) && typeof m.score.ft[0] === 'number') {
          homeScore = m.score.ft[0];
        }

        if (typeof m.awayScore === 'number') {
          awayScore = m.awayScore;
        } else if (Array.isArray(m.score?.ft) && typeof m.score.ft[1] === 'number') {
          awayScore = m.score.ft[1];
        }

        if (homeScore === null || awayScore === null) continue;

        const totalGoals = homeScore + awayScore;
        const placar = `${homeScore} x ${awayScore}`;
        const team1Name = m.team1 || m.home?.name || 'Time Mandante';
        const team2Name = m.team2 || m.away?.name || 'Time Visitante';
        const matchId = String(m.id || `${team1Name}-${team2Name}`);

        // Check Team 1 (Home)
        const isTeam1Fav = isFavoriteTeam(m.team1Id || m.home?.id, team1Name);
        if (isTeam1Fav) {
          const matchEventKey = `fav_m_${matchId}_t1_${normalizeClubName(team1Name)}`;

          // Under 1.5 check (Foguinho)
          if (totalGoals < 2 && currentSettings.notifyFire) {
            const fireKey = `${matchEventKey}_fire`;
            if (!processedEvents.has(fireKey)) {
              processedEvents.add(fireKey);
              const msg = currentSettings.fireTemplate
                .replace('{time}', team1Name)
                .replace('{placar}', placar);

              await sendPushToAll({
                title: 'TOPZCLUBS',
                body: msg,
                type: 'foguinho',
                tag: `fire-${matchId}`,
              });
            }
          }

          // Derrota check
          const team1Lost = awayScore > homeScore;
          if (team1Lost && currentSettings.notifyLoss) {
            const lossKey = `${matchEventKey}_loss`;
            if (!processedEvents.has(lossKey)) {
              processedEvents.add(lossKey);
              const msg = currentSettings.lossTemplate
                .replace('{time}', team1Name)
                .replace('{placar}', placar);

              await sendPushToAll({
                title: 'TOPZCLUBS',
                body: msg,
                type: 'derrota',
                tag: `loss-${matchId}`,
              });
            }
          }
        }

        // Check Team 2 (Away)
        const isTeam2Fav = isFavoriteTeam(m.team2Id || m.away?.id, team2Name);
        if (isTeam2Fav) {
          const matchEventKey = `fav_m_${matchId}_t2_${normalizeClubName(team2Name)}`;

          // Under 1.5 check (Foguinho)
          if (totalGoals < 2 && currentSettings.notifyFire) {
            const fireKey = `${matchEventKey}_fire`;
            if (!processedEvents.has(fireKey)) {
              processedEvents.add(fireKey);
              const msg = currentSettings.fireTemplate
                .replace('{time}', team2Name)
                .replace('{placar}', placar);

              await sendPushToAll({
                title: 'TOPZCLUBS',
                body: msg,
                type: 'foguinho',
                tag: `fire-${matchId}`,
              });
            }
          }

          // Derrota check
          const team2Lost = homeScore > awayScore;
          if (team2Lost && currentSettings.notifyLoss) {
            const lossKey = `${matchEventKey}_loss`;
            if (!processedEvents.has(lossKey)) {
              processedEvents.add(lossKey);
              const msg = currentSettings.lossTemplate
                .replace('{time}', team2Name)
                .replace('{placar}', placar);

              await sendPushToAll({
                title: 'TOPZCLUBS',
                body: msg,
                type: 'derrota',
                tag: `loss-${matchId}`,
              });
            }
          }
        }
      }
    }

    // 3. Process Active Bets in Balanço
    if (currentSettings.notifyBets) {
      try {
        const bets = await fetchUserBets();
        const pendingBets = (bets || []).filter((b) => b.status === 'Pendente' && Array.isArray(b.legs) && b.legs.length > 0);

        for (const bet of pendingBets) {
          const legs = bet.legs || [];
          let finishedLegsCount = 0;

          // Check if legs are completed in today's match list or leg status
          for (const leg of legs) {
            if (leg.status === 'Ganha' || leg.status === 'Perdida' || leg.status === 'Anulada') {
              finishedLegsCount++;
            } else {
              // Check if corresponding match exists in today's scraped matches
              const matchInList = matches.find((m) => String(m.id) === String(leg.matchId));
              if (matchInList && (matchInList.status === 'finished' || matchInList.time === 'FT' || matchInList.time === 'Encerrado')) {
                finishedLegsCount++;
              }
            }
          }

          const remaining = legs.length - finishedLegsCount;

          // If a leg finished and there are remaining matches
          if (finishedLegsCount > 0 && remaining > 0) {
            const progressEventKey = `bet_${bet.id}_finished_${finishedLegsCount}_of_${legs.length}`;
            if (!processedEvents.has(progressEventKey)) {
              processedEvents.add(progressEventKey);
              const gamesSummary = getBetGamesSummary(bet);
              const msg = currentSettings.betProgressTemplate
                .replace('{titulo}', bet.title || 'Bilhete')
                .replace('{jogos}', gamesSummary)
                .replace('{casa}', bet.bookmaker || 'Aposta')
                .replace('{data}', bet.date || 'recente')
                .replace('{restantes}', String(remaining))
                .replace('{total}', String(legs.length))
                .replace('{finalizados}', String(finishedLegsCount));

              await sendPushToAll({
                title: 'TOPZCLUBS',
                body: msg,
                type: 'bilhete_progresso',
                tag: `bet-prog-${bet.id}`,
              });
            }
          }
        }
      } catch (err) {
        // Balanço bets check failed silently
      }
    }
  } catch (err) {
    console.warn('Error in notifications background check:', err);
  } finally {
    isMonitoring = false;
  }
}

// Handler when a bet is marked Ganha or Perdida in Balanço
export async function handleBetResultNotification(bet: any) {
  if (!currentSettings.notifyBets) return;
  const eventKey = `bet_resolved_${bet.id}_${bet.status}`;
  if (processedEvents.has(eventKey)) return;
  processedEvents.add(eventKey);

  const gamesSummary = getBetGamesSummary(bet);

  if (bet.status === 'Ganha') {
    const msg = currentSettings.betWonTemplate
      .replace('{titulo}', bet.title || 'Bilhete')
      .replace('{jogos}', gamesSummary)
      .replace('{casa}', bet.bookmaker || 'Aposta')
      .replace('{data}', bet.date || 'recente')
      .replace('{retorno}', `R$ ${(bet.potentialReturn || bet.amount || 0).toFixed(2)}`);

    await sendPushToAll({
      title: 'TOPZCLUBS',
      body: msg,
      type: 'bilhete_green',
      tag: `bet-won-${bet.id}`,
    });
  } else if (bet.status === 'Perdida') {
    const msg = currentSettings.betLostTemplate
      .replace('{titulo}', bet.title || 'Bilhete')
      .replace('{jogos}', gamesSummary)
      .replace('{casa}', bet.bookmaker || 'Aposta')
      .replace('{data}', bet.date || 'recente');

    await sendPushToAll({
      title: 'TOPZCLUBS',
      body: msg,
      type: 'bilhete_red',
      tag: `bet-lost-${bet.id}`,
    });
  }
}

// Start background interval (runs every 60 seconds)
export function startNotificationDaemon() {
  console.log('[Push Notifications] Background monitor initialized.');
  
  // Initial sync from Supabase
  loadFromSupabase().catch((err) => console.warn('Failed to load initially from Supabase:', err));

  // Initial check after 10 seconds
  setTimeout(() => {
    checkMatchesAndBets().catch(() => {});
  }, 10000);

  // Recurring check every 60 seconds
  setInterval(() => {
    checkMatchesAndBets().catch(() => {});
  }, 60000);
}
