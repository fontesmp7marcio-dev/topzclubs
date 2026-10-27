import { BetItem, BetLeg, BetLegStatus, BetStatus, BetFormat, BankrollStats, Match, MarketOption } from '../types';
import { normalizeTeamName } from '../data/favoriteClubs';

export interface MarketMetadata {
  market: string;
  marketLabel: string;
  line?: number;
  targetSide?: string;
}

export interface OfficialMatchResult {
  homeScore: number | undefined;
  awayScore: number | undefined;
  scoreText: string | null; // e.g. "3 - 2"
  scoreObj: { ft: [number, number] } | null;
  status: 'scheduled' | 'live' | 'finished';
  isFinished: boolean;
  isLive: boolean;
  matchId?: string;
  source: 'direct' | 'dateMatches' | 'teamRaw' | 'none';
}

/**
 * Canonical normalizer for robust club name matching across sources
 */
export function normalizeTeamForMatching(name: string): string {
  if (!name) return '';
  let s = name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_./]/g, ' ')
    .replace(/\b(fc|sc|cf|ac|as|sk|afc|vfl|vfb|rb|ec|cr|se|cd)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Canonicalize common Brazilian and international team aliases
  if (s === 'atletico mg' || s === 'atletico mineiro' || s === 'cam') return 'atletico mineiro';
  if (s === 'athletico pr' || s === 'athletico paranaense' || s === 'atletico pr' || s === 'cap') return 'athletico paranaense';
  if (s === 'america mg' || s === 'america mineiro') return 'america mineiro';
  if (s === 'america rn' || s === 'america de natal') return 'america de natal';
  if (s === 'botafogo sp' || s === 'botafogo ribeirao preto') return 'botafogo sp';
  if (s === 'botafogo pb' || s === 'botafogo da paraiba') return 'botafogo pb';
  if (s === 'bragantino' || s === 'red bull bragantino') return 'bragantino';
  if (s === 'sporting' || s === 'sporting cp' || s === 'sporting lisboa' || s === 'sporting clube de portugal') return 'sporting cp';
  if (s === 'psg' || s === 'paris saint germain' || s === 'paris') return 'psg';
  if (s === 'bayern' || s === 'bayern munchen' || s === 'bayern munich') return 'bayern munich';
  if (s === 'inter' || s === 'inter milan' || s === 'internazionale' || s === 'inter de milao') return 'inter milan';
  if (s === 'inter miami' || s === 'inter miami cf') return 'inter miami';
  if (s === 'man city' || s === 'manchester city') return 'manchester city';
  if (s === 'man utd' || s === 'man utd fc' || s === 'manchester united') return 'manchester united';
  if (s === 'barcelona' || s === 'fc barcelona') return 'barcelona';
  if (s === 'barcelona sc' || s === 'barcelona guayaquil') return 'barcelona sc';
  if (s === 'real madrid') return 'real madrid';
  if (s === 'atletico madrid' || s === 'atletico de madrid') return 'atletico madrid';

  // State abbreviations normalization
  s = s.replace(/\bmg\b/g, 'mineiro')
       .replace(/\bpr\b/g, 'paranaense')
       .replace(/\brs\b/g, 'gaucho')
       .replace(/\brj\b/g, 'carioca')
       .replace(/\bba\b/g, 'baiano')
       .replace(/\bgo\b/g, 'goiano')
       .replace(/\bsc\b/g, 'catarinense')
       .replace(/\bce\b/g, 'cearense')
       .replace(/\s+/g, ' ')
       .trim();

  return s;
}

export function areTeamsMatching(tA?: string, tB?: string): boolean {
  if (!tA || !tB) return false;
  const nA = normalizeTeamForMatching(tA);
  const nB = normalizeTeamForMatching(tB);
  if (nA === nB) return true;
  if (nA.length >= 4 && nB.length >= 4 && (nA.includes(nB) || nB.includes(nA))) return true;
  return false;
}

/**
 * Robust matching between two teams using normalized names and aliases.
 */
export function matchTeams(t1A?: string, t2A?: string, t1B?: string, t2B?: string): boolean {
  if (!t1A || !t2A || !t1B || !t2B) return false;
  return areTeamsMatching(t1A, t1B) && areTeamsMatching(t2A, t2B);
}

/**
 * Extracts numeric scores [homeScore, awayScore] from any match object shape.
 */
