import React, { useEffect, useState } from 'react';
import { Match, StandingItem, AiMatchAnalysis } from '../types';
import { calculateHeadToHead } from '../utils/standings';
import { TeamBadge } from './TeamBadge';
import { X, Sparkles, Brain, CheckCircle2, ShieldCheck, Target, Zap, AlertCircle } from 'lucide-react';

interface AiAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  standings: StandingItem[];
  allMatches: Match[];
  leagueName: string;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({
  isOpen,
  onClose,
  match,
  standings,
  allMatches,
  leagueName,
}) => {
  const [analysis, setAnalysis] = useState<AiMatchAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !match) {
      setAnalysis(null);
      setError(null);
      return;
    }

    const fetchAnalysis = async () => {
      setIsLoading(true);
      setError(null);

      const t1Stats = standings.find((s) => s.team === match.team1);
      const t2Stats = standings.find((s) => s.team === match.team2);
      const h2h = calculateHeadToHead(match.team1, match.team2, allMatches);

      try {
        const res = await fetch('/api/football/ai-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            team1: match.team1,
            team2: match.team2,
            leagueName,
            team1Stats: t1Stats
              ? {
                  rank: t1Stats.rank,
                  points: t1Stats.points,
                  goalsFor: t1Stats.goalsFor,
                  goalsAgainst: t1Stats.goalsAgainst,
                  form: t1Stats.form,
                  goalsForPerGame:
                    Math.round((t1Stats.goalsFor / (t1Stats.played || 1)) * 10) / 10,
                }
              : null,
            team2Stats: t2Stats
              ? {
                  rank: t2Stats.rank,
                  points: t2Stats.points,
                  goalsFor: t2Stats.goalsFor,
                  goalsAgainst: t2Stats.goalsAgainst,
                  form: t2Stats.form,
                  goalsForPerGame:
                    Math.round((t2Stats.goalsFor / (t2Stats.played || 1)) * 10) / 10,
                }
              : null,
            h2hStats: {
              team1Wins: h2h.team1Wins,
              team2Wins: h2h.team2Wins,
              draws: h2h.draws,
              avgGoals: h2h.avgGoals,
            },
          }),
        });

        if (!res.ok) {
          throw new Error('Falha ao processar análise tática');
        }

        const data = await res.json();
        setAnalysis(data);
      } catch (err: any) {
        console.error('Erro ao gerar análise:', err);
        setError('Não foi possível gerar a análise no momento.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [isOpen, match, standings, allMatches, leagueName]);

  if (!isOpen || !match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#111111] border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0c0c0c]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Outfit']">
                Análise Tática & Previsão IA
              </h2>
              <p className="text-[11px] text-zinc-400">
                Insights estatísticos para {match.team1} vs {match.team2}
              </p>
            </div>
          </div>
          <button
            id="btn-close-ai-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Match Versus Card */}
          <div className="grid grid-cols-3 items-center text-center p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex flex-col items-center gap-1.5">
              <TeamBadge teamName={match.team1} size="md" showName={false} />
              <span className="font-bold text-xs text-zinc-200">{match.team1}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-emerald-400 font-mono">
                {match.date}
              </span>
              <span className="text-base font-black text-zinc-600 font-mono">VS</span>
              <span className="text-[10px] text-zinc-500 font-mono">{match.round}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <TeamBadge teamName={match.team2} size="md" showName={false} />
              <span className="font-bold text-xs text-zinc-200">{match.team2}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin"></div>
              <p className="text-xs font-semibold text-zinc-300">
                Processando métricas de gols, forma recente e histórico...
              </p>
              <span className="text-[11px] text-zinc-500 font-mono">
                Análise inteligente cruzando dados do OpenFootball
              </span>
            </div>
          ) : error ? (
            <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : analysis ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* Summary */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1.5">
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                  <Brain className="w-3.5 h-3.5" />
                  Resumo Geral do Confronto
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {analysis.matchSummary}
                </p>
              </div>

              {/* Tactical Breakdown */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1.5">
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-1.5 font-mono">
                  <Target className="w-3.5 h-3.5" />
                  Desenho Tático Esperado
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {analysis.tacticalAnalysis}
                </p>
              </div>

              {/* Prediction & Probabilities */}
              <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-300 font-['Outfit']">
                    Probabilidades & Placar Projetado
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Confiança: {analysis.prediction.confidenceLevel}
                  </span>
                </div>

                {/* Score Projection */}
                <div className="flex items-center justify-around py-2.5 bg-[#111111] rounded-lg border border-zinc-800">
                  <div className="text-center">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold font-mono">Placar Estimado</span>
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">
                      {analysis.prediction.predictedScore}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-zinc-800"></div>
                  <div className="text-center">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold font-mono">Mercado de Gols</span>
                    <span className="text-sm font-bold text-zinc-200 font-mono">
                      {analysis.prediction.expectedTotalGoals}
                    </span>
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="space-y-1.5">
                  <div className="h-3.5 w-full bg-[#111111] rounded-full overflow-hidden flex border border-zinc-800 p-0.5">
                    <div
                      style={{ width: `${analysis.prediction.winnerProbability.team1}%` }}
                      className="bg-emerald-500 h-full rounded-l-full text-[9px] font-mono font-bold text-black flex items-center justify-center"
                    >
                      {analysis.prediction.winnerProbability.team1}%
                    </div>
                    <div
                      style={{ width: `${analysis.prediction.winnerProbability.draw}%` }}
                      className="bg-zinc-600 h-full text-[9px] font-mono font-bold text-zinc-200 flex items-center justify-center"
                    >
                      {analysis.prediction.winnerProbability.draw}%
                    </div>
                    <div
                      style={{ width: `${analysis.prediction.winnerProbability.team2}%` }}
                      className="bg-zinc-800 h-full rounded-r-full text-[9px] font-mono font-bold text-zinc-300 flex items-center justify-center"
                    >
                      {analysis.prediction.winnerProbability.team2}%
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span className="text-emerald-400">{match.team1} ({analysis.prediction.winnerProbability.team1}%)</span>
                    <span>Empate ({analysis.prediction.winnerProbability.draw}%)</span>
                    <span className="text-zinc-300">{match.team2} ({analysis.prediction.winnerProbability.team2}%)</span>
                  </div>
                </div>
              </div>

              {/* Strengths comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-800 space-y-2">
                  <span className="font-semibold text-emerald-400 block text-[11px]">
                    Pontos Fortes ({match.team1})
                  </span>
                  <ul className="space-y-1.5 text-zinc-300 text-[11px]">
                    {analysis.team1Strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-800 space-y-2">
                  <span className="font-semibold text-zinc-300 block text-[11px]">
                    Pontos Fortes ({match.team2})
                  </span>
                  <ul className="space-y-1.5 text-zinc-300 text-[11px]">
                    {analysis.team2Strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key match factors */}
              {analysis.keyMatchFactors && analysis.keyMatchFactors.length > 0 && (
                <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-800 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-1.5 font-mono">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Fatores Decisivos
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-zinc-300">
                    {analysis.keyMatchFactors.map((factor, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
