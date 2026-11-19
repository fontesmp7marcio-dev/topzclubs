import {
  AutoBetConfig,
  AutoBetMarketOption,
  AutoBetMode,
  AutoBetPreview,
  BetFormat,
  BetItem,
  BetLeg,
  DEFAULT_MATCH_FILTERS,
  Match,
  MatchItem,
} from '../types';
import {
  USER_FAVORITE_CLUBS_DATA,
  isTeamNameInFavorites,
  normalizeTeamName,
} from '../data/favoriteClubs';
import { isFemaleOrWomensMatch } from './femaleFilter';
import { getTeamId } from './teamCrests';
import {
  calculateTeamEmojis,
  filterTeamPastMatches,
  generateFallbackTeamMatches,
  getEndingFireStreak,
} from './competitionFilter';
import {
  calculateBetProfit,
  evaluateBetStatusFromLegs,
  evaluateLegResult,
  extractScoreFromMatch,
  extractStatusFromMatch,
  getMarketMetadata,
} from './betSync';

export const DEFAULT_AUTO_BET_CONFIG: AutoBetConfig = {
  enabled: true,
  mode: 'home',
  bookmaker: 'Betano',
  market: 'OVER_1_5',
  stake: 20,
  defaultOdd: 2.0,
  maxGamesPerTicket: 3,
  fireCountFilter: 0,
  ticketCount: null,
};

export interface FavoriteClubEntry {
  id: number;
  name: string;
  country?: string;
  league?: string;
}

export interface AutoBetCandidate {
  match: Match;
  favoriteSide: 'home' | 'away';
  alreadyInBet: boolean;
  fireStreak: number;
  emojis: string[];
}

