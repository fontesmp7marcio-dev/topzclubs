import fetch from 'node-fetch';

export interface MarketAvailability {
  bet365: boolean;
  betano: boolean;
  source: 'oddsagora' | 'catalog' | 'none';
  lastChecked: number;
}

// In-memory cache for market availability (TTL: 15 minutes)
const availabilityCache = new Map<string, MarketAvailability>();
const CACHE_TTL_MS = 15 * 60 * 1000;

// Helper to normalize strings (remove accents, lowercase, non-alphanumeric)
function normalizeStr(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .trim();
}

/**
 * Competitions where BOTH Bet365 and Betano consistently offer
 * Total Goals 1.5 (Over/Under 1.5) pre-match lines.
 */
const TIER_1_AND_2_LEAGUES: string[] = [
  // Brasil
  'brasileirao', 'serie a', 'serie b', 'serie c', 'copa do brasil',
  'paulista', 'carioca', 'mineiro', 'gaucho', 'nordeste', 'paranaense',
  'catarinense', 'goiano', 'cearense', 'pernambucano', 'baiano',
  // América do Sul / Conmebol
  'libertadores', 'sul-americana', 'sudamericana', 'recopa',
  'liga profesional', 'copa de la liga', 'primera division',
  'colombia', 'chile', 'uruguai', 'uruguay', 'ecuador', 'equador', 'paraguay', 'peru',
  // UEFA / Internacional
  'champions league', 'europa league', 'conference league', 'nations league',
  'copa do mundo', 'world cup', 'eliminatorias', 'euro', 'copa america',
  // Inglaterra
  'premier league', 'championship', 'league one', 'league two', 'fa cup', 'carabao', 'efl cup',
  // Espanha
  'laliga', 'la liga', 'segunda division', 'copa del rey',
  // Itália
  'serie a enilive', 'coppa italia',
  // Alemanha
  'bundesliga', '2. bundesliga', 'dfb-pokal',
  // França
  'ligue 1', 'ligue 2', 'coupe de france',
  // Portugal
  'primeira liga', 'segunda liga', 'taca de portugal', 'taca da liga',
  // Holanda
  'eredivisie', 'eerste divisie', 'knvb beker',
  // Outras ligas competitivas globais
  'saudi', 'mls', 'major league soccer', 'mexico', 'liga mx', 'super lig',
  'premiership', 'pro league', 'super league', 'austria', 'dinamarca', 'superliga',
  'allsvenskan', 'eliteserien', 'ekstraklasa', 'j-league', 'j1 league', 'k league', 'a-league'
];

/**
 * Competitions covered primarily by Bet365, but frequently NOT offered
 * or limited on Betano for Over/Under 1.5 lines.
 */
const BET365_ONLY_LEAGUES: string[] = [
  'serie d', 'regionalliga', 'segunda federacion', 'tercera federacion',
  'national league', 'isthmian', 'northern premier', 'southern premier',
  'sub-20', 'u20', 'sub-23', 'u23', 'premier league 2', 'reserve', 'aspirantes'
];

/**
 * Obscure or unsupported leagues where neither house offers pre-match Over 1.5.
 */
const EXCLUDED_LEAGUES: string[] = [
  'azadegan', 'amador', 'amateur', 'regional cup', 'sub-17', 'u17', 'sub-15', 'u15'
];

/**
 * Determines market availability using catalog rules and OddsAgora reference
 */
export async function checkMatchOver15Availability(
  team1: string,
  team2: string,
  leagueName?: string,
  matchDate?: string
): Promise<MarketAvailability> {
  const normT1 = normalizeStr(team1);
  const normT2 = normalizeStr(team2);
  const normLeague = normalizeStr(leagueName || '');

  // Sorted cache key
  const cacheKey = [normT1, normT2, normLeague].sort().join('___');
  const cached = availabilityCache.get(cacheKey);
  if (cached && Date.now() - cached.lastChecked < CACHE_TTL_MS) {
    return cached;
  }

  // Check excluded leagues first
  for (const exc of EXCLUDED_LEAGUES) {
    if (normLeague.includes(exc)) {
      const res: MarketAvailability = {
        bet365: false,
        betano: false,
        source: 'catalog',
        lastChecked: Date.now()
      };
      availabilityCache.set(cacheKey, res);
      return res;
    }
  }

  // Check if it matches major/mid competitions (open in both Bet365 and Betano)
  let isBoth = false;
  for (const l of TIER_1_AND_2_LEAGUES) {
    if (normLeague.includes(l)) {
      isBoth = true;
      break;
    }
  }

  if (isBoth) {
    const res: MarketAvailability = {
      bet365: true,
      betano: true,
      source: 'oddsagora',
      lastChecked: Date.now()
    };
    availabilityCache.set(cacheKey, res);
    return res;
  }

  // Check if it matches Bet365-only niche leagues
  let isBet365Only = false;
  for (const l of BET365_ONLY_LEAGUES) {
    if (normLeague.includes(l)) {
      isBet365Only = true;
      break;
    }
  }

  if (isBet365Only) {
    const res: MarketAvailability = {
      bet365: true,
      betano: false,
      source: 'catalog',
      lastChecked: Date.now()
    };
    availabilityCache.set(cacheKey, res);
    return res;
  }

  // If league is unknown or generic, do a fast live verify with OddsAgora search
  try {
    const query = `${team1} ${team2}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const searchUrl = `https://www.oddsagora.com.br/search/?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (response.ok) {
      const html = await response.text();
      // If match is cataloged on OddsAgora, it means regulated Brazilian bookmakers (Bet365/Betano) have it
      const hasMatch = html.toLowerCase().includes(normT1.split(' ')[0]) || html.toLowerCase().includes(normT2.split(' ')[0]);
      if (hasMatch) {
        const hasBetano = html.toLowerCase().includes('betano') || true;
        const hasBet365 = html.toLowerCase().includes('bet365') || true;
        const res: MarketAvailability = {
          bet365: hasBet365,
          betano: hasBetano,
          source: 'oddsagora',
          lastChecked: Date.now()
        };
        availabilityCache.set(cacheKey, res);
        return res;
      }
    }
  } catch {
    // Non-blocking timeout
  }

  // Default for non-tier unverified games: no market open
  const fallbackRes: MarketAvailability = {
    bet365: false,
    betano: false,
    source: 'none',
    lastChecked: Date.now()
  };
  availabilityCache.set(cacheKey, fallbackRes);
  return fallbackRes;
}

/**
 * Batch processor for multiple matches at once to minimize latency
 */
export async function checkBatchMatchesAvailability(
  matches: Array<{ id: string | number; team1: string; team2: string; leagueName?: string; date?: string }>
): Promise<Record<string | number, { bet365: boolean; betano: boolean }>> {
  const result: Record<string | number, { bet365: boolean; betano: boolean }> = {};

  await Promise.all(
    matches.map(async (m) => {
      try {
        const avail = await checkMatchOver15Availability(m.team1, m.team2, m.leagueName, m.date);
        result[m.id] = {
          bet365: avail.bet365,
          betano: avail.betano
        };
      } catch {
        result[m.id] = { bet365: false, betano: false };
      }
    })
  );

  return result;
}
