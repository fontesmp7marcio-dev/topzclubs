import React, { useState, useMemo } from 'react';
import { Match, StandingItem } from '../types';
import { calculateHeadToHead } from '../utils/standings';
import { TeamBadge } from './TeamBadge';
import { X, Trophy, Swords, Calendar, Activity, Zap, Percent } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeadToHeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  team1: string;
  team2: string;
  matches: Match[];
  standings: StandingItem[];
  allTeams: string[];
}

export const HeadToHeadModal: React.FC<HeadToHeadModalProps> = ({
  isOpen,
  onClose,
  team1: initialTeam1,
  team2: initialTeam2,
  matches,
  standings,
  allTeams,
}) => {
  const [selectedTeam1, setSelectedTeam1] = useState(initialTeam1 || allTeams[0] || '');
  const [selectedTeam2, setSelectedTeam2] = useState(initialTeam2 || allTeams[1] || '');

  // Keep in sync with props when modal opens
  React.useEffect(() => {
    if (initialTeam1) setSelectedTeam1(initialTeam1);
    if (initialTeam2) setSelectedTeam2(initialTeam2);
  }, [initialTeam1, initialTeam2]);

  const h2h = useMemo(() => {
    return calculateHeadToHead(selectedTeam1, selectedTeam2, matches);
  }, [selectedTeam1, selectedTeam2, matches]);

  const statsTeam1 = standings.find((s) => s.team === selectedTeam1);
  const statsTeam2 = standings.find((s) => s.team === selectedTeam2);

  // Compute calculated win probabilities based on form + points + h2h
  const simulation = useMemo(() => {
    const pts1 = statsTeam1?.points || 10;
    const pts2 = statsTeam2?.points || 10;
    const h2hWeight1 = h2h.team1Wins * 2;
    const h2hWeight2 = h2h.team2Wins * 2;
    const homeBonus = 3;

    const rawScore1 = pts1 + h2hWeight1 + homeBonus;
    const rawScore2 = pts2 + h2hWeight2;
    const drawScore = Math.max(10, 30 - Math.abs(pts1 - pts2));

    const total = rawScore1 + rawScore2 + drawScore;
    const prob1 = Math.round((rawScore1 / total) * 100);
    const probDraw = Math.round((drawScore / total) * 100);
    const prob2 = 100 - prob1 - probDraw;

    let favorite = 'Equilibrado';
    if (prob1 > prob2 + 10) favorite = selectedTeam1;
    else if (prob2 > prob1 + 10) favorite = selectedTeam2;

    return { prob1, probDraw, prob2, favorite };
  }, [statsTeam1, statsTeam2, h2h, selectedTeam1, selectedTeam2]);

  if (!isOpen) return null;

  const handleSimulateWinner = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#111111] border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0c0c0c]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Outfit']">
                Confronto Direto (Head-to-Head)
              </h2>
              <p className="text-[11px] text-zinc-400">
                Histórico direto e probabilidades estatísticas da temporada
              </p>
            </div>
          </div>
          <button
            id="btn-close-h2h-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Team Selectors Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block mb-1.5">
                Mandante / Clube 1
              </label>
              <select
                id="select-h2h-team1"
                value={selectedTeam1}
                onChange={(e) => setSelectedTeam1(e.target.value)}
                className="w-full bg-[#111111] text-zinc-100 text-xs font-semibold px-3 py-2 rounded-lg border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {allTeams.map((t) => (
                  <option key={`t1-${t}`} value={t} disabled={t === selectedTeam2} className="bg-[#111111]">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block mb-1.5">
                Visitante / Clube 2
              </label>
              <select
                id="select-h2h-team2"
                value={selectedTeam2}
                onChange={(e) => setSelectedTeam2(e.target.value)}
                className="w-full bg-[#111111] text-zinc-100 text-xs font-semibold px-3 py-2 rounded-lg border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {allTeams.map((t) => (
                  <option key={`t2-${t}`} value={t} disabled={t === selectedTeam1} className="bg-[#111111]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Teams Clash Arena Header */}
          <div className="grid grid-cols-3 items-center text-center p-5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex flex-col items-center gap-2">
              <TeamBadge teamName={selectedTeam1} size="lg" showName={false} />
              <span className="font-bold text-sm text-zinc-100">{selectedTeam1}</span>
              <span className="text-xs text-emerald-400 font-mono font-medium">
                #{statsTeam1?.rank || '-'} ({statsTeam1?.points || 0} pts)
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-xl font-black text-zinc-600 font-mono">VS</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mt-1">
                {h2h.totalMatches} {h2h.totalMatches === 1 ? 'jogo direto' : 'jogos diretos'}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <TeamBadge teamName={selectedTeam2} size="lg" showName={false} />
              <span className="font-bold text-sm text-zinc-100">{selectedTeam2}</span>
              <span className="text-xs text-emerald-400 font-mono font-medium">
                #{statsTeam2?.rank || '-'} ({statsTeam2?.points || 0} pts)
              </span>
            </div>
          </div>

          {/* Probability Bar (Simulação) */}
          <div className="space-y-2 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                <Percent className="w-3.5 h-3.5" />
                Probabilidade Estatística
              </span>
              <button
                onClick={handleSimulateWinner}
                className="text-[10px] uppercase tracking-widest text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-bold"
              >
                <Zap className="w-3 h-3" />
                Simular
              </button>
            </div>

            <div className="h-4 w-full bg-[#111111] rounded-full overflow-hidden flex border border-zinc-800 p-0.5">
              <div
                style={{ width: `${simulation.prob1}%` }}
                className="bg-emerald-500 h-full rounded-l-full flex items-center justify-center text-[9px] font-mono font-bold text-black"
                title={`${selectedTeam1}: ${simulation.prob1}%`}
              >
                {simulation.prob1 > 12 && `${simulation.prob1}%`}
              </div>
              <div
                style={{ width: `${simulation.probDraw}%` }}
                className="bg-zinc-600 h-full flex items-center justify-center text-[9px] font-mono font-bold text-zinc-200"
                title={`Empate: ${simulation.probDraw}%`}
              >
                {simulation.probDraw > 12 && `${simulation.probDraw}%`}
              </div>
              <div
                style={{ width: `${simulation.prob2}%` }}
                className="bg-zinc-800 h-full rounded-r-full flex items-center justify-center text-[9px] font-mono font-bold text-zinc-300"
                title={`${selectedTeam2}: ${simulation.prob2}%`}
              >
                {simulation.prob2 > 12 && `${simulation.prob2}%`}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1 pt-1 font-mono">
              <span className="text-emerald-400 font-semibold">{selectedTeam1} ({simulation.prob1}%)</span>
              <span className="text-zinc-400 font-semibold">Empate ({simulation.probDraw}%)</span>
              <span className="text-zinc-300 font-semibold">{selectedTeam2} ({simulation.prob2}%)</span>
            </div>
          </div>

          {/* Comparison Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1 font-bold">Vitórias {selectedTeam1}</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">
                {h2h.team1Wins}
              </span>
            </div>
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1 font-bold">Empates</span>
              <span className="text-xl font-bold text-zinc-300 font-mono">
                {h2h.draws}
              </span>
            </div>
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1 font-bold">Vitórias {selectedTeam2}</span>
              <span className="text-xl font-bold text-zinc-300 font-mono">
                {h2h.team2Wins}
              </span>
            </div>
          </div>

          {/* Goals & Rates */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">
                Gols {selectedTeam1}
              </span>
              <span className="text-sm font-bold text-zinc-200 font-mono">{h2h.team1Goals}</span>
            </div>
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">
                Gols {selectedTeam2}
              </span>
              <span className="text-sm font-bold text-zinc-200 font-mono">{h2h.team2Goals}</span>
            </div>
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">
                Média / Jogo
              </span>
              <span className="text-sm font-bold text-emerald-400 font-mono">{h2h.avgGoals}</span>
            </div>
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">
                Ambas Marcam
              </span>
              <span className="text-sm font-bold text-zinc-200 font-mono">
                {h2h.totalMatches > 0
                  ? `${Math.round((h2h.bothTeamsScoredCount / h2h.totalMatches) * 100)}%`
                  : '0%'}
              </span>
            </div>
          </div>

          {/* Historical Match List between these 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 font-['Outfit']">
              Histórico de Partidas na Temporada ({h2h.matches.length})
            </h4>
            {h2h.matches.length === 0 ? (
              <p className="text-xs text-zinc-500 italic bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-center">
                Ainda não houve partidas registradas entre estas duas equipes nesta temporada.
              </p>
            ) : (
              <div className="space-y-2">
                {h2h.matches.map((m, idx) => {
                  const isFinished = m.score && Array.isArray(m.score.ft);
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs"
                    >
                      <span className="text-zinc-500 text-[11px] font-mono">{m.date} ({m.round})</span>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-zinc-200">{m.team1}</span>
                        {isFinished ? (
                          <span className="px-2.5 py-0.5 rounded bg-[#111111] border border-zinc-800 font-bold font-mono text-emerald-400">
                            {m.score!.ft![0]} - {m.score!.ft![1]}
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-[11px] font-mono">Agendado</span>
                        )}
                        <span className="font-medium text-zinc-200">{m.team2}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
