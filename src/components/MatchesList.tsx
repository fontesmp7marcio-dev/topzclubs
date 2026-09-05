import React, { useState, useMemo } from 'react';
import { Match, StandingItem } from '../types';
import { TeamBadge } from './TeamBadge';
import { Calendar, Clock, Filter, Sparkles, Activity, BarChart2 } from 'lucide-react';

interface MatchesListProps {
  matches: Match[];
  standings: StandingItem[];
  searchQuery: string;
  onOpenAiAnalysis: (match: Match) => void;
  onOpenH2HWithTeams: (t1: string, t2: string) => void;
  onOpenSofascoreStats?: (match: Match) => void;
}

export const MatchesList: React.FC<MatchesListProps> = ({
  matches,
  standings,
  searchQuery,
  onOpenAiAnalysis,
  onOpenH2HWithTeams,
  onOpenSofascoreStats,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'finished' | 'upcoming'>('all');
  const [selectedRound, setSelectedRound] = useState<string>('all');

  // Extract unique rounds
  const rounds = useMemo(() => {
    const list: string[] = [];
    matches.forEach((m) => {
      if (m.round && !list.includes(m.round)) {
        list.push(m.round);
      }
    });
    return list;
  }, [matches]);

  // Filter matches
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      // Search team filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchT1 = m.team1?.toLowerCase().includes(q);
        const matchT2 = m.team2?.toLowerCase().includes(q);
        if (!matchT1 && !matchT2) return false;
      }

      // Round filter
      if (selectedRound !== 'all' && m.round !== selectedRound) {
        return false;
      }

      // Status filter
      const isLive = m.status === 'live';
      const isFinished = m.status === 'finished' || (m.score && Array.isArray(m.score.ft) && !isLive);
      if (statusFilter === 'live' && !isLive) return false;
      if (statusFilter === 'finished' && !isFinished) return false;
      if (statusFilter === 'upcoming' && (isFinished || isLive)) return false;

      return true;
    });
  }, [matches, searchQuery, selectedRound, statusFilter]);

  // Group matches by round or date
  const groupedByRound = useMemo(() => {
    const map = new Map<string, Match[]>();
    filteredMatches.forEach((m) => {
      const key = m.round || 'Rodada Geral';
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(m);
    });
    return Array.from(map.entries());
  }, [filteredMatches]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-');
      if (y && m && d) {
        return `${d}/${m}/${y}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  // Find ranks of teams for match card badges
  const getTeamRank = (teamName: string) => {
    const found = standings.find((s) => s.team === teamName);
    return found ? `#${found.rank}` : '';
  };

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="bg-[#111111] p-4 rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Status Tabs: Todos, Ao Vivo, Finalizados, Próximos */}
        <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800 overflow-x-auto no-scrollbar">
          <button
            id="filter-all-matches"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-zinc-800 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Todos ({matches.length})
          </button>
          <button
            id="filter-live-matches"
            onClick={() => setStatusFilter('live')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              statusFilter === 'live'
                ? 'bg-emerald-500 text-black font-bold shadow-md'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Ao Vivo ({matches.filter(m => m.status === 'live').length})</span>
          </button>
          <button
            id="filter-finished-matches"
            onClick={() => setStatusFilter('finished')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              statusFilter === 'finished'
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Encerrados
          </button>
          <button
            id="filter-upcoming-matches"
            onClick={() => setStatusFilter('upcoming')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              statusFilter === 'upcoming'
                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Próximos
          </button>
        </div>

        {/* Round Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="select-round" className="text-[11px] uppercase tracking-widest text-zinc-500 whitespace-nowrap font-bold flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rodada:</span>
          </label>
          <div className="relative flex-1 sm:w-48">
            <select
              id="select-round"
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
              className="w-full appearance-none bg-zinc-950 text-zinc-100 text-xs font-medium px-3 py-1.5 pr-8 rounded-lg border border-zinc-800 hover:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">Todas as Rodadas</option>
              {rounds.map((r) => (
                <option key={r} value={r} className="bg-[#111111]">
                  {r}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Matches Content */}
      {groupedByRound.length === 0 ? (
        <div className="bg-[#111111] border border-zinc-800 rounded-xl p-12 text-center">
          <Calendar className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-zinc-300">Nenhuma partida encontrada</h3>
          <p className="text-xs text-zinc-500 mt-1">
            Tente alterar os filtros de status ou o termo de busca.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedByRound.map(([roundName, roundMatches]) => (
            <div key={roundName} className="space-y-3">
              
              {/* Round Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300 font-['Outfit']">
                    {roundName}
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                  {roundMatches.length} {roundMatches.length === 1 ? 'partida' : 'partidas'}
                </span>
              </div>

              {/* Grid of Match Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {roundMatches.map((match, idx) => {
                  const isLive = match.status === 'live' || !!match.liveMinute;
                  const isFinished = match.status === 'finished' || ((match.score && Array.isArray(match.score.ft)) && !isLive);
                  const isUpcoming = !isLive && !isFinished;

                  const cardBgClass = isLive
                    ? 'bg-[#12241b] hover:bg-[#182c22] border-emerald-500/40 ring-1 ring-emerald-500/20'
                    : isFinished
                    ? 'bg-[#141518] hover:bg-[#1a1b1f] border-zinc-800'
                    : 'bg-[#22242b] hover:bg-[#282a33] border-[#2e313a]';

                  const rank1 = getTeamRank(match.team1);
                  const rank2 = getTeamRank(match.team2);

                  const score1 = (isFinished || isLive) && match.score?.ft ? match.score.ft[0] : null;
                  const score2 = (isFinished || isLive) && match.score?.ft ? match.score.ft[1] : null;

                  const isT1Winner = isFinished && score1! > score2!;
                  const isT2Winner = isFinished && score2! > score1!;

                  return (
                    <div
                      key={`${match.team1}-${match.team2}-${idx}`}
                      id={`match-card-${idx}`}
                      className={`rounded-xl p-4 transition-all shadow-lg flex flex-col justify-between gap-3 group ${cardBgClass}`}
                    >
                      {/* Top Bar: Date, Time & Status */}
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-2 border-b border-zinc-800/80">
                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{formatDate(match.date)}</span>
                          {match.time && (
                            <>
                              <span className="text-zinc-700">•</span>
                              <Clock className="w-3.5 h-3.5 text-zinc-500 ml-0.5" />
                              <span>{match.time}</span>
                            </>
                          )}
                        </div>

                        <div>
                          {isLive ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              {match.liveMinute || 'AO VIVO'}
                            </span>
                          ) : isFinished ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-zinc-800/80 text-zinc-400 border border-zinc-700/60 font-mono">
                              FT Encerrado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono">
                              Agendado
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Teams & Scoreboard */}
                      <div className="grid grid-cols-5 items-center gap-2 my-1">
                        
                        {/* Team 1 (Home) */}
                        <div className="col-span-2 flex items-center gap-2.5">
                          <TeamBadge teamName={match.team1} size="md" showName={false} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-xs font-semibold truncate block ${
                                  isT1Winner ? 'text-white font-bold' : 'text-zinc-300'
                                }`}
                              >
                                {match.team1}
                              </span>
                            </div>
                            {rank1 && (
                              <span className="text-[10px] font-mono text-zinc-500">{rank1}</span>
                            )}
                          </div>
                        </div>

                        {/* Placar Center */}
                        <div className="col-span-1 text-center flex flex-col items-center justify-center">
                          {isFinished || isLive ? (
                            <div className="bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-inner">
                              <div className="flex items-center justify-center gap-1.5 font-mono text-sm font-black text-white">
                                <span className={isT1Winner || (isLive && score1! > score2!) ? 'text-emerald-400' : 'text-zinc-200'}>
                                  {score1}
                                </span>
                                <span className="text-zinc-600">:</span>
                                <span className={isT2Winner || (isLive && score2! > score1!) ? 'text-emerald-400' : 'text-zinc-200'}>
                                  {score2}
                                </span>
                              </div>
                              {match.score?.ht && (
                                <span className="text-[8px] font-mono text-zinc-500 block">
                                  HT {match.score.ht[0]}-{match.score.ht[1]}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 text-[10px] font-mono font-bold text-zinc-500">
                              VS
                            </div>
                          )}
                        </div>

                        {/* Team 2 (Away) */}
                        <div className="col-span-2 flex items-center justify-end gap-2.5 text-right">
                          <div className="min-w-0">
                            <div className="flex items-center justify-end gap-1.5">
                              <span
                                className={`text-xs font-semibold truncate block ${
                                  isT2Winner ? 'text-white font-bold' : 'text-zinc-300'
                                }`}
                              >
                                {match.team2}
                              </span>
                            </div>
                            {rank2 && (
                              <span className="text-[10px] font-mono text-zinc-500">{rank2}</span>
                            )}
                          </div>
                          <TeamBadge teamName={match.team2} size="md" showName={false} />
                        </div>
                      </div>

                      {/* Bottom Quick Tools: H2H, Sofascore Live Stats & Gemini AI Analysis */}
                      <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-1.5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <button
                            id={`btn-h2h-${idx}`}
                            onClick={() => onOpenH2HWithTeams(match.team1, match.team2)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-[10px] uppercase font-bold tracking-wider border border-zinc-800 transition-colors"
                          >
                            <Activity className="w-3 h-3 text-emerald-400" />
                            <span>H2H</span>
                          </button>

                          {onOpenSofascoreStats && (
                            <button
                              id={`btn-sofascore-${idx}`}
                              onClick={() => onOpenSofascoreStats(match)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-400 text-[10px] uppercase font-bold tracking-wider border border-zinc-800 transition-colors"
                            >
                              <BarChart2 className="w-3 h-3 text-emerald-400" />
                              <span>Stats & Notas</span>
                            </button>
                          )}
                        </div>

                        <button
                          id={`btn-ai-analyze-${idx}`}
                          onClick={() => onOpenAiAnalysis(match)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-wider transition-all"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>Análise IA</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
