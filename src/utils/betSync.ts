import { BetItem, BetLeg, BetLegStatus, BetStatus, BetFormat, BankrollStats, Match, MarketOption } from '../types';

export interface MarketMetadata {
  market: string;
  marketLabel: string;
  line?: number;
  targetSide?: string;
}

export function getMarketMetadata(marketKey: string, team1?: string, team2?: string): MarketMetadata {
  const label = getMarketLabel(marketKey, team1, team2);
  let line: number | undefined;
  let targetSide: string | undefined;

  if (marketKey === 'HOME_WIN') targetSide = 'home';
  else if (marketKey === 'DRAW') targetSide = 'draw';
  else if (marketKey === 'AWAY_WIN') targetSide = 'away';
  else if (marketKey === 'DC_1X') targetSide = '1X';
  else if (marketKey === 'DC_X2') targetSide = 'X2';
  else if (marketKey === 'DC_12') targetSide = '12';
  else if (marketKey.startsWith('OVER_')) {
    targetSide = 'over';
    line = parseFloat(marketKey.replace('OVER_', '').replace('_', '.'));
  } else if (marketKey.startsWith('UNDER_')) {
    targetSide = 'under';
    line = parseFloat(marketKey.replace('UNDER_', '').replace('_', '.'));
  } else if (marketKey === 'BTTS_YES') targetSide = 'yes';
  else if (marketKey === 'BTTS_NO') targetSide = 'no';
  else if (marketKey === 'DNB_HOME') targetSide = 'home';
  else if (marketKey === 'DNB_AWAY') targetSide = 'away';

  return { market: marketKey, marketLabel: label, line, targetSide };
}

/**
 * Returns ONLY the 3 approved selectable markets:
 * 1. Mais de 1.5 gols
 * 2. Vitória da casa
 * 3. Vitória do visitante
 */
export function getMarketOptionsForMatch(team1: string, team2: string): MarketOption[] {
  const t1 = team1 || 'Mandante';
  const t2 = team2 || 'Visitante';

  return [
    { value: 'OVER_1_5', label: 'Mais de 1.5 gols', category: 'Gols' },
    { value: 'HOME_WIN', label: `Vitória da casa (${t1})`, category: 'Resultado' },
    { value: 'AWAY_WIN', label: `Vitória do visitante (${t2})`, category: 'Resultado' },
  ];
}

/**
 * Gets a friendly label for a market key
 */
export function getMarketLabel(marketKey: string | undefined, team1?: string, team2?: string): string {
  if (!marketKey) return 'Mais de 1.5 gols';
  const t1 = team1 || 'Mandante';
  const t2 = team2 || 'Visitante';

  if (marketKey === 'OVER_1_5') return 'Mais de 1.5 gols';
  if (marketKey === 'HOME_WIN') return `Vitória da casa (${t1})`;
  if (marketKey === 'AWAY_WIN') return `Vitória do visitante (${t2})`;

  // Fallbacks for older bets in database
  if (marketKey === 'DRAW') return 'Empate';
  if (marketKey === 'OVER_2_5') return 'Mais de 2.5 gols';
  if (marketKey === 'UNDER_2_5') return 'Menos de 2.5 gols';
  if (marketKey === 'OVER_0_5') return 'Mais de 0.5 gols';
  if (marketKey === 'UNDER_0_5') return 'Menos de 0.5 gols';
  if (marketKey === 'OVER_3_5') return 'Mais de 3.5 gols';
  if (marketKey === 'UNDER_3_5') return 'Menos de 3.5 gols';
  if (marketKey === 'BTTS_YES') return 'Ambas Marcam: Sim';
  if (marketKey === 'BTTS_NO') return 'Ambas Marcam: Não';
  if (marketKey === 'DNB_HOME') return `${t1} (Empate Anula)`;
  if (marketKey === 'DNB_AWAY') return `${t2} (Empate Anula)`;
  if (marketKey === 'DC_1X') return `${t1} ou Empate`;
  if (marketKey === 'DC_X2') return `Empate ou ${t2}`;
  if (marketKey === 'DC_12') return `${t1} ou ${t2}`;

  return marketKey;
}

/**
 * Evaluates a single leg result based on real scores and match status
 */
