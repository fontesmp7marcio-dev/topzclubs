import React, { useState } from 'react';
import { StandingItem, LeagueOption, Match } from '../types';
import { TeamCrest } from './TeamCrest';
import { CountryFlag } from './CountryFlag';
import { ArrowLeft, BarChart3, Calendar, Clock, Trophy, ChevronRight, RefreshCw, Star } from 'lucide-react';

interface StandingsTableProps {
  standings: StandingItem[];
  selectedLeague: LeagueOption | null;
  onSelectTeam: (teamName: string, teamId?: number) => void;
  matches?: Match[];
  onSelectMatch?: (match: Match) => void;
  onBackToMatches?: () => void;
  isLoading?: boolean;
  teamForms?: Record<number, string[]>;
  supabaseFavorites?: { id: number; name: string; country?: string; league?: string }[];
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  selectedLeague,
  onSelectTeam,
  matches = [],
  onSelectMatch,
  onBackToMatches,
  isLoading = false,
  teamForms = {},
  supabaseFavorites = [],
}) => {
  const [activeTab, setActiveTab] = useState<'tabela' | 'partidas'>('tabela');
  const [viewType, setViewType] = useState<'all' | 'home' | 'away'>('all');
  const [selectedRoundFilter, setSelectedRoundFilter] = useState<string>('all');

  if (!selectedLeague) {
    return (
      <div className="bg-[#141414] rounded-xl border border-[#222222] p-8 text-center shadow-sm max-w-lg mx-auto my-8 select-none">
        <BarChart3 className="w-12 h-12 text-zinc-500 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-white mb-1">Visualizar Campeonato</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Selecione uma liga ou país na barra lateral para carregar a página oficial com tabela de classificação e partidas.
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'tabela', label: 'Tabela de Classificação' },
    { id: 'partidas', label: `Partidas da Liga (${matches.length})` },
  ];

  // Group matches by round
  const groupedMatches = React.useMemo(() => {
    const groups: { [round: string]: Match[] } = {};
    matches.forEach((m) => {
      const r = m.round || 'Outras';
      if (!groups[r]) groups[r] = [];
      groups[r].push(m);
    });
    return groups;
  }, [matches]);

  const roundsList = Object.keys(groupedMatches);

  const displayedRounds = selectedRoundFilter === 'all' 
    ? roundsList.slice(0, 10) 
    : [selectedRoundFilter];

  const getZoneBorderClass = (rank: number) => {
    if (rank <= 4) return 'border-l-4 border-l-emerald-500';
    if (rank <= 6) return 'border-l-4 border-l-amber-500';
    if (rank <= 12) return 'border-l-4 border-l-blue-500';
    if (rank >= 17) return 'border-l-4 border-l-red-500';
    return 'border-l-4 border-l-transparent';
  };

  return (
    <div className="w-full flex flex-col gap-3 select-none animate-in fade-in duration-200">
      
      {/* 1. TOP NAV BACK BUTTON */}
      {onBackToMatches && (
        <div className="flex items-center justify-between bg-[#141414] border border-[#222222] rounded-xl px-4 py-2.5">
          <button
            onClick={onBackToMatches}
            className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Voltar para Todos os Jogos do Dia</span>
          </button>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
            {selectedLeague.country}
          </span>
        </div>
      )}

      {/* 2. LEAGUE HEADER BANNER */}
      <div className="bg-[#141414] rounded-xl border border-[#222222] p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center p-2 shrink-0 shadow-sm">
              <CountryFlag ccode={selectedLeague.countryCcode || 'BRA'} name={selectedLeague.country} size={32} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight font-sans">
                  {selectedLeague.name}
                </h1>
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                {selectedLeague.country} • Temporada {selectedLeague.season || '2025/2026'}
              </span>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Sincronizando com FotMob...</span>
            </div>
          )}
        </div>

        {/* League Nav Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto border-b border-[#222222] text-xs font-semibold scrollbar-none pt-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-league-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 transition-all relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CONTENT: TABELA OR PARTIDAS */}
      {activeTab === 'tabela' ? (
        <div className="bg-[#141414] rounded-xl border border-[#222222] overflow-hidden shadow-sm">
          
          {/* Table Sub-header: Total / Casa / Fora toggle */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#222222]">
            <span className="text-xs font-bold text-white">Classificação Geral</span>

            <div className="flex items-center gap-1 bg-[#121212] p-0.5 rounded-lg border border-[#262626]">
              <button
                onClick={() => setViewType('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  viewType === 'all'
                    ? 'bg-[#262626] text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Total
              </button>
              <button
                onClick={() => setViewType('home')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  viewType === 'home'
                    ? 'bg-[#262626] text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Casa
              </button>
              <button
                onClick={() => setViewType('away')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  viewType === 'away'
                    ? 'bg-[#262626] text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Fora
              </button>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead>
                <tr className="bg-[#121212] border-b border-[#222222] text-[11px] text-zinc-400 font-semibold">
                  <th className="py-2.5 pl-4 pr-1 text-center w-8">#</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-2 text-center">J</th>
                  <th className="py-2.5 px-2 text-center">V</th>
                  <th className="py-2.5 px-2 text-center">E</th>
                  <th className="py-2.5 px-2 text-center">D</th>
                  <th className="py-2.5 px-2 text-center hidden sm:table-cell">+/-</th>
                  <th className="py-2.5 px-2 text-center">SG</th>
                  <th className="py-2.5 px-2 text-center font-bold text-white">P</th>
                  <th className="py-2.5 px-3 text-center hidden md:table-cell">Forma</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1e1e1e]">
                {standings.map((item) => {
                  const zoneClass = getZoneBorderClass(item.rank);
                  const played = viewType === 'home' ? item.home?.played ?? item.played : viewType === 'away' ? item.away?.played ?? item.played : item.played;
                  const won = viewType === 'home' ? item.home?.won ?? item.won : viewType === 'away' ? item.away?.won ?? item.won : item.won;
                  const drawn = viewType === 'home' ? item.home?.drawn ?? item.drawn : viewType === 'away' ? item.away?.drawn ?? item.drawn : item.drawn;
                  const lost = viewType === 'home' ? item.home?.lost ?? item.lost : viewType === 'away' ? item.away?.lost ?? item.lost : item.lost;
                  const gf = viewType === 'home' ? item.home?.goalsFor ?? item.goalsFor : viewType === 'away' ? item.away?.goalsFor ?? item.goalsFor : item.goalsFor;
                  const ga = viewType === 'home' ? item.home?.goalsAgainst ?? item.goalsAgainst : viewType === 'away' ? item.away?.goalsAgainst ?? item.goalsAgainst : item.goalsAgainst;
                  const gd = gf - ga;
                  const pts = viewType === 'home' ? item.home?.points ?? item.points : viewType === 'away' ? item.away?.points ?? item.points : item.points;

                  return (
                    <tr
                      key={item.team}
                      id={`standing-row-${item.rank}`}
                      onClick={() => onSelectTeam(item.team, item.teamId)}
                      className={`hover:bg-[#1c1c1c] transition-colors cursor-pointer group ${zoneClass}`}
                    >
                      <td className="py-2.5 pl-4 pr-1 text-center font-bold text-zinc-400 text-xs">
                        {item.rank}
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <TeamCrest teamName={item.team} teamId={item.teamId} size={20} />
                          <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {item.team}
                          </span>
                        </div>
                      </td>

                      <td className="py-2.5 px-2 text-center text-zinc-400 font-medium">{played}</td>
                      <td className="py-2.5 px-2 text-center text-zinc-300 font-medium">{won}</td>
                      <td className="py-2.5 px-2 text-center text-zinc-300 font-medium">{drawn}</td>
                      <td className="py-2.5 px-2 text-center text-zinc-300 font-medium">{lost}</td>
                      <td className="py-2.5 px-2 text-center text-zinc-400 hidden sm:table-cell">{gf}-{ga}</td>
                      <td className={`py-2.5 px-2 text-center font-medium ${gd > 0 ? 'text-emerald-400' : gd < 0 ? 'text-rose-400' : 'text-zinc-400'}`}>
                        {gd > 0 ? `+${gd}` : gd}
                      </td>
                      <td className="py-2.5 px-2 text-center font-black text-white text-sm">{pts}</td>

                      <td className="py-2.5 px-3 text-center hidden md:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          {(item.form || ['W', 'D', 'W', 'W', 'D']).map((f, i) => {
                            const isWin = f === 'W';
                            const isDraw = f === 'D';
                            return (
                              <span
                                key={i}
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold text-black ${
                                  isWin ? 'bg-emerald-500' : isDraw ? 'bg-zinc-400' : 'bg-red-500 text-white'
                                }`}
                              >
                                {isWin ? 'V' : isDraw ? 'E' : 'D'}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Zone Legend Footer */}
          <div className="px-4 py-3 bg-[#121212] border-t border-[#222222] flex flex-wrap items-center gap-4 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
              <span>Fase de grupos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
              <span>Qualificação</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span>
              <span>Competições continentais</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>
              <span>Rebaixamento</span>
            </div>
          </div>
        </div>
      ) : (
        /* PARTIDAS DA LIGA */
        <div className="flex flex-col gap-4">
          {/* Round Filter */}
          {roundsList.length > 1 && (
            <div className="bg-[#141414] border border-[#222222] rounded-xl p-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setSelectedRoundFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedRoundFilter === 'all'
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#1e1e1e] text-zinc-400 hover:text-white'
                }`}
              >
                Todas as Rodadas
              </button>
              {roundsList.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRoundFilter(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedRoundFilter === r
                      ? 'bg-emerald-500 text-black'
                      : 'bg-[#1e1e1e] text-zinc-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Matches List by Round */}
          {displayedRounds.map((roundName) => {
            const rMatches = groupedMatches[roundName] || [];
            return (
              <div key={roundName} className="bg-[#141414] border border-[#222222] rounded-xl overflow-hidden shadow-sm">
                <div className="px-4 py-2.5 bg-[#181818] border-b border-[#222222] flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{roundName}</span>
                  <span className="text-[10px] text-zinc-400">{rMatches.length} jogos</span>
                </div>

                <div className="divide-y divide-[#1e1e1e]">
                  {rMatches.map((m) => {
                    const hasScores = m.score?.ft;
                    const score1 = hasScores ? m.score!.ft![0] : '-';
                    const score2 = hasScores ? m.score!.ft![1] : '-';
                    const isFinished = m.status === 'finished';
                    const isLive = m.status === 'live';

                    return (
                      <div
                        key={m.id}
                        className="p-3 sm:p-4 hover:bg-[#1a1a1a] transition-colors flex items-center justify-between gap-3"
                      >
                        {/* Match Status / Time */}
                        <div className="w-16 sm:w-20 text-center shrink-0">
                          {isLive ? (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-500 text-white animate-pulse">
                              {m.liveMinute || 'AO VIVO'}
                            </span>
                          ) : isFinished ? (
                            <span className="text-[11px] font-bold text-zinc-400">
                              Encerrado
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-400">
                              {m.time || '16:00'}
                            </span>
                          )}
                          <span className="block text-[9px] text-zinc-500 mt-0.5">
                            {m.date ? m.date.split('-').reverse().slice(0, 2).join('/') : ''}
                          </span>
                        </div>

                        {/* Teams & Score */}
                        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                          {/* Team 1 */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTeam(m.team1, m.team1Id);
                            }}
                            className="flex items-center justify-between gap-2 hover:text-emerald-400 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <TeamCrest teamName={m.team1} teamId={m.team1Id} size={20} />
                              <span className="text-xs sm:text-sm font-bold text-white truncate">
                                {m.team1}
                              </span>
                              {m.team1Id && teamForms[m.team1Id] && teamForms[m.team1Id].length > 0 && (
                                <div className="flex items-center gap-0.5 ml-1 shrink-0" title="Tendência recente (últimos 3 jogos)">
                                  {teamForms[m.team1Id].map((emoji, idx) => (
                                    <span key={idx} className="text-[10px] leading-none drop-shadow-md">{emoji}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm font-black text-white px-1.5">
                              {score1}
                            </span>
                          </div>

                          {/* Team 2 */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTeam(m.team2, m.team2Id);
                            }}
                            className="flex items-center justify-between gap-2 hover:text-emerald-400 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <TeamCrest teamName={m.team2} teamId={m.team2Id} size={20} />
                              <span className="text-xs sm:text-sm font-bold text-white truncate">
                                {m.team2}
                              </span>
                              {m.team2Id && teamForms[m.team2Id] && teamForms[m.team2Id].length > 0 && (
                                <div className="flex items-center gap-0.5 ml-1 shrink-0" title="Tendência recente (últimos 3 jogos)">
                                  {teamForms[m.team2Id].map((emoji, idx) => (
                                    <span key={idx} className="text-[10px] leading-none drop-shadow-md">{emoji}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm font-black text-white px-1.5">
                              {score2}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
