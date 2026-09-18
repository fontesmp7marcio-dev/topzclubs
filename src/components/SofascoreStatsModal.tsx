import React, { useState, useEffect } from 'react';
import { Match, StandingItem, SofascoreMatchDetails } from '../types';
import { SOFASCORE_MATCH_DETAILS } from '../data/sofascoreData';
import { TeamBadge } from './TeamBadge';
import { X, Activity, Shield, Award, Sparkles, MapPin, User, BarChart2, RefreshCw } from 'lucide-react';

interface SofascoreStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  standings?: StandingItem[];
}

export const SofascoreStatsModal: React.FC<SofascoreStatsModalProps> = ({
  isOpen,
  onClose,
  match,
}) => {
  const [liveDetails, setLiveDetails] = useState<SofascoreMatchDetails | null>(null);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !match) return;

    if (match.fotmobPageUrl) {
      setIsLoadingLive(true);
      fetch(`/api/fotmob/match-details?url=${encodeURIComponent(match.fotmobPageUrl)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.possession) {
            setLiveDetails(data);
          }
        })
        .catch(err => {
          console.warn('Could not fetch live FotMob stats:', err);
        })
        .finally(() => {
          setIsLoadingLive(false);
        });
    } else {
      setLiveDetails(null);
    }
  }, [isOpen, match]);

  if (!isOpen || !match) return null;

  // Retrieve match details from FotMob live crawler or Sofascore database or fallback
  const details: SofascoreMatchDetails = liveDetails || (match.id && SOFASCORE_MATCH_DETAILS[match.id]) || {
    matchId: match.id || 'custom',
    tournament: match.round || 'Partida',
    venue: match.stadium || 'Estádio Principal',
    status: match.status === 'live' ? `${match.liveMinute || '70\''} - Ao Vivo` : 'Encerrado',
    possession: { team1: 54, team2: 46 },
    expectedGoals: { team1: 1.68, team2: 1.12 },
    shotsTotal: { team1: 13, team2: 9 },
    shotsOnTarget: { team1: 5, team2: 3 },
    shotsOffTarget: { team1: 5, team2: 4 },
    blockedShots: { team1: 3, team2: 2 },
    corners: { team1: 6, team2: 4 },
    fouls: { team1: 13, team2: 12 },
    yellowCards: { team1: 2, team2: 2 },
    redCards: { team1: 0, team2: 0 },
    bigChances: { team1: 3, team2: 1 },
    passesAccuracy: { team1: 84, team2: 79 },
    offsides: { team1: 2, team2: 1 },
    team1Formation: '4-3-3',
    team2Formation: '4-2-3-1',
    lineupTeam1: [
      { name: 'Goleiro', position: 'G', rating: 7.1, number: 1 },
      { name: 'Lateral Dir.', position: 'LD', rating: 6.9, number: 2 },
      { name: 'Zagueiro 1', position: 'Z', rating: 7.3, number: 3 },
      { name: 'Zagueiro 2', position: 'Z', rating: 7.0, number: 4 },
      { name: 'Lateral Esq.', position: 'LE', rating: 7.2, number: 6 },
      { name: 'Volante', position: 'V', rating: 7.5, number: 5 },
      { name: 'Meio-Campo', position: 'M', rating: 8.2, number: 8, isMVP: true },
      { name: 'Armador', position: 'M', rating: 7.8, number: 10 },
      { name: 'Ponta Dir.', position: 'A', rating: 7.4, number: 7 },
      { name: 'Centroavante', position: 'A', rating: 7.9, number: 9 },
      { name: 'Ponta Esq.', position: 'A', rating: 7.3, number: 11 },
    ],
    lineupTeam2: [
      { name: 'Goleiro', position: 'G', rating: 6.8, number: 1 },
      { name: 'Lateral Dir.', position: 'LD', rating: 6.5, number: 2 },
      { name: 'Zagueiro 1', position: 'Z', rating: 6.7, number: 3 },
      { name: 'Zagueiro 2', position: 'Z', rating: 6.6, number: 4 },
      { name: 'Lateral Esq.', position: 'LE', rating: 6.4, number: 6 },
      { name: 'Volante 1', position: 'V', rating: 6.8, number: 5 },
      { name: 'Volante 2', position: 'V', rating: 6.7, number: 8 },
      { name: 'Meia Central', position: 'M', rating: 7.2, number: 10 },
      { name: 'Ponta Dir.', position: 'A', rating: 6.6, number: 7 },
      { name: 'Centroavante', position: 'A', rating: 7.0, number: 9 },
      { name: 'Ponta Esq.', position: 'A', rating: 6.5, number: 11 },
    ],
    events: [],
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8.0) return 'bg-emerald-500 text-black font-black';
    if (rating >= 7.0) return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    if (rating >= 6.0) return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    return 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#111111] border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-['Plus_Jakarta_Sans']"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-[#0c0c0c]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white font-['Outfit']">
                  {liveDetails ? 'Estatísticas FotMob / Opta Live' : 'Estatísticas da Partida'}
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                  {isLoadingLive ? (
                    <>
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                      Raspando FotMob...
                    </>
                  ) : liveDetails ? (
                    '🟢 FotMob Opta Real-Time'
                  ) : (
                    'DevNeonix API'
                  )}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {match.round} • {match.date}
              </p>
            </div>
          </div>
          <button
            id="btn-close-sofascore-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          
          {/* Match Scoreboard Header */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center gap-3">
            <div className="grid grid-cols-3 items-center w-full text-center">
              
              {/* Team 1 */}
              <div className="flex flex-col items-center gap-1.5">
                <TeamBadge teamName={match.team1} size="md" showName={false} />
                <span className="font-bold text-xs sm:text-sm text-zinc-100">{match.team1}</span>
                <span className="text-[10px] text-zinc-500 font-mono">Formação: {details.team1Formation}</span>
              </div>

              {/* Score & Live Tag */}
              <div className="flex flex-col items-center">
                {match.status === 'live' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono animate-pulse border border-emerald-500/30 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {match.liveMinute || 'AO VIVO'}
                  </span>
                ) : (
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-mono mb-1">
                    Encerrado
                  </span>
                )}

                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-wider">
                  {match.score?.ft ? `${match.score.ft[0]} - ${match.score.ft[1]}` : 'VS'}
                </div>

                {match.score?.ht && (
                  <span className="text-[10px] text-zinc-500 font-mono">
                    (1ºT: {match.score.ht[0]} - {match.score.ht[1]})
                  </span>
                )}
              </div>

              {/* Team 2 */}
              <div className="flex flex-col items-center gap-1.5">
                <TeamBadge teamName={match.team2} size="md" showName={false} />
                <span className="font-bold text-xs sm:text-sm text-zinc-100">{match.team2}</span>
                <span className="text-[10px] text-zinc-500 font-mono">Formação: {details.team2Formation}</span>
              </div>
            </div>

            {details.venue && (
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80 w-full justify-center font-mono">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{details.venue}</span>
              </div>
            )}
          </div>

          {/* Key Stat Gauges: xG & Possession */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Possession */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400 font-mono">{details.possession.team1}%</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Posse de Bola</span>
                <span className="font-bold text-zinc-300 font-mono">{details.possession.team2}%</span>
              </div>
              <div className="h-2.5 w-full bg-[#111111] rounded-full overflow-hidden flex border border-zinc-800">
                <div style={{ width: `${details.possession.team1}%` }} className="bg-emerald-500 h-full rounded-l-full"></div>
                <div style={{ width: `${details.possession.team2}%` }} className="bg-zinc-700 h-full rounded-r-full"></div>
              </div>
            </div>

            {/* Expected Goals (xG) */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400 font-mono">{details.expectedGoals.team1.toFixed(2)}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Gols Esperados (xG)</span>
                <span className="font-bold text-zinc-300 font-mono">{details.expectedGoals.team2.toFixed(2)}</span>
              </div>
              <div className="h-2.5 w-full bg-[#111111] rounded-full overflow-hidden flex border border-zinc-800">
                <div
                  style={{
                    width: `${
                      (details.expectedGoals.team1 / (details.expectedGoals.team1 + details.expectedGoals.team2 || 1)) * 100
                    }%`,
                  }}
                  className="bg-emerald-500 h-full rounded-l-full"
                ></div>
                <div
                  style={{
                    width: `${
                      (details.expectedGoals.team2 / (details.expectedGoals.team1 + details.expectedGoals.team2 || 1)) * 100
                    }%`,
                  }}
                  className="bg-zinc-700 h-full rounded-r-full"
                ></div>
              </div>
            </div>
          </div>

          {/* Detailed Match Metrics List */}
          <div className="bg-zinc-950 rounded-xl border border-zinc-800 divide-y divide-zinc-800/80 text-xs">
            
            {/* Total Shots */}
            <div className="flex items-center justify-between p-2.5 px-4">
              <span className="font-bold font-mono text-zinc-100">{details.shotsTotal.team1}</span>
              <span className="text-zinc-400 text-[11px] font-medium">Finalizações Totais</span>
              <span className="font-bold font-mono text-zinc-100">{details.shotsTotal.team2}</span>
            </div>

            {/* Shots on Target */}
            <div className="flex items-center justify-between p-2.5 px-4 bg-[#111111]/30">
              <span className="font-bold font-mono text-emerald-400">{details.shotsOnTarget.team1}</span>
              <span className="text-zinc-300 text-[11px] font-semibold">Chutes no Alvo</span>
              <span className="font-bold font-mono text-emerald-400">{details.shotsOnTarget.team2}</span>
            </div>

            {/* Big Chances */}
            <div className="flex items-center justify-between p-2.5 px-4">
              <span className="font-bold font-mono text-zinc-100">{details.bigChances.team1}</span>
              <span className="text-zinc-400 text-[11px] font-medium">Grandes Chances</span>
              <span className="font-bold font-mono text-zinc-100">{details.bigChances.team2}</span>
            </div>

            {/* Accurate Passes % */}
            <div className="flex items-center justify-between p-2.5 px-4 bg-[#111111]/30">
              <span className="font-bold font-mono text-zinc-100">{details.passesAccuracy.team1}%</span>
              <span className="text-zinc-400 text-[11px] font-medium">Precisão de Passes</span>
              <span className="font-bold font-mono text-zinc-100">{details.passesAccuracy.team2}%</span>
            </div>

            {/* Corners */}
            <div className="flex items-center justify-between p-2.5 px-4">
              <span className="font-bold font-mono text-zinc-100">{details.corners.team1}</span>
              <span className="text-zinc-400 text-[11px] font-medium">Escanteios</span>
              <span className="font-bold font-mono text-zinc-100">{details.corners.team2}</span>
            </div>

            {/* Fouls */}
            <div className="flex items-center justify-between p-2.5 px-4 bg-[#111111]/30">
              <span className="font-bold font-mono text-zinc-100">{details.fouls.team1}</span>
              <span className="text-zinc-400 text-[11px] font-medium">Faltas Cometidas</span>
              <span className="font-bold font-mono text-zinc-100">{details.fouls.team2}</span>
            </div>

            {/* Yellow Cards */}
            <div className="flex items-center justify-between p-2.5 px-4">
              <span className="font-bold font-mono text-amber-400">{details.yellowCards.team1}</span>
              <span className="text-zinc-400 text-[11px] font-medium">Cartões Amarelos</span>
              <span className="font-bold font-mono text-amber-400">{details.yellowCards.team2}</span>
            </div>

            {/* Red Cards */}
            {details.redCards && (details.redCards.team1 > 0 || details.redCards.team2 > 0) ? (
              <div className="flex items-center justify-between p-2.5 px-4 bg-rose-500/10">
                <span className="font-bold font-mono text-rose-400">{details.redCards.team1}</span>
                <span className="text-rose-300 text-[11px] font-bold">Cartões Vermelhos</span>
                <span className="font-bold font-mono text-rose-400">{details.redCards.team2}</span>
              </div>
            ) : null}
          </div>

          {/* Lineups & Sofascore Player Ratings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold tracking-widest text-zinc-400 font-mono">
                Escalações & Notas Sofascore
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                Escala 1.0 a 10.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Lineup Team 1 */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="font-bold text-xs text-white">{match.team1}</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{details.team1Formation}</span>
                </div>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {details.lineupTeam1.map((player, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-[#111111] hover:bg-zinc-800/80 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-[10px] font-mono text-zinc-500">{player.number}</span>
                        <span className="text-zinc-200 font-medium">{player.name}</span>
                        {player.isMVP && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> MVP
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-zinc-500 uppercase">{player.position}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${getRatingColor(player.rating)}`}>
                          {player.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lineup Team 2 */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="font-bold text-xs text-white">{match.team2}</span>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold">{details.team2Formation}</span>
                </div>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {details.lineupTeam2.map((player, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-[#111111] hover:bg-zinc-800/80 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-[10px] font-mono text-zinc-500">{player.number}</span>
                        <span className="text-zinc-200 font-medium">{player.name}</span>
                        {player.isMVP && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> MVP
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-zinc-500 uppercase">{player.position}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${getRatingColor(player.rating)}`}>
                          {player.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Events Timeline if any */}
          {details.events && details.events.length > 0 && (
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-widest text-zinc-400 font-mono block">
                Linha do Tempo de Eventos
              </span>
              <div className="space-y-1.5">
                {details.events.map((evt, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <span className="font-mono font-bold text-emerald-400 text-[11px] w-8">{evt.minute}'</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {evt.type === 'goal' ? '⚽ Gol' : evt.type === 'yellow' ? '🟨 Cartão' : '🟥 Vermelho'}
                    </span>
                    <span className="font-semibold text-zinc-100">{evt.player}</span>
                    {evt.detail && <span className="text-zinc-500">({evt.detail})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
