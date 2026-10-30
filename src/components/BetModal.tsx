import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { X, Calendar, Calculator, Plus, Edit2, Trash2, Check, Star, RefreshCw, Flame } from 'lucide-react';
import {
  BetItem,
  BetStatus,
  BetFormat,
  BetBookmaker,
  Match,
  BetLeg,
  BetLegStatus,
  MatchFilters,
  DEFAULT_MATCH_FILTERS,
  MatchItem,
} from '../types';
import {
  getMarketOptionsForMatch,
  getMarketLabel,
  getMarketMetadata,
  evaluateLegResult,
  evaluateBetStatusFromLegs,
  calculateBetProfit,
  parseMatchupFromTitle,
  resolveOfficialMatchResult,
  syncBetWithMatches,
} from '../utils/betSync';
import { TeamCrest } from './TeamCrest';
import { MatchupPill } from './MatchupPill';
import { isMatchInFavorites } from '../data/curatedSchedule';
import { isFemaleOrWomensMatch } from '../utils/femaleFilter';
import { isTeamNameInFavorites, normalizeTeamName, USER_FAVORITE_CLUBS_DATA } from '../data/favoriteClubs';
import {
  filterTeamPastMatches,
  calculateTeamEmojis,
  getEndingFireStreak,
  getEndingLossStreak,
  generateFallbackTeamMatches,
} from '../utils/competitionFilter';
import { getBrasiliaTodayStr } from '../utils/dateUtils';

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bet: BetItem) => void;
  onDelete?: (id: string) => void;
  initialBet?: BetItem | null;
  existingBets?: BetItem[];
  supabaseFavorites?: { id: number; name: string; country?: string; league?: string }[];
  teamForms?: Record<number, string[]>;
  teamRawMatches?: Record<number, MatchItem[]>;
  filters?: MatchFilters;
  dateMatches?: Match[];
  selectedDate?: string;
}

interface MatchSelectionRowProps {
  item: any;
  isChecked: boolean;
  odds?: { bet365: boolean; betano: boolean };
  official: any;
  onToggle: (match: Match) => void;
}

