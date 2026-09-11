import { 
  calculateBetProfit, 
  calculateBankrollStats, 
  evaluateLegResult, 
  evaluateBetStatusFromLegs, 
  syncBetWithMatches, 
  getMarketMetadata 
} from '../src/utils/betSync';
import { BetItem, BetLeg, Match } from '../src/types';

function runValidationTests() {
  console.log('=== INICIANDO BATERIA DE 17 TESTES DE VALIDAÇÃO DO MÓDULO APOSTAS + BALANÇO ===\n');
  let passed = 0;
  let total = 17;

  // Teste 1: Aposta simples ganha
  {
    const profit = calculateBetProfit('Ganha', 20, 2.00);
    const stats = calculateBankrollStats([
      { id: '1', date: '2026-03-10', bookmaker: 'Betano', title: 'Vitória', odd: 2.0, sport: 'Futebol', status: 'Ganha', format: 'Simples', amount: 20, potentialReturn: 40, profit }
    ], 26.00);
    if (profit === 20 && stats.currentBankroll === 46.00 && stats.totalProfit === 20) {
      console.log('✓ Teste 1: Aposta simples ganha (lucro +20, banca aumenta para 46)');
      passed++;
    } else {
      console.error('✗ Teste 1 falhou:', { profit, stats });
    }
  }

  // Teste 2: Aposta simples perdida
  {
    const profit = calculateBetProfit('Perdida', 20, 2.00);
    const stats = calculateBankrollStats([
      { id: '2', date: '2026-03-10', bookmaker: 'Betano', title: 'Vitória', odd: 2.0, sport: 'Futebol', status: 'Perdida', format: 'Simples', amount: 20, potentialReturn: 40, profit }
    ], 26.00);
    if (profit === -20 && stats.currentBankroll === 6.00 && stats.totalProfit === -20) {
      console.log('✓ Teste 2: Aposta simples perdida (prejuízo -20, banca diminui para 6)');
      passed++;
    } else {
      console.error('✗ Teste 2 falhou:', { profit, stats });
    }
  }

  // Teste 3: Aposta simples pendente
  {
    const profit = calculateBetProfit('Pendente', 20, 2.00);
    const stats = calculateBankrollStats([
      { id: '3', date: '2026-03-10', bookmaker: 'Betano', title: 'Vitória', odd: 2.0, sport: 'Futebol', status: 'Pendente', format: 'Simples', amount: 20, potentialReturn: 40, profit }
    ], 26.00);
    if (profit === 0 && stats.currentBankroll === 26.00 && stats.totalBets === 0 && stats.pendingBets === 1) {
      console.log('✓ Teste 3: Aposta simples pendente (não conta nas realizadas, lucro 0, banca inalterada)');
      passed++;
    } else {
      console.error('✗ Teste 3 falhou:', { profit, stats });
    }
  }

  // Teste 4: Aposta simples reembolsada
  {
    const profit = calculateBetProfit('Reembolsada', 20, 2.00);
    const stats = calculateBankrollStats([
      { id: '4', date: '2026-03-10', bookmaker: 'Betano', title: 'DNB', odd: 2.0, sport: 'Futebol', status: 'Reembolsada', format: 'Simples', amount: 20, potentialReturn: 20, profit }
    ], 26.00);
    if (profit === 0 && stats.currentBankroll === 26.00 && stats.totalBets === 1 && stats.roi === 0) {
      console.log('✓ Teste 4: Aposta simples reembolsada (conta nas realizadas, lucro 0, ROI 0%)');
      passed++;
    } else {
      console.error('✗ Teste 4 falhou:', { profit, stats });
    }
  }

  // Teste 5: Aposta simples cancelada
  {
    const profit = calculateBetProfit('Cancelada', 20, 2.00);
    const stats = calculateBankrollStats([
      { id: '5', date: '2026-03-10', bookmaker: 'Betano', title: 'Adiada', odd: 2.0, sport: 'Futebol', status: 'Cancelada', format: 'Simples', amount: 20, potentialReturn: 20, profit }
    ], 26.00);
    if (profit === 0 && stats.currentBankroll === 26.00 && stats.totalBets === 0 && stats.cancelledBets === 1) {
      console.log('✓ Teste 5: Aposta cancelada (não altera a banca e não conta no totalBets)');
      passed++;
    } else {
      console.error('✗ Teste 5 falhou:', { profit, stats });
    }
  }

  // Teste 6: Múltipla com todas as seleções ganhas
  {
    const legs: BetLeg[] = [
      { id: 'l1', matchTitle: 'Time A x Time B', status: 'green' },
      { id: 'l2', matchTitle: 'Time C x Time D', status: 'green' },
      { id: 'l3', matchTitle: 'Time E x Time F', status: 'green' },
    ];
    const status = evaluateBetStatusFromLegs(legs);
    const profit = calculateBetProfit(status, 10, 5.00);
    if (status === 'Ganha' && profit === 40) {
      console.log('✓ Teste 6: Múltipla 100% green -> status Ganha e lucro +40');
      passed++;
    } else {
      console.error('✗ Teste 6 falhou:', { status, profit });
    }
  }

  // Teste 7: Múltipla com 1 seleção perdida e outras ganhas
  {
    const legs: BetLeg[] = [
      { id: 'l1', matchTitle: 'Time A x Time B', status: 'green' },
      { id: 'l2', matchTitle: 'Time C x Time D', status: 'red' },
      { id: 'l3', matchTitle: 'Time E x Time F', status: 'green' },
    ];
    const status = evaluateBetStatusFromLegs(legs);
    const profit = calculateBetProfit(status, 10, 5.00);
    if (status === 'Perdida' && profit === -10) {
      console.log('✓ Teste 7: Múltipla com 1 red -> status Perdida e prejuízo -10');
      passed++;
    } else {
      console.error('✗ Teste 7 falhou:', { status, profit });
    }
  }

  // Teste 8: Múltipla com 1 pendente e demais ganhas
  {
    const legs: BetLeg[] = [
      { id: 'l1', matchTitle: 'Time A x Time B', status: 'green' },
      { id: 'l2', matchTitle: 'Time C x Time D', status: 'pending' },
    ];
    const status = evaluateBetStatusFromLegs(legs);
    if (status === 'Pendente') {
      console.log('✓ Teste 8: Múltipla com seleção pendente -> status Pendente');
      passed++;
    } else {
      console.error('✗ Teste 8 falhou:', status);
    }
  }

  // Teste 9: Múltipla com 1 anulada/void e 1 ganha
  {
    const legs: BetLeg[] = [
      { id: 'l1', matchTitle: 'Time A x Time B', status: 'void' },
      { id: 'l2', matchTitle: 'Time C x Time D', status: 'green' },
    ];
    const status = evaluateBetStatusFromLegs(legs);
    if (status === 'Ganha') {
      console.log('✓ Teste 9: Múltipla com anulada + ganha -> status Ganha');
      passed++;
    } else {
      console.error('✗ Teste 9 falhou:', status);
    }
  }

  // Teste 10: Múltipla com todas anuladas
  {
    const legs: BetLeg[] = [
      { id: 'l1', matchTitle: 'Time A x Time B', status: 'void' },
      { id: 'l2', matchTitle: 'Time C x Time D', status: 'void' },
    ];
    const status = evaluateBetStatusFromLegs(legs);
    if (status === 'Reembolsada') {
      console.log('✓ Teste 10: Múltipla com todas anuladas -> status Reembolsada');
      passed++;
    } else {
      console.error('✗ Teste 10 falhou:', status);
    }
  }

  // Teste 11: Edição de aposta mantendo integridade
  {
    const betInitial: BetItem = {
      id: 'edit-1', date: '2026-03-10', bookmaker: 'Betano', title: 'Original', odd: 2.0, sport: 'Futebol', status: 'Pendente', format: 'Simples', amount: 10, potentialReturn: 20, profit: 0
    };
    const betEdited: BetItem = {
      ...betInitial,
      status: 'Ganha',
      profit: calculateBetProfit('Ganha', betInitial.amount, betInitial.odd)
    };
    if (betEdited.profit === 10 && betEdited.id === betInitial.id) {
      console.log('✓ Teste 11: Edição de aposta mantém integridade e recalcula lucro corretamente');
      passed++;
    } else {
      console.error('✗ Teste 11 falhou:', betEdited);
    }
  }

  // Teste 12: Exclusão de aposta recalculada sem resíduos
  {
    const bets: BetItem[] = [
      { id: 'b1', date: '2026-03-10', bookmaker: 'Betano', title: 'Bet 1', odd: 2.0, sport: 'Futebol', status: 'Ganha', format: 'Simples', amount: 10, potentialReturn: 20, profit: 10 },
      { id: 'b2', date: '2026-03-10', bookmaker: 'Betano', title: 'Bet 2', odd: 2.0, sport: 'Futebol', status: 'Perdida', format: 'Simples', amount: 10, potentialReturn: 20, profit: -10 }
    ];
    const remaining = bets.filter(b => b.id !== 'b2');
    const stats = calculateBankrollStats(remaining, 26.00);
    if (stats.totalBets === 1 && stats.totalProfit === 10 && stats.currentBankroll === 36.00) {
      console.log('✓ Teste 12: Exclusão remove resíduos e atualiza métricas instantaneamente');
      passed++;
    } else {
      console.error('✗ Teste 12 falhou:', stats);
    }
  }

  // Teste 13: Alteração da banca inicial recalcula progressão e banca atual
  {
    const bets: BetItem[] = [
      { id: 'b1', date: '2026-03-10', bookmaker: 'Betano', title: 'Bet 1', odd: 2.0, sport: 'Futebol', status: 'Ganha', format: 'Simples', amount: 20, potentialReturn: 40, profit: 20 }
    ];
    const statsOld = calculateBankrollStats(bets, 26.00);
    const statsNew = calculateBankrollStats(bets, 50.00);
    if (statsOld.currentBankroll === 46.00 && statsNew.currentBankroll === 70.00 && statsNew.progression === 40) {
      console.log('✓ Teste 13: Alteração da banca inicial reflete perfeitamente na banca atual e progressão');
      passed++;
    } else {
      console.error('✗ Teste 13 falhou:', { statsOld, statsNew });
    }
  }

  // Teste 14: Cálculo de ROI correto: (lucro / stake) * 100
  {
    const bets: BetItem[] = [
      { id: 'b1', date: '2026-03-10', bookmaker: 'Betano', title: 'Bet 1', odd: 2.0, sport: 'Futebol', status: 'Ganha', format: 'Simples', amount: 50, potentialReturn: 100, profit: 50 },
      { id: 'b2', date: '2026-03-10', bookmaker: 'Betano', title: 'Bet 2', odd: 2.0, sport: 'Futebol', status: 'Perdida', format: 'Simples', amount: 50, potentialReturn: 100, profit: -50 }
    ];
    const stats = calculateBankrollStats(bets, 100.00);
    if (stats.roi === 0 && stats.totalStake === 100) {
      console.log('✓ Teste 14: ROI neutro calculado perfeitamente: 0% com 100 apostado e 0 de lucro');
      passed++;
    } else {
      console.error('✗ Teste 14 falhou:', stats);
    }
  }

  // Teste 15: Cálculo de progressão correto: (lucro / initialCapital) * 100
  {
    const bets: BetItem[] = [
      { id: 'b1', date: '2026-03-10', bookmaker: 'Betano', title: 'Bet 1', odd: 2.5, sport: 'Futebol', status: 'Ganha', format: 'Simples', amount: 20, potentialReturn: 50, profit: 30 }
    ];
    const stats = calculateBankrollStats(bets, 60.00);
    // Lucro 30 / Banca Inicial 60 = 50%
    if (stats.progression === 50) {
      console.log('✓ Teste 15: Progressão calculada exatamente: (30 / 60) * 100 = 50%');
      passed++;
    } else {
      console.error('✗ Teste 15 falhou:', stats.progression);
    }
  }

  // Teste 16: Avaliação de resultados reais de partidas e mercados (OVER, UNDER, 1X2, BTTS)
  {
    const legOver: BetLeg = { id: 'o1', matchTitle: 'Flamengo x Vasco', market: 'OVER_2_5', status: 'pending' };
    const legUnder: BetLeg = { id: 'u1', matchTitle: 'Flamengo x Vasco', market: 'UNDER_1_5', status: 'pending' };
    const legBTTS: BetLeg = { id: 'b1', matchTitle: 'Flamengo x Vasco', market: 'BTTS_YES', status: 'pending' };
    const leg1X2: BetLeg = { id: 'w1', matchTitle: 'Flamengo x Vasco', market: 'HOME_WIN', status: 'pending' };

    const score2_1: [number, number] = [2, 1]; // Flamengo 2, Vasco 1
    const resOver = evaluateLegResult(legOver.market, score2_1[0], score2_1[1], 'finished');
    const resUnder = evaluateLegResult(legUnder.market, score2_1[0], score2_1[1], 'finished');
    const resBTTS = evaluateLegResult(legBTTS.market, score2_1[0], score2_1[1], 'finished');
    const res1X2 = evaluateLegResult(leg1X2.market, score2_1[0], score2_1[1], 'finished');

    if (resOver === 'green' && resUnder === 'red' && resBTTS === 'green' && res1X2 === 'green') {
      console.log('✓ Teste 16: Avaliação automática de mercados reais (Over, Under, BTTS, 1X2) 100% precisa');
      passed++;
    } else {
      console.error('✗ Teste 16 falhou:', { resOver, resUnder, resBTTS, res1X2 });
    }
  }

  // Teste 17: Persistência de seleções complexas em legs e sincronização com partidas
  {
    const mockMatch: Match = {
      id: 'm-100',
      round: 'Final',
      date: '2026-03-10',
      team1: 'Flamengo',
      team2: 'Fluminense',
      time: '20:00',
      status: 'finished',
      score: { ft: [3, 0] }
    };
    const betWithLeg: BetItem = {
      id: 'sync-test',
      date: '2026-03-10',
      bookmaker: 'Betano',
      title: 'Fla x Flu - Over 2.5',
      odd: 1.85,
      sport: 'Futebol',
      status: 'Pendente',
      format: 'Simples',
      amount: 50,
      potentialReturn: 92.5,
      profit: 0,
      legs: [
        {
          id: 'leg-fla',
          matchId: 'm-100',
          matchTitle: 'Flamengo x Fluminense',
          team1: 'Flamengo',
          team2: 'Fluminense',
          market: 'OVER_2_5',
          marketLabel: 'Mais de 2.5 Gols',
          status: 'pending'
        }
      ]
    };

    const { updatedBet, changed } = syncBetWithMatches(betWithLeg, [mockMatch]);
    if (changed && updatedBet.status === 'Ganha' && updatedBet.profit === 42.5 && updatedBet.legs?.[0].status === 'green') {
      console.log('✓ Teste 17: Sincronização automática com partidas liquida aposta para Ganha com lucro exato');
      passed++;
    } else {
      console.error('✗ Teste 17 falhou:', { updatedBet, changed });
    }
  }

  console.log(`\n=== RESULTADO FINAL DOS TESTES: ${passed} DE ${total} PASSARAM COM SUCESSO! ===`);
  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runValidationTests();
