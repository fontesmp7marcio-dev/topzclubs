import React from 'react';
import { getTeamMeta } from '../utils/teamLogos';

interface TeamBadgeProps {
  teamName: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  className?: string;
  nameClassName?: string;
}

export const TeamBadge: React.FC<TeamBadgeProps> = ({
  teamName,
  size = 'md',
  showName = true,
  className = '',
  nameClassName = '',
}) => {
  const meta = getTeamMeta(teamName);

  const sizeClasses = {
    xs: 'w-5 h-5 text-[9px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base font-bold',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-lg flex items-center justify-center font-bold shadow-md ring-1 ring-white/10 shrink-0 select-none transition-transform hover:scale-105`}
        style={{
          background: `linear-gradient(135deg, ${meta.primaryColor} 0%, ${meta.secondaryColor} 100%)`,
          color: meta.textColor,
        }}
        title={teamName}
      >
        <span className="tracking-tighter drop-shadow">{meta.code}</span>
      </div>
      {showName && (
        <span className={`font-medium text-zinc-200 truncate ${nameClassName}`}>
          {meta.shortName}
        </span>
      )}
    </div>
  );
};
