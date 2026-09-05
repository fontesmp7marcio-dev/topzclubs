import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart3,
  Plus,
  Settings,
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Ban,
  Check,
} from 'lucide-react';
import { BetItem, BetStatus } from '../types';
import { BetModal } from './BetModal';

interface DayGroup {
  dayKey: string;
  dayLabel: string;
  dayProfit: number;
  items: BetItem[];
}

interface MonthGroup {
  monthKey: string;
  monthLabel: string;
  monthProfit: number;
  days: Record<string, DayGroup>;
}

interface BalancoViewProps {
  // Can receive initial data or handle own state
}

const LOCAL_STORAGE_BETS_KEY = 'topzclubs_balanco_bets_v1';
const LOCAL_STORAGE_BANKROLL_KEY = 'topzclubs_balanco_bankroll_v1';

export const BalancoView: React.FC<BalancoViewProps> = () => {
  // Bets and Bankroll State
  const [bets, setBets] = useState<BetItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BETS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Error reading bets from localStorage:', e);
    }
    // Clean initial state (zeroed, no February hardcoded entries)
    return [];
  });

  const [initialCapital, setInitialCapital] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BANKROLL_KEY);
      if (saved) {
        const val = parseFloat(saved);
        if (!isNaN(val)) return val;
      }
    } catch {}
    return 26.0;
  });

  // UI States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Todas');
  const [collapsedMonths, setCollapsedMonths] = useState<Record<string, boolean>>({});
  const [activeMenuBetId, setActiveMenuBetId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingBet, setEditingBet] = useState<BetItem | null>(null);
  const [isBankrollModalOpen, setIsBankrollModalOpen] = useState<boolean>(false);
  const [tempBankroll, setTempBankroll] = useState<string>('26,00');

  // Load bets and bankroll from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    async function loadSupabaseData() {
      try {
        const [betsRes, bankrollRes] = await Promise.all([
          fetch('/api/user-bets').then((r) => r.json()).catch(() => null),
          fetch('/api/user-bankroll').then((r) => r.json()).catch(() => null),
        ]);

        if (!isMounted) return;

        if (betsRes && betsRes.success && Array.isArray(betsRes.bets)) {
          setBets(betsRes.bets);
        }
        if (bankrollRes && bankrollRes.success && typeof bankrollRes.initialCapital === 'number') {
          setInitialCapital(bankrollRes.initialCapital);
        }
      } catch (e) {
        console.warn('Error loading balance data from Supabase:', e);
      }
    }

    loadSupabaseData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Save to localStorage on bets change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BETS_KEY, JSON.stringify(bets));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  }, [bets]);

  // Save bankroll to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BANKROLL_KEY, String(initialCapital));
    } catch (e) {}
  }, [initialCapital]);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Close row popup menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuBetId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // ==========================================
  // CALCULATIONS (STRICTLY RESPECTING USER RULES)
  // ==========================================
  // Rule 1: Apostas: Número total de apostas que você fez.
  // As apostas com um estado "Pendente" e "Cancelado" não são contabilizadas.
  //
  // Rule 2: Lucros: Cálculo do lucro da sua bankroll:
  // (Total de seus ganhos − Total de suas apostas) = Lucro
  // As apostas com um estado "Pendente" e "Cancelado" não são contabilizadas.
  //
  // Rule 3: ROI: (Lucros / Valor total) × 100 = ROI
  // As apostas com um estado "Pendente" e "Cancelado" não são contabilizadas.
  //
  // Rule 4: Progressão: (Lucros / Capital inicial) × 100 = Progressão
  const stats = useMemo(() => {
    const countedBets = bets.filter(
      (b) => b.status !== 'Pendente' && b.status !== 'Cancelada'
    );

    const totalBets = countedBets.length;

    let totalStake = 0;
    let totalWinnings = 0;
    let totalProfit = 0;

    for (const b of countedBets) {
      const amount = Number(b.amount) || 0;
      const odd = Number(b.odd) || 1;
      totalStake += amount;

      if (b.status === 'Ganha') {
        const win = amount * odd;
        totalWinnings += win;
        totalProfit += win - amount;
      } else if (b.status === 'Perdida') {
        totalWinnings += 0;
        totalProfit += -amount;
      } else if (b.status === 'Reembolsada') {
        totalWinnings += amount;
        totalProfit += 0;
      }
    }

    const roi = totalStake > 0 ? (totalProfit / totalStake) * 100 : 0;
    const progression = initialCapital > 0 ? (totalProfit / initialCapital) * 100 : 0;

    return {
      totalBets,
      totalProfit,
      roi,
      progression,
    };
  }, [bets, initialCapital]);

  // Filtered bets
  const filteredBets = useMemo(() => {
    return bets.filter((b) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.bookmaker.toLowerCase().includes(q) ||
        b.sport.toLowerCase().includes(q) ||
        b.status.toLowerCase().includes(q);

      // Status
      const matchStatus =
        selectedStatusFilter === 'Todas' || b.status === selectedStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [bets, searchQuery, selectedStatusFilter]);

  // Group bets by Month -> then by Day
  const groupedData: MonthGroup[] = useMemo(() => {
    // Sort bets descending by date
    const sorted = [...filteredBets].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const monthsMap: Record<string, MonthGroup> = {};

    const monthNames = [
      'JANEIRO',
      'FEVEREIRO',
      'MARÇO',
      'ABRIL',
      'MAIO',
      'JUNHO',
      'JULHO',
      'AGOSTO',
      'SETEMBRO',
      'OUTUBRO',
      'NOVEMBRO',
      'DEZEMBRO',
    ];

    const weekDays = [
      'DOMINGO',
      'SEGUNDA-FEIRA',
      'TERÇA-FEIRA',
      'QUARTA-FEIRA',
      'QUINTA-FEIRA',
      'SEXTA-FEIRA',
      'SÁBADO',
    ];

    // Helper for ISO week number
    function getWeekNumber(d: Date): number {
      const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = date.getUTCDay() || 7;
      date.setUTCDate(date.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    }

    for (const b of sorted) {
      const d = new Date(b.date + 'T12:00:00');
      const year = d.getFullYear();
      const monthIdx = d.getMonth();
      const monthKey = `${year}-${String(monthIdx + 1).padStart(2, '0')}`;
      const monthLabel = `${monthNames[monthIdx]} ${year}`;

      if (!monthsMap[monthKey]) {
        monthsMap[monthKey] = {
          monthKey,
          monthLabel,
          monthProfit: 0,
          days: {},
        };
      }

      // Profit of this bet
      let betProfit = 0;
      if (b.status === 'Ganha') {
        betProfit = (Number(b.amount) || 0) * ((Number(b.odd) || 1) - 1);
      } else if (b.status === 'Perdida') {
        betProfit = -(Number(b.amount) || 0);
      }

      monthsMap[monthKey].monthProfit += betProfit;

      const dayNum = d.getDate();
      const weekDayName = weekDays[d.getDay()];
      const weekNumber = getWeekNumber(d);
      const dayKey = b.date;
      const dayLabel = `SEMANA ${weekNumber} • ${weekDayName} ${String(dayNum).padStart(2, '0')}`;

      if (!monthsMap[monthKey].days[dayKey]) {
        monthsMap[monthKey].days[dayKey] = {
          dayKey,
          dayLabel,
          dayProfit: 0,
          items: [],
        };
      }

      monthsMap[monthKey].days[dayKey].dayProfit += betProfit;
      monthsMap[monthKey].days[dayKey].items.push(b);
    }

    return Object.values(monthsMap);
  }, [filteredBets]);

  // Handlers
  const handleSaveBet = async (bet: BetItem) => {
    // Optimistic local update
    setBets((prev) => {
      const idx = prev.findIndex((b) => b.id === bet.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = bet;
        return next;
      }
      return [bet, ...prev];
    });

    setNotification({
      message: `Aposta "${bet.title}" salva com sucesso!`,
      type: 'success',
    });

    // Sync with Supabase
    try {
      await fetch('/api/user-bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bet),
      });
    } catch (e) {
      console.warn('Error saving bet to Supabase:', e);
    }
  };

  const handleDeleteBet = async (betId: string) => {
    // 100% reliable local removal
    setBets((prev) => prev.filter((b) => b.id !== betId));
    setActiveMenuBetId(null);
    setNotification({
      message: 'Aposta excluída com sucesso!',
      type: 'info',
    });

    // Sync delete with Supabase
    try {
      await fetch(`/api/user-bets/${encodeURIComponent(betId)}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Error deleting bet from Supabase:', e);
    }
  };

  const handleToggleMonth = (monthKey: string) => {
    setCollapsedMonths((prev) => ({
      ...prev,
      [monthKey]: !prev[monthKey],
    }));
  };

  const handleSaveBankroll = async () => {
    const val = parseFloat(tempBankroll.replace(',', '.'));
    if (!isNaN(val) && val >= 0) {
      setInitialCapital(val);
      setIsBankrollModalOpen(false);
      setNotification({
        message: `Banca inicial ajustada para ${val.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })} R$`,
        type: 'success',
      });

      // Sync bankroll with Supabase
      try {
        await fetch('/api/user-bankroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initialCapital: val }),
        });
      } catch (e) {
        console.warn('Error saving bankroll to Supabase:', e);
      }
    }
  };

  return (
    <div id="balanco-financeiro-container" className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1e24] border border-emerald-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <span className="text-xs font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] shadow-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
              BALANÇO FINANCEIRO
            </h1>
            <p className="text-xs text-zinc-400 font-medium">
              Gerenciamento completo de entradas, ROI e evolução da sua banca
            </p>
          </div>
        </div>

        {/* Action Buttons: Banca Inicial & Adicionar Aposta */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Banca Inicial Pill */}
          <button
            id="btn-edit-bankroll"
            onClick={() => {
              setTempBankroll(initialCapital.toFixed(2).replace('.', ','));
              setIsBankrollModalOpen(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#18181c] hover:bg-[#202026] border border-[#2a2a32] text-zinc-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="Clique para alterar a banca inicial"
          >
            <span>💰</span>
            <span>
              Banca Inicial:{' '}
              <strong className="text-white">
                {initialCapital.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} R$
              </strong>
            </span>
            <Settings className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {/* Adicionar Aposta Button */}
          <button
            id="btn-open-add-bet-modal"
            onClick={() => {
              setEditingBet(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition-all cursor-pointer uppercase tracking-wider font-sans"
          >
            <Plus className="w-4 h-4" />
            <span>ADICIONAR APOSTA</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Card 1: APOSTAS */}
        <div 
          id="stat-card-apostas"
          className="bg-[#141416] border border-[#222226] p-4 sm:p-5 rounded-2xl relative group hover:border-[#32323a] transition-all"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">
              APOSTAS
            </span>
            <div className="relative group/tooltip">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover/tooltip:block w-48 p-2 bg-[#1f1f26] border border-[#33333d] text-[10px] text-zinc-300 rounded-lg shadow-xl z-30 pointer-events-none">
                Número total de apostas que você fez. As apostas com um estado "Pendente" e "Cancelado" não são contabilizadas.
              </div>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-400 font-sans">
            {stats.totalBets}
          </div>
        </div>

        {/* Card 2: LUCROS */}
        <div 
          id="stat-card-lucros"
          className="bg-[#141416] border border-[#222226] p-4 sm:p-5 rounded-2xl relative group hover:border-[#32323a] transition-all"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">
              LUCROS
            </span>
            <div className="relative group/tooltip">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover/tooltip:block w-52 p-2 bg-[#1f1f26] border border-[#33333d] text-[10px] text-zinc-300 rounded-lg shadow-xl z-30 pointer-events-none">
                Cálculo do lucro da sua bankroll: (Total de seus ganhos − Total de suas apostas) = Lucro. Pendentes e Canceladas não contam.
              </div>
            </div>
          </div>
          <div
            className={`text-2xl sm:text-3xl font-black font-sans ${
              stats.totalProfit > 0
                ? 'text-emerald-400'
                : stats.totalProfit < 0
                ? 'text-rose-500'
                : 'text-zinc-300'
            }`}
          >
            {stats.totalProfit > 0 && '+'}
            {stats.totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xs sm:text-sm font-bold ml-1 text-zinc-400">R$</span>
          </div>
        </div>

        {/* Card 3: ROI */}
        <div 
          id="stat-card-roi"
          className="bg-[#141416] border border-[#222226] p-4 sm:p-5 rounded-2xl relative group hover:border-[#32323a] transition-all"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">
              ROI
            </span>
            <div className="relative group/tooltip">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover/tooltip:block w-52 p-2 bg-[#1f1f26] border border-[#33333d] text-[10px] text-zinc-300 rounded-lg shadow-xl z-30 pointer-events-none">
                O ROI mede a relação entre os lucros obtidos e o valor total das apostas: (Lucros / Valor total) × 100.
              </div>
            </div>
          </div>
          <div
            className={`text-2xl sm:text-3xl font-black font-sans ${
              stats.roi > 0
                ? 'text-emerald-400'
                : stats.roi < 0
                ? 'text-rose-500'
                : 'text-zinc-300'
            }`}
          >
            {stats.roi > 0 && '+'}
            {stats.roi.toFixed(2)}
            <span className="text-xs sm:text-sm font-bold ml-0.5">%</span>
          </div>
        </div>

        {/* Card 4: PROGRESSÃO */}
        <div 
          id="stat-card-progressao"
          className="bg-[#141416] border border-[#222226] p-4 sm:p-5 rounded-2xl relative group hover:border-[#32323a] transition-all"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider">
              PROGRESSÃO
            </span>
            <div className="relative group/tooltip">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover/tooltip:block w-52 p-2 bg-[#1f1f26] border border-[#33333d] text-[10px] text-zinc-300 rounded-lg shadow-xl z-30 pointer-events-none">
                A progressão é calculada de acordo com a relação entre os lucros obtidos e o capital inicial: (Lucros / Capital inicial) × 100.
              </div>
            </div>
          </div>
          <div
            className={`text-2xl sm:text-3xl font-black font-sans ${
              stats.progression > 0
                ? 'text-emerald-400'
                : stats.progression < 0
                ? 'text-rose-500'
                : 'text-zinc-300'
            }`}
          >
            {stats.progression > 0 && '+'}
            {stats.progression.toFixed(2)}
            <span className="text-xs sm:text-sm font-bold ml-0.5">%</span>
          </div>
        </div>

      </div>

      {/* Search Bar & Status Filter Pills - 100% Responsive */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="input-search-bets"
            type="text"
            placeholder="Buscar aposta ou casa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141416] hover:bg-[#18181c] focus:bg-[#18181c] text-xs text-white placeholder-zinc-500 pl-9 pr-8 py-2.5 rounded-xl border border-[#242428] focus:border-zinc-600 outline-none transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills with Horizontal Scrolling & Touch Support */}
        <div className="w-full md:w-auto overflow-x-auto scrollbar-none flex items-center gap-2 py-1 px-1 -mx-1 touch-pan-x">
          {['Todas', 'Ganha', 'Perdida', 'Pendente', 'Reembolsada', 'Cancelada'].map((status) => {
            const isActive = selectedStatusFilter === status;
            return (
              <button
                key={status}
                id={`filter-pill-${status.toLowerCase()}`}
                onClick={() => setSelectedStatusFilter(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-white text-black border-white shadow-md'
                    : 'bg-[#141416] text-zinc-400 border-[#242428] hover:text-white hover:bg-[#1a1a1e]'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bets Grouped by Month & Days */}
      {groupedData.length === 0 ? (
        <div className="bg-[#121214] border border-[#222226] rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Nenhuma aposta cadastrada ainda
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Comece adicionando sua primeira aposta para gerenciar suas entradas, ROI e evolução financeira da sua banca.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingBet(null);
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Primeira Aposta</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedData.map((month) => {
            const isCollapsed = !!collapsedMonths[month.monthKey];
            const daysList: DayGroup[] = Object.values(month.days);

            return (
              <div key={month.monthKey} className="space-y-3">
                {/* Month Accordion Header */}
                <div
                  id={`month-header-${month.monthKey}`}
                  onClick={() => handleToggleMonth(month.monthKey)}
                  className="bg-[#121215] hover:bg-[#16161a] border border-[#232329] px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer select-none transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </span>
                    <h2 className="text-xs sm:text-sm font-black text-white tracking-wider uppercase font-sans">
                      {month.monthLabel}
                    </h2>
                  </div>

                  {/* Monthly Profit Badge */}
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-black tracking-tight font-sans border ${
                      month.monthProfit > 0
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                        : month.monthProfit < 0
                        ? 'bg-rose-950/40 text-rose-400 border-rose-800/50'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {month.monthProfit > 0 && '+'}
                    {month.monthProfit.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    R$
                  </span>
                </div>

                {/* Month Days Content */}
                {!isCollapsed && (
                  <div className="space-y-4 pl-0 sm:pl-2">
                    {daysList.map((day) => (
                      <div key={day.dayKey} className="space-y-2">
                        {/* Day / Week Header */}
                        <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 px-2 uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                            {day.dayLabel}
                          </span>
                          <span
                            className={`font-black font-sans ${
                              day.dayProfit > 0
                                ? 'text-emerald-400'
                                : day.dayProfit < 0
                                ? 'text-rose-400'
                                : 'text-zinc-500'
                            }`}
                          >
                            {day.dayProfit > 0 && '+'}
                            {day.dayProfit.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{' '}
                            R$
                          </span>
                        </div>

                        {/* Bet Items in this Day */}
                        <div className="space-y-2">
                          {day.items.map((bet) => {
                            const isMenuOpen = activeMenuBetId === bet.id;

                            return (
                              <div
                                key={bet.id}
                                id={`bet-row-${bet.id}`}
                                onDoubleClick={() => setEditingBet(bet)}
                                className="bg-[#121214] hover:bg-[#17171a] border border-[#222226] hover:border-zinc-700 p-3 sm:p-4 rounded-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group relative cursor-pointer"
                                title="Clique duplo para editar ou excluir esta aposta"
                              >
                                {/* Top Row: Menu, Badges, Status (Responsive Header) */}
                                <div className="flex items-center justify-between gap-2 w-full">
                                  <div className="flex items-center gap-2 min-w-0 flex-wrap">
                                    {/* 3 dots menu button */}
                                    <div className="relative shrink-0">
                                      <button
                                        id={`btn-menu-${bet.id}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveMenuBetId(isMenuOpen ? null : bet.id);
                                        }}
                                        className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                                        title="Opções da aposta"
                                      >
                                        <MoreVertical className="w-4 h-4" />
                                      </button>

                                      {/* Action Dropdown Menu */}
                                      {isMenuOpen && (
                                        <div
                                          onClick={(e) => e.stopPropagation()}
                                          className="absolute left-0 top-full mt-1 w-36 bg-[#1a1a20] border border-[#30303c] rounded-xl shadow-2xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100"
                                        >
                                          <button
                                            onClick={() => {
                                              setActiveMenuBetId(null);
                                              setEditingBet(bet);
                                            }}
                                            className="w-full px-3 py-2 text-left text-xs text-zinc-200 hover:bg-zinc-800 flex items-center gap-2 cursor-pointer font-medium"
                                          >
                                            <Edit2 className="w-3.5 h-3.5 text-sky-400" />
                                            <span>Editar Aposta</span>
                                          </button>
                                          <button
                                            onClick={() => handleDeleteBet(bet.id)}
                                            className="w-full px-3 py-2 text-left text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer font-medium"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Excluir Aposta</span>
                                          </button>
                                        </div>
                                      )}
                                    </div>

                                    {/* Formato Badge (Simples / Múltipla) */}
                                    <span
                                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 border ${
                                        bet.format === 'Múltipla'
                                          ? 'bg-blue-950/50 text-blue-300 border-blue-800/60'
                                          : 'bg-purple-950/50 text-purple-300 border-purple-800/60'
                                      }`}
                                    >
                                      {bet.format}
                                    </span>

                                    {/* Casa de Apostas Badge (Betano / Bet365) */}
                                    <span
                                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shrink-0 ${
                                        bet.bookmaker === 'Betano'
                                          ? 'bg-[#f97316] text-white shadow-xs'
                                          : 'bg-[#15803d] text-white shadow-xs'
                                      }`}
                                    >
                                      {bet.bookmaker}
                                    </span>
                                  </div>

                                  {/* Status Pill Badge */}
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0 ${
                                      bet.status === 'Ganha'
                                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 shadow-xs'
                                        : bet.status === 'Perdida'
                                        ? 'bg-rose-950/60 text-rose-300 border-rose-500/50 shadow-xs'
                                        : bet.status === 'Pendente'
                                        ? 'bg-amber-950/60 text-amber-300 border-amber-500/50 shadow-xs'
                                        : bet.status === 'Reembolsada'
                                        ? 'bg-zinc-800 text-zinc-300 border-zinc-600'
                                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                                    }`}
                                  >
                                    {bet.status}
                                  </span>
                                </div>

                                {/* Bet Title & Legs Section */}
                                <div className="space-y-1.5 w-full">
                                  <div className="text-xs sm:text-sm font-bold text-white leading-snug break-words">
                                    {bet.title}
                                  </div>

                                  {/* Render individual leg status tags if multiple legs */}
                                  {bet.legs && bet.legs.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                                      {bet.legs.map((leg, lIdx) => {
                                        const legStatus = leg.status || 'pending';
                                        return (
                                          <span
                                            key={leg.id || lIdx}
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                                              legStatus === 'green'
                                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                                                : legStatus === 'red'
                                                ? 'bg-rose-950/40 text-rose-300 border-rose-800/60'
                                                : legStatus === 'void'
                                                ? 'bg-zinc-800 text-zinc-300 border-zinc-600'
                                                : 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                                            }`}
                                          >
                                            <span className={`w-1.5 h-1.5 rounded-full ${
                                              legStatus === 'green'
                                                ? 'bg-emerald-400'
                                                : legStatus === 'red'
                                                ? 'bg-rose-400'
                                                : legStatus === 'void'
                                                ? 'bg-zinc-400'
                                                : 'bg-amber-400'
                                            }`} />
                                            <span className="truncate max-w-[150px]">
                                              {leg.matchTitle || `${leg.team1} x ${leg.team2}`}
                                            </span>
                                          </span>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>

                                {/* Bottom Stats Box: Grid on Mobile, Flex on Desktop */}
                                <div className="w-full md:w-auto bg-[#17171c] md:bg-transparent p-2.5 md:p-0 rounded-xl md:rounded-none border md:border-0 border-[#23232b] grid grid-cols-4 md:flex md:items-center md:justify-end gap-2 sm:gap-6 shrink-0">
                                  
                                  {/* COTAÇÃO */}
                                  <div className="text-center md:text-right">
                                    <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                                      COTAÇÃO
                                    </span>
                                    <span className="text-xs font-black text-white font-sans">
                                      {bet.odd.toFixed(2)}
                                    </span>
                                  </div>

                                  {/* VALOR */}
                                  <div className="text-center md:text-right">
                                    <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                                      VALOR
                                    </span>
                                    <span className="text-xs font-black text-white font-sans">
                                      {bet.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      <span className="text-[10px] text-zinc-400 font-bold ml-0.5">R$</span>
                                    </span>
                                  </div>

                                  {/* GANHO */}
                                  <div className="text-center md:text-right">
                                    <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                                      GANHO
                                    </span>
                                    <span
                                      className={`text-xs font-black font-sans ${
                                        bet.status === 'Ganha'
                                          ? 'text-emerald-400'
                                          : bet.status === 'Perdida'
                                          ? 'text-zinc-400'
                                          : 'text-zinc-300'
                                      }`}
                                    >
                                      {bet.status === 'Ganha'
                                        ? bet.potentialReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                                        : '0,00'}
                                      <span className="text-[10px] font-bold ml-0.5 text-zinc-500">R$</span>
                                    </span>
                                  </div>

                                  {/* LUCRO */}
                                  <div className="text-center md:text-right">
                                    <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                                      LUCRO
                                    </span>
                                    <span
                                      className={`text-xs font-black font-sans ${
                                        bet.status === 'Ganha'
                                          ? 'text-emerald-400'
                                          : bet.status === 'Perdida'
                                          ? 'text-rose-500'
                                          : 'text-zinc-400'
                                      }`}
                                    >
                                      {bet.status === 'Ganha' && '+'}
                                      {bet.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      <span className="text-[10px] font-bold ml-0.5 text-zinc-500">R$</span>
                                    </span>
                                  </div>

                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Bet Modal */}
      <BetModal
        isOpen={isAddModalOpen || !!editingBet}
        initialBet={editingBet}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingBet(null);
        }}
        onSave={handleSaveBet}
        onDelete={handleDeleteBet}
      />

      {/* Bankroll Capital Adjustment Modal */}
      {isBankrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#121214] border border-[#232328] rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                💰
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-tight">
                  Capital Inicial da Banca
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Usado para calcular a progressão percentual
                </p>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Valor da Banca Inicial (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-zinc-500">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={tempBankroll}
                  onChange={(e) => setTempBankroll(e.target.value)}
                  className="w-full bg-[#18181c] border border-[#2c2c34] focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-bold outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#222226]">
              <button
                onClick={() => setIsBankrollModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-300 hover:text-white bg-[#18181c] hover:bg-[#202026] border border-[#2c2c34] transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveBankroll}
                className="px-4 py-2 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all cursor-pointer uppercase tracking-wider"
              >
                Salvar Banca
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