const MatchSelectionRow = React.memo<MatchSelectionRowProps>(({
  item,
  isChecked,
  odds,
  official,
  onToggle,
}) => {
  const m = item.match;

  return (
    <div
      onClick={() => onToggle(m)}
      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left ${
        isChecked
          ? 'bg-emerald-950/40 border-emerald-500 shadow-sm'
          : 'bg-[#1a1a20] hover:bg-[#22222a] border-[#292934]'
      }`}
    >
      <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
        {/* Checkbox indicator */}
        <div
          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors ${
            isChecked
              ? 'bg-emerald-500 border-emerald-400 text-black'
              : 'border-zinc-600 bg-[#25252e]'
          }`}
        >
          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
        </div>

        {/* Teams & Fire / Loss Details */}
        <div className="flex flex-col min-w-0 flex-1">
          {/* Confrontation Line */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-white flex-wrap">
            {/* Team 1 */}
            <div className="flex items-center gap-1.5 min-w-0">
              <TeamCrest teamName={m.team1} teamId={m.team1Id} size={16} />
              <span
                className={
                  item.isFav1
                    ? 'text-[#ccff00] font-black flex items-center gap-1'
                    : 'text-zinc-100'
                }
              >
                {item.isFav1 && (
                  <span className="text-amber-400 font-normal shrink-0">★</span>
                )}
                <span>{m.team1}</span>
              </span>

              {item.streakFire1 >= 1 && (
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-[9px] font-black text-amber-400 shrink-0"
                  title={`Último(s) jogo(s) Under 1.5: ${item.streakFire1} em sequência`}
                >
                  <span>🔥</span>
                  <span>{item.streakFire1 === 1 ? '1 foguinho' : `${item.streakFire1} foguinhos`}</span>
                </span>
              )}
            </div>

            <span className="text-zinc-500 text-[10px] font-normal mx-0.5 shrink-0">vs</span>

            {/* Team 2 */}
            <div className="flex items-center gap-1.5 min-w-0">
              <TeamCrest teamName={m.team2} teamId={m.team2Id} size={16} />
              <span
                className={
                  item.isFav2
                    ? 'text-[#ccff00] font-black flex items-center gap-1'
                    : 'text-zinc-100'
                }
              >
                {item.isFav2 && (
                  <span className="text-amber-400 font-normal shrink-0">★</span>
                )}
                <span>{m.team2}</span>
              </span>

              {item.streakFire2 >= 1 && (
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-[9px] font-black text-amber-400 shrink-0"
                  title={`Último(s) jogo(s) Under 1.5: ${item.streakFire2} em sequência`}
                >
                  <span>🔥</span>
                  <span>{item.streakFire2 === 1 ? '1 foguinho' : `${item.streakFire2} foguinhos`}</span>
                </span>
              )}
            </div>
          </div>

          {/* Second Row: League, Time & Mini Form Emoji Sequence */}
          <div className="flex items-center gap-2 flex-wrap text-[10px] text-zinc-400 mt-1">
            <span>{m.leagueName || 'Liga'}</span>
            <span>•</span>
            <span>{m.time || '16:00'}</span>

            {/* Show form sequence for fav team with fire */}
            {item.isFav1 && item.streakFire1 >= 1 && item.emojis1.length > 0 && (
              <div className="flex items-center gap-1 ml-auto sm:ml-2 bg-[#121216] px-1.5 py-0.5 rounded border border-[#292934]">
                <span className="text-[9px] text-zinc-400 font-semibold">{m.team1}:</span>
                <div className="flex items-center gap-0.5">
                  {item.emojis1.map((emo: string, eIdx: number) => (
                    <span key={eIdx} className="text-[9px]" title={emo === '🔥' ? 'Under 1.5' : emo === '🔻' ? 'Derrota' : emo}>
                      {emo}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.isFav2 && item.streakFire2 >= 1 && item.emojis2.length > 0 && (
              <div className="flex items-center gap-1 ml-auto sm:ml-2 bg-[#121216] px-1.5 py-0.5 rounded border border-[#292934]">
                <span className="text-[9px] text-zinc-400 font-semibold">{m.team2}:</span>
                <div className="flex items-center gap-0.5">
                  {item.emojis2.map((emo: string, eIdx: number) => (
                    <span key={eIdx} className="text-[9px]" title={emo === '🔥' ? 'Under 1.5' : emo === '🔻' ? 'Derrota' : emo}>
                      {emo}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Time pill & Bookmaker Badges */}
      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
        {odds?.bet365 && (
          <span
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black tracking-tight bg-[#005a36] text-white shadow-sm border border-[#006e42]/60 select-none"
            title="Mercado Total de Gols 1.5 aberto na Bet365"
          >
            <span className="text-white font-bold">bet</span>
            <span className="text-[#ffdf1b] font-black ml-0.5">365</span>
          </span>
        )}

        {odds?.betano && (
          <span
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black italic tracking-tight bg-[#ea5400] text-white shadow-sm border border-[#ff661a]/60 select-none"
            title="Mercado Total de Gols 1.5 aberto na Betano"
          >
            Betano
          </span>
        )}

        {/* Official Score & Status / Time Badge */}
        {official.isFinished ? (
          <span className="text-[10px] font-bold text-white bg-zinc-800/90 px-2 py-0.5 rounded border border-zinc-700 flex items-center gap-1 shrink-0">
            <span>{official.scoreText || '0 - 0'}</span>
            <span className="text-[9px] text-zinc-400 font-semibold">• FT</span>
          </span>
        ) : official.isLive ? (
          <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700 flex items-center gap-1 animate-pulse shrink-0">
            <span>{official.scoreText || '0 - 0'}</span>
            <span className="text-[9px] text-emerald-300 font-bold">• AO VIVO</span>
          </span>
        ) : (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/50 shrink-0">
            {m.time || '16:00'}
          </span>
        )}
      </div>
    </div>
  );
});

interface LegSelectionRowProps {
  leg: BetLeg;
  idx: number;
  options: { value: string; label: string }[];
  onMarketChange: (legIndex: number, market: string) => void;
  onTimeChange: (legIndex: number, time: string) => void;
  onLegStatusChange: (legIndex: number, status: BetLegStatus) => void;
  onRemoveLeg: (legIndex: number) => void;
}

const LegSelectionRow = React.memo<LegSelectionRowProps>(({
  leg,
  idx,
  options,
  onMarketChange,
  onTimeChange,
  onLegStatusChange,
  onRemoveLeg,
}) => {
  const matchScore = leg.score?.ft;
  const hasScore = matchScore && matchScore.length === 2;

  return (
    <div className="bg-[#1a1a22] border border-[#2e2e3c] rounded-xl p-3 space-y-2.5 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="w-5 h-5 rounded-full bg-[#242432] border border-zinc-700 text-zinc-300 text-[10px] font-black flex items-center justify-center shrink-0">
            {idx + 1}
          </span>

          <MatchupPill
            team1={leg.team1}
            team2={leg.team2}
            team1Id={leg.team1Id}
            team2Id={leg.team2Id}
            time={leg.time || '16:00'}
          />
          
          {hasScore && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded border shrink-0 ${
              leg.matchStatus === 'finished'
                ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                : leg.matchStatus === 'live'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
            }`}>
              {matchScore[0]} - {matchScore[1]} {leg.matchStatus === 'finished' ? '• Fim' : leg.matchStatus === 'live' ? '• Ao Vivo' : ''}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onRemoveLeg(idx)}
          className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
          title="Remover partida"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1.5 border-t border-[#272734]">
        <div>
          <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Mercado Apostado (5 Opções)
          </label>
          <select
            value={leg.market || 'OVER_1_5'}
            onChange={(e) => onMarketChange(idx, e.target.value)}
            className="w-full bg-[#121216] border border-[#30303e] focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 font-semibold outline-none cursor-pointer"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Horário do Jogo
          </label>
          <input
            type="text"
            value={leg.time || '16:00'}
            onChange={(e) => onTimeChange(idx, e.target.value)}
            className="w-full bg-[#121216] border border-[#30303e] focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 font-bold outline-none"
            placeholder="16:00"
          />
        </div>

        <div>
          <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Resultado
          </label>
          <select
            value={leg.status || 'pending'}
            onChange={(e) => onLegStatusChange(idx, e.target.value as BetLegStatus)}
            className={`w-full bg-[#121216] border rounded-lg px-2.5 py-1.5 text-xs font-bold outline-none cursor-pointer ${
              leg.status === 'green'
                ? 'text-emerald-400 border-emerald-500/50'
                : leg.status === 'red'
                ? 'text-rose-400 border-rose-500/50'
                : leg.status === 'void'
                ? 'text-zinc-300 border-zinc-600'
                : 'text-amber-400 border-amber-500/50'
            }`}
          >
            <option value="green" className="bg-[#18181c] text-emerald-400 font-bold">
              🟢 Green (Acertou)
            </option>
            <option value="red" className="bg-[#18181c] text-rose-400 font-bold">
              🔴 Red (Errou)
            </option>
            <option value="pending" className="bg-[#18181c] text-amber-400 font-bold">
              🟡 Pendente
            </option>
            <option value="void" className="bg-[#18181c] text-zinc-300 font-bold">
              ⚪ Anulada / Reembolsada
            </option>
          </select>
        </div>
      </div>
    </div>
  );
});

export const BetModal: React.FC<BetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialBet,
  existingBets = [],
  supabaseFavorites,
  teamForms,
  teamRawMatches,
  filters,
  dateMatches,
  selectedDate,
}) => {
  const isEditing = !!initialBet;

  // Form states
  const [date, setDate] = useState<string>(() => {
    return initialBet?.date || selectedDate || getBrasiliaTodayStr();
  });
  const [bookmaker, setBookmaker] = useState<BetBookmaker>('Betano');
  const [title, setTitle] = useState<string>('');
  const [odd, setOdd] = useState<string>('2.00');
  const [sport, setSport] = useState<string>('Futebol');
  const [status, setStatus] = useState<BetStatus>('Pendente');
  const [format, setFormat] = useState<BetFormat>('Simples');
  const [amount, setAmount] = useState<string>('20.00');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  // Synchronized Matches State for selected date
  const [dayMatches, setDayMatches] = useState<Match[]>([]);
  const [isMatchesLoading, setIsMatchesLoading] = useState<boolean>(false);
  const [selectedMatchIds, setSelectedMatchIds] = useState<string[]>([]);
  const [userFavorites, setUserFavorites] = useState<{ id: number; name: string; country?: string; league?: string }[]>(
    supabaseFavorites || USER_FAVORITE_CLUBS_DATA
  );
  const [legs, setLegs] = useState<BetLeg[]>([]);
  const [internalRawMatches, setInternalRawMatches] = useState<Record<number, MatchItem[]>>({});
  const [showAllDayMatches, setShowAllDayMatches] = useState<boolean>(false);
  const [quickFilter, setQuickFilter] = useState<'foguinho' | null>(null);
  const [fireCountFilter, setFireCountFilter] = useState<number>(0); // 0 = todos, 2 = 2 foguinhos, 3 = 3 foguinhos
  const [oddsAvailability, setOddsAvailability] = useState<Record<string | number, { bet365: boolean; betano: boolean }>>({});
  const fetchedTeamsRef = React.useRef<Set<number>>(new Set());

  // Reset showAllDayMatches, quickFilter and fireCountFilter when date changes or modal opens
  useEffect(() => {
    setShowAllDayMatches(false);
    setQuickFilter(null);
    setFireCountFilter(0);
  }, [date, isOpen]);

  // Load user favorites from Supabase API (or fallback to master list) when modal opens
  useEffect(() => {
    if (!isOpen) return;
    let isCancelled = false;

    fetch('/api/shared-favorites')
      .then((res) => res.json())
      .then((data) => {
        if (isCancelled) return;
        if (data && data.success && Array.isArray(data.favorites) && data.favorites.length > 0) {
          setUserFavorites(data.favorites);
        } else {
          setUserFavorites(USER_FAVORITE_CLUBS_DATA);
        }
      })
      .catch((err) => {
        if (isCancelled) return;
        console.warn('Could not load favorites in BetModal:', err);
        setUserFavorites(USER_FAVORITE_CLUBS_DATA);
      });

    return () => {
      isCancelled = true;
    };
  }, [isOpen]);

  // Pool matches from dayMatches and main page dateMatches for the current date
  const allAvailableMatches = useMemo(() => {
    const list: Match[] = [...dayMatches];
    if (dateMatches && dateMatches.length > 0) {
      dateMatches.forEach((dm) => {
        if (!list.some((m) => String(m.id) === String(dm.id))) {
          list.push(dm);
        }
      });
    }
    return list;
  }, [dayMatches, dateMatches]);

  // Combined raw matches: parent prop + internal raw matches loaded dynamically
  const combinedRawMatches = React.useMemo(() => {
    return { ...teamRawMatches, ...internalRawMatches };
  }, [teamRawMatches, internalRawMatches]);

  // Sync initial values when modal opens or initialBet changes
  useEffect(() => {
    if (initialBet) {
      setDate(initialBet.date || selectedDate || getBrasiliaTodayStr());
      setBookmaker(initialBet.bookmaker === 'Bet365' ? 'Bet365' : 'Betano');
      setTitle(initialBet.title || '');
      setOdd(String(initialBet.odd || '2.00'));
      setSport(initialBet.sport || 'Futebol');
      setStatus(initialBet.status || 'Pendente');
      setFormat(initialBet.format || 'Simples');
      setAmount(String(initialBet.amount || '20.00'));
      setDeleteConfirm(false);
      setSelectedMatchIds([]);
      setLegs(initialBet.legs || []);
    } else {
      const defaultDate = selectedDate || getBrasiliaTodayStr();
      setDate(defaultDate);
      setBookmaker('Betano');
      setTitle('');
      setOdd('2.00');
      setSport('Futebol');
      setStatus('Pendente');
      setFormat('Simples');
      setAmount('20.00');
      setDeleteConfirm(false);
      setSelectedMatchIds([]);
      setLegs([]);
    }
    setIsDeleting(false);
  }, [initialBet, isOpen, selectedDate]);


  // Keep existing legs synchronized with latest official scores from all available sources
  useEffect(() => {
    if (initialBet && legs.length > 0 && (allAvailableMatches.length > 0 || Object.keys(combinedRawMatches).length > 0)) {
      const { updatedBet, changed } = syncBetWithMatches(
        { ...initialBet, legs },
        allAvailableMatches,
        combinedRawMatches
      );
      if (changed && updatedBet.legs) {
        setLegs(updatedBet.legs);
        setStatus(updatedBet.status);
      }
    }
  }, [allAvailableMatches, combinedRawMatches, initialBet]);

  // Handler to change the market for an individual leg
  const handleMarketChange = useCallback((legIndex: number, newMarket: string) => {
    setLegs((prevLegs) => {
      const nextLegs = [...prevLegs];
      const leg = nextLegs[legIndex];
      if (!leg) return prevLegs;

      const official = resolveOfficialMatchResult(leg, allAvailableMatches, combinedRawMatches);
      const homeScore = official.homeScore !== undefined ? official.homeScore : leg.score?.ft?.[0];
      const awayScore = official.awayScore !== undefined ? official.awayScore : leg.score?.ft?.[1];
      const currentMatchStatus = official.status || leg.matchStatus;
      const autoStatus = evaluateLegResult(newMarket, homeScore, awayScore, currentMatchStatus);
      const meta = getMarketMetadata(newMarket, leg.team1, leg.team2);
      const isFinished = currentMatchStatus === 'finished';
      const settledScore: [number, number] | null =
        isFinished && homeScore !== undefined && awayScore !== undefined
          ? [homeScore, awayScore]
          : leg.settledScore || null;

      nextLegs[legIndex] = {
        ...leg,
        matchId: official.matchId || leg.matchId || leg.id,
        market: newMarket,
        marketLabel: meta.marketLabel,
        line: meta.line,
        targetSide: meta.targetSide,
        status: autoStatus,
        score: official.scoreObj || leg.score || null,
        settledScore,
        matchStatus: currentMatchStatus,
      };

      const nextFormat: BetFormat = nextLegs.length > 1 ? 'Múltipla' : 'Simples';
      const autoBetStatus = evaluateBetStatusFromLegs(nextLegs, status, nextFormat);
      setStatus(autoBetStatus);

      return nextLegs;
    });
  }, [allAvailableMatches, combinedRawMatches, status]);

  // Handler to manually change the result/status of an individual leg inside Editar Aposta
  const handleLegStatusChange = useCallback((legIndex: number, newLegStatus: BetLegStatus) => {
    setLegs((prevLegs) => {
      const nextLegs = [...prevLegs];
      const leg = nextLegs[legIndex];
      if (!leg) return prevLegs;

      const updatedMatchStatus =
        newLegStatus === 'pending'
          ? (leg.matchStatus === 'live' ? 'live' : 'scheduled')
          : (leg.matchStatus === 'scheduled' || !leg.matchStatus ? 'finished' : leg.matchStatus);

      nextLegs[legIndex] = {
        ...leg,
        status: newLegStatus,
        matchStatus: updatedMatchStatus,
      };

      const nextFormat: BetFormat = nextLegs.length > 1 ? 'Múltipla' : 'Simples';
      const autoBetStatus = evaluateBetStatusFromLegs(nextLegs, status, nextFormat);
      setStatus(autoBetStatus);

      return nextLegs;
    });
  }, [status]);

  // Handler to change time of an individual leg
  const handleTimeChange = useCallback((legIndex: number, val: string) => {
    setLegs((prevLegs) => {
      const nextLegs = [...prevLegs];
      if (!nextLegs[legIndex]) return prevLegs;
      nextLegs[legIndex] = { ...nextLegs[legIndex], time: val };
      return nextLegs;
    });
  }, []);

  // Handler to remove a single leg directly from the selections list
  const handleRemoveLeg = useCallback((legIndex: number) => {
    setLegs((prevLegs) => {
      const legToRemove = prevLegs[legIndex];
      if (!legToRemove) return prevLegs;
      const targetId = legToRemove.matchId || legToRemove.id;
      setSelectedMatchIds((prev) => prev.filter((id) => id !== targetId));

      const nextLegs = prevLegs.filter((_, i) => i !== legIndex);
      const nextFormat: BetFormat = nextLegs.length > 1 ? 'Múltipla' : 'Simples';
      setFormat(nextFormat);
      const autoBetStatus = evaluateBetStatusFromLegs(nextLegs, status, nextFormat);
      setStatus(autoBetStatus);
      if (nextLegs.length > 0) {
        setTitle(nextLegs.map((l) => `${l.team1} x ${l.team2}`).join(' + '));
      } else {
        setTitle('');
      }
      return nextLegs;
    });
  }, [status]);

  // Fetch matches whenever date changes
  useEffect(() => {
    if (!isOpen || !date) return;
    let isCancelled = false;
    setIsMatchesLoading(true);

    fetch(`/api/fotmob/matches-by-date?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (isCancelled) return;
        if (data && Array.isArray(data.matches)) {
          const clean = data.matches.filter(
            (m: any) => !isFemaleOrWomensMatch(m.leagueName, m.team1, m.team2)
          );
          setDayMatches(clean);
        } else {
          setDayMatches([]);
        }
        setIsMatchesLoading(false);
      })
      .catch((err) => {
        if (isCancelled) return;
        console.warn('Failed to load day matches in BetModal:', err);
        setDayMatches([]);
        setIsMatchesLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [date, isOpen]);

  // Helper to find a favorite club by name or ID
  const findFavoriteClub = React.useCallback(
    (teamName: string, teamId?: number) => {
      const list =
        userFavorites && userFavorites.length > 0
          ? userFavorites
          : supabaseFavorites && supabaseFavorites.length > 0
          ? supabaseFavorites
          : USER_FAVORITE_CLUBS_DATA;

      if (teamId) {
        const byId = list.find((f) => Number(f.id) === Number(teamId));
        if (byId) return byId;
      }
      if (!teamName) return null;
      const norm = normalizeTeamName(teamName);
      return (
        list.find((f) => {
          const fNorm = normalizeTeamName(f.name);
          if (fNorm === norm) return true;
          if (norm.length >= 4 && fNorm.length >= 4 && (norm.includes(fNorm) || fNorm.includes(norm))) {
            return true;
          }
          return false;
        }) || null
      );
    },
    [userFavorites, supabaseFavorites]
  );

  // Synchronized emoji calculator using the exact same logic and filters as TeamDetailModal / Main Dashboard
  const getTeamEmojis = React.useCallback(
    (teamName: string, teamId: number): string[] => {
      // 1. If teamForms from parent has it, use it directly (perfect synchronization)
      if (teamForms && teamForms[teamId] && teamForms[teamId].length > 0) {
        return teamForms[teamId];
      }
      // 2. From combined raw matches or realistic fallback
      const raw = combinedRawMatches[teamId] || generateFallbackTeamMatches(teamName, teamId);
      const effectiveFilters = filters || DEFAULT_MATCH_FILTERS;
      const filtered = filterTeamPastMatches(raw, effectiveFilters, teamName, teamId);
      return calculateTeamEmojis(filtered);
    },
    [teamForms, combinedRawMatches, filters]
  );

  // Fetch past matches for any favorite teams in dayMatches that aren't yet loaded
  useEffect(() => {
    if (!isOpen || dayMatches.length === 0) return;

    const teamsToFetch: { id: number; name: string }[] = [];
    dayMatches.forEach((m) => {
      const fav1 = findFavoriteClub(m.team1, m.team1Id);
      const fav2 = findFavoriteClub(m.team2, m.team2Id);

      [fav1, fav2].forEach((fav) => {
        if (!fav || !fav.id) return;
        if (
          (teamForms && teamForms[fav.id]?.length) ||
          combinedRawMatches[fav.id]?.length ||
          fetchedTeamsRef.current.has(fav.id)
        ) {
          return;
        }

        fetchedTeamsRef.current.add(fav.id);
        teamsToFetch.push({ id: fav.id, name: fav.name });
      });
    });

    if (teamsToFetch.length > 0) {
      fetch('/api/fotmob/batch-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teams: teamsToFetch }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.teamsData && Object.keys(data.teamsData).length > 0) {
            setInternalRawMatches((prev) => ({ ...prev, ...data.teamsData }));
          }
        })
        .catch((err) => {
          console.warn('Batch fetch error in BetModal:', err);
        });
    }
  }, [isOpen, dayMatches, findFavoriteClub, teamForms, combinedRawMatches]);

  // Evaluate each day match: check if favorite teams have active fire emoji (🔥 Under 1.5) or defeat emoji (🔻 Derrota) in their last match
  const matchesWithStreakInfo = React.useMemo(() => {
    if (!dayMatches.length) return [];
    const activeFavList =
      userFavorites && userFavorites.length > 0
        ? userFavorites
        : supabaseFavorites && supabaseFavorites.length > 0
        ? supabaseFavorites
        : USER_FAVORITE_CLUBS_DATA;

    return dayMatches.map((m) => {
      const fav1 = findFavoriteClub(m.team1, m.team1Id);
      const isFav1 = !!fav1 || isTeamNameInFavorites(m.team1, activeFavList);
      const resolvedFav1Id = fav1 ? fav1.id : m.team1Id;
      const emojis1 = resolvedFav1Id ? getTeamEmojis(fav1 ? fav1.name : m.team1, resolvedFav1Id) : [];
      const streakFire1 = getEndingFireStreak(emojis1);

      const fav2 = findFavoriteClub(m.team2, m.team2Id);
      const isFav2 = !!fav2 || isTeamNameInFavorites(m.team2, activeFavList);
      const resolvedFav2Id = fav2 ? fav2.id : m.team2Id;
      const emojis2 = resolvedFav2Id ? getTeamEmojis(fav2 ? fav2.name : m.team2, resolvedFav2Id) : [];
      const streakFire2 = getEndingFireStreak(emojis2);

      // Rule: Match qualifies strictly if at least one favorite team has the "Foguinho" (On Fire) status
      const fav1FireQualifies = isFav1 && streakFire1 >= 1;
      const fav2FireQualifies = isFav2 && streakFire2 >= 1;
      const hasFireStreak = fav1FireQualifies || fav2FireQualifies;
      const qualifies = hasFireStreak;

      return {
        match: m,
        isFav1,
        fav1,
        emojis1,
        streakFire1,
        isFav2,
        fav2,
        emojis2,
        streakFire2,
        hasFireStreak,
        qualifies,
      };
    });
  }, [dayMatches, findFavoriteClub, getTeamEmojis, userFavorites, supabaseFavorites]);

  // Identifica partidas e times já incluídos em outros bilhetes criados para esta mesma data
  const usedInOtherBets = React.useMemo(() => {
    const usedMatchIds = new Set<string>();
    const usedTeams = new Set<string>();

    (existingBets || []).forEach((b) => {
      // Se for a mesma aposta sendo editada, não exclui as partidas dela própria
      if (initialBet && b.id === initialBet.id) return;

      // Verifica se a aposta é da mesma data ou possui seleções (legs) nesta data
      const isSameDate = b.date === date;
      const hasLegOnDate = Array.isArray(b.legs) && b.legs.some((l) => l.date === date);

      if (!isSameDate && !hasLegOnDate) return;

      // Coleta IDs e times das seleções (legs)
      if (Array.isArray(b.legs)) {
        b.legs.forEach((leg) => {
          if (leg.matchId) usedMatchIds.add(String(leg.matchId));
          if (leg.id) usedMatchIds.add(String(leg.id));
          if (leg.team1) usedTeams.add(normalizeTeamName(leg.team1));
          if (leg.team2) usedTeams.add(normalizeTeamName(leg.team2));
        });
      }

      // Coleta nomes de times do título (ex: "Palmeiras x Corinthians + Flamengo x Vasco")
      if (b.title) {
        const segments = b.title.split('+');
        segments.forEach((seg) => {
          const teams = seg.split(/\s+x\s+|\s+vs\s+/i);
          if (teams.length === 2) {
            usedTeams.add(normalizeTeamName(teams[0]));
            usedTeams.add(normalizeTeamName(teams[1]));
          }
        });
      }
    });

    return { usedMatchIds, usedTeams };
  }, [existingBets, date, initialBet]);

  // Helper para verificar se a partida (ou seus times) já foi utilizada em outro bilhete do dia
  const isMatchAlreadyUsedInOtherBet = React.useCallback(
    (m: Match): boolean => {
      // 1. Por ID da partida
      if (usedInOtherBets.usedMatchIds.has(String(m.id))) {
        return true;
      }
      // 2. Por nome dos times
      const t1 = normalizeTeamName(m.team1);
      const t2 = normalizeTeamName(m.team2);
      if (t1 && usedInOtherBets.usedTeams.has(t1)) return true;
      if (t2 && usedInOtherBets.usedTeams.has(t2)) return true;
      return false;
    },
    [usedInOtherBets]
  );

  // Total de partidas que qualificam antes de filtrar as já utilizadas
  const totalQualifyingMatches = React.useMemo(() => {
    return matchesWithStreakInfo.filter((item) => item.qualifies);
  }, [matchesWithStreakInfo]);

  // Matches filtrados estritamente pela regra do foguinho E excluindo jogos já usados em outros bilhetes da data
  const streakMatches = React.useMemo(() => {
    return matchesWithStreakInfo
      .filter((item) => {
        if (!item.qualifies || !item.hasFireStreak) return false;
        if (quickFilter === 'foguinho') {
          if (fireCountFilter === 2) {
            return (item.isFav1 && item.streakFire1 === 2) || (item.isFav2 && item.streakFire2 === 2);
          }
          if (fireCountFilter === 3) {
            return (item.isFav1 && item.streakFire1 >= 3) || (item.isFav2 && item.streakFire2 >= 3);
          }
          return true;
        }
        return true;
      })
      .filter((item) => !isMatchAlreadyUsedInOtherBet(item.match));
  }, [matchesWithStreakInfo, isMatchAlreadyUsedInOtherBet, quickFilter, fireCountFilter]);

  // Quantidade de jogos ocultados por já estarem em outros bilhetes salvos desta data
  const hiddenMatchesCount = React.useMemo(() => {
    return matchesWithStreakInfo.filter(
      (item) => item.qualifies && isMatchAlreadyUsedInOtherBet(item.match)
    ).length;
  }, [matchesWithStreakInfo, isMatchAlreadyUsedInOtherBet]);

  // Displayed match items (exibe estritamente apenas partidas que se qualificam para o status Foguinho)
  const displayedMatchItems = React.useMemo(() => {
    return streakMatches;
  }, [streakMatches]);

  const displayedMatchIdsKey = React.useMemo(() => {
    return streakMatches.map((item) => item.match.id).sort().join(',') + '_' + date;
  }, [streakMatches, date]);

  // Carrega disponibilidade das casas de apostas (Bet365 / Betano para Total de Gols 1.5)
  useEffect(() => {
    if (!isOpen || streakMatches.length === 0) return;
    let isCancelled = false;

    // Apenas partidas que ainda não possuem status em cache
    const missing = streakMatches.filter((item) => !oddsAvailability[item.match.id]);
    if (missing.length === 0) return;

    const matchesPayload = missing.map((item) => ({
      id: item.match.id,
      team1: item.match.team1,
      team2: item.match.team2,
      leagueName: item.match.leagueName,
      date: date,
    }));

    fetch('/api/odds-availability/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matches: matchesPayload }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isCancelled) return;
        if (data && data.success && data.availability) {
          setOddsAvailability((prev) => ({ ...prev, ...data.availability }));
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.warn('Erro ao verificar disponibilidade de odds:', err);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [isOpen, displayedMatchIdsKey]);

  // Pre-resolve official results for instant lookup
  const officialResultsMap = React.useMemo(() => {
    const map: Record<string, any> = {};
    streakMatches.forEach((item) => {
      map[item.match.id] = resolveOfficialMatchResult(item.match, allAvailableMatches, combinedRawMatches);
    });
    return map;
  }, [streakMatches, allAvailableMatches, combinedRawMatches]);

  // Handle toggling a match in the selection (up to 5 matches) - Immediate synchronous execution
  const handleToggleMatch = useCallback((match: Match) => {
    setSelectedMatchIds((prevIds) => {
      const isSelected = prevIds.includes(match.id);
      let nextIds: string[];

      if (isSelected) {
        nextIds = prevIds.filter((id) => id !== match.id);
      } else {
        const matchItem = matchesWithStreakInfo.find((item) => String(item.match.id) === String(match.id));
        if (!matchItem || !matchItem.hasFireStreak) {
          return prevIds;
        }
        if (prevIds.length >= 5) {
          alert('Você pode selecionar no máximo 5 jogos para uma aposta.');
          return prevIds;
        }
        nextIds = [...prevIds, match.id];
      }

      if (nextIds.length === 0) {
        setTitle('');
        setLegs([]);
        return nextIds;
      }

      const selectedList = allAvailableMatches.filter((m) => nextIds.includes(m.id));
      const autoTitle = selectedList.map((m) => `${m.team1} x ${m.team2}`).join(' + ');
      setTitle(autoTitle);

      const nextFormat: BetFormat = nextIds.length > 1 ? 'Múltipla' : 'Simples';
      setFormat(nextFormat);

      setLegs((prevLegs) => {
        const nextLegs: BetLeg[] = selectedList.map((m) => {
          const existing = prevLegs.find((l) => l.id === m.id || l.matchId === m.id);
          const official = resolveOfficialMatchResult(m, allAvailableMatches, combinedRawMatches);
          const defaultMarket = existing?.market || 'OVER_1_5';
          const meta = getMarketMetadata(defaultMarket, m.team1, m.team2);
          const autoStatus = evaluateLegResult(defaultMarket, official.homeScore, official.awayScore, official.status);
          const isFinished = official.isFinished;
          const settledScore: [number, number] | null =
            isFinished && official.homeScore !== undefined && official.awayScore !== undefined
              ? [official.homeScore, official.awayScore]
              : null;

          return {
            id: m.id,
            matchId: official.matchId || m.id,
            matchTitle: `${m.team1} x ${m.team2}`,
            team1: m.team1,
            team2: m.team2,
            date: m.date || date,
            market: defaultMarket,
            marketLabel: meta.marketLabel,
            line: meta.line,
            targetSide: meta.targetSide,
            status: autoStatus,
            score: official.scoreObj || (m.score && m.score.ft ? { ft: m.score.ft } : null),
            settledScore,
            matchStatus: official.status || m.status || 'scheduled',
            time: m.time,
            league: (m as any).leagueName || (m as any).competition || (m as any).league || existing?.league || '',
          };
        });

        const autoBetStatus = evaluateBetStatusFromLegs(nextLegs, status, nextFormat);
        setStatus(autoBetStatus);
        return nextLegs;
      });

      return nextIds;
    });
  }, [matchesWithStreakInfo, allAvailableMatches, combinedRawMatches, date, status]);

  if (!isOpen) return null;

  // Automatic calculations
  const parsedOdd = parseFloat(odd.replace(',', '.')) || 0;
  const parsedAmount = parseFloat(amount.replace(',', '.')) || 0;
  const potentialReturn = Math.max(0, parsedAmount * parsedOdd);

  // Profit calculation based on status (Centralized formula)
  const calculatedProfit = calculateBetProfit(status, parsedAmount, parsedOdd);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || legs.map((l) => `${l.team1} x ${l.team2}`).join(' + ');
    if (legs.length === 0) {
      alert('Por favor, selecione ao menos uma partida para o bilhete!');
      return;
    }

    const betItem: BetItem = {
      id: initialBet?.id || `bet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date,
      bookmaker,
      title: finalTitle,
      odd: parsedOdd,
      sport,
      status,
      format,
      amount: parsedAmount,
      potentialReturn,
      profit: calculatedProfit,
      legs,
      createdAt: initialBet?.createdAt || new Date().toISOString(),
    };

    onSave(betItem);
    onClose();
  };

  const handleDeleteClick = () => {
    if (!initialBet || !onDelete) return;
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    setIsDeleting(true);
    try {
      onDelete(initialBet.id);
      onClose();
    } catch (err) {
      console.error('Erro ao excluir aposta:', err);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto select-none">
      <div 
        id="modal-bet-container"
        className="bg-[#121214] border border-[#232328] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 my-4 sm:my-8 flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#222226] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
              {isEditing ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white uppercase font-sans">
                {isEditing ? 'EDITAR APOSTA' : 'ADICIONAR APOSTA'}
              </h2>
              <p className="text-[11px] text-zinc-400">
                Sincronizado com os jogos e favoritos do dia
              </p>
            </div>
          </div>
          <button
            id="btn-close-bet-modal"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable */}
        <form onSubmit={handleFormSubmit} className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          
          {/* Row 1: DATA & CASA DE APOSTAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-lime-400" />
                Data do Jogo
              </label>
              <input
                id="input-bet-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-[#18181c] border border-[#2c2c34] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Casa de Apostas
              </label>
              <select
                id="select-bet-bookmaker"
                value={bookmaker}
                onChange={(e) => setBookmaker(e.target.value as BetBookmaker)}
                className="w-full bg-[#18181c] border border-[#2c2c34] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none transition-all font-medium cursor-pointer"
              >
                <option value="Betano">Betano</option>
                <option value="Bet365">Bet365</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC SYNC SECTION: JOGOS DOS TIMES FAVORITOS COM FOGUINHO (UNDER 1.5) */}
          <div className="bg-[#151518] border border-[#26262e] rounded-xl p-3 sm:p-4 space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-1 border-b border-[#26262e]">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                <span className="break-words">
                  Jogos dos Favoritos ({date.split('-').reverse().join('/')})
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Filtro Foguinho com seletor de quantidade de foguinhos */}
                <div className="flex items-center gap-1 bg-[#1a1a22] p-0.5 rounded-lg border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      setQuickFilter((prev) => {
                        if (prev === 'foguinho') {
                          setFireCountFilter(0);
                          return null;
                        }
                        return 'foguinho';
                      });
                    }}
                    className={`h-7 px-2 rounded-md text-xs font-black flex items-center gap-1 transition-all select-none active:scale-95 cursor-pointer border ${
                      quickFilter === 'foguinho'
                        ? 'bg-amber-950/70 text-amber-300 border-amber-500 shadow-sm shadow-amber-500/25'
                        : 'bg-transparent text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-[#22222b]'
                    }`}
                    title="Filtrar por método do Foguinho (🔥 Under 1.5)"
                  >
                    <span>🔥</span>
                    <span className="text-[10px] font-bold">Foguinho</span>
                  </button>

                  {/* Seletor específico da quantidade de foguinhos (2 ou 3) */}
                  {quickFilter === 'foguinho' && (
                    <div className="flex items-center gap-0.5 pl-1 border-l border-zinc-700/60 animate-fade-in">
                      {[
                        { label: 'Todos', count: 0 },
                        { label: '2 🔥', count: 2 },
                        { label: '3+ 🔥', count: 3 },
                      ].map((opt) => (
                        <button
                          key={opt.count}
                          type="button"
                          onClick={() => setFireCountFilter(opt.count)}
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition-all cursor-pointer ${
                            fireCountFilter === opt.count
                              ? 'bg-amber-400 text-black shadow-xs'
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {hiddenMatchesCount > 0 && (
                  <span
                    className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0"
                    title={`${hiddenMatchesCount} ${
                      hiddenMatchesCount === 1 ? 'jogo já utilizado' : 'jogos já utilizados'
                    } em outros bilhetes deste dia foram ocultados para evitar duplicidade.`}
                  >
                    <span>🔒</span>
                    <span>{hiddenMatchesCount}</span>
                  </span>
                )}
                <span className="text-[10px] font-bold text-zinc-300 bg-[#202026] px-2.5 py-1 rounded-full border border-zinc-700 shrink-0">
                  {selectedMatchIds.length}/5 selecionados
                </span>
              </div>
            </div>

            {isMatchesLoading ? (
              <div className="py-4 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Carregando partidas e sincronizando histórico dos times...</span>
              </div>
            ) : displayedMatchItems.length === 0 ? (
              <div className="p-3.5 rounded-xl bg-[#1a1a20] text-center space-y-2 border border-[#292934]">
                {hiddenMatchesCount > 0 ? (
                  <>
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400">
                      <span>🔒</span>
                      <span>
                        {hiddenMatchesCount === 1
                          ? 'O jogo qualificado desta data já foi adicionado a outro bilhete salvo!'
                          : 'Todos os jogos qualificados desta data já foram adicionados a outros bilhetes salvos!'}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Para não repetir jogos no mesmo dia, os {hiddenMatchesCount}{' '}
                      {hiddenMatchesCount === 1 ? 'jogo anterior foi ocultado' : 'jogos anteriores foram ocultados'}. Você pode selecionar outra data acima ou adicionar um confronto manual.
                    </p>
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-300 py-1">
                    {quickFilter === 'foguinho' && fireCountFilter > 0 ? (
                      <span>
                        {fireCountFilter === 2
                          ? 'Nenhum clube favorito com sequência de 2 foguinhos para esta data.'
                          : 'Nenhum clube favorito com sequência de 3+ foguinhos para esta data.'}
                      </span>
                    ) : (
                      <span>Nenhum clube favorito com status Foguinho para esta data.</span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">

                <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
                  {displayedMatchItems.map((item, idx) => (
                    <MatchSelectionRow
                      key={`${item.match.id}_${idx}`}
                      item={item}
                      isChecked={selectedMatchIds.includes(item.match.id)}
                      odds={oddsAvailability[item.match.id]}
                      official={officialResultsMap[item.match.id] || {}}
                      onToggle={handleToggleMatch}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Box: SELEÇÕES DA APOSTA (Exibição limpa, compacta e sem redundância) */}
          {legs.length > 0 && (
            <div className="bg-[#151519] border border-[#272732] rounded-xl p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <span>⚡</span>
                  <span>Seleções da Aposta ({legs.length} {legs.length === 1 ? 'partida' : 'partidas'})</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMatchIds([]);
                    setLegs([]);
                    setTitle('');
                  }}
                  className="text-[10px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Limpar seleção
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-0.5">
                {legs.map((leg, idx) => {
                  const options = getMarketOptionsForMatch(leg.team1, leg.team2);
                  return (
                    <LegSelectionRow
                      key={`${leg.id || leg.matchId || 'leg'}_${idx}`}
                      leg={leg}
                      idx={idx}
                      options={options}
                      onMarketChange={handleMarketChange}
                      onTimeChange={handleTimeChange}
                      onLegStatusChange={handleLegStatusChange}
                      onRemoveLeg={handleRemoveLeg}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* DADOS DA APOSTA */}
          <div className="bg-[#17171b] border border-[#2a2a32] rounded-xl p-3.5 sm:p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* ODD */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Cotação (ODD)
                </label>
                <input
                  id="input-bet-odd"
                  type="text"
                  inputMode="decimal"
                  placeholder="2,00"
                  value={odd}
                  onChange={(e) => setOdd(e.target.value)}
                  required
                  className="w-full bg-[#111113] border border-[#2d2d35] focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none transition-all"
                />
              </div>

              {/* Valor da Aposta */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Valor da Aposta
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-zinc-500">
                    R$
                  </span>
                  <input
                    id="input-bet-amount"
                    type="text"
                    inputMode="decimal"
                    placeholder="20,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="w-full bg-[#111113] border border-[#2d2d35] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white font-bold outline-none transition-all"
                  />
                </div>
              </div>

              {/* Formato */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Formato
                </label>
                <div className="grid grid-cols-2 gap-1.5 h-[38px]">
                  <button
                    type="button"
                    onClick={() => setFormat('Simples')}
                    className={`rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      format === 'Simples'
                        ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                        : 'bg-[#111113] border-[#2d2d35] text-zinc-400 hover:text-white'
                    }`}
                  >
                    Simples
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('Múltipla')}
                    className={`rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      format === 'Múltipla'
                        ? 'bg-blue-950/60 border-blue-500 text-blue-200'
                        : 'bg-[#111113] border-[#2d2d35] text-zinc-400 hover:text-white'
                    }`}
                  >
                    Múltipla
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#25252e]">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Esporte
                </label>
                <select
                  id="select-bet-sport"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full bg-[#111113] border border-[#2d2d35] focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer font-medium"
                >
                  <option value="Futebol">⚽ Futebol</option>
                  <option value="Basquete">🏀 Basquete</option>
                  <option value="Tênis">🎾 Tênis</option>
                  <option value="E-Sports">🎮 E-Sports</option>
                  <option value="Vôlei">🏐 Vôlei</option>
                  <option value="MMA / UFC">🥊 MMA / UFC</option>
                  <option value="Outros">🎯 Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Estado Geral (Status)
                </label>
                {legs.length > 0 ? (
                  <div className="w-full bg-[#111113] border border-[#2d2d35] rounded-xl px-3 py-2 text-xs flex items-center justify-between">
                    <span className={`font-bold flex items-center gap-1.5 ${
                      status === 'Ganha'
                        ? 'text-emerald-400'
                        : status === 'Perdida'
                        ? 'text-rose-400'
                        : status === 'Reembolsada'
                        ? 'text-zinc-300'
                        : 'text-amber-400'
                    }`}>
                      {status === 'Ganha' && '✅ Ganha'}
                      {status === 'Perdida' && '❌ Perdida'}
                      {status === 'Reembolsada' && '🔄 Reembolsada'}
                      {status === 'Pendente' && '⏳ Pendente'}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-semibold uppercase">
                      Automático
                    </span>
                  </div>
                ) : (
                  <select
                    id="select-bet-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BetStatus)}
                    className="w-full bg-[#111113] border border-[#2d2d35] focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer font-bold"
                  >
                    <option value="Pendente">⏳ Pendente</option>
                    <option value="Ganha">✅ Ganha</option>
                    <option value="Perdida">❌ Perdida</option>
                    <option value="Reembolsada">🔄 Reembolsada</option>
                    <option value="Cancelada">🚫 Cancelada</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Green Box: SOMA AUTOMÁTICA (RETORNO) & LUCRO AUTOMÁTICO */}
          <div className="bg-[#141d14] border border-[#284428] rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e]">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  RETORNO POTENCIAL
                </span>
                <span className="text-sm sm:text-base font-black text-[#ccff00] font-sans">
                  {potentialReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} R$
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                LUCRO ESTIMADO
              </span>
              <span
                className={`text-sm sm:text-base font-black font-sans ${
                  status === 'Ganha'
                    ? 'text-emerald-400'
                    : status === 'Perdida'
                    ? 'text-rose-400'
                    : 'text-zinc-400'
                }`}
              >
                {status === 'Ganha' && '+'}
                {calculatedProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} R$
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#222226] shrink-0">
            {isEditing && onDelete ? (
              <button
                type="button"
                id="btn-delete-bet"
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  deleteConfirm
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                    : 'bg-rose-950/20 text-rose-400 hover:text-white border-rose-900/40 hover:bg-rose-600'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" />
                  {deleteConfirm ? 'Confirmar?' : 'Excluir'}
                </span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-cancel-bet"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-300 hover:text-white bg-[#18181c] hover:bg-[#222228] border border-[#2c2c34] transition-all cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                id="btn-submit-bet"
                className="px-4 sm:px-5 py-2 rounded-xl text-xs font-black text-black bg-[#ccff00] hover:bg-[#b8e600] active:scale-98 shadow-md transition-all cursor-pointer uppercase tracking-wider font-sans"
              >
                {isEditing ? 'SALVAR' : 'ADICIONAR'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
