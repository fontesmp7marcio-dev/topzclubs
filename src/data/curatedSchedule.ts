import { Match } from '../types';
import { isTeamNameInFavorites, USER_FAVORITE_CLUBS_DATA } from './favoriteClubs';

export const CURATED_MULTI_DATE_SCHEDULE: Match[] = [];

/**
 * Checks if a match features at least one of the user's favorite teams
 * Checks both official FotMob Team IDs and normalized Team Names
 */
export function isMatchInFavorites(
  match: Match,
  favorites?: { id: number; name: string }[]
): boolean {
  if (!match) return false;
  const favList = favorites && favorites.length > 0 ? favorites : USER_FAVORITE_CLUBS_DATA;

  // 1. Direct FotMob ID Matching (Primary & 100% accurate)
  const t1Id = match.team1Id || (match as any).homeTeamId;
  const t2Id = match.team2Id || (match as any).awayTeamId;

  if (t1Id || t2Id) {
    const hasFavId = favList.some(f => (t1Id && f.id === t1Id) || (t2Id && f.id === t2Id));
    if (hasFavId) return true;
  }

  // 2. Normalized Name Matching with full alias support
  return (
    isTeamNameInFavorites(match.team1, favList) ||
    isTeamNameInFavorites(match.team2, favList)
  );
}
