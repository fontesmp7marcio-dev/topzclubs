import React from 'react';
import { TeamCrest } from './TeamCrest';
import { getTeamShortCode } from '../utils/teamShortCodes';

interface MatchupPillProps {
  team1: string;
  team2: string;
  team1Id?: number | string;
  team2Id?: number | string;
  className?: string;
  crestSize?: number;
  showFullNamesOnHover?: boolean;
}

/**
 * Sleek compact confrontation pill:
 * FEN [escudo] VS [escudo] ROM
 * As specified in user reference visual.
 */
export const MatchupPill: React.FC<MatchupPillProps> = ({
  team1,
  team2,
  team1Id,
  team2Id,
  className = '',
  crestSize = 18,
  showFullNamesOnHover = true,
}) => {
  const code1 = getTeamShortCode(team1);
  const code2 = getTeamShortCode(team2);

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181820] hover:bg-[#1f1f28] border border-[#2a2a36] shadow-xs select-none transition-colors shrink-0 ${className}`}
      title={showFullNamesOnHover ? `${team1} vs ${team2}` : undefined}
    >
      {/* Team 1 Short Code */}
      <span className="text-xs font-black text-white tracking-wider font-sans uppercase">
        {code1}
      </span>

      {/* Team 1 Crest */}
      <TeamCrest teamName={team1} teamId={team1Id} size={crestSize} />

      {/* VS Indicator */}
      <span className="text-[10px] font-black text-zinc-400 px-0.5 tracking-widest uppercase">
        VS
      </span>

      {/* Team 2 Crest */}
      <TeamCrest teamName={team2} teamId={team2Id} size={crestSize} />

      {/* Team 2 Short Code */}
      <span className="text-xs font-black text-white tracking-wider font-sans uppercase">
        {code2}
      </span>
    </div>
  );
};
