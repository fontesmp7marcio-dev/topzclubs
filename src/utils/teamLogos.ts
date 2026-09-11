export interface TeamMeta {
  shortName: string;
  code: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

const TEAM_MAP: Record<string, TeamMeta> = {
  // Premier League
  'Arsenal FC': { shortName: 'Arsenal', code: 'ARS', primaryColor: '#EF0107', secondaryColor: '#063672', textColor: '#FFFFFF' },
  'Arsenal': { shortName: 'Arsenal', code: 'ARS', primaryColor: '#EF0107', secondaryColor: '#063672', textColor: '#FFFFFF' },
  'Aston Villa': { shortName: 'Aston Villa', code: 'AVL', primaryColor: '#670E36', secondaryColor: '#95BFE5', textColor: '#FFFFFF' },
  'AFC Bournemouth': { shortName: 'Bournemouth', code: 'BOU', primaryColor: '#DA291C', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Brentford FC': { shortName: 'Brentford', code: 'BRE', primaryColor: '#E30613', secondaryColor: '#FDE100', textColor: '#FFFFFF' },
  'Brighton & Hove Albion': { shortName: 'Brighton', code: 'BHA', primaryColor: '#0057B8', secondaryColor: '#FFCD00', textColor: '#FFFFFF' },
  'Chelsea FC': { shortName: 'Chelsea', code: 'CHE', primaryColor: '#034694', secondaryColor: '#EE242C', textColor: '#FFFFFF' },
  'Crystal Palace': { shortName: 'Crystal Palace', code: 'CRY', primaryColor: '#1B458F', secondaryColor: '#A7A5A6', textColor: '#FFFFFF' },
  'Everton FC': { shortName: 'Everton', code: 'EVE', primaryColor: '#003399', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Fulham FC': { shortName: 'Fulham', code: 'FUL', primaryColor: '#000000', secondaryColor: '#CC0000', textColor: '#FFFFFF' },
  'Ipswich Town': { shortName: 'Ipswich', code: 'IPS', primaryColor: '#0047AB', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Leicester City': { shortName: 'Leicester', code: 'LEI', primaryColor: '#003090', secondaryColor: '#FDBE11', textColor: '#FFFFFF' },
  'Liverpool FC': { shortName: 'Liverpool', code: 'LIV', primaryColor: '#C8102E', secondaryColor: '#00B2A9', textColor: '#FFFFFF' },
  'Manchester City': { shortName: 'Man City', code: 'MCI', primaryColor: '#6CABDD', secondaryColor: '#1C2C5B', textColor: '#FFFFFF' },
  'Manchester United': { shortName: 'Man United', code: 'MUN', primaryColor: '#DA291C', secondaryColor: '#FBE122', textColor: '#FFFFFF' },
  'Newcastle United': { shortName: 'Newcastle', code: 'NEW', primaryColor: '#241F20', secondaryColor: '#41B6E6', textColor: '#FFFFFF' },
  'Nottingham Forest': { shortName: 'Nottm Forest', code: 'NFO', primaryColor: '#DD0000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Southampton FC': { shortName: 'Southampton', code: 'SOU', primaryColor: '#D71920', secondaryColor: '#130C0E', textColor: '#FFFFFF' },
  'Tottenham Hotspur': { shortName: 'Tottenham', code: 'TOT', primaryColor: '#132257', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'West Ham United': { shortName: 'West Ham', code: 'WHU', primaryColor: '#7A263A', secondaryColor: '#1BB1E7', textColor: '#FFFFFF' },
  'Wolverhampton Wanderers': { shortName: 'Wolves', code: 'WOL', primaryColor: '#FDB913', secondaryColor: '#231F20', textColor: '#000000' },

  // La Liga
  'Real Madrid': { shortName: 'Real Madrid', code: 'RMA', primaryColor: '#FEBE10', secondaryColor: '#00529F', textColor: '#000000' },
  'FC Barcelona': { shortName: 'Barcelona', code: 'BAR', primaryColor: '#004D98', secondaryColor: '#A50044', textColor: '#FFFFFF' },
  'Atlético Madrid': { shortName: 'Atlético', code: 'ATM', primaryColor: '#CB3524', secondaryColor: '#272E61', textColor: '#FFFFFF' },
  'Real Sociedad': { shortName: 'R. Sociedad', code: 'RSO', primaryColor: '#0067B1', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Athletic Club': { shortName: 'Athletic', code: 'ATH', primaryColor: '#EE2523', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Sevilla FC': { shortName: 'Sevilla', code: 'SEV', primaryColor: '#D4001F', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Real Betis': { shortName: 'Betis', code: 'BET', primaryColor: '#00954C', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Villarreal CF': { shortName: 'Villarreal', code: 'VIL', primaryColor: '#FFE600', secondaryColor: '#00519E', textColor: '#000000' },
  'Valencia CF': { shortName: 'Valencia', code: 'VAL', primaryColor: '#FF6600', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Girona FC': { shortName: 'Girona', code: 'GIR', primaryColor: '#CD1318', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Girona': { shortName: 'Girona', code: 'GIR', primaryColor: '#CD1318', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Getafe CF': { shortName: 'Getafe', code: 'GET', primaryColor: '#0055A5', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Getafe': { shortName: 'Getafe', code: 'GET', primaryColor: '#0055A5', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'RCD Espanyol': { shortName: 'Espanyol', code: 'ESP', primaryColor: '#0072CE', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Espanyol': { shortName: 'Espanyol', code: 'ESP', primaryColor: '#0072CE', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },

  // Championship & Others
  'Leeds United': { shortName: 'Leeds', code: 'LEE', primaryColor: '#FFCD00', secondaryColor: '#1D428A', textColor: '#000000' },
  'River Plate': { shortName: 'River Plate', code: 'RIV', primaryColor: '#D81E05', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Boca Juniors': { shortName: 'Boca Juniors', code: 'BOC', primaryColor: '#003366', secondaryColor: '#FFCC00', textColor: '#FFFFFF' },
  'Nacional': { shortName: 'Nacional', code: 'NAC', primaryColor: '#0038A8', secondaryColor: '#D81E05', textColor: '#FFFFFF' },
  'Sporting CP': { shortName: 'Sporting', code: 'SCP', primaryColor: '#008050', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Benfica': { shortName: 'Benfica', code: 'SLB', primaryColor: '#E60000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'FC Porto': { shortName: 'Porto', code: 'FCP', primaryColor: '#003399', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },

  // Serie A
  'Inter': { shortName: 'Inter', code: 'INT', primaryColor: '#010E80', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'FC Internazionale Milano': { shortName: 'Inter', code: 'INT', primaryColor: '#010E80', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'AC Milan': { shortName: 'Milan', code: 'MIL', primaryColor: '#FB090B', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Juventus': { shortName: 'Juventus', code: 'JUV', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Juventus FC': { shortName: 'Juventus', code: 'JUV', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'SSC Napoli': { shortName: 'Napoli', code: 'NAP', primaryColor: '#0080C8', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'AS Roma': { shortName: 'Roma', code: 'ROM', primaryColor: '#8E1F2F', secondaryColor: '#F0BC42', textColor: '#FFFFFF' },
  'SS Lazio': { shortName: 'Lazio', code: 'LAZ', primaryColor: '#87D8F7', secondaryColor: '#FFFFFF', textColor: '#000000' },
  'Atalanta BC': { shortName: 'Atalanta', code: 'ATA', primaryColor: '#1E71B8', secondaryColor: '#000000', textColor: '#FFFFFF' },

  // Bundesliga
  'FC Bayern München': { shortName: 'Bayern', code: 'BAY', primaryColor: '#DC052D', secondaryColor: '#0066B2', textColor: '#FFFFFF' },
  'Bayern Munich': { shortName: 'Bayern', code: 'BAY', primaryColor: '#DC052D', secondaryColor: '#0066B2', textColor: '#FFFFFF' },
  'Borussia Dortmund': { shortName: 'Dortmund', code: 'BVB', primaryColor: '#FDE100', secondaryColor: '#000000', textColor: '#000000' },
  'Bayer 04 Leverkusen': { shortName: 'Leverkusen', code: 'B04', primaryColor: '#E32221', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'RB Leipzig': { shortName: 'Leipzig', code: 'RBL', primaryColor: '#DD0742', secondaryColor: '#1C2C5B', textColor: '#FFFFFF' },
  'Eintracht Frankfurt': { shortName: 'Frankfurt', code: 'SGE', primaryColor: '#E1000F', secondaryColor: '#000000', textColor: '#FFFFFF' },

  // Ligue 1
  'Paris Saint-Germain': { shortName: 'PSG', code: 'PSG', primaryColor: '#004170', secondaryColor: '#DA291C', textColor: '#FFFFFF' },
  'Olympique de Marseille': { shortName: 'Marseille', code: 'OM', primaryColor: '#009BDD', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'AS Monaco': { shortName: 'Monaco', code: 'ASM', primaryColor: '#E30613', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Olympique Lyonnais': { shortName: 'Lyon', code: 'OL', primaryColor: '#122F67', secondaryColor: '#DA291C', textColor: '#FFFFFF' },
  'Lille OSC': { shortName: 'Lille', code: 'LOSC', primaryColor: '#E01E13', secondaryColor: '#1C2958', textColor: '#FFFFFF' },

  // Brasileirão Série A & Sul-Americana
  'Flamengo': { shortName: 'Flamengo', code: 'FLA', primaryColor: '#C4121B', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'CR Flamengo': { shortName: 'Flamengo', code: 'FLA', primaryColor: '#C4121B', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Palmeiras': { shortName: 'Palmeiras', code: 'PAL', primaryColor: '#006437', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'SE Palmeiras': { shortName: 'Palmeiras', code: 'PAL', primaryColor: '#006437', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Botafogo': { shortName: 'Botafogo', code: 'BOT', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Botafogo FR': { shortName: 'Botafogo', code: 'BOT', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Fortaleza': { shortName: 'Fortaleza', code: 'FOR', primaryColor: '#002B7F', secondaryColor: '#E20613', textColor: '#FFFFFF' },
  'Fortaleza EC': { shortName: 'Fortaleza', code: 'FOR', primaryColor: '#002B7F', secondaryColor: '#E20613', textColor: '#FFFFFF' },
  'Internacional': { shortName: 'Inter-RS', code: 'INT', primaryColor: '#E50914', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'SC Internacional': { shortName: 'Inter-RS', code: 'INT', primaryColor: '#E50914', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'São Paulo': { shortName: 'São Paulo', code: 'SAO', primaryColor: '#E50914', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'São Paulo FC': { shortName: 'São Paulo', code: 'SAO', primaryColor: '#E50914', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Corinthians': { shortName: 'Corinthians', code: 'COR', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'SC Corinthians Paulista': { shortName: 'Corinthians', code: 'COR', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Bahia': { shortName: 'Bahia', code: 'BAH', primaryColor: '#00529F', secondaryColor: '#EE1C25', textColor: '#FFFFFF' },
  'EC Bahia': { shortName: 'Bahia', code: 'BAH', primaryColor: '#00529F', secondaryColor: '#EE1C25', textColor: '#FFFFFF' },
  'Cruzeiro': { shortName: 'Cruzeiro', code: 'CRU', primaryColor: '#00529F', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Cruzeiro EC': { shortName: 'Cruzeiro', code: 'CRU', primaryColor: '#00529F', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Vasco da Gama': { shortName: 'Vasco', code: 'VAS', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'CR Vasco da Gama': { shortName: 'Vasco', code: 'VAS', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Atlético Mineiro': { shortName: 'Atlético-MG', code: 'CAM', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Clube Atlético Mineiro': { shortName: 'Atlético-MG', code: 'CAM', primaryColor: '#000000', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Fluminense': { shortName: 'Fluminense', code: 'FLU', primaryColor: '#7A1828', secondaryColor: '#006241', textColor: '#FFFFFF' },
  'Fluminense FC': { shortName: 'Fluminense', code: 'FLU', primaryColor: '#7A1828', secondaryColor: '#006241', textColor: '#FFFFFF' },
  'Grêmio': { shortName: 'Grêmio', code: 'GRE', primaryColor: '#0D80BF', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Grêmio FBPA': { shortName: 'Grêmio', code: 'GRE', primaryColor: '#0D80BF', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Juventude': { shortName: 'Juventude', code: 'JUV', primaryColor: '#00853F', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'EC Juventude': { shortName: 'Juventude', code: 'JUV', primaryColor: '#00853F', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Red Bull Bragantino': { shortName: 'Bragantino', code: 'RBB', primaryColor: '#D80027', secondaryColor: '#FFFFFF', textColor: '#FFFFFF' },
  'Athletico Paranaense': { shortName: 'Athletico-PR', code: 'CAP', primaryColor: '#C4121B', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Criciúma': { shortName: 'Criciúma', code: 'CRI', primaryColor: '#FFD700', secondaryColor: '#000000', textColor: '#000000' },
  'Criciúma EC': { shortName: 'Criciúma', code: 'CRI', primaryColor: '#FFD700', secondaryColor: '#000000', textColor: '#000000' },
  'Vitória': { shortName: 'Vitória', code: 'VIT', primaryColor: '#E50914', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'EC Vitória': { shortName: 'Vitória', code: 'VIT', primaryColor: '#E50914', secondaryColor: '#000000', textColor: '#FFFFFF' },
  'Cuiabá': { shortName: 'Cuiabá', code: 'CUI', primaryColor: '#006837', secondaryColor: '#FEE100', textColor: '#FFFFFF' },
  'Atlético Goianiense': { shortName: 'Atlético-GO', code: 'ACG', primaryColor: '#C4121B', secondaryColor: '#000000', textColor: '#FFFFFF' },
};

export function getTeamMeta(teamName: string): TeamMeta {
  if (!teamName) {
    return { shortName: 'Time', code: 'TIM', primaryColor: '#334155', secondaryColor: '#64748B', textColor: '#FFFFFF' };
  }

  // Exact match
  if (TEAM_MAP[teamName]) {
    return TEAM_MAP[teamName];
  }

  // Fuzzy match
  const cleanName = teamName.toLowerCase().trim();
  for (const [key, meta] of Object.entries(TEAM_MAP)) {
    if (cleanName.includes(key.toLowerCase()) || key.toLowerCase().includes(cleanName)) {
      return meta;
    }
  }

  // Fallback hash color & code generator
  let hash = 0;
  for (let i = 0; i < teamName.length; i++) {
    hash = teamName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash % 360);
  const primaryColor = `hsl(${h}, 65%, 45%)`;
  const secondaryColor = `hsl(${(h + 45) % 360}, 65%, 25%)`;

  const words = teamName.replace(/(FC|CF|SC|AC|SS|AS|BC|RB|&)/gi, '').trim().split(/\s+/);
  let code = 'TIM';
  if (words.length >= 2) {
    code = (words[0][0] + words[1][0] + (words[1][1] || 'X')).toUpperCase();
  } else if (words[0]?.length >= 3) {
    code = words[0].substring(0, 3).toUpperCase();
  }

  return {
    shortName: teamName.replace(/( FC| CF| SC| AC| SS| AS| BC)$/i, ''),
    code,
    primaryColor,
    secondaryColor,
    textColor: '#FFFFFF',
  };
}
