import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface CountryFlagProps {
  ccode?: string;
  countryName?: string;
  className?: string;
  size?: number;
}

// Map common countries to flag emoji as instant high-reliability fallback
const COUNTRY_EMOJI_MAP: Record<string, string> = {
  BRA: '🇧🇷',
  ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  ESP: '🇪🇸',
  GER: '🇩🇪',
  ITA: '🇮🇹',
  FRA: '🇫🇷',
  POR: '🇵🇹',
  ARG: '🇦🇷',
  SAU: '🇸🇦',
  RSA: '🇿🇦',
  QAT: '🇶🇦',
  USA: '🇺🇸',
  MEX: '🇲🇽',
  COL: '🇨🇴',
  URU: '🇺🇾',
  CHI: '🇨🇱',
  NED: '🇳🇱',
  BEL: '🇧🇪',
  TUR: '🇹🇷',
  GRE: '🇬🇷',
  JPN: '🇯🇵',
  KOR: '🇰🇷',
  CHN: '🇨🇳',
  AUS: '🇦🇺',
  CAN: '🇨🇦',
  EGY: '🇪🇬',
  MAR: '🇲🇦',
  SEN: '🇸🇳',
  NGA: '🇳🇬',
  NOR: '🇳🇴',
  SWE: '🇸🇪',
  DEN: '🇩🇰',
  FIN: '🇫🇮',
  SUI: '🇨🇭',
  AUT: '🇦🇹',
  CRO: '🇭🇷',
  SRB: '🇷🇸',
  POL: '🇵🇱',
  CZE: '🇨🇿',
  UKR: '🇺🇦',
  RUS: '🇷🇺',
  SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  WAL: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  NIR: '🇬🇧',
  IRL: '🇮🇪',
  NZL: '🇳🇿',
  VIE: '🇻🇳',
  VEN: '🇻🇪',
  PER: '🇵🇪',
  ECU: '🇪🇨',
  PAR: '🇵🇾',
  BOL: '🇧🇴',
  ALB: '🇦🇱',
  ALG: '🇩🇿',
  ARM: '🇦🇲',
  AZE: '🇦🇿',
  BAN: '🇧🇩',
  BLR: '🇧🇾',
  BIH: '🇧🇦',
  BUL: '🇧🇬',
  KAZ: '🇰🇿',
  CYP: '🇨🇾',
  CRC: '🇨🇷',
};

export const CountryFlag: React.FC<CountryFlagProps> = ({
  ccode = 'INT',
  countryName,
  className = '',
  size = 20,
}) => {
  const [hasError, setHasError] = useState(false);
  const code = (ccode || 'INT').toUpperCase();

  if (code === 'INT' || code === 'GLOBE' || code === 'WORLD') {
    return (
      <span
        id={`flag-${code.toLowerCase()}`}
        className={`inline-flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 shrink-0 border border-blue-500/30 ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        title="Internacional"
      >
        <Globe style={{ width: `${Math.max(12, size - 6)}px`, height: `${Math.max(12, size - 6)}px` }} />
      </span>
    );
  }

  const fotmobLogoUrl = `https://images.fotmob.com/image_resources/logo/teamlogo/${code.toLowerCase()}.png`;

  if (hasError) {
    const emoji = COUNTRY_EMOJI_MAP[code];
    if (emoji) {
      return (
        <span
          id={`flag-emoji-${code.toLowerCase()}`}
          className={`inline-flex items-center justify-center rounded-full bg-zinc-800 shrink-0 text-center leading-none ${className}`}
          style={{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.max(11, size - 6)}px` }}
          title={countryName || code}
        >
          {emoji}
        </span>
      );
    }

    return (
      <span
        id={`flag-fallback-${code.toLowerCase()}`}
        className={`inline-flex items-center justify-center rounded-full bg-zinc-800 text-zinc-300 font-mono font-bold text-[9px] uppercase shrink-0 border border-zinc-700 ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        title={countryName || code}
      >
        {code.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      id={`flag-img-${code.toLowerCase()}`}
      src={fotmobLogoUrl}
      alt={countryName || code}
      title={countryName || code}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`rounded-full object-cover shrink-0 bg-zinc-800 shadow-sm ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
