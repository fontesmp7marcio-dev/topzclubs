import { Match, MatchFilters, MatchItem, DEFAULT_MATCH_FILTERS } from '../types';
import { isTeamNameInFavorites, normalizeTeamName } from '../data/favoriteClubs';
import { getTeamId } from './teamCrests';
import { HISTORICAL_MATCHES_DATA } from '../data/historicalMatches';

/**
 * Determines whether a tournament / league is classified as a Cup (Copa / Torneio Eliminatório / Continental / Internacional)
 * or a League (Liga / Pontos Corridos).
 */
export function isCupCompetition(competitionName?: string, leagueId?: number): boolean {
  if (!competitionName) return false;
  const lower = competitionName.toLowerCase().trim();

  // 1. Continental & International Tournaments that are Cups / Knockout format
  if (
    lower.includes('champions league') ||
    lower.includes('europa league') ||
    lower.includes('conference league') ||
    lower.includes('libertadores') ||
    lower.includes('sudamericana') ||
    lower.includes('recopa') ||
    lower.includes('nations league') ||
    lower.includes('world cup') ||
    lower.includes('mundial') ||
    lower.includes('club world cup') ||
    lower.includes('copa américa') ||
    lower.includes('copa america') ||
    lower.includes('euro') ||
    lower.includes('gold cup') ||
    lower.includes('leagues cup')
  ) {
    return true;
  }

  // 2. Common Cup keywords (e.g., Copa do Brasil, FA Cup, Copa del Rey, DFB Pokal, Taça de Portugal)
  if (
    /\b(copa|cup|coppa|coupe|pokal|taça|taca|beker|trophy|shield)\b/i.test(lower) ||
    lower.includes('supercup') ||
    lower.includes('supercopa') ||
    lower.includes('supercoppa') ||
    lower.includes('super coupe') ||
    lower.includes('super taça') ||
    lower.includes('super cup')
  ) {
    return true;
  }

  // 3. Friendly and exhibition tournaments
  if (lower.includes('friendly') || lower.includes('amistoso') || lower.includes('friendlies')) {
    return true;
  }

  return false;
}

/**
 * Returns true if the competition is a League (Pontos Corridos)
 */
export function isLeagueCompetition(competitionName?: string, leagueId?: number): boolean {
  return !isCupCompetition(competitionName, leagueId);
}

/**
 * Centralized filter for past matches of a specific club.
 * Strictly applies:
 * - Competição (Liga vs Copa vs Liga + Copa)
 * - Mando (Casa vs Fora vs Casa + Fora)
 * - Histórico Window (Últimos 5 ou Últimos 10 jogos)
 *
 * @param matches Raw matches from FotMob (most recent first)
 * @param filters Active filters
 * @param teamName Club name
 * @param teamId Club FotMob ID
 */
