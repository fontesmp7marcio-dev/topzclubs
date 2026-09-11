import React, { useEffect, useState } from 'react';
import { Match, StandingItem, AiMatchAnalysis } from '../types';
import { calculateHeadToHead } from '../utils/standings';
import { TeamBadge } from './TeamBadge';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

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
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !match) {
      setAnalysis(null);
      setError(null);
      setProgress(0);
      return;
    }

    let intervalId: any = null;

    const fetchAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      setProgress(0);

      // Smooth simulated progress bar timer
      let currentProgress = 0;
      intervalId = setInterval(() => {
        if (currentProgress < 30) {
          currentProgress += Math.floor(Math.random() * 6) + 7; // Fast start (0 to 30)
        } else if (currentProgress < 75) {
          currentProgress += Math.floor(Math.random() * 4) + 3; // Medium speed (30 to 75)
        } else if (currentProgress < 95) {
          currentProgress += Math.floor(Math.random() * 2) + 1; // Creep up (75 to 95)
        }
        if (currentProgress > 95) {
          currentProgress = 95;
        }
        setProgress(currentProgress);
      }, 90);

      // Create a deterministic, URL-safe matchId from teams and date
      let matchId = '';
      try {
        matchId = btoa(encodeURIComponent(`${match.team1}-${match.team2}-${match.date}`))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '')
          .substring(0, 15);
      } catch (e) {
        matchId = `${match.team1.substring(0, 3)}-${match.team2.substring(0, 3)}`.replace(/[^a-zA-Z0-9-]/g, '');
      }

      try {
        const res = await fetch(`/api/analysis/apwin/${matchId}?team1=${encodeURIComponent(match.team1)}&team2=${encodeURIComponent(match.team2)}&date=${encodeURIComponent(match.date)}`);

        if (!res.ok) {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('text/html')) {
            throw new Error('O servidor está reiniciando ou indisponível temporariamente. Por favor, tente novamente em alguns segundos.');
          }
          throw new Error('Falha ao processar análise tática (APWin)');
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Resposta inválida do servidor. Por favor, tente novamente.');
        }

        const data = await res.json();
        
        if (data.success && data.analysis) {
             clearInterval(intervalId);
             setProgress(100);
             // Short delay so user can appreciate the 100% completion before revealing the content
             await new Promise(resolve => setTimeout(resolve, 250));

             setAnalysis({
                 markdown: data.analysis,
                 // We supply fake structured data to satisfy the interface, 
                 // but we'll render the markdown directly
                 matchSummary: '',
                 tacticalAnalysis: '',
                 keyMatchFactors: [],
                 team1Strengths: [],
                 team2Strengths: [],
                 prediction: {
                    confidenceLevel: 'High',
                    predictedScore: '',
                    expectedTotalGoals: 2,
                    winnerProbability: { team1: 33, draw: 33, team2: 34 }
                 }
             });
        } else {
             throw new Error(data.error || 'Análise não disponível');
        }

      } catch (err: any) {
        clearInterval(intervalId);
        console.error('Erro ao gerar análise:', err);
        setError(err.message || 'Não foi possível buscar os prognósticos do APWin no momento.');
      } finally {
        clearInterval(intervalId);
        setIsLoading(false);
      }
    };

    fetchAnalysis();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen, match, standings, allMatches, leagueName]);

  if (!isOpen || !match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#0c0c0c] border border-zinc-800/80 rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-800/60 bg-[#070707]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold shadow-md shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white font-['Outfit'] truncate">
                Análise Tática
              </h2>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">
                Insights estatísticos para {match.team1} vs {match.team2}
              </p>
            </div>
          </div>
          <button
            id="btn-close-ai-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-md mx-auto space-y-6">
                
                {/* Simulated Percentage Dial */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center">
                  {/* Outer glowing ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-900 shadow-[0_0_15px_rgba(163,255,18,0.05)]"></div>
                  
                  {/* Rotating visual elements */}
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-zinc-800 animate-[spin_10s_linear_infinite]"></div>
                  
                  {/* Numerical percentage indicator */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-black text-[#a3ff12] font-mono leading-none">
                      {progress}%
                    </span>
                  </div>
                </div>

                {/* Progress bar track */}
                <div className="w-full h-1.5 sm:h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-[#a3ff12] to-[#a3ff12] rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(163,255,18,0.4)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

              </div>
            </div>
          ) : error ? (
            <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : analysis ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="markdown-body text-[13px] sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap space-y-4">
                 <Markdown remarkPlugins={[remarkBreaks]}>{analysis.markdown}</Markdown>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
