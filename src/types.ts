export type DataSource = 'fotmob' | 'openfootball' | 'sofascore';

export interface Score {
  ft?: [number, number];
  ht?: [number, number];
  et?: [number, number];
  p?: [number, number];
}

export interface Goal {
  name: string;
  minute?: number;
  score?: [number, number];
  team?: number;
  owngoal?: boolean;
  penalty?: boolean;
}

export interface Match {
  id?: string;
  round: string;
  date: string;
  team1: string;
  team2: string;
  team1Id?: number;
  team2Id?: number;
  score?: Score | null;
  time?: string;
  goals?: Goal[];
  status?: 'finished' | 'live' | 'scheduled' | 'postponed' | 'halftime';
  liveMinute?: string;
  stadium?: string;
  fotmobPageUrl?: string;
  fotmobId?: string;
  leagueName?: string;
  countryCcode?: string;
  isCup?: boolean;
}

export type CompetitionFilter = 'all' | 'league' | 'cup';
export type MandoFilter = 'all' | 'home' | 'away';
export type WindowFilter = 5 | 10;

export interface MatchFilters {
  competition: CompetitionFilter;
  mando: MandoFilter;
  window: WindowFilter;
}

export const DEFAULT_MATCH_FILTERS: MatchFilters = {
  competition: 'all',
  mando: 'all',
  window: 5,
};

export interface MatchItem {
  id: string;
  date: string;
  time?: string;
  homeTeam: string;
  homeId?: number;
  awayTeam: string;
  awayId?: number;
  homeScore?: number;
  awayScore?: number;
  competition: string;
  result?: 'V' | 'E' | 'D';
  isCup?: boolean;
  isHome?: boolean;
}

export interface SofascorePlayer {
  name: string;
  position: 'G' | 'LD' | 'LE' | 'Z' | 'V' | 'M' | 'A';
  rating: number;
  number: number;
  isMVP?: boolean;
}

export interface SofascoreEvent {
  minute: number;
  type: 'goal' | 'yellow' | 'red' | 'sub' | 'var';
  team: 'team1' | 'team2';
  player: string;
  detail?: string;
}

export interface SofascoreMatchDetails {
  matchId: string;
  tournament: string;
  venue?: string;
  referee?: string;
  status: string;
  possession: { team1: number; team2: number };
  expectedGoals: { team1: number; team2: number };
  shotsTotal: { team1: number; team2: number };
  shotsOnTarget: { team1: number; team2: number };
  shotsOffTarget: { team1: number; team2: number };
  blockedShots: { team1: number; team2: number };
  corners: { team1: number; team2: number };
  fouls: { team1: number; team2: number };
  yellowCards: { team1: number; team2: number };
  redCards: { team1: number; team2: number };
  bigChances: { team1: number; team2: number };
  passesAccuracy: { team1: number; team2: number };
  offsides: { team1: number; team2: number };
  team1Formation: string;
  team2Formation: string;
  lineupTeam1: SofascorePlayer[];
  lineupTeam2: SofascorePlayer[];
  events: SofascoreEvent[];
}

export interface LeagueData {
  name: string;
  matches: Match[];
  officialStandings?: StandingItem[];
}

export interface StandingItem {
  rank: number;
  team: string;
  teamId?: number;
  nextOpponent?: string;
  nextOpponentId?: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  home: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
  away: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
}

export interface FotMobLeagueItem {
  id: number;
  name: string;
  localizedName?: string;
  pageUrl: string;
  ccode?: string;
}

export interface FotMobCountry {
  ccode: string;
  name: string;
  localizedName: string;
  leagues: FotMobLeagueItem[];
}

export interface FotMobAllLeaguesData {
  popular: FotMobLeagueItem[];
  international: Array<{
    ccode: string;
    name: string;
    localizedName: string;
    leagues: FotMobLeagueItem[];
  }>;
  countries: FotMobCountry[];
}

export interface LeagueOption {
  id: string;
  name: string;
  country: string;
  flag: string;
  season: string;
  path?: string;
  githubUrl?: string;
  tier?: number;
  popular?: boolean;
  source?: DataSource;
  fotmobId?: number;
  fotmobSlug?: string;
  fotmobPageUrl?: string;
  countryCcode?: string;
  localizedName?: string;
}

export interface HeadToHeadStats {
  team1: string;
  team2: string;
  totalMatches: number;
  team1Wins: number;
  team2Wins: number;
  draws: number;
  team1Goals: number;
  team2Goals: number;
  avgGoals: number;
  bothTeamsScoredCount: number;
  over25Count: number;
  matches: Match[];
}

export interface AiMatchAnalysis {
  matchSummary: string;
  tacticalAnalysis: string;
  team1Strengths: string[];
  team2Strengths: string[];
  prediction: {
    winnerProbability: {
      team1: number;
      draw: number;
      team2: number;
    };
    predictedScore: string;
    expectedTotalGoals: string;
    confidenceLevel: 'Alta' | 'Média' | 'Equilibrada';
  };
  keyMatchFactors: string[];
}

export type BetStatus = 'Pendente' | 'Ganha' | 'Perdida' | 'Reembolsada' | 'Cancelada';
export type BetFormat = 'Simples' | 'Múltipla';
export type BetBookmaker = 'Betano' | 'Bet365';
export type BetLegStatus = 'green' | 'red' | 'pending' | 'void';

export interface BetLeg {
  id: string;
  matchTitle: string;
  team1?: string;
  team2?: string;
  status: BetLegStatus;
  note?: string;
}

export interface BetItem {
  id: string;
  date: string; // YYYY-MM-DD
  bookmaker: BetBookmaker;
  title: string;
  odd: number;
  sport: string;
  status: BetStatus;
  format: BetFormat;
  amount: number;
  potentialReturn: number;
  profit: number;
  legs?: BetLeg[];
  createdAt?: string;
}

export interface BankrollStats {
  totalBets: number;
  totalProfit: number;
  roi: number;
  progression: number;
  initialCapital: number;
}
