import React, { useState, useMemo } from 'react';
import { Trophy, ChevronDown, ChevronRight, Search, Globe, Flame, Star, Award, Shield } from 'lucide-react';
import { LeagueOption, FotMobAllLeaguesData, FotMobLeagueItem } from '../types';
import { CountryFlag } from './CountryFlag';

interface LeftSidebarProps {
  selectedLeague: LeagueOption | null;
  onSelectLeague: (league: LeagueOption | null) => void;
  allLeaguesData?: FotMobAllLeaguesData | null;
  onCloseMobile?: () => void;
}

// Major leagues matching Screenshot 3
const PRINCIPAIS_LIGAS = [
  {
    id: 'fotmob-premier-league',
    fotmobId: 47,
    name: 'Premier League',
    country: 'Inglaterra',
    ccode: 'ENG',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    iconType: 'trophy',
    color: 'text-purple-400',
    slug: 'premier-league',
  },
  {
    id: 'fotmob-brazil-serie-a',
    fotmobId: 268,
    name: 'Serie A',
    country: 'Brasil',
    ccode: 'BRA',
    flag: '🇧🇷',
    iconType: 'green-a',
    color: 'text-emerald-400',
    slug: 'brasileirao-serie-a',
  },
  {
    id: 'fotmob-champions-league',
    fotmobId: 42,
    name: 'Liga dos Campeões',
    country: 'Internacional',
    ccode: 'INT',
    flag: '⭐',
    iconType: 'star',
    color: 'text-blue-400',
    slug: 'champions-league',
  },
  {
    id: 'fotmob-copa-do-brasil',
    fotmobId: 325,
    name: 'Copa do Brasil',
    country: 'Brasil',
    ccode: 'BRA',
    flag: '🇧🇷',
    iconType: 'cup',
    color: 'text-amber-400',
    slug: 'copa-do-brasil',
  },
  {
    id: 'fotmob-la-liga',
    fotmobId: 87,
    name: 'LaLiga',
    country: 'Espanha',
    ccode: 'ESP',
    flag: '🇪🇸',
    iconType: 'flame',
    color: 'text-rose-500',
    slug: 'laliga',
  },
  {
    id: 'fotmob-fifa-world-cup',
    fotmobId: 77,
    name: 'Campeonato do Mundo FIFA',
    country: 'Internacional',
    ccode: 'INT',
    flag: '🏆',
    iconType: 'globe',
    color: 'text-yellow-400',
    slug: 'fifa-world-cup',
  },
  {
    id: 'fotmob-bundesliga',
    fotmobId: 54,
    name: 'Bundesliga',
    country: 'Alemanha',
    ccode: 'GER',
    flag: '🇩🇪',
    iconType: 'runner',
    color: 'text-red-500',
    slug: 'bundesliga',
  },
  {
    id: 'fotmob-italy-serie-a',
    fotmobId: 55,
    name: 'Serie A',
    country: 'Itália',
    ccode: 'ITA',
    flag: '🇮🇹',
    iconType: 'diamond',
    color: 'text-cyan-400',
    slug: 'serie-a',
  },
  {
    id: 'fotmob-ligue-1',
    fotmobId: 53,
    name: 'Ligue 1',
    country: 'França',
    ccode: 'FRA',
    flag: '🇫🇷',
    iconType: 'number1',
    color: 'text-indigo-400',
    slug: 'ligue-1',
  },
  {
    id: 'fotmob-brazil-serie-b',
    fotmobId: 269,
    name: 'Serie B',
    country: 'Brasil',
    ccode: 'BRA',
    flag: '🇧🇷',
    iconType: 'yellow-b',
    color: 'text-yellow-400',
    slug: 'brasileirao-serie-b',
  },
];

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedLeague,
  onSelectLeague,
  allLeaguesData,
  onCloseMobile,
}) => {
  const [filterText, setFilterText] = useState('');
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({
    BRA: true,
    ENG: true,
    ESP: true,
    INT: true,
    GER: false,
    ITA: false,
  });
  const [isAllLeaguesCollapsed, setIsAllLeaguesCollapsed] = useState(false);

  const toggleCountry = (code: string) => {
    setExpandedCountries((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleSelect = (leagueItem: any, countryName: string, ccode?: string) => {
    const isFotmobItem = typeof leagueItem.id === 'number';
    const pageUrlParts = (leagueItem.pageUrl || '').split('/').filter(Boolean);
    const resolvedSlug = leagueItem.slug || (pageUrlParts.length > 0 ? pageUrlParts[pageUrlParts.length - 1] : 'overview');

    const leagueOpt: LeagueOption = {
      id: isFotmobItem ? `fotmob-${leagueItem.id}` : leagueItem.id,
      name: leagueItem.localizedName || leagueItem.name,
      country: countryName,
      flag: leagueItem.flag || '⚽',
      season: '2026/27',
      source: 'fotmob',
      fotmobId: isFotmobItem ? leagueItem.id : leagueItem.fotmobId,
      fotmobSlug: resolvedSlug,
      fotmobPageUrl: leagueItem.pageUrl,
      countryCcode: ccode || leagueItem.ccode,
    };
    onSelectLeague(leagueOpt);
    if (onCloseMobile) onCloseMobile();
  };

  // Fallback / curated countries if API is loading
  const fallbackCountries = useMemo(() => [
    {
      ccode: 'BRA',
      name: 'Brasil',
      flag: '🇧🇷',
      leagues: [
        { id: 268, name: 'Série A', slug: 'brasileirao-serie-a' },
        { id: 269, name: 'Série B', slug: 'brasileirao-serie-b' },
        { id: 325, name: 'Copa do Brasil', slug: 'copa-do-brasil' },
        { id: 10214, name: 'Campeonato Paulista', slug: 'paulista' },
        { id: 10215, name: 'Campeonato Carioca', slug: 'carioca' },
      ],
    },
    {
      ccode: 'INT',
      name: 'Internacional',
      flag: '🌐',
      leagues: [
        { id: 42, name: 'UEFA Champions League', slug: 'champions-league' },
        { id: 73, name: 'UEFA Europa League', slug: 'europa-league' },
        { id: 77, name: 'Campeonato do Mundo FIFA', slug: 'fifa-world-cup' },
        { id: 265, name: 'Copa Libertadores', slug: 'copa-libertadores' },
        { id: 266, name: 'Copa Sul-Americana', slug: 'copa-sudamericana' },
      ],
    },
    {
      ccode: 'ESP',
      name: 'Espanha',
      flag: '🇪🇸',
      leagues: [
        { id: 87, name: 'LaLiga EA Sports', slug: 'laliga' },
        { id: 140, name: 'LaLiga Hypermotion (2ª)', slug: 'laliga-2' },
        { id: 138, name: 'Copa del Rey', slug: 'copa-del-rey' },
        { id: 139, name: 'Supercopa da Espanha', slug: 'supercopa-de-espana' },
      ],
    },
    {
      ccode: 'ENG',
      name: 'Inglaterra',
      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      leagues: [
        { id: 47, name: 'Premier League', slug: 'premier-league' },
        { id: 48, name: 'Championship', slug: 'championship' },
        { id: 132, name: 'FA Cup', slug: 'fa-cup' },
        { id: 133, name: 'EFL Cup (Carabao Cup)', slug: 'efl-cup' },
      ],
    },
    {
      ccode: 'GER',
      name: 'Alemanha',
      flag: '🇩🇪',
      leagues: [
        { id: 54, name: 'Bundesliga', slug: 'bundesliga' },
        { id: 146, name: '2. Bundesliga', slug: '2-bundesliga' },
        { id: 209, name: 'DFB Pokal', slug: 'dfb-pokal' },
      ],
    },
    {
      ccode: 'ITA',
      name: 'Itália',
      flag: '🇮🇹',
      leagues: [
        { id: 55, name: 'Serie A', slug: 'serie-a' },
        { id: 56, name: 'Serie B', slug: 'serie-b' },
        { id: 141, name: 'Coppa Italia', slug: 'coppa-italia' },
      ],
    },
    {
      ccode: 'FRA',
      name: 'França',
      flag: '🇫🇷',
      leagues: [
        { id: 53, name: 'Ligue 1', slug: 'ligue-1' },
        { id: 110, name: 'Ligue 2', slug: 'ligue-2' },
        { id: 142, name: 'Coupe de France', slug: 'coupe-de-france' },
      ],
    },
    {
      ccode: 'SAU',
      name: 'Arábia Saudita',
      flag: '🇸🇦',
      leagues: [
        { id: 955, name: 'Saudi Pro League', slug: 'saudi-pro-league' },
        { id: 956, name: 'King Cup', slug: 'king-cup' },
      ],
    },
    {
      ccode: 'ARG',
      name: 'Argentina',
      flag: '🇦🇷',
      leagues: [
        { id: 112, name: 'Liga Profesional', slug: 'liga-profesional' },
        { id: 267, name: 'Copa Argentina', slug: 'copa-argentina' },
      ],
    },
    {
      ccode: 'POR',
      name: 'Portugal',
      flag: '🇵🇹',
      leagues: [
        { id: 61, name: 'Liga Portugal Betclic', slug: 'primeira-liga' },
        { id: 143, name: 'Taça de Portugal', slug: 'taca-de-portugal' },
      ],
    },
  ], []);

  // Filtered countries list
  const countriesToDisplay = useMemo(() => {
    if (allLeaguesData?.countries && allLeaguesData.countries.length > 0) {
      if (!filterText.trim()) return allLeaguesData.countries;
      const lower = filterText.toLowerCase();
      return allLeaguesData.countries.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.localizedName?.toLowerCase().includes(lower) ||
          c.leagues?.some((l) => l.name.toLowerCase().includes(lower))
      );
    }

    if (!filterText.trim()) return fallbackCountries;
    const lower = filterText.toLowerCase();
    return fallbackCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.leagues.some((l) => l.name.toLowerCase().includes(lower))
    );
  }, [allLeaguesData, fallbackCountries, filterText]);

  return (
    <aside className="w-full flex flex-col gap-3 select-none">
      
      {/* TODAS AS LIGAS CARD */}
      <div id="card-todas-as-ligas" className="bg-[#141414] rounded-xl border border-[#222222] overflow-hidden p-3 shadow-sm">
        <div
          onClick={() => setIsAllLeaguesCollapsed(!isAllLeaguesCollapsed)}
          className="flex items-center justify-between px-2 py-1 cursor-pointer hover:text-white transition-colors"
        >
          <h2 className="text-xs font-bold text-white tracking-tight">
            Todas as ligas
          </h2>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              isAllLeaguesCollapsed ? '-rotate-90' : 'rotate-0'
            }`}
          />
        </div>

        {!isAllLeaguesCollapsed && (
          <div className="mt-2 flex flex-col gap-2">
            
            {/* Filter search input matching Screenshot 4 */}
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="input-filter-todas-as-ligas"
                type="text"
                placeholder="Filtro"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full bg-[#1c1c1c] text-xs text-white placeholder-zinc-500 pl-8 pr-3 py-1.5 rounded-lg border border-[#262626] focus:border-zinc-600 outline-none transition-all"
              />
            </div>

            {/* Countries & Leagues Accordion List */}
            <div className="flex flex-col gap-0.5 max-h-[calc(100vh-180px)] min-h-[480px] overflow-y-auto pr-1">
              {countriesToDisplay.map((country: any) => {
                const isExpanded = !!expandedCountries[country.ccode || country.name];
                return (
                  <div key={country.ccode || country.name} className="flex flex-col">
                    <button
                      id={`btn-country-accordion-${(country.ccode || country.name).toLowerCase()}`}
                      onClick={() => toggleCountry(country.ccode || country.name)}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-[#1a1a1a] hover:text-white transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-zinc-800 border border-zinc-700/50">
                          <CountryFlag ccode={country.ccode} name={country.name} size={16} />
                        </div>
                        <span className="truncate">{country.localizedName || country.name}</span>
                      </div>
                      
                      <ChevronRight
                        className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform duration-150 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {/* Sub-leagues list */}
                    {isExpanded && (
                      <div className="pl-7 pr-1 py-1 flex flex-col gap-0.5 border-l border-zinc-800 ml-4 my-0.5">
                        {(country.leagues || []).map((subLeague: any) => {
                          const isSubSelected = selectedLeague?.fotmobId === subLeague.id;
                          return (
                            <button
                              key={subLeague.id}
                              id={`btn-subleague-${subLeague.id}`}
                              onClick={() => handleSelect(subLeague, country.name, country.ccode)}
                              className={`w-full text-left px-2 py-1 rounded text-[11px] truncate transition-colors cursor-pointer ${
                                isSubSelected
                                  ? 'bg-[#222222] text-emerald-400 font-semibold'
                                  : 'text-zinc-400 hover:text-white hover:bg-[#1a1a1a]'
                              }`}
                            >
                              {subLeague.localizedName || subLeague.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </aside>
  );
};