export function evaluateLegResult(
  market: string | undefined,
  homeScore: number | null | undefined,
  awayScore: number | null | undefined,
  matchStatus: 'scheduled' | 'live' | 'finished' | string | undefined
): BetLegStatus {
  if (!market) return 'pending';
  if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) {
    return 'pending';
  }

  const h = Number(homeScore);
  const a = Number(awayScore);
  const total = h + a;
  const isFinished = matchStatus === 'finished';

  switch (market) {
    // 1X2
    case 'HOME_WIN':
      if (isFinished) return h > a ? 'green' : 'red';
      return 'pending';

    case 'DRAW':
      if (isFinished) return h === a ? 'green' : 'red';
      return 'pending';

    case 'AWAY_WIN':
      if (isFinished) return a > h ? 'green' : 'red';
      return 'pending';

    // Dupla Hipótese
    case 'DC_1X':
      if (isFinished) return h >= a ? 'green' : 'red';
      return 'pending';

    case 'DC_X2':
      if (isFinished) return a >= h ? 'green' : 'red';
      return 'pending';

    case 'DC_12':
      if (isFinished) return h !== a ? 'green' : 'red';
      return 'pending';

    // Over / Under
    case 'OVER_0_5':
      if (total >= 1) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'UNDER_0_5':
      if (total >= 1) return 'red';
      return isFinished ? 'green' : 'pending';

    case 'OVER_1_5':
      if (total >= 2) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'UNDER_1_5':
      if (total >= 2) return 'red';
      return isFinished ? 'green' : 'pending';

    case 'OVER_2_5':
      if (total >= 3) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'UNDER_2_5':
      if (total >= 3) return 'red';
      return isFinished ? 'green' : 'pending';

    case 'OVER_3_5':
      if (total >= 4) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'UNDER_3_5':
      if (total >= 4) return 'red';
      return isFinished ? 'green' : 'pending';

    // Ambas Marcam
    case 'BTTS_YES':
      if (h >= 1 && a >= 1) return 'green';
      return isFinished ? 'red' : 'pending';

    case 'BTTS_NO':
      if (h >= 1 && a >= 1) return 'red';
      return isFinished ? 'green' : 'pending';

    // Empate Anula a Aposta
    case 'DNB_HOME':
      if (isFinished) {
        if (h > a) return 'green';
        if (h < a) return 'red';
        return 'void';
      }
      return 'pending';

    case 'DNB_AWAY':
      if (isFinished) {
        if (a > h) return 'green';
        if (a < h) return 'red';
        return 'void';
      }
      return 'pending';

    default:
      return 'pending';
  }
}

/**
 * Evaluates the overall Bet status from its individual legs.
 * Rule:
 * - Simple (1 leg): follows leg directly
 * - Multiple (2+ legs):
 *    - ANY leg Red => Bet is Perdida
 *    - ALL legs Green => Bet is Ganha
 *    - All legs resolved with at least 1 Green and rest Void => Bet is Ganha
 *    - All legs Void => Bet is Reembolsada
 *    - Otherwise (has Pending and NO Red) => Bet is Pendente
 */
export function evaluateBetStatusFromLegs(
  legs: BetLeg[] | undefined,
  fallbackStatus: BetStatus = 'Pendente',
  format?: BetFormat
): BetStatus {
  if (!legs || legs.length === 0) {
    return fallbackStatus;
  }

  const isMulti = format === 'Múltipla' || legs.length > 1;

  // Simples (1 perna)
  if (!isMulti) {
    const leg = legs[0];
    if (leg.status === 'green') return 'Ganha';
    if (leg.status === 'red') return 'Perdida';
    if (leg.status === 'void') return 'Reembolsada';
    return 'Pendente';
  }

  // Múltipla (2+ pernas)
  // Regra 1: Qualquer red => Aposta inteira Perdida
  if (legs.some((l) => l.status === 'red')) {
    return 'Perdida';
  }

  // Regra 2: Todas green => Ganha
  if (legs.every((l) => l.status === 'green')) {
    return 'Ganha';
  }

  // Regra 3: Todas finalizadas sem pendente e sem red, com pelo menos 1 green e o restante void => Ganha
  const allResolved = legs.every((l) => l.status === 'green' || l.status === 'void');
  if (allResolved && legs.some((l) => l.status === 'green')) {
    return 'Ganha';
  }

  // Regra 4: Todas void => Reembolsada
  if (legs.every((l) => l.status === 'void')) {
    return 'Reembolsada';
  }

  // Se possui pernas pendentes e nenhuma red => Pendente
  return 'Pendente';
}

