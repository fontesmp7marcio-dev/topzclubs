import React, { useState, useMemo, useRef } from 'react';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Search,
  Filter,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Target,
  ArrowRight,
  Info,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Check,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { BetItem, BetLeg, BetLegStatus } from '../types';
import { resolveMatchLeague } from '../utils/leagueResolver';
import { normalizeTeamName } from '../data/favoriteClubs';

interface RelatorioConfrontosProps {
  bets: BetItem[];
  supabaseFavorites?: { id: number; name: string; country?: string; league?: string }[];
}

export interface EnrichedLeg {
  id: string;
  matchId?: string;
  betId: string;
  betDate: string;
  betFormat: string;
  betOdd: number;
  betAmount: number;
  betStatus: string;
  matchTitle: string;
  team1: string;
  team2: string;
  market: string;
  marketLabel: string;
  status: BetLegStatus;
  score: { ft: [number, number] } | null;
  settledScore: [number, number] | null;
  totalGoals: number | null;
  matchStatus?: string;
  time?: string;
  league: string;
  country: string;
  isExotic: boolean;
  tier: string;
  redReason?: string;
}

export const RelatorioConfrontos: React.FC<RelatorioConfrontosProps> = ({
  bets,
  supabaseFavorites,
}) => {
  // Filtros de visualização
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'red' | 'green' | 'pending'>('all');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [filterTeam, setFilterTeam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAnalysisView, setActiveAnalysisView] = useState<'geral' | 'ligas' | 'times'>('geral');
  const [copied, setCopied] = useState<boolean>(false);

  // Estados de Recolher/Expandir e Visualização Detalhada
  const [isExplorarExpanded, setIsExplorarExpanded] = useState<boolean>(true);
  const [showAllRedsLeagues, setShowAllRedsLeagues] = useState<boolean>(false);
  const [showAllRedsTeams, setShowAllRedsTeams] = useState<boolean>(false);
  const explorarSectionRef = useRef<HTMLDivElement>(null);

  // 1. Extração e Enriquecimento de TODOS os confrontos (pernas) de dentro de todos os bilhetes
  const allConfrontos = useMemo<EnrichedLeg[]>(() => {
    const list: EnrichedLeg[] = [];

    bets.forEach((bet) => {
      const legs = bet.legs || [];

      // Se o bilhete não tiver pernas explícitas, gerar pernas virtuais a partir do título para não perder nenhum jogo
      if (legs.length === 0 && bet.title) {
        const rawGames = bet.title.split(/\s*\+\s*/);
        rawGames.forEach((rg, idx) => {
          const parts = rg.split(/\s+(?:x|vs|v)\s+/i);
          const t1 = parts[0]?.trim() || 'Mandante';
          const t2 = parts[1]?.trim() || 'Visitante';
          const resolved = resolveMatchLeague({ matchTitle: rg, team1: t1, team2: t2 }, supabaseFavorites);
          const legStatus: BetLegStatus =
            bet.status === 'Ganha' ? 'green' : bet.status === 'Perdida' ? 'red' : 'pending';

          list.push({
            id: `${bet.id}-virtual-${idx}`,
            betId: bet.id,
            betDate: bet.date || '',
            betFormat: bet.format || 'Simples',
            betOdd: bet.odd,
            betAmount: bet.amount,
            betStatus: bet.status,
            matchTitle: `${t1} x ${t2}`,
            team1: t1,
            team2: t2,
            market: 'OVER_1_5',
            marketLabel: 'Mais de 1.5 gols',
            status: legStatus,
            score: null,
            settledScore: null,
            totalGoals: null,
            league: resolved.league,
            country: resolved.country,
            isExotic: resolved.isExotic,
            tier: resolved.tier,
          });
        });
        return;
      }

      legs.forEach((leg, legIdx) => {
        let t1 = leg.team1 || '';
        let t2 = leg.team2 || '';
        if ((!t1 || !t2) && leg.matchTitle) {
          const parts = leg.matchTitle.split(/\s+(?:x|vs|v)\s+/i);
          if (parts.length >= 2) {
            t1 = t1 || parts[0].trim();
            t2 = t2 || parts[1].trim();
          }
        }

        const resolved = resolveMatchLeague(
          {
            matchTitle: leg.matchTitle,
            team1: t1,
            team2: t2,
            league: leg.league,
            competition: leg.competition,
            leagueName: leg.leagueName,
          },
          supabaseFavorites
        );

        let totalGoals: number | null = null;
        const score = leg.score?.ft || leg.settledScore;
        if (score && Array.isArray(score) && score.length >= 2) {
          totalGoals = Number(score[0]) + Number(score[1]);
        }

        // Diagnóstico de motivo para os REDs
        let redReason = '';
        if (leg.status === 'red') {
          if (totalGoals === 1) {
            redReason = 'Faltou 1 gol (terminou 1x0 ou 0x1 em Mais de 1.5)';
          } else if (totalGoals === 0) {
            redReason = 'Jogo sem gols (terminou 0x0 em Mais de 1.5)';
          } else if (totalGoals !== null && totalGoals >= 2) {
            redReason = 'Linha de mercado não satisfeita';
          } else {
            redReason = 'Placar insuficiente para a linha';
          }
        }

        const uniqueLegId = `${bet.id}_leg_${leg.id || legIdx}_${legIdx}`;

        list.push({
          id: uniqueLegId,
          matchId: leg.matchId || leg.id,
          betId: bet.id,
          betDate: leg.date || bet.date || '',
          betFormat: bet.format || (legs.length > 1 ? 'Múltipla' : 'Simples'),
          betOdd: bet.odd,
          betAmount: bet.amount,
          betStatus: bet.status,
          matchTitle: leg.matchTitle || `${t1} x ${t2}`,
          team1: t1,
          team2: t2,
          market: leg.market || 'OVER_1_5',
          marketLabel: leg.marketLabel || 'Mais de 1.5 gols',
          status: leg.status,
          score: leg.score || null,
          settledScore: leg.settledScore || null,
          totalGoals,
          matchStatus: leg.matchStatus,
          time: leg.time,
          league: resolved.league,
          country: resolved.country,
          isExotic: resolved.isExotic,
          tier: resolved.tier,
          redReason,
        });
      });
    });

    return list;
  }, [bets, supabaseFavorites]);

  // 2. Estatísticas Consolidadas Globais: Confrontos vs Bilhetes
  const stats = useMemo(() => {
    // Totais de bilhetes
    const totalBilhetes = bets.length;
    const ganhasBilhetes = bets.filter((b) => b.status === 'Ganha').length;
    const perdidasBilhetes = bets.filter((b) => b.status === 'Perdida').length;
    const pendentesBilhetes = bets.filter((b) => b.status === 'Pendente').length;
    const settledBilhetes = ganhasBilhetes + perdidasBilhetes;
    const assertividadeBilhetes =
      settledBilhetes > 0 ? (ganhasBilhetes / settledBilhetes) * 100 : 0;

    // Totais de confrontos (pernas)
    const totalConfrontos = allConfrontos.length;
    const greens = allConfrontos.filter((c) => c.status === 'green');
    const reds = allConfrontos.filter((c) => c.status === 'red');
    const pendentes = allConfrontos.filter((c) => c.status === 'pending');
    const settledConfrontos = greens.length + reds.length;
    const assertividadeConfrontos =
      settledConfrontos > 0 ? (greens.length / settledConfrontos) * 100 : 0;

    // Motivos dos Reds (83.3% são 1x0 e 16.7% são 0x0)
    let redsCom1Gol = 0;
    let redsCom0Gols = 0;
    let redsOutros = 0;

    reds.forEach((r) => {
      if (r.totalGoals === 1) redsCom1Gol++;
      else if (r.totalGoals === 0) redsCom0Gols++;
      else redsOutros++;
    });

    // Análise de ligas dos Reds: Quantos foram em ligas periféricas / exóticas
    const redsEmLigasExoticas = reds.filter(
      (r) =>
        r.isExotic ||
        (r.country !== 'Inglaterra' &&
          r.country !== 'Espanha' &&
          r.country !== 'Alemanha' &&
          r.country !== 'Itália' &&
          r.country !== 'Brasil')
    ).length;
    const pctRedsExoticas = reds.length > 0 ? (redsEmLigasExoticas / reds.length) * 100 : 0;

    return {
      totalBilhetes,
      ganhasBilhetes,
      perdidasBilhetes,
      pendentesBilhetes,
      assertividadeBilhetes,
      totalConfrontos,
      totalGreens: greens.length,
      totalReds: reds.length,
      totalPendentes: pendentes.length,
      settledConfrontos,
      assertividadeConfrontos,
      redsCom1Gol,
      redsCom0Gols,
      redsOutros,
      pctReds1Gol: reds.length > 0 ? (redsCom1Gol / reds.length) * 100 : 0,
      pctReds0Gols: reds.length > 0 ? (redsCom0Gols / reds.length) * 100 : 0,
      redsEmLigasExoticas,
      pctRedsExoticas,
    };
  }, [bets, allConfrontos]);

  // 3. Agrupamento por Liga (Análise Detalhada de Ligas com mais Reds)
  const leagueStats = useMemo(() => {
    const map = new Map<
      string,
      {
        league: string;
        country: string;
        isExotic: boolean;
        total: number;
        greens: number;
        reds: number;
        pendings: number;
        winRate: number;
        redRate: number;
        sampleMatches: EnrichedLeg[];
      }
    >();

    allConfrontos.forEach((c) => {
      // Usar a liga canônica como chave de agrupamento unificada para garantir 100% de consistência
      const key = c.league;
      if (!map.has(key)) {
        map.set(key, {
          league: c.league,
          country: c.country,
          isExotic: c.isExotic,
          total: 0,
          greens: 0,
          reds: 0,
          pendings: 0,
          winRate: 0,
          redRate: 0,
          sampleMatches: [],
        });
      }

      const item = map.get(key)!;
      item.total++;
      if (c.status === 'green') item.greens++;
      else if (c.status === 'red') item.reds++;
      else if (c.status === 'pending') item.pendings++;

      if (item.sampleMatches.length < 5) {
        item.sampleMatches.push(c);
      }
    });

    const result = Array.from(map.values()).map((l) => {
      const settled = l.greens + l.reds;
      return {
        ...l,
        winRate: settled > 0 ? (l.greens / settled) * 100 : 0,
        redRate: settled > 0 ? (l.reds / settled) * 100 : 0,
      };
    });

    // Ordenar primeiro por ligas com mais REDs, depois por taxa de red e total de jogos
    return result.sort((a, b) => {
      if (b.reds !== a.reds) return b.reds - a.reds;
      if (b.redRate !== a.redRate) return b.redRate - a.redRate;
      return b.total - a.total;
    });
  }, [allConfrontos]);

  // 4. Agrupamento por Times (Análise de Clubes com mais Reds)
  const teamStats = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        normalizedKey: string;
        league: string;
        country: string;
        reds: number;
        greens: number;
        total: number;
        asHomeReds: number;
        asAwayReds: number;
        redMatches: EnrichedLeg[];
        allMatches: EnrichedLeg[];
      }
    >();

    allConfrontos.forEach((c) => {
      [
        { name: c.team1, isHome: true },
        { name: c.team2, isHome: false },
      ].forEach(({ name, isHome }) => {
        if (!name) return;
        const normKey = normalizeTeamName(name) || name.toLowerCase().trim();
        if (!map.has(normKey)) {
          map.set(normKey, {
            name: name,
            normalizedKey: normKey,
            league: c.league,
            country: c.country,
            reds: 0,
            greens: 0,
            total: 0,
            asHomeReds: 0,
            asAwayReds: 0,
            redMatches: [],
            allMatches: [],
          });
        }
        const item = map.get(normKey)!;
        item.total++;
        item.allMatches.push(c);
        if (c.status === 'red') {
          item.reds++;
          if (isHome) item.asHomeReds++;
          else item.asAwayReds++;
          if (!item.redMatches.find((m) => m.id === c.id)) {
            item.redMatches.push(c);
          }
        } else if (c.status === 'green') {
          item.greens++;
        }
      });
    });

    return Array.from(map.values())
      .filter((t) => t.reds > 0)
      .sort((a, b) => b.reds - a.reds || b.total - a.total);
  }, [allConfrontos]);

  // Todas as Ligas com mais REDs reais ranqueadas
  const allRedsLeagues = useMemo(() => {
    return leagueStats
      .filter((l) => l.reds > 0)
      .sort((a, b) => {
        if (b.reds !== a.reds) return b.reds - a.reds;
        if (b.redRate !== a.redRate) return b.redRate - a.redRate;
        return b.total - a.total;
      });
  }, [leagueStats]);

  // Top Ligas 100% Green (mínimo 2 jogos)
  const topGreenLeagues = useMemo(() => {
    return leagueStats
      .filter((l) => l.reds === 0 && l.greens >= 2)
      .sort((a, b) => b.greens - a.greens)
      .slice(0, 5);
  }, [leagueStats]);

  // Todos os Clubes com mais REDs reais ranqueados
  const allRedsTeams = useMemo(() => {
    return teamStats
      .filter((t) => t.reds > 0)
      .sort((a, b) => b.reds - a.reds || b.total - a.total);
  }, [teamStats]);

  // Top Clubes 100% Green (Zero Reds, mínimo 2 jogos)
  const topGreenTeams = useMemo(() => {
    const map = new Map<string, { name: string; greens: number; league: string }>();
    allConfrontos.forEach((c) => {
      [c.team1, c.team2].forEach((t) => {
        if (!t) return;
        const normKey = normalizeTeamName(t) || t.toLowerCase().trim();
        if (!map.has(normKey)) {
          map.set(normKey, { name: t, greens: 0, league: c.league });
        }
        if (c.status === 'green') {
          map.get(normKey)!.greens++;
        }
      });
    });

    const redKeys = new Set(teamStats.map((t) => t.normalizedKey));
    return Array.from(map.values())
      .filter((t) => !redKeys.has(normalizeTeamName(t.name)) && t.greens >= 2)
      .sort((a, b) => b.greens - a.greens)
      .slice(0, 5);
  }, [allConfrontos, teamStats]);

  // Ações de Filtragem com mudança de aba suave e auto-expand do Explorador de confrontos
  const handleViewTeamMatches = (teamName: string) => {
    setFilterTeam(teamName);
    setSelectedLeague('all');
    setSelectedStatus('all');
    setSearchQuery('');
    setActiveAnalysisView('geral');
    setIsExplorarExpanded(true);
    setTimeout(() => {
      explorarSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleViewLeagueMatches = (leagueName: string) => {
    setSelectedLeague(leagueName);
    setFilterTeam(null);
    setSelectedStatus('all');
    setSearchQuery('');
    setActiveAnalysisView('geral');
    setIsExplorarExpanded(true);
    setTimeout(() => {
      explorarSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleClearFilters = () => {
    setFilterTeam(null);
    setSelectedLeague('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  // Confrontos correspondentes aos filtros de Time / Liga / Busca (antes do filtro de Status)
  const preStatusMatches = useMemo(() => {
    return allConfrontos.filter((c) => {
      // Filtro de Clube específico (com normalização inteligente)
      if (filterTeam) {
        const normFilter = normalizeTeamName(filterTeam);
        const norm1 = normalizeTeamName(c.team1);
        const norm2 = normalizeTeamName(c.team2);
        const normTitle = normalizeTeamName(c.matchTitle);
        const matchesThisTeam =
          norm1 === normFilter ||
          norm2 === normFilter ||
          norm1.includes(normFilter) ||
          norm2.includes(normFilter) ||
          normFilter.includes(norm1) ||
          normFilter.includes(norm2) ||
          normTitle.includes(normFilter);
        if (!matchesThisTeam) return false;
      }

      // Filtro de Liga
      if (selectedLeague !== 'all' && c.league !== selectedLeague) return false;

      // Filtro de Busca manual
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = c.matchTitle.toLowerCase().includes(query);
        const inTeam1 = c.team1.toLowerCase().includes(query);
        const inTeam2 = c.team2.toLowerCase().includes(query);
        const inLeague = c.league.toLowerCase().includes(query);
        const inCountry = c.country.toLowerCase().includes(query);
        if (!inTitle && !inTeam1 && !inTeam2 && !inLeague && !inCountry) return false;
      }

      return true;
    });
  }, [allConfrontos, filterTeam, selectedLeague, searchQuery]);

  const preStatusGreens = useMemo(
    () => preStatusMatches.filter((c) => c.status === 'green').length,
    [preStatusMatches]
  );
  const preStatusReds = useMemo(
    () => preStatusMatches.filter((c) => c.status === 'red').length,
    [preStatusMatches]
  );
  const preStatusPending = useMemo(
    () => preStatusMatches.filter((c) => c.status === 'pending').length,
    [preStatusMatches]
  );

  // 5. Confrontos Filtrados para exibição final (aplicando o Status)
  const filteredConfrontos = useMemo(() => {
    return preStatusMatches.filter((c) => {
      if (selectedStatus === 'red' && c.status !== 'red') return false;
      if (selectedStatus === 'green' && c.status !== 'green') return false;
      if (selectedStatus === 'pending' && c.status !== 'pending') return false;
      return true;
    });
  }, [preStatusMatches, selectedStatus]);

  // Copiar resumo dos Insights para a área de transferência
  const handleCopyInsights = () => {
    const topLeaguesText = allRedsLeagues
      .slice(0, 5)
      .map((l, i) => `  ${i + 1}º ${l.league}: ${l.reds} Reds em ${l.total} jogos (${l.greens} Greens)`)
      .join('\n');
    const topTeamsText = allRedsTeams
      .slice(0, 5)
      .map((t, i) => `  ${i + 1}º ${t.name}: ${t.reds} Reds de ${t.total} jogos (${t.greens} Greens)`)
      .join('\n');
    const topGreensText = topGreenLeagues.map((l) => l.league).join(', ');

    const text = `📊 TOPZCLUBS - RAIO-X DOS CONFRONTOS & REDS
• Bilhetes: ${stats.ganhasBilhetes} Ganhas / ${stats.perdidasBilhetes} Perdidas (${stats.assertividadeBilhetes.toFixed(1)}%)
• Confrontos Individuais: ${stats.totalGreens} Greens / ${stats.totalReds} Reds (${stats.assertividadeConfrontos.toFixed(1)}% de Acerto Real nos ${stats.totalConfrontos} jogos)
• Motivo dos Reds: ${stats.pctReds1Gol.toFixed(1)}% dos Reds terminaram 1x0 ou 0x1 (faltou só 1 gol para Mais de 1.5).
• Ligas com mais Reds:
${topLeaguesText || '  Nenhuma liga com Red'}
• Clubes com mais Reds:
${topTeamsText || '  Nenhum clube com Red'}
• Ligas 100% Green (Zero Reds): ${topGreensText || 'Nenhuma'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full space-y-3 sm:space-y-5 pb-6">
      {/* 1. TOP BANNER: APRESENTAÇÃO DO RAIO-X (Totalmente adaptado para Mobile) */}
      <div className="bg-gradient-to-br from-[#1b151e] via-[#17141a] to-[#121016] border border-rose-500/30 rounded-2xl p-3.5 sm:p-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-48 sm:w-96 h-48 sm:h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 shadow-inner mt-0.5 sm:mt-0">
                <ShieldAlert className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h2 className="text-sm sm:text-lg lg:text-xl font-black text-white uppercase tracking-tight font-sans leading-tight">
                    RELATÓRIO & RAIO-X DE REDS
                  </h2>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/40 text-[9px] sm:text-[10px] font-black text-rose-300 uppercase shrink-0">
                    DIAGNÓSTICO
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-medium leading-relaxed">
                  Análise individual das <strong className="text-white">{stats.totalConfrontos} seleções</strong> dos seus bilhetes.
                  Veja em quais ligas e por quais motivos as perdas aconteceram.
                </p>
              </div>
            </div>

            {/* Ação: Copiar Resumo */}
            <div className="flex items-center justify-end sm:justify-start shrink-0">
              <button
                onClick={handleCopyInsights}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#201824] hover:bg-[#2c2032] border border-rose-500/40 text-rose-300 hover:text-white text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Copiar resumo de insights"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
              </button>
            </div>
          </div>

          {/* Contexto Rápido: Chips responsivos */}
          <div className="pt-2.5 border-t border-[#2a222e] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold">
            <div className="flex items-center gap-1.5 flex-wrap text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse shrink-0" />
              <span>Avaliados:</span>
              <span className="text-white font-black">{stats.settledConfrontos} jogos</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-black">{stats.totalGreens} Greens</span>
              <span className="text-zinc-600">/</span>
              <span className="text-rose-400 font-black">{stats.totalReds} Reds</span>
              {stats.totalPendentes > 0 && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span className="text-amber-400 font-black">{stats.totalPendentes} Pendentes</span>
                </>
              )}
            </div>
            <div className="text-zinc-400 text-[10px] sm:text-[11px]">
              Atualização dinâmica com as apostas do Balanço
            </div>
          </div>
        </div>
      </div>

      {/* 2. ⭐ CARD COMPARATIVO: PLACAR DOS BILHETES vs PLACAR DOS CONFRONTOS */}
      <div className="bg-[#141416] border border-[#24242a] rounded-2xl p-3.5 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#222228] pb-2.5 gap-1">
          <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#ccff00] shrink-0" />
            <span>BILHETES vs CONFRONTOS INDIVIDUAIS</span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-zinc-400 font-bold">
            14 bilhetes perdidos ≠ 14 erros nos jogos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* LADO A: VISÃO POR BILHETES (MÚLTIPLAS) */}
          <div className="bg-[#18181f] border border-[#282834] rounded-xl p-3 sm:p-4 space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                PLACAR POR BILHETES
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-sky-500/20 text-sky-300">
                {stats.totalBilhetes} Bilhetes
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-0.5">
              <div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-sans">
                  {stats.ganhasBilhetes}G - {stats.perdidasBilhetes}R
                </span>
                <span className="text-[11px] text-zinc-400 ml-1.5">
                  ({stats.pendentesBilhetes} pend.)
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-zinc-400 block">Assertividade</span>
                <span className="text-base sm:text-lg font-black text-sky-400 font-sans">
                  {stats.assertividadeBilhetes.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="w-full bg-[#101014] rounded-full h-2 overflow-hidden flex">
              <div
                style={{ width: `${stats.assertividadeBilhetes}%` }}
                className="bg-sky-500 h-full transition-all"
                title={`${stats.ganhasBilhetes} bilhetes ganhos`}
              />
              <div
                style={{ width: `${100 - stats.assertividadeBilhetes}%` }}
                className="bg-rose-500 h-full transition-all"
                title={`${stats.perdidasBilhetes} bilhetes perdidos`}
              />
            </div>

            <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-relaxed">
              Em bilhetes de 2 ou 3 jogos, <strong className="text-white">se 1 único confronto falha, todo o bilhete vira RED</strong>.
            </p>
          </div>

          {/* LADO B: VISÃO POR CONFRONTOS INDIVIDUAIS (A VERDADEIRA ASSERTIVIDADE) */}
          <div className="bg-gradient-to-br from-[#141d17] to-[#121614] border-2 border-emerald-500/40 rounded-xl p-3 sm:p-4 space-y-2.5 sm:space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                CONFRONTOS (JOGO A JOGO)
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {stats.totalConfrontos} Jogos
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-0.5">
              <div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400 font-sans">
                  {stats.totalGreens}G - {stats.totalReds}R
                </span>
                <span className="text-[11px] text-zinc-400 ml-1.5">
                  ({stats.totalPendentes} pend.)
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-zinc-400 block">Acerto Individual</span>
                <span className="text-base sm:text-lg font-black text-[#ccff00] font-sans">
                  {stats.assertividadeConfrontos.toFixed(1)}% 🔥
                </span>
              </div>
            </div>

            {/* Barra de progresso dos confrontos */}
            <div className="w-full bg-[#101014] rounded-full h-2 overflow-hidden flex">
              <div
                style={{ width: `${stats.assertividadeConfrontos}%` }}
                className="bg-emerald-500 h-full transition-all"
                title={`${stats.totalGreens} greens individuais`}
              />
              <div
                style={{ width: `${100 - stats.assertividadeConfrontos}%` }}
                className="bg-rose-500 h-full transition-all"
                title={`${stats.totalReds} reds individuais`}
              />
            </div>

            <p className="text-[10px] sm:text-[11px] text-emerald-200/90 leading-relaxed font-medium">
              🔥 <strong className="text-white">Mais de 8 em cada 10 escolhas de jogos batem Green (82,4%)!</strong> Apenas <strong className="text-rose-400">18 jogos deram Red</strong> em 102 confrontos finalizados.
            </p>
          </div>
        </div>
      </div>

      {/* 3. 🎯 DIAGNÓSTICO CIRÚRGICO: POR QUE E ONDE TOMAMOS RED? */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">
        {/* Card Diagnóstico 1: O Motivo do Placar */}
        <div className="bg-[#141416] border border-[#24242a] p-3.5 sm:p-4 rounded-2xl space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              MOTIVO DOS PLACARES
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
              {stats.totalReds} Reds
            </span>
          </div>

          <div className="space-y-2 pt-0.5">
            {/* 1x0 ou 0x1 */}
            <div className="p-2.5 rounded-xl bg-[#1a1418] border border-rose-500/30 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  <span className="truncate">Placar 1 a 0 ou 0 a 1</span>
                </div>
                <div className="text-[10px] text-zinc-400 truncate">Faltou só 1 gol para Mais de 1.5</div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm sm:text-base font-black text-rose-400">{stats.redsCom1Gol} jogos</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 block">({stats.pctReds1Gol.toFixed(1)}%)</span>
              </div>
            </div>

            {/* 0x0 */}
            <div className="p-2.5 rounded-xl bg-[#1c1c22] border border-[#2c2c36] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" />
                  <span className="truncate">Placar 0 a 0 (Sem gols)</span>
                </div>
                <div className="text-[10px] text-zinc-400 truncate">Partidas truncadas</div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm sm:text-base font-black text-zinc-300">{stats.redsCom0Gols} jogos</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 block">({stats.pctReds0Gols.toFixed(1)}%)</span>
              </div>
            </div>

            {stats.redsOutros > 0 && (
              <div className="p-2 rounded-xl bg-[#18181e] border border-[#282834] flex items-center justify-between gap-2 text-xs">
                <span className="text-zinc-400">Outros Placares:</span>
                <span className="text-white font-bold">{stats.redsOutros} jogos</span>
              </div>
            )}
          </div>

          <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-relaxed pt-0.5">
            💡 <strong className="text-white">{stats.pctReds1Gol.toFixed(0)}% dos Reds</strong> falharam por detalhe mínimo (faltou apenas 1 gol para bater Mais de 1.5).
          </p>
        </div>

        {/* Card Diagnóstico 2: Ligas com Mais REDs (Ranking Real) */}
        <div className="bg-[#141416] border border-[#24242a] p-3.5 sm:p-4 rounded-2xl space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              LIGAS COM MAIS REDS
            </span>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
              {stats.totalReds} Reds no total
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-zinc-400">
            Distribuição dos {stats.totalReds} Reds por ligas (clique em "Ver jogos" para filtrar):
          </p>

          <div className="space-y-1.5 pt-0.5">
            {allRedsLeagues.length === 0 ? (
              <div className="text-xs text-zinc-400 py-3 text-center">Nenhuma liga com RED registrado.</div>
            ) : (
              (showAllRedsLeagues ? allRedsLeagues : allRedsLeagues.slice(0, 4)).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleViewLeagueMatches(item.league)}
                  className="p-2 sm:p-2.5 rounded-xl bg-[#1d1419] border border-rose-500/30 flex items-center justify-between gap-2 hover:bg-[#251720] transition-colors cursor-pointer group"
                  title={`Ver todos os ${item.total} jogos de ${item.league}`}
                >
                  <div className="min-w-0 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-black flex items-center justify-center shrink-0 border border-rose-500/30">
                      {idx + 1}º
                    </span>
                    <div className="truncate">
                      <span className="text-xs font-black text-white group-hover:text-rose-200 block truncate">
                        {item.league}
                      </span>
                      <span className="text-[10px] text-zinc-400 block truncate">
                        {item.total} {item.total === 1 ? 'jogo' : 'jogos'} • {item.greens} Greens / {item.reds} {item.reds === 1 ? 'Red' : 'Reds'} ({Math.round(item.redRate)}% Red)
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-rose-400 block">
                      {item.reds} {item.reds === 1 ? 'RED' : 'REDS'}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-bold group-hover:text-white transition-colors">
                      Ver {item.total} {item.total === 1 ? 'jogo' : 'jogos'} →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {allRedsLeagues.length > 4 && (
            <button
              onClick={() => setShowAllRedsLeagues(!showAllRedsLeagues)}
              className="w-full py-1.5 px-3 rounded-xl bg-[#1c1c24] hover:bg-[#242430] border border-zinc-800 text-[11px] font-bold text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {showAllRedsLeagues ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Mostrar menos (Top 4)</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Ver todas as {allRedsLeagues.length} ligas com Red ({stats.totalReds} Reds no total)</span>
                </>
              )}
            </button>
          )}

          {topGreenLeagues.length > 0 && (
            <div className="p-2 rounded-xl bg-[#141b16] border border-emerald-500/30 text-[10px] space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-300">100% Green (Zero Reds):</span>
                <span className="text-emerald-400 font-black">{topGreenLeagues.length} ligas</span>
              </div>
              <p className="text-zinc-400 truncate">
                {topGreenLeagues.map((l) => l.league).join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Card Diagnóstico 3: Clubes com Mais REDs (Ranking Real) */}
        <div className="bg-[#141416] border border-[#24242a] p-3.5 sm:p-4 rounded-2xl space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              CLUBES COM MAIS REDS
            </span>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
              {allRedsTeams.length} Clubes
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-zinc-400">
            Clubes que mais estiveram envolvidos em jogos que deram Red:
          </p>

          <div className="space-y-1.5 pt-0.5">
            {allRedsTeams.length === 0 ? (
              <div className="text-xs text-zinc-400 py-3 text-center">Nenhum clube com RED registrado.</div>
            ) : (
              (showAllRedsTeams ? allRedsTeams : allRedsTeams.slice(0, 4)).map((team, idx) => (
                <div
                  key={idx}
                  onClick={() => handleViewTeamMatches(team.name)}
                  className="p-2 sm:p-2.5 rounded-xl bg-[#1d1419] border border-rose-500/30 flex items-center justify-between gap-2 hover:bg-[#251720] transition-colors cursor-pointer group"
                  title={`Ver todos os ${team.total} jogos de ${team.name}`}
                >
                  <div className="min-w-0 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-black flex items-center justify-center shrink-0 border border-rose-500/30">
                      {idx + 1}º
                    </span>
                    <div className="truncate">
                      <span className="text-xs font-black text-white group-hover:text-rose-200 block truncate">
                        {team.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 block truncate">
                        {team.league} • {team.greens}G / {team.reds}R (Total: {team.total} jogos)
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-rose-400 block">
                      {team.reds} {team.reds === 1 ? 'RED' : 'REDS'}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-bold group-hover:text-white transition-colors">
                      Ver {team.total} {team.total === 1 ? 'jogo' : 'jogos'} →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {allRedsTeams.length > 4 && (
            <button
              onClick={() => setShowAllRedsTeams(!showAllRedsTeams)}
              className="w-full py-1.5 px-3 rounded-xl bg-[#1c1c24] hover:bg-[#242430] border border-zinc-800 text-[11px] font-bold text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {showAllRedsTeams ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Mostrar menos (Top 4)</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Ver todos os {allRedsTeams.length} clubes com Red</span>
                </>
              )}
            </button>
          )}

          {topGreenTeams.length > 0 && (
            <div className="p-2 rounded-xl bg-[#141b16] border border-emerald-500/30 text-[10px] space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-300">100% Green (Zero Reds):</span>
                <span className="text-emerald-400 font-black">{topGreenTeams.length} clubes</span>
              </div>
              <p className="text-zinc-400 truncate">
                {topGreenTeams.map((t) => t.name).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. SELETOR DE SUB-VISÕES ANALÍTICAS (Swipe horizontal suave no Mobile) */}
      <div className="flex items-center gap-2 border-b border-[#222228] pb-1 overflow-x-auto scrollbar-none -mx-1 px-1">
        <button
          onClick={() => setActiveAnalysisView('geral')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
            activeAnalysisView === 'geral'
              ? 'bg-white text-black border-white shadow-sm'
              : 'bg-[#141416] text-zinc-400 border-[#242428] hover:text-white'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>CONFRONTOS ({stats.totalConfrontos})</span>
        </button>

        <button
          onClick={() => setActiveAnalysisView('ligas')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
            activeAnalysisView === 'ligas'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
              : 'bg-[#141416] text-zinc-400 border-[#242428] hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>POR LIGAS ({leagueStats.length})</span>
        </button>

        <button
          onClick={() => setActiveAnalysisView('times')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
            activeAnalysisView === 'times'
              ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
              : 'bg-[#141416] text-zinc-400 border-[#242428] hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>TIMES EM RED ({teamStats.length})</span>
        </button>
      </div>

      {/* 5. VISÃO A: RANKING DE LIGAS */}
      {activeAnalysisView === 'ligas' && (
        <div className="bg-[#141416] border border-[#24242a] rounded-2xl p-3.5 sm:p-5 shadow-sm space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#222228] pb-2.5">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                ASSERTIVIDADE POR LIGA
              </h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                Classificado por ligas com mais incidência de REDs
              </p>
            </div>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-bold">
              {leagueStats.length} ligas registradas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {leagueStats.map((item, lIdx) => {
              const hasReds = item.reds > 0;

              return (
                <div
                  key={`${item.league}-${item.country}-${lIdx}`}
                  className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                    hasReds
                      ? 'bg-[#191418] border-rose-500/30'
                      : 'bg-[#151816] border-emerald-500/30'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-black text-white block truncate">
                          {item.league}
                        </span>
                        <span className="text-[10px] text-zinc-400 block truncate">
                          {item.country} {item.isExotic ? '• Secundária' : '• Principal'}
                        </span>
                      </div>
                      {hasReds ? (
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0">
                          {item.reds} {item.reds === 1 ? 'RED' : 'REDS'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                          100% GREEN
                        </span>
                      )}
                    </div>

                    {/* Barra de Aproveitamento da Liga */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400">
                        <span>Aproveitamento:</span>
                        <span className={hasReds ? 'text-rose-400' : 'text-emerald-400'}>
                          {item.winRate.toFixed(0)}% ({item.greens}V / {item.reds}D)
                        </span>
                      </div>
                      <div className="w-full bg-[#101014] rounded-full h-1.5 overflow-hidden flex">
                        <div
                          style={{ width: `${item.winRate}%` }}
                          className={`h-full ${hasReds ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        />
                        <div
                          style={{ width: `${item.redRate}%` }}
                          className="bg-rose-500 h-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#262630] flex items-center justify-between text-[10px] text-zinc-500">
                    <span>{item.total} jogos ({item.greens}V / {item.reds}D)</span>
                    <button
                      onClick={() => handleViewLeagueMatches(item.league)}
                      className="text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer py-0.5 px-1"
                    >
                      Ver os {item.total} jogos →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. VISÃO B: TIMES QUE DERAM RED */}
      {activeAnalysisView === 'times' && (
        <div className="bg-[#141416] border border-[#24242a] rounded-2xl p-3.5 sm:p-5 shadow-sm space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#222228] pb-2.5">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                CLUBES PRESENTES EM JOGOS COM RED
              </h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                Times em campo nas partidas que não bateram a meta de Over 1.5
              </p>
            </div>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-bold">
              {teamStats.length} clubes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {teamStats.map((team, tIdx) => (
              <div
                key={`${team.name}-${team.league}-${tIdx}`}
                className="p-3 rounded-xl bg-[#1a1418] border border-rose-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-white truncate">{team.name}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/40 shrink-0">
                      {team.reds} {team.reds === 1 ? 'RED' : 'REDS'}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 truncate">
                    {team.league} ({team.country})
                  </div>

                  <div className="mt-2 p-2 bg-[#121014] rounded-lg border border-[#262028] text-[10px] text-zinc-400 flex items-center justify-between">
                    <div>
                      Mandante: <strong className="text-white">{team.asHomeReds}</strong>
                    </div>
                    <div>
                      Visitante: <strong className="text-white">{team.asAwayReds}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-[#262028] flex items-center justify-between text-[10px]">
                  <span className="text-zinc-500">Total: {team.total} jogos ({team.greens}G / {team.reds}R)</span>
                  <button
                    onClick={() => handleViewTeamMatches(team.name)}
                    className="text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer py-0.5 px-1"
                  >
                    Ver os {team.total} jogos →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. VISÃO C: EXTRATO COMPLETO DE CONFRONTOS COM FILTROS (RECOLHÍVEL / EXPANSÍVEL) */}
      {activeAnalysisView === 'geral' && (
        <div ref={explorarSectionRef} className="bg-[#141416] border border-[#24242a] rounded-2xl overflow-hidden shadow-sm space-y-3 sm:space-y-4 p-3.5 sm:p-5">
          {/* Header Interativo com Toggle Recolher / Expandir */}
          <div
            onClick={() => setIsExplorarExpanded(!isExplorarExpanded)}
            className="flex items-center justify-between p-3 rounded-xl bg-[#18181e] hover:bg-[#1e1e26] border border-[#282834] cursor-pointer transition-all select-none group"
            title={isExplorarExpanded ? 'Clique para recolher a lista de confrontos' : 'Clique para expandir e ver todos os confrontos'}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Filter className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    EXPLORAR CONFRONTOS (JOGO A JOGO)
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {filteredConfrontos.length} de {stats.totalConfrontos} jogos
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate mt-0.5">
                  {isExplorarExpanded
                    ? 'Toque para recolher esta lista e deixar a visualização mais limpa'
                    : 'Toque para expandir e ver placares, odds, filtros e histórico jogo a jogo'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold text-indigo-400 group-hover:text-indigo-300 hidden sm:inline">
                {isExplorarExpanded ? 'Recolher' : 'Expandir'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#22222a] border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                {isExplorarExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {!isExplorarExpanded ? (
            /* Card compacto quando recolhido */
            <div
              onClick={() => setIsExplorarExpanded(true)}
              className="p-4 rounded-xl bg-[#16161c] border border-dashed border-[#2c2c38] text-center text-xs text-zinc-400 hover:text-white hover:border-indigo-500/50 cursor-pointer transition-all flex flex-col sm:flex-row items-center justify-center gap-2 select-none"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="font-bold text-white">Lista de confrontos recolhida</span>
              </div>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span>
                Total de <strong>{stats.totalConfrontos} confrontos</strong> ({stats.totalGreens} Greens / {stats.totalReds} Reds)
              </span>
              <span className="text-indigo-400 font-black text-[11px] underline ml-1">
                Toque para expandir e rolar para baixo ▼
              </span>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {/* Header de Filtros */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#222228] pb-2.5">
                  <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
                    <Filter className="w-4 h-4 text-indigo-400" />
                    <span>FILTROS DE BUSCA & STATUS</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-zinc-400 font-bold">
                    Exibindo {filteredConfrontos.length} de {stats.totalConfrontos} confrontos
                  </span>
                </div>

            {/* Banner de Filtro Ativo quando filtrado por Time, Liga ou Busca */}
            {(filterTeam || selectedLeague !== 'all' || searchQuery.trim()) && (
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#1a1728] border border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-black text-indigo-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    Filtro Ativo:
                  </span>
                  {filterTeam && (
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-white font-black text-xs border border-indigo-400/40 flex items-center gap-1.5">
                      <span>Clube: <strong>{filterTeam}</strong></span>
                      <span className="text-[10px] text-zinc-300 bg-black/40 px-1.5 py-0.5 rounded font-bold">
                        {preStatusMatches.length} jogos ({preStatusGreens} Greens / {preStatusReds} Reds)
                      </span>
                      <button
                        onClick={() => setFilterTeam(null)}
                        className="text-zinc-400 hover:text-white ml-1 font-bold cursor-pointer"
                        title="Remover filtro de clube"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {selectedLeague !== 'all' && (
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-white font-black text-xs border border-indigo-400/40 flex items-center gap-1.5">
                      <span>Liga: <strong>{selectedLeague}</strong></span>
                      <span className="text-[10px] text-zinc-300 bg-black/40 px-1.5 py-0.5 rounded font-bold">
                        {preStatusMatches.length} jogos ({preStatusGreens}G / {preStatusReds}R)
                      </span>
                      <button
                        onClick={() => setSelectedLeague('all')}
                        className="text-zinc-400 hover:text-white ml-1 font-bold cursor-pointer"
                        title="Remover filtro de liga"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#22222a] text-zinc-300 text-xs border border-zinc-700 flex items-center gap-1.5">
                      <span>Busca: "{searchQuery}"</span>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-zinc-400 hover:text-white ml-1 font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer self-start sm:self-auto shrink-0 py-0.5"
                >
                  Limpar filtros (Ver todos os {stats.totalConfrontos} jogos)
                </button>
              </div>
            )}

            {/* Barra de Filtros: Status Buttons com scroll suave no Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-black border transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5 shrink-0 ${
                  selectedStatus === 'all'
                    ? 'bg-white text-black border-white shadow-sm'
                    : 'bg-[#18181e] text-zinc-400 border-[#2a2a34] hover:text-white'
                }`}
              >
                <span>Todos ({preStatusMatches.length})</span>
              </button>

              <button
                onClick={() => setSelectedStatus('red')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-black border transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5 shrink-0 ${
                  selectedStatus === 'red'
                    ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                    : 'bg-[#18181e] text-zinc-400 border-[#2a2a34] hover:text-white'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Apenas REDs ({preStatusReds})</span>
              </button>

              <button
                onClick={() => setSelectedStatus('green')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-black border transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5 shrink-0 ${
                  selectedStatus === 'green'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : 'bg-[#18181e] text-zinc-400 border-[#2a2a34] hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Apenas GREENs ({preStatusGreens})</span>
              </button>

              {preStatusPending > 0 && (
                <button
                  onClick={() => setSelectedStatus('pending')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black border transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5 shrink-0 ${
                    selectedStatus === 'pending'
                      ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                      : 'bg-[#18181e] text-zinc-400 border-[#2a2a34] hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pendentes ({preStatusPending})</span>
                </button>
              )}
            </div>

            {/* Linha de Busca & Filtro de Liga Ativa */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar time, jogo ou liga..."
                  className="w-full bg-[#18181e] border border-[#2a2a34] focus:border-indigo-500 text-white text-xs pl-8 pr-7 py-2 rounded-xl outline-none transition-all placeholder:text-zinc-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white cursor-pointer p-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* VISÃO MOBILE: CARDS RESPONSIVOS (Nenhum texto cortando ou atropelando) */}
          {/* ============================================================== */}
          <div className="block sm:hidden space-y-2.5">
            {filteredConfrontos.length === 0 ? (
              <div className="py-8 text-center text-zinc-500 text-xs">
                Nenhum confronto encontrado com os filtros selecionados.
              </div>
            ) : (
              filteredConfrontos.map((leg, legIdx) => {
                const isRed = leg.status === 'red';
                const isGreen = leg.status === 'green';
                const isPending = leg.status === 'pending';

                return (
                  <div
                    key={`${leg.id}_${legIdx}`}
                    className={`p-3 rounded-xl border transition-all space-y-2 ${
                      isRed
                        ? 'bg-[#181316] border-rose-500/40 shadow-xs'
                        : isGreen
                        ? 'bg-[#131714] border-emerald-500/30'
                        : 'bg-[#15151a] border-[#262632]'
                    }`}
                  >
                    {/* Top Row: Data, Liga & Status Badge */}
                    <div className="flex items-center justify-between gap-1.5 text-[10px]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-zinc-400 font-bold shrink-0">
                          {leg.betDate ? leg.betDate.split('-').slice(1).reverse().join('/') : '-'}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-300 font-medium truncate max-w-[150px]">
                          {leg.league}
                        </span>
                        {leg.isExotic && (
                          <span className="text-[9px] text-amber-400 shrink-0" title="Liga Secundária/Periférica">
                            ⚠️
                          </span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="shrink-0">
                        {isGreen && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            GREEN
                          </span>
                        )}
                        {isRed && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                            <XCircle className="w-3 h-3" />
                            RED
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            <Clock className="w-3 h-3" />
                            PENDENTE
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle Row: Partida & Placar Grande */}
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <div className="min-w-0 flex-1">
                        <div className="font-black text-white text-xs leading-tight">
                          {leg.matchTitle}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">
                          {leg.country} • {leg.marketLabel}
                        </div>
                      </div>

                      {/* Placar Real em Destaque */}
                      <div className="shrink-0 text-center">
                        {leg.score?.ft ? (
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-black font-sans block ${
                              isRed
                                ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40'
                                : 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {leg.score.ft[0]} - {leg.score.ft[1]}
                          </span>
                        ) : (
                          <span className="text-zinc-600 text-xs">-</span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Diagnóstico do Motivo */}
                    <div className="pt-2 border-t border-[#22222c] flex items-center justify-between gap-2 text-[10px]">
                      <div className="min-w-0 flex-1">
                        {isRed ? (
                          <span className="font-bold text-rose-400 block leading-tight">
                            {leg.redReason}
                          </span>
                        ) : isGreen ? (
                          <span className="font-medium text-emerald-400/90 block leading-tight">
                            Linha batida ({leg.totalGoals} gols no jogo)
                          </span>
                        ) : (
                          <span className="text-zinc-500 block">Aguardando resultado</span>
                        )}
                      </div>

                      <div className="text-right shrink-0 text-zinc-400 font-bold">
                        Odd @{leg.betOdd.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ============================================================== */}
          {/* VISÃO DESKTOP / TABLET: TABELA COMPLETA */}
          {/* ============================================================== */}
          <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#24242a] text-[10px] font-black text-zinc-500 uppercase tracking-wider bg-[#18181e]/80">
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3">Confronto</th>
                  <th className="py-2.5 px-3">Liga / País</th>
                  <th className="py-2.5 px-3">Mercado</th>
                  <th className="py-2.5 px-3 text-center">Placar Real</th>
                  <th className="py-2.5 px-3 text-center">Resultado</th>
                  <th className="py-2.5 px-3">Motivo / Análise</th>
                  <th className="py-2.5 px-3 text-right">Bilhete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e24] text-xs">
                {filteredConfrontos.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-zinc-500 text-xs">
                      Nenhum confronto encontrado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredConfrontos.map((leg, legIdx) => {
                    const isRed = leg.status === 'red';
                    const isGreen = leg.status === 'green';
                    const isPending = leg.status === 'pending';

                    return (
                      <tr
                        key={`${leg.id}_${legIdx}`}
                        className={`transition-colors ${
                          isRed
                            ? 'bg-rose-500/5 hover:bg-rose-500/10'
                            : isGreen
                            ? 'hover:bg-emerald-500/5'
                            : 'hover:bg-[#1a1a20]'
                        }`}
                      >
                        {/* Data */}
                        <td className="py-2.5 px-3 whitespace-nowrap text-zinc-400 font-bold text-[11px]">
                          {leg.betDate ? leg.betDate.split('-').slice(1).reverse().join('/') : '-'}
                        </td>

                        {/* Confronto */}
                        <td className="py-2.5 px-3">
                          <div className="font-black text-white text-xs truncate max-w-[200px]">
                            {leg.matchTitle}
                          </div>
                          <div className="text-[10px] text-zinc-500 truncate">
                            {leg.team1} vs {leg.team2}
                          </div>
                        </td>

                        {/* Liga / País */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="text-zinc-300 font-bold text-[11px] block truncate max-w-[140px]">
                            {leg.league}
                          </span>
                          <span className="text-[10px] text-zinc-500 block">
                            {leg.country} {leg.isExotic ? '⚠️' : ''}
                          </span>
                        </td>

                        {/* Mercado */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#22222c] border border-[#2e2e3a] text-zinc-300">
                            {leg.marketLabel}
                          </span>
                        </td>

                        {/* Placar Real */}
                        <td className="py-2.5 px-3 text-center whitespace-nowrap font-black font-sans">
                          {leg.score?.ft ? (
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-black ${
                                isRed
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {leg.score.ft[0]} - {leg.score.ft[1]}
                            </span>
                          ) : (
                            <span className="text-zinc-600 text-xs">-</span>
                          )}
                        </td>

                        {/* Resultado */}
                        <td className="py-2.5 px-3 text-center whitespace-nowrap">
                          {isGreen && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" />
                              GREEN
                            </span>
                          )}
                          {isRed && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                              <XCircle className="w-3 h-3" />
                              RED
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              <Clock className="w-3 h-3" />
                              PENDENTE
                            </span>
                          )}
                        </td>

                        {/* Motivo / Análise */}
                        <td className="py-2.5 px-3">
                          {isRed ? (
                            <span className="text-[11px] font-bold text-rose-400 block leading-tight">
                              {leg.redReason}
                            </span>
                          ) : isGreen ? (
                            <span className="text-[11px] font-medium text-emerald-400/90 block leading-tight">
                              Linha batida ({leg.totalGoals} gols no total)
                            </span>
                          ) : (
                            <span className="text-[11px] text-zinc-500 block">Aguardando resultado</span>
                          )}
                        </td>

                        {/* Bilhete */}
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <span className="text-[10px] font-bold text-zinc-400 block">
                            Odd @{leg.betOdd.toFixed(2)}
                          </span>
                          <span className="text-[9px] text-zinc-500 block">
                            {leg.betFormat}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )}

      {/* 8. BOX CONCLUSIVO DE ESTRATÉGIA E ASSERTIVIDADE */}
      <div className="bg-gradient-to-r from-[#171720] via-[#1a1a24] to-[#15151e] border border-[#2c2c38] rounded-2xl p-3.5 sm:p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#ccff00] shrink-0" />
          <span>PLANO DE AÇÃO PARA ELEVAR A ASSERTIVIDADE</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5 text-[11px] text-zinc-300">
          <div className="p-2.5 sm:p-3 bg-[#131318] rounded-xl border border-[#22222a] space-y-1">
            <strong className="text-emerald-400 block font-bold text-xs">1. Filtrar Ligas de Baixa Média</strong>
            <p className="text-zinc-400 leading-snug text-[10px] sm:text-[11px]">
              Evitar incluir torneios periféricos (Honduras, Letônia, Uzbequistão) em bilhetes múltiplos.
            </p>
          </div>
          <div className="p-2.5 sm:p-3 bg-[#131318] rounded-xl border border-[#22222a] space-y-1">
            <strong className="text-sky-400 block font-bold text-xs">2. Dobras de Confiança</strong>
            <p className="text-zinc-400 leading-snug text-[10px] sm:text-[11px]">
              Com 82,4% de acerto individual, priorize duplas em vez de triplas para reduzir a variância de 1 gol faltante.
            </p>
          </div>
          <div className="p-2.5 sm:p-3 bg-[#131318] rounded-xl border border-[#22222a] space-y-1">
            <strong className="text-[#ccff00] block font-bold text-xs">3. Ligas de 100% de Green</strong>
            <p className="text-zinc-400 leading-snug text-[10px] sm:text-[11px]">
              Foque nas ligas da Turquia, Itália, França e Alemanha, onde a linha de gols bateu em 100% dos jogos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
