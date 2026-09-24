import { USER_FAVORITE_CLUBS_DATA } from '../data/favoriteClubs';

export interface ResolvedMatchLeague {
  league: string;
  country: string;
  tier: 'tier1' | 'tier2' | 'exotic' | 'cup' | 'friendly';
  isExotic: boolean;
}

// Dicionário mestre de times para Ligas e Países (incluindo ligas periféricas e históricas)
const KNOWN_TEAM_MAPPINGS: Record<string, { league: string; country: string; tier?: 'tier1' | 'tier2' | 'exotic' | 'cup' | 'friendly' }> = {
  // Honduras / Concacaf
  'fc motagua': { league: 'Liga Nacional (Honduras)', country: 'Honduras', tier: 'exotic' },
  'motagua': { league: 'Liga Nacional (Honduras)', country: 'Honduras', tier: 'exotic' },
  'real españa': { league: 'Liga Nacional (Honduras)', country: 'Honduras', tier: 'exotic' },
  'alianza fc': { league: 'Liga Mayor (El Salvador)', country: 'El Salvador', tier: 'exotic' },
  
  // Uzbequistão
  'lokomotiv tashkent': { league: 'Super League (Uzbequistão)', country: 'Uzbequistão', tier: 'exotic' },
  'neftchi fargona': { league: 'Super League (Uzbequistão)', country: 'Uzbequistão', tier: 'exotic' },
  'pakhtakor': { league: 'Super League (Uzbequistão)', country: 'Uzbequistão', tier: 'exotic' },
  'nasaf qarshi': { league: 'Super League (Uzbequistão)', country: 'Uzbequistão', tier: 'exotic' },

  // Emirados Árabes
  'al-jazira': { league: 'UAE Pro League (Emirados Árabes)', country: 'Emirados Árabes', tier: 'exotic' },
  'al-wahda': { league: 'UAE Pro League (Emirados Árabes)', country: 'Emirados Árabes', tier: 'exotic' },
  'al-ain': { league: 'UAE Pro League (Emirados Árabes)', country: 'Emirados Árabes', tier: 'exotic' },
  'al-wasl': { league: 'UAE Pro League (Emirados Árabes)', country: 'Emirados Árabes', tier: 'exotic' },
  'al-nasr sc': { league: 'UAE Pro League (Emirados Árabes)', country: 'Emirados Árabes', tier: 'exotic' },

  // Catar
  'al-ahli': { league: 'Stars League (Catar)', country: 'Catar', tier: 'exotic' },
  'al-shahaniya': { league: 'Stars League (Catar)', country: 'Catar', tier: 'exotic' },
  'al-sadd': { league: 'Stars League (Catar)', country: 'Catar', tier: 'exotic' },
  'al-duhail': { league: 'Stars League (Catar)', country: 'Catar', tier: 'exotic' },
  'al-rayyan': { league: 'Stars League (Catar)', country: 'Catar', tier: 'exotic' },

  // Azerbaijão
  'turan tovuz': { league: 'Premyer Liqasi (Azerbaijão)', country: 'Azerbaijão', tier: 'exotic' },
  'zira': { league: 'Premyer Liqasi (Azerbaijão)', country: 'Azerbaijão', tier: 'exotic' },
  'qarabag': { league: 'Premyer Liqasi (Azerbaijão)', country: 'Azerbaijão', tier: 'exotic' },
  'neftchi baku': { league: 'Premyer Liqasi (Azerbaijão)', country: 'Azerbaijão', tier: 'exotic' },

  // Letônia
  'fk jelgava': { league: 'Virsliga (Letônia)', country: 'Letônia', tier: 'exotic' },
  'riga fc': { league: 'Virsliga (Letônia)', country: 'Letônia', tier: 'exotic' },
  'rfs': { league: 'Virsliga (Letônia)', country: 'Letônia', tier: 'exotic' },
  'valmiera': { league: 'Virsliga (Letônia)', country: 'Letônia', tier: 'exotic' },

  // Ucrânia
  'polissya zhytomyr': { league: 'Premier League (Ucrânia)', country: 'Ucrânia', tier: 'tier2' },
  'kryvbas': { league: 'Premier League (Ucrânia)', country: 'Ucrânia', tier: 'tier2' },
  'shakhtar donetsk': { league: 'Premier League (Ucrânia)', country: 'Ucrânia', tier: 'tier2' },
  'dynamo kyiv': { league: 'Premier League (Ucrânia)', country: 'Ucrânia', tier: 'tier2' },

  // Cazaquistão
  'fc astana': { league: 'Premier League (Cazaquistão)', country: 'Cazaquistão', tier: 'exotic' },
  'kairat almaty': { league: 'Premier League (Cazaquistão)', country: 'Cazaquistão', tier: 'exotic' },
  'tobol': { league: 'Premier League (Cazaquistão)', country: 'Cazaquistão', tier: 'exotic' },
  'ordabasy': { league: 'Premier League (Cazaquistão)', country: 'Cazaquistão', tier: 'exotic' },

  // Golfo / Oriente Médio / Ásia
  'al shorta': { league: 'Premier League (Iraque)', country: 'Iraque', tier: 'exotic' },
  'al-seeb': { league: 'Professional League (Omã)', country: 'Omã', tier: 'exotic' },
  'al hilal': { league: 'Saudi Pro League (Arábia Saudita)', country: 'Arábia Saudita', tier: 'tier2' },
  'al nassr': { league: 'Saudi Pro League (Arábia Saudita)', country: 'Arábia Saudita', tier: 'tier2' },
  'al ittihad': { league: 'Saudi Pro League (Arábia Saudita)', country: 'Arábia Saudita', tier: 'tier2' },
  'al ahli': { league: 'Saudi Pro League (Arábia Saudita)', country: 'Arábia Saudita', tier: 'tier2' },

  // Chipre
  'aek larnaca': { league: 'Primeira Divisão (Chipre)', country: 'Chipre', tier: 'exotic' },
  'pafos fc': { league: 'Primeira Divisão (Chipre)', country: 'Chipre', tier: 'exotic' },
  'apoel nicosia': { league: 'Primeira Divisão (Chipre)', country: 'Chipre', tier: 'exotic' },
  'omonia': { league: 'Primeira Divisão (Chipre)', country: 'Chipre', tier: 'exotic' },

  // Sérvia
  'fk imt beograd': { league: 'SuperLiga (Sérvia)', country: 'Sérvia', tier: 'exotic' },
  'fk crvena zvezda': { league: 'SuperLiga (Sérvia)', country: 'Sérvia', tier: 'tier2' },
  'crvena zvezda': { league: 'SuperLiga (Sérvia)', country: 'Sérvia', tier: 'tier2' },
  'partizan': { league: 'SuperLiga (Sérvia)', country: 'Sérvia', tier: 'tier2' },

  // Coreia do Sul
  'ulsan hd fc': { league: 'K-League 1 (Coreia do Sul)', country: 'Coreia do Sul', tier: 'tier2' },
  'fc seoul': { league: 'K-League 1 (Coreia do Sul)', country: 'Coreia do Sul', tier: 'tier2' },
  'jeonbuk hyundai': { league: 'K-League 1 (Coreia do Sul)', country: 'Coreia do Sul', tier: 'tier2' },
  'pohang steelers': { league: 'K-League 1 (Coreia do Sul)', country: 'Coreia do Sul', tier: 'tier2' },

  // Finlândia
  'tps': { league: 'Ykkösliiga (Finlândia)', country: 'Finlândia', tier: 'exotic' },
  'sjk': { league: 'Veikkausliiga (Finlândia)', country: 'Finlândia', tier: 'exotic' },
  'hjk': { league: 'Veikkausliiga (Finlândia)', country: 'Finlândia', tier: 'exotic' },
  'kups': { league: 'Veikkausliiga (Finlândia)', country: 'Finlândia', tier: 'exotic' },

  // Holanda
  'az alkmaar': { league: 'Eredivisie (Holanda)', country: 'Holanda', tier: 'tier1' },
  'telstar': { league: 'Eerste Divisie (Holanda)', country: 'Holanda', tier: 'tier2' },
  'ajax': { league: 'Eredivisie (Holanda)', country: 'Holanda', tier: 'tier1' },
  'psv eindhoven': { league: 'Eredivisie (Holanda)', country: 'Holanda', tier: 'tier1' },
  'feyenoord': { league: 'Eredivisie (Holanda)', country: 'Holanda', tier: 'tier1' },

  // Escócia
  'rangers': { league: 'Premiership (Escócia)', country: 'Escócia', tier: 'tier2' },
  'st. mirren': { league: 'Premiership (Escócia)', country: 'Escócia', tier: 'tier2' },
  'celtic': { league: 'Premiership (Escócia)', country: 'Escócia', tier: 'tier2' },
  'aberdeen': { league: 'Premiership (Escócia)', country: 'Escócia', tier: 'tier2' },

  // Inglaterra (Premier League / Championship)
  'tottenham': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'tottenham hotspur': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'everton': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'arsenal': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'chelsea': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'liverpool': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'manchester city': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'manchester united': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'fulham': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'aston villa': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'brighton': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },
  'west ham': { league: 'Premier League (Inglaterra)', country: 'Inglaterra', tier: 'tier1' },

  // Áustria / Amistosos
  'salzburg': { league: 'Bundesliga (Áustria)', country: 'Áustria', tier: 'tier2' },
  'red bull salzburg': { league: 'Bundesliga (Áustria)', country: 'Áustria', tier: 'tier2' },
  'sturm graz': { league: 'Bundesliga (Áustria)', country: 'Áustria', tier: 'tier2' },
  'levski sofia': { league: 'First League (Bulgária)', country: 'Bulgária', tier: 'exotic' },

  // Grécia
  'paok thessaloniki': { league: 'Super League (Grécia)', country: 'Grécia', tier: 'tier2' },
  'paok': { league: 'Super League (Grécia)', country: 'Grécia', tier: 'tier2' },
  'panetolikos': { league: 'Super League (Grécia)', country: 'Grécia', tier: 'tier2' },
  'olympiacos': { league: 'Super League (Grécia)', country: 'Grécia', tier: 'tier2' },
  'panathinaikos': { league: 'Super League (Grécia)', country: 'Grécia', tier: 'tier2' },
  'aek athens': { league: 'Super League (Grécia)', country: 'Grécia', tier: 'tier2' },

  // Indonésia
  'persijap jepara': { league: 'Liga 2 (Indonésia)', country: 'Indonésia', tier: 'exotic' },
  'persib bandung': { league: 'Liga 1 (Indonésia)', country: 'Indonésia', tier: 'exotic' },

  // Turquia
  'fenerbahçe': { league: 'Süper Lig (Turquia)', country: 'Turquia', tier: 'tier1' },
  'fenerbahce': { league: 'Süper Lig (Turquia)', country: 'Turquia', tier: 'tier1' },
  'eyüpspor': { league: 'Süper Lig (Turquia)', country: 'Turquia', tier: 'tier1' },
  'galatasaray': { league: 'Süper Lig (Turquia)', country: 'Turquia', tier: 'tier1' },
  'besiktas': { league: 'Süper Lig (Turquia)', country: 'Turquia', tier: 'tier1' },
  'trabzonspor': { league: 'Süper Lig (Turquia)', country: 'Turquia', tier: 'tier1' },

  // Moldávia
  'fc sheriff': { league: 'Super Liga (Moldávia)', country: 'Moldávia', tier: 'exotic' },
  'fc bălți': { league: 'Super Liga (Moldávia)', country: 'Moldávia', tier: 'exotic' },

  // França
  'marseille': { league: 'Ligue 1 (França)', country: 'França', tier: 'tier1' },
  'paris saint-germain': { league: 'Ligue 1 (França)', country: 'França', tier: 'tier1' },
  'psg': { league: 'Ligue 1 (França)', country: 'França', tier: 'tier1' },
  'monaco': { league: 'Ligue 1 (França)', country: 'França', tier: 'tier1' },
  'lyon': { league: 'Ligue 1 (França)', country: 'França', tier: 'tier1' },

  // Itália
  'fiorentina': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },
  'napoli': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },
  'inter milan': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },
  'inter': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },
  'ac milan': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },
  'milan': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },
  'juventus': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },
  'roma': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },
  'lazio': { league: 'Serie A (Itália)', country: 'Itália', tier: 'tier1' },

  // México
  'toluca': { league: 'Liga MX (México)', country: 'México', tier: 'tier1' },
  'santos laguna': { league: 'Liga MX (México)', country: 'México', tier: 'tier1' },
  'cruz azul': { league: 'Liga MX (México)', country: 'México', tier: 'tier1' },
  'cruz azul hidalgo': { league: 'Liga Premier (México)', country: 'México', tier: 'exotic' },
  'leones negros': { league: 'Liga de Expansión MX (México)', country: 'México', tier: 'tier2' },
  'cf américa': { league: 'Liga MX (México)', country: 'México', tier: 'tier1' },
  'club américa': { league: 'Liga MX (México)', country: 'México', tier: 'tier1' },

  // Paraguai
  'sportivo trinidense': { league: 'División Profesional (Paraguai)', country: 'Paraguai', tier: 'exotic' },
  'cerro porteño': { league: 'División Profesional (Paraguai)', country: 'Paraguai', tier: 'tier2' },
  'olimpia': { league: 'División Profesional (Paraguai)', country: 'Paraguai', tier: 'tier2' },
  'libertad': { league: 'División Profesional (Paraguai)', country: 'Paraguai', tier: 'tier2' },

  // Canadá
  'atlético ottawa': { league: 'Canadian Premier League (Canadá)', country: 'Canadá', tier: 'tier2' },
  'hfx wanderers fc': { league: 'Canadian Premier League (Canadá)', country: 'Canadá', tier: 'tier2' },
  'cavalry fc': { league: 'Canadian Premier League (Canadá)', country: 'Canadá', tier: 'tier2' },
  'forge fc': { league: 'Canadian Premier League (Canadá)', country: 'Canadá', tier: 'tier2' },

  // Bangladesh
  'dhaka wanderers': { league: 'Premier League (Bangladesh)', country: 'Bangladesh', tier: 'exotic' },
  'abahani limited': { league: 'Premier League (Bangladesh)', country: 'Bangladesh', tier: 'exotic' },

  // Brasil
  'flamengo': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'palmeiras': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'são paulo': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'corinthians': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'botafogo': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'grêmio': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'internacional': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'atlético mineiro': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'cruzeiro': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },
  'fluminense': { league: 'Brasileirão Série A', country: 'Brasil', tier: 'tier1' },

  // Espanha
  'real madrid': { league: 'La Liga (Espanha)', country: 'Espanha', tier: 'tier1' },
  'barcelona': { league: 'La Liga (Espanha)', country: 'Espanha', tier: 'tier1' },
  'atletico madrid': { league: 'La Liga (Espanha)', country: 'Espanha', tier: 'tier1' },
  'sevilla': { league: 'La Liga (Espanha)', country: 'Espanha', tier: 'tier1' },
  'real betis': { league: 'La Liga (Espanha)', country: 'Espanha', tier: 'tier1' },

  // Alemanha
  'bayern münchen': { league: 'Bundesliga (Alemanha)', country: 'Alemanha', tier: 'tier1' },
  'bayern munich': { league: 'Bundesliga (Alemanha)', country: 'Alemanha', tier: 'tier1' },
  'borussia dortmund': { league: 'Bundesliga (Alemanha)', country: 'Alemanha', tier: 'tier1' },
  'bayer leverkusen': { league: 'Bundesliga (Alemanha)', country: 'Alemanha', tier: 'tier1' },
  'rb leipzig': { league: 'Bundesliga (Alemanha)', country: 'Alemanha', tier: 'tier1' },

  // Portugal
  'sporting cp': { league: 'Primeira Liga (Portugal)', country: 'Portugal', tier: 'tier1' },
  'benfica': { league: 'Primeira Liga (Portugal)', country: 'Portugal', tier: 'tier1' },
  'fc porto': { league: 'Primeira Liga (Portugal)', country: 'Portugal', tier: 'tier1' },
  'porto': { league: 'Primeira Liga (Portugal)', country: 'Portugal', tier: 'tier1' },
  'braga': { league: 'Primeira Liga (Portugal)', country: 'Portugal', tier: 'tier1' },
};