/**
 * Pure calculation of profit given status, amount and odd.
 * Single source of truth.
 */
export function calculateBetProfit(status: BetStatus, amount: number, odd: number): number {
  const parsedAmount = Number(amount) || 0;
  const parsedOdd = Number(odd) || 1;

  if (status === 'Ganha') {
    return (parsedAmount * parsedOdd) - parsedAmount;
  }
  if (status === 'Perdida') {
    return -parsedAmount;
  }
  if (status === 'Reembolsada') {
    return 0;
  }
  return 0; // Pendente ou Cancelada
}

/**
 * Centralized calculation of Bankroll Stats (Lucro, ROI, Progressão).
 * Single source of truth for the Balanço module.
 */
export function calculateBankrollStats(bets: BetItem[], initialCapital: number): BankrollStats {
  const initCap = Number(initialCapital) || 0;
  let wonBets = 0;
  let lostBets = 0;
  let pendingBets = 0;
  let refundedBets = 0;
  let cancelledBets = 0;
  let totalStake = 0;
  let totalProfit = 0;

  for (const b of bets) {
    const amount = Number(b.amount) || 0;
    const odd = Number(b.odd) || 1;

    switch (b.status) {
      case 'Ganha':
        wonBets++;
        totalStake += amount;
        totalProfit += (amount * odd) - amount;
        break;
      case 'Perdida':
        lostBets++;
        totalStake += amount;
        totalProfit -= amount;
        break;
      case 'Reembolsada':
        refundedBets++;
        totalStake += amount;
        // Stake devolvida integralmente, lucro líquido é 0
        break;
      case 'Pendente':
        pendingBets++;
        // Apostas Pendentes NÃO geram lucro realizado nem contam no ROI
        break;
      case 'Cancelada':
        cancelledBets++;
        // Apostas Canceladas NÃO geram lucro realizado nem contam no ROI
        break;
      default:
        pendingBets++;
        break;
    }
  }

  // Regra Oficial do Balanço:
  // totalBets: total de apostas cadastradas no sistema (ex: 7)
  // settledBets: apostas finalizadas (ex: 4 = 2 ganhas + 2 perdidas)
  const settledBets = wonBets + lostBets + refundedBets;
  const currentBankroll = initCap + totalProfit;
  const roi = totalStake > 0 ? (totalProfit / totalStake) * 100 : 0;
  const progression = initCap > 0 ? (totalProfit / initCap) * 100 : 0;

  return {
    totalBets: bets.length,
    settledBets,
    allBetsCount: bets.length,
    wonBets,
    lostBets,
    pendingBets,
    refundedBets,
    cancelledBets,
    totalStake,
    totalProfit,
    currentBankroll,
    roi,
    progression,
    initialCapital: initCap,
  };
}

/**
 * Extracts team1 and team2 from a title string (e.g. "Flamengo x Vasco" or "FEN vs ROM")
 * when bet has no explicit legs array.
 */
export function parseMatchupFromTitle(title: string | undefined): { team1: string; team2: string } | null {
  if (!title) return null;
  // If multiple games concatenated with '+'
  const firstMatch = title.split(/\s*\+\s*/)[0];
  const parts = firstMatch.split(/\s+(?:x|vs|v)\s+/i);
  if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
    return {
      team1: parts[0].trim(),
      team2: parts[1].trim(),
    };
  }
  return null;
}

/**
 * Synchronizes a bet with a list of matches (from FotMob or scraper)
 */