export function filterTeamPastMatches(
  matches: MatchItem[],
  filters?: MatchFilters,
  teamName?: string,
  teamId?: number
): MatchItem[] {
  if (!matches || !Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  const effectiveFilters = filters || DEFAULT_MATCH_FILTERS;
  const normTeam = normalizeTeamName(teamName || '');

  // 1. Competição Filter
  const compFiltered = matches.filter((m) => {
    const isCup = m.isCup !== undefined ? m.isCup : isCupCompetition(m.competition);
    if (effectiveFilters.competition === 'league') {
      return !isCup;
    }
    if (effectiveFilters.competition === 'cup') {
      return isCup;
    }
    return true; // 'all' -> Liga + Copa
  });

  // 2. Mando Filter
  const mandoFiltered = compFiltered.filter((m) => {
    let isHome = false;
    if (teamId && m.homeId && m.homeId === teamId) {
      isHome = true;
    } else if (teamId && m.awayId && m.awayId === teamId) {
      isHome = false;
    } else {
      isHome = normalizeTeamName(m.homeTeam) === normTeam;
    }

    if (effectiveFilters.mando === 'home') {
      return isHome;
    }
    if (effectiveFilters.mando === 'away') {
      return !isHome;
    }
    return true; // 'all' -> Casa + Fora
  });

  // 3. Histórico Window (up to 5 or 10 valid games)
  return mandoFiltered.slice(0, effectiveFilters.window || 5);
}

/**
 * Computes the emoji for a single match according to the app's established mathematical rules:
 * - Total goals < 2 (0 or 1 goal): 🔥 (Jogo Frio / Under 1.5)
 * - Derrota (D / L): 🔻
 * - Empate (E): 🛡️
 * - Vitória (V / W): ✅
 */
export function calculateMatchEmoji(m: MatchItem): string {
  const totalGoals =
    typeof m.homeScore === 'number' && typeof m.awayScore === 'number'
      ? m.homeScore + m.awayScore
      : 99;

  // Under 1.5 goals (0 or 1 goal in the match) is always 🔥 (Jogo Frio)
  if (totalGoals < 2) {
    return '🔥';
  }

  const resUpper = m.result?.toUpperCase() || '';
  if (resUpper === 'D' || resUpper === 'L') return '🔻';
  if (resUpper === 'E') return '🛡️';
  if (resUpper === 'V' || resUpper === 'W') return '✅';

  // If result flag is not explicitly provided, calculate dynamically from scores
  if (typeof m.homeScore === 'number' && typeof m.awayScore === 'number') {
    if (m.homeScore === m.awayScore) return '🛡️';
    if (m.isHome === true) {
      return m.homeScore > m.awayScore ? '✅' : '🔻';
    } else if (m.isHome === false) {
      return m.awayScore > m.homeScore ? '✅' : '🔻';
    } else {
      return m.homeScore > m.awayScore ? '✅' : '🔻';
    }
  }

  return '✅';
}

/**
 * Calculates the emoji sequence for a filtered list of matches.
 * Matches are ordered exactly as displayed in the Historical Calendar (most recent first).
 * Produces the sequence corresponding to the last matches shown in the Historical Calendar.
 */
export function calculateTeamEmojis(filteredMatches: MatchItem[], targetCount = 5): string[] {
  if (!filteredMatches || filteredMatches.length === 0) return [];

  const rawEmojis = filteredMatches
    .slice(0, targetCount)
    .map(calculateMatchEmoji)
    .filter(Boolean);

  return rawEmojis;
}

/**
 * Calculates the consecutive streak of fire emojis (🔥 Under 1.5) starting from the most recent match.
 * Since index 0 is the most recent match (matching Historical Calendar ordering),
 * we check from index 0 forwards.
 * Returns 0 if the most recent match is not a fire emoji (streak broken or absent).
 */
export function getEndingFireStreak(emojis?: string[]): number {
  if (!emojis || emojis.length === 0) return 0;
  let streak = 0;
  for (let i = 0; i < emojis.length; i++) {
    if (emojis[i] === '🔥') {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Calculates the consecutive streak of loss emojis (🔻 Derrota) starting from the most recent match.
 * Since index 0 is the most recent match (matching Historical Calendar ordering),
 * we check from index 0 forwards.
 * Returns 0 if the most recent match is not a loss emoji (streak broken or absent).
 */
export function getEndingLossStreak(emojis?: string[]): number {
  if (!emojis || emojis.length === 0) return 0;
  let streak = 0;
  for (let i = 0; i < emojis.length; i++) {
    if (emojis[i] === '🔻') {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Filters the matches displayed on the Index page according to the selected filters.
 * - Competição: Liga, Copa, or Liga + Copa
 * - Mando:
 *   - 'home' -> Only shows matches where a favorite club is playing at Home
 *   - 'away' -> Only shows matches where a favorite club is playing Away
 *   - 'all'  -> Shows all favorite matches
 */
export function filterIndexMatches(
  matches: Match[],
  filters: MatchFilters,
  supabaseFavorites: any[]
): Match[] {
  if (!matches || matches.length === 0) return [];

  return matches.filter((m) => {
    // 1. Competição
    if (filters.competition !== 'all') {
      const isCup = m.isCup !== undefined ? m.isCup : isCupCompetition(m.leagueName);
      if (filters.competition === 'league' && isCup) return false;
      if (filters.competition === 'cup' && !isCup) return false;
    }

    // 2. Mando
    if (filters.mando !== 'all') {
      const isFav1 = isTeamNameInFavorites(m.team1, supabaseFavorites);
      const isFav2 = isTeamNameInFavorites(m.team2, supabaseFavorites);

      if (filters.mando === 'home') {
        // Favorite must be playing at home
        if (!isFav1) return false;
      } else if (filters.mando === 'away') {
        // Favorite must be playing away
        if (!isFav2) return false;
      }
    }

    return true;
  });
}

/**
 * Retrieves verified finished matches for a team from the authoritative historical matches dataset.
 * Strictly uses verified match results only; never generates or assumes scores or information.
 * Returns matches ordered chronologically descending (most recent first).
 */
export function generateFallbackTeamMatches(teamName: string, teamId: number): MatchItem[] {
  if (!teamName && !teamId) return [];

  const norm = normalizeTeamName(teamName);
  const matched = HISTORICAL_MATCHES_DATA.filter((m) => {
    if (m.status !== 'finished' || !m.score?.ft) return false;
    if (teamId && (m.team1Id === teamId || m.team2Id === teamId)) return true;
    const n1 = normalizeTeamName(m.team1);
    const n2 = normalizeTeamName(m.team2);
    return n1 === norm || n2 === norm;
  });

  if (matched.length === 0) return [];

  // Sort descending by date (most recent first)
  const sorted = [...matched].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sorted.map((m, idx) => {
    const isHome = (teamId && m.team1Id === teamId) || normalizeTeamName(m.team1) === norm;
    const homeScore = m.score!.ft![0];
    const awayScore = m.score!.ft![1];
    let result: 'V' | 'E' | 'D' = 'E';
    if (homeScore === awayScore) {
      result = 'E';
    } else if (isHome) {
      result = homeScore > awayScore ? 'V' : 'D';
    } else {
      result = awayScore > homeScore ? 'V' : 'D';
    }

    return {
      id: m.id || `verified-hist-${teamId}-${idx}`,
      date: m.date,
      time: m.time,
      homeTeam: m.team1,
      homeId: m.team1Id,
      awayTeam: m.team2,
      awayId: m.team2Id,
      homeScore,
      awayScore,
      competition: m.leagueName || 'Campeonato',
      result,
      isCup: m.isCup !== undefined ? m.isCup : isCupCompetition(m.leagueName),
      isHome,
    };
  });
}

/**
 * Robustly resolves or computes the emoji sequence for any favorite club.
 * Checks ID in teamForms, normalized name in teamForms, lowercase name, aliases,
 * dictionary ID, favorites list, and verified historical fixtures.
 * Uses verified match results only without assuming fake scores.
 */
export function getOrComputeTeamEmojis(
  teamName: string,
  teamId?: number,
  teamForms?: Record<string | number, string[]>,
  filters?: MatchFilters,
  favoritesList?: { id: number; name: string }[]
): string[] {
  if (!teamName && !teamId) return [];

  const targetWindow = filters?.window || 5;

  // 1. Direct ID lookup in teamForms
  if (teamId && teamForms && teamForms[teamId] && teamForms[teamId].length > 0) {
    return teamForms[teamId].slice(0, targetWindow);
  }

  // 2. Normalized name lookup in teamForms
  const norm = normalizeTeamName(teamName);
  if (norm && teamForms && (teamForms as any)[norm] && (teamForms as any)[norm].length > 0) {
    return (teamForms as any)[norm].slice(0, targetWindow);
  }

  // 3. Lowercase name lookup in teamForms
  const lower = (teamName || '').toLowerCase().trim();
  if (lower && teamForms && (teamForms as any)[lower] && (teamForms as any)[lower].length > 0) {
    return (teamForms as any)[lower].slice(0, targetWindow);
  }

  // 4. Authoritative dictionary ID lookup in teamForms
  const dictId = getTeamId(teamName);
  if (dictId && teamForms && teamForms[dictId] && teamForms[dictId].length > 0) {
    return teamForms[dictId].slice(0, targetWindow);
  }

  // 5. Check if team is in favoritesList by name or ID, and check their form
  if (favoritesList && favoritesList.length > 0 && teamForms) {
    const matchedFav = favoritesList.find(
      (f) =>
        (teamId && f.id === teamId) ||
        normalizeTeamName(f.name) === norm ||
        f.name.toLowerCase().trim() === lower
    );
    if (matchedFav) {
      if (teamForms[matchedFav.id] && teamForms[matchedFav.id].length > 0) {
        return teamForms[matchedFav.id].slice(0, targetWindow);
      }
      const favNorm = normalizeTeamName(matchedFav.name);
      if (favNorm && (teamForms as any)[favNorm] && (teamForms as any)[favNorm].length > 0) {
        return (teamForms as any)[favNorm].slice(0, targetWindow);
      }
    }
  }

  // 6. Look up verified historical matches only (never assume scores)
  const dictResolvedId = teamId || getTeamId(teamName) || 10000;
  const verifiedMatches = generateFallbackTeamMatches(teamName, dictResolvedId);
  if (verifiedMatches && verifiedMatches.length > 0) {
    const filtered = filterTeamPastMatches(verifiedMatches, filters || DEFAULT_MATCH_FILTERS, teamName, dictResolvedId);
    return calculateTeamEmojis(filtered, targetWindow);
  }

  return [];
}
