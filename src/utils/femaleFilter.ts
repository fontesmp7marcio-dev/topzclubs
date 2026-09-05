/**
 * Utility to identify and filter out non-primary teams:
 * - Women's/Female teams
 * - Secondary/Reserve teams (e.g. Inter Miami II, Inter Miami CF II, Inter Miami 2, Barcelona B, Bayern Munich II, etc.)
 * - Youth/Sub teams (e.g. Sub-20, Sub-17, U20, U23, etc.)
 */
export function isFemaleOrWomensMatch(leagueName?: string, team1?: string, team2?: string): boolean {
  const check = (str?: string): boolean => {
    if (!str) return false;
    const lower = str.toLowerCase().trim();

    // 1. Women's / Female terms
    if (
      lower.includes('women') ||
      lower.includes('feminin') ||
      lower.includes('femina') ||
      lower.includes('damen') ||
      lower.includes('wsl') ||
      lower.includes('nwsl') ||
      lower.includes('liga f') ||
      lower.includes('damallsvenskan') ||
      lower.includes('frauen') ||
      lower.includes('(w)') ||
      lower.includes('(fem)') ||
      /\b(wfc|wfd|fem|women|womens)\b/i.test(lower)
    ) {
      return true;
    }

    // 2. Youth / Sub / U-XX categories
    if (
      /\b(sub[- ]?\d{1,2}|u[- ]?\d{1,2})\b/i.test(lower) ||
      /\b(youth|juniores|júnior|junior|juvenil|reserves|reserve|reservas|reserva)\b/i.test(lower)
    ) {
      return true;
    }

    // 3. Secondary / Reserve / Team 2 Indicators (e.g., "Inter Miami CF II", "Inter Miami II", "Inter Miami 2", "Inter Miami B")
    if (
      /\b(castilla|atlètic|atletic|mls next pro|premier league 2)\b/i.test(lower) ||
      /\b(cf ii|cf 2|fc ii|fc 2|sc ii|sc 2)\b/i.test(lower) ||
      /\s+(ii|2|b)($|\s|\)|\()/i.test(lower) ||
      /\b(ii|2)\b$/i.test(lower)
    ) {
      return true;
    }

    return false;
  };

  return check(leagueName) || check(team1) || check(team2);
}

/**
 * Utility function dedicated to checking if a single team name is a non-primary team
 */
export function isSecondaryOrFemaleTeam(teamName?: string): boolean {
  if (!teamName) return false;
  return isFemaleOrWomensMatch(undefined, teamName);
}