export function extractScoreFromMatch(m: any): { homeScore?: number; awayScore?: number } {
  if (!m) return {};

  if (m.score) {
    if (Array.isArray(m.score.ft) && typeof m.score.ft[0] === 'number' && typeof m.score.ft[1] === 'number') {
      return { homeScore: m.score.ft[0], awayScore: m.score.ft[1] };
    }
    if (typeof (m.score as any).home === 'number' && typeof (m.score as any).away === 'number') {
      return { homeScore: (m.score as any).home, awayScore: (m.score as any).away };
    }
    if (typeof m.score === 'string') {
      const parts = m.score.split(/\s*[-:×x]\s*/);
      if (parts.length === 2 && !isNaN(parseInt(parts[0], 10)) && !isNaN(parseInt(parts[1], 10))) {
        return { homeScore: parseInt(parts[0], 10), awayScore: parseInt(parts[1], 10) };
      }
    }
  }

  // Also support direct string on scoreStr or m.scoreText
  const rawStr = m.scoreStr || m.status?.scoreStr || m.scoreText;
  if (typeof rawStr === 'string') {
    const parts = rawStr.split(/\s*[-:×x]\s*/);
    if (parts.length === 2 && !isNaN(parseInt(parts[0], 10)) && !isNaN(parseInt(parts[1], 10))) {
      return { homeScore: parseInt(parts[0], 10), awayScore: parseInt(parts[1], 10) };
    }
  }

  if (typeof m.homeScore === 'number' && typeof m.awayScore === 'number') {
    return { homeScore: m.homeScore, awayScore: m.awayScore };
  }

  if (typeof m.home?.score === 'number' && typeof m.away?.score === 'number') {
    return { homeScore: m.home.score, awayScore: m.away.score };
  }

  if (typeof m.score1 === 'number' && typeof m.score2 === 'number') {
    return { homeScore: m.score1, awayScore: m.score2 };
  }

  if (Array.isArray(m.settledScore) && m.settledScore.length === 2) {
    return { homeScore: m.settledScore[0], awayScore: m.settledScore[1] };
  }

  return {};
}

/**
 * Normalizes match status across all formats into 'scheduled' | 'live' | 'finished'
 */
export function extractStatusFromMatch(m: any): 'scheduled' | 'live' | 'finished' {
  if (!m) return 'scheduled';
  const s = String(m.status?.reason?.short || m.status || m.matchStatus || '').toLowerCase().trim();

  if (
    s === 'finished' ||
    s === 'ft' ||
    s === 'encerrado' ||
    s === 'finalizado' ||
    s === 'ended' ||
    s === 'concluido' ||
    s === 'concluído' ||
    s === 'pen' ||
    s === 'aet' ||
    m.isFinished === true ||
    m.result === 'V' ||
    m.result === 'E' ||
    m.result === 'D'
  ) {
    return 'finished';
  }

  if (
    s === 'live' ||
    s === 'halftime' ||
    s === 'ao vivo' ||
    s === 'em andamento' ||
    s === '1t' ||
    s === '2t' ||
    s === 'intervalo' ||
    s === 'started' ||
    s === 'in_progress'
  ) {
    return 'live';
  }

  return 'scheduled';
}

/**
 * Single Source of Truth to resolve the official match result & score from:
 * 1) Provided matches list (e.g. dayMatches or dateMatches)
 * 2) teamRawMatches (verified past fixtures for favorite clubs)
 */
