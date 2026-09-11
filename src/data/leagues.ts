import { LeagueOption, LeagueData } from '../types';

export const LEAGUES_LIST: LeagueOption[] = [
  // 🔥 FotMob Live Scraped Leagues (Real-Time Opta Data)
  {
    id: 'fotmob-brazil-serie-a',
    name: 'Brasileirão Série A (2026)',
    country: 'Brasil',
    flag: '🇧🇷',
    season: '2026',
    path: 'leagues/268/overview/brasileirao-serie-a',
    githubUrl: 'https://www.fotmob.com/pt-BR/leagues/268/overview/brasileirao-serie-a',
    tier: 1,
    popular: true,
    source: 'fotmob',
    fotmobId: 268,
    fotmobSlug: 'brasileirao-serie-a',
  },
  {
    id: 'fotmob-premier-league',
    name: 'Premier League',
    country: 'Inglaterra',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    season: '2026/27',
    path: 'leagues/47/overview/premier-league',
    githubUrl: 'https://www.fotmob.com/pt-BR/leagues/47/overview/premier-league',
    tier: 1,
    popular: true,
    source: 'fotmob',
    fotmobId: 47,
    fotmobSlug: 'premier-league',
  },
  {
    id: 'fotmob-champions-league',
    name: 'UEFA Champions League',
    country: 'Europa',
    flag: '⭐',
    season: '2026/27',
    path: 'leagues/42/overview/champions-league',
    githubUrl: 'https://www.fotmob.com/pt-BR/leagues/42/overview/champions-league',
    tier: 1,
    popular: true,
    source: 'fotmob',
    fotmobId: 42,
    fotmobSlug: 'champions-league',
  },
  {
    id: 'fotmob-la-liga',
    name: 'La Liga EA Sports',
    country: 'Espanha',
    flag: '🇪🇸',
    season: '2026/27',
    path: 'leagues/87/overview/laliga',
    githubUrl: 'https://www.fotmob.com/pt-BR/leagues/87/overview/laliga',
    tier: 1,
    popular: true,
    source: 'fotmob',
    fotmobId: 87,
    fotmobSlug: 'laliga',
  },
  {
    id: 'fotmob-serie-a',
    name: 'Serie A Enilive',
    country: 'Itália',
    flag: '🇮🇹',
    season: '2026/27',
    path: 'leagues/55/overview/serie-a',
    githubUrl: 'https://www.fotmob.com/pt-BR/leagues/55/overview/serie-a',
    tier: 1,
    popular: true,
    source: 'fotmob',
    fotmobId: 55,
    fotmobSlug: 'serie-a',
  },
  {
    id: 'fotmob-bundesliga',
    name: 'Bundesliga',
    country: 'Alemanha',
    flag: '🇩🇪',
    season: '2026/27',
    path: 'leagues/54/overview/bundesliga',
    githubUrl: 'https://www.fotmob.com/pt-BR/leagues/54/overview/bundesliga',
    tier: 1,
    popular: true,
    source: 'fotmob',
    fotmobId: 54,
    fotmobSlug: 'bundesliga',
  },
  {
    id: 'fotmob-ligue-1',
    name: 'Ligue 1 McDonald’s',
    country: 'França',
    flag: '🇫🇷',
    season: '2026/27',
    path: 'leagues/53/overview/ligue-1',
    githubUrl: 'https://www.fotmob.com/pt-BR/leagues/53/overview/ligue-1',
    tier: 1,
    popular: true,
    source: 'fotmob',
    fotmobId: 53,
    fotmobSlug: 'ligue-1',
  },
];

