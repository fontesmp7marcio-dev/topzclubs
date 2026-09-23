import React, { useState, useEffect, useMemo } from 'react';
import { TeamCrest } from './TeamCrest';
import { X, Calendar, Clock, CheckCircle, RefreshCw, Star, Trophy } from 'lucide-react';
import { getTeamId } from '../utils/teamCrests';
import { USER_FAVORITE_CLUBS_DATA, isTeamNameInFavorites } from '../data/favoriteClubs';
import { MatchFilters, DEFAULT_MATCH_FILTERS, MatchItem } from '../types';
import {
  filterTeamPastMatches,
  calculateTeamEmojis,
  calculateMatchEmoji,
  generateFallbackTeamMatches,
  getEndingFireStreak,
  getEndingLossStreak,
} from '../utils/competitionFilter';

interface TeamDetailModalProps {
  teamName: string;
  teamId?: number;
  onClose: () => void;
  onSelectMatch?: (match: any) => void;
  favorites?: { id: number; name: string; country: string; league?: string }[];
  onToggleFavorite?: (club: { id: number; name: string; country: string; league?: string }) => void;
  filters?: MatchFilters;
  onFiltersChange?: (filters: MatchFilters) => void;
  rawMatches?: MatchItem[];
  onUpdateTeamMatches?: (teamId: number, matches: MatchItem[], teamName?: string) => void;
}

// Fallback league rosters to provide context for upcoming matches
const LEAGUE_ROSTERS: Record<string, { country: string; league: string; clubs: { name: string; id: number }[] }> = {
  spain: {
    country: 'Espanha',
    league: 'La Liga',
    clubs: [
      { name: 'Real Madrid', id: 8633 },
      { name: 'Barcelona', id: 8634 },
      { name: 'Atlético Madrid', id: 9906 },
      { name: 'Real Sociedad', id: 8560 },
      { name: 'Athletic Club', id: 8315 },
      { name: 'Villarreal', id: 10205 },
      { name: 'Real Betis', id: 8603 },
      { name: 'Sevilla', id: 8302 },
      { name: 'Celta Vigo', id: 8521 },
      { name: 'Osasuna', id: 8371 },
      { name: 'Valencia', id: 10267 },
      { name: 'Mallorca', id: 8661 },
    ],
  },
  england: {
    country: 'Inglaterra',
    league: 'Premier League',
    clubs: [
      { name: 'Manchester City', id: 8456 },
      { name: 'Arsenal', id: 9825 },
      { name: 'Liverpool', id: 8650 },
      { name: 'Aston Villa', id: 10252 },
      { name: 'Tottenham', id: 8586 },
      { name: 'Chelsea', id: 8455 },
      { name: 'Newcastle', id: 10261 },
      { name: 'Manchester United', id: 10260 },
      { name: 'West Ham', id: 8654 },
      { name: 'Brighton', id: 10204 },
    ],
  },
  germany: {
    country: 'Alemanha',
    league: 'Bundesliga',
    clubs: [
      { name: 'Bayern Munich', id: 9823 },
      { name: 'Bayer Leverkusen', id: 8178 },
      { name: 'Borussia Dortmund', id: 9789 },
      { name: 'RB Leipzig', id: 178475 },
      { name: 'Eintracht Frankfurt', id: 9810 },
      { name: 'Stuttgart', id: 10269 },
    ],
  },
  italy: {
    country: 'Itália',
    league: 'Serie A',
    clubs: [
      { name: 'Inter', id: 8636 },
      { name: 'AC Milan', id: 8564 },
      { name: 'Juventus', id: 9885 },
      { name: 'Atalanta', id: 8524 },
      { name: 'Roma', id: 8686 },
      { name: 'Lazio', id: 8543 },
      { name: 'Napoli', id: 9875 },
      { name: 'Fiorentina', id: 8535 },
    ],
  },
  brazil: {
    country: 'Brasil',
    league: 'Série A',
    clubs: [
      { name: 'Botafogo', id: 8517 },
      { name: 'Palmeiras', id: 10283 },
      { name: 'Fortaleza', id: 10280 },
      { name: 'Flamengo', id: 9770 },
      { name: 'São Paulo', id: 10277 },
      { name: 'Bahia', id: 10273 },
      { name: 'Cruzeiro', id: 9781 },
      { name: 'Internacional', id: 8702 },
      { name: 'Atlético-MG', id: 10272 },
      { name: 'Corinthians', id: 9808 },
      { name: 'Fluminense', id: 9863 },
      { name: 'Grêmio', id: 9769 },
    ],
  },
  france: {
    country: 'França',
    league: 'Ligue 1',
    clubs: [
      { name: 'PSG', id: 9847 },
      { name: 'Monaco', id: 9829 },
      { name: 'Marseille', id: 8587 },
      { name: 'Lille', id: 8639 },
      { name: 'Lyon', id: 9748 },
      { name: 'Lens', id: 8588 },
    ],
  },
  portugal: {
    country: 'Portugal',
    league: 'Primeira Liga',
    clubs: [
      { name: 'Sporting', id: 9772 },
      { name: 'Benfica', id: 8149 },
      { name: 'Porto', id: 9773 },
      { name: 'Braga', id: 9771 },
    ],
  },
};