export function resolveOfficialMatchResult(
  target: {
    id?: string | number;
    matchId?: string | number;
    team1?: string;
    team2?: string;
    team1Id?: number;
    team2Id?: number;
    date?: string;
    score?: any;
    settledScore?: any;
    matchStatus?: string;
    status?: string;
  },
  matches: Match[] = [],
  teamRawMatches?: Record<string | number, any[]>
): OfficialMatchResult {
  const targetId = target.matchId ? String(target.matchId) : target.id ? String(target.id) : '';

  // 1. Check in matches list
  let matchFound = targetId ? matches.find((m) => String(m.id) === targetId) : undefined;
  if (!matchFound && target.team1 && target.team2) {
    matchFound = matches.find((m) => matchTeams(m.team1, m.team2, target.team1, target.team2));
  }

  // 2. Check in teamRawMatches
  let rawMatchFound: any = undefined;
  if (teamRawMatches) {
    const allRaw = Object.values(teamRawMatches).flat();
    if (targetId) {
      rawMatchFound = allRaw.find((m) => m && String(m.id) === targetId);
    }
    if (!rawMatchFound && target.team1 && target.team2) {
      rawMatchFound = allRaw.find((m) => {
        if (!m) return false;
        const mHome = m.homeTeam || m.home || m.team1;
        const mAway = m.awayTeam || m.away || m.team2;
        return matchTeams(mHome, mAway, target.team1, target.team2);
      });
    }
  }

  let homeScore: number | undefined;
  let awayScore: number | undefined;
  let status: 'scheduled' | 'live' | 'finished' = 'scheduled';

  // Check candidate from matches list
  if (matchFound) {
    const scores = extractScoreFromMatch(matchFound);
    homeScore = scores.homeScore;
    awayScore = scores.awayScore;
    status = extractStatusFromMatch(matchFound);
  }

  // Check candidate from teamRawMatches (especially for past verified results)
  if (rawMatchFound) {
    const rawScores = extractScoreFromMatch(rawMatchFound);
    if (rawScores.homeScore !== undefined && rawScores.awayScore !== undefined) {
      homeScore = rawScores.homeScore;
      awayScore = rawScores.awayScore;
    }
    const rawStatus = extractStatusFromMatch(rawMatchFound);
    if (rawStatus === 'finished') {
      status = 'finished';
    } else if (rawStatus === 'live' && status !== 'finished') {
      status = 'live';
    }
  }

  // Fallback to target itself if already populated
  if (homeScore === undefined || awayScore === undefined) {
    const targetScores = extractScoreFromMatch(target);
    homeScore = targetScores.homeScore;
    awayScore = targetScores.awayScore;
    if (status === 'scheduled') {
      status = extractStatusFromMatch(target);
    }
  }

  const isFinished = status === 'finished';
  const isLive = status === 'live';
  const hasScore = typeof homeScore === 'number' && typeof awayScore === 'number';

  return {
    homeScore,
    awayScore,
    scoreText: hasScore ? `${homeScore} - ${awayScore}` : null,
    scoreObj: hasScore ? { ft: [homeScore!, awayScore!] } : null,
    status,
    isFinished,
    isLive,
    matchId: matchFound ? String(matchFound.id) : rawMatchFound ? String(rawMatchFound.id) : (targetId || undefined),
    source: matchFound ? (rawMatchFound ? 'direct' : 'dateMatches') : (rawMatchFound ? 'teamRaw' : 'none'),
  };
}

export function getMarketMetadata(marketKey: string, team1?: string, team2?: string): MarketMetadata {
  const label = getMarketLabel(marketKey, team1, team2);
  let line: number | undefined;
  let targetSide: string | undefined;

  if (marketKey === 'HOME_WIN') targetSide = 'home';
  else if (marketKey === 'DRAW') targetSide = 'draw';
  else if (marketKey === 'AWAY_WIN') targetSide = 'away';
  else if (marketKey === 'DC_1X') targetSide = '1X';
  else if (marketKey === 'DC_X2') targetSide = 'X2';
  else if (marketKey === 'DC_12') targetSide = '12';
  else if (marketKey.startsWith('OVER_')) {
    targetSide = 'over';
    line = parseFloat(marketKey.replace('OVER_', '').replace('_', '.'));
  } else if (marketKey.startsWith('UNDER_')) {
    targetSide = 'under';
    line = parseFloat(marketKey.replace('UNDER_', '').replace('_', '.'));
  } else if (marketKey === 'BTTS_YES') targetSide = 'yes';
  else if (marketKey === 'BTTS_NO') targetSide = 'no';
  else if (marketKey === 'DNB_HOME') targetSide = 'home';
  else if (marketKey === 'DNB_AWAY') targetSide = 'away';

  return { market: marketKey, marketLabel: label, line, targetSide };
}

/**
 * Returns the 5 approved selectable markets:
 * 1. Mais de 1.5 gols
 * 2. Vitória da casa
 * 3. Vitória do visitante
 * 4. Dupla Chance: X1 (Time Mandante ou Empate)
 * 5. Dupla Chance: X2 (Time Visitante ou Empate)
 */
export function getMarketOptionsForMatch(team1: string, team2: string): MarketOption[] {
  const t1 = team1 || 'Mandante';
  const t2 = team2 || 'Visitante';

  return [
    { value: 'OVER_1_5', label: 'Mais de 1.5 gols', category: 'Gols' },
    { value: 'HOME_WIN', label: `Vitória da casa (${t1})`, category: 'Resultado' },
    { value: 'AWAY_WIN', label: `Vitória do visitante (${t2})`, category: 'Resultado' },
    { value: 'DC_1X', label: `Dupla Chance: X1 (${t1} ou Empate)`, category: 'Dupla Chance' },
    { value: 'DC_X2', label: `Dupla Chance: X2 (${t2} ou Empate)`, category: 'Dupla Chance' },
  ];
}

