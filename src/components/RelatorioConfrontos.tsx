import React, { useState, useMemo } from 'react';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
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
  Copy,
  Check,
  Search,
  Filter,
  Flame,
  Award,
  Layers,
  BarChart3,
  ListFilter,
  CheckCircle,
  HelpCircle,
  Zap,
  Globe,
  SlidersHorizontal,
  Compass,
  BookOpen,
} from 'lucide-react';
import { BetItem } from '../types';
import {
  MASTER_RAIO_X_SUMMARY,
  MASTER_RAIO_X_TICKETS,
  MASTER_RAIO_X_LEAGUES,
  MASTER_RAIO_X_CLUBS,
  MASTER_TOP_ASSERTIVE_CLUBS,
  MASTER_HIGH_RISK_CLUBS,
  EXTERNAL_RESEARCH_LEAGUES,
  EXTERNAL_PROSPECTIVE_CLUBS,
  MasterTicket,
  MasterLeagueItem,
  MasterClubItem,
} from '../data/raioXMasterData';
import { RAIO_X_DETAILED_REDS, RAIO_X_ERROR_PATTERNS, RAIO_X_GREEN_PATTERNS, RAIO_X_STRATEGIC_PLAN } from '../data/raioXDetailedAnalysis';

interface RelatorioConfrontosProps {
  bets?: BetItem[];
  supabaseFavorites?: { id: number; name: string; country?: string; league?: string }[];
  teamForms?: Record<string | number, string[]>;
  teamRawMatches?: Record<string | number, any[]>;
}