// Fallback seed data if offline or fetching initial screen
export const PREMIER_LEAGUE_FALLBACK: LeagueData = {
  name: 'Premier League 2024/25',
  matches: [
    {
      round: '1. Matchday',
      date: '2024-08-16',
      team1: 'Manchester United',
      team2: 'Fulham FC',
      score: { ft: [1, 0], ht: [0, 0] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-17',
      team1: 'Ipswich Town',
      team2: 'Liverpool FC',
      score: { ft: [0, 2], ht: [0, 0] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-17',
      team1: 'Arsenal FC',
      team2: 'Wolverhampton Wanderers',
      score: { ft: [2, 0], ht: [1, 0] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-17',
      team1: 'Everton FC',
      team2: 'Brighton & Hove Albion',
      score: { ft: [0, 3], ht: [0, 1] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-17',
      team1: 'Newcastle United',
      team2: 'Southampton FC',
      score: { ft: [1, 0], ht: [1, 0] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-17',
      team1: 'Nottingham Forest',
      team2: 'AFC Bournemouth',
      score: { ft: [1, 1], ht: [1, 0] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-17',
      team1: 'West Ham United',
      team2: 'Aston Villa',
      score: { ft: [1, 2], ht: [1, 1] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-18',
      team1: 'Brentford FC',
      team2: 'Crystal Palace',
      score: { ft: [2, 1], ht: [1, 0] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-18',
      team1: 'Chelsea FC',
      team2: 'Manchester City',
      score: { ft: [0, 2], ht: [0, 1] }
    },
    {
      round: '1. Matchday',
      date: '2024-08-19',
      team1: 'Leicester City',
      team2: 'Tottenham Hotspur',
      score: { ft: [1, 1], ht: [0, 1] }
    },
    // Matchday 2
    {
      round: '2. Matchday',
      date: '2024-08-24',
      team1: 'Brighton & Hove Albion',
      team2: 'Manchester United',
      score: { ft: [2, 1], ht: [1, 0] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-24',
      team1: 'Crystal Palace',
      team2: 'West Ham United',
      score: { ft: [0, 2], ht: [0, 0] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-24',
      team1: 'Fulham FC',
      team2: 'Leicester City',
      score: { ft: [2, 1], ht: [1, 1] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-24',
      team1: 'Manchester City',
      team2: 'Ipswich Town',
      score: { ft: [4, 1], ht: [3, 1] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-24',
      team1: 'Southampton FC',
      team2: 'Nottingham Forest',
      score: { ft: [0, 1], ht: [0, 0] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-24',
      team1: 'Tottenham Hotspur',
      team2: 'Everton FC',
      score: { ft: [4, 0], ht: [2, 0] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-24',
      team1: 'Aston Villa',
      team2: 'Arsenal FC',
      score: { ft: [0, 2], ht: [0, 0] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-25',
      team1: 'AFC Bournemouth',
      team2: 'Newcastle United',
      score: { ft: [1, 1], ht: [1, 0] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-25',
      team1: 'Wolverhampton Wanderers',
      team2: 'Chelsea FC',
      score: { ft: [2, 6], ht: [2, 2] }
    },
    {
      round: '2. Matchday',
      date: '2024-08-25',
      team1: 'Liverpool FC',
      team2: 'Brentford FC',
      score: { ft: [2, 0], ht: [1, 0] }
    },
    // Matchday 3
    {
      round: '3. Matchday',
      date: '2024-08-31',
      team1: 'Arsenal FC',
      team2: 'Brighton & Hove Albion',
      score: { ft: [1, 1], ht: [1, 0] }
    },
    {
      round: '3. Matchday',
      date: '2024-08-31',
      team1: 'Brentford FC',
      team2: 'Southampton FC',
      score: { ft: [3, 1], ht: [1, 0] }
    },
    {
      round: '3. Matchday',
      date: '2024-08-31',
      team1: 'Everton FC',
      team2: 'AFC Bournemouth',
      score: { ft: [2, 3], ht: [0, 0] }
    },
    {
      round: '3. Matchday',
      date: '2024-08-31',
      team1: 'Ipswich Town',
      team2: 'Fulham FC',
      score: { ft: [1, 1], ht: [1, 1] }
    },
    {
      round: '3. Matchday',
      date: '2024-08-31',
      team1: 'Leicester City',
      team2: 'Aston Villa',
      score: { ft: [1, 2], ht: [0, 1] }
    },
    {
      round: '3. Matchday',
      date: '2024-08-31',
      team1: 'Nottingham Forest',
      team2: 'Wolverhampton Wanderers',
      score: { ft: [1, 1], ht: [1, 1] }
    },
    {
      round: '3. Matchday',
      date: '2024-08-31',
      team1: 'West Ham United',
      team2: 'Manchester City',
      score: { ft: [1, 3], ht: [1, 2] }
    },
    {
      round: '3. Matchday',
      date: '2024-09-01',
      team1: 'Chelsea FC',
      team2: 'Crystal Palace',
      score: { ft: [1, 1], ht: [1, 0] }
    },
    {
      round: '3. Matchday',
      date: '2024-09-01',
      team1: 'Newcastle United',
      team2: 'Tottenham Hotspur',
      score: { ft: [2, 1], ht: [1, 0] }
    },
    {
      round: '3. Matchday',
      date: '2024-09-01',
      team1: 'Manchester United',
      team2: 'Liverpool FC',
      score: { ft: [0, 3], ht: [0, 2] }
    },
    // Matchday 4
    {
      round: '4. Matchday',
      date: '2024-09-14',
      team1: 'Southampton FC',
      team2: 'Manchester United',
      score: { ft: [0, 3], ht: [0, 2] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-14',
      team1: 'Brighton & Hove Albion',
      team2: 'Ipswich Town',
      score: { ft: [0, 0], ht: [0, 0] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-14',
      team1: 'Crystal Palace',
      team2: 'Leicester City',
      score: { ft: [2, 2], ht: [0, 1] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-14',
      team1: 'Fulham FC',
      team2: 'West Ham United',
      score: { ft: [1, 1], ht: [1, 0] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-14',
      team1: 'Liverpool FC',
      team2: 'Nottingham Forest',
      score: { ft: [0, 1], ht: [0, 0] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-14',
      team1: 'Manchester City',
      team2: 'Brentford FC',
      score: { ft: [2, 1], ht: [2, 1] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-14',
      team1: 'Aston Villa',
      team2: 'Everton FC',
      score: { ft: [3, 2], ht: [1, 2] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-14',
      team1: 'AFC Bournemouth',
      team2: 'Chelsea FC',
      score: { ft: [0, 1], ht: [0, 0] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-15',
      team1: 'Tottenham Hotspur',
      team2: 'Arsenal FC',
      score: { ft: [0, 1], ht: [0, 0] }
    },
    {
      round: '4. Matchday',
      date: '2024-09-15',
      team1: 'Wolverhampton Wanderers',
      team2: 'Newcastle United',
      score: { ft: [1, 2], ht: [1, 0] }
    },
    // Matchday 5
    {
      round: '5. Matchday',
      date: '2024-09-21',
      team1: 'West Ham United',
      team2: 'Chelsea FC',
      score: { ft: [0, 3], ht: [0, 2] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-21',
      team1: 'Aston Villa',
      team2: 'Wolverhampton Wanderers',
      score: { ft: [3, 1], ht: [0, 1] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-21',
      team1: 'Fulham FC',
      team2: 'Newcastle United',
      score: { ft: [3, 1], ht: [2, 0] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-21',
      team1: 'Leicester City',
      team2: 'Everton FC',
      score: { ft: [1, 1], ht: [0, 1] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-21',
      team1: 'Liverpool FC',
      team2: 'AFC Bournemouth',
      score: { ft: [3, 0], ht: [3, 0] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-21',
      team1: 'Southampton FC',
      team2: 'Ipswich Town',
      score: { ft: [1, 1], ht: [1, 0] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-21',
      team1: 'Tottenham Hotspur',
      team2: 'Brentford FC',
      score: { ft: [3, 1], ht: [2, 1] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-21',
      team1: 'Crystal Palace',
      team2: 'Manchester United',
      score: { ft: [0, 0], ht: [0, 0] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-22',
      team1: 'Brighton & Hove Albion',
      team2: 'Nottingham Forest',
      score: { ft: [2, 2], ht: [2, 1] }
    },
    {
      round: '5. Matchday',
      date: '2024-09-22',
      team1: 'Manchester City',
      team2: 'Arsenal FC',
      score: { ft: [2, 2], ht: [1, 2] }
    },
    // Upcoming matches examples
    {
      round: '6. Matchday',
      date: '2024-09-28',
      time: '12:30',
      team1: 'Newcastle United',
      team2: 'Manchester City',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-28',
      time: '15:00',
      team1: 'Arsenal FC',
      team2: 'Leicester City',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-28',
      time: '15:00',
      team1: 'Brentford FC',
      team2: 'West Ham United',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-28',
      time: '15:00',
      team1: 'Chelsea FC',
      team2: 'Brighton & Hove Albion',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-28',
      time: '15:00',
      team1: 'Everton FC',
      team2: 'Crystal Palace',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-28',
      time: '15:00',
      team1: 'Nottingham Forest',
      team2: 'Fulham FC',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-28',
      time: '17:30',
      team1: 'Wolverhampton Wanderers',
      team2: 'Liverpool FC',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-29',
      time: '14:00',
      team1: 'Ipswich Town',
      team2: 'Aston Villa',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-29',
      time: '16:30',
      team1: 'Manchester United',
      team2: 'Tottenham Hotspur',
      score: null
    },
    {
      round: '6. Matchday',
      date: '2024-09-30',
      time: '20:00',
      team1: 'AFC Bournemouth',
      team2: 'Southampton FC',
      score: null
    }
  ]
};
