import React, { useState, useEffect } from 'react';
import { X, Calendar, Calculator, Plus, Edit2, Trash2, Check, Star, RefreshCw } from 'lucide-react';
import { BetItem, BetStatus, BetFormat, BetBookmaker, Match, BetLeg, BetLegStatus } from '../types';
import { TeamCrest } from './TeamCrest';
import { isMatchInFavorites } from '../data/curatedSchedule';
import { isTeamNameInFavorites, USER_FAVORITE_CLUBS_DATA } from '../data/favoriteClubs';

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bet: BetItem) => void;
  onDelete?: (id: string) => void;
  initialBet?: BetItem | null;
}

export const BetModal: React.FC<BetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialBet,
}) => {
  const isEditing = !!initialBet;

  // Form states
  const [date, setDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
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
  const [userFavorites, setUserFavorites] = useState<{ id: number; name: string; country?: string; league?: string }[]>(USER_FAVORITE_CLUBS_DATA);
  const [legs, setLegs] = useState<BetLeg[]>([]);

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

  // Sync initial values when modal opens or initialBet changes
  useEffect(() => {
    if (initialBet) {
      setDate(initialBet.date || new Date().toISOString().split('T')[0]);
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
      const todayIso = new Date().toISOString().split('T')[0];
      setDate(todayIso);
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
  }, [initialBet, isOpen]);

  // Sync legs when selectedMatchIds changes from dayMatches
  useEffect(() => {
    if (selectedMatchIds.length > 0 && dayMatches.length > 0) {
      const selectedList = dayMatches.filter((m) => selectedMatchIds.includes(m.id));
      setLegs((prevLegs) => {
        return selectedList.map((m) => {
          const existing = prevLegs.find((l) => l.id === m.id);
          return {
            id: m.id,
            matchTitle: `${m.team1} x ${m.team2}`,
            team1: m.team1,
            team2: m.team2,
            status: existing ? existing.status : 'pending',
          };
        });
      });
    } else if (selectedMatchIds.length === 0 && !initialBet) {
      // If user cleared selection and not editing
      if (dayMatches.length > 0 && legs.length > 0 && !initialBet) {
        // keep or reset if desired
      }
    }
  }, [selectedMatchIds, dayMatches]);

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
          setDayMatches(data.matches);
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

  // Helper to check if match contains a favorite team
  const checkIsFavorite = React.useCallback((m: Match, favList: typeof USER_FAVORITE_CLUBS_DATA) => {
    if (!m) return false;
    const list = favList && favList.length > 0 ? favList : USER_FAVORITE_CLUBS_DATA;
    
    // Check IDs
    if (m.team1Id && list.some((f) => Number(f.id) === Number(m.team1Id))) return true;
    if (m.team2Id && list.some((f) => Number(f.id) === Number(m.team2Id))) return true;

    // Check team names with isTeamNameInFavorites
    return isTeamNameInFavorites(m.team1, list) || isTeamNameInFavorites(m.team2, list);
  }, []);

  const favoriteMatches = React.useMemo(() => {
    if (!dayMatches.length) return [];
    return dayMatches.filter((m) => checkIsFavorite(m, userFavorites));
  }, [dayMatches, userFavorites, checkIsFavorite]);

  const hasFavoriteMatches = favoriteMatches.length > 0;

  const relevantMatches = React.useMemo(() => {
    if (!dayMatches.length) return [];
    if (hasFavoriteMatches) return favoriteMatches;
    return dayMatches.slice(0, 15);
  }, [dayMatches, hasFavoriteMatches, favoriteMatches]);

  // Handle toggling a match in the selection (up to 5 matches)
  const handleToggleMatch = (match: Match) => {
    const isSelected = selectedMatchIds.includes(match.id);
    let nextIds: string[];

    if (isSelected) {
      nextIds = selectedMatchIds.filter((id) => id !== match.id);
    } else {
      if (selectedMatchIds.length >= 5) {
        alert('Você pode selecionar no máximo 5 jogos para uma aposta.');
        return;
      }
      nextIds = [...selectedMatchIds, match.id];
    }

    setSelectedMatchIds(nextIds);

    // Update Format & Title automatically, but DO NOT touch odd!
    if (nextIds.length === 0) {
      return;
    }

    const selectedList = dayMatches.filter((m) => nextIds.includes(m.id));
    const autoTitle = selectedList.map((m) => `${m.team1} x ${m.team2}`).join(' + ');
    setTitle(autoTitle);

    if (nextIds.length === 1) {
      setFormat('Simples');
    } else {
      setFormat('Múltipla');
    }
  };

  if (!isOpen) return null;

  // Automatic calculations
  const parsedOdd = parseFloat(odd.replace(',', '.')) || 0;
  const parsedAmount = parseFloat(amount.replace(',', '.')) || 0;
  const potentialReturn = Math.max(0, parsedAmount * parsedOdd);

  // Profit calculation based on status
  let calculatedProfit = 0;
  if (status === 'Ganha') {
    calculatedProfit = potentialReturn - parsedAmount;
  } else if (status === 'Perdida') {
    calculatedProfit = -parsedAmount;
  } else if (status === 'Reembolsada') {
    calculatedProfit = 0;
  } else {
    // Pendente ou Cancelada
    calculatedProfit = 0;
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, informe o título da aposta ou selecione os jogos');
      return;
    }

    const betItem: BetItem = {
      id: initialBet?.id || `bet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date,
      bookmaker,
      title: title.trim(),
      odd: parsedOdd,
      sport,
      status,
      format,
      amount: parsedAmount,
      potentialReturn,
      profit: calculatedProfit,
      legs: legs.length > 0 ? legs : (initialBet?.legs || []),
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

          {/* DYNAMIC SYNC SECTION: JOGOS DOS TIMES FAVORITOS NA DATA */}
          <div className="bg-[#151518] border border-[#26262e] rounded-xl p-3 sm:p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                <Star className="w-4 h-4 fill-amber-400 shrink-0" />
                <span className="break-words">Jogos dos Favoritos ({date.split('-').reverse().join('/')})</span>
              </div>
              <span className="self-start sm:self-auto text-[10px] font-bold text-zinc-300 bg-[#202026] px-2.5 py-1 rounded-full border border-zinc-700 shrink-0">
                {selectedMatchIds.length}/5 selecionados
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed">
              {hasFavoriteMatches
                ? 'Selecione de 1 a 5 jogos para compor a sua aposta Simples ou Múltipla:'
                : 'Nenhum clube favorito joga nesta data. Você pode selecionar jogos do dia abaixo:'}
            </p>

            {isMatchesLoading ? (
              <div className="py-4 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Carregando partidas da data...</span>
              </div>
            ) : relevantMatches.length === 0 ? (
              <div className="p-3 rounded-lg bg-[#1a1a20] text-center text-[11px] text-zinc-400 border border-[#292934]">
                Nenhuma partida encontrada nesta data. Digite o título manualmente abaixo.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-52 overflow-y-auto pr-1">
                {relevantMatches.map((m) => {
                  const isChecked = selectedMatchIds.includes(m.id);
                  const favList = userFavorites && userFavorites.length > 0 ? userFavorites : USER_FAVORITE_CLUBS_DATA;
                  const isFav1 = (m.team1Id && favList.some(f => Number(f.id) === Number(m.team1Id))) || isTeamNameInFavorites(m.team1, favList);
                  const isFav2 = (m.team2Id && favList.some(f => Number(f.id) === Number(m.team2Id))) || isTeamNameInFavorites(m.team2, favList);

                  return (
                    <div
                      key={m.id}
                      onClick={() => handleToggleMatch(m)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 text-left ${
                        isChecked
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-sm'
                          : 'bg-[#1a1a20] hover:bg-[#22222a] border-[#292934]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {/* Checkbox indicator */}
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-400 text-black'
                              : 'border-zinc-600 bg-[#25252e]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        {/* Teams */}
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
                            <span className={isFav1 ? 'text-[#ccff00] font-black flex items-center gap-1 truncate' : 'text-zinc-100 truncate'}>
                              {isFav1 && <span className="text-amber-400 font-normal shrink-0">★</span>}
                              <span className="truncate">{m.team1}</span>
                            </span>
                            <span className="text-zinc-500 text-[10px] font-normal mx-0.5 shrink-0">vs</span>
                            <span className={isFav2 ? 'text-[#ccff00] font-black flex items-center gap-1 truncate' : 'text-zinc-100 truncate'}>
                              {isFav2 && <span className="text-amber-400 font-normal shrink-0">★</span>}
                              <span className="truncate">{m.team2}</span>
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-400 truncate mt-0.5">
                            {m.leagueName || 'Liga'} • {m.time || '16:00'}
                          </span>
                        </div>
                      </div>

                      {/* Time pill */}
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/50 shrink-0">
                        {m.time || '16:00'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Box: SELEÇÃO DA APOSTA */}
          <div className="bg-[#17171b] border border-[#2a2a32] rounded-xl p-3.5 sm:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-400 uppercase tracking-wider">
                <span>▲</span> DETALHES DA SELEÇÃO
              </div>
              {selectedMatchIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedMatchIds([])}
                  className="text-[10px] text-zinc-400 hover:text-white"
                >
                  Limpar seleção
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Título da Aposta (Automático ou Personalizado)
                </label>
                <input
                  id="input-bet-title"
                  type="text"
                  placeholder="Ex: Real Madrid x Celta Vigo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-[#111113] border border-[#2d2d35] focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all font-medium"
                />
              </div>

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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Esporte
                </label>
                <select
                  id="select-bet-sport"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full bg-[#111113] border border-[#2d2d35] focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition-all cursor-pointer font-medium"
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
                  Estado (Status)
                </label>
                <select
                  id="select-bet-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as BetStatus)}
                  className="w-full bg-[#111113] border border-[#2d2d35] focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition-all cursor-pointer font-bold"
                >
                  <option value="Pendente">⏳ Pendente</option>
                  <option value="Ganha">✅ Ganha</option>
                  <option value="Perdida">❌ Perdida</option>
                  <option value="Reembolsada">🔄 Reembolsada</option>
                  <option value="Cancelada">🚫 Cancelada</option>
                </select>
              </div>
            </div>

            {/* LEGS / PERNAS RESULT PICKER - 100% RESPONSIVE FOR MOBILE & DESKTOP */}
            {legs.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#25252e] space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Identificar Green / Red por Jogo ({legs.length} {legs.length === 1 ? 'perna' : 'pernas'})
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Defina o resultado de cada partida individualmente
                  </span>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-0.5">
                  {legs.map((leg, idx) => (
                    <div
                      key={leg.id || idx}
                      className="bg-[#111113] border border-[#262630] rounded-xl p-3 flex flex-col gap-2.5 transition-all"
                    >
                      {/* Match title full width & readable without truncation */}
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-[#22222a] border border-zinc-700 text-zinc-300 text-[10px] font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-white leading-tight break-words flex-1">
                          {leg.matchTitle || `${leg.team1} x ${leg.team2}`}
                        </span>
                      </div>

                      {/* 4 Action Buttons Grid - perfectly sized and never cut off */}
                      <div className="grid grid-cols-4 gap-1.5 w-full">
                        <button
                          type="button"
                          onClick={() => {
                            const nextLegs = [...legs];
                            nextLegs[idx] = { ...leg, status: 'green' };
                            setLegs(nextLegs);
                          }}
                          className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 min-h-[38px] ${
                            leg.status === 'green'
                              ? 'bg-emerald-600 text-white shadow-md font-black ring-1 ring-emerald-400'
                              : 'bg-[#1a1a22] text-zinc-400 hover:text-emerald-400 border border-[#282834]'
                          }`}
                          title="Green (Acertou)"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                          <span>Green</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const nextLegs = [...legs];
                            nextLegs[idx] = { ...leg, status: 'red' };
                            setLegs(nextLegs);
                          }}
                          className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 min-h-[38px] ${
                            leg.status === 'red'
                              ? 'bg-rose-600 text-white shadow-md font-black ring-1 ring-rose-400'
                              : 'bg-[#1a1a22] text-zinc-400 hover:text-rose-400 border border-[#282834]'
                          }`}
                          title="Red (Errou)"
                        >
                          <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0"></span>
                          <span>Red</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const nextLegs = [...legs];
                            nextLegs[idx] = { ...leg, status: 'pending' };
                            setLegs(nextLegs);
                          }}
                          className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 min-h-[38px] ${
                            leg.status === 'pending'
                              ? 'bg-amber-600 text-white shadow-md font-black ring-1 ring-amber-400'
                              : 'bg-[#1a1a22] text-zinc-400 hover:text-amber-400 border border-[#282834]'
                          }`}
                          title="Pendente"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                          <span>Pend.</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const nextLegs = [...legs];
                            nextLegs[idx] = { ...leg, status: 'void' };
                            setLegs(nextLegs);
                          }}
                          className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 min-h-[38px] ${
                            leg.status === 'void'
                              ? 'bg-zinc-600 text-white shadow-md font-black ring-1 ring-zinc-400'
                              : 'bg-[#1a1a22] text-zinc-400 hover:text-zinc-200 border border-[#282834]'
                          }`}
                          title="Anulado / Void"
                        >
                          <span className="w-2 h-2 rounded-full bg-zinc-400 shrink-0"></span>
                          <span>Anul.</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Formato da Aposta: Simples vs Múltipla */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Formato da Aposta
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="btn-format-simples"
                onClick={() => setFormat('Simples')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  format === 'Simples'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-sm'
                    : 'bg-[#18181c] border-[#2c2c34] text-zinc-400 hover:text-white hover:bg-[#202026]'
                }`}
              >
                <span>⌛</span> Simples
              </button>
              <button
                type="button"
                id="btn-format-multipla"
                onClick={() => setFormat('Múltipla')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  format === 'Múltipla'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-sm'
                    : 'bg-[#18181c] border-[#2c2c34] text-zinc-400 hover:text-white hover:bg-[#202026]'
                }`}
              >
                <span>⚡</span> Múltipla {selectedMatchIds.length > 1 && `(${selectedMatchIds.length} jogos)`}
              </button>
            </div>
          </div>

          {/* Valor da Aposta */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
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
                className="w-full bg-[#18181c] border border-[#2c2c34] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white font-bold outline-none transition-all"
              />
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
