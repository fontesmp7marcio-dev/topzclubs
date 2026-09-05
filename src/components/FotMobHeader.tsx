import React, { useState } from 'react';
import { Search, Settings, Smartphone, Apple, Menu, X, Shield, RefreshCw, BarChart3 } from 'lucide-react';
import { LeagueOption } from '../types';

interface FotMobHeaderProps {
  selectedLeague: LeagueOption | null;
  onSelectLeague: (league: LeagueOption | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
  onOpenMobileSidebar?: () => void;
  activeNavTab: string;
  onNavTabChange: (tab: string) => void;
}

export const FotMobHeader: React.FC<FotMobHeaderProps> = ({
  selectedLeague,
  onSelectLeague,
  searchQuery,
  onSearchChange,
  onRefresh,
  isLoading = false,
  onOpenMobileSidebar,
  activeNavTab,
  onNavTabChange,
}) => {
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const navLinks = [
    { id: 'matches', label: 'Jogos' },
    { id: 'favorites', label: '★ Favoritos' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d0d] border-b border-[#222222] select-none">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-6 flex items-center justify-between h-14 gap-1 sm:gap-2">
        
        {/* Left: Mobile Menu Toggle + Logo + Balanço button */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <button
            id="btn-mobile-menu"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors shrink-0"
            title="Abrir menu de ligas"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* TOPZCLUBS Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavTabChange('matches');
            }}
            className="flex items-center gap-1.5 group cursor-pointer shrink-0"
            title="TOPZCLUBS Início"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#ccff00] text-black flex items-center justify-center font-black text-xs tracking-tighter shadow-sm font-sans shrink-0">
              TZ
            </div>
            <span className="hidden md:inline text-lg font-black tracking-tight text-white font-sans uppercase">
              TOPZCLUBS
            </span>
          </a>

          {/* Menu Balanço */}
          <button
            id="btn-header-balanco"
            onClick={() => onNavTabChange('balanco')}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeNavTab === 'balanco'
                ? 'bg-[#ccff00] text-black shadow-sm font-black'
                : 'bg-[#181818] text-zinc-300 hover:text-white hover:bg-[#222222] border border-[#282828]'
            }`}
            title="Balanço Financeiro"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">Balanço</span>
          </button>

          {/* Search Bar matching FotMob (Pill shape, dark grey bg, light placeholder) */}
          <div className="hidden sm:flex items-center relative w-44 lg:w-72 ml-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="input-fotmob-global-search"
              type="text"
              placeholder="Procurar"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#1c1c1c] hover:bg-[#222222] focus:bg-[#242424] text-xs text-white placeholder-zinc-400 pl-9 pr-8 py-2 rounded-full border border-transparent focus:border-zinc-700 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Center/Right: Navigation Links (Jogos vs Favoritos) & Refresh */}
        <div className="flex items-center gap-1.5 shrink-0">
          <nav className="flex items-center gap-1 bg-[#181818] p-1 rounded-xl border border-[#282828]">
            {navLinks.map((link) => {
              const isActive = activeNavTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavTabChange(link.id)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#2a2a2a] text-white shadow-xs border border-[#3a3a3a]'
                      : 'text-zinc-400 hover:text-white hover:bg-[#202020]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Refresh Action */}
          <button
            id="btn-header-refresh"
            onClick={onRefresh}
            disabled={isLoading}
            title="Atualizar dados ao vivo"
            className="p-2 text-zinc-400 hover:text-white rounded-xl bg-[#181818] border border-[#282828] hover:bg-[#222222] transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile search bar if open */}
      <div className="sm:hidden px-4 pb-2">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="input-fotmob-mobile-search"
            type="text"
            placeholder="Procurar clube, partida ou jogador..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#1c1c1c] text-xs text-white placeholder-zinc-400 pl-8 pr-7 py-1.5 rounded-full border border-zinc-800 outline-none"
          />
        </div>
      </div>
    </header>
  );
};