/**
 * Gets a friendly label for a market key
 */
export function getMarketLabel(marketKey: string | undefined, team1?: string, team2?: string): string {
  if (!marketKey) return 'Mais de 1.5 gols';
  const t1 = team1 || 'Mandante';
  const t2 = team2 || 'Visitante';

  if (marketKey === 'OVER_1_5') return 'Mais de 1.5 gols';
  if (marketKey === 'HOME_WIN') return `Vitória da casa (${t1})`;
  if (marketKey === 'AWAY_WIN') return `Vitória do visitante (${t2})`;
  if (marketKey === 'DC_1X' || marketKey === 'DC_X1') return `Dupla Chance: X1 (${t1} ou Empate)`;
  if (marketKey === 'DC_X2') return `Dupla Chance: X2 (${t2} ou Empate)`;

  // Fallbacks for older bets in database
  if (marketKey === 'DRAW') return 'Empate';
  if (marketKey === 'OVER_2_5') return 'Mais de 2.5 gols';
  if (marketKey === 'UNDER_2_5') return 'Menos de 2.5 gols';
  if (marketKey === 'OVER_0_5') return 'Mais de 0.5 gols';
  if (marketKey === 'UNDER_0_5') return 'Menos de 0.5 gols';
  if (marketKey === 'OVER_3_5') return 'Mais de 3.5 gols';
  if (marketKey === 'UNDER_3_5') return 'Menos de 3.5 gols';
  if (marketKey === 'BTTS_YES') return 'Ambas Marcam: Sim';
  if (marketKey === 'BTTS_NO') return 'Ambas Marcam: Não';
  if (marketKey === 'DNB_HOME') return `${t1} (Empate Anula)`;
  if (marketKey === 'DNB_AWAY') return `${t2} (Empate Anula)`;
  if (marketKey === 'DC_12') return `${t1} ou ${t2}`;

  return marketKey;
}

/**
 * Evaluates a single leg result based on real scores and match status
 */
export function evaluateLegResult(
  market: string | undefined,
  homeScore: number | null | undefined,
  awayScore: number | null | undefined,
  matchStatus: 'scheduled' | 'live' | 'finished' | string | undefined
): BetLegStatus {
  if (!market) return 'pending';
  if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) {
    return 'pending';
  }

  const h = Number(homeScore);
  const a = Number(awayScore);
  const total = h + a;
  const isFinished = matchStatus === 'finished';

  switch (market) {
    // 1X2
    case 'HOME_WIN':
      if (isFinished) return h > a ? 'green' : 'red';
      return 'pending';

    case 'DRAW':
      if (isFinished) return h === a ? 'green' : 'red';
      return 'pending';

    case 'AWAY_WIN':
      if (isFinished) return a > h ? 'green' : 'red';
      return 'pending';

    // Dupla Hipótese / Dupla Chance
    case 'DC_1X':
    case 'DC_X1':
      if (isFinished) return h >= a ? 'green' : 'red';
      return 'pending';

    case 'DC_X2':
      if (isFinished) return a >= h ? 'green' : 'red';
      return 'pending';

    case 'DC_12':
      if (isFinished) return h !== a ? 'green' : 'red';
      return 'pending';

    // Over / Under
    case 'OVER_0_5':
      if (total >= 1) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'UNDER_0_5':
      if (total >= 1) return 'red';
      return isFinished ? 'green' : 'pending';

    case 'OVER_1_5':
      if (total >= 2) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'UNDER_1_5':
      if (total >= 2) return 'red';
      return isFinished ? 'green' : 'pending';

    case 'OVER_2_5':
      if (total >= 3) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'UNDER_2_5':
      if (total >= 3) return 'red';
      return isFinished ? 'green' : 'pending';

    case 'OVER_3_5':
      if (total >= 4) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'UNDER_3_5':
      if (total >= 4) return 'red';
      return isFinished ? 'green' : 'pending';

    // Ambas Marcam
    case 'BTTS_YES':
      if (h >= 1 && a >= 1) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'BTTS_NO':
      if (h >= 1 && a >= 1) return 'red';
      return isFinished ? 'green' : 'pending';

    // Empate Anula a Aposta
    case 'DNB_HOME':
      if (isFinished) {
        if (h > a) return 'green';
        if (h < a) return 'red';
        return 'void';
      }
      return 'pending';

    case 'DNB_AWAY':
      if (isFinished) {
        if (a > h) return 'green';
        if (a < h) return 'red';
        return 'void';
      }
      return 'pending';

    default:
      return 'pending';
  }
}

