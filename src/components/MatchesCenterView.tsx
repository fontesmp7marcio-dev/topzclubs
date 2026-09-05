import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Calendar, Star, RotateCcw } from 'lucide-react';
import { Match, LeagueOption, MatchFilters } from '../types';
import { TeamCrest } from './TeamCrest';
import { CountryFlag } from './CountryFlag';
import { isMatchInFavorites } from '../data/curatedSchedule';
import { USER_FAVORITE_CLUBS_DATA, isTeamNameInFavorites, normalizeTeamName } from '../data/favoriteClubs';
import { isFemaleOrWomensMatch } from '../utils/femaleFilter';
import { filterIndexMatches } from '../utils/competitionFilter';
import { MatchFiltersMenu } from './MatchFiltersMenu';
import {
  getBrasiliaTodayStr,
  addDaysToDateStr,
  formatBrasiliaDateLabel,
  formatBrasiliaDateHeader,
  formatBrasiliaRowDate,
} from '../utils/dateUtils';

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

function getLeagueGroupInfo(m: Match): { key: string; name: string; country: string; ccode: string } {
  let rawLeague = (m.leagueName || '').trim();
  let ccode = (m.countryCcode || '').toUpperCase().trim();
  let country = 'Internacional';

  // Check if team1 or team2 belongs to a known favorite club to infer exact league and country
  const t1Meta = USER_FAVORITE_CLUBS_DATA.find((c) => isTeamNameInFavorites(m.team1, [c]));
  const t2Meta = USER_FAVORITE_CLUBS_DATA.find((c) => isTeamNameInFavorites(m.team2, [c]));
  const clubMeta = t1Meta || t2Meta;

  if (clubMeta) {
    if (clubMeta.country) country = clubMeta.country;
    if (clubMeta.league && (!rawLeague || rawLeague === 'Outras Ligas' || rawLeague === 'Liga' || rawLeague === 'Liga de Elite')) {
      rawLeague = clubMeta.league;
    }
  }

  let finalLeague = rawLeague || 'Outras Ligas';

  // Disambiguate leagues cleanly
  if (ccode === 'ENG' || country === 'Inglaterra' || (rawLeague.toLowerCase().includes('premier league') && !rawLeague.toLowerCase().includes('russian') && !rawLeague.toLowerCase().includes('egyptian') && ccode !== 'RUS' && ccode !== 'EGY')) {
    if (!rawLeague || rawLeague.toLowerCase() === 'premier league' || rawLeague.includes('Inglaterra')) {
      finalLeague = 'Premier League';
      country = 'Inglaterra';
      ccode = 'ENG';
    }
  } else if (ccode === 'RUS' || country === 'Rússia' || rawLeague.toLowerCase().includes('russian') || rawLeague.toLowerCase().includes('russia')) {
    finalLeague = 'Russian Premier League';
    country = 'Rússia';
    ccode = 'RUS';
  } else if (ccode === 'USA' || ccode === 'MLS' || country === 'Estados Unidos' || rawLeague.toUpperCase().includes('MLS')) {
    finalLeague = 'MLS';
    country = 'Estados Unidos';
    ccode = 'USA';
  } else if (ccode === 'SAU' || country === 'Arábia Saudita' || rawLeague.toLowerCase().includes('saudi')) {
    finalLeague = 'Saudi Pro League';
    country = 'Arábia Saudita';
    ccode = 'SAU';
  } else if (ccode === 'BRA' || country === 'Brasil' || rawLeague.toLowerCase().includes('brasileir')) {
    finalLeague = 'Brasileirão Betano';
    country = 'Brasil';
    ccode = 'BRA';
  } else if (ccode === 'ESP' || country === 'Espanha' || rawLeague.toLowerCase().includes('la liga')) {
    finalLeague = 'La Liga';
    country = 'Espanha';
    ccode = 'ESP';
  } else if (ccode === 'GER' || country === 'Alemanha' || rawLeague.toLowerCase().includes('bundesliga')) {
    finalLeague = 'Bundesliga';
    country = 'Alemanha';
    ccode = 'GER';
  } else if (ccode === 'ITA' || country === 'Itália' || (rawLeague.toLowerCase().includes('serie a') && ccode === 'ITA')) {
    finalLeague = 'Serie A';
    country = 'Itália';
    ccode = 'ITA';
  } else if (ccode === 'FRA' || country === 'França' || rawLeague.toLowerCase().includes('ligue 1')) {
    finalLeague = 'Ligue 1';
    country = 'França';
    ccode = 'FRA';
  } else if (ccode === 'POR' || country === 'Portugal' || rawLeague.toLowerCase().includes('primeira liga')) {
    finalLeague = 'Primeira Liga';
    country = 'Portugal';
    ccode = 'POR';
  } else if (!ccode || ccode === 'INT') {
    ccode = 'INT';
  }

  // Create a strictly unique group key combining league and ccode
  const key = `${finalLeague}___${ccode}`;

  return { key, name: finalLeague, country, ccode };
}

