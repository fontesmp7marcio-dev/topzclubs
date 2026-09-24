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
    return 500.0; // Padrão solicitado pelo usuário: Banca 500
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
    const padding = 28;

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

  // Atalho para o cenário de teste clássico (Banca 500, Entrada 50, Odd 1.80)
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
    <div className="space-y-6">
      {/* Top Banner Simplificado e Direto */}
      <div className="bg-gradient-to-r from-[#171720] via-[#1a1a24] to-[#171720] border border-[#2c2c38] rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight font-sans">
                  SIMULADOR DE BANCA & ODDS
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-black text-indigo-300 uppercase">
                  PROJEÇÃO DIRETA
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl font-medium leading-relaxed">
                Descubra com quanto sua banca terminaria aplicando sua própria estratégia de valor de entrada e Odd sobre o histórico real de <strong>{simulationResult.totalSimulatedBets} apostas</strong> ({simulationResult.wonCount} vitórias e {simulationResult.lostCount} derrotas).
              </p>
            </div>
          </div>

          {/* Atalhos Rápidos */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
            <button
              onClick={handleSetScenario500}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white text-xs font-bold transition-all border border-indigo-500/30 cursor-pointer"
              title="Testar Banca 500, Entrada 50, Odd 1.80"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Cenário: 500 / 50 / @1.80</span>
            </button>
            <button
              onClick={handleSetScenario100}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#22222c] hover:bg-[#2c2c38] text-zinc-300 hover:text-white text-xs font-bold transition-all border border-[#343444] cursor-pointer"
              title="Testar Banca 100, Entrada 50, Odd 1.80"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span>100 / 50 / @1.80</span>
            </button>
          </div>
        </div>

        {/* Database Context */}
        <div className="mt-4 pt-4 border-t border-[#262634] flex items-center justify-between gap-3 flex-wrap text-[11px] font-bold">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dados Reais Utilizados:</span>
            <span className="text-white font-black">{simulationResult.totalSimulatedBets} apostas finalizadas</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-black">{simulationResult.wonCount} Vitórias</span>
            <span className="text-zinc-600">/</span>
            <span className="text-rose-400 font-black">{simulationResult.lostCount} Derrotas</span>
          </div>
          <div className="text-zinc-400">
            Aproveitamento Real:{' '}
            <strong className="text-white">
              {simulationResult.winRate.toFixed(1)}%
            </strong>
          </div>
        </div>
      </div>

      {/* Painel de Parâmetros Simplificado */}
      <div className="bg-[#141416] border border-[#24242a] rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-[#222228] pb-3.5">
          <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-[#ccff00]" />
            <span>CONFIGURE SUA SIMULAÇÃO</span>
          </div>
          <span className="text-[11px] text-zinc-500 font-medium">
            Altere os valores e veja a banca final ser recalculada na hora
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Parâmetro 1: Banca Inicial */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <span>💰 Banca Inicial</span>
              </label>
              <button
                onClick={() => setSimInitialBankroll(realInitialCapital)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
              >
                Banca Real (R$ {realInitialCapital.toFixed(2)})
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
                className="w-full bg-[#1c1c22] border border-[#2a2a34] focus:border-indigo-500 text-white font-black text-sm pl-9 pr-4 py-2.5 rounded-xl outline-none transition-all"
              />
            </div>

            {/* Presets Rápidos */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[100, 200, 500, 1000].map((val) => (
                <button
                  key={val}
                  onClick={() => setSimInitialBankroll(val)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
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
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <span>🎯 Valor da Entrada por Jogo</span>
              </label>
              <span className="text-[10px] text-zinc-400 font-bold">
                {((fixedStakeAmount / simInitialBankroll) * 100).toFixed(0)}% da banca inicial
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
                className="w-full bg-[#1c1c22] border border-[#2a2a34] focus:border-indigo-500 text-white font-black text-sm pl-9 pr-4 py-2.5 rounded-xl outline-none transition-all"
              />
            </div>

            {/* Presets Rápidos */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[20, 25, 50, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => setFixedStakeAmount(val)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
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
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <span>⚡ Odd Padrão Simulada</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-bold">
                Retorno: +R$ {simulationResult.profitPerWin.toFixed(2)} por acerto
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimOdd((prev) => Math.max(1.05, parseFloat((prev - 0.05).toFixed(2))))}
                className="px-3 py-2.5 rounded-xl bg-[#1c1c22] border border-[#2a2a34] text-zinc-300 hover:text-white font-black text-xs transition-all cursor-pointer active:scale-95"
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
                className="w-full bg-[#1c1c22] border border-[#2a2a34] focus:border-indigo-500 text-white font-black text-center text-sm py-2.5 rounded-xl outline-none transition-all"
              />
              <button
                onClick={() => setSimOdd((prev) => parseFloat((prev + 0.05).toFixed(2)))}
                className="px-3 py-2.5 rounded-xl bg-[#1c1c22] border border-[#2a2a34] text-zinc-300 hover:text-white font-black text-xs transition-all cursor-pointer active:scale-95"
                title="+0.05"
              >
                +
              </button>
            </div>

            {/* Presets de Odds */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[1.7, 1.75, 1.8, 1.85, 1.9, 2.0].map((val) => (
                <button
                  key={val}
                  onClick={() => setSimOdd(val)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
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

        {/* Filtro EXCLUSIVO por Mês (Removidas as opções 10 e 20) */}
        <div className="pt-3 border-t border-[#222228] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Filtrar por Mês:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSelectedMonth('all')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                  selectedMonth === 'all'
                    ? 'bg-white text-black border-white font-black shadow-xs'
                    : 'bg-[#18181e] text-zinc-400 border-[#2a2a34] hover:text-white'
                }`}
              >
                Todos os Meses ({bets.filter((b) => b.status === 'Ganha' || b.status === 'Perdida').length})
              </button>

              {availableMonths.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setSelectedMonth(m.key)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
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
            Período selecionado: <strong className="text-white">{simulationResult.totalSimulatedBets} apostas</strong>
          </div>
        </div>
      </div>

      {/* ⭐ CARD PRINCIPAL DESTACADO: RESPOSTA DIRETA DA SIMULAÇÃO */}
      <div className="bg-gradient-to-br from-[#181822] via-[#15151e] to-[#121218] border-2 border-indigo-500/40 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Lado Esquerdo: A Equação Clara e Direta */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-xs uppercase tracking-wider">
                RESULTADO DIRETO DO SEU CENÁRIO
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-sm sm:text-base font-bold text-zinc-300">
              <div className="bg-[#20202a] px-3.5 py-2 rounded-xl border border-[#2e2e3c]">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Banca Inicial</span>
                <span className="text-white font-black text-lg">R$ {simInitialBankroll.toFixed(2)}</span>
              </div>

              <span className="text-xl font-black text-zinc-500">+</span>

              <div className="bg-[#20202a] px-3.5 py-2 rounded-xl border border-[#2e2e3c]">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Lucro Líquido</span>
                <span
                  className={`font-black text-lg ${
                    simulationResult.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {simulationResult.netProfit >= 0 ? '+' : ''}
                  R$ {simulationResult.netProfit.toFixed(2)}
                </span>
              </div>

              <span className="text-xl font-black text-zinc-500">=</span>

              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/10 px-4 py-2 rounded-xl border border-emerald-500/40">
                <span className="text-[10px] uppercase font-black text-emerald-400 block">
                  Banca Final Simulada
                </span>
                <span className="text-emerald-400 font-black text-xl sm:text-2xl">
                  R$ {simulationResult.finalBankroll.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Explicação Textual em Linguagem Humana */}
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed pt-1">
              Começando com <strong className="text-white">R$ {simInitialBankroll.toFixed(2)}</strong> e fazendo entradas de <strong className="text-white">R$ {fixedStakeAmount.toFixed(2)}</strong> na Odd <strong className="text-emerald-400">@{simOdd.toFixed(2)}</strong>, você teria terminado este ciclo com <strong className="text-emerald-400 font-black">R$ {simulationResult.finalBankroll.toFixed(2)}</strong> na conta ({simulationResult.progression >= 0 ? '+' : ''}{simulationResult.progression.toFixed(1)}% de crescimento).
            </p>
          </div>

          {/* Lado Direito: Mini Resumo de Rentabilidade */}
          <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-72">
            <div className="p-3 bg-[#1e1e28] rounded-xl border border-[#2c2c3a]">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block">Crescimento</span>
              <span
                className={`text-xl font-black ${
                  simulationResult.progression >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {simulationResult.progression >= 0 ? '+' : ''}
                {simulationResult.progression.toFixed(1)}%
              </span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">sobre a banca inicial</span>
            </div>

            <div className="p-3 bg-[#1e1e28] rounded-xl border border-[#2c2c3a]">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block">ROI (%)</span>
              <span
                className={`text-xl font-black ${
                  simulationResult.roi >= 0 ? 'text-[#ccff00]' : 'text-rose-400'
                }`}
              >
                {simulationResult.roi >= 0 ? '+' : ''}
                {simulationResult.roi.toFixed(1)}%
              </span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">retorno por aposta</span>
            </div>
          </div>
        </div>
      </div>

      {/* 💡 BOX TRANSPARÊNCIA TOTAL: COMO CHEGAMOS AO VALOR DO LUCRO LÍQUIDO */}
      <div className="bg-[#141416] border border-[#262632] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>ENTENDA A CONTA EXATA DO SEU LUCRO ({simulationResult.wonCount}V / {simulationResult.lostCount}D)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Coluna 1: As Vitórias */}
          <div className="p-4 rounded-xl bg-[#181c19] border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{simulationResult.wonCount} Apostas Ganhas</span>
              </span>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                +R$ {simulationResult.profitPerWin.toFixed(2)} cada
              </span>
            </div>
            <div className="text-xl font-black text-emerald-400 pt-1">
              + R$ {simulationResult.totalWonGrossProfit.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-tight">
              {simulationResult.wonCount} vitórias × (R$ {fixedStakeAmount.toFixed(0)} × {simOdd.toFixed(2)} - R$ {fixedStakeAmount.toFixed(0)}) = ganho limpo de R$ {simulationResult.profitPerWin.toFixed(2)} por acerto.
            </p>
          </div>

          {/* Coluna 2: As Derrotas */}
          <div className="p-4 rounded-xl bg-[#1e1518] border border-rose-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>{simulationResult.lostCount} Apostas Perdidas</span>
              </span>
              <span className="text-[10px] font-black text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                -R$ {simulationResult.lossPerLoss.toFixed(2)} cada
              </span>
            </div>
            <div className="text-xl font-black text-rose-400 pt-1">
              - R$ {simulationResult.totalLostAmount.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-tight">
              {simulationResult.lostCount} derrotas × perda da entrada de R$ {fixedStakeAmount.toFixed(2)} = total de R$ {simulationResult.totalLostAmount.toFixed(2)} perdidos.
            </p>
          </div>

          {/* Coluna 3: O Resultado Líquido */}
          <div className="p-4 rounded-xl bg-[#181822] border border-indigo-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Lucro Líquido Final</span>
              </span>
              <span className="text-[10px] font-black text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded">
                Ganho - Perda
              </span>
            </div>
            <div
              className={`text-xl font-black pt-1 ${
                simulationResult.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {simulationResult.netProfit >= 0 ? '+' : ''}
              R$ {simulationResult.netProfit.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-tight">
              +R$ {simulationResult.totalWonGrossProfit.toFixed(2)} (vitórias) menos R$ {simulationResult.totalLostAmount.toFixed(2)} (derrotas) ={' '}
              <strong className="text-white">R$ {simulationResult.netProfit.toFixed(2)} de lucro no bolso</strong>.
            </p>
          </div>
        </div>

        {/* Explicação de por que a Odd 1.70 dá R$ 70 e a Odd 1.80 dá R$ 180 */}
        <div className="p-3 bg-[#1a1a24] rounded-xl border border-[#2e2e3c] text-xs text-zinc-300 leading-relaxed">
          <strong className="text-[#ccff00]">💡 Por que a diferença entre as Odds?</strong>
          <br />
          Com entrada de <strong className="text-white">R$ 50</strong> e <strong className="text-white">22 vitórias</strong>:
          na Odd <strong className="text-white">1,70</strong> cada vitória rende <strong className="text-white">R$ 35</strong> (22 × 35 = R$ 770 ganho - R$ 700 perda = <strong className="text-emerald-400">R$ 70 de lucro</strong>).
          Já na Odd <strong className="text-white">1,80</strong> cada vitória rende <strong className="text-white">R$ 40</strong> (22 × 40 = R$ 880 ganho - R$ 700 perda = <strong className="text-emerald-400">R$ 180 de lucro</strong>).
          Cada 0.10 a mais na Odd rende <strong className="text-[#ccff00]">+R$ 110,00</strong> a mais no seu bolso nas 22 vitórias!
        </div>
      </div>

      {/* 4 Cards de Resumo Limpos (Sem termos confusos) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Banca Final */}
        <div className="bg-[#141416] border border-[#24242a] p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider">
                BANCA FINAL
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div
              className={`text-2xl sm:text-3xl font-black font-sans ${
                simulationResult.finalBankroll >= simInitialBankroll
                  ? 'text-emerald-400'
                  : 'text-rose-500'
              }`}
            >
              R$ {simulationResult.finalBankroll.toFixed(2)}
            </div>
          </div>
          <div className="pt-2 text-[11px] font-bold text-zinc-400">
            Começou com R$ {simInitialBankroll.toFixed(2)}
          </div>
        </div>

        {/* Card 2: Lucro Líquido */}
        <div className="bg-[#141416] border border-[#24242a] p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider">
                LUCRO LÍQUIDO
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div
              className={`text-2xl sm:text-3xl font-black font-sans ${
                simulationResult.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-500'
              }`}
            >
              {simulationResult.netProfit >= 0 ? '+' : ''}
              R$ {simulationResult.netProfit.toFixed(2)}
            </div>
          </div>
          <div className="pt-2 text-[11px] font-bold text-zinc-400">
            {simulationResult.wonCount} Greens / {simulationResult.lostCount} Reds
          </div>
        </div>

        {/* Card 3: Evolução da Banca */}
        <div className="bg-[#141416] border border-[#24242a] p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider">
                CRESCIMENTO (%)
              </span>
              <Percent className="w-4 h-4 text-[#ccff00]" />
            </div>
            <div
              className={`text-2xl sm:text-3xl font-black font-sans ${
                simulationResult.progression >= 0 ? 'text-emerald-400' : 'text-rose-500'
              }`}
            >
              {simulationResult.progression >= 0 ? '+' : ''}
              {simulationResult.progression.toFixed(1)}%
            </div>
          </div>
          <div className="pt-2 text-[11px] font-bold text-zinc-400">
            {((simulationResult.finalBankroll / simInitialBankroll)).toFixed(2)}x do capital inicial
          </div>
        </div>

        {/* Card 4: ROI */}
        <div className="bg-[#141416] border border-[#24242a] p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider">
                TAXA DE RETORNO (ROI)
              </span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div
              className={`text-2xl sm:text-3xl font-black font-sans ${
                simulationResult.roi >= 0 ? 'text-[#ccff00]' : 'text-rose-500'
              }`}
            >
              {simulationResult.roi >= 0 ? '+' : ''}
              {simulationResult.roi.toFixed(1)}%
            </div>
          </div>
          <div className="pt-2 text-[11px] font-bold text-zinc-400">
            Rentabilidade sobre o volume apostado
          </div>
        </div>
      </div>

      {/* Break-Even, Sequências & Drawdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ponto de Equilíbrio */}
        <div className="bg-[#151518] border border-[#24242a] p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Ponto de Equilíbrio
            </span>
            <span className="text-[10px] font-bold text-zinc-500">
              Odd @{simOdd.toFixed(2)}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white font-sans">
              {simulationResult.breakEvenRate.toFixed(1)}%
            </span>
            <span className="text-xs text-zinc-400">necessário para ficar no positivo</span>
          </div>
          <div className="text-[11px] leading-relaxed text-zinc-400">
            Sua taxa de acerto real é de <strong className="text-white">{simulationResult.winRate.toFixed(1)}%</strong>. Você está{' '}
            <strong className="text-emerald-400">+{simulationResult.edgeOverBreakEven.toFixed(1)}%</strong> acima da margem mínima!
          </div>
        </div>

        {/* Sequências */}
        <div className="bg-[#151518] border border-[#24242a] p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Sequências no Período
            </span>
            <span className="text-[10px] font-bold text-zinc-500">Histórico</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-[#1c1c22] border border-[#2a2a34]">
              <div className="text-[10px] font-bold text-zinc-400 uppercase">Maior Sequência V</div>
              <div className="text-lg font-black text-emerald-400 mt-0.5">
                {simulationResult.maxWinStreak} 🔥 Seguidos
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1c1c22] border border-[#2a2a34]">
              <div className="text-[10px] font-bold text-zinc-400 uppercase">Maior Sequência D</div>
              <div className="text-lg font-black text-rose-400 mt-0.5">
                {simulationResult.maxLossStreak} 🔻 Seguidas
              </div>
            </div>
          </div>
        </div>

        {/* Drawdown Máximo */}
        <div className="bg-[#151518] border border-[#24242a] p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              Maior Queda (Drawdown)
            </span>
            <span className="text-[10px] font-bold text-zinc-500">Resistência</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-rose-400 font-sans">
              - R$ {simulationResult.maxDrawdownValue.toFixed(2)}
            </span>
            <span className="text-xs text-zinc-400">
              (-{simulationResult.maxDrawdownPercent.toFixed(1)}% do topo)
            </span>
          </div>
          <div className="text-[11px] leading-relaxed text-zinc-400">
            A maior queda acumulada ocorrida do topo mais alto até o fundo durante este histórico.
          </div>
        </div>
      </div>

      {/* Gráfico de Linha da Evolução da Banca */}
      {chartSvgData && (
        <div className="bg-[#141416] border border-[#24242a] rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                EVOLUÇÃO DA BANCA PASSO A PASSO
              </h3>
              <p className="text-[11px] text-zinc-400 font-medium">
                Partindo de R$ {simInitialBankroll.toFixed(2)} até R${' '}
                {simulationResult.finalBankroll.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-zinc-400">Pico Máximo: </span>
              <strong className="text-emerald-400 text-xs font-black">
                R$ {chartSvgData.maxVal.toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="relative w-full overflow-hidden pt-2">
            <svg
              viewBox={`0 0 ${chartSvgData.width} ${chartSvgData.height}`}
              className="w-full h-44 sm:h-52 overflow-visible select-none"
            >
              <defs>
                <linearGradient id="simChartGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Linha da Banca Inicial */}
              <line
                x1="28"
                y1={chartSvgData.initialY}
                x2={chartSvgData.width - 28}
                y2={chartSvgData.initialY}
                stroke="#383844"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={chartSvgData.width - 24}
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

            {/* Tooltip ao passar o mouse ou tocar */}
            {activeTooltipIndex !== null && chartSvgData.pointCoords[activeTooltipIndex] && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#1c1c24] border border-[#333342] text-xs px-3 py-1.5 rounded-xl shadow-xl z-20 flex items-center gap-3">
                <span className="text-zinc-400 font-bold">
                  {chartSvgData.pointCoords[activeTooltipIndex].point.label}:
                </span>
                <span className="text-white font-black">
                  R$ {chartSvgData.pointCoords[activeTooltipIndex].point.bankroll.toFixed(2)}
                </span>
                {chartSvgData.pointCoords[activeTooltipIndex].point.profit !== 0 && (
                  <span
                    className={`font-bold ${
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

      {/* Tabela Detalhada com os Jogos Simulados (Expansível) */}
      <div className="bg-[#141416] border border-[#24242a] rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setIsTableExpanded(!isTableExpanded)}
          className="w-full px-5 py-4 flex items-center justify-between bg-[#18181e] hover:bg-[#1f1f26] transition-all text-left cursor-pointer border-b border-[#24242a]"
        >
          <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>LISTA DETALHADA DAS {simulationResult.timeline.length} APOSTAS SIMULADAS</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold">
            <span>{isTableExpanded ? 'Ocultar Detalhes' : 'Ver Extrato Completo'}</span>
            {isTableExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isTableExpanded && (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-[#17171e] text-zinc-400 border-b border-[#24242a] font-bold text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3">Jogos / Seleção</th>
                  <th className="py-2.5 px-3">Resultado</th>
                  <th className="py-2.5 px-3">Entrada</th>
                  <th className="py-2.5 px-3">Odd</th>
                  <th className="py-2.5 px-3">Retorno</th>
                  <th className="py-2.5 px-3 text-right">Saldo da Banca</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e24] text-zinc-300 font-medium">
                {simulationResult.timeline.map((item) => (
                  <tr key={item.step} className="hover:bg-[#1a1a22] transition-colors">
                    <td className="py-2.5 px-3 font-mono text-zinc-500">{item.step}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-zinc-400">
                      {item.bet.date ? item.bet.date.split('-').reverse().join('/') : '-'}
                    </td>
                    <td className="py-2.5 px-3 max-w-xs truncate">
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
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> GANHA
                        </span>
                      ) : item.isLoss ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          <XCircle className="w-3 h-3" /> PERDIDA
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-zinc-500/20 text-zinc-300">
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
