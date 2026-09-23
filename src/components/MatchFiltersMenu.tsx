import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, RotateCcw, CheckSquare, Square } from 'lucide-react';
import { CompetitionFilter, MandoFilter, MatchFilters, WindowFilter } from '../types';

interface MatchFiltersMenuProps {
  filters: MatchFilters;
  onFiltersChange: (filters: MatchFilters) => void;
}

export const MatchFiltersMenu: React.FC<MatchFiltersMenuProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Compute number of non-default filters
  const nonDefaultCount =
    (filters.competition !== 'all' ? 1 : 0) +
    (filters.mando !== 'all' ? 1 : 0) +
    (filters.window !== 5 ? 1 : 0);

  const isDefault = nonDefaultCount === 0;

  const handleReset = () => {
    onFiltersChange({
      competition: 'all',
      mando: 'all',
      window: 5,
    });
  };

  // Checkbox states for Mando (Casa / Fora)
  const isCasaChecked = filters.mando === 'all' || filters.mando === 'home';
  const isForaChecked = filters.mando === 'all' || filters.mando === 'away';

  const toggleMandoCasa = () => {
    if (filters.mando === 'all') {
      onFiltersChange({ ...filters, mando: 'away' });
    } else if (filters.mando === 'home') {
      onFiltersChange({ ...filters, mando: 'all' });
    } else if (filters.mando === 'away') {
      onFiltersChange({ ...filters, mando: 'all' });
    }
  };

  const toggleMandoFora = () => {
    if (filters.mando === 'all') {
      onFiltersChange({ ...filters, mando: 'home' });
    } else if (filters.mando === 'away') {
      onFiltersChange({ ...filters, mando: 'all' });
    } else if (filters.mando === 'home') {
      onFiltersChange({ ...filters, mando: 'all' });
    }
  };

  // Checkbox states for Competição (Liga / Copa)
  const isLigaChecked = filters.competition === 'all' || filters.competition === 'league';
  const isCopaChecked = filters.competition === 'all' || filters.competition === 'cup';

  const toggleCompetitionLiga = () => {
    if (filters.competition === 'all') {
      onFiltersChange({ ...filters, competition: 'cup' });
    } else if (filters.competition === 'league') {
      onFiltersChange({ ...filters, competition: 'all' });
    } else if (filters.competition === 'cup') {
      onFiltersChange({ ...filters, competition: 'all' });
    }
  };

  const toggleCompetitionCopa = () => {
    if (filters.competition === 'all') {
      onFiltersChange({ ...filters, competition: 'league' });
    } else if (filters.competition === 'cup') {
      onFiltersChange({ ...filters, competition: 'all' });
    } else if (filters.competition === 'league') {
      onFiltersChange({ ...filters, competition: 'all' });
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left select-none">
      {/* ONLY ONE SINGLE BUTTON ON THE MAIN BAR: [Filtros ▼] */}
      <button
        id="btn-open-match-filters"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-xs ${
          isOpen || !isDefault
            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
            : 'bg-[#18191c] text-zinc-200 border-[#28292e] hover:bg-[#202227] hover:text-white'
        }`}
        title="Abrir filtros de análise"
      >
        <Filter className={`w-3.5 h-3.5 ${!isDefault ? 'text-emerald-400' : 'text-zinc-400'}`} />
        <span>Filtros</span>
        {!isDefault && (
          <span className="w-4 h-4 rounded-full bg-emerald-500 text-black text-[10px] font-black flex items-center justify-center">
            {nonDefaultCount}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : 'text-zinc-400'}`} />
      </button>

      {/* DROPDOWN / POPOVER MENU */}
      {isOpen && (
        <div
          id="menu-match-filters-dropdown"
          className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 w-[calc(100vw-32px)] max-w-72 sm:max-w-none sm:w-80 rounded-2xl bg-[#141517] border border-[#26272b] shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-4 text-zinc-200"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#222327]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Filter className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">FILTROS</h3>
            </div>

            {!isDefault && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-[#1f2025]"
                title="Restaurar padrão"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar</span>
              </button>
            )}
          </div>

          {/* 1. ÚLTIMOS JOGOS */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
              Últimos Jogos
            </span>
            <div className="flex flex-col gap-1 pl-1">
              <button
                type="button"
                onClick={() => onFiltersChange({ ...filters, window: 5 })}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                  filters.window === 5
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-300 hover:bg-[#1f2025] border border-transparent'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {filters.window === 5 ? (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-zinc-600" />
                  )}
                </div>
                <span>Últimos 5</span>
              </button>

              <button
                type="button"
                onClick={() => onFiltersChange({ ...filters, window: 10 })}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                  filters.window === 10
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-300 hover:bg-[#1f2025] border border-transparent'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {filters.window === 10 ? (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-zinc-600" />
                  )}
                </div>
                <span>Últimos 10</span>
              </button>
            </div>
          </div>

          {/* 2. MANDO */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
              Mando
            </span>
            <div className="flex flex-col gap-1 pl-1">
              <button
                type="button"
                onClick={toggleMandoCasa}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                  isCasaChecked
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-300 hover:bg-[#1f2025] border border-transparent'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {isCasaChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600" />
                  )}
                </div>
                <span>Casa</span>
              </button>

              <button
                type="button"
                onClick={toggleMandoFora}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                  isForaChecked
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-300 hover:bg-[#1f2025] border border-transparent'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {isForaChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600" />
                  )}
                </div>
                <span>Fora</span>
              </button>
            </div>
          </div>

          {/* 3. COMPETIÇÃO */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
              Competição
            </span>
            <div className="flex flex-col gap-1 pl-1">
              <button
                type="button"
                onClick={toggleCompetitionLiga}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                  isLigaChecked
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-300 hover:bg-[#1f2025] border border-transparent'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {isLigaChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600" />
                  )}
                </div>
                <span>Liga</span>
              </button>

              <button
                type="button"
                onClick={toggleCompetitionCopa}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                  isCopaChecked
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-300 hover:bg-[#1f2025] border border-transparent'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {isCopaChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600" />
                  )}
                </div>
                <span>Copa</span>
              </button>
            </div>
          </div>

          {/* ACTION BUTTON: Aplicar filtros */}
          <div className="pt-2 border-t border-[#222327]">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors cursor-pointer shadow-md text-center"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