export const RelatorioConfrontos: React.FC<RelatorioConfrontosProps> = React.memo(({
  bets = [],
}) => {
  // 8 Seções Obrigatórias bem definidas
  const [activeTab, setActiveTab] = useState<
    | 'visao-geral'
    | 'analise-greens'
    | 'analise-reds'
    | 'ranking-ligas'
    | 'ranking-clubes'
    | 'clubes-recomendados'
    | 'clubes-evitar'
    | 'recomendacoes-estrategicas'
  >('visao-geral');

  // Filtros da Visão Geral / Explorador Geral de Jogos
  const [ticketSearch, setTicketSearch] = useState<string>('');
  const [ticketStatusFilter, setTicketStatusFilter] = useState<'all' | 'Ganha' | 'Perdida' | 'Pendente'>('all');
  const [ticketMonthFilter, setTicketMonthFilter] = useState<'all' | '2026-09' | '2026-10' | '2026-11'>('all');
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  // Filtros do Ranking de Ligas
  const [leagueSearch, setLeagueSearch] = useState<string>('');
  const [leagueFilter, setLeagueFilter] = useState<'all' | 'RECOMENDADA' | 'NEUTRA' | 'EVITAR'>('all');

  // Filtros do Ranking de Clubes
  const [clubSearch, setClubSearch] = useState<string>('');
  const [clubFilter, setClubFilter] = useState<'all' | 'MAIOR_ASSERTIVIDADE' | 'RISCO_RED' | 'EM_OBSERVACAO'>('all');

  // Estado de feedback de cópia
  const [copied, setCopied] = useState<boolean>(false);

  // Resumo Geral (dinâmico com fallback na auditoria de 176 bilhetes)
  const summary = useMemo(() => {
    if (bets && bets.length > 0) {
      const reds = bets.filter((b) => b.status === 'Perdida').length;
      const greens = bets.filter((b) => b.status === 'Ganha').length;
      const pendings = bets.filter((b) => b.status === 'Pendente').length;
      const total = bets.length;
      const winRate = greens + reds > 0 ? Number(((greens / (greens + reds)) * 100).toFixed(1)) : 0;
      return {
        ...MASTER_RAIO_X_SUMMARY,
        totalTickets: total,
        totalGreens: greens || MASTER_RAIO_X_SUMMARY.totalGreens,
        totalReds: reds || MASTER_RAIO_X_SUMMARY.totalReds,
        totalPendings: pendings,
        ticketWinRate: winRate || MASTER_RAIO_X_SUMMARY.ticketWinRate,
      };
    }
    return MASTER_RAIO_X_SUMMARY;
  }, [bets]);

  // Lista dos 176 Bilhetes filtrados no Explorador
  const filteredTickets = useMemo(() => {
    return MASTER_RAIO_X_TICKETS.filter((ticket) => {
      if (ticketStatusFilter !== 'all' && ticket.status !== ticketStatusFilter) return false;
      if (ticketMonthFilter !== 'all' && !ticket.date.startsWith(ticketMonthFilter)) return false;
      if (ticketSearch.trim()) {
        const q = ticketSearch.toLowerCase();
        const inTitle = ticket.title.toLowerCase().includes(q);
        const inMatch = ticket.legs.some(
          (l) =>
            l.matchTitle.toLowerCase().includes(q) ||
            l.league.toLowerCase().includes(q) ||
            l.country.toLowerCase().includes(q)
        );
        if (!inTitle && !inMatch) return false;
      }
      return true;
    });
  }, [ticketStatusFilter, ticketMonthFilter, ticketSearch]);

  // Ligas filtradas
  const filteredLeagues = useMemo(() => {
    return MASTER_RAIO_X_LEAGUES.filter((l) => {
      if (leagueFilter !== 'all' && l.classification !== leagueFilter) return false;
      if (leagueSearch.trim()) {
        const q = leagueSearch.toLowerCase();
        return l.name.toLowerCase().includes(q) || l.country.toLowerCase().includes(q);
      }
      return true;
    });
  }, [leagueFilter, leagueSearch]);

  // Clubes filtrados
  const filteredClubs = useMemo(() => {
    return MASTER_RAIO_X_CLUBS.filter((c) => {
      if (clubFilter !== 'all' && c.category !== clubFilter) return false;
      if (clubSearch.trim()) {
        const q = clubSearch.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.league.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [clubFilter, clubSearch]);

  const handleCopySummary = () => {
    const text = `📊 RAIO-X EXECUTIVO DE REDS E GREENS (BALANÇO FINANCEIRO REAL)
==================================================
Total de Apostas: ${summary.totalTickets}
🟢 GREENS: ${summary.totalGreens}
🔴 REDS: ${summary.totalReds}
⏳ Pendentes: ${summary.totalPendings}
Assertividade dos Bilhetes: ${summary.ticketWinRate}%
Assertividade Individual por Partida: ${summary.legWinRate}%
Média de Gols nos GREENS: ${summary.avgGoalsInGreens} gols/jogo
A "Síndrome do 2 de 3": 75% dos REDs falharam por apenas 1 partida isolada!

Diagnóstico de Ligas:
- Priorizar: MLS, Bundesliga, Eredivisie, Liga MX, Ekstraklasa, Superliga Dinamarquesa.
- Evitar: NPFL Nigéria, Chipre, Azerbaijão, Iraque, 4ª divisão espanhola.

Diagnóstico de Clubes:
- Priorizar: Lens, Monterrey, Tigres, Cincinnati, Man City, Dinamo Zagreb, Sturm Graz, Bayern, Bodø/Glimt.
- Evitar: Olympiacos, Pafos FC, Pakhtakor, Enugu Rangers, Bendel Insurance, Ghaz Al-Shamal.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-sans">
      {/* 1. TOPO: Identificação Clara & KPIs dos 176 Jogos */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-4 sm:px-6 py-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Auditoria dos 3 Meses de Operação
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Raio-X de Reds & Greens
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl">
              Diagnóstico preciso de todos os <strong>{summary.totalTickets} jogos/bilhetes</strong> registrados no Balanço Financeiro (Setembro, Outubro e Novembro).
              Identificação nominal de <strong>125 ligas com seus respectivos países</strong> (sem categorias genéricas) e avaliação completa de <strong>599 clubes</strong> no mercado de <strong>Over 1.5 gols</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Resumo Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Resumo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 6 Indicadores Visuais de Alta Clareza */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 rounded-xl p-3">
            <span className="text-xs text-slate-400 font-medium block">Total de Apostas</span>
            <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">
              {summary.totalTickets}
            </span>
            <span className="text-[10px] text-slate-500">176 analisadas</span>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3">
            <span className="text-xs text-emerald-400 font-medium flex items-center justify-between">
              GREENS
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 block">
              {summary.totalGreens}
            </span>
            <span className="text-[10px] text-emerald-500/80">Bilhetes Vitoriosos</span>
          </div>

          <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-3">
            <span className="text-xs text-rose-400 font-medium flex items-center justify-between">
              REDS
              <XCircle className="w-3.5 h-3.5" />
            </span>
            <span className="text-xl sm:text-2xl font-bold text-rose-400 mt-1 block">
              {summary.totalReds}
            </span>
            <span className="text-[10px] text-rose-500/80">Auditados 1 a 1</span>
          </div>

          <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-3">
            <span className="text-xs text-amber-400 font-medium flex items-center justify-between">
              Pendentes
              <Clock className="w-3.5 h-3.5" />
            </span>
            <span className="text-xl sm:text-2xl font-bold text-amber-400 mt-1 block">
              {summary.totalPendings}
            </span>
            <span className="text-[10px] text-amber-500/80">Em andamento</span>
          </div>

          <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-3">
            <span className="text-xs text-indigo-300 font-medium block">Acerto em Bilhetes</span>
            <span className="text-xl sm:text-2xl font-bold text-indigo-400 mt-1 block">
              {summary.ticketWinRate}%
            </span>
            <span className="text-[10px] text-indigo-400/80">Exige 3 de 3 jogos</span>
          </div>

          <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-3">
            <span className="text-xs text-cyan-300 font-medium block">Acerto por Partida</span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1 block">
              {summary.legWinRate}%
            </span>
            <span className="text-[10px] text-cyan-400/80">513 partidas avaliadas</span>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE NAVEGAÇÃO ENTRE AS 8 SEÇÕES SOLICITADAS */}
      <div className="bg-slate-900 border-b border-slate-800 px-2 sm:px-6 overflow-x-auto scrollbar-none flex gap-1 sm:gap-2 py-2.5">
        {[
          { id: 'visao-geral', label: '1. Visão Geral', icon: BarChart3 },
          { id: 'analise-greens', label: '2. Análise dos GREENS', icon: ShieldCheck, badge: `${summary.totalGreens}` },
          { id: 'analise-reds', label: '3. Análise dos REDS', icon: ShieldAlert, badge: `${summary.totalReds}` },
          { id: 'ranking-ligas', label: '4. Ranking de Ligas', icon: Globe, badge: '125' },
          { id: 'ranking-clubes', label: '5. Ranking de Clubes', icon: Award, badge: '599' },
          { id: 'clubes-recomendados', label: '6. Clubes Recomendados', icon: CheckCircle, badge: '139' },
          { id: 'clubes-evitar', label: '7. Clubes para Evitar', icon: AlertTriangle, badge: '25' },
          { id: 'recomendacoes-estrategicas', label: '8. Recomendações & Pesquisa', icon: Target },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. CONTEÚDO DAS 8 SEÇÕES */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* ======================================================== */}
        {/* 1. VISÃO GERAL */}
        {/* ======================================================== */}
        {activeTab === 'visao-geral' && (
          <div className="space-y-6">
            {/* Box Didático de Destaque */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-800/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Zap className="w-5 h-5" />
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Diagnóstico Central: 80,1% de Acerto Individual vs 53,1% no Bilhete Triplo
                </h2>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
                A auditoria de todos os <strong>{summary.totalTickets} jogos</strong> registrados durante os três meses demonstra que a capacidade de prever partidas com Over 1.5 gols é de{' '}
                <strong className="text-cyan-400 font-bold">80,1% por partida</strong> (383 acertos em 513 seleções).
                No entanto, a exigência de acertar <strong>3 de 3 jogos</strong> em cada bilhete fez com que{' '}
                <strong className="text-rose-400 font-bold">75,0% dos REDs (57 de 76)</strong> fossem causados pela falha de apenas 1 jogo isolado, enquanto os outros 2 bateram com folga.
              </p>
            </div>

            {/* Comparativo Mês a Mês */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Desempenho por Mês (Setembro, Outubro e Novembro)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-sm">Setembro / 2026</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">39 Bilhetes</span>
                  </div>
                  <div className="text-xs space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-emerald-400 font-medium">Greens:</span>
                      <span className="font-bold text-white">23 (59.0%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-rose-400 font-medium">Reds:</span>
                      <span className="font-bold text-white">16 (41.0%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: '59%' }} />
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-sm">Outubro / 2026</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">114 Bilhetes</span>
                  </div>
                  <div className="text-xs space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-emerald-400 font-medium">Greens:</span>
                      <span className="font-bold text-white">58 (50.9%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-rose-400 font-medium">Reds:</span>
                      <span className="font-bold text-white">55 (48.2%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: '51%' }} />
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-sm">Novembro / 2026</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">24 Bilhetes</span>
                  </div>
                  <div className="text-xs space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-emerald-400 font-medium">Greens:</span>
                      <span className="font-bold text-white">5 (35.7% liquidadas)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-rose-400 font-medium">Reds:</span>
                      <span className="font-bold text-white">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-400 font-medium">Pendentes:</span>
                      <span className="font-bold text-amber-400">14 aguardando</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full" style={{ width: '25%' }} />
                    <div className="bg-rose-500 h-full" style={{ width: '25%' }} />
                    <div className="bg-amber-500 h-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Explorador de Todos os 176 Bilhetes / Jogos Registrados */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-400" />
                    Varredura Completa dos 176 Bilhetes do Balanço
                  </h3>
                  <p className="text-xs text-slate-400">
                    Navegue e pesquise individualmente cada uma das apostas dos 3 meses com seus 3 jogos detalhados.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 self-start sm:self-auto">
                  Exibindo {filteredTickets.length} de {MASTER_RAIO_X_TICKETS.length} bilhetes
                </span>
              </div>

              {/* Controles de Filtro do Explorador */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    placeholder="Buscar time, liga ou país..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <select
                    value={ticketStatusFilter}
                    onChange={(e) => setTicketStatusFilter(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">Todos os Resultados (Greens, Reds e Pendentes)</option>
                    <option value="Ganha">Apenas GREENS (Vencedores)</option>
                    <option value="Perdida">Apenas REDS (Perdidos)</option>
                    <option value="Pendente">Apenas Pendentes</option>
                  </select>
                </div>

                <div>
                  <select
                    value={ticketMonthFilter}
                    onChange={(e) => setTicketMonthFilter(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">Todos os Meses</option>
                    <option value="2026-11">Novembro / 2026</option>
                    <option value="2026-10">Outubro / 2026</option>
                    <option value="2026-09">Setembro / 2026</option>
                  </select>
                </div>
              </div>

              {/* Lista dos Bilhetes */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredTickets.map((t) => {
                  const isExpanded = expandedTicketId === t.id;
                  const isGreen = t.status === 'Ganha';
                  const isRed = t.status === 'Perdida';

                  return (
                    <div
                      key={t.id}
                      className={`p-3.5 rounded-xl border transition ${
                        isGreen
                          ? 'bg-emerald-950/10 border-emerald-800/30 hover:border-emerald-700/50'
                          : isRed
                          ? 'bg-rose-950/10 border-rose-800/30 hover:border-rose-700/50'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              isGreen
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : isRed
                                ? 'bg-rose-500/20 text-rose-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            #{t.ticketNumber}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-white block line-clamp-1">{t.title}</span>
                            <span className="text-[10px] text-slate-400">
                              {t.date} • Odd @{t.odd.toFixed(2)} • {t.greenLegsCount} Greens / {t.redLegsCount} Reds
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                              isGreen
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : isRed
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            }`}
                          >
                            {t.status}
                          </span>
                          <button
                            onClick={() => setExpandedTicketId(isExpanded ? null : t.id)}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                          >
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* 3 Jogos Detalhados */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 animate-fade-in">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            Partidas Selecionadas no Bilhete:
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {t.legs.map((leg, li) => (
                              <div
                                key={li}
                                className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                                  leg.status === 'green'
                                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                                    : leg.status === 'red'
                                    ? 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                                    : 'bg-slate-950 border-slate-800 text-slate-300'
                                }`}
                              >
                                <div className="flex justify-between items-center font-bold">
                                  <span className="line-clamp-1">{leg.matchTitle}</span>
                                  <span className="text-[11px] font-black">{leg.score}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 flex justify-between">
                                  <span>{leg.league}</span>
                                  <span>{leg.country}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. ANÁLISE DOS GREENS */}
        {/* ======================================================== */}
        {activeTab === 'analise-greens' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 p-5 rounded-2xl border border-emerald-800/40 space-y-2">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Análise dos 86 Bilientes GREEN: Onde Tivemos Sucesso
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Média de <strong className="text-emerald-400">3,76 gols por partida</strong> nos bilhetes vitoriosos.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Pilares dos GREENS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RAIO_X_GREEN_PATTERNS.map((p) => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {p.stats}
                  </span>
                  <h4 className="font-bold text-white text-sm">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-300 block">Exemplos Vitoriosos:</span>
                    <ul className="text-xs text-slate-400 space-y-0.5">
                      {p.examples.map((ex, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Matriz Comparativa */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                O que diferencia as apostas GREEN das apostas RED no Over 1.5
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Critério de Seleção</th>
                      <th className="p-3 text-emerald-400">Bilhetes GREEN (Vencedores)</th>
                      <th className="p-3 text-rose-400">Bilhetes RED (Perdidos)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-3 font-semibold text-white">Média de Gols</td>
                      <td className="p-3 text-emerald-400 font-bold">3,76 gols por partida</td>
                      <td className="p-3 text-rose-400 font-bold">0,65 gols na perna perdedora</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Tipo de Competição</td>
                      <td className="p-3 text-slate-300">Ligas de alta transição (MLS, Holanda, Alemanha, México, Polônia)</td>
                      <td className="p-3 text-slate-300">Ligas periféricas defensivas (Nigéria, Chipre, Iraque, Azerbaijão)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Comportamento do Adversário</td>
                      <td className="p-3 text-slate-300">Transição aberta, linhas altas e busca pelo empate</td>
                      <td className="p-3 text-slate-300">Linha de 5 zagueiros e retranca intransponível</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Primeiro Gol</td>
                      <td className="p-3 text-slate-300">Acontece antes dos 35 minutos do 1º tempo</td>
                      <td className="p-3 text-slate-300">0-0 prolongado até os 75' ou gol solitário</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. ANÁLISE DOS REDS */}
        {/* ======================================================== */}
        {activeTab === 'analise-reds' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-900 p-5 rounded-2xl border border-rose-800/40 space-y-2">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Análise Profunda dos 76 Bilhetes RED: Onde Ocorreram as Perdas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Em exatamente <strong className="text-rose-400 font-bold">75,0% das perdas</strong>, 2 jogos bateram o Over 1.5 e apenas 1 falhou por 0-0 ou 1-0.
                  </p>
                </div>
              </div>
            </div>

            {/* Os 5 Padrões Recorrentes de Erro */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Padrões Recorrentes Identificados nas Derrotas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RAIO_X_ERROR_PATTERNS.map((err) => (
                  <div key={err.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm">{err.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 whitespace-nowrap">
                        {err.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{err.description}</p>
                    <div className="pt-2 border-t border-slate-800 text-xs">
                      <strong className="text-emerald-400">Solução Prática:</strong>{' '}
                      <span className="text-slate-300">{err.countermeasure}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualizador de Todos os 76 REDs com placar real */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Relação Detalhada dos 76 Bilhetes RED</span>
                <span className="text-xs text-rose-400 font-medium">76 bilhetes catalogados</span>
              </h4>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {RAIO_X_DETAILED_REDS.map((r) => (
                  <div key={r.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-rose-400 font-bold">#{r.ticketNumber}</span>
                        <span className="text-white font-bold">{r.title}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">{r.date} • Odd @{r.odd.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800/60">
                      {r.reasons.map((fail, fi) => (
                        <div key={fi} className="p-2 rounded bg-rose-950/20 border border-rose-800/40 text-rose-300">
                          <span className="font-bold block">❌ {fail.matchTitle} ({fail.score})</span>
                          <span className="text-[10px] text-slate-400">{fail.league} • Motivo: {fail.categoryLabel}</span>
                        </div>
                      ))}
                      {r.passedLegs.map((ok, oi) => (
                        <div key={oi} className="p-2 rounded bg-emerald-950/20 border border-emerald-800/40 text-emerald-300">
                          <span className="font-bold block">✓ {ok.matchTitle} ({ok.score})</span>
                          <span className="text-[10px] text-slate-400">{ok.league}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. RANKING COMPLETO DE LIGAS (125 LIGAS NOMINAIS) */}
        {/* ======================================================== */}
        {activeTab === 'ranking-ligas' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-400" />
                  Ranking Nominal de Todas as 125 Competições
                </h3>
                <p className="text-xs text-slate-400">
                  Todas as ligas e copas identificadas com nome completo e país (sem classificações genéricas).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Todas (125)' },
                  { id: 'RECOMENDADA', label: 'Recomendadas (Alta Confiança)' },
                  { id: 'EVITAR', label: 'Alto Risco (Evitar)' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setLeagueFilter(btn.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      leagueFilter === btn.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Busca de Liga */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={leagueSearch}
                onChange={(e) => setLeagueSearch(e.target.value)}
                placeholder="Pesquisar por nome da competição ou país..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Tabela Oficial das 125 Ligas */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 sticky top-0 z-10">
                    <tr>
                      <th className="p-3">Nome Completo da Liga</th>
                      <th className="p-3">País</th>
                      <th className="p-3 text-center">Jogos</th>
                      <th className="p-3 text-center text-emerald-400">Greens</th>
                      <th className="p-3 text-center text-rose-400">Reds</th>
                      <th className="p-3 text-center">Assertividade</th>
                      <th className="p-3 text-center">Média Gols</th>
                      <th className="p-3">Diagnóstico & Recomendação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredLeagues.map((l, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-bold text-white flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{l.name}</span>
                        </td>
                        <td className="p-3 text-slate-400">{l.country}</td>
                        <td className="p-3 text-center font-semibold text-slate-200">{l.totalMatches}</td>
                        <td className="p-3 text-center font-bold text-emerald-400">{l.greens}</td>
                        <td className="p-3 text-center font-bold text-rose-400">{l.reds}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`font-black px-2 py-0.5 rounded text-[11px] ${
                              l.winRate >= 80
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : l.winRate <= 60 && (l.greens + l.reds) >= 2
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {l.winRate}%
                          </span>
                        </td>
                        <td className="p-3 text-center text-slate-300 font-semibold">{l.avgGoals}</td>
                        <td className="p-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              l.classification === 'RECOMENDADA'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : l.classification === 'EVITAR'
                                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {l.tierLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. RANKING COMPLETO DE CLUBES (599 CLUBES) */}
        {/* ======================================================== */}
        {activeTab === 'ranking-clubes' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  Relação Completa de Clubes Auditados
                </h3>
                <p className="text-xs text-slate-400">
                  Desempenho real de cada equipe participante nos 176 jogos catalogados no Balanço.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Todos os Clubes (599)' },
                  { id: 'MAIOR_ASSERTIVIDADE', label: 'Maior Assertividade (139)' },
                  { id: 'RISCO_RED', label: 'Maior Risco de RED (25)' },
                  { id: 'EM_OBSERVACAO', label: 'Em Observação' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setClubFilter(btn.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      clubFilter === btn.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Busca de Clube */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={clubSearch}
                onChange={(e) => setClubSearch(e.target.value)}
                placeholder="Pesquisar por clube, país ou competição..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Tabela dos Clubes */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 sticky top-0 z-10">
                    <tr>
                      <th className="p-3">Nome do Clube</th>
                      <th className="p-3">País / Liga</th>
                      <th className="p-3 text-center">Jogos</th>
                      <th className="p-3 text-center text-emerald-400">Greens</th>
                      <th className="p-3 text-center text-rose-400">Reds</th>
                      <th className="p-3 text-center">Assertividade</th>
                      <th className="p-3 text-center">Média Gols</th>
                      <th className="p-3">Classificação e Diagnóstico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredClubs.slice(0, 80).map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-bold text-white">{c.name}</td>
                        <td className="p-3 text-slate-400">{c.country} • {c.league}</td>
                        <td className="p-3 text-center font-semibold text-slate-200">{c.totalMatches}</td>
                        <td className="p-3 text-center font-bold text-emerald-400">{c.greens}</td>
                        <td className="p-3 text-center font-bold text-rose-400">{c.reds}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`font-black px-2 py-0.5 rounded text-[11px] ${
                              c.winRate >= 80 && (c.greens + c.reds) >= 2
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : c.winRate <= 60 && c.reds >= 2
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {c.winRate}%
                          </span>
                        </td>
                        <td className="p-3 text-center text-slate-300 font-semibold">{c.avgGoals}</td>
                        <td className="p-3 text-slate-300 text-[11px] max-w-xs">{c.diagnosticNote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 6. CLUBES RECOMENDADOS (ALTA ASSERTIVIDADE) */}
        {/* ======================================================== */}
        {activeTab === 'clubes-recomendados' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 p-5 rounded-2xl border border-emerald-800/40">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Clubes com Maior Assertividade no Over 1.5 (Priorizar)
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Equipes com excelente volume ofensivo e 100% de cumprimento da linha nos registros do Balanço.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {MASTER_TOP_ASSERTIVE_CLUBS.slice(0, 30).map((c, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 space-y-2 hover:border-emerald-700/50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white text-sm block">{c.name}</span>
                      <span className="text-[10px] text-slate-400">{c.country} • {c.league}</span>
                    </div>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {c.greens} Greens ({c.winRate}%)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{c.diagnosticNote}</p>
                  <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-800 flex justify-between">
                    <span>Média de Gols: {c.avgGoals}</span>
                    <span className="text-emerald-400 font-bold">✓ Recomendado</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 7. CLUBES PARA EVITAR (MAIOR RISCO DE RED) */}
        {/* ======================================================== */}
        {activeTab === 'clubes-evitar' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-900 p-5 rounded-2xl border border-rose-800/40">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                  <XCircle className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Clubes com Maior Risco de RED (Evitar nas Próximas Seleções)
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Equipes envolvidas em múltiplos REDs, com placares travados em 0-0 ou 1-0 no histórico do app.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MASTER_HIGH_RISK_CLUBS.map((c, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 space-y-2 hover:border-rose-700/50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white text-sm block">{c.name}</span>
                      <span className="text-[10px] text-slate-400">{c.country} • {c.league}</span>
                    </div>
                    <span className="text-xs font-black text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                      {c.reds} REDs acumulados
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{c.diagnosticNote}</p>
                  <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-800 flex justify-between">
                    <span>Jogos no App: {c.totalMatches}</span>
                    <span className="text-rose-400 font-bold">⛔ Evitar no Over 1.5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 8. RECOMENDAÇÕES ESTRATÉGICAS & PESQUISA EXTERNA */}
        {/* ======================================================== */}
        {activeTab === 'recomendacoes-estrategicas' && (
          <div className="space-y-6">
            {/* Box Explicativo de Diferenciação Rigorosa */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold mb-0.5">
                  Diferenciação Obrigatória entre Dados Históricos do Aplicativo e Pesquisa Externa:
                </strong>
                As tabelas abaixo distinguem com clareza o que foi registrado internamente no Balanço Financeiro do aplicativo das médias consolidadas de mercado obtidas em sites de estatísticas esportivas (FootyStats, SoccerStats e OddAlerts).
              </div>
            </div>

            {/* Bloco 1: Pesquisa Externa de Ligas Mundiais */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Pesquisa Externa: Melhores e Piores Ligas Mundiais para Over 1.5 Gols
              </h4>
              <p className="text-xs text-slate-400">
                Dados consolidados de mercado com histórico multitemporadas.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Competição Externa</th>
                      <th className="p-3">País</th>
                      <th className="p-3 text-center">Taxa Mundial Over 1.5</th>
                      <th className="p-3 text-center">Média Gols/Jogo</th>
                      <th className="p-3">Perfil Tático Comprovado</th>
                      <th className="p-3 text-center">Veredito</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {EXTERNAL_RESEARCH_LEAGUES.map((l, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-bold text-white">{l.name}</td>
                        <td className="p-3 text-slate-400">{l.country}</td>
                        <td className="p-3 text-center font-bold text-cyan-400">{l.over15Rate}</td>
                        <td className="p-3 text-center font-semibold text-slate-200">{l.avgGoalsMatch}</td>
                        <td className="p-3 text-slate-300 text-[11px] max-w-sm">{l.keyCharacteristic}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              l.verdict === 'ALTAMENTE_RECOMENDADA'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {l.verdict === 'ALTAMENTE_RECOMENDADA' ? 'Priorizar' : 'Evitar'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bloco 2: Clubes Promissores Fora dos Favoritos Atuais */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Pesquisa Externa: Equipes Promissoras para Futuras Seleções
              </h4>
              <p className="text-xs text-slate-400">
                Clubes com altos índices de Over 1.5 gols no cenário internacional que podem ser adicionados à lista de observação:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {EXTERNAL_PROSPECTIVE_CLUBS.map((prosp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-xs sm:text-sm">{prosp.name}</span>
                      <span className="text-[11px] font-bold text-cyan-400">{prosp.over15Rate} Over 1.5</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">{prosp.league} ({prosp.country}) • Média {prosp.avgGoals} gols/jogo</span>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/60">
                      {prosp.whyProspect}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloco 3: 5 Ações Práticas do Plano Estratégico */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                Orientações Finais de Seleção para os Próximos Bilhetes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RAIO_X_STRATEGIC_PLAN.map((plan) => (
                  <div key={plan.step} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
                        {plan.step}
                      </span>
                      <h5 className="font-bold text-white text-xs sm:text-sm">{plan.title}</h5>
                    </div>
                    <p className="text-xs text-slate-300">{plan.action}</p>
                    <div className="text-[10px] text-indigo-400 font-semibold">
                      Impacto estimado: {plan.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

RelatorioConfrontos.displayName = 'RelatorioConfrontos';
