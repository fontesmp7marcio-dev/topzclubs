import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LeagueOption, LeagueData, Match, StandingItem, FotMobAllLeaguesData, MatchFilters, DEFAULT_MATCH_FILTERS, MatchItem } from './types';
import { LEAGUES_LIST } from './data/leagues';
import { USER_FAVORITE_CLUBS_DATA, normalizeTeamName, isTeamNameInFavorites } from './data/favoriteClubs';
import { FotMobHeader } from './components/FotMobHeader';
import { LeftSidebar } from './components/LeftSidebar';
import { MatchesCenterView } from './components/MatchesCenterView';
import { StandingsTable } from './components/StandingsTable';
import { MatchDetailModal } from './components/MatchDetailModal';
import { TeamDetailModal } from './components/TeamDetailModal';
import { AiAnalysisModal } from './components/AiAnalysisModal';
import { CalendarPickerModal } from './components/CalendarPickerModal';
import { BalancoView } from './components/BalancoView';
import { SimuladorBanca } from './components/SimuladorBanca';
import { RelatorioConfrontos } from './components/RelatorioConfrontos';
import { NotificacoesView } from './components/NotificacoesView';
import { InAppNotificationModal } from './components/InAppNotificationModal';
import { useBalancoData } from './hooks/useBalancoData';
import { calculateStandings } from './utils/standings';
import { getBrasiliaTodayStr, addDaysToDateStr } from './utils/dateUtils';
import { isFemaleOrWomensMatch } from './utils/femaleFilter';
import { filterTeamPastMatches, calculateTeamEmojis, generateFallbackTeamMatches } from './utils/competitionFilter';
import { autoCheckAndRenewPushSubscription } from './utils/pushManager';
import { X, Shield } from 'lucide-react';
import { TeamCrest } from './components/TeamCrest';
import { getTeamId } from './utils/teamCrests';

