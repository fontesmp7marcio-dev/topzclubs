import { useState, useEffect, useMemo, useRef } from 'react';
import { BetItem, Match } from '../types';
import { calculateBankrollStats, calculateBetProfit, syncBetWithMatches } from '../utils/betSync';

const LOCAL_STORAGE_BETS_KEY = 'topzclubs_balanco_bets_v1';
const LOCAL_STORAGE_BANKROLL_KEY = 'topzclubs_balanco_bankroll_v1';

function normalizeBetDateStr(dateStr?: string): string {
  if (!dateStr) return '';
  const trimmed = String(dateStr).trim();
  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2].padStart(2, '0')}-${isoMatch[3].padStart(2, '0')}`;
  }
  const brMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (brMatch) {
    const year = brMatch[3].length === 2 ? `20${brMatch[3]}` : brMatch[3];
    return `${year}-${brMatch[2].padStart(2, '0')}-${brMatch[1].padStart(2, '0')}`;
  }
  return trimmed;
}

function dedupeBetsList(list: BetItem[]): BetItem[] {
  const seenIds = new Set<string>();
  const seenKeys = new Set<string>();
  const uniqueBets: BetItem[] = [];

  for (const rawBet of list) {
    if (!rawBet || !rawBet.id || seenIds.has(rawBet.id)) continue;
    seenIds.add(rawBet.id);

    const normDate = normalizeBetDateStr(rawBet.date);
    const b = normDate && normDate !== rawBet.date ? { ...rawBet, date: normDate } : rawBet;

    const titleNorm = (b.title || '').toLowerCase().trim();
    const compositeKey = `${normDate}_${titleNorm}`;
    if (compositeKey && seenKeys.has(compositeKey)) continue;
    if (compositeKey) seenKeys.add(compositeKey);

    uniqueBets.push(b);
  }
  return uniqueBets;
}

export function useBalancoData(
  teamRawMatches?: Record<string | number, any[]>,
  dateMatches?: Match[],
  enabled = true
) {
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
  const lastSyncRef = useRef<number>(0);

  const refreshBetsFromServer = async (triggerMatchSync = false) => {
    try {
      const [betsRes, bankrollRes] = await Promise.all([
        fetch('/api/user-bets').then((r) => r.json()).catch(() => null),
        fetch('/api/user-bankroll').then((r) => r.json()).catch(() => null),
      ]);

      if (betsRes && betsRes.success && Array.isArray(betsRes.bets)) {
        const uniqueBets = dedupeBetsList(betsRes.bets);
        setBets(uniqueBets);
        const needsSync = uniqueBets.some(
          (b: BetItem) =>
            b.status === 'Pendente' ||
            (Array.isArray(b.legs) &&
              b.legs.some(
                (l) =>
                  l.status === 'pending' ||
                  (l.status !== 'void' &&
                    l.matchStatus !== 'finished' &&
                    l.matchStatus !== 'cancelled')
              ))
        );
        if (triggerMatchSync && needsSync) {
          setTimeout(() => {
            handleSyncAllMatchResults(true, uniqueBets);
          }, 800);
        }
      }
      if (bankrollRes && bankrollRes.success && typeof bankrollRes.initialCapital === 'number') {
        setInitialCapital(bankrollRes.initialCapital);
      }
    } catch (e) {
      console.warn('Error loading balance data from Supabase:', e);
    }
  };

  // Sync with Supabase on mount + periodic background refresh for auto-generated tickets & GREEN/RED updates
  useEffect(() => {
    if (!enabled) return;
    let isMounted = true;

    refreshBetsFromServer(true);

    const interval = setInterval(() => {
      if (isMounted && document.visibilityState === 'visible') {
        refreshBetsFromServer(false);
      }
    }, 60000);

    const handleFocus = () => {
      if (isMounted) {
        refreshBetsFromServer(false);
      }
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [enabled]);

  // Save to localStorage on bets change (debounced for 0ms UI lag)
  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_BETS_KEY, JSON.stringify(bets));
      } catch (e) {
        console.warn('Error saving to localStorage:', e);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [bets, enabled]);

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

  // Sync all match results across FotMob matchDetails + daily feeds
  const handleSyncAllMatchResults = async (silent = false, customBets?: BetItem[]) => {
    if (isSyncing) return;
    setIsSyncing(true);

    try {
      let baseBets = customBets || bets;
      let totalUpdated = 0;

      // 1. Authoritative server-side FotMob verification (daily feed + matchDetails by matchId)
      try {
        const serverSyncRes = await fetch('/api/balanco/sync-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ force: !silent }),
        }).then((r) => r.json());

        if (serverSyncRes && serverSyncRes.success && Array.isArray(serverSyncRes.bets)) {
          baseBets = dedupeBetsList(serverSyncRes.bets);
          totalUpdated += Number(serverSyncRes.updatedCount) || 0;
        }
      } catch (serverErr) {
        console.warn('Server-side sync failed, continuing with local FotMob pool:', serverErr);
      }

      // 2. Also apply any in-memory dateMatches / teamRawMatches (live updates on screen)
      const allPoolMatches: Match[] = [...(dateMatches || [])];
      if (allPoolMatches.length > 0 || (teamRawMatches && Object.keys(teamRawMatches).length > 0)) {
        baseBets = baseBets.map((bet) => {
          const needsLocalSync =
            bet.status === 'Pendente' ||
            (Array.isArray(bet.legs) && bet.legs.some((l) => l.status === 'pending' || l.matchStatus === 'live'));
          if (!needsLocalSync) return bet;

          const { updatedBet, changed } = syncBetWithMatches(bet, allPoolMatches, teamRawMatches);
          if (changed) {
            totalUpdated++;
            fetch('/api/user-bets', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedBet),
            }).catch((err) => console.warn('Error syncing bet with Supabase:', err));
            return updatedBet;
          }
          return bet;
        });
      }

      lastSyncRef.current = Date.now();

      if (totalUpdated > 0 || baseBets !== (customBets || bets)) {
        setBets(dedupeBetsList(baseBets));
      }

      if (totalUpdated > 0) {
        if (!silent) {
          setNotification({
            message: `Sincronização concluída! ${totalUpdated} ${totalUpdated === 1 ? 'aposta atualizada' : 'apostas atualizadas'} com o FotMob.`,
            type: 'success',
          });
        }
      } else if (!silent) {
        setNotification({
          message: 'Todas as apostas já estão 100% atualizadas com os resultados oficiais do FotMob.',
          type: 'info',
        });
      }
    } catch (err) {
      console.error('Error during match sync:', err);
      if (!silent) {
        setNotification({
          message: 'Erro ao sincronizar resultados com os servidores do FotMob.',
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
      date: normalizeBetDateStr(bet.date) || bet.date,
      createdAt: bet.createdAt || new Date().toISOString(),
      profit: calculatedProfit,
    };

    setBets((prev) => {
      // 1. By exact ID
      const idx = prev.findIndex((b) => b.id === sanitizedBet.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = sanitizedBet;
        return next;
      }
      // 2. Prevent duplicate ticket creation if same date + title exists
      const titleNorm = (sanitizedBet.title || '').toLowerCase().trim();
      const existingIdx = prev.findIndex(
        (b) => normalizeBetDateStr(b.date) === sanitizedBet.date && (b.title || '').toLowerCase().trim() === titleNorm
      );
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = sanitizedBet;
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

  const handleSaveMultipleBets = async (newBets: BetItem[], customMessage?: string) => {
    if (!newBets || newBets.length === 0) return;
    const baseMs = Date.now();
    const sanitizedList: BetItem[] = newBets.map((bet, idx) => ({
      ...bet,
      date: normalizeBetDateStr(bet.date) || bet.date,
      createdAt: bet.createdAt || new Date(baseMs + (newBets.length - 1 - idx) * 10).toISOString(),
      profit: calculateBetProfit(bet.status, bet.amount, bet.odd),
    }));

    setBets((prev) => {
      const next = [...prev];
      for (let i = sanitizedList.length - 1; i >= 0; i--) {
        const sanitizedBet = sanitizedList[i];
        const idx = next.findIndex((b) => b.id === sanitizedBet.id);
        if (idx >= 0) {
          next[idx] = sanitizedBet;
          continue;
        }
        const titleNorm = (sanitizedBet.title || '').toLowerCase().trim();
        const existingIdx = next.findIndex(
          (b) => normalizeBetDateStr(b.date) === sanitizedBet.date && (b.title || '').toLowerCase().trim() === titleNorm
        );
        if (existingIdx >= 0) {
          next[existingIdx] = sanitizedBet;
          continue;
        }
        next.unshift(sanitizedBet);
      }
      return next;
    });

    setNotification({
      message:
        customMessage ||
        `${sanitizedList.length} ${
          sanitizedList.length === 1 ? 'bilhete salvo' : 'bilhetes salvos'
        } com sucesso!`,
      type: 'success',
    });

    try {
      await Promise.all(
        sanitizedList.map((sanitizedBet) =>
          fetch('/api/user-bets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sanitizedBet),
          })
        )
      );
    } catch (e) {
      console.warn('Error saving multiple bets to Supabase:', e);
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
    handleSaveMultipleBets,
    handleDeleteBet,
    handleSaveBankroll,
    refreshBetsFromServer,
  };
}