function normalizeName(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Identifica a Liga, País e Categoria do Confronto com precisão cirúrgica
 */
export function resolveMatchLeague(
  leg: {
    matchTitle?: string;
    team1?: string;
    team2?: string;
    league?: string;
    competition?: string;
    leagueName?: string;
  },
  supabaseFavorites?: { id: number; name: string; country?: string; league?: string }[]
): ResolvedMatchLeague {
  // Extrair nomes dos times
  let t1 = leg.team1 || '';
  let t2 = leg.team2 || '';

  if ((!t1 || !t2) && leg.matchTitle) {
    const parts = leg.matchTitle.split(/\s+(?:x|vs|v)\s+/i);
    if (parts.length >= 2) {
      t1 = t1 || parts[0].trim();
      t2 = t2 || parts[1].trim();
    }
  }

  const norm1 = normalizeName(t1);
  const norm2 = normalizeName(t2);

  // 1. Buscar no dicionário de times conhecidos primeiro (evita confusão de nomes como "Premier League" que existem em múltiplos países)
  const known1 = KNOWN_TEAM_MAPPINGS[norm1] || Object.entries(KNOWN_TEAM_MAPPINGS).find(([k]) => norm1.includes(k) || k.includes(norm1))?.[1];
  if (known1) {
    return {
      league: known1.league,
      country: known1.country,
      tier: known1.tier || (known1.country === 'Inglaterra' || known1.country === 'Espanha' || known1.country === 'Alemanha' || known1.country === 'Itália' ? 'tier1' : 'exotic'),
      isExotic: known1.tier === 'exotic',
    };
  }

  const known2 = KNOWN_TEAM_MAPPINGS[norm2] || Object.entries(KNOWN_TEAM_MAPPINGS).find(([k]) => norm2.includes(k) || k.includes(norm2))?.[1];
  if (known2) {
    return {
      league: known2.league,
      country: known2.country,
      tier: known2.tier || 'exotic',
      isExotic: known2.tier === 'exotic',
    };
  }

  // 2. Se o próprio leg já tiver league ou competition explícita
  const explicit = (leg.league || leg.competition || leg.leagueName || '').trim();
  if (explicit && explicit.length > 2 && explicit !== 'Futebol') {
    const lowerExp = explicit.toLowerCase();
    let country = 'Internacional';
    let league = explicit;
    let isExotic = false;
    let tier: 'tier1' | 'tier2' | 'exotic' = 'tier1';
    
    if (lowerExp.includes('premier league') || lowerExp.includes('championship')) {
      country = 'Inglaterra';
      league = 'Premier League (Inglaterra)';
    } else if (lowerExp.includes('la liga') || lowerExp.includes('laliga')) {
      country = 'Espanha';
      league = 'La Liga (Espanha)';
    } else if (lowerExp.includes('serie a') && !lowerExp.includes('brasil')) {
      country = 'Itália';
      league = 'Serie A (Itália)';
    } else if (lowerExp.includes('bundesliga') && !lowerExp.includes('austria') && !lowerExp.includes('áustria')) {
      country = 'Alemanha';
      league = 'Bundesliga (Alemanha)';
    } else if (lowerExp.includes('ligue 1') || lowerExp.includes('ligue 2')) {
      country = 'França';
      league = 'Ligue 1 (França)';
    } else if (lowerExp.includes('brasileir') || lowerExp.includes('série a') || lowerExp.includes('copa do brasil')) {
      country = 'Brasil';
      league = 'Brasileirão Série A';
    } else if (lowerExp.includes('süper lig') || lowerExp.includes('super lig') || lowerExp.includes('turquia')) {
      country = 'Turquia';
      league = 'Süper Lig (Turquia)';
    } else if (lowerExp.includes('saudi') || lowerExp.includes('arábia')) {
      country = 'Arábia Saudita';
      league = 'Saudi Pro League (Arábia Saudita)';
      tier = 'tier2';
    } else if (lowerExp.includes('eredivisie') || lowerExp.includes('eerste')) {
      country = 'Holanda';
      league = 'Eredivisie (Holanda)';
    } else if (lowerExp.includes('primeira liga') || lowerExp.includes('portugal')) {
      country = 'Portugal';
      league = 'Primeira Liga (Portugal)';
    } else if (lowerExp.includes('cyprus') || lowerExp.includes('chipre') || lowerExp.includes('c plus')) {
      country = 'Chipre';
      league = 'Primeira Divisão (Chipre)';
      isExotic = true;
      tier = 'exotic';
    } else if (lowerExp.includes('k league') || lowerExp.includes('k-league') || lowerExp.includes('coreia')) {
      country = 'Coreia do Sul';
      league = 'K-League 1 (Coreia do Sul)';
      tier = 'tier2';
    } else if (lowerExp.includes('honduras') || lowerExp.includes('motagua') || lowerExp.includes('liga nacional')) {
      country = 'Honduras';
      league = 'Liga Nacional (Honduras)';
      isExotic = true;
      tier = 'exotic';
    } else if (lowerExp.includes('letônia') || lowerExp.includes('latvia') || lowerExp.includes('virsliga')) {
      country = 'Letônia';
      league = 'Virsliga (Letônia)';
      isExotic = true;
      tier = 'exotic';
    } else if (lowerExp.includes('uzbequ') || lowerExp.includes('tashkent')) {
      country = 'Uzbequistão';
      league = 'Super League (Uzbequistão)';
      isExotic = true;
      tier = 'exotic';
    } else if (lowerExp.includes('escócia') || lowerExp.includes('scot')) {
      country = 'Escócia';
      league = 'Premiership (Escócia)';
      tier = 'tier2';
    } else if (lowerExp.includes('grécia') || lowerExp.includes('greece')) {
      country = 'Grécia';
      league = 'Super League (Grécia)';
      tier = 'tier2';
    } else if (lowerExp.includes('austria') || lowerExp.includes('áustria')) {
      country = 'Áustria';
      league = 'Bundesliga (Áustria)';
      tier = 'tier2';
    }

    return {
      league,
      country,
      tier,
      isExotic,
    };
  }

  // 3. Buscar na base de Favoritos (USER_FAVORITE_CLUBS_DATA ou Supabase)
  const allFavs = [
    ...(supabaseFavorites || []),
    ...USER_FAVORITE_CLUBS_DATA,
  ];

  for (const fav of allFavs) {
    const favNorm = normalizeName(fav.name);
    if (favNorm === norm1 || norm1.includes(favNorm) || favNorm.includes(norm1)) {
      return {
        league: fav.league || 'Liga Nacional',
        country: fav.country || 'Mundo',
        tier: fav.country === 'Brasil' || fav.country === 'Inglaterra' || fav.country === 'Espanha' || fav.country === 'Alemanha' ? 'tier1' : 'tier2',
        isExotic: false,
      };
    }
    if (favNorm === norm2 || norm2.includes(favNorm) || favNorm.includes(norm2)) {
      return {
        league: fav.league || 'Liga Nacional',
        country: fav.country || 'Mundo',
        tier: fav.country === 'Brasil' || fav.country === 'Inglaterra' || fav.country === 'Espanha' || fav.country === 'Alemanha' ? 'tier1' : 'tier2',
        isExotic: false,
      };
    }
  }

  // 4. Fallback inteligente
  return {
    league: 'Outras Ligas / Copas',
    country: 'Internacional',
    tier: 'exotic',
    isExotic: true,
  };
}