function normalizeDateStr(d?: string): string {
  if (!d) return '';
  const s = d.trim();
  if (s.includes('/')) {
    const parts = s.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const yr = year.length === 2 ? `20${year}` : year;
      return `${yr}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  return s;
}

function parseTimeToMinutes(timeStr?: string): number {
  if (!timeStr) return 9999;
  const clean = timeStr.trim().replace('h', ':');
  const parts = clean.split(':');
  if (parts.length >= 2) {
    const hours = parseInt(parts[0], 10);
    const mins = parseInt(parts[1], 10);
    if (!isNaN(hours) && !isNaN(mins)) {
      return hours * 60 + mins;
    }
  }
  return 9999;
}

function deterministicHash(input: string): string {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

/**
 * Checks if a given team is in the favorites list.
 * When FotMob provides a concrete teamId (> 0), trusts ID matching strictly
 * so clubs in other leagues/countries with similar names (e.g. Liverpool FC URU,
 * Al-Ahli QAT, CD Olimpia HON, Velez Sarsfield) never cause false positives.
 */
export function isTeamFavorite(
  teamName: string | undefined,
  teamId: number | undefined,
  favoritesList: FavoriteClubEntry[]
): boolean {
  const activeList =
    favoritesList && favoritesList.length > 0 ? favoritesList : USER_FAVORITE_CLUBS_DATA;

  if (teamId && Number(teamId) > 0) {
    const numId = Number(teamId);
    return activeList.some((f) => Number(f.id) === numId);
  }

  if (!teamName) return false;

  const dictId = getTeamId(teamName);
  if (dictId && activeList.some((f) => Number(f.id) === Number(dictId))) {
    return true;
  }

  return isTeamNameInFavorites(teamName, activeList);
}

/**
 * Collects all match IDs, normalized matchup pairs, and normalized team names
 * already present in existing bets on the target date so no game or team is duplicated.
 */
export function collectUsedMatchesForDate(
  existingBets: BetItem[],
  dateStr: string
): {
  usedMatchIds: Set<string>;
  usedPairs: Set<string>;
  usedTeams: Set<string>;
} {
  const usedMatchIds = new Set<string>();
  const usedPairs = new Set<string>();
  const usedTeams = new Set<string>();
  const targetDate = normalizeDateStr(dateStr);

  for (const bet of existingBets || []) {
    if (!bet) continue;
    const betDate = normalizeDateStr(bet.date);
    const isBetOnDate = betDate === targetDate;

    if (Array.isArray(bet.legs)) {
      for (const leg of bet.legs) {
        const legDate = normalizeDateStr(leg.date || bet.date);
        if (legDate === targetDate) {
          if (leg.matchId) usedMatchIds.add(String(leg.matchId));
          if (leg.id) usedMatchIds.add(String(leg.id));
          const n1 = normalizeTeamName(leg.team1 || '');
          const n2 = normalizeTeamName(leg.team2 || '');
          if (n1 && n2) usedPairs.add(`${n1}___${n2}`);
          if (n1) usedTeams.add(n1);
          if (n2) usedTeams.add(n2);
        }
      }
    }

    if (isBetOnDate && bet.title) {
      const segments = bet.title.split('+');
      for (const seg of segments) {
        const teams = seg.split(/\s+(?:x|vs|v)\s+/i);
        if (teams.length === 2) {
          const n1 = normalizeTeamName(teams[0]);
          const n2 = normalizeTeamName(teams[1]);
          if (n1 && n2) usedPairs.add(`${n1}___${n2}`);
          if (n1) usedTeams.add(n1);
          if (n2) usedTeams.add(n2);
        }
      }
    }
  }

  return { usedMatchIds, usedPairs, usedTeams };
}

export function getFavoriteTeamFireInfo(
  teamName: string,
  teamId: number | undefined,
  favoritesList: FavoriteClubEntry[],
  teamRawMatches?: Record<string | number, MatchItem[]>
): { emojis: string[]; fireStreak: number } {
  const activeList =
    favoritesList && favoritesList.length > 0 ? favoritesList : USER_FAVORITE_CLUBS_DATA;
  const norm = normalizeTeamName(teamName || '');
  const lower = (teamName || '').toLowerCase().trim();
  const dictId = getTeamId(teamName || '');
  const matchedFav =
    (teamId && Number(teamId) > 0
      ? activeList.find((f) => Number(f.id) === Number(teamId))
      : null) ||
    (dictId ? activeList.find((f) => Number(f.id) === Number(dictId)) : null) ||
    activeList.find((f) => normalizeTeamName(f.name) === norm);

  const effectiveId = teamId || matchedFav?.id || dictId || 0;
  const favNorm = matchedFav?.name ? normalizeTeamName(matchedFav.name) : '';

  let raw: MatchItem[] | undefined;
  if (teamRawMatches) {
    if (effectiveId && teamRawMatches[effectiveId]?.length) raw = teamRawMatches[effectiveId];
    else if (effectiveId && teamRawMatches[String(effectiveId)]?.length)
      raw = teamRawMatches[String(effectiveId)];
    else if (norm && teamRawMatches[norm]?.length) raw = teamRawMatches[norm];
    else if (favNorm && teamRawMatches[favNorm]?.length) raw = teamRawMatches[favNorm];
    else if (lower && teamRawMatches[lower]?.length) raw = teamRawMatches[lower];
    else if (dictId && teamRawMatches[dictId]?.length) raw = teamRawMatches[dictId];
    else if (dictId && teamRawMatches[String(dictId)]?.length) raw = teamRawMatches[String(dictId)];
  }

  if (!raw || raw.length === 0) {
    raw = generateFallbackTeamMatches(matchedFav?.name || teamName, effectiveId || 10000);
  }

  if (!raw || raw.length === 0) {
    return { emojis: [], fireStreak: 0 };
  }

  const filtered = filterTeamPastMatches(
    raw,
    DEFAULT_MATCH_FILTERS,
    matchedFav?.name || teamName,
    effectiveId
  );
  const emojis = calculateTeamEmojis(filtered, DEFAULT_MATCH_FILTERS.window || 5);
  const fireStreak = getEndingFireStreak(emojis);
  return { emojis, fireStreak };
}

function matchesFireCountFilter(fireStreak: number, fireCountFilter = 0): boolean {
  if (!fireCountFilter || fireCountFilter <= 0) return fireStreak >= 1;
  if (fireCountFilter === 1) return fireStreak === 1;
  if (fireCountFilter === 2) return fireStreak === 2;
  return fireStreak >= 3;
}

/**
 * Identifies all valid, confirmed matches on `dateStr` where a favorite club plays
 * strictly in the selected modality ('all' | 'home' | 'away') AND is active in the Método Foguinho (🔥 >= 1).
 */
export function getAutoBetCandidates(
  matches: Match[],
  dateStr: string,
  mode: AutoBetMode,
  favoritesList: FavoriteClubEntry[],
  existingBets: BetItem[] = [],
  blockedMatchKeys: Set<string> = new Set(),
  teamRawMatches?: Record<string | number, MatchItem[]>,
  fireCountFilter = 0
): AutoBetCandidate[] {
  const targetDate = normalizeDateStr(dateStr);
  const { usedMatchIds, usedPairs, usedTeams } = collectUsedMatchesForDate(
    existingBets,
    targetDate
  );

  const seenMatchIds = new Set<string>();
  const seenPairs = new Set<string>();
  const seenTeamsInPlan = new Set<string>();
  const candidates: AutoBetCandidate[] = [];

  for (const m of matches || []) {
    if (!m || !m.team1 || !m.team2) continue;

    // 1. Date check
    const matchDate = normalizeDateStr(m.date || targetDate);
    if (matchDate && matchDate !== targetDate) continue;

    // 2. Valid & confirmed match check (exclude postponed / cancelled / suspended)
    const status = extractStatusFromMatch(m);
    if (status === 'postponed') continue;

    // 3. Exclude women's, youth, reserve, and friendly matches
    if (isFemaleOrWomensMatch(m.leagueName, m.team1, m.team2)) continue;

    // 4. Modality check: favorite at home ('home'), away ('away'), or either ('all')
    const isHomeFav = isTeamFavorite(m.team1, m.team1Id, favoritesList);
    const isAwayFav = isTeamFavorite(m.team2, m.team2Id, favoritesList);

    if (mode === 'home' && !isHomeFav) continue;
    if (mode === 'away' && !isAwayFav) continue;
    if (mode === 'all' && !isHomeFav && !isAwayFav) continue;

    // 5. Método do Foguinho check (🔥 Under 1.5 streak >= 1 on the target favorite team)
    const homeInfo = isHomeFav
      ? getFavoriteTeamFireInfo(m.team1, m.team1Id, favoritesList, teamRawMatches)
      : { emojis: [], fireStreak: 0 };
    const awayInfo = isAwayFav
      ? getFavoriteTeamFireInfo(m.team2, m.team2Id, favoritesList, teamRawMatches)
      : { emojis: [], fireStreak: 0 };

    let chosenSide: 'home' | 'away' = 'home';
    let fireStreak = 0;
    let emojis: string[] = [];

    if (mode === 'home') {
      chosenSide = 'home';
      fireStreak = homeInfo.fireStreak;
      emojis = homeInfo.emojis;
      if (!matchesFireCountFilter(fireStreak, fireCountFilter)) continue;
    } else if (mode === 'away') {
      chosenSide = 'away';
      fireStreak = awayInfo.fireStreak;
      emojis = awayInfo.emojis;
      if (!matchesFireCountFilter(fireStreak, fireCountFilter)) continue;
    } else {
      const homeQual = isHomeFav && matchesFireCountFilter(homeInfo.fireStreak, fireCountFilter);
      const awayQual = isAwayFav && matchesFireCountFilter(awayInfo.fireStreak, fireCountFilter);
      if (!homeQual && !awayQual) continue;
      if (homeQual && (!awayQual || homeInfo.fireStreak >= awayInfo.fireStreak)) {
        chosenSide = 'home';
        fireStreak = homeInfo.fireStreak;
        emojis = homeInfo.emojis;
      } else {
        chosenSide = 'away';
        fireStreak = awayInfo.fireStreak;
        emojis = awayInfo.emojis;
      }
    }

    // 6. Deduplicate within today's match pool
    const mId = m.id ? String(m.id) : '';
    const n1 = normalizeTeamName(m.team1);
    const n2 = normalizeTeamName(m.team2);
    const pairKey = `${n1}___${n2}`;

    if (mId && seenMatchIds.has(mId)) continue;
    if (n1 && n2 && seenPairs.has(pairKey)) continue;
    if ((n1 && seenTeamsInPlan.has(n1)) || (n2 && seenTeamsInPlan.has(n2))) continue;

    if (mId) seenMatchIds.add(mId);
    if (n1 && n2) seenPairs.add(pairKey);
    if (n1) seenTeamsInPlan.add(n1);
    if (n2) seenTeamsInPlan.add(n2);

    const isUsedInExisting =
      (mId !== '' && usedMatchIds.has(mId)) ||
      (n1 !== '' && n2 !== '' && usedPairs.has(pairKey)) ||
      (n1 !== '' && usedTeams.has(n1)) ||
      (n2 !== '' && usedTeams.has(n2)) ||
      (mId !== '' && blockedMatchKeys.has(mId)) ||
      (n1 !== '' && n2 !== '' && blockedMatchKeys.has(pairKey));

    candidates.push({
      match: { ...m, date: targetDate },
      favoriteSide: chosenSide,
      alreadyInBet: isUsedInExisting,
      fireStreak,
      emojis,
    });
  }

  // Sort by highest Foguinho streak first, then chronologically by kickoff time
  candidates.sort((a, b) => {
    if (b.fireStreak !== a.fireStreak) return b.fireStreak - a.fireStreak;
    const tDiff = parseTimeToMinutes(a.match.time) - parseTimeToMinutes(b.match.time);
    if (tDiff !== 0) return tDiff;
    return a.match.team1.localeCompare(b.match.team1);
  });

  return candidates;
}

/**
 * Groups eligible matches into tickets of max `maxPerTicket` (1..3) games,
 * optionally capped to `maxTickets` tickets.
 */
export function chunkMatchesIntoTickets<T = Match>(
  matches: T[],
  maxPerTicket = 3,
  maxTickets?: number | null
): T[][] {
  const safeMax = Math.max(1, Math.min(3, Math.floor(maxPerTicket) || 3));
  const pool =
    typeof maxTickets === 'number' && maxTickets > 0
      ? matches.slice(0, maxTickets * safeMax)
      : matches;
  const chunks: T[][] = [];
  for (let i = 0; i < pool.length; i += safeMax) {
    chunks.push(pool.slice(i, i + safeMax));
  }
  return chunks;
}

/**
 * Resolves the concrete betSync market key for a leg based on automation configuration.
 */
export function resolveAutoBetMarket(
  marketOption: AutoBetMarketOption,
  mode: AutoBetMode,
  favoriteSide?: 'home' | 'away'
): string {
  const effectiveSide: 'home' | 'away' =
    favoriteSide || (mode === 'away' ? 'away' : 'home');
  if (marketOption === 'FAV_WIN') {
    return effectiveSide === 'home' ? 'HOME_WIN' : 'AWAY_WIN';
  }
  if (marketOption === 'FAV_DC') {
    return effectiveSide === 'home' ? 'DC_1X' : 'DC_X2';
  }
  return marketOption || 'OVER_1_5';
}

/**
 * Builds standard BetItem objects (identical to manual BetModal tickets)
 * ready to be persisted to user_bets and displayed/settled in Balanço.
 */
export function buildAutoBetItemsFromChunks(
  chunks: Match[][],
  dateStr: string,
  config: AutoBetConfig,
  favoriteSidesByMatchId?: Record<string, 'home' | 'away'>
): BetItem[] {
  const targetDate = normalizeDateStr(dateStr);
  const stake = Number(config.stake) > 0 ? Number(config.stake) : 20;
  const odd = Number(config.defaultOdd) >= 1.01 ? Number(config.defaultOdd) : 2.0;
  const bookmaker = config.bookmaker === 'Bet365' ? 'Bet365' : 'Betano';
  const baseCreatedAtMs = Date.now();

  return chunks.map((chunk, chunkIdx) => {
    const createdAt = new Date(baseCreatedAtMs + (chunks.length - 1 - chunkIdx) * 10).toISOString();
    const legs: BetLeg[] = chunk.map((m) => {
      const mIdStr = m.id ? String(m.id) : '';
      const favSide = mIdStr ? favoriteSidesByMatchId?.[mIdStr] : undefined;
      const concreteMarket = resolveAutoBetMarket(config.market, config.mode, favSide);
      const scores = extractScoreFromMatch(m);
      const matchStatus = extractStatusFromMatch(m);
      const meta = getMarketMetadata(concreteMarket, m.team1, m.team2);
      const legStatus = evaluateLegResult(
        concreteMarket,
        scores.homeScore,
        scores.awayScore,
        matchStatus
      );
      const hasScore =
        (matchStatus === 'finished' || matchStatus === 'live') &&
        typeof scores.homeScore === 'number' &&
        typeof scores.awayScore === 'number';
      const isFinished = matchStatus === 'finished';

      const legId = m.id
        ? String(m.id)
        : `${normalizeTeamName(m.team1)}-${normalizeTeamName(m.team2)}-${targetDate}`;

      return {
        id: legId,
        matchId: legId,
        matchTitle: `${m.team1} x ${m.team2}`,
        team1: m.team1,
        team2: m.team2,
        team1Id: m.team1Id || getTeamId(m.team1),
        team2Id: m.team2Id || getTeamId(m.team2),
        date: targetDate,
        market: concreteMarket,
        marketLabel: meta.marketLabel,
        line: meta.line,
        targetSide: meta.targetSide,
        status: legStatus,
        score: hasScore ? { ft: [scores.homeScore!, scores.awayScore!] } : null,
        settledScore:
          isFinished && hasScore ? [scores.homeScore!, scores.awayScore!] : null,
        matchStatus,
        time: m.time || '16:00',
        league: m.leagueName || '',
        leagueName: m.leagueName || '',
      };
    });

    const format: BetFormat = legs.length > 1 ? 'Múltipla' : 'Simples';
    const title = legs.map((l) => `${l.team1} x ${l.team2}`).join(' + ');
    const status = evaluateBetStatusFromLegs(legs, 'Pendente', format);
    const potentialReturn = Number((stake * odd).toFixed(2));
    const profit = calculateBetProfit(status, stake, odd);

    const sortedKeys = legs
      .map((l) => l.matchId || l.matchTitle)
      .sort()
      .join('|');
    const id = `auto-${targetDate}-${config.mode}-${deterministicHash(sortedKeys + '_' + chunkIdx)}`;

    return {
      id,
      date: targetDate,
      bookmaker,
      title,
      odd,
      sport: 'Futebol',
      status,
      format,
      amount: stake,
      potentialReturn,
      profit,
      legs,
      createdAt,
    };
  });
}

/**
 * Generates a read-only preview of today's auto-bet plan.
 */
export function buildAutoBetPreview(
  matches: Match[],
  dateStr: string,
  config: AutoBetConfig,
  favoritesList: FavoriteClubEntry[],
  existingBets: BetItem[],
  teamRawMatches?: Record<string | number, MatchItem[]>
): AutoBetPreview {
  const candidates = getAutoBetCandidates(
    matches,
    dateStr,
    config.mode,
    favoritesList,
    existingBets,
    new Set(),
    teamRawMatches,
    config.fireCountFilter || 0
  );

  const available = candidates.filter((c) => !c.alreadyInBet);
  const alreadyUsedCount = candidates.filter((c) => c.alreadyInBet).length;
  const chunks = chunkMatchesIntoTickets(
    available.map((c) => c.match),
    config.maxGamesPerTicket || 3,
    config.ticketCount
  );

  return {
    date: normalizeDateStr(dateStr),
    eligibleMatchesCount: available.length,
    alreadyUsedCount,
    plannedTicketsCount: chunks.length,
    plannedBreakdown: chunks.map((c) => c.length),
    matches: candidates.map((c) => ({
      id: String(c.match.id || `${c.match.team1}-${c.match.team2}`),
      team1: c.match.team1,
      team2: c.match.team2,
      time: c.match.time,
      leagueName: c.match.leagueName,
      favoriteSide: c.favoriteSide,
      alreadyInBet: c.alreadyInBet,
      fireStreak: c.fireStreak,
      emojis: c.emojis,
    })),
  };
}
