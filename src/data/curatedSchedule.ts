import { Match } from '../types';
import { isTeamNameInFavorites } from './favoriteClubs';

export const CURATED_MULTI_DATE_SCHEDULE: Match[] = [];

/**
 * Checks if a match features at least one of the user's favorite teams
 */
export function isMatchInFavorites(
  match: Match,
  favorites?: { id: number; name: string }[]
): boolean {
  if (!match) return false;
  return (
    isTeamNameInFavorites(match.team1, favorites) ||
    isTeamNameInFavorites(match.team2, favorites)
  );
}
