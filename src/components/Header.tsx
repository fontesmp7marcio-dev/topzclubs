import React from 'react';
import { LeagueOption } from '../types';
import { RefreshCw, Search, Activity, Menu, Globe, ChevronDown } from 'lucide-react';
import { CountryFlag } from './CountryFlag';

interface HeaderProps {
  selectedLeague: LeagueOption;
  onSelectLeague: (league: LeagueOption) => void;
  isLoading: boolean;
  onRefresh: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenH2H: () => void;
  activeTab: 'standings' | 'matches' | 'stats';
  onTabChange: (tab: 'standings' | 'matches' | 'stats') => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedLeague,
  onSelectLeague,
  isLoading,
  onRefresh,
  searchQuery,
  onSearchChange,
  onOpenH2H,
  activeTab,
  onTabChange,
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-[#0d0d0d]/95 backdrop-blur-md">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Logo & "Todas as ligas" trigger button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Sidebar toggle button */}
              <button
                id="btn-open-sidebar-drawer"
                onClick={onToggleSidebar}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700/60 text-zinc-200 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all font-semibold text-xs cursor-pointer shadow-sm"
                title="Abrir catálogo com todas as ligas do mundo"
              >
                <Menu className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">Todas as ligas</span>
                <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-emerald-500/20 text-emerald-300">
                  94 países
                </span>
              </button>

              <div className="h-6 w-px bg-zinc-800 mx-1 hidden sm:block" />

              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="/pwa-192x192.png"
                    alt="TOPZCLUBS Logo"
                    className="w-6 h-6 object-contain rounded-lg shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <h1 className="text-base font-bold tracking-tight text-white font-['Outfit']">
                    TOPZ<span className="text-[#ccff00]">CLUBS</span>
                  </h1>
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-mono text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    FotMob Live Scraper (Opta)
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 hidden md:block">
                  Cobertura global em tempo real: 94 países, 559 ligas, xG, escalações e classificação oficial
                </p>
              </div>
            </div>

            {/* Quick action buttons on mobile */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                id="btn-refresh-mobile"
                onClick={onRefresh}
                disabled={isLoading}
                title="Recarregar dados"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
              <button
                id="btn-h2h-mobile"
                onClick={onOpenH2H}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>H2H</span>
              </button>
            </div>
          </div>

          {/* Current League Card & Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Active League Quick Selector Button */}
            <button
              id="btn-current-league-quick"
              onClick={onToggleSidebar}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 hover:border-emerald-500/40 text-zinc-100 transition-all cursor-pointer group shadow-sm text-left"
            >
              <CountryFlag
                ccode={selectedLeague.countryCcode || selectedLeague.flag || 'INT'}
                countryName={selectedLeague.country}
                size={20}
              />
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold font-mono">
                  {selectedLeague.country}
                </span>
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate max-w-[150px] sm:max-w-[180px]">
                  {selectedLeague.name}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors ml-0.5" />
            </button>

            {/* Team Search / Filter Input */}
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="input-search-team"
                type="text"
                placeholder="Buscar time ou clube..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-zinc-900 text-xs text-zinc-100 pl-8 pr-7 py-2 rounded-xl border border-zinc-800 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* H2H Compare Button */}
            <button
              id="btn-h2h-desktop"
              onClick={onOpenH2H}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-400 border border-zinc-800 text-xs font-semibold transition-all cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Confronto H2H</span>
            </button>

            {/* Refresh Button */}
            <button
              id="btn-refresh-desktop"
              onClick={onRefresh}
              disabled={isLoading}
              title="Atualizar dados do FotMob"
              className="hidden sm:inline-flex items-center justify-center p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Standings / Matches / Stats) */}
        <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-zinc-800/80 overflow-x-auto no-scrollbar">
          <button
            id="tab-standings"
            onClick={() => onTabChange('standings')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'standings'
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Classificação Oficial (Opta)
          </button>
          <button
            id="tab-matches"
            onClick={() => onTabChange('matches')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'matches'
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Jogos & Placares
          </button>
          <button
            id="tab-stats"
            onClick={() => onTabChange('stats')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'stats'
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Estatísticas & Análise
          </button>
        </div>
      </div>
    </header>
  );
};
