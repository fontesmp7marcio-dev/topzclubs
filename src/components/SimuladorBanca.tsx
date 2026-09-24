import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Percent,
  Sliders,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Calendar,
  Sparkles,
  Info,
  Equal,
  Plus as PlusIcon,
} from 'lucide-react';
import { BetItem } from '../types';

interface SimuladorBancaProps {
  bets: BetItem[];
  realInitialCapital: number;
  realStats: {
    totalBets: number;
    settledBets: number;
    wonBets: number;
    lostBets: number;
    pendingBets: number;
    totalProfit: number;
    roi: number;
    progression: number;
    currentBankroll: number;
  };
}

const LOCAL_STORAGE_SIM_CONFIG = 'topzclubs_simulador_config_v2';

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const SimuladorBanca: React.FC<SimuladorBancaProps> = ({
  bets,
  realInitialCapital,
  realStats,
}) => {
  // Configurações salvas no localStorage
  const [simInitialBankroll, setSimInitialBankroll] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SIM_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.bankroll === 'number' && parsed.bankroll > 0) return parsed.bankroll;
      }
    } catch {}
    return 500.0; // Padrão solicitado: Banca 500
  });

  const [fixedStakeAmount, setFixedStakeAmount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SIM_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.fixedStake === 'number' && parsed.fixedStake > 0) return parsed.fixedStake;
      }
    } catch {}
    return 50.0; // Padrão solicitado: Entrada 50
  });

  const [simOdd, setSimOdd] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SIM_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.odd === 'number' && parsed.odd > 1.0) return parsed.odd;
      }
    } catch {}
    return 1.8; // Padrão solicitado: Odd 1.80
  });

  // Filtro de mês: apenas meses ou todos
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [isTableExpanded, setIsTableExpanded] = useState<boolean>(false);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);

  // Salvar preferências no localStorage
  useEffect(() => {
    try {
      const config = {
        bankroll: simInitialBankroll,
        fixedStake: fixedStakeAmount,
        odd: simOdd,
      };
      localStorage.setItem(LOCAL_STORAGE_SIM_CONFIG, JSON.stringify(config));
    } catch {}
  }, [simInitialBankroll, fixedStakeAmount, simOdd]);

  // Extrair dinamicamente os meses presentes no histórico de apostas
  const availableMonths = useMemo(() => {
    const map = new Map<string, { key: string; label: string; count: number }>();

    bets.forEach((b) => {
      if (b.status === 'Ganha' || b.status === 'Perdida' || b.status === 'Reembolsada') {
        const dateStr = b.date || '';
        let ym = '';
        if (dateStr.length >= 7 && dateStr.includes('-')) {
          ym = dateStr.substring(0, 7);
        } else {
          ym = '2026-09';
        }

        if (!map.has(ym)) {
          const parts = ym.split('-');
          const year = parts[0];
          const monthIdx = parseInt(parts[1], 10) - 1;
          const label = `${MONTH_NAMES[monthIdx] || parts[1]} / ${year}`;
          map.set(ym, { key: ym, label, count: 0 });
        }
        const current = map.get(ym)!;
        current.count++;
      }
    });

    return Array.from(map.values()).sort((a, b) => b.key.localeCompare(a.key));
  }, [bets]);

  // Filtrar apenas apostas finalizadas (Ganha / Perdida / Reembolsada)
  const simulationBets = useMemo(() => {
    const settled = bets.filter(
      (b) => b.status === 'Ganha' || b.status === 'Perdida' || b.status === 'Reembolsada'
    );

    // Ordenar cronologicamente para a evolução da banca ser sequencial correta
    const sorted = [...settled].sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      if (dateA !== dateB) return dateA.localeCompare(dateB);
      return (a.createdAt || '').localeCompare(b.createdAt || '');
    });

    if (selectedMonth !== 'all') {
      return sorted.filter((b) => (b.date || '').startsWith(selectedMonth));
    }

    return sorted;
  }, [bets, selectedMonth]);

  // Motor de cálculo do Simulador
  const simulationResult = useMemo(() => {
    const stake = fixedStakeAmount > 0 ? fixedStakeAmount : 10;
    const odd = simOdd > 1 ? simOdd : 1.05;

    let currentBank = simInitialBankroll;
    let peakBank = simInitialBankroll;
    let maxDrawdownValue = 0;
    let maxDrawdownPercent = 0;
    let wonCount = 0;
    let lostCount = 0;
    let refundedCount = 0;

    let currentWinStreak = 0;
    let maxWinStreak = 0;
    let currentLossStreak = 0;
    let maxLossStreak = 0;

    // Ganho limpo de lucro por aposta ganha
    const profitPerWin = stake * (odd - 1);
    // Perda por aposta perdida
    const lossPerLoss = stake;

    const timeline: {
      step: number;
      bet: BetItem;
      stake: number;
      odd: number;
      profit: number;
      bankrollBefore: number;
      bankrollAfter: number;
      progressionPercent: number;
      isWin: boolean;
      isLoss: boolean;
    }[] = [];

    const chartPoints: { step: number; bankroll: number; label: string; profit: number }[] = [
      { step: 0, bankroll: simInitialBankroll, label: 'Início', profit: 0 },
    ];

    simulationBets.forEach((bet, idx) => {
      const bankBefore = currentBank;
      let stepProfit = 0;
      const isWin = bet.status === 'Ganha';
      const isLoss = bet.status === 'Perdida';
      const isRefund = bet.status === 'Reembolsada';

      if (isWin) {
        stepProfit = profitPerWin;
        wonCount++;
        currentWinStreak++;
        currentLossStreak = 0;
        if (currentWinStreak > maxWinStreak) maxWinStreak = currentWinStreak;
      } else if (isLoss) {
        stepProfit = -lossPerLoss;
        lostCount++;
        currentLossStreak++;
        currentWinStreak = 0;
        if (currentLossStreak > maxLossStreak) maxLossStreak = currentLossStreak;
      } else if (isRefund) {
        stepProfit = 0;
        refundedCount++;
      }

      currentBank += stepProfit;

      // Calcular Drawdown (queda a partir do topo mais alto)
      if (currentBank > peakBank) {
        peakBank = currentBank;
      } else {
        const ddVal = peakBank - currentBank;
        const ddPct = peakBank > 0 ? (ddVal / peakBank) * 100 : 0;
        if (ddVal > maxDrawdownValue) maxDrawdownValue = ddVal;
        if (ddPct > maxDrawdownPercent) maxDrawdownPercent = ddPct;
      }

      const progressionPct = ((currentBank - simInitialBankroll) / simInitialBankroll) * 100;

      timeline.push({
        step: idx + 1,
        bet,
        stake,
        odd,
        profit: stepProfit,
        bankrollBefore: bankBefore,
        bankrollAfter: currentBank,
        progressionPercent: progressionPct,
        isWin,
        isLoss,
      });

      chartPoints.push({
        step: idx + 1,
        bankroll: currentBank,
        label: bet.date ? bet.date.split('-').slice(1).reverse().join('/') : `#${idx + 1}`,
        profit: stepProfit,
      });
    });

    const totalWonGrossProfit = wonCount * profitPerWin;
    const totalLostAmount = lostCount * lossPerLoss;
    const netProfit = totalWonGrossProfit - totalLostAmount;
    const finalBankroll = simInitialBankroll + netProfit;
    const totalInvested = (wonCount + lostCount) * stake;

    const roi = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0;
    const progression = simInitialBankroll > 0 ? (netProfit / simInitialBankroll) * 100 : 0;
    const winRate =
      wonCount + lostCount > 0 ? (wonCount / (wonCount + lostCount)) * 100 : 0;

    // Ponto de equilíbrio (Break-even): 1 / odd * 100
    const breakEvenRate = odd > 0 ? (1 / odd) * 100 : 50;
    const edgeOverBreakEven = winRate - breakEvenRate;

    return {
      finalBankroll,
      netProfit,
      totalWonGrossProfit,
      totalLostAmount,
      profitPerWin,
      lossPerLoss,
      roi,
      progression,
      totalInvested,
      wonCount,
      lostCount,
      refundedCount,
      totalSimulatedBets: simulationBets.length,
      winRate,
      breakEvenRate,
      edgeOverBreakEven,
      maxDrawdownValue,
      maxDrawdownPercent,
      maxWinStreak,
      maxLossStreak,
      timeline,
      chartPoints,
    };
  }, [simInitialBankroll, fixedStakeAmount, simOdd, simulationBets]);

  // Dados para o Gráfico SVG
  const chartSvgData = useMemo(() => {
    const points = simulationResult.chartPoints;
    if (points.length <= 1) return null;

    const values = points.map((p) => p.bankroll);
    const minVal = Math.min(...values, simInitialBankroll);
    const maxVal = Math.max(...values, simInitialBankroll);
    const range = maxVal - minVal || 1;

    const width = 640;
    const height = 180;
    const padding = 24;

    const getX = (idx: number) => padding + (idx / (points.length - 1)) * (width - padding * 2);
    const getY = (val: number) => height - padding - ((val - minVal) / range) * (height - padding * 2);

    const initialY = getY(simInitialBankroll);

    const pathString = points
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx).toFixed(1)} ${getY(p.bankroll).toFixed(1)}`)
      .join(' ');

    const areaString = `${pathString} L ${getX(points.length - 1).toFixed(1)} ${height - padding} L ${getX(0).toFixed(1)} ${height - padding} Z`;

    const pointCoords = points.map((p, idx) => ({
      x: getX(idx),
      y: getY(p.bankroll),
      point: p,
      index: idx,
    }));

    return {
      width,
      height,
      minVal,
      maxVal,
      initialY,
      pathString,
      areaString,
      pointCoords,
    };
  }, [simulationResult.chartPoints, simInitialBankroll]);

  // Atalhos Rápidos
  const handleSetScenario500 = () => {
    setSimInitialBankroll(500);
    setFixedStakeAmount(50);
    setSimOdd(1.8);
    setSelectedMonth('all');
  };

  const handleSetScenario100 = () => {
    setSimInitialBankroll(100);
    setFixedStakeAmount(50);
    setSimOdd(1.8);
    setSelectedMonth('all');
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* 1. TOP BANNER: 100% Mobile Friendly */}
      <div className="bg-gradient-to-br from-[#171720] via-[#1a1a24] to-[#15151e] border border-[#2c2c38] rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col gap-4 relative z-10">
          {/* Header row com ícone, título e botões */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-tight font-sans">
                    SIMULADOR DE BANCA & ODDS
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/40 text-[9px] sm:text-[10px] font-black text-indigo-300 uppercase shrink-0">
                    PROJEÇÃO DIRETA
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 font-medium leading-relaxed">
                  Projeção sobre o histórico real de <strong className="text-white">{simulationResult.totalSimulatedBets} apostas</strong> ({simulationResult.wonCount} vitórias e {simulationResult.lostCount} derrotas).
                </p>
              </div>
            </div>

            {/* Atalhos Rápidos com botões confortáveis no Android */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto pt-1 sm:pt-0">
              <button
                onClick={handleSetScenario500}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white text-xs font-bold transition-all border border-indigo-500/30 cursor-pointer active:scale-95"
                title="Testar Banca 500, Entrada 50, Odd 1.80"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                <span className="whitespace-nowrap">500 / 50 / @1.80</span>
              </button>
              <button
                onClick={handleSetScenario100}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#22222c] hover:bg-[#2c2c38] text-zinc-300 hover:text-white text-xs font-bold transition-all border border-[#343444] cursor-pointer active:scale-95"
                title="Testar Banca 100, Entrada 50, Odd 1.80"
              >
                <RotateCcw className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="whitespace-nowrap">100 / 50 / @1.80</span>
              </button>
            </div>
          </div>

          {/* Database Context Footer no Mobile */}
          <div className="pt-3 border-t border-[#262634] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-bold">
            <div className="flex items-center gap-2 flex-wrap text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Base Real:</span>
              <span className="text-white font-black">{simulationResult.totalSimulatedBets} apostas</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-black">{simulationResult.wonCount} Greens</span>
              <span className="text-zinc-600">/</span>
              <span className="text-rose-400 font-black">{simulationResult.lostCount} Reds</span>
            </div>
            <div className="text-zinc-400 text-[11px]">
              Aproveitamento Real:{' '}
              <strong className="text-white font-black">
                {simulationResult.winRate.toFixed(1)}%
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PAINEL DE PARÂMETROS COM DIAGRAMAÇÃO RESPONSIVA */}
      <div className="bg-[#141416] border border-[#24242a] rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between border-b border-[#222228] pb-3">
          <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-[#ccff00] shrink-0" />
            <span>CONFIGURE SUA SIMULAÇÃO</span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-zinc-500 font-medium text-right hidden xs:inline">
            Cálculo em tempo real
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Parâmetro 1: Banca Inicial */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <label className="text-xs font-bold text-zinc-300">
                💰 Banca Inicial
              </label>
              <button
                onClick={() => setSimInitialBankroll(realInitialCapital)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
              >
                Usar Real (R$ {realInitialCapital.toFixed(2)})
              </button>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                R$
              </span>
              <input
                type="number"
                min="1"
                step="50"
                value={simInitialBankroll}
                onChange={(e) => setSimInitialBankroll(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#1c1c22] border border-[#2a2a34] focus:border-indigo-500 text-white font-black text-sm pl-9 pr-3 py-2.5 rounded-xl outline-none transition-all"
              />
            </div>

            {/* Presets Rápidos */}
            <div className="grid grid-cols-4 gap-1.5">
              {[100, 200, 500, 1000].map((val) => (
                <button
                  key={val}
                  onClick={() => setSimInitialBankroll(val)}
                  className={`py-1.5 px-1 rounded-lg text-[10px] font-black border transition-all text-center cursor-pointer active:scale-95 ${
                    simInitialBankroll === val
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                      : 'bg-[#18181e] text-zinc-400 border-[#262630] hover:text-white'
                  }`}
                >
                  R$ {val}
                </button>
              ))}
            </div>
          </div>

          {/* Parâmetro 2: Valor da Entrada (Stake) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <label className="text-xs font-bold text-zinc-300">
                🎯 Entrada por Jogo
              </label>
              <span className="text-[10px] text-zinc-400 font-bold">
                {((fixedStakeAmount / simInitialBankroll) * 100).toFixed(0)}% da banca
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                R$
              </span>
              <input
                type="number"
                min="1"
                step="10"
                value={fixedStakeAmount}
                onChange={(e) => setFixedStakeAmount(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#1c1c22] border border-[#2a2a34] focus:border-indigo-500 text-white font-black text-sm pl-9 pr-3 py-2.5 rounded-xl outline-none transition-all"
              />
            </div>

            {/* Presets Rápidos */}
            <div className="grid grid-cols-4 gap-1.5">
              {[20, 25, 50, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => setFixedStakeAmount(val)}
                  className={`py-1.5 px-1 rounded-lg text-[10px] font-black border transition-all text-center cursor-pointer active:scale-95 ${
                    fixedStakeAmount === val
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                      : 'bg-[#18181e] text-zinc-400 border-[#262630] hover:text-white'
                  }`}
                >
                  R$ {val}
                </button>
              ))}
            </div>
          </div>

          {/* Parâmetro 3: Odd Média Simulada */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <label className="text-xs font-bold text-zinc-300">
                ⚡ Odd Padrão Simulada
              </label>
              <span className="text-[10px] text-emerald-400 font-bold truncate">
                +R$ {simulationResult.profitPerWin.toFixed(2)}/green
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimOdd((prev) => Math.max(1.05, parseFloat((prev - 0.05).toFixed(2))))}
                className="w-11 h-10 flex items-center justify-center rounded-xl bg-[#1c1c22] border border-[#2a2a34] text-zinc-300 hover:text-white font-black text-base transition-all cursor-pointer active:scale-95 shrink-0"
                title="-0.05"
              >
                -
              </button>
              <input
                type="number"
                min="1.01"
                max="50"
                step="0.05"
                value={simOdd}
                onChange={(e) => setSimOdd(Math.max(1.01, parseFloat(e.target.value) || 0))}
                className="flex-1 bg-[#1c1c22] border border-[#2a2a34] focus:border-indigo-500 text-white font-black text-center text-sm py-2.5 rounded-xl outline-none transition-all"
              />
              <button
                onClick={() => setSimOdd((prev) => parseFloat((prev + 0.05).toFixed(2)))}
                className="w-11 h-10 flex items-center justify-center rounded-xl bg-[#1c1c22] border border-[#2a2a34] text-zinc-300 hover:text-white font-black text-base transition-all cursor-pointer active:scale-95 shrink-0"
                title="+0.05"
              >
                +
              </button>
            </div>

            {/* Presets de Odds */}
            <div className="grid grid-cols-6 gap-1">
              {[1.7, 1.75, 1.8, 1.85, 1.9, 2.0].map((val) => (
                <button
                  key={val}
                  onClick={() => setSimOdd(val)}
                  className={`py-1.5 px-0.5 rounded-lg text-[9px] sm:text-[10px] font-black border transition-all text-center cursor-pointer active:scale-95 ${
                    simOdd === val
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : 'bg-[#18181e] text-zinc-400 border-[#262630] hover:text-white'
                  }`}
                >
                  @{val.toFixed(2)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filtro EXCLUSIVO por Mês com rolagem suave no mobile */}
        <div className="pt-3 border-t border-[#222228] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Mês:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setSelectedMonth('all')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  selectedMonth === 'all'
                    ? 'bg-white text-black border-white font-black shadow-xs'
                    : 'bg-[#18181e] text-zinc-400 border-[#2a2a34] hover:text-white'
                }`}
              >
                Todos ({bets.filter((b) => b.status === 'Ganha' || b.status === 'Perdida').length})
              </button>

              {availableMonths.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setSelectedMonth(m.key)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    selectedMonth === m.key
                      ? 'bg-indigo-600 text-white border-indigo-500 font-black shadow-xs'
                      : 'bg-[#18181e] text-zinc-400 border-[#2a2a34] hover:text-white'
                  }`}
                >
                  {m.label} ({m.count})
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 font-medium">
            Período: <strong className="text-white">{simulationResult.totalSimulatedBets} apostas</strong>
          </div>
        </div>
      </div>

      {/* 3. ⭐ CARD PRINCIPAL DESTACADO COM EQUAÇÃO RESPONSIVA */}
      <div className="bg-gradient-to-br from-[#181822] via-[#15151e] to-[#121218] border-2 border-indigo-500/40 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          {/* Lado Esquerdo: A Equação Clara e Direta */}
          <div className="space-y-3.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-[10px] sm:text-xs uppercase tracking-wider">
                RESULTADO DIRETO DO SEU CENÁRIO
              </span>
            </div>

            {/* Layout da Equação: Em telas pequenas vira grid organizado; em desktop fica em linha */}
            <div className="grid grid-cols-1 sm:flex sm:items-center gap-2.5 sm:gap-3">
              {/* Box 1: Banca Inicial */}
              <div className="bg-[#20202a] px-3.5 py-2.5 rounded-xl border border-[#2e2e3c] flex items-center justify-between sm:block">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Banca Inicial</span>
                <span className="text-white font-black text-base sm:text-lg">
                  R$ {simInitialBankroll.toFixed(2)}
                </span>
              </div>

              {/* Sinal + (visível em desktop ou integrado) */}
              <div className="hidden sm:flex items-center justify-center text-zinc-500 font-black text-lg">
                +
              </div>

              {/* Box 2: Lucro Líquido */}
              <div className="bg-[#20202a] px-3.5 py-2.5 rounded-xl border border-[#2e2e3c] flex items-center justify-between sm:block">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Lucro Líquido</span>
                <span
                  className={`font-black text-base sm:text-lg ${
                    simulationResult.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {simulationResult.netProfit >= 0 ? '+' : ''}
                  R$ {simulationResult.netProfit.toFixed(2)}
                </span>
              </div>

              {/* Sinal = */}
              <div className="hidden sm:flex items-center justify-center text-zinc-500 font-black text-lg">
                =
              </div>

              {/* Box 3: Banca Final Simulada */}
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/10 px-4 py-2.5 rounded-xl border border-emerald-500/40 flex items-center justify-between sm:block shadow-sm">
                <span className="text-[10px] uppercase font-black text-emerald-400 block">
                  Banca Final Simulada
                </span>
                <span className="text-emerald-400 font-black text-lg sm:text-2xl">
                  R$ {simulationResult.finalBankroll.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Explicação Textual em Linguagem Humana */}
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
              Começando com <strong className="text-white">R$ {simInitialBankroll.toFixed(2)}</strong> e fazendo entradas de <strong className="text-white">R$ {fixedStakeAmount.toFixed(2)}</strong> na Odd <strong className="text-emerald-400">@{simOdd.toFixed(2)}</strong>, sua banca terminaria com <strong className="text-emerald-400 font-black">R$ {simulationResult.finalBankroll.toFixed(2)}</strong> ({simulationResult.progression >= 0 ? '+' : ''}{simulationResult.progression.toFixed(1)}% de crescimento).
            </p>
          </div>

          {/* Lado Direito: Mini Resumo de Rentabilidade */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 shrink-0 lg:w-72 pt-1 lg:pt-0">
            <div className="p-3 bg-[#1e1e28] rounded-xl border border-[#2c2c3a] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block">Crescimento</span>
              <span
                className={`text-lg sm:text-xl font-black mt-1 ${
                  simulationResult.progression >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {simulationResult.progression >= 0 ? '+' : ''}
                {simulationResult.progression.toFixed(1)}%
              </span>
              <span className="text-[9px] text-zinc-500 block mt-0.5">sobre a banca</span>
            </div>

            <div className="p-3 bg-[#1e1e28] rounded-xl border border-[#2c2c3a] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block">Taxa ROI</span>
              <span
                className={`text-lg sm:text-xl font-black mt-1 ${
                  simulationResult.roi >= 0 ? 'text-[#ccff00]' : 'text-rose-400'
                }`}
              >
                {simulationResult.roi >= 0 ? '+' : ''}
                {simulationResult.roi.toFixed(1)}%
              </span>
              <span className="text-[9px] text-zinc-500 block mt-0.5">por aposta</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 💡 BOX TRANSPARÊNCIA: ENTENDA A CONTA DO LUCRO */}
      <div className="bg-[#141416] border border-[#262632] rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>DETALHAMENTO DA CONTA ({simulationResult.wonCount}V / {simulationResult.lostCount}D)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Coluna 1: As Vitórias */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#181c19] border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{simulationResult.wonCount} Greens</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded shrink-0">
                +R$ {simulationResult.profitPerWin.toFixed(2)}/cada
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black text-emerald-400">
              + R$ {simulationResult.totalWonGrossProfit.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-tight">
              {simulationResult.wonCount} vitórias × lucro limpo de R$ {simulationResult.profitPerWin.toFixed(2)} = total de R$ {simulationResult.totalWonGrossProfit.toFixed(2)}.
            </p>
          </div>

          {/* Coluna 2: As Derrotas */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#1e1518] border border-rose-500/30 space-y-1.5">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{simulationResult.lostCount} Reds</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-black text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded shrink-0">
                -R$ {simulationResult.lossPerLoss.toFixed(2)}/cada
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black text-rose-400">
              - R$ {simulationResult.totalLostAmount.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-tight">
              {simulationResult.lostCount} derrotas × entrada de R$ {fixedStakeAmount.toFixed(2)} = total de R$ {simulationResult.totalLostAmount.toFixed(2)} perdidos.
            </p>
          </div>

          {/* Coluna 3: O Resultado Líquido */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#181822] border border-indigo-500/30 space-y-1.5">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Lucro Líquido</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-black text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded shrink-0">
                Ganho - Perda
              </span>
            </div>
            <div
              className={`text-lg sm:text-xl font-black ${
                simulationResult.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {simulationResult.netProfit >= 0 ? '+' : ''}
              R$ {simulationResult.netProfit.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-tight">
              +R$ {simulationResult.totalWonGrossProfit.toFixed(2)} greens menos R$ {simulationResult.totalLostAmount.toFixed(2)} reds ={' '}
              <strong className="text-white">R$ {simulationResult.netProfit.toFixed(2)} no bolso</strong>.
            </p>
          </div>
        </div>

        {/* Explicação Didática */}
        <div className="p-3 sm:p-3.5 bg-[#1a1a24] rounded-xl border border-[#2e2e3c] text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
          <strong className="text-[#ccff00]">💡 Impacto da Odd nos seus ganhos:</strong> Com entrada de <strong className="text-white">R$ 50</strong> e <strong className="text-white">22 vitórias</strong>:
          na Odd <strong className="text-white">1,70</strong> o lucro final fica em <strong className="text-emerald-400">R$ 70,00</strong>.
          Já na Odd <strong className="text-white">1,80</strong> o lucro salta para <strong className="text-emerald-400">R$ 180,00</strong> (+R$ 110,00 a mais de rentabilidade com os mesmos acertos!).
        </div>
      </div>

      {/* 5. 4 CARDS DE RESUMO LIMPOS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Card 1: Banca Final */}
        <div className="bg-[#141416] border border-[#24242a] p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm min-w-0">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider truncate">
                BANCA FINAL
              </span>
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            </div>
            <div
              className={`text-lg sm:text-2xl font-black font-sans truncate ${
                simulationResult.finalBankroll >= simInitialBankroll
                  ? 'text-emerald-400'
                  : 'text-rose-500'
              }`}
            >
              R$ {simulationResult.finalBankroll.toFixed(2)}
            </div>
          </div>
          <div className="pt-1.5 text-[10px] sm:text-[11px] font-bold text-zinc-400 truncate">
            Início: R$ {simInitialBankroll.toFixed(0)}
          </div>
        </div>

        {/* Card 2: Lucro Líquido */}
        <div className="bg-[#141416] border border-[#24242a] p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm min-w-0">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider truncate">
                LUCRO LÍQUIDO
              </span>
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            </div>
            <div
              className={`text-lg sm:text-2xl font-black font-sans truncate ${
                simulationResult.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-500'
              }`}
            >
              {simulationResult.netProfit >= 0 ? '+' : ''}
              R$ {simulationResult.netProfit.toFixed(2)}
            </div>
          </div>
          <div className="pt-1.5 text-[10px] sm:text-[11px] font-bold text-zinc-400 truncate">
            {simulationResult.wonCount}V / {simulationResult.lostCount}D
          </div>
        </div>

        {/* Card 3: Evolução da Banca */}
        <div className="bg-[#141416] border border-[#24242a] p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm min-w-0">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider truncate">
                CRESCIMENTO
              </span>
              <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ccff00] shrink-0" />
            </div>
            <div
              className={`text-lg sm:text-2xl font-black font-sans truncate ${
                simulationResult.progression >= 0 ? 'text-emerald-400' : 'text-rose-500'
              }`}
            >
              {simulationResult.progression >= 0 ? '+' : ''}
              {simulationResult.progression.toFixed(1)}%
            </div>
          </div>
          <div className="pt-1.5 text-[10px] sm:text-[11px] font-bold text-zinc-400 truncate">
            {(simulationResult.finalBankroll / simInitialBankroll).toFixed(2)}x do capital
          </div>
        </div>

        {/* Card 4: ROI */}
        <div className="bg-[#141416] border border-[#24242a] p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm min-w-0">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider truncate">
                TAXA ROI
              </span>
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            </div>
            <div
              className={`text-lg sm:text-2xl font-black font-sans truncate ${
                simulationResult.roi >= 0 ? 'text-[#ccff00]' : 'text-rose-500'
              }`}
            >
              {simulationResult.roi >= 0 ? '+' : ''}
              {simulationResult.roi.toFixed(1)}%
            </div>
          </div>
          <div className="pt-1.5 text-[10px] sm:text-[11px] font-bold text-zinc-400 truncate">
            Por valor apostado
          </div>
        </div>
      </div>

      {/* 6. BREAK-EVEN, SEQUÊNCIAS & DRAWDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Ponto de Equilíbrio */}
        <div className="bg-[#151518] border border-[#24242a] p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              Ponto de Equilíbrio
            </span>
            <span className="text-[10px] font-bold text-zinc-500">
              Odd @{simOdd.toFixed(2)}
            </span>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl font-black text-white font-sans">
              {simulationResult.breakEvenRate.toFixed(1)}%
            </span>
            <span className="text-xs text-zinc-400">necessário para lucrar</span>
          </div>
          <div className="text-[11px] leading-relaxed text-zinc-400">
            Sua taxa real é de <strong className="text-white">{simulationResult.winRate.toFixed(1)}%</strong> ({simulationResult.edgeOverBreakEven >= 0 ? '+' : ''}
            <strong className="text-emerald-400">{simulationResult.edgeOverBreakEven.toFixed(1)}%</strong> acima da margem mínima).
          </div>
        </div>

        {/* Sequências */}
        <div className="bg-[#151518] border border-[#24242a] p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              Sequências no Período
            </span>
            <span className="text-[10px] font-bold text-zinc-500">Histórico</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <div className="p-2 rounded-xl bg-[#1c1c22] border border-[#2a2a34]">
              <div className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase truncate">Maior Greens</div>
              <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 truncate">
                {simulationResult.maxWinStreak} 🔥 Seguidos
              </div>
            </div>
            <div className="p-2 rounded-xl bg-[#1c1c22] border border-[#2a2a34]">
              <div className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase truncate">Maior Reds</div>
              <div className="text-base sm:text-lg font-black text-rose-400 mt-0.5 truncate">
                {simulationResult.maxLossStreak} 🔻 Seguidas
              </div>
            </div>
          </div>
        </div>

        {/* Drawdown Máximo */}
        <div className="bg-[#151518] border border-[#24242a] p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-rose-400 shrink-0" />
              Maior Queda (Drawdown)
            </span>
            <span className="text-[10px] font-bold text-zinc-500">Oscilação</span>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl font-black text-rose-400 font-sans">
              - R$ {simulationResult.maxDrawdownValue.toFixed(2)}
            </span>
            <span className="text-xs text-zinc-400">
              (-{simulationResult.maxDrawdownPercent.toFixed(1)}%)
            </span>
          </div>
          <div className="text-[11px] leading-relaxed text-zinc-400">
            Maior queda acumulada do topo mais alto até o fundo durante este histórico.
          </div>
        </div>
      </div>

      {/* 7. GRÁFICO DE LINHA DA EVOLUÇÃO DA BANCA (100% RESPONSIVO) */}
      {chartSvgData && (
        <div className="bg-[#141416] border border-[#24242a] rounded-2xl p-4 sm:p-6 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                EVOLUÇÃO DA BANCA PASSO A PASSO
              </h3>
              <p className="text-[11px] text-zinc-400 font-medium">
                Partindo de R$ {simInitialBankroll.toFixed(2)} até R${' '}
                {simulationResult.finalBankroll.toFixed(2)}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-zinc-400">Pico Máximo: </span>
              <strong className="text-emerald-400 text-xs font-black">
                R$ {chartSvgData.maxVal.toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="relative w-full overflow-hidden pt-2">
            <svg
              viewBox={`0 0 ${chartSvgData.width} ${chartSvgData.height}`}
              className="w-full h-40 sm:h-52 overflow-visible select-none"
            >
              <defs>
                <linearGradient id="simChartGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Linha da Banca Inicial */}
              <line
                x1="24"
                y1={chartSvgData.initialY}
                x2={chartSvgData.width - 24}
                y2={chartSvgData.initialY}
                stroke="#383844"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={chartSvgData.width - 20}
                y={chartSvgData.initialY + 3}
                fill="#71717a"
                fontSize="9"
                fontWeight="700"
              >
                Início: R$ {simInitialBankroll.toFixed(0)}
              </text>

              {/* Área preenchida */}
              <path d={chartSvgData.areaString} fill="url(#simChartGradient2)" />

              {/* Linha principal */}
              <path
                d={chartSvgData.pathString}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Pontos interativos */}
              {chartSvgData.pointCoords.map((pt) => {
                const isCurrent = activeTooltipIndex === pt.index;
                const isStart = pt.index === 0;
                return (
                  <g
                    key={pt.index}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveTooltipIndex(pt.index)}
                    onMouseLeave={() => setActiveTooltipIndex(null)}
                    onClick={() => setActiveTooltipIndex(isCurrent ? null : pt.index)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isCurrent ? 5 : isStart ? 3 : 2.5}
                      fill={isCurrent ? '#ffffff' : isStart ? '#a1a1aa' : '#10b981'}
                      stroke="#141416"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Tooltip ao tocar no ponto no celular */}
            {activeTooltipIndex !== null && chartSvgData.pointCoords[activeTooltipIndex] && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#1c1c24] border border-[#333342] text-[11px] sm:text-xs px-3 py-1.5 rounded-xl shadow-xl z-20 flex items-center gap-2 sm:gap-3 max-w-[90vw]">
                <span className="text-zinc-400 font-bold truncate">
                  {chartSvgData.pointCoords[activeTooltipIndex].point.label}:
                </span>
                <span className="text-white font-black whitespace-nowrap">
                  R$ {chartSvgData.pointCoords[activeTooltipIndex].point.bankroll.toFixed(2)}
                </span>
                {chartSvgData.pointCoords[activeTooltipIndex].point.profit !== 0 && (
                  <span
                    className={`font-bold whitespace-nowrap ${
                      chartSvgData.pointCoords[activeTooltipIndex].point.profit > 0
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >
                    ({chartSvgData.pointCoords[activeTooltipIndex].point.profit > 0 ? '+' : ''}
                    R$ {chartSvgData.pointCoords[activeTooltipIndex].point.profit.toFixed(2)})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. TABELA DETALHADA COM ROLAGEM SUAVE NO CELULAR */}
      <div className="bg-[#141416] border border-[#24242a] rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setIsTableExpanded(!isTableExpanded)}
          className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between bg-[#18181e] hover:bg-[#1f1f26] transition-all text-left cursor-pointer border-b border-[#24242a] active:bg-[#22222a]"
        >
          <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>EXTRATO DE APOSTAS ({simulationResult.timeline.length})</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <span>{isTableExpanded ? 'Ocultar' : 'Ver Extrato'}</span>
            {isTableExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isTableExpanded && (
          <div className="overflow-x-auto max-h-96 overflow-y-auto scrollbar-thin">
            <table className="w-full text-left text-xs min-w-[560px]">
              <thead className="sticky top-0 bg-[#17171e] text-zinc-400 border-b border-[#24242a] font-bold text-[10px] sm:text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3">Jogos / Seleção</th>
                  <th className="py-2.5 px-3">Resultado</th>
                  <th className="py-2.5 px-3">Entrada</th>
                  <th className="py-2.5 px-3">Odd</th>
                  <th className="py-2.5 px-3">Retorno</th>
                  <th className="py-2.5 px-3 text-right">Saldo Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e24] text-zinc-300 font-medium">
                {simulationResult.timeline.map((item) => (
                  <tr key={item.step} className="hover:bg-[#1a1a22] transition-colors">
                    <td className="py-2.5 px-3 font-mono text-zinc-500">{item.step}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-zinc-400">
                      {item.bet.date ? item.bet.date.split('-').reverse().join('/') : '-'}
                    </td>
                    <td className="py-2.5 px-3 max-w-[180px] sm:max-w-xs truncate">
                      {item.bet.legs && item.bet.legs.length > 0 ? (
                        <span>
                          {item.bet.legs
                            .map((leg) => leg.matchTitle || (leg.team1 && leg.team2 ? `${leg.team1} x ${leg.team2}` : 'Jogo'))
                            .join(' + ')}
                        </span>
                      ) : (
                        <span>{item.bet.title || `Aposta #${item.step}`}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {item.isWin ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> GANHA
                        </span>
                      ) : item.isLoss ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          <XCircle className="w-3 h-3" /> PERDIDA
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black bg-zinc-500/20 text-zinc-300">
                          REEMBOLSO
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap font-bold">
                      R$ {item.stake.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-zinc-400">
                      @{item.odd.toFixed(2)}
                    </td>
                    <td
                      className={`py-2.5 px-3 whitespace-nowrap font-black ${
                        item.profit > 0
                          ? 'text-emerald-400'
                          : item.profit < 0
                          ? 'text-rose-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      {item.profit > 0 ? '+' : ''}
                      R$ {item.profit.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-right font-black text-white">
                      R$ {item.bankrollAfter.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
