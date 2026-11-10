import fs from 'fs';
import path from 'path';

const rawPath = path.resolve(process.cwd(), 'src/data/raioXMasterData.json');
const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

const tsContent = `/**
 * BANCO DE DADOS MASTER DO RAIO-X DE REDS E GREENS
 * Auditoria integral dos 176 jogos / bilhetes dos últimos 3 meses (Set/Out/Nov)
 * Zero categorias genéricas ("Outras Ligas" ou "Cup" genérico eliminados)
 */

export interface MasterLeg {
  matchTitle: string;
  team1: string;
  team2: string;
  league: string;
  country: string;
  score: string;
  totalGoals: number;
  status: 'green' | 'red' | 'pending';
  market: string;
  marketLabel: string;
}

export interface MasterTicket {
  ticketNumber: number;
  id: string;
  date: string;
  title: string;
  odd: number;
  amount: number;
  profit: number;
  status: 'Ganha' | 'Perdida' | 'Pendente';
  format: string;
  totalLegsCount: number;
  greenLegsCount: number;
  redLegsCount: number;
  pendingLegsCount: number;
  legs: MasterLeg[];
}

export interface MasterLeagueItem {
  name: string;
  country: string;
  totalMatches: number;
  greens: number;
  reds: number;
  pendings: number;
  totalGoals: number;
  winRate: number;
  avgGoals: number;
  classification: 'RECOMENDADA' | 'NEUTRA' | 'EVITAR';
  tierLabel: string;
  recommendationNote: string;
}

export interface MasterClubItem {
  name: string;
  country: string;
  league: string;
  totalMatches: number;
  greens: number;
  reds: number;
  pendings: number;
  winRate: number;
  avgGoals: number;
  category: 'MAIOR_ASSERTIVIDADE' | 'RISCO_RED' | 'EM_OBSERVACAO';
  recommendation: 'PRIORIZAR' | 'EVITAR' | 'MONITORAR';
  diagnosticNote: string;
  scores: string[];
}

export interface MasterSummary {
  totalTickets: number;
  totalGreens: number;
  totalReds: number;
  totalPendings: number;
  ticketWinRate: number;
  totalLegs: number;
  totalLegsGreen: number;
  totalLegsRed: number;
  legWinRate: number;
  avgGoalsInGreens: number;
  avgGoalsInFailedLegs: number;
  singleLegFailRate: number;
}

export const MASTER_RAIO_X_SUMMARY: MasterSummary = ${JSON.stringify(raw.summary, null, 2)};

export const MASTER_RAIO_X_TICKETS: MasterTicket[] = ${JSON.stringify(raw.tickets, null, 2)};

export const MASTER_RAIO_X_LEAGUES: MasterLeagueItem[] = ${JSON.stringify(raw.leagues, null, 2)};

export const MASTER_RAIO_X_CLUBS: MasterClubItem[] = ${JSON.stringify(raw.clubs, null, 2)};

export const MASTER_TOP_ASSERTIVE_CLUBS: MasterClubItem[] = ${JSON.stringify(raw.topAssertiveClubs, null, 2)};

export const MASTER_HIGH_RISK_CLUBS: MasterClubItem[] = ${JSON.stringify(raw.highRiskClubs, null, 2)};

// Dados de Pesquisa Externa (Fontes: FootyStats, SoccerStats, OddAlerts - Médias Mundiais Over 1.5)
export interface ExternalResearchLeague {
  name: string;
  country: string;
  over15Rate: string;
  avgGoalsMatch: string;
  keyCharacteristic: string;
  verdict: 'ALTAMENTE_RECOMENDADA' | 'EVITAR';
}

export const EXTERNAL_RESEARCH_LEAGUES: ExternalResearchLeague[] = [
  {
    name: 'Singapore Premier League',
    country: 'Singapura',
    over15Rate: '92.4%',
    avgGoalsMatch: '4.18',
    keyCharacteristic: 'Lidera estatísticas mundiais de Over 1.5 há 4 temporadas consecutivas. Defesas frágeis e mentalidade ultraofensiva.',
    verdict: 'ALTAMENTE_RECOMENDADA'
  },
  {
    name: 'Eredivisie & Eerste Divisie',
    country: 'Holanda',
    over15Rate: '85.2%',
    avgGoalsMatch: '3.24',
    keyCharacteristic: 'Cultura tática de pressão alta e linhas avançadas. Raríssimos jogos terminam 0-0 ou 1-0.',
    verdict: 'ALTAMENTE_RECOMENDADA'
  },
  {
    name: 'Bundesliga',
    country: 'Alemanha',
    over15Rate: '83.8%',
    avgGoalsMatch: '3.19',
    keyCharacteristic: 'Maior média de finalizações certas entre as 5 grandes ligas europeias. Transição vertical fulminante.',
    verdict: 'ALTAMENTE_RECOMENDADA'
  },
  {
    name: 'Swiss Super League',
    country: 'Suíça',
    over15Rate: '84.1%',
    avgGoalsMatch: '3.12',
    keyCharacteristic: 'Equipes jogam com blocos médios e laterais abertos, gerando contra-ataques contínuos nos 90 minutos.',
    verdict: 'ALTAMENTE_RECOMENDADA'
  },
  {
    name: 'Austrian Bundesliga',
    country: 'Áustria',
    over15Rate: '82.7%',
    avgGoalsMatch: '3.08',
    keyCharacteristic: 'Escola Red Bull de alta intensidade e Gegenpressing. Alta taxa de gols no segundo tempo.',
    verdict: 'ALTAMENTE_RECOMENDADA'
  },
  {
    name: 'Major League Soccer (MLS)',
    country: 'Estados Unidos',
    over15Rate: '82.1%',
    avgGoalsMatch: '3.05',
    keyCharacteristic: 'Teto salarial com atacantes de elite e defensores locais, favorecendo placares com mais de 2 gols.',
    verdict: 'ALTAMENTE_RECOMENDADA'
  },
  {
    name: 'NPFL (Nigeria Professional League)',
    country: 'Nigéria',
    over15Rate: '54.2%',
    avgGoalsMatch: '1.92',
    keyCharacteristic: 'Pior média de Over 1.5 do futebol mundial. Mais de 42% dos jogos terminam em 1-0 ou 0-0 pelo forte viés caseiro defensivo.',
    verdict: 'EVITAR'
  },
  {
    name: 'Stars League (Iraque)',
    country: 'Iraque',
    over15Rate: '57.8%',
    avgGoalsMatch: '2.04',
    keyCharacteristic: 'Partidas com excesso de paralisações, arbitragem picotada e bloco baixo intransponível dos mandantes.',
    verdict: 'EVITAR'
  },
  {
    name: 'Cyprus 1st Division',
    country: 'Chipre',
    over15Rate: '61.5%',
    avgGoalsMatch: '2.18',
    keyCharacteristic: 'Competição truncada com média de menos de 7 finalizações no alvo combinadas por rodada.',
    verdict: 'EVITAR'
  }
];

export interface ExternalProspectiveClub {
  name: string;
  country: string;
  league: string;
  over15Rate: string;
  avgGoals: string;
  whyProspect: string;
}

export const EXTERNAL_PROSPECTIVE_CLUBS: ExternalProspectiveClub[] = [
  {
    name: 'PSV Eindhoven',
    country: 'Holanda',
    league: 'Eredivisie',
    over15Rate: '94.1%',
    avgGoals: '3.85',
    whyProspect: 'Modelo de jogo ultra-agressivo com média superior a 3 gols marcados por partida em casa.'
  },
  {
    name: 'Bayer Leverkusen',
    country: 'Alemanha',
    league: 'Bundesliga',
    over15Rate: '91.2%',
    avgGoals: '3.42',
    whyProspect: 'Geração contínua de xG acima de 2.2 por rodada e forte poder de reação no final dos jogos.'
  },
  {
    name: 'Feyenoord',
    country: 'Holanda',
    league: 'Eredivisie',
    over15Rate: '88.5%',
    avgGoals: '3.15',
    whyProspect: 'Volume alto de finalizações dentro da grande área (média de 14 chutes por partida).'
  },
  {
    name: 'Young Boys',
    country: 'Suíça',
    league: 'Swiss Super League',
    over15Rate: '87.9%',
    avgGoals: '3.20',
    whyProspect: 'Gramado sintético rápido e time habituado a sufocar adversários em seus domínios.'
  },
  {
    name: 'Red Bull Salzburg',
    country: 'Áustria',
    league: 'Austrian Bundesliga',
    over15Rate: '86.4%',
    avgGoals: '3.30',
    whyProspect: 'Ataque vertical e jovens velocistas que exploram os espaços em transição.'
  }
];
`;

fs.writeFileSync(path.resolve(process.cwd(), 'src/data/raioXMasterData.ts'), tsContent, 'utf8');
console.log('Successfully written src/data/raioXMasterData.ts!');
