import React, { useState, useEffect } from 'react';
import { getTeamCrestUrl, getTeamId } from '../utils/teamCrests';
import { Shield } from 'lucide-react';

interface TeamCrestProps {
  teamName: string;
  teamId?: number | string;
  size?: number;
  className?: string;
  showFallbackText?: boolean;
}

export const TeamCrest: React.FC<TeamCrestProps> = ({
  teamName,
  teamId,
  size = 24,
  className = '',
  showFallbackText = false,
}) => {
  const [hasError, setHasError] = useState(false);
  
  // If we have an explicit ID from the API, we SHOULD USE IT.
  // The dictionary should only be a fallback OR an override if we KNOW the API gave a wrong ID.
  // getTeamCrestUrl now handles this logic internally (it prefers dictionary, then explicit).
  const crestUrl = getTeamCrestUrl(teamName, teamId);

  // Reset error if teamName changes
  useEffect(() => {
    setHasError(false);
  }, [teamName, teamId]);

  if (!crestUrl || hasError) {
    const initials = teamName
      ? teamName
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : 'FC';

    // Distinct background color per team initial
    const colors = [
      'bg-zinc-800 text-zinc-300 border-zinc-700',
      'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
      'bg-blue-950/80 text-blue-300 border-blue-800/60',
      'bg-red-950/80 text-red-300 border-red-800/60',
      'bg-amber-950/80 text-amber-300 border-amber-800/60',
    ];
    const colorClass = colors[Math.abs(teamName.length) % colors.length];

    return (
      <span
        id={`team-crest-fallback-${teamName?.toLowerCase().replace(/\s+/g, '-')}`}
        className={`inline-flex items-center justify-center rounded-full font-bold text-[10px] tracking-tight shrink-0 border ${colorClass} ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        title={teamName}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      id={`team-crest-img-${teamName?.toLowerCase().replace(/\s+/g, '-')}`}
      src={crestUrl}
      alt={teamName}
      title={teamName}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-contain shrink-0 transition-transform ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
