/**
 * Authoritative abbreviation helper for football clubs.
 * Provides clean 3-4 letter codes (e.g. FEN, ROM, FLA, KOB, TNS, AIR).
 */

const KNOWN_SHORT_CODES: Record<string, string> = {
  // Reference Clubs (from user screenshots)
  'fenerbahce': 'FEN',
  'fenerbahçe': 'FEN',
  'roma': 'ROM',
  'as roma': 'ROM',
  'vissel kobe': 'KOB',
  'kashima antlers': 'KAS',
  'airbus uk broughton': 'AIR',
  'airbus uk': 'AIR',
  'the new saints': 'TNS',
  'tns': 'TNS',
  'tampines rovers': 'TAM',
  'tampines rovers fc': 'TAM',
  'balestier khalsa': 'BAL',
  'balestier khalsa fc': 'BAL',

  // Brazil Serie A & B
  'flamengo': 'FLA',
  'cr flamengo': 'FLA',
  'palmeiras': 'PAL',
  'se palmeiras': 'PAL',
  'sao paulo': 'SAO',
  'sao paulo fc': 'SAO',
  'spfc': 'SAO',
  'corinthians': 'COR',
  'sc corinthians': 'COR',
  'santos': 'SAN',
  'santos fc': 'SAN',
  'fluminense': 'FLU',
  'fluminense fc': 'FLU',
  'vasco': 'VAS',
  'vasco da gama': 'VAS',
  'botafogo': 'BOT',
  'botafogo fr': 'BOT',
  'gremio': 'GRE',
  'internacional': 'INT',
  'inter de porto alegre': 'INT',
  'cruzeiro': 'CRU',
  'atletico mineiro': 'CAM',
  'atletico-mg': 'CAM',
  'athletico paranaense': 'CAP',
  'athletico-pr': 'CAP',
  'fortaleza': 'FOR',
  'bahia': 'BAH',
  'ec bahia': 'BAH',
  'vitoria': 'VIT',
  'ec vitoria': 'VIT',
  'ceara': 'CEA',
  'sport recife': 'SPO',
  'sport': 'SPO',
  'goias': 'GOI',
  'coritiba': 'CFC',
  'red bull bragantino': 'RBB',
  'bragantino': 'RBB',
  'cuiaba': 'CUI',
  'juventude': 'JUV',
  'criciuma': 'CRI',
  'atletico-go': 'ACG',
  'avai': 'AVA',
  'chapecoense': 'CHA',
  'ponte preta': 'PON',
  'guarani': 'GUA',
  'novorizontino': 'NOV',
  'mirassol': 'MIR',
  'vila nova': 'VIL',
  'paysandu': 'PAY',
  'remo': 'REM',
  'operario': 'OPE',
  'america-mg': 'AME',

  // Europe / Champions League
  'real madrid': 'RMA',
  'barcelona': 'BAR',
  'fc barcelona': 'BAR',
  'atletico madrid': 'ATM',
  'atletico de madrid': 'ATM',
  'manchester city': 'MCI',
  'man city': 'MCI',
  'manchester united': 'MUN',
  'man united': 'MUN',
  'liverpool': 'LIV',
  'arsenal': 'ARS',
  'chelsea': 'CHE',
  'tottenham': 'TOT',
  'tottenham hotspur': 'TOT',
  'newcastle': 'NEW',
  'aston villa': 'AVL',
  'brighton': 'BHA',
  'west ham': 'WHU',
  'bayern munich': 'BAY',
  'bayern munchen': 'BAY',
  'borussia dortmund': 'BVB',
  'bayer leverkusen': 'B04',
  'rb leipzig': 'RBL',
  'eintracht frankfurt': 'SGE',
  'paris saint-germain': 'PSG',
  'psg': 'PSG',
  'marseille': 'OM',
  'monaco': 'ASM',
  'lyon': 'OL',
  'juventus': 'JUV',
  'inter milan': 'INT',
  'ac milan': 'MIL',
  'milan': 'MIL',
  'napoli': 'NAP',
  'lazio': 'LAZ',
  'atalanta': 'ATA',
  'fiorentina': 'FIO',
  'benfica': 'SLB',
  'porto': 'FCP',
  'sporting cp': 'SCP',
  'sporting': 'SCP',
  'ajax': 'AJX',
  'feyenoord': 'FEY',
  'psv eindhoven': 'PSV',
  'psv': 'PSV',
  'celtic': 'CEL',
  'rangers': 'RAN',
  'galatasaray': 'GAL',
  'besiktas': 'BJK',
  'trabzonspor': 'TRA',
  'olympiacos': 'OLY',
  'panathinaikos': 'PAO',
  'al hilal': 'HIL',
  'al nassr': 'NAS',
  'al ittihad': 'ITT',
  'inter miami': 'MIA',
  'boca juniors': 'BOC',
  'river plate': 'RIV',
};

/**
 * Normalizes text for key comparison
 */
function normalizeName(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Returns a clean 3-4 letter uppercase short code for any soccer club.
 */
export function getTeamShortCode(teamName: string | undefined): string {
  if (!teamName || !teamName.trim()) return 'TIM';
  const clean = teamName.trim();
  const normalized = normalizeName(clean);

  // 1. Direct dictionary match
  if (KNOWN_SHORT_CODES[normalized]) {
    return KNOWN_SHORT_CODES[normalized];
  }

  // 2. Partial dictionary match (e.g. "Vissel Kobe (Japão)" -> "KOB")
  for (const [key, code] of Object.entries(KNOWN_SHORT_CODES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return code;
    }
  }

  // 3. Remove common soccer affixes
  const stripped = normalized
    .replace(/\b(fc|cf|cr|sc|se|ec|ac|as|fk|sk|bk|cd|ud|afc|the|de|do|da|e|and|club|clube|futebol|football)\b/gi, '')
    .replace(/[^\w\s]/g, '')
    .trim();

  const words = stripped.split(/\s+/).filter(Boolean);

  if (words.length >= 3) {
    // 3 words: Take first letter of each (e.g. The New Saints -> TNS)
    return words.slice(0, 3).map((w) => w[0]).join('').toUpperCase();
  }

  if (words.length === 2) {
    // 2 words: e.g. "Airbus UK" -> "AIR", "New Saints" -> "TNS"
    const first = words[0];
    const second = words[1];
    if (first.length >= 3) {
      return first.substring(0, 3).toUpperCase();
    }
    return (first.substring(0, 2) + second.substring(0, 1)).toUpperCase();
  }

  if (words.length === 1 && words[0].length >= 3) {
    return words[0].substring(0, 3).toUpperCase();
  }

  // Fallback: first 3 characters of original name
  return clean.replace(/\s+/g, '').substring(0, 3).toUpperCase();
}