/**
 * Evaluates the overall Bet status from its individual legs.
 * Rule:
 * - Simple (1 leg): follows leg directly
 * - Multiple (2+ legs):
 *    - ANY leg Red => Bet is Perdida
 *    - ALL legs Green => Bet is Ganha
 *    - All legs resolved with at least 1 Green and rest Void => Bet is Ganha
 *    - All legs Void => Bet is Reembolsada
 *    - Otherwise (has Pending and NO Red) => Bet is Pendente
 */
export function evaluateBetStatusFromLegs(
  legs: BetLeg[] | undefined,
  fallbackStatus: BetStatus = 'Pendente',
  format?: BetFormat
): BetStatus {
  if (!legs || legs.length === 0) {
    return fallbackStatus;
  }

  const isMulti = format === 'Múltipla' || legs.length > 1;

  // Simples (1 perna)
  if (!isMulti) {
    const leg = legs[0];
    if (leg.status === 'green') return 'Ganha';
    if (leg.status === 'red') return 'Perdida';
    if (leg.status === 'void') return 'Reembolsada';
    return 'Pendente';
  }

  // Múltipla (2+ pernas)
  // Regra 1: Qualquer red => Aposta inteira Perdida
  if (legs.some((l) => l.status === 'red')) {
    return 'Perdida';
  }

  // Regra 2: Todas green => Ganha
  if (legs.every((l) => l.status === 'green')) {
    return 'Ganha';
  }

  // Regra 3: Todas finalizadas sem pendente e sem red, com pelo menos 1 green e o restante void => Ganha
  const allResolved = legs.every((l) => l.status === 'green' || l.status === 'void');
  if (allResolved && legs.some((l) => l.status === 'green')) {
    return 'Ganha';
  }

  // Regra 4: Todas void => Reembolsada
  if (legs.every((l) => l.status === 'void')) {
    return 'Reembolsada';
  }

  // Se possui pernas pendentes e nenhuma red => Pendente
  return 'Pendente';
}

/**
 * Pure calculation of profit given status, amount and odd.
 * Single source of truth.
 */
export function calculateBetProfit(status: BetStatus, amount: number, odd: number): number {
  const parsedAmount = Number(amount) || 0;
  const parsedOdd = Number(odd) || 1;

  if (status === 'Ganha') {
    return (parsedAmount * parsedOdd) - parsedAmount;
  }
  if (status === 'Perdida') {
    return -parsedAmount;
  }
  if (status === 'Reembolsada') {
    return 0;
  }
  return 0; // Pendente ou Cancelada
}

/**
 * Centralized calculation of Bankroll Stats (Lucro, ROI, Progressão).
 * Single source of truth for the Balanço module.
 */
export function calculateBankrollStats(bets: BetItem[], initialCapital: number): BankrollStats {
  const initCap = Number(initialCapital) || 0;
  let wonBets = 0;
  let lostBets = 0;
  let pendingBets = 0;
  let refundedBets = 0;
  let cancelledBets = 0;
  let totalStake = 0;
  let totalProfit = 0;

  for (const b of bets) {
    const amount = Number(b.amount) || 0;
    const odd = Number(b.odd) || 1;

    switch (b.status) {
      case 'Ganha':
        wonBets++;
        totalStake += amount;
        totalProfit += (amount * odd) - amount;
        break;
      case 'Perdida':
        lostBets++;
        totalStake += amount;
        totalProfit -= amount;
        break;
      case 'Reembolsada':
        refundedBets++;
        totalStake += amount;
        break;
      case 'Pendente':
        pendingBets++;
        break;
      case 'Cancelada':
        cancelledBets++;
        break;
      default:
        pendingBets++;
        break;
    }
  }

  const settledBets = wonBets + lostBets + refundedBets;
  const currentBankroll = initCap + totalProfit;
  const roi = totalStake > 0 ? (totalProfit / totalStake) * 100 : 0;
  const progression = initCap > 0 ? (totalProfit / initCap) * 100 : 0;

  return {
    totalBets: bets.length,
    settledBets,
    allBetsCount: bets.length,
    wonBets,
    lostBets,
    pendingBets,
    refundedBets,
    cancelledBets,
    totalStake,
    totalProfit,
    currentBankroll,
    roi,
    progression,
    initialCapital: initCap,
  };
}

/**
 * Extracts team1 and team2 from a title string (e.g. "Flamengo x Vasco" or "FEN vs ROM")
 * when bet has no explicit legs array.
 */
