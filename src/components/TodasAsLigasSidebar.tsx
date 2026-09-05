import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronRight, Trophy, Star, Globe, X, RefreshCw, Layers } from 'lucide-react';
import { FotMobAllLeaguesData, FotMobCountry, FotMobLeagueItem, LeagueOption } from '../types';
import { CountryFlag } from './CountryFlag';

interface TodasAsLigasSidebarProps {
  selectedLeague: LeagueOption;
  onSelectLeague: (league: LeagueOption) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isDrawer?: boolean;
}

export const TodasAsLigasSidebar: React.FC<TodasAsLigasSidebarProps> = ({
  selectedLeague,
  onSelectLeague,
  isOpen = true,
  onClose,
  isDrawer = false,
}) => {
  const [data, setData] = useState<FotMobAllLeaguesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({
    BRA: true, // Brasil open by default
    ENG: true, // Inglaterra open by default
  });
  const [isAllLeaguesExpanded, setIsAllLeaguesExpanded] = useState<boolean>(true);
  const [showPopular, setShowPopular] = useState<boolean>(true);

  // Fetch all leagues catalog from FotMob scraper API
  useEffect(() => {
    let isMounted = true;
    async function loadAllLeagues() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/fotmob/all-leagues?locale=pt-BR');
        if (res.ok) {
          const json: FotMobAllLeaguesData = await res.json();
          if (isMounted && json && json.countries) {
            setData(json);
          }
        }
      } catch (err) {
        console.error('Falha ao carregar catálogo completo de ligas:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadAllLeagues();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleCountry = (ccode: string) => {
    setExpandedCountries((prev) => ({
      ...prev,
      [ccode]: !prev[ccode],
    }));
  };

  // Convert FotMobLeagueItem to our application's LeagueOption
  const handleLeagueClick = (
    league: FotMobLeagueItem,
    countryName: string,
    countryCcode: string
  ) => {
    const slug = league.pageUrl?.split('/')?.pop() || 'overview';
    const option: LeagueOption = {
      id: `fotmob-${league.id}`,
      name: league.localizedName || league.name,
      country: countryName,
      flag: countryCcode,
      countryCcode,
      season: '2026',
      source: 'fotmob',
      fotmobId: league.id,
      fotmobSlug: slug,
      fotmobPageUrl: league.pageUrl,
      localizedName: league.localizedName || league.name,
    };

    onSelectLeague(option);
    if (isDrawer && onClose) {
      onClose();
    }
  };

  // Filter countries and leagues
  const filteredData = useMemo(() => {
    if (!data) return { countries: [], international: null, popular: [] };

    const query = filterQuery.trim().toLowerCase();
    if (!query) {
      return {
        countries: data.countries || [],
        international: data.international?.[0] || null,
        popular: data.popular || [],
      };
    }

    // Search in popular
    const filteredPopular = (data.popular || []).filter(
      (l) =>
        (l.localizedName || l.name).toLowerCase().includes(query) ||
        (l.ccode || '').toLowerCase().includes(query)
    );

    // Search in international
    const intGroup = data.international?.[0];
    let filteredInt: typeof intGroup | null = null;
    if (intGroup) {
      const matchIntName = 'internacional'.includes(query) || 'international'.includes(query);
      const filteredLeagues = intGroup.leagues.filter((l) =>
        (l.localizedName || l.name).toLowerCase().includes(query)
      );
      if (matchIntName || filteredLeagues.length > 0) {
        filteredInt = {
          ...intGroup,
          leagues: matchIntName ? intGroup.leagues : filteredLeagues,
        };
      }
    }

    // Search in countries
    const filteredCountries: FotMobCountry[] = [];
    for (const c of data.countries || []) {
      const matchCountry =
        (c.localizedName || c.name).toLowerCase().includes(query) ||
        c.ccode.toLowerCase().includes(query);

      const matchingLeagues = (c.leagues || []).filter((l) =>
        (l.localizedName || l.name).toLowerCase().includes(query)
      );

      if (matchCountry) {
        filteredCountries.push(c);
      } else if (matchingLeagues.length > 0) {
        filteredCountries.push({
          ...c,
          leagues: matchingLeagues,
        });
      }
    }

    return {
      countries: filteredCountries,
      international: filteredInt,
      popular: filteredPopular,
    };
  }, [data, filterQuery]);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#121212] text-zinc-200 select-none border-r border-zinc-800/80">
      {/* Top Header: "Todas as ligas" with collapsible button */}
      <div className="p-3.5 border-b border-zinc-800/80 bg-[#161616] flex items-center justify-between">
        <button
          id="btn-toggle-all-leagues"
          onClick={() => setIsAllLeaguesExpanded(!isAllLeaguesExpanded)}
          className="flex items-center gap-2 text-sm font-bold text-white hover:text-emerald-400 transition-colors tracking-tight"
        >
          <span>Todas as ligas</span>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              isAllLeaguesExpanded ? 'rotate-0' : '-rotate-90'
            }`}
          />
        </button>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {data?.countries ? `${data.countries.length} países` : 'FotMob'}
          </span>
          {isDrawer && onClose && (
            <button
              id="btn-close-leagues-drawer"
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search / Filter Input (Filtro) matching FotMob screenshot */}
      <div className="p-2.5 bg-[#121212] border-b border-zinc-800/60">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            id="input-filter-leagues"
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filtro"
            className="w-full bg-[#202020] text-xs text-zinc-100 placeholder-zinc-500 pl-8 pr-8 py-2 rounded-lg border border-zinc-700/50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
          />
          {filterQuery && (
            <button
              id="btn-clear-leagues-filter"
              onClick={() => setFilterQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Leagues Catalog */}
      <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-zinc-800/40">
        {isLoading && !data ? (
          <div className="p-8 text-center text-zinc-500 text-xs flex flex-col items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-emerald-500" />
            <span>Sincronizando 559 ligas do FotMob...</span>
          </div>
        ) : (
          <>
            {/* Ligas Populares (Quick Access) */}
            {!filterQuery && filteredData.popular && filteredData.popular.length > 0 && (
              <div className="py-2 bg-[#141414]">
                <button
                  id="btn-toggle-popular-leagues"
                  onClick={() => setShowPopular(!showPopular)}
                  className="w-full px-3 py-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-400/90 hover:text-amber-300"
                >
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                    Ligas Populares
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${
                      showPopular ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showPopular && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-0.5 px-1.5 pt-1">
                        {filteredData.popular.map((pop) => {
                          const isSelected = selectedLeague?.fotmobId === pop.id;
                          return (
                            <button
                              key={`pop-${pop.id}`}
                              id={`league-pop-${pop.id}`}
                              onClick={() =>
                                handleLeagueClick(
                                  pop,
                                  pop.ccode === 'INT' ? 'Internacional' : pop.ccode,
                                  pop.ccode
                                )
                              }
                              className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between group transition-colors ${
                                isSelected
                                  ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-2 border-emerald-500'
                                  : 'text-zinc-300 hover:bg-zinc-800/70 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <CountryFlag ccode={pop.ccode} size={18} />
                                <span className="truncate">{pop.localizedName || pop.name}</span>
                              </div>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Internacional (World Cups, Libertadores, Champions, etc.) */}
            {filteredData.international && filteredData.international.leagues.length > 0 && (
              <div className="py-1">
                <button
                  id="btn-country-international"
                  onClick={() => toggleCountry('INT')}
                  className="w-full px-3 py-2 flex items-center justify-between text-xs font-medium text-zinc-200 hover:bg-zinc-800/60 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CountryFlag ccode="INT" size={20} />
                    <span className="font-semibold text-zinc-100">Internacional</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <span className="text-[10px] font-mono text-zinc-500">
                      {filteredData.international.leagues.length}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        expandedCountries['INT'] || filterQuery ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {(expandedCountries['INT'] || filterQuery) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#0d0d0d] pl-7 pr-2 py-1 space-y-0.5 border-l border-zinc-800/80 ml-5"
                    >
                      {filteredData.international.leagues.map((l) => {
                        const isSelected = selectedLeague?.fotmobId === l.id;
                        return (
                          <button
                            key={`int-${l.id}`}
                            id={`league-item-${l.id}`}
                            onClick={() => handleLeagueClick(l, 'Internacional', 'INT')}
                            className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] flex items-center justify-between group transition-colors ${
                              isSelected
                                ? 'bg-emerald-500/20 text-emerald-300 font-bold border-l-2 border-emerald-400'
                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                            }`}
                          >
                            <span className="truncate">{l.localizedName || l.name}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1"></span>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* List of 94 Countries (África do Sul, Albânia, Alemanha, Brasil, Catar, etc.) */}
            {filteredData.countries.map((country) => {
              const isExpanded = expandedCountries[country.ccode] || Boolean(filterQuery);
              const hasActiveLeague = country.leagues.some(
                (l) => selectedLeague?.fotmobId === l.id
              );

              return (
                <div key={`country-${country.ccode}`} className="py-0.5">
                  <button
                    id={`btn-country-${country.ccode.toLowerCase()}`}
                    onClick={() => toggleCountry(country.ccode)}
                    className={`w-full px-3 py-2 flex items-center justify-between text-xs transition-colors group ${
                      hasActiveLeague
                        ? 'bg-zinc-800/40 text-emerald-300 font-semibold'
                        : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CountryFlag
                        ccode={country.ccode}
                        countryName={country.localizedName || country.name}
                        size={20}
                      />
                      <span className="truncate text-left font-medium">
                        {country.localizedName || country.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-zinc-400">
                      <span className="text-[10px] font-mono text-zinc-500">
                        {country.leagues.length}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion with all Leagues of that country */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-[#0e0e0e] pl-7 pr-2 py-1 space-y-0.5 border-l border-zinc-800/80 ml-5"
                      >
                        {country.leagues.map((league) => {
                          const isSelected = selectedLeague?.fotmobId === league.id;
                          return (
                            <button
                              key={`league-${country.ccode}-${league.id}`}
                              id={`league-item-${league.id}`}
                              onClick={() =>
                                handleLeagueClick(
                                  league,
                                  country.localizedName || country.name,
                                  country.ccode
                                )
                              }
                              className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] flex items-center justify-between group transition-colors ${
                                isSelected
                                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border-l-2 border-emerald-400'
                                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                              }`}
                            >
                              <span className="truncate">
                                {league.localizedName || league.name}
                              </span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1"></span>
                              )}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {filteredData.countries.length === 0 && !filteredData.international && (
              <div className="p-6 text-center text-zinc-500 text-xs">
                Nenhum país ou liga encontrada para "{filterQuery}"
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-[#141414] border-t border-zinc-800/80 text-[10px] text-zinc-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          FotMob Live Scraper
        </span>
        <span className="font-mono">559 Ligas</span>
      </div>
    </div>
  );

  // If used as drawer/modal
  if (isDrawer) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Slide-out Drawer */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-80 max-w-[85vw] h-full z-10 shadow-2xl shadow-black"
        >
          {sidebarContent}
        </motion.div>
      </div>
    );
  }

  // If embedded in desktop view
  return <aside className="w-72 h-full shrink-0 hidden lg:block">{sidebarContent}</aside>;
};
