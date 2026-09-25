import { useState, useEffect, useMemo } from 'react';
import { BetItem, Match } from '../types';
import { calculateBankrollStats, calculateBetProfit, syncBetWithMatches } from '../utils/betSync';

const LOCAL_STORAGE_BETS_KEY = 'topzclubs_balanco_bets_v1';
const LOCAL_STORAGE_BANKROLL_KEY = 'topzclubs_balanco_bankroll_v1';

export function useBalancoData() {
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

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Sync with Supabase on mount
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
          if (betsRes.bets.some((b: BetItem) => b.status === 'Pendente' || (b.legs && b.legs.length > 0))) {
            handleSyncAllMatchResults(true, betsRes.bets);
          }
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

  // Calculate bankroll statistics
  const stats = useMemo(() => {
    return calculateBankrollStats(bets, initialCapital);
  }, [bets, initialCapital]);

  // Sync all match results
  const handleSyncAllMatchResults = async (silent = false, customBets?: BetItem[]) => {
    if (isSyncing) return;
    setIsSyncing(true);

    try {
      const sourceBets = customBets || bets;
      const datesToFetch: string[] = Array.from(
        new Set(
          sourceBets
            .filter((b) => Boolean(b.date) && (b.status === 'Pendente' || (b.legs && b.legs.length > 0)))
            .map((b) => b.date)
        )
      );

      if (datesToFetch.length === 0) {
        if (!silent) {
          setNotification({
            message: 'Nenhuma aposta pendente para sincronizar.',
            type: 'info',
          });
        }
        setIsSyncing(false);
        return;
      }

      const matchesByDate: Record<string, Match[]> = {};
      await Promise.all(
        datesToFetch.map(async (d) => {
          try {
            const res = await fetch(`/api/fotmob/matches-by-date?date=${d}`);
            const data = await res.json();
            if (data && Array.isArray(data.matches)) {
              matchesByDate[d] = data.matches;
            }
          } catch (e) {
            console.warn(`Failed to fetch matches for date ${d}:`, e);
          }
        })
      );

      let updatedCount = 0;
      const updatedBets = sourceBets.map((bet) => {
        const dayMatches = matchesByDate[bet.date] || [];
        const { updatedBet, changed } = syncBetWithMatches(bet, dayMatches);
        if (changed) {
          updatedCount++;
          fetch('/api/user-bets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBet),
          }).catch((err) => console.warn('Error syncing bet with Supabase:', err));
          return updatedBet;
        }
        return bet;
      });

      if (updatedCount > 0) {
        setBets(updatedBets);
        setNotification({
          message: `Sincronização concluída! ${updatedCount} ${updatedCount === 1 ? 'aposta atualizada' : 'apostas atualizadas'}.`,
          type: 'success',
        });
      } else if (!silent) {
        setNotification({
          message: 'Todas as apostas já estão 100% atualizadas com os resultados oficiais.',
          type: 'info',
        });
      }
    } catch (err) {
      console.error('Error during match sync:', err);
      if (!silent) {
        setNotification({
          message: 'Erro ao sincronizar resultados com os servidores de dados.',
          type: 'info',
        });
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveBet = async (bet: BetItem) => {
    const calculatedProfit = calculateBetProfit(bet.status, bet.amount, bet.odd);
    const sanitizedBet: BetItem = {
      ...bet,
      profit: calculatedProfit,
    };

    setBets((prev) => {
      const idx = prev.findIndex((b) => b.id === sanitizedBet.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = sanitizedBet;
        return next;
      }
      return [sanitizedBet, ...prev];
    });

    setNotification({
      message: `Aposta "${sanitizedBet.title}" salva com sucesso!`,
      type: 'success',
    });

    try {
      await fetch('/api/user-bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedBet),
      });
    } catch (e) {
      console.warn('Error saving bet to Supabase:', e);
    }
  };

  const handleDeleteBet = async (betId: string) => {
    setBets((prev) => prev.filter((b) => b.id !== betId));
    setNotification({
      message: 'Aposta excluída com sucesso!',
      type: 'info',
    });

    try {
      await fetch(`/api/user-bets/${encodeURIComponent(betId)}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Error deleting bet from Supabase:', e);
    }
  };

  const handleSaveBankroll = async (val: number) => {
    if (!isNaN(val) && val >= 0) {
      setInitialCapital(val);
      setNotification({
        message: `Banca inicial ajustada para ${val.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })} R$`,
        type: 'success',
      });

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

  return {
    bets,
    setBets,
    initialCapital,
    setInitialCapital,
    stats,
    notification,
    setNotification,
    isSyncing,
    handleSyncAllMatchResults,
    handleSaveBet,
    handleDeleteBet,
    handleSaveBankroll,
  };
}
