import { Match, MatchFilters, MatchItem } from '../types';
import { isTeamNameInFavorites, normalizeTeamName } from '../data/favoriteClubs';

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
  filters: MatchFilters,
  teamName: string,
  teamId?: number
): MatchItem[] {
  if (!matches || !Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  const normTeam = normalizeTeamName(teamName);

  // 1. Competição Filter
  const compFiltered = matches.filter((m) => {
    const isCup = m.isCup !== undefined ? m.isCup : isCupCompetition(m.competition);
    if (filters.competition === 'league') {
      return !isCup;
    }
    if (filters.competition === 'cup') {
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

    if (filters.mando === 'home') {
      return isHome;
    }
    if (filters.mando === 'away') {
      return !isHome;
    }
    return true; // 'all' -> Casa + Fora
  });

  // 3. Histórico Window (up to 5 or 10 valid games)
  return mandoFiltered.slice(0, filters.window);
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

  if (totalGoals < 2) {
    return '🔥';
  }

  const resUpper = m.result?.toUpperCase() || '';
  if (resUpper === 'D' || resUpper === 'L') return '🔻';
  if (resUpper === 'E') return '🛡️';
  if (resUpper === 'V' || resUpper === 'W') return '✅';

  return '';
}

/**
 * Calculates the emoji sequence for a filtered list of matches.
 * The input `filteredMatches` is ordered from most recent to oldest.
 * We reverse it so that the emoji sequence reads chronologically from left to right
 * (most recent match is on the far right).
 */
export function calculateTeamEmojis(filteredMatches: MatchItem[]): string[] {
  if (!filteredMatches || filteredMatches.length === 0) return [];
  return [...filteredMatches]
    .reverse()
    .map(calculateMatchEmoji)
    .filter(Boolean);
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
 * Generates 10 realistic past matches for a team with mixed competition (League + Cup)
 * and venue (Home + Away) to ensure seamless filtering before live data arrives.
 */
export function generateFallbackTeamMatches(teamName: string, teamId: number): MatchItem[] {
  const dates = [
    '31/08/2026', '27/08/2026', '23/08/2026', '19/08/2026', '15/08/2026',
    '10/08/2026', '05/08/2026', '01/08/2026', '28/07/2026', '24/07/2026'
  ];

  // Pattern of results: 10 matches
  // idx 0: Home, League, 2-1 (V, ✅)
  // idx 1: Away, League, 1-1 (E, 🛡️)
  // idx 2: Home, League, 1-0 (V, 🔥 Under 1.5)
  // idx 3: Away, Cup, 2-0 (D, 🔻)
  // idx 4: Home, League, 2-2 (E, 🛡️)
  // idx 5: Away, League, 0-1 (V, 🔥 Under 1.5)
  // idx 6: Home, Cup, 3-1 (V, ✅)
  // idx 7: Away, League, 2-1 (D, 🔻)
  // idx 8: Home, League, 0-0 (E, 🔥 Under 1.5)
  // idx 9: Away, Cup, 1-2 (V, ✅)

  const patterns = [
    { isHome: true, isCup: false, comp: 'Campeonato Nacional', res: 'V' as const, hScore: 2, aScore: 1 },
    { isHome: false, isCup: false, comp: 'Campeonato Nacional', res: 'E' as const, hScore: 1, aScore: 1 },
    { isHome: true, isCup: false, comp: 'Campeonato Nacional', res: 'V' as const, hScore: 1, aScore: 0 },
    { isHome: false, isCup: true, comp: 'Copa Nacional', res: 'D' as const, hScore: 2, aScore: 0 },
    { isHome: true, isCup: false, comp: 'Campeonato Nacional', res: 'E' as const, hScore: 2, aScore: 2 },
    { isHome: false, isCup: false, comp: 'Campeonato Nacional', res: 'V' as const, hScore: 0, aScore: 1 },
    { isHome: true, isCup: true, comp: 'Copa Nacional', res: 'V' as const, hScore: 3, aScore: 1 },
    { isHome: false, isCup: false, comp: 'Campeonato Nacional', res: 'D' as const, hScore: 2, aScore: 1 },
    { isHome: true, isCup: false, comp: 'Campeonato Nacional', res: 'E' as const, hScore: 0, aScore: 0 },
    { isHome: false, isCup: true, comp: 'Copa Continental', res: 'V' as const, hScore: 1, aScore: 2 },
  ];

  return patterns.map((p, i) => ({
    id: `fb-match-${teamId}-${i}`,
    date: dates[i] || '20/08/2026',
    homeTeam: p.isHome ? teamName : 'Adversário',
    homeId: p.isHome ? teamId : 9000 + i,
    awayTeam: p.isHome ? 'Adversário' : teamName,
    awayId: p.isHome ? 9000 + i : teamId,
    homeScore: p.hScore,
    awayScore: p.aScore,
    competition: p.comp,
    result: p.res,
    isCup: p.isCup,
    isHome: p.isHome,
  }));
}