export function parseMatchupFromTitle(title: string | undefined): { team1: string; team2: string } | null {
  if (!title) return null;
  const firstMatch = title.split(/\s*\+\s*/)[0];
  const parts = firstMatch.split(/\s+(?:x|vs|v)\s+/i);
  if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
    return {
      team1: parts[0].trim(),
      team2: parts[1].trim(),
    };
  }
  return null;
}

/**
 * Synchronizes a bet with a list of matches and optional teamRawMatches.
 * Single source of truth for score synchronization across Index and Balance.
 */
export function syncBetWithMatches(
  bet: BetItem,
  matches: Match[],
  teamRawMatches?: Record<string | number, any[]>
): { updatedBet: BetItem; changed: boolean } {
  let effectiveLegs: BetLeg[] = bet.legs && bet.legs.length > 0 ? [...bet.legs] : [];

  // If bet has NO legs, attempt to auto-generate legs from title
  if (effectiveLegs.length === 0 && bet.title) {
    const rawMatches = bet.title.split(/\s*\+\s*/);
    const generated: BetLeg[] = [];
    for (const rm of rawMatches) {
      const parts = rm.split(/\s+(?:x|vs|v)\s+/i);
      if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
        const team1 = parts[0].trim();
        const team2 = parts[1].trim();
        generated.push({
          id: `gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          team1,
          team2,
          market: 'OVER_1_5',
          status: 'pending',
          matchTitle: `${team1} x ${team2}`,
        });
      }
    }
    if (generated.length > 0) {
      effectiveLegs = generated;
    }
  }

  if (effectiveLegs.length === 0) {
    return { updatedBet: bet, changed: false };
  }

  let anyLegChanged = false;

  const updatedLegs: BetLeg[] = effectiveLegs.map((leg) => {
    const official = resolveOfficialMatchResult(leg, matches, teamRawMatches);

    const homeScore = official.homeScore;
    const awayScore = official.awayScore;
    const matchStatus = official.status;
    const legMarket = leg.market || 'OVER_1_5';
    const newLegStatus = evaluateLegResult(legMarket, homeScore, awayScore, matchStatus);
    const scoreObj = official.scoreObj || leg.score || null;
    const isFinished = matchStatus === 'finished';
    const settledScore: [number, number] | null =
      isFinished && homeScore !== undefined && awayScore !== undefined
        ? [homeScore, awayScore]
        : isFinished
        ? leg.settledScore || null
        : null;

    const resolvedMatchId = official.matchId || leg.matchId || leg.id;

    if (
      newLegStatus !== leg.status ||
      matchStatus !== leg.matchStatus ||
      legMarket !== leg.market ||
      JSON.stringify(scoreObj) !== JSON.stringify(leg.score) ||
      JSON.stringify(settledScore) !== JSON.stringify(leg.settledScore) ||
      (resolvedMatchId && resolvedMatchId !== leg.matchId)
    ) {
      anyLegChanged = true;
      return {
        ...leg,
        matchId: resolvedMatchId,
        market: legMarket,
        status: newLegStatus,
        score: scoreObj,
        settledScore,
        matchStatus: matchStatus || leg.matchStatus || 'scheduled',
      };
    }

    return leg;
  });

  const newBetStatus = evaluateBetStatusFromLegs(updatedLegs, bet.status, bet.format);
  const newProfit = calculateBetProfit(newBetStatus, bet.amount, bet.odd);
  const statusChanged =
    newBetStatus !== bet.status || Math.abs(newProfit - (bet.profit ?? 0)) > 0.001;

  if (anyLegChanged || statusChanged || (effectiveLegs.length > 0 && (!bet.legs || bet.legs.length === 0))) {
    return {
      updatedBet: {
        ...bet,
        status: newBetStatus,
        profit: newProfit,
        legs: updatedLegs,
      },
      changed: true,
    };
  }

  return { updatedBet: bet, changed: false };
}

/**
 * Checks if a single bet leg has completed.
 * A leg is completed ONLY when its actual match has concluded/finished:
 * - leg.matchStatus is 'finished' (or 'FT', 'encerrado', 'finalizado', etc.)
 * - OR in teamRawMatches the match is recorded as finished / has a final result ('V' | 'E' | 'D')
 *
 * IMPORTANT RULES:
 * - Do NOT count matches that are in progress (live, halftime, etc.) as completed.
 * - Do NOT count matches that have not yet started (scheduled, fixture, etc.) as completed.
 * - The leg's betting outcome (green/red) before match conclusion does NOT make a match completed.
 */
export function isLegCompleted(
  leg: BetLeg,
  teamRawMatches?: Record<string | number, any[]>
): boolean {
  if (!leg) return false;

  // 1. If match is currently in progress (live / halftime), it is NEVER completed
  if (isLegLive(leg, teamRawMatches)) {
    return false;
  }

  const ms = (leg.matchStatus || '').toLowerCase().trim();

  // 2. If explicitly live or in progress, it is NOT completed
  if (
    ms === 'live' ||
    ms === 'halftime' ||
    ms === 'ao vivo' ||
    ms === 'em andamento' ||
    ms === '1t' ||
    ms === '2t' ||
    ms === 'intervalo' ||
    ms === 'started' ||
    ms === 'in_progress'
  ) {
    return false;
  }

  // 3. If explicitly scheduled / not started, it is NOT completed
  if (
    ms === 'scheduled' ||
    ms === 'notstarted' ||
    ms === 'ns' ||
    ms === 'fixture' ||
    ms === 'agendado' ||
    ms === 'programado' ||
    ms === 'a iniciar'
  ) {
    return false;
  }

  // 4. If explicitly finished, it IS completed
  if (
    ms === 'finished' ||
    ms === 'ft' ||
    ms === 'encerrado' ||
    ms === 'finalizado' ||
    ms === 'concluido' ||
    ms === 'concluído' ||
    ms === 'ended' ||
    ms === 'pen' ||
    ms === 'aet'
  ) {
    return true;
  }

  // 5. Check against teamRawMatches if provided
  if (teamRawMatches) {
    const allMatches = Object.values(teamRawMatches).flat();
    const match = allMatches.find((m) => {
      if (!m) return false;
      if (leg.matchId && String(m.id) === String(leg.matchId)) return true;
      const mHome = String(m.homeTeam || m.home || '').toLowerCase().trim();
      const mAway = String(m.awayTeam || m.away || '').toLowerCase().trim();
      const l1 = (leg.team1 || '').toLowerCase().trim();
      const l2 = (leg.team2 || '').toLowerCase().trim();
      if (mHome && mAway && l1 && l2) {
        return (mHome.includes(l1) || l1.includes(mHome)) && (mAway.includes(l2) || l2.includes(mAway));
      }
      return false;
    });

    if (match) {
      const matchStatusStr = String(match.status || '').toLowerCase().trim();
      if (
        matchStatusStr === 'finished' ||
        match.result === 'V' ||
        match.result === 'E' ||
        match.result === 'D'
      ) {
        return true;
      }
      if (
        matchStatusStr === 'live' ||
        matchStatusStr === 'halftime' ||
        matchStatusStr === 'scheduled' ||
        matchStatusStr === 'ns'
      ) {
        return false;
      }
    }
  }

  // 6. Leg is pending outcome and has no finished flag => NOT completed
  if (leg.status === 'pending') {
    return false;
  }

  // 7. Fallback for older persisted bets: if settledScore exists and status is settled (not pending) and not scheduled
  if (
    leg.settledScore &&
    (leg.status === 'green' || leg.status === 'red' || leg.status === 'void') &&
    ms !== 'scheduled' &&
    ms !== 'notstarted' &&
    ms !== 'ns'
  ) {
    return true;
  }

  return false;
}

/**
 * Returns the game counter progress for a bet slip (completed / total).
 * E.g., for a 3-game multiple bet: initially 0/3, then 1/3, 2/3, 3/3 as games finish.
 *
 * The first number represents EXCLUSIVELY the number of completed matches,
 * while the second number represents the total number of matches on the ticket.
 */
export function getBetGameProgress(
  bet: BetItem,
  teamRawMatches?: Record<string | number, any[]>
): { completed: number; total: number } {
  if (bet.legs && bet.legs.length > 0) {
    const total = bet.legs.length;
    const completed = bet.legs.filter((leg) => isLegCompleted(leg, teamRawMatches)).length;
    return { completed: Math.min(completed, total), total };
  }

  // Fallback for legacy bets without legs array
  const rawParts = bet.title ? bet.title.split(/\s*\+\s*/).filter(Boolean) : [];
  const total = rawParts.length > 0 ? rawParts.length : 1;

  if (teamRawMatches && bet.title) {
    const allMatches = Object.values(teamRawMatches).flat();
    let completedCount = 0;
    for (const part of rawParts) {
      const matchup = parseMatchupFromTitle(part);
      if (matchup) {
        const t1 = matchup.team1.toLowerCase().trim();
        const t2 = matchup.team2.toLowerCase().trim();
        const m = allMatches.find((matchItem) => {
          if (!matchItem) return false;
          const mHome = String(matchItem.homeTeam || matchItem.home || '').toLowerCase().trim();
          const mAway = String(matchItem.awayTeam || matchItem.away || '').toLowerCase().trim();
          return (
            mHome &&
            mAway &&
            (mHome.includes(t1) || t1.includes(mHome)) &&
            (mAway.includes(t2) || t2.includes(mAway))
          );
        });
        if (m) {
          const ms = String(m.status || '').toLowerCase().trim();
          if (ms === 'finished' || m.result === 'V' || m.result === 'E' || m.result === 'D') {
            completedCount++;
          }
        }
      }
    }
    if (completedCount > 0) {
      return { completed: Math.min(completedCount, total), total };
    }
  }

  const isSettled = bet.status === 'Ganha' || bet.status === 'Perdida' || bet.status === 'Reembolsada';
  return {
    completed: isSettled ? total : 0,
    total,
  };
}

/**
 * Checks if a single bet leg is currently in progress (live).
 * Returns true if the match is currently live or in halftime.
 * Returns false when the match is finished, scheduled, or cancelled.
 */
export function isLegLive(
  leg: BetLeg,
  teamRawMatches?: Record<string | number, any[]>
): boolean {
  if (!leg) return false;
  // If explicitly finished, not live
  if (leg.matchStatus === 'finished') return false;

  const ms = (leg.matchStatus || '').toLowerCase().trim();
  if (
    ms === 'live' ||
    ms === 'halftime' ||
    ms === 'ao vivo' ||
    ms === 'em andamento' ||
    ms === '1t' ||
    ms === '2t' ||
    ms === 'intervalo'
  ) {
    return true;
  }

  // Check against teamRawMatches if provided
  if (teamRawMatches) {
    const allMatches = Object.values(teamRawMatches).flat();
    const match = allMatches.find((m) => {
      if (!m) return false;
      if (leg.matchId && String(m.id) === String(leg.matchId)) return true;
      const mHome = String(m.homeTeam || m.home || '').toLowerCase().trim();
      const mAway = String(m.awayTeam || m.away || '').toLowerCase().trim();
      const l1 = (leg.team1 || '').toLowerCase().trim();
      const l2 = (leg.team2 || '').toLowerCase().trim();
      if (mHome && mAway && l1 && l2) {
        return (mHome.includes(l1) || l1.includes(mHome)) && (mAway.includes(l2) || l2.includes(mAway));
      }
      return false;
    });

    if (match) {
      if (match.status === 'finished') return false;
      const mStatus = String(match.status || '').toLowerCase().trim();
      if (
        mStatus === 'live' ||
        mStatus === 'halftime' ||
        mStatus === 'ao vivo' ||
        mStatus === 'em andamento'
      ) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Checks if a bet slip currently has at least one game in progress (live).
 * Displays the indicator only when at least one game on the bet slip is currently live.
 * The indicator automatically disappears once there are no more live games on that bet slip.
 */
export function isBetLive(
  bet: BetItem,
  teamRawMatches?: Record<string | number, any[]>
): boolean {
  if (!bet) return false;

  if (bet.legs && bet.legs.length > 0) {
    return bet.legs.some((leg) => isLegLive(leg, teamRawMatches));
  }

  // Fallback for legacy bets without legs array
  if (teamRawMatches && bet.status === 'Pendente' && bet.title) {
    const allMatches = Object.values(teamRawMatches).flat();
    const parts = bet.title.split(/\s*\+\s*/).filter(Boolean);
    return parts.some((part) => {
      const matchup = parseMatchupFromTitle(part);
      if (!matchup) return false;
      const t1 = matchup.team1.toLowerCase().trim();
      const t2 = matchup.team2.toLowerCase().trim();
      const match = allMatches.find((m) => {
        if (!m) return false;
        const mHome = String(m.homeTeam || m.home || '').toLowerCase().trim();
        const mAway = String(m.awayTeam || m.away || '').toLowerCase().trim();
        return (
          mHome &&
          mAway &&
          (mHome.includes(t1) || t1.includes(mHome)) &&
          (mAway.includes(t2) || t2.includes(mAway))
        );
      });
      if (match) {
        if (match.status === 'finished') return false;
        const ms = String(match.status || '').toLowerCase().trim();
        return ms === 'live' || ms === 'halftime' || ms === 'ao vivo' || ms === 'em andamento';
      }
      return false;
    });
  }

  return false;
}


