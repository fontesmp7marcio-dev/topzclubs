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
  status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
  isFinished: boolean;
  isLive: boolean;
  isPostponed?: boolean;
  isCancelled?: boolean;
  isVoided?: boolean;
  matchId?: string;
  matchDate?: string;
  matchTime?: string;
  source: 'direct' | 'dateMatches' | 'teamRaw' | 'none';
}

const normForMatchingCache = new Map<string, string>();

/**
 * Canonical normalizer for robust club name matching across sources
 */
export function normalizeTeamForMatching(name: string): string {
  if (!name) return '';
  const cached = normForMatchingCache.get(name);
  if (cached !== undefined) return cached;

  let s = name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_./]/g, ' ')
    .replace(/\b(fc|sc|cf|ac|as|sk|afc|vfl|vfb|rb|ec|cr|se|cd)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Canonicalize common Brazilian and international team aliases
  if (s === 'atletico mg' || s === 'atletico mineiro' || s === 'cam') s = 'atletico mineiro';
  else if (s === 'athletico pr' || s === 'athletico paranaense' || s === 'atletico pr' || s === 'cap') s = 'athletico paranaense';
  else if (s === 'america mg' || s === 'america mineiro') s = 'america mineiro';
  else if (s === 'america rn' || s === 'america de natal') s = 'america de natal';
  else if (s === 'botafogo sp' || s === 'botafogo ribeirao preto') s = 'botafogo sp';
  else if (s === 'botafogo pb' || s === 'botafogo da paraiba') s = 'botafogo pb';
  else if (s === 'bragantino' || s === 'red bull bragantino') s = 'bragantino';
  else if (s === 'sporting' || s === 'sporting cp' || s === 'sporting lisboa' || s === 'sporting clube de portugal') s = 'sporting cp';
  else if (s === 'psg' || s === 'paris saint germain' || s === 'paris') s = 'psg';
  else if (s === 'bayern' || s === 'bayern munchen' || s === 'bayern munich') s = 'bayern munich';
  else if (s === 'inter' || s === 'inter milan' || s === 'internazionale' || s === 'inter de milao') s = 'inter milan';
  else if (s === 'inter miami' || s === 'inter miami cf') s = 'inter miami';
  else if (s === 'man city' || s === 'manchester city') s = 'manchester city';
  else if (s === 'man utd' || s === 'man utd fc' || s === 'manchester united') s = 'manchester united';
  else if (s === 'barcelona' || s === 'fc barcelona') s = 'barcelona';
  else if (s === 'barcelona sc' || s === 'barcelona guayaquil') s = 'barcelona sc';
  else if (s === 'real madrid') s = 'real madrid';
  else if (s === 'atletico madrid' || s === 'atletico de madrid') s = 'atletico madrid';

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

  normForMatchingCache.set(name, s);
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

function normalizeBetSyncDate(d?: string): string {
  if (!d) return '';
  const s = String(d).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  if (s.includes('/')) {
    const parts = s.split(' ')[0].split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const yr = year.length === 2 ? `20${year}` : year;
      return `${yr}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  return '';
}

function getDateDiffDays(d1?: string, d2?: string): number | null {
  const n1 = normalizeBetSyncDate(d1);
  const n2 = normalizeBetSyncDate(d2);
  if (!n1 || !n2) return null;
  const t1 = Date.parse(`${n1}T12:00:00Z`);
  const t2 = Date.parse(`${n2}T12:00:00Z`);
  if (isNaN(t1) || isNaN(t2)) return null;
  return Math.abs(Math.round((t1 - t2) / 86400000));
}

interface MatchesIndex {
  byId: Map<string, Match>;
  byExactPair: Map<string, Match[]>;
  list: Match[];
}

interface TeamRawIndex {
  byId: Map<string, any>;
  byExactPair: Map<string, any[]>;
  allUnique: Array<{ raw: any; hNorm: string; aNorm: string; dateNorm: string }>;
}

const matchesIndexCache = new WeakMap<Match[], MatchesIndex>();
const teamRawIndexCache = new WeakMap<Record<string | number, any[]>, TeamRawIndex>();

function getMatchesIndex(matches: Match[]): MatchesIndex {
  const cached = matchesIndexCache.get(matches);
  if (cached) return cached;

  const byId = new Map<string, Match>();
  const byExactPair = new Map<string, Match[]>();

  for (const m of matches) {
    if (!m) continue;
    if (m.id !== undefined && m.id !== null) {
      const idStr = String(m.id);
      const existing = byId.get(idStr);
      // Prefer terminal / voided / live entries over scheduled ones if duplicates exist in pool
      if (!existing || ((m as any).isVoided && !(existing as any).isVoided) || (m.status === 'finished' && existing.status !== 'finished') || (m.status === 'cancelled' && existing.status !== 'cancelled')) {
        byId.set(idStr, m);
      }
    }
    if (m.team1 && m.team2) {
      const key = `${normalizeTeamForMatching(m.team1)}___${normalizeTeamForMatching(m.team2)}`;
      const arr = byExactPair.get(key);
      if (arr) arr.push(m);
      else byExactPair.set(key, [m]);
    }
  }

  const idx = { byId, byExactPair, list: matches };
  matchesIndexCache.set(matches, idx);
  return idx;
}

function getTeamRawIndex(teamRawMatches: Record<string | number, any[]>): TeamRawIndex {
  const cached = teamRawIndexCache.get(teamRawMatches);
  if (cached) return cached;

  const byId = new Map<string, any>();
  const byExactPair = new Map<string, any[]>();
  const seenObjects = new Set<any>();
  const allUnique: Array<{ raw: any; hNorm: string; aNorm: string; dateNorm: string }> = [];

  for (const list of Object.values(teamRawMatches)) {
    if (!Array.isArray(list)) continue;
    for (const m of list) {
      if (!m || seenObjects.has(m)) continue;
      seenObjects.add(m);

      const idStr = m.id !== undefined && m.id !== null ? String(m.id) : '';
      if (idStr) {
        const existing = byId.get(idStr);
        if (!existing || (extractStatusFromMatch(m) === 'finished' && extractStatusFromMatch(existing) !== 'finished')) {
          byId.set(idStr, m);
        }
      }

      const mHome = m.homeTeam || m.home || m.team1 || '';
      const mAway = m.awayTeam || m.away || m.team2 || '';
      if (mHome && mAway) {
        const hNorm = normalizeTeamForMatching(String(mHome));
        const aNorm = normalizeTeamForMatching(String(mAway));
        const dateNorm = normalizeBetSyncDate(m.date || m.utcTime);
        const key = `${hNorm}___${aNorm}`;
        const arr = byExactPair.get(key);
        if (arr) arr.push(m);
        else byExactPair.set(key, [m]);
        allUnique.push({ raw: m, hNorm, aNorm, dateNorm });
      }
    }
  }

  const idx = { byId, byExactPair, allUnique };
  teamRawIndexCache.set(teamRawMatches, idx);
  return idx;
}

function pickBestCandidateByDate<T extends { date?: string; utcTime?: string }>(
  candidates: T[],
  targetDate?: string
): T | undefined {
  if (!candidates || candidates.length === 0) return undefined;
  if (candidates.length === 1) {
    const diff = getDateDiffDays(candidates[0].date || candidates[0].utcTime, targetDate);
    if (diff === null || diff <= 2) return candidates[0];
    return undefined;
  }
  const normTarget = normalizeBetSyncDate(targetDate);
  if (!normTarget) return candidates[0];

  let best: T | undefined;
  let bestDiff = Infinity;
  for (const c of candidates) {
    const diff = getDateDiffDays(c.date || c.utcTime, normTarget);
    if (diff === null) {
      if (!best) best = c;
      continue;
    }
    if (diff <= 2 && diff < bestDiff) {
      bestDiff = diff;
      best = c;
    }
  }
  return best;
}

function findRawMatchForLeg(
  leg: { id?: string | number; matchId?: string | number; team1?: string; team2?: string; date?: string },
  teamRawMatches?: Record<string | number, any[]>
): any | undefined {
  if (!teamRawMatches) return undefined;
  const idx = getTeamRawIndex(teamRawMatches);
  const targetId = leg.matchId ? String(leg.matchId) : leg.id ? String(leg.id) : '';
  if (targetId) {
    const direct = idx.byId.get(targetId);
    if (direct) return direct;
  }
  if (leg.team1 && leg.team2) {
    const hNorm = normalizeTeamForMatching(leg.team1);
    const aNorm = normalizeTeamForMatching(leg.team2);
    const exact = idx.byExactPair.get(`${hNorm}___${aNorm}`);
    if (exact && exact.length > 0) {
      const picked = pickBestCandidateByDate(exact, leg.date);
      if (picked) return picked;
    }
    const candidates: any[] = [];
    for (const item of idx.allUnique) {
      const hMatch = item.hNorm === hNorm || (item.hNorm.length >= 4 && hNorm.length >= 4 && (item.hNorm.includes(hNorm) || hNorm.includes(item.hNorm)));
      if (!hMatch) continue;
      const aMatch = item.aNorm === aNorm || (item.aNorm.length >= 4 && aNorm.length >= 4 && (item.aNorm.includes(aNorm) || aNorm.includes(item.aNorm)));
      if (aMatch) candidates.push(item.raw);
    }
    if (candidates.length > 0) {
      return pickBestCandidateByDate(candidates, leg.date);
    }
  }
  return undefined;
}

/**
 * Extracts numeric scores [homeScore, awayScore] from any match object shape.
 * Guards against synthetic 0-0 scores on scheduled/postponed/cancelled matches.
 */
export function extractScoreFromMatch(m: any): { homeScore?: number; awayScore?: number } {
  if (!m) return {};

  const rawMatchStatus = String(m.matchStatus || (typeof m.status === 'string' ? m.status : m.status?.reason?.short) || '')
    .toLowerCase()
    .trim();
  if (
    rawMatchStatus === 'scheduled' ||
    rawMatchStatus === 'notstarted' ||
    rawMatchStatus === 'ns' ||
    rawMatchStatus === 'cancelled' ||
    rawMatchStatus === 'canceled' ||
    rawMatchStatus === 'canc' ||
    rawMatchStatus === 'can' ||
    rawMatchStatus === 'postponed' ||
    rawMatchStatus === 'postp' ||
    rawMatchStatus === 'adia' ||
    rawMatchStatus === 'adiado'
  ) {
    return {};
  }

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
 * Normalizes match status across all formats into 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled'
 */
export function extractStatusFromMatch(m: any): 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled' {
  if (!m) return 'scheduled';
  const s = String(m.status?.reason?.short || (typeof m.status === 'string' ? m.status : '') || m.matchStatus || '')
    .toLowerCase()
    .trim();

  if (
    s === 'cancelled' ||
    s === 'canceled' ||
    s === 'canc' ||
    s === 'can' ||
    s === 'aband' ||
    s === 'abandoned' ||
    m.cancelled === true ||
    m.status?.cancelled === true
  ) {
    return 'cancelled';
  }

  if (
    s === 'postponed' ||
    s === 'adiado' ||
    s === 'postp' ||
    s === 'adia' ||
    s === 'susp' ||
    m.isPostponed === true
  ) {
    return 'postponed';
  }

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
    m.status?.finished === true ||
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
    s === 'in_progress' ||
    (m.status?.started === true && !m.status?.finished)
  ) {
    return 'live';
  }

  return 'scheduled';
}

/**
 * Single Source of Truth to resolve the official match result & score from:
 * 1) Provided matches list (e.g. dayMatches or dateMatches from FotMob)
 * 2) teamRawMatches (verified past fixtures for favorite clubs from FotMob)
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

  // Fast path when no external feeds are provided
  if (matches.length === 0 && !teamRawMatches) {
    const status = extractStatusFromMatch(target);
    const targetScores = extractScoreFromMatch(target);
    const hasScore =
      typeof targetScores.homeScore === 'number' && typeof targetScores.awayScore === 'number';
    return {
      homeScore: targetScores.homeScore,
      awayScore: targetScores.awayScore,
      scoreText: hasScore ? `${targetScores.homeScore} - ${targetScores.awayScore}` : null,
      scoreObj: hasScore ? { ft: [targetScores.homeScore!, targetScores.awayScore!] } : null,
      status,
      isFinished: status === 'finished',
      isLive: status === 'live',
      isPostponed: status === 'postponed',
      isCancelled: status === 'cancelled',
      isVoided: false,
      matchId: targetId || undefined,
      source: 'none',
    };
  }

  // 1. Check in matches list (FotMob daily feed & direct matchDetails entries)
  let matchFound: Match | undefined;
  if (matches.length > 0) {
    const idx = getMatchesIndex(matches);
    if (targetId) {
      matchFound = idx.byId.get(targetId);
    }
    if (!matchFound && target.team1 && target.team2) {
      const key = `${normalizeTeamForMatching(target.team1)}___${normalizeTeamForMatching(target.team2)}`;
      const exactList = idx.byExactPair.get(key);
      if (exactList && exactList.length > 0) {
        matchFound = pickBestCandidateByDate(exactList, target.date);
      }
      if (!matchFound) {
        const fuzzyCandidates = idx.list.filter((m) =>
          matchTeams(m.team1, m.team2, target.team1, target.team2)
        );
        if (fuzzyCandidates.length > 0) {
          matchFound = pickBestCandidateByDate(fuzzyCandidates, target.date);
        }
      }
    }
  }

  // 2. Check in teamRawMatches (FotMob past finished fixtures)
  const rawMatchFound = findRawMatchForLeg(target, teamRawMatches);

  let homeScore: number | undefined;
  let awayScore: number | undefined;
  let status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled' = 'scheduled';

  // Check candidate from FotMob matches list (authoritative for date/matchDetails)
  if (matchFound) {
    status = extractStatusFromMatch(matchFound);
    const scores = extractScoreFromMatch(matchFound);
    homeScore = scores.homeScore;
    awayScore = scores.awayScore;
  }

  // Check candidate from teamRawMatches (for past verified results if not in matches or if rawMatch has definitive verified finished status)
  if (rawMatchFound) {
    const rawStatus = extractStatusFromMatch(rawMatchFound);
    const rawScores = extractScoreFromMatch(rawMatchFound);
    if (
      rawStatus === 'finished' &&
      rawScores.homeScore !== undefined &&
      rawScores.awayScore !== undefined &&
      !(matchFound as any)?.isVoided &&
      status !== 'cancelled'
    ) {
      homeScore = rawScores.homeScore;
      awayScore = rawScores.awayScore;
      status = 'finished';
    } else if (!matchFound) {
      if (rawScores.homeScore !== undefined && rawScores.awayScore !== undefined) {
        homeScore = rawScores.homeScore;
        awayScore = rawScores.awayScore;
      }
      status = rawStatus;
    }
  }

  // Only if neither matchFound nor rawMatchFound was found in FotMob data, check target's existing fields
  if (!matchFound && !rawMatchFound) {
    status = extractStatusFromMatch(target);
    const targetScores = extractScoreFromMatch(target);
    homeScore = targetScores.homeScore;
    awayScore = targetScores.awayScore;
  }

  const isFinished = status === 'finished';
  const isLive = status === 'live';
  const isPostponed = status === 'postponed';
  const isCancelled = status === 'cancelled';
  const isVoided = Boolean((matchFound as any)?.isVoided) || isCancelled;
  const hasScore =
    (isFinished || isLive) && typeof homeScore === 'number' && typeof awayScore === 'number';

  const resolvedMatchDate =
    normalizeBetSyncDate(matchFound?.date || rawMatchFound?.date || rawMatchFound?.utcTime) || undefined;
  const resolvedMatchTime =
    (typeof matchFound?.time === 'string' && /^\d{1,2}:\d{2}/.test(matchFound.time) ? matchFound.time.slice(0, 5) : undefined) ||
    (typeof rawMatchFound?.time === 'string' && /^\d{1,2}:\d{2}/.test(rawMatchFound.time) ? rawMatchFound.time.slice(0, 5) : undefined);

  return {
    homeScore: hasScore ? homeScore : undefined,
    awayScore: hasScore ? awayScore : undefined,
    scoreText: hasScore ? `${homeScore} - ${awayScore}` : null,
    scoreObj: hasScore ? { ft: [homeScore!, awayScore!] } : null,
    status,
    isFinished,
    isLive,
    isPostponed,
    isCancelled,
    isVoided,
    matchId: matchFound ? String(matchFound.id) : rawMatchFound ? String(rawMatchFound.id) : (targetId || undefined),
    matchDate: resolvedMatchDate,
    matchTime: resolvedMatchTime,
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
  matchStatus: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled' | string | undefined
): BetLegStatus {
  const normStatus = String(matchStatus || '').toLowerCase().trim();
  if (normStatus === 'cancelled' || normStatus === 'canceled' || normStatus === 'canc' || normStatus === 'can' || normStatus === 'void') {
    return 'void';
  }
  if (normStatus === 'scheduled' || normStatus === 'postponed') {
    return 'pending';
  }
  if (!market) return 'pending';
  if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) {
    return 'pending';
  }

  const h = Number(homeScore);
  const a = Number(awayScore);
  const total = h + a;
  const isFinished = normStatus === 'finished';

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

    let newLegStatus: BetLegStatus;
    if (official.isVoided) {
      newLegStatus = 'void';
    } else if (leg.status === 'void' && (matchStatus === 'postponed' || official.source === 'none')) {
      newLegStatus = 'void';
    } else if (
      official.source === 'none' &&
      (leg.status === 'green' || leg.status === 'red') &&
      matchStatus === 'scheduled'
    ) {
      // Preserve manually settled legs when no live FotMob override was returned
      newLegStatus = leg.status;
    } else {
      newLegStatus = evaluateLegResult(legMarket, homeScore, awayScore, matchStatus);
    }

    const isScheduledOrVoid =
      matchStatus === 'scheduled' || matchStatus === 'cancelled' || matchStatus === 'postponed';
    const scoreObj = isScheduledOrVoid
      ? null
      : official.scoreObj || (leg.matchStatus !== 'scheduled' ? leg.score : null) || null;
    const isFinished = matchStatus === 'finished';
    const settledScore: [number, number] | null =
      isFinished && homeScore !== undefined && awayScore !== undefined
        ? [homeScore, awayScore]
        : isFinished
        ? leg.settledScore || null
        : null;

    const resolvedMatchId = official.matchId || leg.matchId || leg.id;
    const resolvedLegDate = official.matchDate || leg.date;
    const resolvedLegTime = official.matchTime || leg.time;

    if (
      newLegStatus !== leg.status ||
      matchStatus !== leg.matchStatus ||
      legMarket !== leg.market ||
      JSON.stringify(scoreObj) !== JSON.stringify(leg.score) ||
      JSON.stringify(settledScore) !== JSON.stringify(leg.settledScore) ||
      (resolvedMatchId && resolvedMatchId !== leg.matchId) ||
      (resolvedLegDate && resolvedLegDate !== leg.date) ||
      (resolvedLegTime && resolvedLegTime !== leg.time)
    ) {
      anyLegChanged = true;
      return {
        ...leg,
        matchId: resolvedMatchId,
        date: resolvedLegDate,
        time: resolvedLegTime,
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

  // 3. Cancelled or voided legs count as resolved/completed
  if (
    leg.status === 'void' ||
    ms === 'cancelled' ||
    ms === 'canceled' ||
    ms === 'canc' ||
    ms === 'can' ||
    ms === 'aband'
  ) {
    return true;
  }

  // 4. If explicitly scheduled / not started or postponed, it is NOT completed (unless already graded green/red with real score below)
  if (
    ms === 'postponed' ||
    ms === 'postp' ||
    ms === 'adia' ||
    ms === 'adiado' ||
    ms === 'susp'
  ) {
    return false;
  }

  // 5. If explicitly finished, it IS completed
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

  // 6. Check against indexed teamRawMatches if provided (O(1) lookup)
  if (teamRawMatches) {
    const match = findRawMatchForLeg(leg, teamRawMatches);
    if (match) {
      const matchStatusStr = String(match.status || '').toLowerCase().trim();
      if (
        matchStatusStr === 'finished' ||
        matchStatusStr === 'cancelled' ||
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

  // 7. Leg is pending outcome and has no finished flag => NOT completed
  if (leg.status === 'pending') {
    return false;
  }

  // 8. Settled fallback (green/red) when real score is already recorded
  if (
    (leg.status === 'green' || leg.status === 'red') &&
    (leg.settledScore || leg.score?.ft)
  ) {
    return true;
  }

  return false;
}

/**
 * Returns the game counter progress for a bet slip (completed / total).
 */
export function getBetGameProgress(
  bet: BetItem,
  teamRawMatches?: Record<string | number, any[]>
): { completed: number; total: number } {
  if (bet.legs && bet.legs.length > 0) {
    const total = bet.legs.length;
    let completed = 0;
    for (let i = 0; i < total; i++) {
      if (isLegCompleted(bet.legs[i], teamRawMatches)) completed++;
    }
    return { completed: Math.min(completed, total), total };
  }

  // Fallback for legacy bets without legs array
  const rawParts = bet.title ? bet.title.split(/\s*\+\s*/).filter(Boolean) : [];
  const total = rawParts.length > 0 ? rawParts.length : 1;

  if (teamRawMatches && bet.title) {
    let completedCount = 0;
    for (const part of rawParts) {
      const matchup = parseMatchupFromTitle(part);
      if (matchup) {
        const m = findRawMatchForLeg({ team1: matchup.team1, team2: matchup.team2, date: bet.date }, teamRawMatches);
        if (m) {
          const ms = String(m.status || '').toLowerCase().trim();
          if (ms === 'finished' || ms === 'cancelled' || m.result === 'V' || m.result === 'E' || m.result === 'D') {
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
 */
export function isLegLive(
  leg: BetLeg,
  teamRawMatches?: Record<string | number, any[]>
): boolean {
  if (!leg) return false;
  if (leg.matchStatus === 'finished' || leg.matchStatus === 'cancelled') return false;

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

  // Check against indexed teamRawMatches if provided
  if (teamRawMatches) {
    const match = findRawMatchForLeg(leg, teamRawMatches);
    if (match) {
      if (match.status === 'finished' || match.status === 'cancelled') return false;
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
 */
export function isBetLive(
  bet: BetItem,
  teamRawMatches?: Record<string | number, any[]>
): boolean {
  if (!bet) return false;

  if (bet.legs && bet.legs.length > 0) {
    return bet.legs.some((leg) => isLegLive(leg, teamRawMatches));
  }

  if (teamRawMatches && bet.status === 'Pendente' && bet.title) {
    const parts = bet.title.split(/\s*\+\s*/).filter(Boolean);
    return parts.some((part) => {
      const matchup = parseMatchupFromTitle(part);
      if (!matchup) return false;
      const match = findRawMatchForLeg({ team1: matchup.team1, team2: matchup.team2, date: bet.date }, teamRawMatches);
      if (match) {
        if (match.status === 'finished' || match.status === 'cancelled') return false;
        const ms = String(match.status || '').toLowerCase().trim();
        return ms === 'live' || ms === 'halftime' || ms === 'ao vivo' || ms === 'em andamento';
      }
      return false;
    });
  }

  return false;
}