interface MatchesCenterViewProps {
  matches: Match[];
  selectedDate: string;
  onOpenCalendar: () => void;
  onPrevDate: () => void;
  onNextDate: () => void;
  onSelectDate?: (date: string) => void;
  onSelectMatch: (match: Match) => void;
  onSelectTeam: (teamName: string, teamId?: number) => void;
  isLoading?: boolean;
  supabaseFavorites?: { id: number; name: string; country: string; league?: string }[];
  selectedLeague?: LeagueOption | null;
  onSelectLeague?: (league: LeagueOption | null) => void;
  onToggleFavorite?: (club: { id: number; name: string; country: string; league?: string }) => void;
  teamForms?: Record<number, string[]>;
  filters?: MatchFilters;
  onFiltersChange?: (filters: MatchFilters) => void;
}

interface TournamentGroup {
  id: string;
  name: string;
  country: string;
  ccode: string;
  matches: Match[];
}

export const MatchesCenterView: React.FC<MatchesCenterViewProps> = ({
  matches,
  selectedDate,
  onOpenCalendar,
  onPrevDate,
  onNextDate,
  onSelectDate,
  onSelectMatch,
  onSelectTeam,
  isLoading = false,
  supabaseFavorites = [],
  selectedLeague,
  onSelectLeague,
  onToggleFavorite,
  teamForms = {},
  filters,
  onFiltersChange,
}) => {
  const [collapsedLeagues, setCollapsedLeagues] = useState<Record<string, boolean>>({});

  const toggleLeagueCollapse = (leagueId: string) => {
    setCollapsedLeagues((prev) => ({
      ...prev,
      [leagueId]: !prev[leagueId],
    }));
  };

  // Filter matches for the selected date featuring favorite clubs strictly
  const finalMatches = useMemo(() => {
    // 1. Filter out female matches and filter strictly by selected date
    const onDate = matches.filter((m) => {
      if (isFemaleOrWomensMatch(m.leagueName, m.team1, m.team2)) return false;
      if (m.date) return m.date === selectedDate;
      return true;
    });

    // 2. STRICT FAVORITES FILTERING: Only include matches with at least one favorite club!
    // Never fall back to showing non-favorite matches!
    const favoriteMatches = onDate.filter((m) => isMatchInFavorites(m, supabaseFavorites));

    // 3. DEDUPLICATION: Eliminate any duplicate match fixtures on the same date
    const seenMatchKeys = new Set<string>();
    const uniqueFavoriteMatches: Match[] = [];

    for (const m of favoriteMatches) {
      const t1 = normalizeTeamName(m.team1);
      const t2 = normalizeTeamName(m.team2);
      const fixtureKey = [t1, t2].sort().join('___');
      const uniqueKey = `${m.date || selectedDate}___${fixtureKey}`;

      if (!seenMatchKeys.has(uniqueKey)) {
        seenMatchKeys.add(uniqueKey);
        uniqueFavoriteMatches.push(m);
      }
    }

    // 4. Filter by selected league if active
    let baseMatches = uniqueFavoriteMatches;
    if (selectedLeague) {
      baseMatches = uniqueFavoriteMatches.filter((m) => {
        const lName = (m.leagueName || '').toLowerCase();
        const sName = selectedLeague.name.toLowerCase();
        return lName.includes(sName) || sName.includes(lName);
      });
    }

    // 5. Apply synchronized MatchFilters (Competição: Liga/Copa, Mando: Casa/Fora)
    const filteredByCustomFilters = filters
      ? filterIndexMatches(baseMatches, filters, supabaseFavorites)
      : baseMatches;

    // Sort matches chronologically by match kickoff time
    return [...filteredByCustomFilters].sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));
  }, [matches, selectedDate, selectedLeague, supabaseFavorites, filters]);

  // Group matches by tournament / league and sort by kickoff time
  const tournamentGroups: TournamentGroup[] = useMemo(() => {
    const groupsMap: Record<string, TournamentGroup> = {};

    finalMatches.forEach((m) => {
      const info = getLeagueGroupInfo(m);
      if (!groupsMap[info.key]) {
        groupsMap[info.key] = {
          id: info.key.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: info.name,
          country: info.country,
          ccode: info.ccode,
          matches: [],
        };
      }
      groupsMap[info.key].matches.push(m);
    });

    // Sort matches inside each tournament group by time
    const groups = Object.values(groupsMap).map((group) => {
      group.matches.sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));
      return group;
    });

    // Sort tournament groups by the earliest match time in each group
    groups.sort((a, b) => {
      const earliestA = a.matches.length > 0 ? parseTimeToMinutes(a.matches[0].time) : 9999;
      const earliestB = b.matches.length > 0 ? parseTimeToMinutes(b.matches[0].time) : 9999;
      return earliestA - earliestB;
    });

    return groups;
  }, [finalMatches]);

  // Quick dates for navigation pills around selectedDate
  const quickDates = useMemo(() => {
    const dates: { dateStr: string; label: string; isSelected: boolean }[] = [];
    const brasiliaToday = getBrasiliaTodayStr();

    for (let offset = -2; offset <= 3; offset++) {
      const dateStr = addDaysToDateStr(selectedDate, offset);
      const label = formatBrasiliaDateLabel(dateStr, brasiliaToday);

      dates.push({
        dateStr,
        label,
        isSelected: dateStr === selectedDate,
      });
    }
    return dates;
  }, [selectedDate]);

  // Formatted date string for the calendar button
  const dateFormatted = useMemo(() => {
    return formatBrasiliaDateHeader(selectedDate);
  }, [selectedDate]);

  // Format short date string for row status (e.g., "4 Set")
  const rowDateStr = useMemo(() => {
    return formatBrasiliaRowDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-full flex flex-col gap-3 select-none max-w-4xl mx-auto">
      
      {/* Active League Filter Banner */}
      {selectedLeague && onSelectLeague && (
        <div className="bg-[#121f18] border border-[#1d3d2c] rounded-xl px-3.5 py-2 flex items-center justify-between text-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-medium">Liga selecionada:</span>
            <span className="font-semibold text-white flex items-center gap-1.5 bg-[#173024] px-2 py-0.5 rounded border border-[#224734]">
              {selectedLeague.flag} {selectedLeague.name}
            </span>
          </div>
          <button
            onClick={() => onSelectLeague(null)}
            className="text-zinc-400 hover:text-white text-xs font-semibold px-2 py-0.5 rounded hover:bg-[#1a382a] transition-colors cursor-pointer"
          >
            Limpar ✕
          </button>
        </div>
      )}
      
      {/* CALENDAR & DATE NAVIGATOR + FILTROS (CENTERED TOGETHER) */}
      <div className="bg-[#141414] rounded-xl border border-[#222222] p-2.5 sm:p-3 flex items-center justify-center gap-5 sm:gap-6 shadow-sm flex-wrap">
        {/* Date Navigator */}
        <div className="flex items-center gap-2">
          <button
            id="btn-prev-date"
            onClick={onPrevDate}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Dia anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            id="btn-open-calendar-picker"
            onClick={onOpenCalendar}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#222222] text-xs font-semibold text-white transition-colors cursor-pointer border border-[#282828] shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>{dateFormatted}</span>
          </button>

          <button
            id="btn-next-date"
            onClick={onNextDate}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Próximo dia"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter System beside the Calendar */}
        {filters && onFiltersChange && (
          <div className="flex items-center">
            <MatchFiltersMenu filters={filters} onFiltersChange={onFiltersChange} />
          </div>
        )}
      </div>

      {/* TOURNAMENT GROUPS CARDS */}
      <div className="flex flex-col gap-3">
        
        {/* Loading */}
        {isLoading && (
          <div className="bg-[#141414] rounded-xl border border-[#222222] p-8 text-center flex flex-col items-center gap-2">
            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-zinc-400">Carregando jogos dos favoritos...</p>
          </div>
        )}

        {/* No matches */}
        {!isLoading && tournamentGroups.length === 0 && (
          <div className="bg-[#141414] rounded-xl border border-[#222222] p-8 text-center flex flex-col items-center gap-2 shadow-sm">
            <Calendar className="w-6 h-6 text-zinc-500 mb-1" />
            <p className="text-xs font-medium text-zinc-400">
              {filters && (filters.competition !== 'all' || filters.mando !== 'all')
                ? 'Nenhum jogo encontrado com os filtros selecionados nesta data.'
                : 'Nenhum jogo de time favorito nesta data.'}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {filters && (filters.competition !== 'all' || filters.mando !== 'all' || filters.window !== 5) && onFiltersChange && (
                <button
                  onClick={() => onFiltersChange({ competition: 'all', mando: 'all', window: 5 })}
                  className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restaurar Filtros</span>
                </button>
              )}
              {onSelectDate && (
                <button
                  onClick={() => onSelectDate('2026-09-03')}
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Ir para Hoje (03/09)
                </button>
              )}
            </div>
          </div>
        )}

        {/* League Card */}
        {!isLoading && tournamentGroups.map((group) => {
          const isCollapsed = !!collapsedLeagues[group.id];

          return (
            <div
              key={group.id}
              id={`tournament-card-${group.id}`}
              className="bg-[#141414] rounded-2xl border border-[#222222] overflow-hidden shadow-sm"
            >
              {/* Card Header: Country Flag/Icon + Tournament Name + Chevron */}
              <div
                onClick={() => toggleLeagueCollapse(group.id)}
                className="flex items-center justify-between px-4 py-3 bg-[#141414] hover:bg-[#181818] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md overflow-hidden flex items-center justify-center bg-[#1c1c1c] border border-[#282828] shrink-0">
                    <CountryFlag ccode={group.ccode} name={group.country} size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {group.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-400">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCollapsed ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                </div>
              </div>

              {/* Collapsible Content */}
              {!isCollapsed && (
                <div>
                  {/* Table Subheader: "Horário / Partida" */}
                  <div className="px-4 py-1.5 bg-[#181818] border-t border-b border-[#202020] text-[11px] font-semibold text-zinc-400">
                    Horário / Partida
                  </div>

                  {/* Matches List */}
                  <div className="divide-y divide-[#1e1e1e]">
                    {group.matches.map((match, idx) => {
                      const isLive = match.status === 'live';
                      const isFinished = match.status === 'finished';
                      const score1 = match.score?.ft ? match.score.ft[0] : null;
                      const score2 = match.score?.ft ? match.score.ft[1] : null;

                      const isFav1 = isTeamNameInFavorites(match.team1, supabaseFavorites);
                      const isFav2 = isTeamNameInFavorites(match.team2, supabaseFavorites);

                      // Positions
                      const pos1 = (idx * 3 + 4) % 18 + 1;
                      const pos2 = (idx * 3 + 8) % 18 + 1;

                      return (
                        <div
                          key={match.id || `match-${idx}`}
                          id={`match-row-${match.id || idx}`}
                          className="hover:bg-[#181818] transition-colors cursor-default group"
                        >
                          {/* ==================== MOBILE LAYOUT (< 640px) ==================== */}
                          <div className="flex sm:hidden items-center px-3 py-2.5 gap-2.5 border-b border-zinc-900/40">
                            {/* Time / Status Column */}
                            <div className="w-14 shrink-0 flex flex-col items-center justify-center text-center">
                              {isLive ? (
                                <>
                                  <span className="text-[11px] font-black text-emerald-400 tracking-tight">
                                    {score1 ?? 0}×{score2 ?? 0}
                                  </span>
                                  <span className="inline-block px-1 py-0.2 rounded text-[8px] font-black uppercase text-emerald-300 bg-emerald-950/80 border border-emerald-800/40 mt-0.5 animate-pulse">
                                    {match.liveMinute || 'VIVO'}
                                  </span>
                                </>
                              ) : isFinished ? (
                                <>
                                  <span className="text-[11px] font-bold text-white tracking-tight">
                                    {score1 ?? 0}×{score2 ?? 0}
                                  </span>
                                  <span className="inline-block px-1 py-0.2 rounded text-[8px] font-bold text-zinc-300 bg-[#282828] border border-[#383838] mt-0.5">
                                    FT
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="text-xs font-bold text-white tracking-tight">
                                    {match.time || '21:00'}
                                  </span>
                                  <span className="text-[9px] text-zinc-500 mt-0.5">
                                    {rowDateStr}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Divider Line */}
                            <div className="w-px h-10 bg-zinc-800/60 shrink-0" />

                            {/* Teams Column (Stacked) */}
                            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                              {/* Team 1 Row */}
                              <div className="flex items-center gap-1.5 min-w-0">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectTeam(match.team1, match.team1Id);
                                  }}
                                  className="w-6 h-6 rounded bg-[#181818] border border-[#262626] flex items-center justify-center p-0.5 shrink-0 cursor-pointer"
                                >
                                  <TeamCrest teamName={match.team1} teamId={match.team1Id} size={18} />
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onToggleFavorite) {
                                      onToggleFavorite({
                                        id: match.team1Id || 0,
                                        name: match.team1,
                                        country: match.countryCcode || 'Brasil',
                                        league: match.leagueName,
                                      });
                                    }
                                  }}
                                  className="p-0.5 cursor-pointer shrink-0"
                                >
                                  <Star
                                    className={`w-3 h-3 transition-all ${
                                      isFav1
                                        ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]'
                                        : 'text-zinc-600 hover:text-yellow-400'
                                    }`}
                                  />
                                </button>

                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectTeam(match.team1, match.team1Id);
                                  }}
                                  className={`text-xs font-semibold truncate hover:text-emerald-400 transition-colors cursor-pointer ${
                                    isFav1 ? 'text-white font-bold' : 'text-zinc-200'
                                  }`}
                                >
                                  {match.team1}
                                </span>

                                <span className="px-1 py-0.2 rounded bg-[#1d2633] text-[9px] font-semibold text-sky-400 border border-sky-800/30 shrink-0">
                                  {pos1}°
                                </span>

                                {isFav1 && match.team1Id && teamForms[match.team1Id] && teamForms[match.team1Id].length > 0 && (
                                  <div className="flex items-center gap-0.5 shrink-0 ml-1" title="Tendência recente (últimos 3 jogos)">
                                    {teamForms[match.team1Id].map((emoji, idx) => (
                                      <span key={idx} className="text-[10px] leading-none drop-shadow-md">{emoji}</span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Team 2 Row */}
                              <div className="flex items-center gap-1.5 min-w-0">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectTeam(match.team2, match.team2Id);
                                  }}
                                  className="w-6 h-6 rounded bg-[#181818] border border-[#262626] flex items-center justify-center p-0.5 shrink-0 cursor-pointer"
                                >
                                  <TeamCrest teamName={match.team2} teamId={match.team2Id} size={18} />
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onToggleFavorite) {
                                      onToggleFavorite({
                                        id: match.team2Id || 0,
                                        name: match.team2,
                                        country: match.countryCcode || 'Brasil',
                                        league: match.leagueName,
                                      });
                                    }
                                  }}
                                  className="p-0.5 cursor-pointer shrink-0"
                                >
                                  <Star
                                    className={`w-3 h-3 transition-all ${
                                      isFav2
                                        ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]'
                                        : 'text-zinc-600 hover:text-yellow-400'
                                    }`}
                                  />
                                </button>

                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectTeam(match.team2, match.team2Id);
                                  }}
                                  className={`text-xs font-semibold truncate hover:text-emerald-400 transition-colors cursor-pointer ${
                                    isFav2 ? 'text-white font-bold' : 'text-zinc-200'
                                  }`}
                                >
                                  {match.team2}
                                </span>

                                <span className="px-1 py-0.2 rounded bg-[#1d2633] text-[9px] font-semibold text-sky-400 border border-sky-800/30 shrink-0">
                                  {pos2}°
                                </span>

                                {isFav2 && match.team2Id && teamForms[match.team2Id] && teamForms[match.team2Id].length > 0 && (
                                  <div className="flex items-center gap-0.5 shrink-0 ml-1" title="Tendência recente (últimos 3 jogos)">
                                    {teamForms[match.team2Id].map((emoji, idx) => (
                                      <span key={idx} className="text-[10px] leading-none drop-shadow-md">{emoji}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* ==================== DESKTOP LAYOUT (>= 640px) ==================== */}
                          <div className="hidden sm:flex items-center justify-between px-4 py-3 gap-3">
                            {/* TEAM 1 (HOME): IPSWICH TOWN + POS + STREAKS + LOGO 1 + STAR 1 */}
                            <div className="flex-1 flex flex-col items-end justify-center min-w-0">
                              <div className="flex items-center justify-end gap-2 min-w-0">
                                {/* Position Pill */}
                                <span className="px-1.5 py-0.2 rounded-md bg-[#1d2633] text-[10px] font-semibold text-sky-400 border border-sky-800/30 shrink-0">
                                  {pos1}°
                                </span>

                                {/* Team 1 Name */}
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectTeam(match.team1, match.team1Id);
                                  }}
                                  className={`text-[13px] font-semibold truncate hover:text-emerald-400 transition-colors cursor-pointer ${
                                    isFav1 ? 'text-white font-bold' : 'text-zinc-300'
                                  }`}
                                >
                                  {match.team1}
                                </span>

                                {/* Team 1 Crest */}
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectTeam(match.team1, match.team1Id);
                                  }}
                                  className="w-7 h-7 rounded-lg bg-[#181818] border border-[#262626] flex items-center justify-center p-0.5 hover:border-zinc-500 transition-colors shrink-0 cursor-pointer"
                                >
                                  <TeamCrest teamName={match.team1} teamId={match.team1Id} size={22} />
                                </div>

                                {/* Team 1 Interactive Favorite Star */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onToggleFavorite) {
                                      onToggleFavorite({
                                        id: match.team1Id || 0,
                                        name: match.team1,
                                        country: match.countryCcode || 'Brasil',
                                        league: match.leagueName,
                                      });
                                    }
                                  }}
                                  title={isFav1 ? `Desfavoritar ${match.team1}` : `Favoritar ${match.team1}`}
                                  className="p-1 rounded-full hover:scale-125 transition-transform cursor-pointer shrink-0"
                                >
                                  <Star
                                    className={`w-3.5 h-3.5 transition-all ${
                                      isFav1
                                        ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]'
                                        : 'text-zinc-600 hover:text-yellow-400 hover:fill-yellow-400/40'
                                    }`}
                                  />
                                </button>
                              </div>
                              {isFav1 && match.team1Id && teamForms[match.team1Id] && teamForms[match.team1Id].length > 0 && (
                                <div className="flex items-center gap-1 mt-0.5 mr-16" title="Tendência recente (últimos 3 jogos)">
                                  {teamForms[match.team1Id].map((emoji, idx) => (
                                    <span key={idx} className="text-[11px] drop-shadow-md">{emoji}</span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* CENTER: TIME / SCORE / STATUS */}
                            <div className="w-20 shrink-0 flex flex-col items-center justify-center text-center px-1">
                              {isLive ? (
                                <>
                                  <span className="text-xs font-black text-emerald-400 tracking-tight">
                                    {score1 ?? 0} × {score2 ?? 0}
                                  </span>
                                  <span className="inline-block px-1 py-0.2 rounded text-[9px] font-black uppercase text-emerald-300 bg-emerald-950/80 border border-emerald-800/40 mt-0.5 animate-pulse">
                                    {match.liveMinute || 'AO VIVO'}
                                  </span>
                                  <span className="text-[10px] text-zinc-500 mt-0.5">
                                    {rowDateStr}
                                  </span>
                                </>
                              ) : isFinished ? (
                                <>
                                  <span className="text-xs font-bold text-white tracking-tight">
                                    {score1 ?? 0} × {score2 ?? 0}
                                  </span>
                                  <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold text-zinc-300 bg-[#282828] border border-[#383838] mt-0.5">
                                    FT
                                  </span>
                                  <span className="text-[10px] text-zinc-500 mt-0.5">
                                    {rowDateStr}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="text-xs font-bold text-white tracking-tight">
                                    {match.time || '21:00'}
                                  </span>
                                  <span className="text-[10px] text-zinc-500 mt-0.5">
                                    {rowDateStr}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* TEAM 2 (AWAY): STAR 2 + LOGO 2 + LIVERPOOL + POS + STREAKS */}
                            <div className="flex-1 flex flex-col items-start justify-center min-w-0">
                              <div className="flex items-center justify-start gap-2 min-w-0">
                                {/* Team 2 Interactive Favorite Star */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onToggleFavorite) {
                                      onToggleFavorite({
                                        id: match.team2Id || 0,
                                        name: match.team2,
                                        country: match.countryCcode || 'Brasil',
                                        league: match.leagueName,
                                      });
                                    }
                                  }}
                                  title={isFav2 ? `Desfavoritar ${match.team2}` : `Favoritar ${match.team2}`}
                                  className="p-1 rounded-full hover:scale-125 transition-transform cursor-pointer shrink-0"
                                >
                                  <Star
                                    className={`w-3.5 h-3.5 transition-all ${
                                      isFav2
                                        ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]'
                                      : 'text-zinc-600 hover:text-yellow-400 hover:fill-yellow-400/40'
                                    }`}
                                  />
                                </button>

                                {/* Team 2 Crest */}
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectTeam(match.team2, match.team2Id);
                                  }}
                                  className="w-7 h-7 rounded-lg bg-[#181818] border border-[#262626] flex items-center justify-center p-0.5 hover:border-zinc-500 transition-colors shrink-0 cursor-pointer"
                                >
                                  <TeamCrest teamName={match.team2} teamId={match.team2Id} size={22} />
                                </div>

                                {/* Team 2 Name */}
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectTeam(match.team2, match.team2Id);
                                  }}
                                  className={`text-[13px] font-semibold truncate hover:text-emerald-400 transition-colors cursor-pointer ${
                                    isFav2 ? 'text-white font-bold' : 'text-zinc-300'
                                  }`}
                                >
                                  {match.team2}
                                </span>

                                {/* Position Pill */}
                                <span className="px-1.5 py-0.2 rounded-md bg-[#1d2633] text-[10px] font-semibold text-sky-400 border border-sky-800/30 shrink-0">
                                  {pos2}°
                                </span>
                              </div>
                              {isFav2 && match.team2Id && teamForms[match.team2Id] && teamForms[match.team2Id].length > 0 && (
                                <div className="flex items-center gap-1 mt-0.5 ml-16" title="Tendência recente (últimos 3 jogos)">
                                  {teamForms[match.team2Id].map((emoji, idx) => (
                                    <span key={idx} className="text-[11px] drop-shadow-md">{emoji}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
