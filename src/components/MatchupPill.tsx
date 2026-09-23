import React from 'react';
import { TeamCrest } from './TeamCrest';
import { Clock } from 'lucide-react';

export interface MatchupPillProps {
  team1: string;
  team2: string;
  team1Id?: number | string;
  team2Id?: number | string;
  score?: string | null;
  status?: 'green' | 'red' | 'pending' | 'void';
  market?: string | null;
  time?: string | null;
  className?: string;
}

/**
 * Modern Stacked Confrontation element following the requested reference layout.
 * Team crests are presented overlapping on the left, with full names stacked vertically.
 * High-legibility, standard app fonts, beautifully structured on both mobile and desktop.
 */
export const MatchupPill: React.FC<MatchupPillProps> = ({
  team1,
  team2,
  team1Id,
  team2Id,
  score,
  status = 'pending',
  market,
  time,
  className = '',
}) => {
  const t1 = team1 || 'Time A';
  const t2 = team2 || 'Time B';

  // Beautiful background & border status colors mirroring the main app design
  const statusColors = {
    green: { bg: 'bg-emerald-950/45', text: 'text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
    red: { bg: 'bg-rose-950/45', text: 'text-rose-300 border-rose-500/30', dot: 'bg-rose-400' },
    void: { bg: 'bg-zinc-900', text: 'text-zinc-400 border-zinc-800', dot: 'bg-zinc-400' },
    pending: { bg: 'bg-amber-950/40', text: 'text-amber-300 border-amber-500/30', dot: 'bg-amber-400' },
  };

  const statusConfig = statusColors[status] || statusColors.pending;

  return (
    <div
      className={`flex flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#141419]/90 hover:bg-[#181822]/90 border border-[#232330] shadow-md select-none transition-all min-w-0 ${className}`}
    >
      {/* Left: Overlapping Logos (Reference-style) + Vertical Stack of Team Names */}
      <div className="flex items-center min-w-0 flex-1 gap-3">
        {/* Logos container with overlap */}
        <div className="flex items-center -space-x-2.5 shrink-0 select-none">
          {/* Logo 1 */}
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-[#2b2b3b] flex items-center justify-center p-1 shadow-md transition-transform duration-200">
            <TeamCrest teamName={t1} teamId={team1Id} size={22} />
          </div>
          {/* Logo 2 */}
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-[#2b2b3b] flex items-center justify-center p-1 shadow-md z-10 transition-transform duration-200">
            <TeamCrest teamName={t2} teamId={team2Id} size={22} />
          </div>
        </div>

        {/* Stacked Team Names (Strictly following the reference design with no cut-offs) */}
        <div className="flex flex-col min-w-0 flex-1 justify-center pr-1">
          <span
            className="font-sans font-black text-zinc-100 text-[12px] sm:text-[13.5px] leading-tight not-italic tracking-tight break-words"
            title={t1}
          >
            {t1}
          </span>
          <span
            className="font-sans font-black text-zinc-300 text-[12px] sm:text-[13.5px] leading-tight not-italic tracking-tight break-words mt-0.5"
            title={t2}
          >
            {t2}
          </span>
        </div>
      </div>

      {/* Middle/Right: Info & Metrics (Horário strictly on top of Placar & Status) */}
      <div className="flex flex-col items-end justify-center gap-1 sm:gap-1.5 shrink-0 ml-1 sm:ml-2">
        {/* Partida Time Badge (Rendered on top) */}
        {time && (
          <div className="flex items-center gap-1 text-zinc-400 text-[9px] sm:text-[10px] font-bold bg-[#15151c] px-1.5 py-0.5 rounded-md border border-[#222230] select-none shrink-0 tracking-wider">
            <Clock className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
            <span>{time}</span>
          </div>
        )}

        {/* Score & Status Container (Rendered on bottom) */}
        {(score || status) && (
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Score */}
            {score && (
              <span className="font-sans text-[10px] sm:text-xs font-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg bg-[#22222d] text-emerald-400 border border-[#303044] leading-none select-none tracking-wider font-mono">
                {score}
              </span>
            )}

            {/* Status Colored Pill */}
            {status && (
              <span
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${statusConfig.text} ${statusConfig.bg}`}
              >
                <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${statusConfig.dot}`} />
                <span>
                  {status === 'green' ? 'OK' : status === 'red' ? 'RED' : status === 'void' ? 'ANUL' : 'PEND'}
                </span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
