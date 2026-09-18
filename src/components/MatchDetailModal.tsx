import React, { useState } from 'react';
import { Match, SofascoreMatchDetails } from '../types';
import { TeamCrest } from './TeamCrest';
import { ArrowLeft, Plus, Check, Trophy, Shield, Activity, MapPin, Calendar, Clock, BarChart3, Users, PlaySquare } from 'lucide-react';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
  onSelectTeam: (teamName: string, teamId?: number) => void;
  details?: SofascoreMatchDetails | null;
  isLoading?: boolean;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  onSelectTeam,
  details,
  isLoading = false,
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'lances' | 'escalacao' | 'stats' | 'h2h'>('geral');
  const [isFollowing, setIsFollowing] = useState(false);

  if (!match) return null;

  const isStarted = match.status === 'live' || match.status === 'finished';
  const score1 = match.score?.ft ? match.score.ft[0] : (isStarted ? 0 : '-');
  const score2 = match.score?.ft ? match.score.ft[1] : (isStarted ? 0 : '-');
  const statusLabel = match.status === 'live' ? 'Ao vivo' : match.status === 'finished' ? 'Encerrado' : 'Agendado';

  const tabs = [
    { id: 'geral', label: 'Visão geral' },
    { id: 'lances', label: 'Lances' },
    { id: 'escalacao', label: 'Escalação' },
    { id: 'stats', label: 'Estatísticas' },
    { id: 'h2h', label: 'Confronto direto' },
  ];

  // Curated match events matching Screenshot 8
  const events = details?.events && details.events.length > 0 ? details.events : [
    { minute: 4, type: 'goal', team: 'team2', player: 'J. Brandt', detail: 'Gol (0-1)' },
    { minute: 22, type: 'yellow', team: 'team1', player: 'M. Meyer', detail: 'Falta tática' },
    { minute: 33, type: 'goal', team: 'team2', player: 'M. Wrede', detail: 'Gol Contra (0-2)' },
    { minute: 36, type: 'goal', team: 'team2', player: 'M. Svensson', detail: 'Gol (0-3)' },
    { minute: 41, type: 'goal', team: 'team2', player: 'G. Inácio', detail: 'Gol (0-4)' },
    { minute: 45, type: 'divider', team: 'both', player: 'Intervalo', detail: 'INT 0 - 4' },
    { minute: 52, type: 'sub', team: 'team1', player: 'Entra: K. Schmidt', detail: 'Sai: T. Becker' },
    { minute: 59, type: 'goal', team: 'team2', player: 'F. Silva', detail: 'Gol (0-5)' },
    { minute: 70, type: 'yellow', team: 'team2', player: 'E. Can', detail: 'Reclamação' },
    { minute: 90, type: 'divider', team: 'both', player: 'Fim de Jogo', detail: 'FJ 0 - 5' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        id="modal-fotmob-match-detail"
        className="bg-[#121212] border border-[#262626] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-auto select-none"
      >
        {/* 1. TOP HEADER (Screenshot 5) */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#242424]">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Jogos</span>
          </button>

          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-none">
              {details?.tournament || match.round || 'Copa do Brasil'}
            </span>
          </div>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              isFollowing
                ? 'bg-emerald-500 text-black'
                : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            {isFollowing ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Seguindo</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Seguir</span>
              </>
            )}
          </button>
        </div>

        {/* 2. MATCH METADATA & SCOREBOARD (Screenshot 5) */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-[#181818] to-[#121212] border-b border-[#222222]">
          
          <div className="text-center text-[11px] text-zinc-400 mb-4 flex items-center justify-center gap-2">
            <span>ter., 1 de setembro, {match.time || '15:45'}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-500" />
              {match.stadium || 'Estádio Principal'}
            </span>
          </div>

          {/* Main Scoreboard with Team Badges */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8 max-w-lg mx-auto">
            
            {/* Home Team */}
            <div
              onClick={() => onSelectTeam(match.team1, match.team1Id)}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <TeamCrest
                teamName={match.team1}
                teamId={match.team1Id}
                size={54}
                className="mb-2 group-hover:scale-105 transition-transform"
              />
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {match.team1}
              </span>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 text-3xl sm:text-4xl font-black text-white tracking-tight">
                <span>{score1}</span>
                <span className="text-zinc-600">-</span>
                <span className="text-emerald-400">{score2}</span>
              </div>
              <span className="mt-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                {statusLabel}
              </span>
            </div>

            {/* Away Team */}
            <div
              onClick={() => onSelectTeam(match.team2, match.team2Id)}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <TeamCrest
                teamName={match.team2}
                teamId={match.team2Id}
                size={54}
                className="mb-2 group-hover:scale-105 transition-transform"
              />
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {match.team2}
              </span>
            </div>

          </div>

          {/* Scorers Sublist or Match Status Info */}
          <div className="mt-4 pt-3 border-t border-zinc-800/60 max-w-md mx-auto text-center text-xs text-zinc-300">
            {isStarted ? (
              <>
                <span className="text-zinc-500 font-medium mr-1.5">Confronto:</span>
                <span>{match.team1} {score1} x {score2} {match.team2}</span>
              </>
            ) : (
              <span className="text-zinc-400">
                Horário da partida: <strong className="text-emerald-400">{match.time || '16:00'}</strong> ({match.date || 'Hoje'})
              </span>
            )}
          </div>
        </div>

        {/* 3. TABS (Screenshot 5 & 8) */}
        <div className="flex items-center justify-around px-4 border-b border-[#222222] bg-[#161616] text-xs font-semibold overflow-x-auto scrollbar-none">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-400 text-white font-bold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 4. TAB CONTENTS */}
        <div className="p-4 sm:p-6 max-h-[500px] overflow-y-auto">
          
          {/* TAB 1: VISÃO GERAL / LANCES (Timeline Events matching Screenshot 8) */}
          {(activeTab === 'geral' || activeTab === 'lances') && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Principais Lances da Partida
              </h3>

              <div className="relative border-l border-zinc-800 ml-4 pl-6 space-y-4">
                {events.map((ev, idx) => {
                  if (ev.type === 'divider') {
                    return (
                      <div
                        key={idx}
                        className="py-1 px-3 bg-[#1e1e1e] rounded-full text-[11px] font-bold text-zinc-300 inline-block border border-zinc-700/60 -ml-10 my-2"
                      >
                        {ev.detail}
                      </div>
                    );
                  }

                  const isGoal = ev.type === 'goal';
                  const isCard = ev.type === 'yellow' || ev.type === 'red';
                  const isSub = ev.type === 'sub';

                  return (
                    <div key={idx} className="relative flex items-center justify-between text-xs group">
                      {/* Left circular minute marker */}
                      <span className="absolute -left-[31px] w-6 h-6 rounded-full bg-[#1e1e1e] border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                        {ev.minute}'
                      </span>

                      <div className="flex items-center gap-2">
                        {isGoal && <span className="text-sm">⚽</span>}
                        {isCard && <span className={ev.type === 'yellow' ? 'text-amber-400' : 'text-red-500'}>🟨</span>}
                        {isSub && <span className="text-emerald-400 text-xs">🔄</span>}

                        <span className="font-bold text-white">{ev.player}</span>
                        <span className="text-[11px] text-zinc-400 font-normal">({ev.detail})</span>
                      </div>

                      <span className="text-[11px] text-zinc-500 font-medium">
                        {ev.team === 'team1' ? match.team1 : match.team2}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ESTATÍSTICAS */}
          {activeTab === 'stats' && (
            <div className="flex flex-col gap-3">
              {[
                { label: 'Posse de Bola', v1: '32%', v2: '68%', p1: 32, p2: 68 },
                { label: 'Gols Esperados (xG)', v1: '0.24', v2: '3.82', p1: 6, p2: 94 },
                { label: 'Total de Finalizações', v1: '4', v2: '21', p1: 16, p2: 84 },
                { label: 'Chutes a Gol', v1: '1', v2: '11', p1: 9, p2: 91 },
                { label: 'Escanteios', v1: '2', v2: '9', p1: 18, p2: 82 },
                { label: 'Faltas Cometidas', v1: '14', v2: '6', p1: 70, p2: 30 },
                { label: 'Precisão nos Passes', v1: '71%', v2: '89%', p1: 71, p2: 89 },
              ].map((stat, i) => (
                <div key={i} className="bg-[#181818] p-3 rounded-lg border border-[#242424]">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-white font-bold">{stat.v1}</span>
                    <span className="text-zinc-400 text-[11px]">{stat.label}</span>
                    <span className="text-emerald-400 font-bold">{stat.v2}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 flex overflow-hidden">
                    <div style={{ width: `${stat.p1}%` }} className="bg-zinc-400 h-full"></div>
                    <div style={{ width: `${stat.p2}%` }} className="bg-emerald-500 h-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ESCALAÇÃO */}
          {activeTab === 'escalacao' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#181818] p-3 rounded-xl border border-[#262626]">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <TeamCrest teamName={match.team1} teamId={match.team1Id} size={16} />
                  <span>{match.team1}</span>
                </h4>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  {['1 Schmidt (G)', '2 Weber (LD)', '3 Fischer (Z)', '4 Meyer (Z)', '5 Becker (LE)', '8 Wagner (V)', '10 Hoffmann (M)', '7 Koch (A)', '9 Richter (A)'].map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-zinc-800/40">
                      <span>{p}</span>
                      <span className="text-[10px] text-zinc-500">6.4</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#181818] p-3 rounded-xl border border-[#262626]">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <TeamCrest teamName={match.team2} teamId={match.team2Id} size={16} />
                  <span>{match.team2}</span>
                </h4>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  {['1 Kobel (G)', '26 Ryerson (LD)', '4 Schlotterbeck (Z)', '3 Anton (Z)', '5 Bensebaini (LE)', '23 Can (V)', '20 Sabitzer (M)', '10 Brandt (M)', '14 Beier (A)', '9 Guirassy (A)'].map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-zinc-800/40">
                      <span>{p}</span>
                      <span className="text-[10px] font-bold text-emerald-400">8.2</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONFRONTO DIRETO */}
          {activeTab === 'h2h' && (
            <div className="text-center py-6 text-xs text-zinc-400">
              <p className="mb-2">Histórico recente de confrontos diretos entre as equipes</p>
              <div className="flex justify-center gap-6 my-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">0</span>
                  <span className="text-[10px] text-zinc-500">Vitórias {match.team1}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-zinc-400">1</span>
                  <span className="text-[10px] text-zinc-500">Empates</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-emerald-400">4</span>
                  <span className="text-[10px] text-zinc-500">Vitórias {match.team2}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