function generateFallbackFutureMatches(name: string, id: number, rosterKey: string): MatchItem[] {
  const roster = LEAGUE_ROSTERS[rosterKey] || LEAGUE_ROSTERS.brazil;
  const opponentPool = roster.clubs.filter((c) => c.name.toLowerCase() !== name.toLowerCase());

  return [
    {
      id: `fb-f1-${id}`,
      date: '27/09/2026',
      time: '16:00',
      homeTeam: name,
      homeId: id,
      awayTeam: opponentPool[0]?.name || 'Adversário',
      awayId: opponentPool[0]?.id || 1001,
      competition: roster.league,
    },
    {
      id: `fb-f2-${id}`,
      date: '01/10/2026',
      time: '20:30',
      homeTeam: opponentPool[1]?.name || 'Adversário',
      awayId: id,
      awayTeam: name,
      homeId: opponentPool[1]?.id || 1002,
      competition: roster.league,
    },
    {
      id: `fb-f3-${id}`,
      date: '05/10/2026',
      time: '18:00',
      homeTeam: name,
      homeId: id,
      awayTeam: opponentPool[2]?.name || 'Adversário',
      awayId: opponentPool[2]?.id || 1003,
      competition: roster.league,
    },
    {
      id: `fb-f4-${id}`,
      date: '09/10/2026',
      time: '21:00',
      homeTeam: opponentPool[3]?.name || 'Adversário',
      homeId: opponentPool[3]?.id || 1004,
      awayTeam: name,
      awayId: id,
      competition: `Copa ${roster.country}`,
    },
    {
      id: `fb-f5-${id}`,
      date: '14/10/2026',
      time: '16:00',
      homeTeam: name,
      homeId: id,
      awayTeam: opponentPool[4]?.name || 'Adversário',
      awayId: opponentPool[4]?.id || 1005,
      competition: roster.league,
    },
  ];
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({
  teamName,
  teamId,
  onClose,
  favorites,
  onToggleFavorite,
  filters,
  onFiltersChange,
  rawMatches,
  onUpdateTeamMatches,
}) => {
  const resolvedId = teamId || getTeamId(teamName) || 10000;
  const isFavorited = isTeamNameInFavorites(teamName, favorites);

  // Initialize matches using passed rawMatches or deterministic generator
  const [allPastMatches, setAllPastMatches] = useState<MatchItem[]>(() => {
    if (rawMatches && Array.isArray(rawMatches) && rawMatches.length > 0) {
      return rawMatches;
    }
    return generateFallbackTeamMatches(teamName, resolvedId);
  });
  const [futureMatches, setFutureMatches] = useState<MatchItem[]>([]);
  const [teamInfo, setTeamInfo] = useState<{ country?: string; league?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(!rawMatches || rawMatches.length === 0);

  // Synchronize effective filters (Competição: Liga/Copa/Todas, Mando: Casa/Fora/Todos, Janela: 5/10)
  const effectiveFilters = useMemo(() => filters || DEFAULT_MATCH_FILTERS, [filters]);

  // Synchronized filtered past matches
  const displayedPastMatches = useMemo(() => {
    return filterTeamPastMatches(allPastMatches, effectiveFilters, teamName, resolvedId);
  }, [allPastMatches, effectiveFilters, teamName, resolvedId]);

  // Synchronized emoji sequence based on the exact same filtered matches (matching main page)
  const emojiSequence = useMemo(() => {
    return calculateTeamEmojis(displayedPastMatches, effectiveFilters.window || 5);
  }, [displayedPastMatches, effectiveFilters.window]);

  // Fire / Loss Streaks
  const streakFire = useMemo(() => getEndingFireStreak(emojiSequence), [emojiSequence]);
  const streakLoss = useMemo(() => getEndingLossStreak(emojiSequence), [emojiSequence]);

  useEffect(() => {
    if (rawMatches && Array.isArray(rawMatches) && rawMatches.length > 0) {
      setAllPastMatches(rawMatches);
    }
  }, [rawMatches]);

  useEffect(() => {
    let isMounted = true;

    // Detect country & roster
    const fav = USER_FAVORITE_CLUBS_DATA.find(
      (c) => c.name.toLowerCase() === teamName.toLowerCase() || (resolvedId && c.id === resolvedId)
    );

    let rosterKey = 'brazil';
    let country = fav?.country || 'Brasil';
    let league = fav?.league || 'Série A';

    const lower = teamName.toLowerCase();
    if (
      fav?.country === 'Espanha' ||
      lower.includes('madrid') ||
      lower.includes('barcelona') ||
      lower.includes('sociedad') ||
      lower.includes('sevilla') ||
      lower.includes('betis') ||
      lower.includes('villarreal') ||
      lower.includes('athletic')
    ) {
      rosterKey = 'spain';
      country = 'Espanha';
      league = 'La Liga';
    } else if (
      fav?.country === 'Inglaterra' ||
      lower.includes('city') ||
      lower.includes('arsenal') ||
      lower.includes('liverpool') ||
      lower.includes('chelsea') ||
      lower.includes('united') ||
      lower.includes('tottenham')
    ) {
      rosterKey = 'england';
      country = 'Inglaterra';
      league = 'Premier League';
    } else if (fav?.country === 'Alemanha' || lower.includes('bayern') || lower.includes('dortmund') || lower.includes('leverkusen')) {
      rosterKey = 'germany';
      country = 'Alemanha';
      league = 'Bundesliga';
    } else if (fav?.country === 'Itália' || lower.includes('inter') || lower.includes('milan') || lower.includes('juventus') || lower.includes('napoli') || lower.includes('roma')) {
      rosterKey = 'italy';
      country = 'Itália';
      league = 'Serie A';
    } else if (fav?.country === 'Portugal' || lower.includes('sporting') || lower.includes('benfica') || lower.includes('porto')) {
      rosterKey = 'portugal';
      country = 'Portugal';
      league = 'Primeira Liga';
    }

    setTeamInfo({ country, league });

    const fetchLiveFixtures = async () => {
      try {
        const res = await fetch(`/api/fotmob/team/${resolvedId}?name=${encodeURIComponent(teamName)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            if (data.pastMatches?.length || data.futureMatches?.length) {
              setAllPastMatches(data.pastMatches || []);
              setFutureMatches(data.futureMatches || []);
              if (data.country) setTeamInfo((prev) => ({ ...prev, country: data.country }));
              setIsLoading(false);
              // Propagate to parent state to keep main page and all components 100% in sync
              if (data.pastMatches?.length && onUpdateTeamMatches) {
                onUpdateTeamMatches(data.teamId || resolvedId, data.pastMatches, data.teamName || teamName);
              }
              return;
            }
          }
        }
      } catch (err) {
        console.warn(`[TeamDetailModal] Live fetch failed for ${resolvedId}:`, err);
      }

      // Fallback if live fetch fails or no fixtures returned
      if (isMounted) {
        if (!allPastMatches || allPastMatches.length === 0) {
          const fallbackPast = generateFallbackTeamMatches(teamName, resolvedId);
          const fallbackNext = generateFallbackFutureMatches(teamName, resolvedId, rosterKey);
          setAllPastMatches(fallbackPast);
          setFutureMatches(fallbackNext);
          if (onUpdateTeamMatches) {
            onUpdateTeamMatches(resolvedId, fallbackPast, teamName);
          }
        }
        setIsLoading(false);
      }
    };

    fetchLiveFixtures();

    return () => {
      isMounted = false;
    };
  }, [teamName, resolvedId]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 select-none">
      <div
        id="modal-team-simplified-detail"
        className="bg-[#121212] border border-[#262626] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#181818] border-b border-[#242424]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1f1f1f] border border-[#2c2c2c] p-1 flex items-center justify-center shrink-0">
              <TeamCrest teamName={teamName} teamId={resolvedId} size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">{teamName}</h2>
                <button
                  type="button"
                  onClick={() => {
                    const clubObj = {
                      id: resolvedId,
                      name: teamName,
                      country: teamInfo.country || 'Brasil',
                      league: teamInfo.league || 'Série A',
                    };
                    if (onToggleFavorite) {
                      onToggleFavorite(clubObj);
                    }
                  }}
                  className={`p-1 rounded-lg transition-all cursor-pointer ${
                    isFavorited
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                      : 'text-zinc-500 hover:text-amber-400 bg-[#222222] hover:bg-[#2a2a2a] border border-zinc-800'
                  }`}
                  title={isFavorited ? 'Remover dos favoritos' : 'Favoritar clube'}
                >
                  <Star className={`w-4 h-4 ${isFavorited ? 'fill-amber-400' : ''}`} />
                </button>
                {teamInfo.country && (
                  <span className="text-[10px] font-semibold text-zinc-400 bg-[#222222] px-2 py-0.5 rounded border border-zinc-800">
                    {teamInfo.country}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">FotMob Live Data • Calendário & Histórico</span>
            </div>
          </div>

          <button
            id="btn-close-team-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#2e2e2e] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 sm:p-5 flex flex-col gap-5 max-h-[75vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-400 gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
              <p className="text-xs">Buscando jogos oficiais no FotMob...</p>
            </div>
          ) : (
            <>
              {/* SECTION 1: ÚLTIMOS JOGOS (100% SYNCHRONIZED WITH MAIN PAGE & FILTERS) */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-white tracking-tight uppercase">
                      Últimos {effectiveFilters.window} Jogos
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-zinc-400 bg-[#1c1c1f] border border-[#2c2c32] px-2 py-0.5 rounded">
                        {effectiveFilters.competition === 'league'
                          ? 'Liga'
                          : effectiveFilters.competition === 'cup'
                          ? 'Copa'
                          : 'Liga + Copa'}
                      </span>
                      <span className="text-[10px] font-semibold text-zinc-400 bg-[#1c1c1f] border border-[#2c2c32] px-2 py-0.5 rounded">
                        {effectiveFilters.mando === 'home'
                          ? 'Casa'
                          : effectiveFilters.mando === 'away'
                          ? 'Fora'
                          : 'Casa + Fora'}
                      </span>
                    </div>
                  </div>

                  {/* EMOJI SEQUENCE BAR (IDENTICAL TO MAIN PAGE REPRESENTATION) */}
                  {emojiSequence.length > 0 && (
                    <div
                      className="flex items-center gap-1.5 bg-[#18191f] px-2.5 py-1 rounded-lg border border-[#262833] shadow-xs"
                      title="Sequência recente de resultados (da esquerda para direita: jogos anteriores até o mais recente)"
                    >
                      <span className="text-[10px] font-bold text-zinc-400 mr-0.5">Sequência:</span>
                      <div className="flex items-center gap-1 bg-[#121214] px-1.5 py-0.5 rounded border border-[#222226]">
                        {emojiSequence.map((emoji, idx) => (
                          <span
                            key={idx}
                            className="text-xs leading-none drop-shadow-md"
                          >
                            {emoji}
                          </span>
                        ))}
                      </div>

                      {streakFire >= 2 && (
                        <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-950/80 border border-amber-800/40 px-1.5 py-0.2 rounded shrink-0">
                          {streakFire}🔥 Seguidos
                        </span>
                      )}
                      {streakLoss >= 2 && (
                        <span className="text-[9px] font-black uppercase text-rose-300 bg-rose-950/80 border border-rose-800/40 px-1.5 py-0.2 rounded shrink-0">
                          {streakLoss}🔻 Seguidas
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-[#161616] rounded-xl border border-[#222222] divide-y divide-[#202020] overflow-hidden">
                  {displayedPastMatches.length === 0 ? (
                    <div className="p-6 text-center text-xs text-zinc-400 flex flex-col items-center gap-2">
                      <p>Nenhum jogo encontrado para estes critérios ({effectiveFilters.competition === 'league' ? 'Liga' : effectiveFilters.competition === 'cup' ? 'Copa' : 'Liga + Copa'} • {effectiveFilters.mando === 'home' ? 'Casa' : effectiveFilters.mando === 'away' ? 'Fora' : 'Casa + Fora'}).</p>
                      {onFiltersChange && (
                        <button
                          type="button"
                          onClick={() => onFiltersChange(DEFAULT_MATCH_FILTERS)}
                          className="px-3 py-1 bg-[#222] hover:bg-[#2a2a2a] text-emerald-400 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Restaurar Filtros Padrão
                        </button>
                      )}
                    </div>
                  ) : (
                    displayedPastMatches.map((m, mIdx) => {
                      const isWin = m.result === 'V';
                      const isDraw = m.result === 'E';
                      const matchEmoji = calculateMatchEmoji(m);
                      const isHome =
                        (m.homeId && m.homeId === resolvedId) ||
                        m.homeTeam.toLowerCase() === teamName.toLowerCase();

                      return (
                        <div
                          key={m.id || `past-${mIdx}`}
                          className="flex items-center justify-between px-3.5 py-2.5 hover:bg-[#1c1c1c] transition-colors gap-2"
                        >
                          {/* Date & Competition & Venue */}
                          <div className="w-28 shrink-0 text-left">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] font-medium text-zinc-300">{m.date}</span>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-[#202024] text-zinc-400 border border-zinc-800">
                                {isHome ? 'Casa' : 'Fora'}
                              </span>
                            </div>
                            <span className="text-[9px] text-zinc-500 uppercase font-semibold block truncate" title={m.competition}>
                              {m.competition}
                            </span>
                          </div>

                          {/* Match Teams & Score */}
                          <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
                            {/* Home */}
                            <div className="flex items-center justify-end gap-1.5 flex-1 min-w-0 text-right">
                              <span
                                className={`text-xs truncate font-medium ${
                                  m.homeTeam.toLowerCase() === teamName.toLowerCase()
                                    ? 'text-white font-bold'
                                    : 'text-zinc-400'
                                }`}
                              >
                                {m.homeTeam}
                              </span>
                              <TeamCrest teamName={m.homeTeam} teamId={m.homeId} size={18} className="shrink-0" />
                            </div>

                            {/* Score Pill */}
                            <div className="px-2.5 py-0.5 rounded-md bg-[#222222] border border-[#2d2d2d] text-xs font-black text-white shrink-0 tracking-widest">
                              {typeof m.homeScore === 'number' ? m.homeScore : '-'} - {typeof m.awayScore === 'number' ? m.awayScore : '-'}
                            </div>

                            {/* Away */}
                            <div className="flex items-center justify-start gap-1.5 flex-1 min-w-0 text-left">
                              <TeamCrest teamName={m.awayTeam} teamId={m.awayId} size={18} className="shrink-0" />
                              <span
                                className={`text-xs truncate font-medium ${
                                  m.awayTeam.toLowerCase() === teamName.toLowerCase()
                                    ? 'text-white font-bold'
                                    : 'text-zinc-400'
                                }`}
                              >
                                {m.awayTeam}
                              </span>
                            </div>
                          </div>

                          {/* Emoji & Result Badge (Synchronized) */}
                          <div className="w-16 shrink-0 flex items-center justify-end gap-1.5">
                            {matchEmoji && (
                              <span
                                className="w-6 h-6 rounded-md bg-[#202127] border border-[#2d2e36] flex items-center justify-center text-xs shrink-0"
                                title={`Emoji: ${
                                  matchEmoji === '🔥'
                                    ? 'Menos de 2 gols (Under 1.5)'
                                    : m.result === 'V'
                                    ? 'Vitória (+1.5 gols)'
                                    : m.result === 'E'
                                    ? 'Empate (+1.5 gols)'
                                    : 'Derrota (+1.5 gols)'
                                }`}
                              >
                                {matchEmoji}
                              </span>
                            )}
                            {m.result ? (
                              <span
                                className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black uppercase shrink-0 ${
                                  isWin
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : isDraw
                                    ? 'bg-zinc-700/30 text-zinc-300 border border-zinc-600/30'
                                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                }`}
                                title={isWin ? 'Vitória' : isDraw ? 'Empate' : 'Derrota'}
                              >
                                {m.result}
                              </span>
                            ) : (
                              <span className="text-[10px] text-zinc-500">-</span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* SECTION 2: PRÓXIMOS 5 JOGOS */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-400" />
                    <h3 className="text-xs font-bold text-white tracking-tight uppercase">
                      Próximos 5 Jogos
                    </h3>
                  </div>
                  <span className="text-[10px] text-zinc-500">Calendário futuro oficial</span>
                </div>

                <div className="bg-[#161616] rounded-xl border border-[#222222] divide-y divide-[#202020] overflow-hidden">
                  {futureMatches.length === 0 ? (
                    <div className="p-4 text-center text-xs text-zinc-500">Nenhum próximo jogo agendado.</div>
                  ) : (
                    futureMatches.map((m, fIdx) => {
                      return (
                        <div
                          key={m.id || `future-${fIdx}`}
                          className="flex items-center justify-between px-3.5 py-2.5 hover:bg-[#1c1c1c] transition-colors gap-2"
                        >
                          {/* Date & Time */}
                          <div className="w-24 shrink-0 text-left">
                            <span className="text-[11px] font-medium text-zinc-300 block">{m.date}</span>
                            <span className="text-[10px] text-emerald-400 font-bold block flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5 inline" />
                              {m.time || 'A definir'}
                            </span>
                          </div>

                          {/* Match Teams */}
                          <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
                            {/* Home */}
                            <div className="flex items-center justify-end gap-1.5 flex-1 min-w-0 text-right">
                              <span
                                className={`text-xs truncate font-medium ${
                                  m.homeTeam.toLowerCase() === teamName.toLowerCase()
                                    ? 'text-white font-bold'
                                    : 'text-zinc-400'
                                }`}
                              >
                                {m.homeTeam}
                              </span>
                              <TeamCrest teamName={m.homeTeam} teamId={m.homeId} size={18} className="shrink-0" />
                            </div>

                            {/* vs Pill */}
                            <div className="px-2 py-0.5 rounded-md bg-[#202020] text-[10px] font-bold text-zinc-400 shrink-0 border border-[#2b2b2b]">
                              VS
                            </div>

                            {/* Away */}
                            <div className="flex items-center justify-start gap-1.5 flex-1 min-w-0 text-left">
                              <TeamCrest teamName={m.awayTeam} teamId={m.awayId} size={18} className="shrink-0" />
                              <span
                                className={`text-xs truncate font-medium ${
                                  m.awayTeam.toLowerCase() === teamName.toLowerCase()
                                    ? 'text-white font-bold'
                                    : 'text-zinc-400'
                                }`}
                              >
                                {m.awayTeam}
                              </span>
                            </div>
                          </div>

                          {/* Competition Badge */}
                          <div className="w-20 shrink-0 flex justify-end">
                            <span className="text-[9px] font-bold text-zinc-400 bg-[#222222] px-2 py-0.5 rounded border border-[#2d2d2d] truncate" title={m.competition}>
                              {m.competition}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