export function syncBetWithMatches(
  bet: BetItem,
  matches: Match[]
): { updatedBet: BetItem; changed: boolean } {
  let effectiveLegs: BetLeg[] = bet.legs && bet.legs.length > 0 ? [...bet.legs] : [];

  // If bet has NO legs, attempt to auto-generate legs from title
  if (effectiveLegs.length === 0 && bet.title) {
    const rawMatches = bet.title.split(/\s*\+\s*/);
    const generated: BetLeg[] = [];
    for (const rm of rawMatches) {
      const parts = rm.split(/\s+(?:x|vs|v)\s+/i);
      if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
        const team1 = parts[0].trim();
        const team2 = parts[1].trim();
        generated.push({
          id: `gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          team1,
          team2,
          market: 'OVER_1_5',
          status: 'pending',
          matchTitle: `${team1} x ${team2}`,
        });
      }
    }
    if (generated.length > 0) {
      effectiveLegs = generated;
    }
  }

  if (effectiveLegs.length === 0) {
    return { updatedBet: bet, changed: false };
  }

  let anyLegChanged = false;

  const updatedLegs: BetLeg[] = effectiveLegs.map((leg) => {
    // Locate match primarily by exact ID, then fallback to sanitized team names
    const match = matches.find((m) => {
      const matchIdStr = String(m.id);
      const legMatchIdStr = leg.matchId ? String(leg.matchId) : '';
      const legIdStr = leg.id ? String(leg.id) : '';

      if (legMatchIdStr && matchIdStr === legMatchIdStr) return true;
      if (legIdStr && matchIdStr === legIdStr) return true;

      const matchTeam1 = m.team1 || (m as any).homeTeam || '';
      const matchTeam2 = m.team2 || (m as any).awayTeam || '';

      if (leg.team1 && leg.team2 && matchTeam1 && matchTeam2) {
        const m1 = matchTeam1.toLowerCase().trim();
        const m2 = matchTeam2.toLowerCase().trim();
        const l1 = leg.team1.toLowerCase().trim();
        const l2 = leg.team2.toLowerCase().trim();
        return (m1.includes(l1) || l1.includes(m1)) && (m2.includes(l2) || l2.includes(m2));
      }
      return false;
    });

    if (!match) return leg;

    let homeScore: number | undefined;
    let awayScore: number | undefined;

    if (match.score) {
      if (Array.isArray(match.score.ft)) {
        homeScore = match.score.ft[0];
        awayScore = match.score.ft[1];
      } else if (typeof (match.score as any).home === 'number' && typeof (match.score as any).away === 'number') {
        homeScore = (match.score as any).home;
        awayScore = (match.score as any).away;
      }
    }

    const matchStatus = match.status;

    // Use leg market or default to 'OVER_1_5' (Mais de 1.5 gols)
    const legMarket = leg.market || 'OVER_1_5';
    const newLegStatus = evaluateLegResult(legMarket, homeScore, awayScore, matchStatus);
    const scoreObj =
      homeScore !== undefined && awayScore !== undefined
        ? { ft: [homeScore, awayScore] as [number, number] }
        : leg.score;
    const settledScore: [number, number] | null =
      homeScore !== undefined && awayScore !== undefined
        ? [homeScore, awayScore]
        : (leg.settledScore || null);

    if (
      newLegStatus !== leg.status ||
      matchStatus !== leg.matchStatus ||
      legMarket !== leg.market ||
      JSON.stringify(scoreObj) !== JSON.stringify(leg.score) ||
      JSON.stringify(settledScore) !== JSON.stringify(leg.settledScore)
    ) {
      anyLegChanged = true;
      return {
        ...leg,
        matchId: String(match.id),
        market: legMarket,
        status: newLegStatus,
        score: scoreObj,
        settledScore,
        matchStatus,
      };
    }

    return leg;
  });

  const newBetStatus = evaluateBetStatusFromLegs(updatedLegs, bet.status, bet.format);
  const newProfit = calculateBetProfit(newBetStatus, bet.amount, bet.odd);
  const statusChanged =
    newBetStatus !== bet.status || Math.abs(newProfit - (bet.profit ?? 0)) > 0.001;

  if (anyLegChanged || statusChanged || (effectiveLegs.length > 0 && (!bet.legs || bet.legs.length === 0))) {
    return {
      updatedBet: {
        ...bet,
        status: newBetStatus,
        profit: newProfit,
        legs: updatedLegs,
      },
      changed: true,
    };
  }

  return { updatedBet: bet, changed: false };
}