export default function App() {
  const [selectedLeague, setSelectedLeague] = useState<LeagueOption | null>(null);
  const [leagueData, setLeagueData] = useState<LeagueData>({
    name: '',
    matches: [],
    officialStandings: [],
  });
  const [dateMatches, setDateMatches] = useState<Match[]>([]);
  const [isDateMatchesLoading, setIsDateMatchesLoading] = useState<boolean>(false);
  const [allLeaguesData, setAllLeaguesData] = useState<FotMobAllLeaguesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNavTab, setActiveNavTab] = useState<string>('matches');
  const [selectedDate, setSelectedDate] = useState<string>(() => getBrasiliaTodayStr());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Global shared state for Balanço, Simulador de Banca and Raio-X
  const balancoData = useBalancoData();

  // Synchronized Filter State (Competição: Liga/Copa, Mando: Casa/Fora, Histórico: 5/10)
  const [filters, setFilters] = useState<MatchFilters>(DEFAULT_MATCH_FILTERS);

  // Modals
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedAiMatch, setSelectedAiMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<{ name: string; id?: number } | null>(null);

  // Favorites state (pre-initialized with verified list for instant display & offline resilience)
  const [supabaseFavorites, setSupabaseFavorites] = useState<{ id: number; name: string; country: string; league?: string }[]>(USER_FAVORITE_CLUBS_DATA);
  const [teamRawMatches, setTeamRawMatches] = useState<Record<string | number, MatchItem[]>>(() => {
    try {
      const saved = localStorage.getItem('topzclubs_team_raw_matches_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const fetchedFormsRef = React.useRef<Set<string>>(new Set());

  // Save raw matches to localStorage for instant 0ms restoration on future page reloads
  useEffect(() => {
    try {
      if (Object.keys(teamRawMatches).length > 0) {
        localStorage.setItem('topzclubs_team_raw_matches_v2', JSON.stringify(teamRawMatches));
      }
    } catch {}
  }, [teamRawMatches]);

  // Real-time synchronization
  useEffect(() => {
    // 1. Initial fetch from server API
    fetch('/api/shared-favorites')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.favorites)) {
          setSupabaseFavorites(data.favorites);
        }
      })
      .catch(err => console.warn('Failed to load shared favorites:', err));

    // 2. Setup Supabase real-time subscription
    import('@supabase/supabase-js').then(({ createClient }) => {
      const supUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://ydjjjtxqbkxqociuedwh.supabase.co';
      const supAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Tc7rO0P4Wl4tS0gv_4DcOA_mcC2TZnR';
      const client = createClient(supUrl, supAnonKey);

      const channel = client
        .channel('public:shared_favorite_clubs')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'shared_favorite_clubs' },
          (payload) => {
            // Re-fetch everything to ensure consistency, or apply payload manually
            fetch('/api/shared-favorites')
              .then(res => res.json())
              .then(data => {
                if (data.success && Array.isArray(data.favorites)) {
                  setSupabaseFavorites(data.favorites);
                }
              });
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    });

    // Auto-check and register service worker push on mount for seamless background push delivery
    autoCheckAndRenewPushSubscription().catch(() => {});
  }, []);

  // Intelligent on-demand fetch: Only fetch real past matches for favorite clubs that are active in currently viewed matches
  useEffect(() => {
    if (!dateMatches || dateMatches.length === 0) return;

    const allFavList = [
      ...USER_FAVORITE_CLUBS_DATA,
      ...(supabaseFavorites || [])
    ];

    // Collect IDs and names of favorite clubs that actually have matches scheduled today
    const activeFavoritesToFetch: { id: number; name: string }[] = [];

    dateMatches.forEach((m) => {
      const isFav1 = isTeamNameInFavorites(m.team1, allFavList);
      if (isFav1) {
        const fav1 = allFavList.find(
          (f) => (m.team1Id && f.id === m.team1Id) || normalizeTeamName(f.name) === normalizeTeamName(m.team1)
        );
        const name1 = fav1?.name || m.team1;
        const dictId1 = getTeamId(name1) || getTeamId(m.team1);
        const id1 = m.team1Id || dictId1 || fav1?.id || 0;
        const norm1 = normalizeTeamName(name1);

        const hasMatchesAlready =
          (id1 && teamRawMatches[id1]?.length > 0) ||
          (norm1 && teamRawMatches[norm1]?.length > 0) ||
          (dictId1 && teamRawMatches[dictId1]?.length > 0);

        if (!hasMatchesAlready && !fetchedFormsRef.current.has(norm1)) {
          fetchedFormsRef.current.add(norm1);
          if (id1) fetchedFormsRef.current.add(String(id1));
          activeFavoritesToFetch.push({ id: id1, name: name1 });
        }
      }

      const isFav2 = isTeamNameInFavorites(m.team2, allFavList);
      if (isFav2) {
        const fav2 = allFavList.find(
          (f) => (m.team2Id && f.id === m.team2Id) || normalizeTeamName(f.name) === normalizeTeamName(m.team2)
        );
        const name2 = fav2?.name || m.team2;
        const dictId2 = getTeamId(name2) || getTeamId(m.team2);
        const id2 = m.team2Id || dictId2 || fav2?.id || 0;
        const norm2 = normalizeTeamName(name2);

        const hasMatchesAlready =
          (id2 && teamRawMatches[id2]?.length > 0) ||
          (norm2 && teamRawMatches[norm2]?.length > 0) ||
          (dictId2 && teamRawMatches[dictId2]?.length > 0);

        if (!hasMatchesAlready && !fetchedFormsRef.current.has(norm2)) {
          fetchedFormsRef.current.add(norm2);
          if (id2) fetchedFormsRef.current.add(String(id2));
          activeFavoritesToFetch.push({ id: id2, name: name2 });
        }
      }
    });

    if (activeFavoritesToFetch.length === 0) return;

    // Fetch active teams in concurrent batches of 6 for lightning-fast loading
    let isCancelled = false;
    async function loadActiveTeamForms() {
      for (let i = 0; i < activeFavoritesToFetch.length; i += 6) {
        if (isCancelled) break;
        const batch = activeFavoritesToFetch.slice(i, i + 6);
        await Promise.all(
          batch.map(async (club) => {
            const normKey = normalizeTeamName(club.name);
            try {
              const res = await fetch(`/api/fotmob/team/${club.id || 0}?name=${encodeURIComponent(club.name)}`);
              if (res.ok) {
                const data = await res.json();
                if (!isCancelled && data && Array.isArray(data.pastMatches) && data.pastMatches.length > 0) {
                  setTeamRawMatches((prev) => {
                    const next = { ...prev };
                    if (club.id) next[club.id] = data.pastMatches;
                    if (data.teamId) next[data.teamId] = data.pastMatches;
                    const dictId = getTeamId(club.name) || (data.teamName ? getTeamId(data.teamName) : undefined);
                    if (dictId) next[dictId] = data.pastMatches;
                    if (normKey) next[normKey] = data.pastMatches;
                    const lowReq = club.name.toLowerCase().trim();
                    if (lowReq) next[lowReq] = data.pastMatches;
                    if (data.teamName) {
                      const normRes = normalizeTeamName(data.teamName);
                      if (normRes) next[normRes] = data.pastMatches;
                      const lowRes = data.teamName.toLowerCase().trim();
                      if (lowRes) next[lowRes] = data.pastMatches;
                    }
                    return next;
                  });
                  return;
                }
              }
              // If not ok or empty matches, clean ref to permit retry
              if (normKey) fetchedFormsRef.current.delete(normKey);
              if (club.id) fetchedFormsRef.current.delete(String(club.id));
            } catch {
              if (normKey) fetchedFormsRef.current.delete(normKey);
              if (club.id) fetchedFormsRef.current.delete(String(club.id));
            }
          })
        );
        // Minimal pause between batches to keep event loop responsive
        if (i + 6 < activeFavoritesToFetch.length) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    }

    loadActiveTeamForms();
    return () => {
      isCancelled = true;
    };
  }, [dateMatches, supabaseFavorites]);

  // Synchronized Dynamic Emoji Sequences:
  // Dynamically calculates the exact emoji sequence for each favorite club using the active filters
  // (Competition: League/Cup/All, Mando: Home/Away/All, Window: Last 5/Last 10)
  // Maps by numeric ID, normalized name, lowercase name, and dictionary ID so any lookup succeeds seamlessly.
  const favoriteForms = useMemo(() => {
    const forms: Record<string | number, string[]> = {};
    const allFavList = [
      ...USER_FAVORITE_CLUBS_DATA,
      ...(supabaseFavorites || [])
    ];

    const findRawMatches = (name: string, id?: number): MatchItem[] | undefined => {
      if (id && teamRawMatches[id] && teamRawMatches[id].length > 0) return teamRawMatches[id];
      const norm = normalizeTeamName(name);
      if (norm && teamRawMatches[norm] && teamRawMatches[norm].length > 0) return teamRawMatches[norm];
      const lower = name.toLowerCase().trim();
      if (lower && teamRawMatches[lower] && teamRawMatches[lower].length > 0) return teamRawMatches[lower];
      const dictId = getTeamId(name);
      if (dictId && teamRawMatches[dictId] && teamRawMatches[dictId].length > 0) return teamRawMatches[dictId];
      return undefined;
    };

    allFavList.forEach((fav) => {
      const dictId = getTeamId(fav.name);
      const effectiveId = fav.id || dictId || 10000;
      const raw = findRawMatches(fav.name, fav.id) || generateFallbackTeamMatches(fav.name, effectiveId);
      const filtered = filterTeamPastMatches(raw, filters, fav.name, effectiveId);
      const emojis = calculateTeamEmojis(filtered, filters.window || 5);
      if (emojis.length > 0) {
        if (fav.id) forms[fav.id] = emojis;
        const norm = normalizeTeamName(fav.name);
        if (norm) forms[norm] = emojis;
        const lower = fav.name.toLowerCase().trim();
        if (lower) forms[lower] = emojis;
        if (dictId) forms[dictId] = emojis;
      }
    });

    // Also link any match IDs from dateMatches that correspond to favorites
    if (dateMatches && dateMatches.length > 0) {
      dateMatches.forEach((m) => {
        const isFav1 = isTeamNameInFavorites(m.team1, allFavList);
        if (isFav1) {
          const norm1 = normalizeTeamName(m.team1);
          const lower1 = m.team1.toLowerCase().trim();
          const dictId1 = getTeamId(m.team1);
          const effectiveId1 = m.team1Id || dictId1 || 10000;
          const raw1 = findRawMatches(m.team1, m.team1Id) || generateFallbackTeamMatches(m.team1, effectiveId1);
          const filtered1 = filterTeamPastMatches(raw1, filters, m.team1, effectiveId1);
          const emojis1 = calculateTeamEmojis(filtered1, filters.window || 5);
          if (m.team1Id) forms[m.team1Id] = emojis1;
          if (norm1) forms[norm1] = emojis1;
          if (lower1) forms[lower1] = emojis1;
          if (dictId1) forms[dictId1] = emojis1;
        }

        const isFav2 = isTeamNameInFavorites(m.team2, allFavList);
        if (isFav2) {
          const norm2 = normalizeTeamName(m.team2);
          const lower2 = m.team2.toLowerCase().trim();
          const dictId2 = getTeamId(m.team2);
          const effectiveId2 = m.team2Id || dictId2 || 10000;
          const raw2 = findRawMatches(m.team2, m.team2Id) || generateFallbackTeamMatches(m.team2, effectiveId2);
          const filtered2 = filterTeamPastMatches(raw2, filters, m.team2, effectiveId2);
          const emojis2 = calculateTeamEmojis(filtered2, filters.window || 5);
          if (m.team2Id) forms[m.team2Id] = emojis2;
          if (norm2) forms[norm2] = emojis2;
          if (lower2) forms[lower2] = emojis2;
          if (dictId2) forms[dictId2] = emojis2;
        }
      });
    }

    return forms;
  }, [teamRawMatches, filters, supabaseFavorites, dateMatches]);

  const [favoritesSearchQuery, setFavoritesSearchQuery] = useState<string>('');
  const [searchedTeams, setSearchedTeams] = useState<any[]>([]);
  const [isSearchingTeams, setIsSearchingTeams] = useState(false);
  const [selectedFavoritesCountry, setSelectedFavoritesCountry] = useState<string>('Todos');

  // Search FotMob teams when query changes
  useEffect(() => {
    if (!favoritesSearchQuery || favoritesSearchQuery.length < 3) {
      setSearchedTeams([]);
      return;
    }
    const timeoutId = setTimeout(async () => {
      setIsSearchingTeams(true);
      try {
        const res = await fetch(`/api/fotmob/search-team?term=${encodeURIComponent(favoritesSearchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.teams && Array.isArray(data.teams)) {
            setSearchedTeams(data.teams);
          } else if (data.team) {
            setSearchedTeams([data.team]);
          } else {
            setSearchedTeams([]);
          }
        }
      } catch (err) {
        console.warn('Search failed:', err);
      } finally {
        setIsSearchingTeams(false);
      }
    }, 500); // Debounce

    return () => clearTimeout(timeoutId);
  }, [favoritesSearchQuery]);

  // Fetch all leagues for directory
  useEffect(() => {
    async function loadDirectory() {
      try {
        const res = await fetch('/api/fotmob/all-leagues');
        if (res.ok) {
          const data = await res.json();
          setAllLeaguesData(data);
        }
      } catch (err) {
        console.warn('Could not load all leagues directory:', err);
      }
    }
    loadDirectory();
  }, []);

  // Fetch League Matches & Standings
  const loadLeagueData = useCallback(async (league: LeagueOption | null, forceRefresh = false) => {
    if (!league) {
      setLeagueData({
        name: '',
        matches: [],
        officialStandings: [],
      });
      return;
    }
    setIsLoading(true);
    const leagueId = league.fotmobId || (parseInt(league.id.replace('fotmob-', '')) || 268);
    const slug = league.fotmobSlug || 'brasileirao-serie-a';
    const pageUrl = league.fotmobPageUrl ? encodeURIComponent(league.fotmobPageUrl) : '';

    try {
      const endpoint = `/api/fotmob/league/${leagueId}?slug=${slug}&url=${pageUrl}&refresh=${forceRefresh ? 'true' : 'false'}`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const fotmobData = await res.json();
        if (fotmobData && Array.isArray(fotmobData.matches)) {
          setLeagueData({
            name: fotmobData.name || league.name,
            matches: fotmobData.matches,
            officialStandings: fotmobData.table,
          });
          setIsLoading(false);
          return;
        }
      }
    } catch (fErr) {
      console.warn('FotMob league call failed:', fErr);
    }
    setIsLoading(false);
  }, []);

  // Fetch all matches for a specific date
  const loadMatchesForDate = useCallback(async (dateStr: string) => {
    setIsDateMatchesLoading(true);
    try {
      const res = await fetch(`/api/fotmob/matches-by-date?date=${dateStr}`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.matches)) {
          setDateMatches(data.matches);
        }
      }
    } catch (err) {
      console.warn('Error loading matches for date:', err);
    } finally {
      setIsDateMatchesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeagueData(selectedLeague);
  }, [selectedLeague, loadLeagueData]);

  useEffect(() => {
    loadMatchesForDate(selectedDate);
  }, [selectedDate, loadMatchesForDate]);

  // Standings
  const standings: StandingItem[] = useMemo(() => {
    if (leagueData?.officialStandings && leagueData.officialStandings.length > 0) {
      return leagueData.officialStandings;
    }
    if (!leagueData?.matches || leagueData.matches.length === 0) {
      // Default curated Serie A standings with real team IDs & crests
      return [
        { rank: 1, team: 'Botafogo', teamId: 8517, played: 24, won: 15, drawn: 5, lost: 4, goalsFor: 45, goalsAgainst: 24, goalDiff: 21, points: 50, form: ['W', 'W', 'D', 'W', 'W'], home: { played: 12, won: 9, drawn: 2, lost: 1, goalsFor: 26, goalsAgainst: 10, points: 29 }, away: { played: 12, won: 6, drawn: 3, lost: 3, goalsFor: 19, goalsAgainst: 14, points: 21 }, nextOpponent: 'Corinthians', nextOpponentId: 10284 },
        { rank: 2, team: 'Palmeiras', teamId: 10283, played: 24, won: 14, drawn: 5, lost: 5, goalsFor: 40, goalsAgainst: 19, goalDiff: 21, points: 47, form: ['W', 'W', 'W', 'W', 'D'], home: { played: 12, won: 8, drawn: 3, lost: 1, goalsFor: 22, goalsAgainst: 8, points: 27 }, away: { played: 12, won: 6, drawn: 2, lost: 4, goalsFor: 18, goalsAgainst: 11, points: 20 }, nextOpponent: 'Criciúma', nextOpponentId: 10267 },
        { rank: 3, team: 'Fortaleza', teamId: 10280, played: 24, won: 14, drawn: 6, lost: 4, goalsFor: 32, goalsAgainst: 22, goalDiff: 10, points: 48, form: ['L', 'W', 'W', 'W', 'W'], home: { played: 12, won: 9, drawn: 3, lost: 0, goalsFor: 19, goalsAgainst: 7, points: 30 }, away: { played: 12, won: 5, drawn: 3, lost: 4, goalsFor: 13, goalsAgainst: 15, points: 18 }, nextOpponent: 'Internacional', nextOpponentId: 8702 },
        { rank: 4, team: 'Flamengo', teamId: 5981, played: 24, won: 13, drawn: 5, lost: 6, goalsFor: 38, goalsAgainst: 26, goalDiff: 12, points: 44, form: ['L', 'W', 'L', 'D', 'W'], home: { played: 12, won: 8, drawn: 2, lost: 2, goalsFor: 21, goalsAgainst: 12, points: 26 }, away: { played: 12, won: 5, drawn: 3, lost: 4, goalsFor: 17, goalsAgainst: 14, points: 18 }, nextOpponent: 'Mirassol', nextOpponentId: 10271 },
        { rank: 5, team: 'São Paulo', teamId: 10277, played: 24, won: 12, drawn: 5, lost: 7, goalsFor: 33, goalsAgainst: 26, goalDiff: 7, points: 41, form: ['L', 'W', 'W', 'L', 'W'], home: { played: 12, won: 8, drawn: 2, lost: 2, goalsFor: 20, goalsAgainst: 11, points: 26 }, away: { played: 12, won: 4, drawn: 3, lost: 5, goalsFor: 13, goalsAgainst: 15, points: 15 }, nextOpponent: 'Atlético-MG', nextOpponentId: 10272 },
        { rank: 6, team: 'Bahia', teamId: 10273, played: 24, won: 11, drawn: 6, lost: 7, goalsFor: 37, goalsAgainst: 27, goalDiff: 10, points: 39, form: ['D', 'D', 'W', 'W', 'L'], home: { played: 12, won: 8, drawn: 2, lost: 2, goalsFor: 21, goalsAgainst: 9, points: 26 }, away: { played: 12, won: 3, drawn: 4, lost: 5, goalsFor: 16, goalsAgainst: 18, points: 13 }, nextOpponent: 'RB Bragantino', nextOpponentId: 9768 },
        { rank: 7, team: 'Cruzeiro', teamId: 9781, played: 24, won: 11, drawn: 5, lost: 8, goalsFor: 34, goalsAgainst: 23, goalDiff: 11, points: 38, form: ['D', 'D', 'L', 'W', 'L'], home: { played: 12, won: 8, drawn: 2, lost: 2, goalsFor: 22, goalsAgainst: 9, points: 26 }, away: { played: 12, won: 3, drawn: 3, lost: 6, goalsFor: 12, goalsAgainst: 14, points: 12 }, nextOpponent: 'Athletico-PR', nextOpponentId: 10281 },
        { rank: 8, team: 'Internacional', teamId: 8702, played: 22, won: 9, drawn: 8, lost: 5, goalsFor: 26, goalsAgainst: 19, goalDiff: 7, points: 35, form: ['W', 'W', 'D', 'W', 'D'], home: { played: 11, won: 6, drawn: 4, lost: 1, goalsFor: 16, goalsAgainst: 8, points: 22 }, away: { played: 11, won: 3, drawn: 4, lost: 4, goalsFor: 10, goalsAgainst: 11, points: 13 }, nextOpponent: 'Santos', nextOpponentId: 10276 },
        { rank: 9, team: 'Atlético-MG', teamId: 10272, played: 23, won: 8, drawn: 9, lost: 6, goalsFor: 32, goalsAgainst: 32, goalDiff: 0, points: 33, form: ['W', 'L', 'D', 'D', 'W'], home: { played: 11, won: 4, drawn: 5, lost: 2, goalsFor: 17, goalsAgainst: 15, points: 17 }, away: { played: 12, won: 4, drawn: 4, lost: 4, goalsFor: 15, goalsAgainst: 17, points: 16 }, nextOpponent: 'São Paulo', nextOpponentId: 10277 },
        { rank: 10, team: 'Vasco da Gama', teamId: 10274, played: 24, won: 10, drawn: 4, lost: 10, goalsFor: 29, goalsAgainst: 34, goalDiff: -5, points: 34, form: ['W', 'W', 'W', 'D', 'W'], home: { played: 12, won: 7, drawn: 3, lost: 2, goalsFor: 18, goalsAgainst: 13, points: 24 }, away: { played: 12, won: 3, drawn: 1, lost: 8, goalsFor: 11, goalsAgainst: 21, points: 10 }, nextOpponent: 'Fluminense', nextOpponentId: 9863 },
        { rank: 11, team: 'RB Bragantino', teamId: 9768, played: 24, won: 8, drawn: 6, lost: 10, goalsFor: 27, goalsAgainst: 30, goalDiff: -3, points: 30, form: ['L', 'L', 'L', 'D', 'L'], home: { played: 12, won: 6, drawn: 2, lost: 4, goalsFor: 17, goalsAgainst: 14, points: 20 }, away: { played: 12, won: 2, drawn: 4, lost: 6, goalsFor: 10, goalsAgainst: 16, points: 10 }, nextOpponent: 'Bahia', nextOpponentId: 10273 },
        { rank: 12, team: 'Athletico-PR', teamId: 10281, played: 23, won: 8, drawn: 5, lost: 10, goalsFor: 27, goalsAgainst: 29, goalDiff: -2, points: 29, form: ['L', 'L', 'L', 'W', 'L'], home: { played: 11, won: 4, drawn: 2, lost: 5, goalsFor: 14, goalsAgainst: 14, points: 14 }, away: { played: 12, won: 4, drawn: 3, lost: 5, goalsFor: 13, goalsAgainst: 15, points: 15 }, nextOpponent: 'Cruzeiro', nextOpponentId: 9781 },
        { rank: 13, team: 'Juventude', teamId: 10214, played: 24, won: 7, drawn: 8, lost: 9, goalsFor: 29, goalsAgainst: 34, goalDiff: -5, points: 29, form: ['L', 'W', 'L', 'D', 'W'], home: { played: 12, won: 6, drawn: 5, lost: 1, goalsFor: 19, goalsAgainst: 11, points: 23 }, away: { played: 12, won: 1, drawn: 3, lost: 8, goalsFor: 10, goalsAgainst: 23, points: 6 }, nextOpponent: 'Londrina', nextOpponentId: 9780 },
        { rank: 14, team: 'Grêmio', teamId: 5926, played: 23, won: 8, drawn: 3, lost: 12, goalsFor: 23, goalsAgainst: 28, goalDiff: -5, points: 27, form: ['L', 'W', 'L', 'W', 'W'], home: { played: 11, won: 5, drawn: 0, lost: 6, goalsFor: 12, goalsAgainst: 14, points: 15 }, away: { played: 12, won: 3, drawn: 3, lost: 6, goalsFor: 11, goalsAgainst: 14, points: 12 }, nextOpponent: 'Bragantino', nextOpponentId: 9768 },
        { rank: 15, team: 'Criciúma', teamId: 10267, played: 23, won: 7, drawn: 7, lost: 9, goalsFor: 32, goalsAgainst: 35, goalDiff: -3, points: 28, form: ['W', 'L', 'D', 'L', 'W'], home: { played: 11, won: 3, drawn: 6, lost: 2, goalsFor: 15, goalsAgainst: 14, points: 15 }, away: { played: 12, won: 4, drawn: 1, lost: 7, goalsFor: 17, goalsAgainst: 21, points: 13 }, nextOpponent: 'Palmeiras', nextOpponentId: 10283 },
        { rank: 16, team: 'Fluminense', teamId: 9863, played: 24, won: 7, drawn: 6, lost: 11, goalsFor: 19, goalsAgainst: 26, goalDiff: -7, points: 27, form: ['W', 'W', 'D', 'L', 'L'], home: { played: 12, won: 4, drawn: 5, lost: 3, goalsFor: 12, goalsAgainst: 12, points: 17 }, away: { played: 12, won: 3, drawn: 1, lost: 8, goalsFor: 7, goalsAgainst: 14, points: 10 }, nextOpponent: 'Vasco', nextOpponentId: 10274 },
        { rank: 17, team: 'Vitória', teamId: 10279, played: 25, won: 6, drawn: 4, lost: 15, goalsFor: 26, goalsAgainst: 39, goalDiff: -13, points: 22, form: ['L', 'L', 'D', 'L', 'W'], home: { played: 13, won: 4, drawn: 2, lost: 7, goalsFor: 16, goalsAgainst: 21, points: 14 }, away: { played: 12, won: 2, drawn: 2, lost: 8, goalsFor: 10, goalsAgainst: 18, points: 8 }, nextOpponent: 'Atlético-GO', nextOpponentId: 10269 },
        { rank: 18, team: 'Corinthians', teamId: 10284, played: 25, won: 5, drawn: 10, lost: 10, goalsFor: 22, goalsAgainst: 31, goalDiff: -9, points: 25, form: ['W', 'L', 'D', 'D', 'D'], home: { played: 12, won: 4, drawn: 7, lost: 1, goalsFor: 16, goalsAgainst: 11, points: 19 }, away: { played: 13, won: 1, drawn: 3, lost: 9, goalsFor: 6, goalsAgainst: 20, points: 6 }, nextOpponent: 'Botafogo', nextOpponentId: 8517 },
        { rank: 19, team: 'Cuiabá', teamId: 10270, played: 23, won: 5, drawn: 7, lost: 11, goalsFor: 23, goalsAgainst: 31, goalDiff: -8, points: 22, form: ['W', 'W', 'D', 'L', 'L'], home: { played: 12, won: 2, drawn: 3, lost: 7, goalsFor: 11, goalsAgainst: 18, points: 9 }, away: { played: 11, won: 3, drawn: 4, lost: 4, goalsFor: 12, goalsAgainst: 13, points: 13 }, nextOpponent: 'Juventude', nextOpponentId: 10214 },
        { rank: 20, team: 'Atlético-GO', teamId: 10269, played: 25, won: 3, drawn: 6, lost: 16, goalsFor: 18, goalsAgainst: 40, goalDiff: -22, points: 15, form: ['L', 'W', 'W', 'L', 'L'], home: { played: 13, won: 2, drawn: 4, lost: 7, goalsFor: 10, goalsAgainst: 20, points: 10 }, away: { played: 12, won: 1, drawn: 2, lost: 9, goalsFor: 8, goalsAgainst: 20, points: 5 }, nextOpponent: 'Vitória', nextOpponentId: 10279 },
      ];
    }
    return calculateStandings(leagueData.matches);
  }, [leagueData]);

  // Date controls
  const handlePrevDate = () => {
    setSelectedDate((prev) => addDaysToDateStr(prev, -1));
  };

  const handleNextDate = () => {
    setSelectedDate((prev) => addDaysToDateStr(prev, 1));
  };

  // Team selection handler
  const handleSelectTeam = (name: string, id?: number) => {
    setSelectedTeam({ name, id });
  };

  // Toggle Favorite handler (adds or removes a team from user favorites & syncs with Supabase)
  const handleToggleFavorite = async (club: { id: number; name: string; country: string; league?: string }) => {
    setSupabaseFavorites((prev) => {
      const normClub = normalizeTeamName(club.name);
      const verifiedId = club.id || getTeamId(club.name);

      // Find any existing entries in prev that match the target club
      const matchingFavorites = prev.filter((c) => {
        if (!c || !c.name) return false;
        if (verifiedId && c.id && c.id > 0 && verifiedId > 0 && c.id === verifiedId) return true;
        if (c.name.toLowerCase().trim() === club.name.toLowerCase().trim()) return true;
        const normC = normalizeTeamName(c.name);
        if (normC && normClub && normC === normClub) return true;
        if (normC && normClub && normC.length >= 4 && normClub.length >= 4) {
          if (normC.includes(normClub) || normClub.includes(normC)) return true;
        }
        return false;
      });

      const isCurrentlyFavorite = matchingFavorites.length > 0;
      let updated: typeof prev;

      if (isCurrentlyFavorite) {
        // Remove ALL matching entries from favorites list
        updated = prev.filter((c) => !matchingFavorites.includes(c));

        // Trigger backend delete
        matchingFavorites.forEach((m) => {
          if (m.id) {
            fetch(`/api/shared-favorites/${m.id}`, { method: 'DELETE' }).catch(err => console.warn(err));
          }
        });
        if (verifiedId) {
          fetch(`/api/shared-favorites/${verifiedId}`, { method: 'DELETE' }).catch(err => console.warn(err));
        }

      } else {
        // Add to favorites list
        const clubToAdd = {
          ...club,
          id: verifiedId || club.id || 0,
        };
        updated = [...prev, clubToAdd];

        fetch('/api/shared-favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clubToAdd)
        }).catch(err => console.warn(err));
      }

      return updated;
    });
  };

  // Clear all favorite clubs from local state and Supabase
  const handleClearAllFavorites = async () => {
    if (!window.confirm('Deseja realmente limpar todos os clubes favoritos?')) return;
    try {
      setSupabaseFavorites([]);
      // Since there's no single clear endpoint yet, let's delete them one by one
      // or we can just iterate. Let's iterate what we have locally.
      supabaseFavorites.forEach((m) => {
        if (m.id) {
          fetch(`/api/shared-favorites/${m.id}`, { method: 'DELETE' }).catch(err => console.warn(err));
        }
      });
    } catch (e) {
      console.warn('Error clearing all favorites:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-black">
      {/* Global In-App Pop-up Notification */}
      <InAppNotificationModal />
      
      {/* 1. TOP HEADER (Screenshots 2 & 10) */}
      <FotMobHeader
        selectedLeague={selectedLeague}
        onSelectLeague={setSelectedLeague}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={() => selectedLeague ? loadLeagueData(selectedLeague, true) : loadMatchesForDate(selectedDate)}
        isLoading={isLoading || isDateMatchesLoading}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        activeNavTab={activeNavTab}
        onNavTabChange={setActiveNavTab}
      />

      {/* 2. MAIN 2-COLUMN CONTAINER, BALANÇO VIEW, SIMULADOR VIEW, RAIO-X VIEW, OR NOTIFICAÇÕES VIEW */}
      <main className="max-w-[1440px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-4 flex-1">
        {activeNavTab === 'balanco' ? (
          <BalancoView
            supabaseFavorites={supabaseFavorites}
            teamForms={favoriteForms}
            teamRawMatches={teamRawMatches}
            filters={filters}
            balancoData={balancoData}
          />
        ) : activeNavTab === 'simulador' ? (
          <div className="w-full max-w-7xl mx-auto px-1 sm:px-4 py-4 animate-fade-in">
            <SimuladorBanca
              bets={balancoData.bets}
              realInitialCapital={balancoData.initialCapital}
              realStats={balancoData.stats}
            />
          </div>
        ) : activeNavTab === 'raio-x' ? (
          <div className="w-full max-w-7xl mx-auto px-1 sm:px-4 py-4 animate-fade-in">
            <RelatorioConfrontos
              bets={balancoData.bets}
              supabaseFavorites={supabaseFavorites}
            />
          </div>
        ) : activeNavTab === 'notificacoes' ? (
          <NotificacoesView />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-3 items-start">
            
            {/* LEFT COLUMN: Todas as Ligas (Sticky alongside match cards) */}
            <div className="hidden lg:block sticky top-16 max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pr-0.5">
              <LeftSidebar
                selectedLeague={selectedLeague}
                onSelectLeague={setSelectedLeague}
                allLeaguesData={allLeaguesData}
              />
            </div>

            {/* CENTER COLUMN: Main Content Area */}
            <div className="w-full flex flex-col gap-4 min-w-0">
              
              {/* If tab is 'matches', show StandingsTable if a league is selected, or MatchesCenterView for all day matches */}
              {activeNavTab === 'matches' && (
                selectedLeague ? (
                  <StandingsTable
                    standings={standings}
                    selectedLeague={selectedLeague}
                    onSelectTeam={handleSelectTeam}
                    matches={leagueData.matches}
                    onSelectMatch={(m) => setSelectedMatch(m)}
                    onBackToMatches={() => setSelectedLeague(null)}
                    isLoading={isLoading}
                    teamForms={favoriteForms}
                    supabaseFavorites={supabaseFavorites}
                  />
                ) : (
                  <MatchesCenterView
                    matches={dateMatches}
                    selectedDate={selectedDate}
                    onOpenCalendar={() => setIsCalendarOpen(true)}
                    onPrevDate={handlePrevDate}
                    onNextDate={handleNextDate}
                    onSelectDate={(d) => setSelectedDate(d)}
                    onSelectMatch={(m) => setSelectedMatch(m)}
                    onSelectTeam={handleSelectTeam}
                    isLoading={isDateMatchesLoading || isLoading}
                    supabaseFavorites={supabaseFavorites}
                    selectedLeague={selectedLeague}
                    onSelectLeague={setSelectedLeague}
                    onToggleFavorite={handleToggleFavorite}
                    teamForms={favoriteForms}
                    filters={filters}
                    onFiltersChange={setFilters}
                    onOpenAiAnalysis={(m) => setSelectedAiMatch(m)}
                  />
                )
              )}

              {/* If tab is 'favorites', show Supabase Synchronized Favorites */}
              {activeNavTab === 'favorites' && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  
                  {/* Header Back to Matches Banner */}
                  <div className="bg-[#141414] rounded-xl border border-[#222222] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                    <div>
                      <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <span className="text-yellow-400">★</span>
                        <span>Meus Clubes Favoritos</span>
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Gerencie sua lista de clubes favoritos. Clique na estrela de qualquer clube para desfavoritar.
                      </p>
                    </div>

                    <button
                      id="btn-back-to-matches"
                      onClick={() => setActiveNavTab('matches')}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-colors cursor-pointer shrink-0 shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>← Voltar para Jogos</span>
                    </button>
                  </div>

                  {/* Filter and Search Bar for Favorites */}
                  <div className="bg-[#141414] rounded-xl border border-[#222222] p-4 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Search Field */}
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-bold">🔍</span>
                        <input
                          type="text"
                          placeholder="Filtrar clube favorito..."
                          value={favoritesSearchQuery}
                          onChange={(e) => setFavoritesSearchQuery(e.target.value)}
                          className="w-full bg-[#1c1c1c] hover:bg-[#222222] focus:bg-[#242424] text-xs text-white placeholder-zinc-500 pl-9 pr-4 py-2 rounded-lg border border-[#262626] focus:border-zinc-700 outline-none transition-all"
                        />
                        {favoritesSearchQuery && (
                          <button
                            onClick={() => setFavoritesSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Filter Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                        {['Todos', 'Brasil', 'Inglaterra', 'Espanha', 'Itália', 'Alemanha'].map((country) => (
                          <button
                            key={country}
                            onClick={() => setSelectedFavoritesCountry(country)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                              selectedFavoritesCountry === country
                                ? 'bg-emerald-500 text-black shadow-sm'
                                : 'bg-[#1c1c1c] text-zinc-400 hover:text-white'
                            }`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Favorites Counter & Stats Info */}
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium px-1">
                      <span>
                        Mostrando{' '}
                        <strong className="text-white">
                          {
                            supabaseFavorites.filter((c) => {
                              const matchQuery = c.name.toLowerCase().includes(favoritesSearchQuery.toLowerCase());
                              const matchCountry = selectedFavoritesCountry === 'Todos' || c.country === selectedFavoritesCountry;
                              return matchQuery && matchCountry;
                            }).length
                          }
                        </strong>{' '}
                        de <strong className="text-white">{supabaseFavorites.length}</strong> favoritos salvos
                      </span>

                      <span className="text-[10px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/40">
                        Sincronização OK
                      </span>
                    </div>
                  </div>

                  {/* Clubs Bento Grid */}
                    <div className="flex flex-col gap-6">
                      {/* Existing Favorited Clubs */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-1">
                          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="text-yellow-400">★</span> Meus Clubes Salvos
                          </span>
                          {supabaseFavorites.length > 0 && (
                            <button
                              id="btn-clear-all-favorites"
                              onClick={handleClearAllFavorites}
                              className="text-[10px] font-bold text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 px-2 py-1 rounded border border-red-900/30 transition-colors cursor-pointer"
                            >
                              Limpar Todos
                            </button>
                          )}
                        </div>

                        {supabaseFavorites.filter((c) => {
                          const matchQuery = c.name.toLowerCase().includes(favoritesSearchQuery.toLowerCase());
                          const matchCountry = selectedFavoritesCountry === 'Todos' || c.country === selectedFavoritesCountry;
                          return matchQuery && matchCountry;
                        }).length === 0 ? (
                          <div className="bg-[#141414] rounded-xl border border-[#222222] p-8 text-center text-xs text-zinc-400">
                            Nenhum clube salvo encontrado para esta busca ou filtro.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {supabaseFavorites
                              .filter((c) => {
                                const matchQuery = c.name.toLowerCase().includes(favoritesSearchQuery.toLowerCase());
                                const matchCountry = selectedFavoritesCountry === 'Todos' || c.country === selectedFavoritesCountry;
                                return matchQuery && matchCountry;
                              })
                              .map((club, idx) => (
                                <div
                                  key={`saved-${club.id}-${club.name}-${idx}`}
                                  id={`supabase-fav-club-${club.id}`}
                                  className="bg-[#141414] hover:bg-[#1a1a1a] border border-[#222222] hover:border-zinc-700 p-3.5 rounded-xl transition-all flex items-center justify-between group"
                                >
                                  <div
                                    onClick={() => handleSelectTeam(club.name, club.id)}
                                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                                  >
                                    <TeamCrest teamName={club.name} teamId={club.id} size={36} className="shrink-0" />
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                                        {club.name}
                                      </span>
                                      <span className="text-[10px] text-zinc-400 mt-0.5 font-medium truncate">
                                        {club.country} • {club.league || 'Liga Principal'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Interactive Unfavorite Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleFavorite(club);
                                    }}
                                    className="ml-2 px-2 py-1 rounded-lg bg-yellow-500/10 hover:bg-rose-500/20 border border-yellow-500/30 hover:border-rose-500/40 text-yellow-400 hover:text-rose-400 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shrink-0"
                                    title="Clique para desfavoritar este clube"
                                  >
                                    <span className="fill-current text-yellow-400">★</span>
                                    <span className="text-[10px]">Favorito</span>
                                  </button>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>

                </div>
              )}

            </div>

          </div>
        )}
      </main>

      {/* 3. MOBILE SIDEBAR DRAWER */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
          <div className="relative w-80 max-w-[85vw] bg-[#121212] border-r border-[#262626] h-full p-4 overflow-y-auto z-10 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#222222]">
              <span className="text-sm font-black text-white">Menu de Ligas</span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <LeftSidebar
              selectedLeague={selectedLeague}
              onSelectLeague={setSelectedLeague}
              allLeaguesData={allLeaguesData}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 4. MODALS */}
      
      {/* Calendar Date Picker Modal (Screenshot 7) */}
      <CalendarPickerModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onSelectDate={(d) => setSelectedDate(d)}
      />

      {/* Match Detail Modal (Screenshots 5 & 8) */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onSelectTeam={handleSelectTeam}
        />
      )}

      {/* Team Detail Modal (Screenshot 6) */}
      {selectedTeam && (
        <TeamDetailModal
          teamName={selectedTeam.name}
          teamId={selectedTeam.id}
          onClose={() => setSelectedTeam(null)}
          favorites={supabaseFavorites}
          onToggleFavorite={handleToggleFavorite}
          filters={filters}
          onFiltersChange={setFilters}
          rawMatches={
            (selectedTeam.id && teamRawMatches[selectedTeam.id]) ||
            teamRawMatches[normalizeTeamName(selectedTeam.name)] ||
            teamRawMatches[selectedTeam.name.toLowerCase().trim()] ||
            (getTeamId(selectedTeam.name) && teamRawMatches[getTeamId(selectedTeam.name)!])
          }
          onUpdateTeamMatches={(tId, matches, optName) => {
            setTeamRawMatches((prev) => {
              const next = { ...prev };
              if (tId) next[tId] = matches;
              if (optName) {
                const norm = normalizeTeamName(optName);
                if (norm) next[norm] = matches;
                const low = optName.toLowerCase().trim();
                if (low) next[low] = matches;
              }
              const selNorm = normalizeTeamName(selectedTeam.name);
              if (selNorm) next[selNorm] = matches;
              const selLow = selectedTeam.name.toLowerCase().trim();
              if (selLow) next[selLow] = matches;
              return next;
            });
          }}
        />
      )}

      {/* AI Analysis Modal */}
      {selectedAiMatch && (
        <AiAnalysisModal
          isOpen={!!selectedAiMatch}
          onClose={() => setSelectedAiMatch(null)}
          match={selectedAiMatch}
          standings={standings}
          allMatches={leagueData.matches}
          leagueName={leagueData.name}
        />
      )}

    </div>
  );
}
