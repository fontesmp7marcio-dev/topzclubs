import { Match } from '../types';
import { isTeamNameInFavorites, USER_FAVORITE_CLUBS_DATA } from './favoriteClubs';

export const CURATED_MULTI_DATE_SCHEDULE: Match[] = [];

/**
 * Checks if a match features at least one of the user's favorite teams
 * Checks both official FotMob Team IDs and normalized Team Names
 */
// Precomputed ID set for static user favorites
const DEFAULT_FAV_ID_SET = new Set<number>(USER_FAVORITE_CLUBS_DATA.map(f => f.id).filter(id => Boolean(id && id > 0)));
const favIdSetCache = new WeakMap<any[], Set<number>>();

function getFavIdSet(favList: any[]): Set<number> {
  let cached = favIdSetCache.get(favList);
  if (!cached) {
    cached = new Set<number>();
    for (let i = 0; i < favList.length; i++) {
      if (favList[i]?.id) cached.add(favList[i].id);
    }
    favIdSetCache.set(favList, cached);
  }
  return cached;
}

/**
 * Checks if a match features at least one of the user's favorite teams
 * Checks both official FotMob Team IDs and normalized Team Names with O(1) efficiency
 */
export function isMatchInFavorites(
  match: Match,
  favorites?: { id: number; name: string }[]
): boolean {
  if (!match) return false;
  const favList = favorites && favorites.length > 0 ? favorites : null;
  const idSet = favList ? getFavIdSet(favList) : DEFAULT_FAV_ID_SET;

  // 1. Direct FotMob ID Matching (Primary & 100% accurate, O(1))
  const t1Id = match.team1Id || (match as any).homeTeamId;
  const t2Id = match.team2Id || (match as any).awayTeamId;

  if ((t1Id && idSet.has(t1Id)) || (t2Id && idSet.has(t2Id))) {
    return true;
  }

  // 2. Normalized Name Matching with full alias support (O(1))
  return (
    isTeamNameInFavorites(match.team1, favorites) ||
    isTeamNameInFavorites(match.team2, favorites)
  );
}
