/**
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

export const MASTER_RAIO_X_SUMMARY: MasterSummary = {
  "totalTickets": 177,
  "totalGreens": 86,
  "totalReds": 76,
  "totalPendings": 15,
  "ticketWinRate": 53.1,
  "totalLegs": 513,
  "totalLegsGreen": 383,
  "totalLegsRed": 95,
  "legWinRate": 80.1,
  "avgGoalsInGreens": 3.76,
  "avgGoalsInFailedLegs": 0.65,
  "singleLegFailRate": 75
};

export const MASTER_RAIO_X_TICKETS: MasterTicket[] = [
  {
    "ticketNumber": 1,
    "id": "bet-1794070693848-tddyi8y2h",
    "date": "2026-11-07",
    "title": "Carrick Rangers x Glentoran + FK Struga x KF Shkendija + Queens Park Rangers x Lincoln City",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Carrick Rangers x Glentoran",
        "team1": "Carrick Rangers",
        "team2": "Glentoran",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FK Struga x KF Shkendija",
        "team1": "FK Struga",
        "team2": "KF Shkendija",
        "league": "Prva Liga (Macedônia do Norte)",
        "country": "Macedônia do Norte",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Queens Park Rangers x Lincoln City",
        "team1": "Queens Park Rangers",
        "team2": "Lincoln City",
        "league": "EFL Championship",
        "country": "Inglaterra",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 2,
    "id": "bet-1793837193635-46p4jv3hq",
    "date": "2026-11-04",
    "title": "Borussia Dortmund x Real Betis + PSV Eindhoven x Club Brugge + Rennes x Olympiacos",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Borussia Dortmund x Real Betis",
        "team1": "Borussia Dortmund",
        "team2": "Real Betis",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "PSV Eindhoven x Club Brugge",
        "team1": "PSV Eindhoven",
        "team2": "Club Brugge",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Rennes x Olympiacos",
        "team1": "Rennes",
        "team2": "Olympiacos",
        "league": "UEFA Europa League",
        "country": "Europa",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 3,
    "id": "bet-1793837219933-m0bgoek8u",
    "date": "2026-11-04",
    "title": "Enugu Rangers x Bendel Insurance + Firpo x Alianza FC + Flamengo x Grêmio",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Enugu Rangers x Bendel Insurance",
        "team1": "Enugu Rangers",
        "team2": "Bendel Insurance",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Firpo x Alianza FC",
        "team1": "Firpo",
        "team2": "Alianza FC",
        "league": "Primera División (El Salvador)",
        "country": "El Salvador",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Flamengo x Grêmio",
        "team1": "Flamengo",
        "team2": "Grêmio",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 4,
    "id": "bet-1793835377845-3e13efiux",
    "date": "2026-11-04",
    "title": "Rennes x Olympiacos + Enugu Rangers x Bendel Insurance + Escorpiones x LD Alajuelense + Flamengo x Grêmio",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 4,
    "greenLegsCount": 2,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Rennes x Olympiacos",
        "team1": "Rennes",
        "team2": "Olympiacos",
        "league": "UEFA Europa League",
        "country": "Europa",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Enugu Rangers x Bendel Insurance",
        "team1": "Enugu Rangers",
        "team2": "Bendel Insurance",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Escorpiones x LD Alajuelense",
        "team1": "Escorpiones",
        "team2": "LD Alajuelense",
        "league": "Ligue 1",
        "country": "França",
        "score": "1-4",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Flamengo x Grêmio",
        "team1": "Flamengo",
        "team2": "Grêmio",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 5,
    "id": "bet-1793526904528-xndr45nsa",
    "date": "2026-11-01",
    "title": "Rivers United FC x Enugu Rangers + Lokomotiv Moscow x Spartak Moscow + Atletico Balboa x Alianza FC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Rivers United FC x Enugu Rangers",
        "team1": "Rivers United FC",
        "team2": "Enugu Rangers",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lokomotiv Moscow x Spartak Moscow",
        "team1": "Lokomotiv Moscow",
        "team2": "Spartak Moscow",
        "league": "Russian Premier League",
        "country": "Internacional",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Atletico Balboa x Alianza FC",
        "team1": "Atletico Balboa",
        "team2": "Alianza FC",
        "league": "Primera División (El Salvador)",
        "country": "El Salvador",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 6,
    "id": "bet-1793526929670-e3ej8r7ps",
    "date": "2026-11-01",
    "title": "FK Bregalnica Štip x KF Shkendija + Lugano x Basel + Palmeiras x Vasco da Gama",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FK Bregalnica Štip x KF Shkendija",
        "team1": "FK Bregalnica Štip",
        "team2": "KF Shkendija",
        "league": "Prva Liga (Macedônia do Norte)",
        "country": "Macedônia do Norte",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lugano x Basel",
        "team1": "Lugano",
        "team2": "Basel",
        "league": "Swiss Super League",
        "country": "Suíça",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Palmeiras x Vasco da Gama",
        "team1": "Palmeiras",
        "team2": "Vasco da Gama",
        "league": "Copa do Brasil",
        "country": "Brasil",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 7,
    "id": "bet-1793445642871-s7ac35y9v",
    "date": "2026-10-31",
    "title": "FK Qabala x Qarabağ FK + Željezničar x Zrinjski Mostar + Zhetysu Taldykorgan x FC Astana",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FK Qabala x Qarabağ FK",
        "team1": "FK Qabala",
        "team2": "Qarabağ FK",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Željezničar x Zrinjski Mostar",
        "team1": "Željezničar",
        "team2": "Zrinjski Mostar",
        "league": "Premijer Liga (Bósnia)",
        "country": "Bósnia e Herzegovina",
        "score": "0-4",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Zhetysu Taldykorgan x FC Astana",
        "team1": "Zhetysu Taldykorgan",
        "team2": "FC Astana",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 8,
    "id": "bet-1793445665380-u3vwbdbfm",
    "date": "2026-10-31",
    "title": "Deportivo Morón x Ciudad de Bolívar + Atletico Madrid C x CF Talavera de la Reina + Monterrey x Tijuana",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Deportivo Morón x Ciudad de Bolívar",
        "team1": "Deportivo Morón",
        "team2": "Ciudad de Bolívar",
        "league": "Primera Nacional (Argentina)",
        "country": "Argentina",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Atletico Madrid C x CF Talavera de la Reina",
        "team1": "Atletico Madrid C",
        "team2": "CF Talavera de la Reina",
        "league": "La Liga",
        "country": "Espanha",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Monterrey x Tijuana",
        "team1": "Monterrey",
        "team2": "Tijuana",
        "league": "Liga MX",
        "country": "México",
        "score": "3-3",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 9,
    "id": "bet-1793445537299-aasyfqk28",
    "date": "2026-10-31",
    "title": "Levante x Atlético Madrid + Hegelmann x FK Kauno Žalgiris + Wydad Casablanca x MAT Tetouan",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Levante x Atlético Madrid",
        "team1": "Levante",
        "team2": "Atlético Madrid",
        "league": "La Liga",
        "country": "Espanha",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Hegelmann x FK Kauno Žalgiris",
        "team1": "Hegelmann",
        "team2": "FK Kauno Žalgiris",
        "league": "A Lyga (Lituânia)",
        "country": "Lituânia",
        "score": "1-4",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Wydad Casablanca x MAT Tetouan",
        "team1": "Wydad Casablanca",
        "team2": "MAT Tetouan",
        "league": "Botola Pro",
        "country": "Marrocos",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 10,
    "id": "bet-1793379652093-8tj0h1utm",
    "date": "2026-10-30",
    "title": "Xorazm x Pakhtakor Tashkent + Ha Nội FC x Ninh Bình Club",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 1,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Xorazm x Pakhtakor Tashkent",
        "team1": "Xorazm",
        "team2": "Pakhtakor Tashkent",
        "league": "Superliga (Uzbequistão)",
        "country": "Uzbequistão",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Ha Nội FC x Ninh Bình Club",
        "team1": "Ha Nội FC",
        "team2": "Ninh Bình Club",
        "league": "V-League 1",
        "country": "Vietnã",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 11,
    "id": "bet-1793155381425-caadac7nk",
    "date": "2026-10-28",
    "title": "Elbasani x Partizani + Azam FC x Mbeya City + Once Caldas x Alianza FC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Elbasani x Partizani",
        "team1": "Elbasani",
        "team2": "Partizani",
        "league": "Kategoria Superiore",
        "country": "Albânia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Azam FC x Mbeya City",
        "team1": "Azam FC",
        "team2": "Mbeya City",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "4-0",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Once Caldas x Alianza FC",
        "team1": "Once Caldas",
        "team2": "Alianza FC",
        "league": "Primera A (Liga BetPlay)",
        "country": "Colômbia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 12,
    "id": "bet-1793155565920-4n1jbt54d",
    "date": "2026-10-28",
    "title": "Bayer Leverkusen x 1. FC Nürnberg + Polonia Środa x Śląsk Wrocław ll + FC Porto x Académico Viseu",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Bayer Leverkusen x 1. FC Nürnberg",
        "team1": "Bayer Leverkusen",
        "team2": "1. FC Nürnberg",
        "league": "Bundesliga",
        "country": "Alemanha",
        "score": "5-2",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Polonia Środa x Śląsk Wrocław ll",
        "team1": "Polonia Środa",
        "team2": "Śląsk Wrocław ll",
        "league": "Copa da Polônia (Puchar Polski)",
        "country": "Polônia",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Porto x Académico Viseu",
        "team1": "FC Porto",
        "team2": "Académico Viseu",
        "league": "Taça da Liga",
        "country": "Portugal",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 13,
    "id": "bet-1793155488591-iayu9xt66",
    "date": "2026-10-28",
    "title": "FK Arsenal Tivat x FK Bokelj + Kashima Antlers x Pohang Steelers + Sporting BM x Arsenal",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 1,
    "pendingLegsCount": 1,
    "legs": [
      {
        "matchTitle": "FK Arsenal Tivat x FK Bokelj",
        "team1": "FK Arsenal Tivat",
        "team2": "FK Bokelj",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Kashima Antlers x Pohang Steelers",
        "team1": "Kashima Antlers",
        "team2": "Pohang Steelers",
        "league": "AFC Champions League Elite (Leste)",
        "country": "Ásia",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sporting BM x Arsenal",
        "team1": "Sporting BM",
        "team2": "Arsenal",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 14,
    "id": "bet-1793155612995-k7hk21xkw",
    "date": "2026-10-28",
    "title": "Al-Arabi x Al Fahaheel + Spartak Moscow x Rubin Kazan + Internacional de Bogotá x Independiente Medellín",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Al-Arabi x Al Fahaheel",
        "team1": "Al-Arabi",
        "team2": "Al Fahaheel",
        "league": "Kuwait Premier League",
        "country": "Kuwait",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Spartak Moscow x Rubin Kazan",
        "team1": "Spartak Moscow",
        "team2": "Rubin Kazan",
        "league": "Copa da Rússia",
        "country": "Rússia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Internacional de Bogotá x Independiente Medellín",
        "team1": "Internacional de Bogotá",
        "team2": "Independiente Medellín",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 15,
    "id": "bet-1793066146885-7um064fgp",
    "date": "2026-10-27",
    "title": "Daejeon Hana Citizen x Vissel Kobe + Al-Shamal x Al Hilal + Alianza FC x CD Marathón",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Daejeon Hana Citizen x Vissel Kobe",
        "team1": "Daejeon Hana Citizen",
        "team2": "Vissel Kobe",
        "league": "AFC Champions League Elite (Leste)",
        "country": "Ásia",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Shamal x Al Hilal",
        "team1": "Al-Shamal",
        "team2": "Al Hilal",
        "league": "AFC Champions League Elite (Oeste)",
        "country": "Ásia",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Alianza FC x CD Marathón",
        "team1": "Alianza FC",
        "team2": "CD Marathón",
        "league": "Primera División (El Salvador)",
        "country": "El Salvador",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 16,
    "id": "bet-1792976486506-ir2lh5prt",
    "date": "2026-10-26",
    "title": "Al Quwa Al Jawiya x Pakhtakor Tashkent + Nea Salamis x Pafos FC + Shinnik Yaroslavl x Spartak Kostroma",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Al Quwa Al Jawiya x Pakhtakor Tashkent",
        "team1": "Al Quwa Al Jawiya",
        "team2": "Pakhtakor Tashkent",
        "league": "AFC Champions League Elite (Oeste)",
        "country": "Ásia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Nea Salamis x Pafos FC",
        "team1": "Nea Salamis",
        "team2": "Pafos FC",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shinnik Yaroslavl x Spartak Kostroma",
        "team1": "Shinnik Yaroslavl",
        "team2": "Spartak Kostroma",
        "league": "First League",
        "country": "Internacional",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 17,
    "id": "bet-1792976500641-qqa8mch4i",
    "date": "2026-10-26",
    "title": "NK Istra 1961 x Hajduk Split + Galatasaray x Fenerbahçe + Mohun Bagan SG x Chennaiyin FC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "NK Istra 1961 x Hajduk Split",
        "team1": "NK Istra 1961",
        "team2": "Hajduk Split",
        "league": "HNL (1. HNL)",
        "country": "Croácia",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Galatasaray x Fenerbahçe",
        "team1": "Galatasaray",
        "team2": "Fenerbahçe",
        "league": "Süper Lig (Turquia)",
        "country": "Turquia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Mohun Bagan SG x Chennaiyin FC",
        "team1": "Mohun Bagan SG",
        "team2": "Chennaiyin FC",
        "league": "Indian Super League",
        "country": "Índia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 18,
    "id": "bet-1792939645188-sd1q40fw1",
    "date": "2026-10-25",
    "title": "CFR Cluj x Dinamo București + FC Midtjylland x Lyngby + Da Nẵng x Ha Nội FC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "CFR Cluj x Dinamo București",
        "team1": "CFR Cluj",
        "team2": "Dinamo București",
        "league": "SuperLiga (Romênia)",
        "country": "Romênia",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Midtjylland x Lyngby",
        "team1": "FC Midtjylland",
        "team2": "Lyngby",
        "league": "Superligaen",
        "country": "Dinamarca",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Da Nẵng x Ha Nội FC",
        "team1": "Da Nẵng",
        "team2": "Ha Nội FC",
        "league": "V-League 1",
        "country": "Vietnã",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 19,
    "id": "bet-1792939602962-3sgkhs1hw",
    "date": "2026-10-25",
    "title": "Sabah FK x Qarabağ FK + B36 Tórshavn x Klaksvik + NSÍ Runavík x HB Tórshavn",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Sabah FK x Qarabağ FK",
        "team1": "Sabah FK",
        "team2": "Qarabağ FK",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "B36 Tórshavn x Klaksvik",
        "team1": "B36 Tórshavn",
        "team2": "Klaksvik",
        "league": "Betri deildin (Primeira Liga)",
        "country": "Ilhas Faroe",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "NSÍ Runavík x HB Tórshavn",
        "team1": "NSÍ Runavík",
        "team2": "HB Tórshavn",
        "league": "Betri deildin (Primeira Liga)",
        "country": "Ilhas Faroe",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 20,
    "id": "bet-1792939632693-l1q10bxzr",
    "date": "2026-10-25",
    "title": "Motherwell x Heart of Midlothian + Ghaz Al-Shamal SC x Naft Maysan + Olympiacos x Kalamata",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Motherwell x Heart of Midlothian",
        "team1": "Motherwell",
        "team2": "Heart of Midlothian",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Ghaz Al-Shamal SC x Naft Maysan",
        "team1": "Ghaz Al-Shamal SC",
        "team2": "Naft Maysan",
        "league": "Iraq Stars League",
        "country": "Iraque",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Olympiacos x Kalamata",
        "team1": "Olympiacos",
        "team2": "Kalamata",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "5-0",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 21,
    "id": "bet-1792939691672-w4ofvydbz",
    "date": "2026-10-25",
    "title": "CF América x Pachuca + Independiente x Boca Juniors + Cavalry FC x Vancouver FC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "CF América x Pachuca",
        "team1": "CF América",
        "team2": "Pachuca",
        "league": "Liga MX",
        "country": "México",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Independiente x Boca Juniors",
        "team1": "Independiente",
        "team2": "Boca Juniors",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cavalry FC x Vancouver FC",
        "team1": "Cavalry FC",
        "team2": "Vancouver FC",
        "league": "Canadian Premier League",
        "country": "Canadá",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 22,
    "id": "bet-1792939619395-k5j5dmkwr",
    "date": "2026-10-25",
    "title": "Víkingur x EB/Streymur + Bibiani Gold Stars x Heart of Lions + Aktobe x Kairat Almaty",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Víkingur x EB/Streymur",
        "team1": "Víkingur",
        "team2": "EB/Streymur",
        "league": "Betri deildin (Primeira Liga)",
        "country": "Ilhas Faroe",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Bibiani Gold Stars x Heart of Lions",
        "team1": "Bibiani Gold Stars",
        "team2": "Heart of Lions",
        "league": "Ghana Premier League",
        "country": "Gana",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Aktobe x Kairat Almaty",
        "team1": "Aktobe",
        "team2": "Kairat Almaty",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 23,
    "id": "bet-1792848056656-ylo3m85qk",
    "date": "2026-10-24",
    "title": "Ghaz Al-Shamal SC x Naft Maysan + AEK Athens x Panetolikos + Chengdu Rongcheng FC x Dalian Yingbo",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Ghaz Al-Shamal SC x Naft Maysan",
        "team1": "Ghaz Al-Shamal SC",
        "team2": "Naft Maysan",
        "league": "Iraq Stars League",
        "country": "Iraque",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "AEK Athens x Panetolikos",
        "team1": "AEK Athens",
        "team2": "Panetolikos",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "5-0",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Chengdu Rongcheng FC x Dalian Yingbo",
        "team1": "Chengdu Rongcheng FC",
        "team2": "Dalian Yingbo",
        "league": "Chinese Super League",
        "country": "China",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 24,
    "id": "bet-1792847974229-xuzv0h9ng",
    "date": "2026-10-24",
    "title": "Real España x Platense FC + Gil Vicente x FC Porto + Shakhtar Donetsk x Zorya",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Real España x Platense FC",
        "team1": "Real España",
        "team2": "Platense FC",
        "league": "Liga Nacional (Honduras)",
        "country": "Honduras",
        "score": "4-3",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Gil Vicente x FC Porto",
        "team1": "Gil Vicente",
        "team2": "FC Porto",
        "league": "Liga Portugal",
        "country": "Portugal",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shakhtar Donetsk x Zorya",
        "team1": "Shakhtar Donetsk",
        "team2": "Zorya",
        "league": "Premier League (UKR)",
        "country": "Internacional",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 25,
    "id": "bet-1792847934199-xuajeitax",
    "date": "2026-10-24",
    "title": "Slovan Bratislava x Dukla Banská Bystrica + Zamalek SC x APR FC + Bodø/Glimt x Vålerenga",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Slovan Bratislava x Dukla Banská Bystrica",
        "team1": "Slovan Bratislava",
        "team2": "Dukla Banská Bystrica",
        "league": "Niké Liga",
        "country": "Eslováquia",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Zamalek SC x APR FC",
        "team1": "Zamalek SC",
        "team2": "APR FC",
        "league": "CAF Champions League",
        "country": "África",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Bodø/Glimt x Vålerenga",
        "team1": "Bodø/Glimt",
        "team2": "Vålerenga",
        "league": "Eliteserien",
        "country": "Noruega",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 26,
    "id": "bet-1792847947770-9fbbuv52d",
    "date": "2026-10-24",
    "title": "Kashima Antlers x Kashiwa Reysol + Vissel Kobe x Machida Zelvia + Teuta Durrës x Elbasani",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Kashima Antlers x Kashiwa Reysol",
        "team1": "Kashima Antlers",
        "team2": "Kashiwa Reysol",
        "league": "J1 League",
        "country": "Japão",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Vissel Kobe x Machida Zelvia",
        "team1": "Vissel Kobe",
        "team2": "Machida Zelvia",
        "league": "J1 League",
        "country": "Japão",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Teuta Durrës x Elbasani",
        "team1": "Teuta Durrës",
        "team2": "Elbasani",
        "league": "Kategoria Superiore",
        "country": "Albânia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 27,
    "id": "bet-1792848118660-mwseldf3z",
    "date": "2026-10-24",
    "title": "Nacional x Sportivo Trinidense + Hapoel Jerusalem FC x Hapoel Tel Aviv + Maccabi Tel Aviv x Hapoel Haifa",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Nacional x Sportivo Trinidense",
        "team1": "Nacional",
        "team2": "Sportivo Trinidense",
        "league": "División de Honor (Paraguai)",
        "country": "Paraguai",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Hapoel Jerusalem FC x Hapoel Tel Aviv",
        "team1": "Hapoel Jerusalem FC",
        "team2": "Hapoel Tel Aviv",
        "league": "Ligat ha'Al (Premier League)",
        "country": "Israel",
        "score": "0-3",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Maccabi Tel Aviv x Hapoel Haifa",
        "team1": "Maccabi Tel Aviv",
        "team2": "Hapoel Haifa",
        "league": "Ligat ha'Al (Premier League)",
        "country": "Israel",
        "score": "6-2",
        "totalGoals": 8,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 28,
    "id": "bet-1792762847346-uqr10os36",
    "date": "2026-10-23",
    "title": "FC Järfälla x Hammarby TFF + Galway United FC x St. Patrick's Athletic + Shamrock Rovers x Sligo Rovers",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC Järfälla x Hammarby TFF",
        "team1": "FC Järfälla",
        "team2": "Hammarby TFF",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Galway United FC x St. Patrick's Athletic",
        "team1": "Galway United FC",
        "team2": "St. Patrick's Athletic",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shamrock Rovers x Sligo Rovers",
        "team1": "Shamrock Rovers",
        "team2": "Sligo Rovers",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "4-0",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 29,
    "id": "bet-1792762875320-cqz4ndwkf",
    "date": "2026-10-23",
    "title": "Zira x Sumqayıt + Libertad x Luqueño + Necaxa x FC Juárez",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Zira x Sumqayıt",
        "team1": "Zira",
        "team2": "Sumqayıt",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Libertad x Luqueño",
        "team1": "Libertad",
        "team2": "Luqueño",
        "league": "División de Honor (Paraguai)",
        "country": "Paraguai",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Necaxa x FC Juárez",
        "team1": "Necaxa",
        "team2": "FC Juárez",
        "league": "Liga MX",
        "country": "México",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 30,
    "id": "bet-1792541138892-o3cemm86v",
    "date": "2026-10-21",
    "title": "Club Brugge x Lens + Inter x Shakhtar Donetsk + Real Madrid x RB Leipzig",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Club Brugge x Lens",
        "team1": "Club Brugge",
        "team2": "Lens",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Inter x Shakhtar Donetsk",
        "team1": "Inter",
        "team2": "Shakhtar Donetsk",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Real Madrid x RB Leipzig",
        "team1": "Real Madrid",
        "team2": "RB Leipzig",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 31,
    "id": "bet-1792451613997-6ouq8tnxs",
    "date": "2026-10-20",
    "title": "Fenerbahçe x Slavia Prague + Sabah FK x Borussia Dortmund + FC Porto x PSV Eindhoven",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Fenerbahçe x Slavia Prague",
        "team1": "Fenerbahçe",
        "team2": "Slavia Prague",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sabah FK x Borussia Dortmund",
        "team1": "Sabah FK",
        "team2": "Borussia Dortmund",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Porto x PSV Eindhoven",
        "team1": "FC Porto",
        "team2": "PSV Eindhoven",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 32,
    "id": "bet-1792451683126-fkm9rbsxv",
    "date": "2026-10-20",
    "title": "Cúcuta x Atlético Nacional + Al Nassr FC x Neom SC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 0,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Cúcuta x Atlético Nacional",
        "team1": "Cúcuta",
        "team2": "Atlético Nacional",
        "league": "Primera A (Liga BetPlay)",
        "country": "Colômbia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al Nassr FC x Neom SC",
        "team1": "Al Nassr FC",
        "team2": "Neom SC",
        "league": "Saudi Pro League",
        "country": "Arábia Saudita",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 33,
    "id": "bet-1792451652804-6sxq8y9ar",
    "date": "2026-10-20",
    "title": "Asyut Petroleum x Zamalek SC + Tala'ea El Gaish x Pyramids FC + Chivas x Necaxa",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Asyut Petroleum x Zamalek SC",
        "team1": "Asyut Petroleum",
        "team2": "Zamalek SC",
        "league": "Copa do Egito",
        "country": "Egito",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Tala'ea El Gaish x Pyramids FC",
        "team1": "Tala'ea El Gaish",
        "team2": "Pyramids FC",
        "league": "Egyptian Premier League",
        "country": "Internacional",
        "score": "1-4",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Chivas x Necaxa",
        "team1": "Chivas",
        "team2": "Necaxa",
        "league": "Liga MX",
        "country": "México",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 34,
    "id": "bet-1792373685323-aujavri3h",
    "date": "2026-10-19",
    "title": "Pafos FC x APOEL Nicosia + Nacional x Deportivo Maldonado + Al-Fayha x Al Ahli",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Pafos FC x APOEL Nicosia",
        "team1": "Pafos FC",
        "team2": "APOEL Nicosia",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Nacional x Deportivo Maldonado",
        "team1": "Nacional",
        "team2": "Deportivo Maldonado",
        "league": "Primera División (Uruguai)",
        "country": "Uruguai",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Fayha x Al Ahli",
        "team1": "Al-Fayha",
        "team2": "Al Ahli",
        "league": "Saudi Pro League",
        "country": "Arábia Saudita",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 35,
    "id": "bet-1792373630136-x625ymo62",
    "date": "2026-10-19",
    "title": "Derry City x St. Patrick's Athletic + Arsimi x GFK Tikves Kavadarci + Cruzeiro x Club Bolivar",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Derry City x St. Patrick's Athletic",
        "team1": "Derry City",
        "team2": "St. Patrick's Athletic",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Arsimi x GFK Tikves Kavadarci",
        "team1": "Arsimi",
        "team2": "GFK Tikves Kavadarci",
        "league": "Prva Liga (Macedônia do Norte)",
        "country": "Macedônia do Norte",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cruzeiro x Club Bolivar",
        "team1": "Cruzeiro",
        "team2": "Club Bolivar",
        "league": "Copa Libertadores Femenina",
        "country": "Internacional",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 36,
    "id": "bet-1792319895510-368si0e18",
    "date": "2026-10-18",
    "title": "Beijing Guoan x Qingdao West Coast + Shanghai Port x Chengdu Rongcheng FC + FC Milsami Orhei x Zimbru",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Beijing Guoan x Qingdao West Coast",
        "team1": "Beijing Guoan",
        "team2": "Qingdao West Coast",
        "league": "Chinese Super League",
        "country": "China",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shanghai Port x Chengdu Rongcheng FC",
        "team1": "Shanghai Port",
        "team2": "Chengdu Rongcheng FC",
        "league": "Chinese Super League",
        "country": "China",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Milsami Orhei x Zimbru",
        "team1": "FC Milsami Orhei",
        "team2": "Zimbru",
        "league": "Super Liga (Moldávia)",
        "country": "Moldávia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 37,
    "id": "bet-1792319911974-iq78k2w7a",
    "date": "2026-10-18",
    "title": "Nottingham Forest x Arsenal + FC København x AGF + Công An Hà Nội x Ha Nội FC + Halmstads BK x Hammarby",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 4,
    "greenLegsCount": 2,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Nottingham Forest x Arsenal",
        "team1": "Nottingham Forest",
        "team2": "Arsenal",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC København x AGF",
        "team1": "FC København",
        "team2": "AGF",
        "league": "Superligaen",
        "country": "Dinamarca",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Công An Hà Nội x Ha Nội FC",
        "team1": "Công An Hà Nội",
        "team2": "Ha Nội FC",
        "league": "V-League 1",
        "country": "Vietnã",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Halmstads BK x Hammarby",
        "team1": "Halmstads BK",
        "team2": "Hammarby",
        "league": "Allsvenskan",
        "country": "Suécia",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 38,
    "id": "bet-1792319784698-eqfa0agki",
    "date": "2026-10-18",
    "title": "Baník Ostrava x Sparta Prague + Borneo Samarinda x Yangon United + Spartak Pleven x Levski Sofia",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Baník Ostrava x Sparta Prague",
        "team1": "Baník Ostrava",
        "team2": "Sparta Prague",
        "league": "Chance Liga (1. Liga)",
        "country": "República Tcheca",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Borneo Samarinda x Yangon United",
        "team1": "Borneo Samarinda",
        "team2": "Yangon United",
        "league": "AFC Challenge League",
        "country": "Ásia",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Spartak Pleven x Levski Sofia",
        "team1": "Spartak Pleven",
        "team2": "Levski Sofia",
        "league": "Copa da Bulgária",
        "country": "Bulgária",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 39,
    "id": "bet-1792320103709-m96xobztn",
    "date": "2026-10-18",
    "title": "RSD Alcalá x Real Madrid C + Al-Sadd x Al-Duhail SC + Bangkok United x Port FC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "RSD Alcalá x Real Madrid C",
        "team1": "RSD Alcalá",
        "team2": "Real Madrid C",
        "league": "La Liga",
        "country": "Espanha",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Sadd x Al-Duhail SC",
        "team1": "Al-Sadd",
        "team2": "Al-Duhail SC",
        "league": "Qatar Stars League",
        "country": "Catar",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Bangkok United x Port FC",
        "team1": "Bangkok United",
        "team2": "Port FC",
        "league": "Thai League 1",
        "country": "Tailândia",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 40,
    "id": "bet-1792319926475-ynrhmlq10",
    "date": "2026-10-18",
    "title": "Colo Colo x Santa Fe + Monterrey x Pachuca + Nacional Potosí x Bolívar",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Colo Colo x Santa Fe",
        "team1": "Colo Colo",
        "team2": "Santa Fe",
        "league": "Primera División (Chile)",
        "country": "Chile",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Monterrey x Pachuca",
        "team1": "Monterrey",
        "team2": "Pachuca",
        "league": "Liga MX",
        "country": "México",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Nacional Potosí x Bolívar",
        "team1": "Nacional Potosí",
        "team2": "Bolívar",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 41,
    "id": "bet-1792319843129-d18ye8w01",
    "date": "2026-10-18",
    "title": "Spartak Moscow x Rubin Kazan + Polissya Zhytomyr x Dynamo Kyiv + FC Kapaz x Zira",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Spartak Moscow x Rubin Kazan",
        "team1": "Spartak Moscow",
        "team2": "Rubin Kazan",
        "league": "Copa da Rússia",
        "country": "Rússia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Polissya Zhytomyr x Dynamo Kyiv",
        "team1": "Polissya Zhytomyr",
        "team2": "Dynamo Kyiv",
        "league": "Premier League (UKR)",
        "country": "Internacional",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Kapaz x Zira",
        "team1": "FC Kapaz",
        "team2": "Zira",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 42,
    "id": "bet-1792320066851-2t8g0cgxe",
    "date": "2026-10-18",
    "title": "Debibi x Bibiani Gold Stars + Celtic x Heart of Midlothian + Yeclano x Poblense",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Debibi x Bibiani Gold Stars",
        "team1": "Debibi",
        "team2": "Bibiani Gold Stars",
        "league": "Ghana Premier League",
        "country": "Gana",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Celtic x Heart of Midlothian",
        "team1": "Celtic",
        "team2": "Heart of Midlothian",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "7-1",
        "totalGoals": 8,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Yeclano x Poblense",
        "team1": "Yeclano",
        "team2": "Poblense",
        "league": "Ligue 1",
        "country": "França",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 43,
    "id": "bet-1792320017754-s5zcc2pu5",
    "date": "2026-10-18",
    "title": "Omonia 29 Maiou x Anorthosis + Lech Poznań x Korona Kielce + Hajduk Split x NK Varaždin",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Omonia 29 Maiou x Anorthosis",
        "team1": "Omonia 29 Maiou",
        "team2": "Anorthosis",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lech Poznań x Korona Kielce",
        "team1": "Lech Poznań",
        "team2": "Korona Kielce",
        "league": "Ekstraklasa",
        "country": "Polônia",
        "score": "6-1",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Hajduk Split x NK Varaždin",
        "team1": "Hajduk Split",
        "team2": "NK Varaždin",
        "league": "HNL (1. HNL)",
        "country": "Croácia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 44,
    "id": "bet-1792203726673-bnrmi7rnp",
    "date": "2026-10-17",
    "title": "Fenerbahçe x Alanyaspor + Sanjoanense x Nacional + Miami FC x Charleston Battery",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Fenerbahçe x Alanyaspor",
        "team1": "Fenerbahçe",
        "team2": "Alanyaspor",
        "league": "Süper Lig (Turquia)",
        "country": "Turquia",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sanjoanense x Nacional",
        "team1": "Sanjoanense",
        "team2": "Nacional",
        "league": "Taça de Portugal",
        "country": "Portugal",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Miami FC x Charleston Battery",
        "team1": "Miami FC",
        "team2": "Charleston Battery",
        "league": "USL Championship",
        "country": "Estados Unidos",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 45,
    "id": "bet-1792203602521-v8y26vrut",
    "date": "2026-10-17",
    "title": "Union Berlin x Borussia Dortmund + Bayern München x RB Leipzig + Troyes x Lens",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Union Berlin x Borussia Dortmund",
        "team1": "Union Berlin",
        "team2": "Borussia Dortmund",
        "league": "Bundesliga",
        "country": "Alemanha",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Bayern München x RB Leipzig",
        "team1": "Bayern München",
        "team2": "RB Leipzig",
        "league": "Bundesliga",
        "country": "Alemanha",
        "score": "6-1",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Troyes x Lens",
        "team1": "Troyes",
        "team2": "Lens",
        "league": "Ligue 1",
        "country": "França",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 46,
    "id": "bet-1792203712381-nanbk5eha",
    "date": "2026-10-17",
    "title": "CA San Miguel x Ciudad de Bolívar + Lokomotive Leipzig x BSG Chemie Leipzig + Gençlerbirliği x Galatasaray",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "CA San Miguel x Ciudad de Bolívar",
        "team1": "CA San Miguel",
        "team2": "Ciudad de Bolívar",
        "league": "Primera Nacional (Argentina)",
        "country": "Argentina",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lokomotive Leipzig x BSG Chemie Leipzig",
        "team1": "Lokomotive Leipzig",
        "team2": "BSG Chemie Leipzig",
        "league": "Regionalliga Nordost",
        "country": "Alemanha",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Gençlerbirliği x Galatasaray",
        "team1": "Gençlerbirliği",
        "team2": "Galatasaray",
        "league": "Süper Lig (Turquia)",
        "country": "Turquia",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 47,
    "id": "bet-1792203743271-3iun9zh06",
    "date": "2026-10-17",
    "title": "El Paso Locomotive FC x Sacramento Republic FC + Central Coast Mariners x Newcastle Jets + Keflavík x KR Reykjavík",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "El Paso Locomotive FC x Sacramento Republic FC",
        "team1": "El Paso Locomotive FC",
        "team2": "Sacramento Republic FC",
        "league": "USL Championship",
        "country": "Estados Unidos",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Central Coast Mariners x Newcastle Jets",
        "team1": "Central Coast Mariners",
        "team2": "Newcastle Jets",
        "league": "National League North",
        "country": "Inglaterra",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Keflavík x KR Reykjavík",
        "team1": "Keflavík",
        "team2": "KR Reykjavík",
        "league": "Besta deildin",
        "country": "Islândia",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 48,
    "id": "bet-1791804434356-j35ryyg0n",
    "date": "2026-10-15",
    "title": "AZ Alkmaar x Hapoel Beer Sheva + Sparta Prague x Lillestrøm + Marseille x Olympiacos",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "AZ Alkmaar x Hapoel Beer Sheva",
        "team1": "AZ Alkmaar",
        "team2": "Hapoel Beer Sheva",
        "league": "UEFA Europa League",
        "country": "Europa",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sparta Prague x Lillestrøm",
        "team1": "Sparta Prague",
        "team2": "Lillestrøm",
        "league": "UEFA Europa League",
        "country": "Europa",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Marseille x Olympiacos",
        "team1": "Marseille",
        "team2": "Olympiacos",
        "league": "UEFA Europa League",
        "country": "Europa",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 49,
    "id": "bet-1791804340170-3wc06k10h",
    "date": "2026-10-14",
    "title": "Bodø/Glimt x Borussia Dortmund + Los Angeles FC x Austin FC + Vissel Kobe x Jeonbuk Hyundai Motors FC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Bodø/Glimt x Borussia Dortmund",
        "team1": "Bodø/Glimt",
        "team2": "Borussia Dortmund",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Los Angeles FC x Austin FC",
        "team1": "Los Angeles FC",
        "team2": "Austin FC",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Vissel Kobe x Jeonbuk Hyundai Motors FC",
        "team1": "Vissel Kobe",
        "team2": "Jeonbuk Hyundai Motors FC",
        "league": "AFC Champions League Elite (Leste)",
        "country": "Ásia",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 50,
    "id": "bet-1791804402154-wha6w8c0t",
    "date": "2026-10-14",
    "title": "Irtysh Pavlodar x FC Astana + Dynamo Makhachkala x Zenit St. Petersburg + Fluminense x Palmeiras",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Irtysh Pavlodar x FC Astana",
        "team1": "Irtysh Pavlodar",
        "team2": "FC Astana",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Dynamo Makhachkala x Zenit St. Petersburg",
        "team1": "Dynamo Makhachkala",
        "team2": "Zenit St. Petersburg",
        "league": "Cup Grp. C",
        "country": "Internacional",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Fluminense x Palmeiras",
        "team1": "Fluminense",
        "team2": "Palmeiras",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 51,
    "id": "bet-1791804308302-dqfny09ms",
    "date": "2026-10-13",
    "title": "Công An Hà Nội x Kashima Antlers + TRA United x Young Africans",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 0,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Công An Hà Nội x Kashima Antlers",
        "team1": "Công An Hà Nội",
        "team2": "Kashima Antlers",
        "league": "AFC Champions League Elite (Leste)",
        "country": "Ásia",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "TRA United x Young Africans",
        "team1": "TRA United",
        "team2": "Young Africans",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 52,
    "id": "bet-1791596359571-8rp4mvjq9",
    "date": "2026-10-11",
    "title": "Sparta Prague x Pardubice + Hammarby TFF x Enköping + Cherno More Varna x Levski Sofia",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Sparta Prague x Pardubice",
        "team1": "Sparta Prague",
        "team2": "Pardubice",
        "league": "Chance Liga (1. Liga)",
        "country": "República Tcheca",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Hammarby TFF x Enköping",
        "team1": "Hammarby TFF",
        "team2": "Enköping",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cherno More Varna x Levski Sofia",
        "team1": "Cherno More Varna",
        "team2": "Levski Sofia",
        "league": "First League (Bulgária)",
        "country": "Bulgária",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 53,
    "id": "bet-1791596434982-wn9fgnxwy",
    "date": "2026-10-11",
    "title": "Olympiacos x Panathinaikos + Java United F.C. x Borneo Samarinda + CS Petrocub x Zimbru",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Olympiacos x Panathinaikos",
        "team1": "Olympiacos",
        "team2": "Panathinaikos",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Java United F.C. x Borneo Samarinda",
        "team1": "Java United F.C.",
        "team2": "Borneo Samarinda",
        "league": "Liga 1 (Indonésia)",
        "country": "Indonésia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "CS Petrocub x Zimbru",
        "team1": "CS Petrocub",
        "team2": "Zimbru",
        "league": "Super Liga (Moldávia)",
        "country": "Moldávia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 54,
    "id": "bet-1791596392402-pjptinlv3",
    "date": "2026-10-11",
    "title": "Slaven x Rijeka + Estrella Roja x Real España + Zamalek SC x Al Ahly SC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Slaven x Rijeka",
        "team1": "Slaven",
        "team2": "Rijeka",
        "league": "HNL (1. HNL)",
        "country": "Croácia",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Estrella Roja x Real España",
        "team1": "Estrella Roja",
        "team2": "Real España",
        "league": "Liga Nacional (Honduras)",
        "country": "Honduras",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Zamalek SC x Al Ahly SC",
        "team1": "Zamalek SC",
        "team2": "Al Ahly SC",
        "league": "Egyptian Premier League",
        "country": "Internacional",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 55,
    "id": "bet-1791596456169-p3ybxox8u",
    "date": "2026-10-11",
    "title": "FC Midtjylland x FC København + Ha Nội FC x Bac Ninh + Hammarby x Djurgården",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC Midtjylland x FC København",
        "team1": "FC Midtjylland",
        "team2": "FC København",
        "league": "Superligaen",
        "country": "Dinamarca",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Ha Nội FC x Bac Ninh",
        "team1": "Ha Nội FC",
        "team2": "Bac Ninh",
        "league": "V-League 1",
        "country": "Vietnã",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Hammarby x Djurgården",
        "team1": "Hammarby",
        "team2": "Djurgården",
        "league": "Allsvenskan",
        "country": "Suécia",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 56,
    "id": "bet-1791596212733-8crvhwleu",
    "date": "2026-10-10",
    "title": "Zira x Shamakhi FK + Tobol Kostanay x FC Astana + Kairat Almaty x Zhetysu Taldykorgan",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Zira x Shamakhi FK",
        "team1": "Zira",
        "team2": "Shamakhi FK",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Tobol Kostanay x FC Astana",
        "team1": "Tobol Kostanay",
        "team2": "FC Astana",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Kairat Almaty x Zhetysu Taldykorgan",
        "team1": "Kairat Almaty",
        "team2": "Zhetysu Taldykorgan",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 57,
    "id": "bet-1791596173101-ljxa2g034",
    "date": "2026-10-10",
    "title": "FC Motagua x CD Choloma + Chester FC x Bedford Town + Paksi SE x MTK Budapest",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC Motagua x CD Choloma",
        "team1": "FC Motagua",
        "team2": "CD Choloma",
        "league": "Liga Nacional (Honduras)",
        "country": "Honduras",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Chester FC x Bedford Town",
        "team1": "Chester FC",
        "team2": "Bedford Town",
        "league": "National League North",
        "country": "Inglaterra",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Paksi SE x MTK Budapest",
        "team1": "Paksi SE",
        "team2": "MTK Budapest",
        "league": "NB I (Nemzeti Bajnokság)",
        "country": "Hungria",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 58,
    "id": "bet-1791596253274-m29l95xy4",
    "date": "2026-10-10",
    "title": "Chengdu Rongcheng FC x Tianjin Jinmen Tiger + Shanghai Shenhua x Yunnan Yukun + Tigres x Toluca",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Chengdu Rongcheng FC x Tianjin Jinmen Tiger",
        "team1": "Chengdu Rongcheng FC",
        "team2": "Tianjin Jinmen Tiger",
        "league": "Chinese Super League",
        "country": "China",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shanghai Shenhua x Yunnan Yukun",
        "team1": "Shanghai Shenhua",
        "team2": "Yunnan Yukun",
        "league": "Chinese Super League",
        "country": "China",
        "score": "7-1",
        "totalGoals": 8,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Tigres x Toluca",
        "team1": "Tigres",
        "team2": "Toluca",
        "league": "Liga MX",
        "country": "México",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 59,
    "id": "bet-1791596233278-n85itfayp",
    "date": "2026-10-10",
    "title": "Simba SC x Young Africans + Coleraine x Cliftonville + GFK Tikves Kavadarci x FK Bregalnica Štip",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Simba SC x Young Africans",
        "team1": "Simba SC",
        "team2": "Young Africans",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Coleraine x Cliftonville",
        "team1": "Coleraine",
        "team2": "Cliftonville",
        "league": "NIFL Premiership",
        "country": "Irlanda do Norte",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "GFK Tikves Kavadarci x FK Bregalnica Štip",
        "team1": "GFK Tikves Kavadarci",
        "team2": "FK Bregalnica Štip",
        "league": "Prva Liga (Macedônia do Norte)",
        "country": "Macedônia do Norte",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 60,
    "id": "bet-1791556347012-6xokhaxsr",
    "date": "2026-10-09",
    "title": "Borussia Dortmund x Werder Bremen + Sharjah Cultural Club x Al-Jazira + Al Fateh FC x Al Ahli",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Borussia Dortmund x Werder Bremen",
        "team1": "Borussia Dortmund",
        "team2": "Werder Bremen",
        "league": "Bundesliga",
        "country": "Alemanha",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sharjah Cultural Club x Al-Jazira",
        "team1": "Sharjah Cultural Club",
        "team2": "Al-Jazira",
        "league": "ADIB League Cup",
        "country": "Emirados Árabes",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al Fateh FC x Al Ahli",
        "team1": "Al Fateh FC",
        "team2": "Al Ahli",
        "league": "Saudi Pro League",
        "country": "Arábia Saudita",
        "score": "0-4",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 61,
    "id": "bet-1790204586137-50es0rqd1",
    "date": "2026-09-26",
    "title": "Dhaka Wanderers x Abahani Limited + HFX Wanderers FC x Atlético Ottawa",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 1,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Dhaka Wanderers x Abahani Limited",
        "team1": "Dhaka Wanderers",
        "team2": "Abahani Limited",
        "league": "Premier League (Bangladesh)",
        "country": "Bangladesh",
        "score": "1-5",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "HFX Wanderers FC x Atlético Ottawa",
        "team1": "HFX Wanderers FC",
        "team2": "Atlético Ottawa",
        "league": "Canadian Premier League",
        "country": "Canadá",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 62,
    "id": "bet-1790201511056-6dsfw411u",
    "date": "2026-09-25",
    "title": "Colo Colo x Audax Italiano + Coleraine x Linfield + Atlante x Monterrey",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Colo Colo x Audax Italiano",
        "team1": "Colo Colo",
        "team2": "Audax Italiano",
        "league": "Primera División (Chile)",
        "country": "Chile",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Coleraine x Linfield",
        "team1": "Coleraine",
        "team2": "Linfield",
        "league": "NIFL Premiership",
        "country": "Irlanda do Norte",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Atlante x Monterrey",
        "team1": "Atlante",
        "team2": "Monterrey",
        "league": "Liga MX",
        "country": "México",
        "score": "4-2",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 63,
    "id": "bet-1789824319970-whvf2ahkl",
    "date": "2026-09-20",
    "title": "Fenerbahçe x Eyüpspor + FC Sheriff x FC Bălți + Lokomotiv Tashkent x Neftchi Fargona",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Fenerbahçe x Eyüpspor",
        "team1": "Fenerbahçe",
        "team2": "Eyüpspor",
        "league": "Süper Lig (Turquia)",
        "country": "Turquia",
        "score": "8-0",
        "totalGoals": 8,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Sheriff x FC Bălți",
        "team1": "FC Sheriff",
        "team2": "FC Bălți",
        "league": "Super Liga (Moldávia)",
        "country": "Moldávia",
        "score": "7-0",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lokomotiv Tashkent x Neftchi Fargona",
        "team1": "Lokomotiv Tashkent",
        "team2": "Neftchi Fargona",
        "league": "Superliga (Uzbequistão)",
        "country": "Uzbequistão",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 64,
    "id": "bet-1789824392927-rv0thj579",
    "date": "2026-09-20",
    "title": "Al-Jazira x Al-Wahda + Toluca x Santos Laguna + Al-Ahli x Al-Shahaniya",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Al-Jazira x Al-Wahda",
        "team1": "Al-Jazira",
        "team2": "Al-Wahda",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Toluca x Santos Laguna",
        "team1": "Toluca",
        "team2": "Santos Laguna",
        "league": "Liga MX",
        "country": "México",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Ahli x Al-Shahaniya",
        "team1": "Al-Ahli",
        "team2": "Al-Shahaniya",
        "league": "Qatar Stars League",
        "country": "Catar",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 65,
    "id": "bet-1789824129773-ql0nfy713",
    "date": "2026-09-20",
    "title": "Salzburg x Sturm Graz + Omonia Nicosia x Krasava Ypsonas FC + AZ Alkmaar x Telstar",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Salzburg x Sturm Graz",
        "team1": "Salzburg",
        "team2": "Sturm Graz",
        "league": "Liga Internacional",
        "country": "Internacional",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Omonia Nicosia x Krasava Ypsonas FC",
        "team1": "Omonia Nicosia",
        "team2": "Krasava Ypsonas FC",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "AZ Alkmaar x Telstar",
        "team1": "AZ Alkmaar",
        "team2": "Telstar",
        "league": "Eredivisie",
        "country": "Holanda",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 66,
    "id": "bet-1789774223585-ddijav6po",
    "date": "2026-09-19",
    "title": "Turan Tovuz x Zira + Zrinjski Mostar x FK Velež Mostar + Al Shorta x Al Kahrabaa",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Turan Tovuz x Zira",
        "team1": "Turan Tovuz",
        "team2": "Zira",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Zrinjski Mostar x FK Velež Mostar",
        "team1": "Zrinjski Mostar",
        "team2": "FK Velež Mostar",
        "league": "Premijer Liga (Bósnia)",
        "country": "Bósnia e Herzegovina",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al Shorta x Al Kahrabaa",
        "team1": "Al Shorta",
        "team2": "Al Kahrabaa",
        "league": "Iraq Stars League",
        "country": "Iraque",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 67,
    "id": "bet-1789774342102-eb28g5jq5",
    "date": "2026-09-19",
    "title": "Cavalry FC x Forge FC + FK Jelgava x Riga FC",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 1,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Cavalry FC x Forge FC",
        "team1": "Cavalry FC",
        "team2": "Forge FC",
        "league": "Canadian Premier League",
        "country": "Canadá",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FK Jelgava x Riga FC",
        "team1": "FK Jelgava",
        "team2": "Riga FC",
        "league": "Virslīga (Letônia)",
        "country": "Letônia",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 68,
    "id": "bet-1789774184475-26xvc98ya",
    "date": "2026-09-19",
    "title": "Voitsberg x Austria Salzburg + Apollon Limassol x APOEL Nicosia + Real España x FC Motagua",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Voitsberg x Austria Salzburg",
        "team1": "Voitsberg",
        "team2": "Austria Salzburg",
        "league": "ÖFB-Cup",
        "country": "Áustria",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Apollon Limassol x APOEL Nicosia",
        "team1": "Apollon Limassol",
        "team2": "APOEL Nicosia",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Real España x FC Motagua",
        "team1": "Real España",
        "team2": "FC Motagua",
        "league": "Liga Nacional (Honduras)",
        "country": "Honduras",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 69,
    "id": "bet-1789389636653-fbs7eczbc",
    "date": "2026-09-18",
    "title": "Polissya Zhytomyr x Kryvbas + Klaksvik x Skála + IF Gnistan x HJK",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Polissya Zhytomyr x Kryvbas",
        "team1": "Polissya Zhytomyr",
        "team2": "Kryvbas",
        "league": "Liga Internacional",
        "country": "Internacional",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Klaksvik x Skála",
        "team1": "Klaksvik",
        "team2": "Skála",
        "league": "Betri deildin (Primeira Liga)",
        "country": "Ilhas Faroe",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "IF Gnistan x HJK",
        "team1": "IF Gnistan",
        "team2": "HJK",
        "league": "Veikkausliiga",
        "country": "Finlândia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 70,
    "id": "bet-1789389256477-sitouah5f",
    "date": "2026-09-17",
    "title": "Levski Sofia x Salzburg + Manchester City x Norwich City + FC Astana x Kairat Almaty",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Levski Sofia x Salzburg",
        "team1": "Levski Sofia",
        "team2": "Salzburg",
        "league": "First League (Bulgária)",
        "country": "Bulgária",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Manchester City x Norwich City",
        "team1": "Manchester City",
        "team2": "Norwich City",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "5-0",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Astana x Kairat Almaty",
        "team1": "FC Astana",
        "team2": "Kairat Almaty",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 71,
    "id": "bet-1789389461311-tplrq4tel",
    "date": "2026-09-17",
    "title": "Alianza FC x FC Motagua + Atyrau x Ordabasy Shymkent + Železničar Pančevo x FK Crvena Zvezda",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Alianza FC x FC Motagua",
        "team1": "Alianza FC",
        "team2": "FC Motagua",
        "league": "Primera División (El Salvador)",
        "country": "El Salvador",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Atyrau x Ordabasy Shymkent",
        "team1": "Atyrau",
        "team2": "Ordabasy Shymkent",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "0-3",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Železničar Pančevo x FK Crvena Zvezda",
        "team1": "Železničar Pančevo",
        "team2": "FK Crvena Zvezda",
        "league": "SuperLiga (Sérvia)",
        "country": "Sérvia",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 72,
    "id": "bet-1789580559206-0wf97cj7e",
    "date": "2026-09-16",
    "title": "Žalgiris Vilnius x FK Kauno Žalgiris + Sloga Doboj x Borac Banja Luka + Al Shorta x Al-Seeb",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Žalgiris Vilnius x FK Kauno Žalgiris",
        "team1": "Žalgiris Vilnius",
        "team2": "FK Kauno Žalgiris",
        "league": "A Lyga (Lituânia)",
        "country": "Lituânia",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sloga Doboj x Borac Banja Luka",
        "team1": "Sloga Doboj",
        "team2": "Borac Banja Luka",
        "league": "Premijer Liga (Bósnia)",
        "country": "Bósnia e Herzegovina",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al Shorta x Al-Seeb",
        "team1": "Al Shorta",
        "team2": "Al-Seeb",
        "league": "Iraq Stars League",
        "country": "Iraque",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 73,
    "id": "bet-1789216432082-x7ws68ccf",
    "date": "2026-09-13",
    "title": "AEK Larnaca x Pafos FC + Asteras Tripolis x AEK Athens + FK IMT Beograd x FK Crvena Zvezda",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "AEK Larnaca x Pafos FC",
        "team1": "AEK Larnaca",
        "team2": "Pafos FC",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Asteras Tripolis x AEK Athens",
        "team1": "Asteras Tripolis",
        "team2": "AEK Athens",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FK IMT Beograd x FK Crvena Zvezda",
        "team1": "FK IMT Beograd",
        "team2": "FK Crvena Zvezda",
        "league": "SuperLiga (Sérvia)",
        "country": "Sérvia",
        "score": "0-1",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 74,
    "id": "bet-1789214902911-rwi8hkebz",
    "date": "2026-09-12",
    "title": "Tottenham Hotspur x Everton + Orlando Pirates x La Cure Waves SC + Palmeiras x São Paulo",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Tottenham Hotspur x Everton",
        "team1": "Tottenham Hotspur",
        "team2": "Everton",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Orlando Pirates x La Cure Waves SC",
        "team1": "Orlando Pirates",
        "team2": "La Cure Waves SC",
        "league": "CAF Champions League",
        "country": "África",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Palmeiras x São Paulo",
        "team1": "Palmeiras",
        "team2": "São Paulo",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 75,
    "id": "bet-1788832935215-tbu0fu0yd",
    "date": "2026-09-09",
    "title": "Toronto FC x Nashville SC + Rangers x St. Mirren + NK Bedem Ivankovo x Dinamo Zagreb",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 1,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Toronto FC x Nashville SC",
        "team1": "Toronto FC",
        "team2": "Nashville SC",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Rangers x St. Mirren",
        "team1": "Rangers",
        "team2": "St. Mirren",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "NK Bedem Ivankovo x Dinamo Zagreb",
        "team1": "NK Bedem Ivankovo",
        "team2": "Dinamo Zagreb",
        "league": "Copa da Croácia",
        "country": "Croácia",
        "score": "0-4",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 76,
    "id": "bet-1788833757465-8e3x7uphf",
    "date": "2026-09-08",
    "title": "Ulsan HD FC x FC Seoul + IF Gnistan x KuPS + TPS x SJK",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "status": "Perdida",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 2,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Ulsan HD FC x FC Seoul",
        "team1": "Ulsan HD FC",
        "team2": "FC Seoul",
        "league": "K League 1",
        "country": "Coreia do Sul",
        "score": "1-0",
        "totalGoals": 1,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "IF Gnistan x KuPS",
        "team1": "IF Gnistan",
        "team2": "KuPS",
        "league": "Veikkausliiga",
        "country": "Finlândia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "TPS x SJK",
        "team1": "TPS",
        "team2": "SJK",
        "league": "Veikkausliiga",
        "country": "Finlândia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "red",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 77,
    "id": "bet-1794070462109-zkn9y8jj0",
    "date": "2026-11-08",
    "title": "Stafford Rangers x Grimsby Town + Angers x Nice + Tromsø x Bodø/Glimt",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Stafford Rangers x Grimsby Town",
        "team1": "Stafford Rangers",
        "team2": "Grimsby Town",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "3-3",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Angers x Nice",
        "team1": "Angers",
        "team2": "Nice",
        "league": "Ligue 1",
        "country": "Internacional",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Tromsø x Bodø/Glimt",
        "team1": "Tromsø",
        "team2": "Bodø/Glimt",
        "league": "Eliteserien",
        "country": "Noruega",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 78,
    "id": "bet-1794070665349-62795zsz8",
    "date": "2026-11-07",
    "title": "FC Cincinnati x Nashville SC + Al Ahly SC x El Sekka El Hadid + Pyramids FC x El Dakhleya",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC Cincinnati x Nashville SC",
        "team1": "FC Cincinnati",
        "team2": "Nashville SC",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al Ahly SC x El Sekka El Hadid",
        "team1": "Al Ahly SC",
        "team2": "El Sekka El Hadid",
        "league": "Copa do Egito",
        "country": "Egito",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Pyramids FC x El Dakhleya",
        "team1": "Pyramids FC",
        "team2": "El Dakhleya",
        "league": "Copa do Egito",
        "country": "Egito",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 79,
    "id": "bet-1794070682727-xp36ndr21",
    "date": "2026-11-07",
    "title": "Górnik Zabrze x Wieczysta Kraków + Cove Rangers x Hamilton Academical + St. Mirren x Rangers",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Górnik Zabrze x Wieczysta Kraków",
        "team1": "Górnik Zabrze",
        "team2": "Wieczysta Kraków",
        "league": "Ekstraklasa",
        "country": "Polônia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cove Rangers x Hamilton Academical",
        "team1": "Cove Rangers",
        "team2": "Hamilton Academical",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "4-0",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "St. Mirren x Rangers",
        "team1": "St. Mirren",
        "team2": "Rangers",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 80,
    "id": "bet-1794070715146-aaa2p73hg",
    "date": "2026-11-07",
    "title": "Libertad x Nacional + Orlando Pirates x Sekhukhune United + Cowdenbeath x Berwick Rangers",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Libertad x Nacional",
        "team1": "Libertad",
        "team2": "Nacional",
        "league": "División de Honor (Paraguai)",
        "country": "Paraguai",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Orlando Pirates x Sekhukhune United",
        "team1": "Orlando Pirates",
        "team2": "Sekhukhune United",
        "league": "League Cup",
        "country": "Internacional",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cowdenbeath x Berwick Rangers",
        "team1": "Cowdenbeath",
        "team2": "Berwick Rangers",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 81,
    "id": "bet-1793526879050-u29jpwaaz",
    "date": "2026-11-01",
    "title": "Lyon x Angers + Nashville SC x Red Bull New York + KF Tirana x Egnatia",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Lyon x Angers",
        "team1": "Lyon",
        "team2": "Angers",
        "league": "Ligue 1",
        "country": "França",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Nashville SC x Red Bull New York",
        "team1": "Nashville SC",
        "team2": "Red Bull New York",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "KF Tirana x Egnatia",
        "team1": "KF Tirana",
        "team2": "Egnatia",
        "league": "Kategoria Superiore",
        "country": "Albânia",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 82,
    "id": "bet-1793445593418-l2ylkm7a5",
    "date": "2026-10-31",
    "title": "CD Plaza Amador x Alianza FC + Györi ETO x Vasas Budapest + Araz PFK x Zira",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "CD Plaza Amador x Alianza FC",
        "team1": "CD Plaza Amador",
        "team2": "Alianza FC",
        "league": "Primera División (El Salvador)",
        "country": "El Salvador",
        "score": "6-0",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Györi ETO x Vasas Budapest",
        "team1": "Györi ETO",
        "team2": "Vasas Budapest",
        "league": "NB I",
        "country": "Internacional",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Araz PFK x Zira",
        "team1": "Araz PFK",
        "team2": "Zira",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 83,
    "id": "bet-1793445684467-7v07ez7a6",
    "date": "2026-10-31",
    "title": "Mamelodi Sundowns FC x Durban City + Mačva Šabac x FK Crvena Zvezda",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Mamelodi Sundowns FC x Durban City",
        "team1": "Mamelodi Sundowns FC",
        "team2": "Durban City",
        "league": "Premier Soccer League",
        "country": "Internacional",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Mačva Šabac x FK Crvena Zvezda",
        "team1": "Mačva Šabac",
        "team2": "FK Crvena Zvezda",
        "league": "SuperLiga (Sérvia)",
        "country": "Sérvia",
        "score": "2-4",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 84,
    "id": "bet-1793445558487-0g9ab1u3y",
    "date": "2026-10-31",
    "title": "Apollon Limassol x Pafos FC + Lech Poznań x Wisła Kraków + FC Porto x Estoril",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Apollon Limassol x Pafos FC",
        "team1": "Apollon Limassol",
        "team2": "Pafos FC",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lech Poznań x Wisła Kraków",
        "team1": "Lech Poznań",
        "team2": "Wisła Kraków",
        "league": "Ekstraklasa",
        "country": "Polônia",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Porto x Estoril",
        "team1": "FC Porto",
        "team2": "Estoril",
        "league": "Liga Portugal",
        "country": "Internacional",
        "score": "4-0",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 85,
    "id": "bet-1793379636572-3jjg2d0c5",
    "date": "2026-10-30",
    "title": "Alianza FC x CD Árabe Unido + St. Patrick's Athletic x Bohemian FC + Lokomotive Leipzig x VSG Altglienicke",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Alianza FC x CD Árabe Unido",
        "team1": "Alianza FC",
        "team2": "CD Árabe Unido",
        "league": "Primera División (El Salvador)",
        "country": "El Salvador",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "St. Patrick's Athletic x Bohemian FC",
        "team1": "St. Patrick's Athletic",
        "team2": "Bohemian FC",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "8-9",
        "totalGoals": 17,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lokomotive Leipzig x VSG Altglienicke",
        "team1": "Lokomotive Leipzig",
        "team2": "VSG Altglienicke",
        "league": "Regionalliga Nordost",
        "country": "Alemanha",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 86,
    "id": "bet-1793379626973-pm3x1dk9q",
    "date": "2026-10-30",
    "title": "Helmond Sport x FC Eindhoven + Bodø/Glimt x Viking + Sandecja Nowy Sącz x Olimpia Grudziądz",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Helmond Sport x FC Eindhoven",
        "team1": "Helmond Sport",
        "team2": "FC Eindhoven",
        "league": "Eerste Divisie",
        "country": "Holanda",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Bodø/Glimt x Viking",
        "team1": "Bodø/Glimt",
        "team2": "Viking",
        "league": "Eliteserien",
        "country": "Noruega",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sandecja Nowy Sącz x Olimpia Grudziądz",
        "team1": "Sandecja Nowy Sącz",
        "team2": "Olimpia Grudziądz",
        "league": "II Liga (3ª Divisão)",
        "country": "Polônia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 87,
    "id": "bet-1793155527649-uuf1db4xy",
    "date": "2026-10-28",
    "title": "Vysočina Jihlava x Viktoria Plzeň + LASK x Ried + PAOK Thessaloniki x AEK Athens",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Vysočina Jihlava x Viktoria Plzeň",
        "team1": "Vysočina Jihlava",
        "team2": "Viktoria Plzeň",
        "league": "Chance Liga (1. Liga)",
        "country": "República Tcheca",
        "score": "1-6",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "LASK x Ried",
        "team1": "LASK",
        "team2": "Ried",
        "league": "ÖFB-Cup",
        "country": "Áustria",
        "score": "5-4",
        "totalGoals": 9,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "PAOK Thessaloniki x AEK Athens",
        "team1": "PAOK Thessaloniki",
        "team2": "AEK Athens",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 88,
    "id": "bet-1793155441537-6sgg7qyvb",
    "date": "2026-10-28",
    "title": "Manchester City x Brighton & Hove Albion + Inter Miami CF x FC Cincinnati + Venezia x Inter",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Manchester City x Brighton & Hove Albion",
        "team1": "Manchester City",
        "team2": "Brighton & Hove Albion",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "6-5",
        "totalGoals": 11,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Inter Miami CF x FC Cincinnati",
        "team1": "Inter Miami CF",
        "team2": "FC Cincinnati",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Venezia x Inter",
        "team1": "Venezia",
        "team2": "Inter",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 89,
    "id": "bet-1793059965296-1s0dwkfn1",
    "date": "2026-10-27",
    "title": "Shakhtar Donetsk x Dynamo Kyiv + Club Atletico Peñarol x Montevideo City Torque + Libertad x Independiente CG",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Shakhtar Donetsk x Dynamo Kyiv",
        "team1": "Shakhtar Donetsk",
        "team2": "Dynamo Kyiv",
        "league": "Copa da Ucrânia",
        "country": "Ucrânia",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Club Atletico Peñarol x Montevideo City Torque",
        "team1": "Club Atletico Peñarol",
        "team2": "Montevideo City Torque",
        "league": "Primera División (Uruguai)",
        "country": "Uruguai",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Libertad x Independiente CG",
        "team1": "Libertad",
        "team2": "Independiente CG",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 90,
    "id": "bet-1793066187781-kn208whu9",
    "date": "2026-10-27",
    "title": "Sporting CP x Marítimo + Chester FC x Marine + Young Africans x Mashujaa",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Sporting CP x Marítimo",
        "team1": "Sporting CP",
        "team2": "Marítimo",
        "league": "League Cup",
        "country": "Internacional",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Chester FC x Marine",
        "team1": "Chester FC",
        "team2": "Marine",
        "league": "National League North",
        "country": "Inglaterra",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Young Africans x Mashujaa",
        "team1": "Young Africans",
        "team2": "Mashujaa",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 91,
    "id": "bet-1793059984473-nbiaf35jr",
    "date": "2026-10-27",
    "title": "Borussia Dortmund x Werder Bremen + Dinamo Zagreb x Rijeka + FC Eindhoven x FC Volendam",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Borussia Dortmund x Werder Bremen",
        "team1": "Borussia Dortmund",
        "team2": "Werder Bremen",
        "league": "Bundesliga",
        "country": "Alemanha",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Dinamo Zagreb x Rijeka",
        "team1": "Dinamo Zagreb",
        "team2": "Rijeka",
        "league": "HNL (1. HNL)",
        "country": "Croácia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Eindhoven x FC Volendam",
        "team1": "FC Eindhoven",
        "team2": "FC Volendam",
        "league": "KNVB Beker",
        "country": "Holanda",
        "score": "5-3",
        "totalGoals": 8,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 92,
    "id": "bet-1792976518109-ot5yzyh0i",
    "date": "2026-10-26",
    "title": "Bolívar x Universitario de Vinto + Flamengo x Atlético-MG",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Bolívar x Universitario de Vinto",
        "team1": "Bolívar",
        "team2": "Universitario de Vinto",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Flamengo x Atlético-MG",
        "team1": "Flamengo",
        "team2": "Atlético-MG",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 93,
    "id": "bet-1792976472920-4h4z992ts",
    "date": "2026-10-26",
    "title": "Neftchi Fargona x Al Ittihad + Al-Ain x Tractor + Al Qadsiah x Al-Sadd",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Neftchi Fargona x Al Ittihad",
        "team1": "Neftchi Fargona",
        "team2": "Al Ittihad",
        "league": "AFC Champions League Elite (Oeste)",
        "country": "Ásia",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Ain x Tractor",
        "team1": "Al-Ain",
        "team2": "Tractor",
        "league": "AFC Champions League Elite (Oeste)",
        "country": "Ásia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al Qadsiah x Al-Sadd",
        "team1": "Al Qadsiah",
        "team2": "Al-Sadd",
        "league": "AFC Champions League Elite (Oeste)",
        "country": "Ásia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 94,
    "id": "bet-1792940049938-dccr58m3g",
    "date": "2026-10-25",
    "title": "HJK x KuPS + Sydney FC x Adelaide United + Aucas x Barcelona SC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "HJK x KuPS",
        "team1": "HJK",
        "team2": "KuPS",
        "league": "Veikkausliiga",
        "country": "Finlândia",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sydney FC x Adelaide United",
        "team1": "Sydney FC",
        "team2": "Adelaide United",
        "league": "A-League",
        "country": "Austrália",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Aucas x Barcelona SC",
        "team1": "Aucas",
        "team2": "Barcelona SC",
        "league": "La Liga",
        "country": "Espanha",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 95,
    "id": "bet-1792939579958-7b7q26sby",
    "date": "2026-10-25",
    "title": "APOEL Nicosia x Omonia 29 Maiou + Viking x Tromsø + PSV Eindhoven x Feyenoord",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "APOEL Nicosia x Omonia 29 Maiou",
        "team1": "APOEL Nicosia",
        "team2": "Omonia 29 Maiou",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Viking x Tromsø",
        "team1": "Viking",
        "team2": "Tromsø",
        "league": "Eliteserien",
        "country": "Noruega",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "PSV Eindhoven x Feyenoord",
        "team1": "PSV Eindhoven",
        "team2": "Feyenoord",
        "league": "Eredivisie",
        "country": "Holanda",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 96,
    "id": "bet-1792939723934-x8iijhvl4",
    "date": "2026-10-25",
    "title": "Unión La Calera x Universidad Católica + Palestino x Colo Colo + Always Ready x CDT Real Oruro",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Unión La Calera x Universidad Católica",
        "team1": "Unión La Calera",
        "team2": "Universidad Católica",
        "league": "Primera División (Chile)",
        "country": "Chile",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Palestino x Colo Colo",
        "team1": "Palestino",
        "team2": "Colo Colo",
        "league": "Primera División (Chile)",
        "country": "Chile",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Always Ready x CDT Real Oruro",
        "team1": "Always Ready",
        "team2": "CDT Real Oruro",
        "league": "División Profesional (Bolívia)",
        "country": "Bolívia",
        "score": "5-1",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 97,
    "id": "bet-1792939708988-i8i9elyhm",
    "date": "2026-10-25",
    "title": "Inter Toronto FC x Atlético Ottawa + Nõmme JK Kalju x Flora Tallinn + Atlético Nacional x Independiente Medellín",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Inter Toronto FC x Atlético Ottawa",
        "team1": "Inter Toronto FC",
        "team2": "Atlético Ottawa",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Nõmme JK Kalju x Flora Tallinn",
        "team1": "Nõmme JK Kalju",
        "team2": "Flora Tallinn",
        "league": "Premium liiga",
        "country": "Estônia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Atlético Nacional x Independiente Medellín",
        "team1": "Atlético Nacional",
        "team2": "Independiente Medellín",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 98,
    "id": "bet-1792939676175-o8lr4wzpy",
    "date": "2026-10-25",
    "title": "Mjällby x Hammarby + FAR Rabat x CO Korhogo + Cruzeiro x Libertad",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Mjällby x Hammarby",
        "team1": "Mjällby",
        "team2": "Hammarby",
        "league": "Allsvenskan",
        "country": "Suécia",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FAR Rabat x CO Korhogo",
        "team1": "FAR Rabat",
        "team2": "CO Korhogo",
        "league": "CAF Confed Cup - 2nd Preliminary Round",
        "country": "Internacional",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cruzeiro x Libertad",
        "team1": "Cruzeiro",
        "team2": "Libertad",
        "league": "División de Honor (Paraguai)",
        "country": "Paraguai",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 99,
    "id": "bet-1792939567458-0bqmn3wpi",
    "date": "2026-10-25",
    "title": "Viktoria Plzeň x Pardubice + FC Košice x Žilina + Sturm Graz x Ried",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Viktoria Plzeň x Pardubice",
        "team1": "Viktoria Plzeň",
        "team2": "Pardubice",
        "league": "Chance Liga (1. Liga)",
        "country": "República Tcheca",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Košice x Žilina",
        "team1": "FC Košice",
        "team2": "Žilina",
        "league": "1. Liga",
        "country": "Internacional",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sturm Graz x Ried",
        "team1": "Sturm Graz",
        "team2": "Ried",
        "league": "ÖFB-Cup",
        "country": "Áustria",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 100,
    "id": "bet-1792939591920-vnsvh0r3w",
    "date": "2026-10-25",
    "title": "FC Motagua x Juticalpa + Sporting CP x Académico Viseu + Puskás FC Academy x Nyíregyháza Spartacus FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC Motagua x Juticalpa",
        "team1": "FC Motagua",
        "team2": "Juticalpa",
        "league": "Liga Nacional (Honduras)",
        "country": "Honduras",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sporting CP x Académico Viseu",
        "team1": "Sporting CP",
        "team2": "Académico Viseu",
        "league": "Liga Portugal",
        "country": "Internacional",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Puskás FC Academy x Nyíregyháza Spartacus FC",
        "team1": "Puskás FC Academy",
        "team2": "Nyíregyháza Spartacus FC",
        "league": "NB I (Nemzeti Bajnokság)",
        "country": "Hungria",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 101,
    "id": "bet-1792939554945-qjy4ch602",
    "date": "2026-10-25",
    "title": "Manchester United x AFC Bournemouth + Barcelona x Real Madrid + Udinese x Milan",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Manchester United x AFC Bournemouth",
        "team1": "Manchester United",
        "team2": "AFC Bournemouth",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-3",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Barcelona x Real Madrid",
        "team1": "Barcelona",
        "team2": "Real Madrid",
        "league": "La Liga",
        "country": "Espanha",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Udinese x Milan",
        "team1": "Udinese",
        "team2": "Milan",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 102,
    "id": "bet-1792847909663-4is6vpsik",
    "date": "2026-10-24",
    "title": "Aston Villa x Manchester City + RB Leipzig x Elversberg + Lens x Paris FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Aston Villa x Manchester City",
        "team1": "Aston Villa",
        "team2": "Manchester City",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "RB Leipzig x Elversberg",
        "team1": "RB Leipzig",
        "team2": "Elversberg",
        "league": "Bundesliga",
        "country": "Alemanha",
        "score": "4-0",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lens x Paris FC",
        "team1": "Lens",
        "team2": "Paris FC",
        "league": "Ligue 1",
        "country": "França",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 103,
    "id": "bet-1792848036657-dx6jl85qu",
    "date": "2026-10-24",
    "title": "Barry Town x Haverfordwest + Bangor x Larne + Ciudad de Bolívar x Colón",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Barry Town x Haverfordwest",
        "team1": "Barry Town",
        "team2": "Haverfordwest",
        "league": "Cymru Premier",
        "country": "País de Gales",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Bangor x Larne",
        "team1": "Bangor",
        "team2": "Larne",
        "league": "NIFL Premiership",
        "country": "Irlanda do Norte",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Ciudad de Bolívar x Colón",
        "team1": "Ciudad de Bolívar",
        "team2": "Colón",
        "league": "Primera Nacional (Argentina)",
        "country": "Argentina",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 104,
    "id": "bet-1792848085504-jbjr9wkql",
    "date": "2026-10-24",
    "title": "Shenzhen Peng City x Shanghai Shenhua + Víkingur Reykjavík x Fram Reykjavík + Corinthians x Independiente del Valle",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Shenzhen Peng City x Shanghai Shenhua",
        "team1": "Shenzhen Peng City",
        "team2": "Shanghai Shenhua",
        "league": "Chinese Super League",
        "country": "China",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Víkingur Reykjavík x Fram Reykjavík",
        "team1": "Víkingur Reykjavík",
        "team2": "Fram Reykjavík",
        "league": "Betri deildin (Primeira Liga)",
        "country": "Ilhas Faroe",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Corinthians x Independiente del Valle",
        "team1": "Corinthians",
        "team2": "Independiente del Valle",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "5-0",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 105,
    "id": "bet-1792762892752-5if2tmc3i",
    "date": "2026-10-23",
    "title": "Al-Shamal x Qatar SC + Al-Sailiya x Al-Rayyan + Al-Faisaly x Al Nassr FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Al-Shamal x Qatar SC",
        "team1": "Al-Shamal",
        "team2": "Qatar SC",
        "league": "Qatar Stars League",
        "country": "Catar",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Sailiya x Al-Rayyan",
        "team1": "Al-Sailiya",
        "team2": "Al-Rayyan",
        "league": "Qatar Stars League",
        "country": "Internacional",
        "score": "1-6",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Faisaly x Al Nassr FC",
        "team1": "Al-Faisaly",
        "team2": "Al Nassr FC",
        "league": "Saudi Pro League",
        "country": "Arábia Saudita",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 106,
    "id": "bet-1792762912406-1hkalwz39",
    "date": "2026-10-23",
    "title": "Al Qadsiah x Al Hilal + Independiente del Valle x Universidad Católica",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Al Qadsiah x Al Hilal",
        "team1": "Al Qadsiah",
        "team2": "Al Hilal",
        "league": "Saudi Pro League",
        "country": "Arábia Saudita",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Independiente del Valle x Universidad Católica",
        "team1": "Independiente del Valle",
        "team2": "Universidad Católica",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 107,
    "id": "bet-1792762830055-8rlxeikno",
    "date": "2026-10-23",
    "title": "Brothers Union x Abahani Limited + Mamelodi Sundowns FC x Wiliete Benguela + Orlando Pirates x African Stars",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Brothers Union x Abahani Limited",
        "team1": "Brothers Union",
        "team2": "Abahani Limited",
        "league": "Premier League (Bangladesh)",
        "country": "Bangladesh",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Mamelodi Sundowns FC x Wiliete Benguela",
        "team1": "Mamelodi Sundowns FC",
        "team2": "Wiliete Benguela",
        "league": "CAF Champions League",
        "country": "África",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Orlando Pirates x African Stars",
        "team1": "Orlando Pirates",
        "team2": "African Stars",
        "league": "CAF Champions League",
        "country": "África",
        "score": "4-0",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 108,
    "id": "bet-1792541183625-xqhkyhsr8",
    "date": "2026-10-21",
    "title": "Tigres x León + Puebla x Monterrey",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Tigres x León",
        "team1": "Tigres",
        "team2": "León",
        "league": "Liga MX",
        "country": "México",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Puebla x Monterrey",
        "team1": "Puebla",
        "team2": "Monterrey",
        "league": "Liga MX",
        "country": "México",
        "score": "1-4",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 109,
    "id": "bet-1792541152721-wkl1r4rnd",
    "date": "2026-10-21",
    "title": "FC Cincinnati x DC United + Tainan City x Borneo Samarinda + Young Africans x CFFA",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC Cincinnati x DC United",
        "team1": "FC Cincinnati",
        "team2": "DC United",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Tainan City x Borneo Samarinda",
        "team1": "Tainan City",
        "team2": "Borneo Samarinda",
        "league": "AFC Challenge League",
        "country": "Ásia",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Young Africans x CFFA",
        "team1": "Young Africans",
        "team2": "CFFA",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 110,
    "id": "bet-1792541121556-6q0ywdmlu",
    "date": "2026-10-21",
    "title": "Como x Manchester United + Lille x Galatasaray + Bayern München x Arsenal",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Como x Manchester United",
        "team1": "Como",
        "team2": "Manchester United",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lille x Galatasaray",
        "team1": "Lille",
        "team2": "Galatasaray",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "2-4",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Bayern München x Arsenal",
        "team1": "Bayern München",
        "team2": "Arsenal",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 111,
    "id": "bet-1792451632060-7mvkpca8d",
    "date": "2026-10-20",
    "title": "Roma x Slovan Bratislava + Napoli x Bodø/Glimt + Colo Colo x Puerto Montt",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Roma x Slovan Bratislava",
        "team1": "Roma",
        "team2": "Slovan Bratislava",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "4-0",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Napoli x Bodø/Glimt",
        "team1": "Napoli",
        "team2": "Bodø/Glimt",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "4-3",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Colo Colo x Puerto Montt",
        "team1": "Colo Colo",
        "team2": "Puerto Montt",
        "league": "Copa Chile",
        "country": "Chile",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 112,
    "id": "bet-1792373774765-1choowagv",
    "date": "2026-10-19",
    "title": "Dinamo Minsk x Arsenal Dzerzhinsk + Trabzonspor x Beşiktaş",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Dinamo Minsk x Arsenal Dzerzhinsk",
        "team1": "Dinamo Minsk",
        "team2": "Arsenal Dzerzhinsk",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Trabzonspor x Beşiktaş",
        "team1": "Trabzonspor",
        "team2": "Beşiktaş",
        "league": "Super Lig",
        "country": "Internacional",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 113,
    "id": "bet-1792319944748-5614li9ue",
    "date": "2026-10-18",
    "title": "The Strongest x Always Ready + Kalba FC x Al-Jazira + Riga FC x SK Super Nova",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "The Strongest x Always Ready",
        "team1": "The Strongest",
        "team2": "Always Ready",
        "league": "División Profesional (Bolívia)",
        "country": "Bolívia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Kalba FC x Al-Jazira",
        "team1": "Kalba FC",
        "team2": "Al-Jazira",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Riga FC x SK Super Nova",
        "team1": "Riga FC",
        "team2": "SK Super Nova",
        "league": "Virslīga (Letônia)",
        "country": "Letônia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 114,
    "id": "bet-1792319859478-3tf2ulmki",
    "date": "2026-10-18",
    "title": "FC Jurong x Lion City Sailors FC + Kairat Almaty x Irtysh Pavlodar + FC Astana x Kaspiy Aktau",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC Jurong x Lion City Sailors FC",
        "team1": "FC Jurong",
        "team2": "Lion City Sailors FC",
        "league": "Singapore Premier League",
        "country": "Singapura",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Kairat Almaty x Irtysh Pavlodar",
        "team1": "Kairat Almaty",
        "team2": "Irtysh Pavlodar",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "5-0",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Astana x Kaspiy Aktau",
        "team1": "FC Astana",
        "team2": "Kaspiy Aktau",
        "league": "Premier League (Cazaquistão)",
        "country": "Cazaquistão",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 115,
    "id": "bet-1792319878458-8q5av3ug4",
    "date": "2026-10-18",
    "title": "Panetolikos x Olympiacos + Panathinaikos x Asteras Tripolis + Wuhan Three Towns x Shanghai Shenhua",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Panetolikos x Olympiacos",
        "team1": "Panetolikos",
        "team2": "Olympiacos",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Panathinaikos x Asteras Tripolis",
        "team1": "Panathinaikos",
        "team2": "Asteras Tripolis",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "5-1",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Wuhan Three Towns x Shanghai Shenhua",
        "team1": "Wuhan Three Towns",
        "team2": "Shanghai Shenhua",
        "league": "Chinese Super League",
        "country": "China",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 116,
    "id": "bet-1792319975194-qocy78896",
    "date": "2026-10-18",
    "title": "Real Madrid x Sevilla + FC Cincinnati x Columbus Crew + Fiorentina x Como",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Real Madrid x Sevilla",
        "team1": "Real Madrid",
        "team2": "Sevilla",
        "league": "La Liga",
        "country": "Espanha",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Cincinnati x Columbus Crew",
        "team1": "FC Cincinnati",
        "team2": "Columbus Crew",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Fiorentina x Como",
        "team1": "Fiorentina",
        "team2": "Como",
        "league": "Serie A",
        "country": "Itália",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 117,
    "id": "bet-1792320048802-0qrdnk7pt",
    "date": "2026-10-18",
    "title": "FC Seoul x Gimcheon Sangmu + US Mondorf les Bains x FC Wiltz 71 + Tampines Rovers FC x Young Lions",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC Seoul x Gimcheon Sangmu",
        "team1": "FC Seoul",
        "team2": "Gimcheon Sangmu",
        "league": "K League 1",
        "country": "Coreia do Sul",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "US Mondorf les Bains x FC Wiltz 71",
        "team1": "US Mondorf les Bains",
        "team2": "FC Wiltz 71",
        "league": "National Division (BGL Ligue)",
        "country": "Luxemburgo",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Tampines Rovers FC x Young Lions",
        "team1": "Tampines Rovers FC",
        "team2": "Young Lions",
        "league": "Singapore Premier League",
        "country": "Singapura",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 118,
    "id": "bet-1792319826584-aciwbnxb4",
    "date": "2026-10-18",
    "title": "Slaven x Dinamo Zagreb + Fagiano Okayama FC x Vissel Kobe + Zenit St. Petersburg x FK Akhmat",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Slaven x Dinamo Zagreb",
        "team1": "Slaven",
        "team2": "Dinamo Zagreb",
        "league": "HNL (1. HNL)",
        "country": "Croácia",
        "score": "1-5",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Fagiano Okayama FC x Vissel Kobe",
        "team1": "Fagiano Okayama FC",
        "team2": "Vissel Kobe",
        "league": "J1 League",
        "country": "Japão",
        "score": "0-3",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Zenit St. Petersburg x FK Akhmat",
        "team1": "Zenit St. Petersburg",
        "team2": "FK Akhmat",
        "league": "Russian Premier League",
        "country": "Internacional",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 119,
    "id": "bet-1792319802813-azfujbst9",
    "date": "2026-10-18",
    "title": "Górnik Zabrze x Piast Gliwice + Cambuur x AZ Alkmaar + Hammarby TFF x IF Karlstad",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Górnik Zabrze x Piast Gliwice",
        "team1": "Górnik Zabrze",
        "team2": "Piast Gliwice",
        "league": "Ekstraklasa",
        "country": "Polônia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cambuur x AZ Alkmaar",
        "team1": "Cambuur",
        "team2": "AZ Alkmaar",
        "league": "Eredivisie",
        "country": "Holanda",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Hammarby TFF x IF Karlstad",
        "team1": "Hammarby TFF",
        "team2": "IF Karlstad",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 120,
    "id": "bet-1792319992473-p4e15qpg3",
    "date": "2026-10-18",
    "title": "Jablonec x Viktoria Plzeň + Wydad Casablanca x US Amal Tiznit + Sturm Graz x Grazer AK",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Jablonec x Viktoria Plzeň",
        "team1": "Jablonec",
        "team2": "Viktoria Plzeň",
        "league": "Chance Liga (1. Liga)",
        "country": "República Tcheca",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Wydad Casablanca x US Amal Tiznit",
        "team1": "Wydad Casablanca",
        "team2": "US Amal Tiznit",
        "league": "Botola Pro",
        "country": "Marrocos",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sturm Graz x Grazer AK",
        "team1": "Sturm Graz",
        "team2": "Grazer AK",
        "league": "Bundesliga",
        "country": "Alemanha",
        "score": "6-1",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 121,
    "id": "bet-1792203633930-tge20pbsp",
    "date": "2026-10-17",
    "title": "FK Arsenal Tivat x Mornar + Spartak Trnava x Slovan Bratislava + CFFA x Young Africans",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FK Arsenal Tivat x Mornar",
        "team1": "FK Arsenal Tivat",
        "team2": "Mornar",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Spartak Trnava x Slovan Bratislava",
        "team1": "Spartak Trnava",
        "team2": "Slovan Bratislava",
        "league": "Niké Liga",
        "country": "Eslováquia",
        "score": "0-3",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "CFFA x Young Africans",
        "team1": "CFFA",
        "team2": "Young Africans",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "0-4",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 122,
    "id": "bet-1792203695704-z0apailtw",
    "date": "2026-10-17",
    "title": "Lokomotiv Moscow x FC Krasnodar + Qarabağ FK x FK Neftchi + Inter San Carlos x LD Alajuelense",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Lokomotiv Moscow x FC Krasnodar",
        "team1": "Lokomotiv Moscow",
        "team2": "FC Krasnodar",
        "league": "Russian Premier League",
        "country": "Internacional",
        "score": "3-3",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Qarabağ FK x FK Neftchi",
        "team1": "Qarabağ FK",
        "team2": "FK Neftchi",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "3-3",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Inter San Carlos x LD Alajuelense",
        "team1": "Inter San Carlos",
        "team2": "LD Alajuelense",
        "league": "Ligue 1",
        "country": "França",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 123,
    "id": "bet-1792203659706-cvvsi84gg",
    "date": "2026-10-17",
    "title": "Hamarkameratene x Bodø/Glimt + ADO Den Haag x PSV Eindhoven + FC Ufa x Arsenal Tula",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Hamarkameratene x Bodø/Glimt",
        "team1": "Hamarkameratene",
        "team2": "Bodø/Glimt",
        "league": "Eliteserien",
        "country": "Noruega",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "ADO Den Haag x PSV Eindhoven",
        "team1": "ADO Den Haag",
        "team2": "PSV Eindhoven",
        "league": "Eredivisie",
        "country": "Holanda",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Ufa x Arsenal Tula",
        "team1": "FC Ufa",
        "team2": "Arsenal Tula",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 124,
    "id": "bet-1792203773282-hf9gppg6z",
    "date": "2026-10-17",
    "title": "Independiente Medellín x Once Caldas + Shabab Al-Ahli Dubai FC x Al-Ain",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Independiente Medellín x Once Caldas",
        "team1": "Independiente Medellín",
        "team2": "Once Caldas",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shabab Al-Ahli Dubai FC x Al-Ain",
        "team1": "Shabab Al-Ahli Dubai FC",
        "team2": "Al-Ain",
        "league": "UAE Pro League",
        "country": "Emirados Árabes",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 125,
    "id": "bet-1792203678639-o4lpsjll3",
    "date": "2026-10-17",
    "title": "Ulsan HD FC x Bucheon FC 1995 + Platense FC x FC Motagua + Paksi SE x Györi ETO",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Ulsan HD FC x Bucheon FC 1995",
        "team1": "Ulsan HD FC",
        "team2": "Bucheon FC 1995",
        "league": "K League 1",
        "country": "Coreia do Sul",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Platense FC x FC Motagua",
        "team1": "Platense FC",
        "team2": "FC Motagua",
        "league": "Liga Nacional (Honduras)",
        "country": "Honduras",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Paksi SE x Györi ETO",
        "team1": "Paksi SE",
        "team2": "Györi ETO",
        "league": "NB I (Nemzeti Bajnokság)",
        "country": "Hungria",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 126,
    "id": "bet-1792203759914-czprkwinw",
    "date": "2026-10-17",
    "title": "Chivas x Tigres + Independiente Rivadavia x Tigre + Chicó FC x Atlético Nacional",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Chivas x Tigres",
        "team1": "Chivas",
        "team2": "Tigres",
        "league": "Liga MX",
        "country": "México",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Independiente Rivadavia x Tigre",
        "team1": "Independiente Rivadavia",
        "team2": "Tigre",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Chicó FC x Atlético Nacional",
        "team1": "Chicó FC",
        "team2": "Atlético Nacional",
        "league": "Primera A (Liga BetPlay)",
        "country": "Colômbia",
        "score": "1-4",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 127,
    "id": "bet-1792203619937-k9gvpef8e",
    "date": "2026-10-17",
    "title": "Atlanta United x Inter Miami CF + New York City FC x Los Angeles FC + Bologna x Inter",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Atlanta United x Inter Miami CF",
        "team1": "Atlanta United",
        "team2": "Inter Miami CF",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "New York City FC x Los Angeles FC",
        "team1": "New York City FC",
        "team2": "Los Angeles FC",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Bologna x Inter",
        "team1": "Bologna",
        "team2": "Inter",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 128,
    "id": "bet-1792156548289-pzmvfb6rc",
    "date": "2026-10-16",
    "title": "Welwalo Adigrat University x Al Ahli Tripoli + Club Bolivar x Olimpia",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Welwalo Adigrat University x Al Ahli Tripoli",
        "team1": "Welwalo Adigrat University",
        "team2": "Al Ahli Tripoli",
        "league": "Saudi Pro League",
        "country": "Arábia Saudita",
        "score": "0-4",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Club Bolivar x Olimpia",
        "team1": "Club Bolivar",
        "team2": "Olimpia",
        "league": "División de Honor (Paraguai)",
        "country": "Paraguai",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 129,
    "id": "bet-1792156523545-5hgrapvq7",
    "date": "2026-10-16",
    "title": "St. Patrick's Athletic x Shelbourne + Larne x Coleraine + Kokand 1912 x Neftchi Fargona",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "St. Patrick's Athletic x Shelbourne",
        "team1": "St. Patrick's Athletic",
        "team2": "Shelbourne",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Larne x Coleraine",
        "team1": "Larne",
        "team2": "Coleraine",
        "league": "NIFL Premiership",
        "country": "Irlanda do Norte",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Kokand 1912 x Neftchi Fargona",
        "team1": "Kokand 1912",
        "team2": "Neftchi Fargona",
        "league": "Superliga (Uzbequistão)",
        "country": "Uzbequistão",
        "score": "2-4",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 130,
    "id": "bet-1791804460554-2rgv39ljg",
    "date": "2026-10-15",
    "title": "NEC Nijmegen x Levski Sofia + Panathinaikos x Borac Banja Luka + Riga FC x Kairat Almaty",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "NEC Nijmegen x Levski Sofia",
        "team1": "NEC Nijmegen",
        "team2": "Levski Sofia",
        "league": "UEFA Europa League",
        "country": "Europa",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Panathinaikos x Borac Banja Luka",
        "team1": "Panathinaikos",
        "team2": "Borac Banja Luka",
        "league": "UEFA Conference League",
        "country": "Europa",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Riga FC x Kairat Almaty",
        "team1": "Riga FC",
        "team2": "Kairat Almaty",
        "league": "UEFA Conference League",
        "country": "Europa",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 131,
    "id": "bet-1791804494849-ocz0yin7v",
    "date": "2026-10-15",
    "title": "FC København x Braga + CD Olimpia x Real España + Rodina x Spartak Moscow",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "FC København x Braga",
        "team1": "FC København",
        "team2": "Braga",
        "league": "Superligaen",
        "country": "Dinamarca",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "CD Olimpia x Real España",
        "team1": "CD Olimpia",
        "team2": "Real España",
        "league": "Liga Nacional (Honduras)",
        "country": "Honduras",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Rodina x Spartak Moscow",
        "team1": "Rodina",
        "team2": "Spartak Moscow",
        "league": "Cup Grp. A",
        "country": "Internacional",
        "score": "2-4",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 132,
    "id": "bet-1791804188237-rbdgmobzk",
    "date": "2026-10-12",
    "title": "Al-Wasl x Al Ahli + Al Nassr FC x Neftchi Fargona + Shamrock Rovers x Bohemian FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Al-Wasl x Al Ahli",
        "team1": "Al-Wasl",
        "team2": "Al Ahli",
        "league": "AFC Champions League Elite (Oeste)",
        "country": "Ásia",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al Nassr FC x Neftchi Fargona",
        "team1": "Al Nassr FC",
        "team2": "Neftchi Fargona",
        "league": "AFC Champions League Elite (Oeste)",
        "country": "Ásia",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shamrock Rovers x Bohemian FC",
        "team1": "Shamrock Rovers",
        "team2": "Bohemian FC",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 133,
    "id": "bet-1791596476308-jwr4bsn1k",
    "date": "2026-10-11",
    "title": "CF América x Monterrey + Pachuca x Necaxa + Pacific FC x Atlético Ottawa",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "CF América x Monterrey",
        "team1": "CF América",
        "team2": "Monterrey",
        "league": "Liga MX",
        "country": "México",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Pachuca x Necaxa",
        "team1": "Pachuca",
        "team2": "Necaxa",
        "league": "Liga MX",
        "country": "México",
        "score": "3-3",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Pacific FC x Atlético Ottawa",
        "team1": "Pacific FC",
        "team2": "Atlético Ottawa",
        "league": "Canadian Premier League",
        "country": "Canadá",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 134,
    "id": "bet-1791596413824-6asipaya5",
    "date": "2026-10-11",
    "title": "Bukovyna Chernivtsi x Polissya Zhytomyr + Imisli FK x Qarabağ FK + Lion City Sailors FC x Young Lions",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Bukovyna Chernivtsi x Polissya Zhytomyr",
        "team1": "Bukovyna Chernivtsi",
        "team2": "Polissya Zhytomyr",
        "league": "Premier League (UKR)",
        "country": "Internacional",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Imisli FK x Qarabağ FK",
        "team1": "Imisli FK",
        "team2": "Qarabağ FK",
        "league": "Premyer Liqa (Azerbaijão)",
        "country": "Azerbaijão",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Lion City Sailors FC x Young Lions",
        "team1": "Lion City Sailors FC",
        "team2": "Young Lions",
        "league": "Singapore Premier League",
        "country": "Singapura",
        "score": "6-1",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 135,
    "id": "bet-1791596501680-v0ef5pd4i",
    "date": "2026-10-11",
    "title": "Coquimbo Unido x Colo Colo + Palmeiras x Corinthians",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Coquimbo Unido x Colo Colo",
        "team1": "Coquimbo Unido",
        "team2": "Colo Colo",
        "league": "Primera División (Chile)",
        "country": "Chile",
        "score": "5-2",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Palmeiras x Corinthians",
        "team1": "Palmeiras",
        "team2": "Corinthians",
        "league": "Brasileirão Série A",
        "country": "Brasil",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 136,
    "id": "bet-1791596283916-r4bk7ttb5",
    "date": "2026-10-10",
    "title": "Tigre x Banfield + FK Tukums 2000 x Riga FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Tigre x Banfield",
        "team1": "Tigre",
        "team2": "Banfield",
        "league": "Liga Profesional",
        "country": "Internacional",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FK Tukums 2000 x Riga FC",
        "team1": "FK Tukums 2000",
        "team2": "Riga FC",
        "league": "Virslīga (Letônia)",
        "country": "Letônia",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 137,
    "id": "bet-1791596131817-4io9uxq8f",
    "date": "2026-10-10",
    "title": "Los Angeles FC x Vancouver Whitecaps + Śląsk Wrocław x Lech Poznań + Jagiellonia Białystok x Górnik Zabrze",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Los Angeles FC x Vancouver Whitecaps",
        "team1": "Los Angeles FC",
        "team2": "Vancouver Whitecaps",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Śląsk Wrocław x Lech Poznań",
        "team1": "Śląsk Wrocław",
        "team2": "Lech Poznań",
        "league": "Ekstraklasa",
        "country": "Polônia",
        "score": "1-4",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Jagiellonia Białystok x Górnik Zabrze",
        "team1": "Jagiellonia Białystok",
        "team2": "Górnik Zabrze",
        "league": "Ekstraklasa",
        "country": "Polônia",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 138,
    "id": "bet-1791596154404-cdt4qtj8p",
    "date": "2026-10-10",
    "title": "Feyenoord x AZ Alkmaar + Stal Stalowa Wola x Śląsk Wrocław ll + Dorados x Cruz Azul Hidalgo",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Feyenoord x AZ Alkmaar",
        "team1": "Feyenoord",
        "team2": "AZ Alkmaar",
        "league": "Eredivisie",
        "country": "Holanda",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Stal Stalowa Wola x Śląsk Wrocław ll",
        "team1": "Stal Stalowa Wola",
        "team2": "Śląsk Wrocław ll",
        "league": "II Liga (3ª Divisão)",
        "country": "Polônia",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Dorados x Cruz Azul Hidalgo",
        "team1": "Dorados",
        "team2": "Cruz Azul Hidalgo",
        "league": "Liga MX",
        "country": "México",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 139,
    "id": "bet-1791596192146-q62abhqgq",
    "date": "2026-10-10",
    "title": "Ready x Union Carl Berner + Krylya Sovetov Samara x Spartak Moscow + FC Krasnodar x Zenit St. Petersburg",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Ready x Union Carl Berner",
        "team1": "Ready",
        "team2": "Union Carl Berner",
        "league": "3. Divisjon Avd. 1",
        "country": "Internacional",
        "score": "4-0",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Krylya Sovetov Samara x Spartak Moscow",
        "team1": "Krylya Sovetov Samara",
        "team2": "Spartak Moscow",
        "league": "Russian Premier League",
        "country": "Internacional",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Krasnodar x Zenit St. Petersburg",
        "team1": "FC Krasnodar",
        "team2": "Zenit St. Petersburg",
        "league": "Russian Premier League",
        "country": "Internacional",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 140,
    "id": "bet-1790204533902-33hnglfoq",
    "date": "2026-09-26",
    "title": "Cruz Azul Hidalgo x Leones Negros + Sportivo Trinidense x Cerro Porteño + Cruz Azul x Toluca",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Cruz Azul Hidalgo x Leones Negros",
        "team1": "Cruz Azul Hidalgo",
        "team2": "Leones Negros",
        "league": "Liga MX",
        "country": "México",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sportivo Trinidense x Cerro Porteño",
        "team1": "Sportivo Trinidense",
        "team2": "Cerro Porteño",
        "league": "División de Honor (Paraguai)",
        "country": "Paraguai",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cruz Azul x Toluca",
        "team1": "Cruz Azul",
        "team2": "Toluca",
        "league": "Liga MX",
        "country": "México",
        "score": "3-3",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 141,
    "id": "bet-1789824268986-aqijlgpmd",
    "date": "2026-09-20",
    "title": "Pohang Steelers x FC Seoul + Panetolikos x PAOK Thessaloniki + Persijap Jepara x Persib Bandung",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Pohang Steelers x FC Seoul",
        "team1": "Pohang Steelers",
        "team2": "FC Seoul",
        "league": "K League 1",
        "country": "Coreia do Sul",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Panetolikos x PAOK Thessaloniki",
        "team1": "Panetolikos",
        "team2": "PAOK Thessaloniki",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Persijap Jepara x Persib Bandung",
        "team1": "Persijap Jepara",
        "team2": "Persib Bandung",
        "league": "Liga 1 (Indonésia)",
        "country": "Indonésia",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 142,
    "id": "bet-1789824196289-8x6zlyed4",
    "date": "2026-09-20",
    "title": "Rijeka x Hajduk Split + Dinamo Zagreb x NK Lokomotiva",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Rijeka x Hajduk Split",
        "team1": "Rijeka",
        "team2": "Hajduk Split",
        "league": "HNL (1. HNL)",
        "country": "Croácia",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Dinamo Zagreb x NK Lokomotiva",
        "team1": "Dinamo Zagreb",
        "team2": "NK Lokomotiva",
        "league": "HNL (1. HNL)",
        "country": "Croácia",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 143,
    "id": "bet-1789773939402-bxjswwdwo",
    "date": "2026-09-20",
    "title": "Fulham x Manchester United + Marseille x Paris Saint-Germain + Fiorentina x Napoli",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Fulham x Manchester United",
        "team1": "Fulham",
        "team2": "Manchester United",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Marseille x Paris Saint-Germain",
        "team1": "Marseille",
        "team2": "Paris Saint-Germain",
        "league": "Ligue 1",
        "country": "França",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Fiorentina x Napoli",
        "team1": "Fiorentina",
        "team2": "Napoli",
        "league": "Liga Internacional",
        "country": "Internacional",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 144,
    "id": "bet-1789774251889-242u6ctln",
    "date": "2026-09-19",
    "title": "Universitatea Craiova x FCSB + VPS x KuPS + Hatta x Shabab Al-Ahli Dubai FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Universitatea Craiova x FCSB",
        "team1": "Universitatea Craiova",
        "team2": "FCSB",
        "league": "SuperLiga (Romênia)",
        "country": "Romênia",
        "score": "5-0",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "VPS x KuPS",
        "team1": "VPS",
        "team2": "KuPS",
        "league": "Veikkausliiga",
        "country": "Finlândia",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Hatta x Shabab Al-Ahli Dubai FC",
        "team1": "Hatta",
        "team2": "Shabab Al-Ahli Dubai FC",
        "league": "Qatar Stars League",
        "country": "Catar",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 145,
    "id": "bet-1789389576770-jx7h87mht",
    "date": "2026-09-18",
    "title": "Omonia 29 Maiou x AEK Larnaca + Pafos FC x AEL Limassol + Puskás FC Academy x Kispest Honvéd",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Omonia 29 Maiou x AEK Larnaca",
        "team1": "Omonia 29 Maiou",
        "team2": "AEK Larnaca",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Pafos FC x AEL Limassol",
        "team1": "Pafos FC",
        "team2": "AEL Limassol",
        "league": "Cyprus First Division",
        "country": "Chipre",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Puskás FC Academy x Kispest Honvéd",
        "team1": "Puskás FC Academy",
        "team2": "Kispest Honvéd",
        "league": "NB I (Nemzeti Bajnokság)",
        "country": "Hungria",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 146,
    "id": "bet-1789389688378-p0kh6mqu4",
    "date": "2026-09-18",
    "title": "Shamrock Rovers x Waterford FC + KPV x KuPS Akatemia",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Shamrock Rovers x Waterford FC",
        "team1": "Shamrock Rovers",
        "team2": "Waterford FC",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (Shamrock Rovers)"
      },
      {
        "matchTitle": "KPV x KuPS Akatemia",
        "team1": "KPV",
        "team2": "KuPS Akatemia",
        "league": "Veikkausliiga",
        "country": "Finlândia",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 147,
    "id": "bet-1789389056846-zhi5y22gc",
    "date": "2026-09-16",
    "title": "Olympiacos x Jagiellonia Białystok + Manchester United x Brighton & Hove Albion + FC Differdange 03 x Swift Hesperange",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Olympiacos x Jagiellonia Białystok",
        "team1": "Olympiacos",
        "team2": "Jagiellonia Białystok",
        "league": "Ekstraklasa",
        "country": "Polônia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Manchester United x Brighton & Hove Albion",
        "team1": "Manchester United",
        "team2": "Brighton & Hove Albion",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Differdange 03 x Swift Hesperange",
        "team1": "FC Differdange 03",
        "team2": "Swift Hesperange",
        "league": "National Division (BGL Ligue)",
        "country": "Luxemburgo",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 148,
    "id": "bet-1789389143880-oplubjibb",
    "date": "2026-09-16",
    "title": "Sloga Doboj x Borac Banja Luka + Thun x Servette + Al-Wahda x Kuwait SC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Sloga Doboj x Borac Banja Luka",
        "team1": "Sloga Doboj",
        "team2": "Borac Banja Luka",
        "league": "Premijer Liga (Bósnia)",
        "country": "Bósnia e Herzegovina",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Thun x Servette",
        "team1": "Thun",
        "team2": "Servette",
        "league": "Swiss Super League",
        "country": "Suíça",
        "score": "2-4",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Wahda x Kuwait SC",
        "team1": "Al-Wahda",
        "team2": "Kuwait SC",
        "league": "UAE Pro League",
        "country": "Emirados Árabes",
        "score": "3-2",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 149,
    "id": "bet-1789388487220-0xph72ss6",
    "date": "2026-09-15",
    "title": "Liverpool x Tottenham Hotspur + Ratchaburi FC x Shanghai Port + Beijing Guoan x Pohang Steelers",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Liverpool x Tottenham Hotspur",
        "team1": "Liverpool",
        "team2": "Tottenham Hotspur",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Ratchaburi FC x Shanghai Port",
        "team1": "Ratchaburi FC",
        "team2": "Shanghai Port",
        "league": "Chinese Super League",
        "country": "China",
        "score": "4-6",
        "totalGoals": 10,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Beijing Guoan x Pohang Steelers",
        "team1": "Beijing Guoan",
        "team2": "Pohang Steelers",
        "league": "Chinese Super League",
        "country": "China",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 150,
    "id": "bet-1789387696938-b4rop0e7o",
    "date": "2026-09-14",
    "title": "Sirius x Degerfors + Montevideo City Torque x Liverpool FC + Dynamo Kyiv x Epitsentr Kamianets-Podilskyi",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Sirius x Degerfors",
        "team1": "Sirius",
        "team2": "Degerfors",
        "league": "Allsvenskan",
        "country": "Suécia",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (Sirius)"
      },
      {
        "matchTitle": "Montevideo City Torque x Liverpool FC",
        "team1": "Montevideo City Torque",
        "team2": "Liverpool FC",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (Montevideo City Torque)"
      },
      {
        "matchTitle": "Dynamo Kyiv x Epitsentr Kamianets-Podilskyi",
        "team1": "Dynamo Kyiv",
        "team2": "Epitsentr Kamianets-Podilskyi",
        "league": "Liga Internacional",
        "country": "Internacional",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (Dynamo Kyiv)"
      }
    ]
  },
  {
    "ticketNumber": 151,
    "id": "bet-1789216328538-k9rgtzlf4",
    "date": "2026-09-13",
    "title": "Viktoria Plzeň x Sigma Olomouc + Sturm Graz x LASK + Pyramids FC x Gor Mahia",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Viktoria Plzeň x Sigma Olomouc",
        "team1": "Viktoria Plzeň",
        "team2": "Sigma Olomouc",
        "league": "Chance Liga (1. Liga)",
        "country": "República Tcheca",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sturm Graz x LASK",
        "team1": "Sturm Graz",
        "team2": "LASK",
        "league": "ÖFB-Cup",
        "country": "Áustria",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Pyramids FC x Gor Mahia",
        "team1": "Pyramids FC",
        "team2": "Gor Mahia",
        "league": "CAF Champions League",
        "country": "África",
        "score": "5-1",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 152,
    "id": "bet-1789087774773-12j8xtm4k",
    "date": "2026-09-13",
    "title": "Rangers x Celtic + Cruz Azul x CF América + BFC Daugavpils x RFS",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Rangers x Celtic",
        "team1": "Rangers",
        "team2": "Celtic",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Cruz Azul x CF América",
        "team1": "Cruz Azul",
        "team2": "CF América",
        "league": "Liga MX",
        "country": "México",
        "score": "4-3",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "BFC Daugavpils x RFS",
        "team1": "BFC Daugavpils",
        "team2": "RFS",
        "league": "Virslīga (Letônia)",
        "country": "Letônia",
        "score": "1-2",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 153,
    "id": "bet-1789214479027-n8hce3jhx",
    "date": "2026-09-12",
    "title": "Sunderland x Arsenal + Górnik Zabrze x Lech Poznań",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Sunderland x Arsenal",
        "team1": "Sunderland",
        "team2": "Arsenal",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Górnik Zabrze x Lech Poznań",
        "team1": "Górnik Zabrze",
        "team2": "Lech Poznań",
        "league": "Ekstraklasa",
        "country": "Polônia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 154,
    "id": "bet-1789215398039-e95o0hvvw",
    "date": "2026-09-12",
    "title": "Guaraní x Cerro Porteño + Palestino x Universidad Católica + LDU de Quito x Deportivo Cuenca",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Guaraní x Cerro Porteño",
        "team1": "Guaraní",
        "team2": "Cerro Porteño",
        "league": "División de Honor (Paraguai)",
        "country": "Paraguai",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Palestino x Universidad Católica",
        "team1": "Palestino",
        "team2": "Universidad Católica",
        "league": "Primera División (Chile)",
        "country": "Chile",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "LDU de Quito x Deportivo Cuenca",
        "team1": "LDU de Quito",
        "team2": "Deportivo Cuenca",
        "league": "Liga Pro Serie A",
        "country": "Equador",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 155,
    "id": "bet-1789214675399-rg4glnjti",
    "date": "2026-09-12",
    "title": "Portadown x Larne + Sepsi OSK x CFR Cluj + Forge FC x Atlético Ottawa",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Portadown x Larne",
        "team1": "Portadown",
        "team2": "Larne",
        "league": "NIFL Premiership",
        "country": "Irlanda do Norte",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sepsi OSK x CFR Cluj",
        "team1": "Sepsi OSK",
        "team2": "CFR Cluj",
        "league": "SuperLiga (Romênia)",
        "country": "Romênia",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Forge FC x Atlético Ottawa",
        "team1": "Forge FC",
        "team2": "Atlético Ottawa",
        "league": "Canadian Premier League",
        "country": "Canadá",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 156,
    "id": "bet-1788833477782-y15kcfg3y",
    "date": "2026-09-11",
    "title": "St. Patrick's Athletic x Shamrock Rovers + Barry Town x Llandudno FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "St. Patrick's Athletic x Shamrock Rovers",
        "team1": "St. Patrick's Athletic",
        "team2": "Shamrock Rovers",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Barry Town x Llandudno FC",
        "team1": "Barry Town",
        "team2": "Llandudno FC",
        "league": "Cymru Premier",
        "country": "País de Gales",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 157,
    "id": "bet-1789086755967-oirgwq6p2",
    "date": "2026-09-11",
    "title": "Vissel Kobe x Kashima Antlers + St. Patrick's Athletic x Shamrock Rovers + Tampines Rovers FC x Balestier Khalsa FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Vissel Kobe x Kashima Antlers",
        "team1": "Vissel Kobe",
        "team2": "Kashima Antlers",
        "league": "J1 League",
        "country": "Japão",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (Vissel Kobe)"
      },
      {
        "matchTitle": "St. Patrick's Athletic x Shamrock Rovers",
        "team1": "St. Patrick's Athletic",
        "team2": "Shamrock Rovers",
        "league": "League of Ireland Premier",
        "country": "Irlanda",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (St. Patrick's Athletic)"
      },
      {
        "matchTitle": "Tampines Rovers FC x Balestier Khalsa FC",
        "team1": "Tampines Rovers FC",
        "team2": "Balestier Khalsa FC",
        "league": "Singapore Premier League",
        "country": "Singapura",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (Tampines Rovers FC)"
      }
    ]
  },
  {
    "ticketNumber": 158,
    "id": "bet-1788833217529-fn65q2uho",
    "date": "2026-09-11",
    "title": "Vissel Kobe x Kashima Antlers + Airbus UK Broughton x The New Saints + Tampines Rovers FC x Balestier Khalsa FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Vissel Kobe x Kashima Antlers",
        "team1": "Vissel Kobe",
        "team2": "Kashima Antlers",
        "league": "J1 League",
        "country": "Japão",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Airbus UK Broughton x The New Saints",
        "team1": "Airbus UK Broughton",
        "team2": "The New Saints",
        "league": "Cymru Premier",
        "country": "País de Gales",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Tampines Rovers FC x Balestier Khalsa FC",
        "team1": "Tampines Rovers FC",
        "team2": "Balestier Khalsa FC",
        "league": "Singapore Premier League",
        "country": "Singapura",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 159,
    "id": "bet-1789086795324-gmpmhqs92",
    "date": "2026-09-11",
    "title": "Boca Juniors x Central Córdoba de Santiago + Airbus UK Broughton x The New Saints + Barry Town x Llandudno FC",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Boca Juniors x Central Córdoba de Santiago",
        "team1": "Boca Juniors",
        "team2": "Central Córdoba de Santiago",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "3-1",
        "totalGoals": 4,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (Boca Juniors)"
      },
      {
        "matchTitle": "Airbus UK Broughton x The New Saints",
        "team1": "Airbus UK Broughton",
        "team2": "The New Saints",
        "league": "Cymru Premier",
        "country": "País de Gales",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Barry Town x Llandudno FC",
        "team1": "Barry Town",
        "team2": "Llandudno FC",
        "league": "Cymru Premier",
        "country": "País de Gales",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "HOME_WIN",
        "marketLabel": "Vitória da casa (Barry Town)"
      }
    ]
  },
  {
    "ticketNumber": 160,
    "id": "bet-1788833081751-qv2kqybn7",
    "date": "2026-09-10",
    "title": "Bayern München x Bodø/Glimt + FC Motagua x Alianza FC + IFK Haninge BRB x Djurgården",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Bayern München x Bodø/Glimt",
        "team1": "Bayern München",
        "team2": "Bodø/Glimt",
        "league": "Bundesliga",
        "country": "Alemanha",
        "score": "5-0",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Motagua x Alianza FC",
        "team1": "FC Motagua",
        "team2": "Alianza FC",
        "league": "Primera División (El Salvador)",
        "country": "El Salvador",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "IFK Haninge BRB x Djurgården",
        "team1": "IFK Haninge BRB",
        "team2": "Djurgården",
        "league": "Svenska Cupen",
        "country": "Suécia",
        "score": "1-7",
        "totalGoals": 8,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 161,
    "id": "bet-1788832766831-42p5to57i",
    "date": "2026-09-09",
    "title": "Al Mokawloon Al Arab x Al Ahly SC + Azam FC x Simba SC + Levski Sofia x CSKA Sofia",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Al Mokawloon Al Arab x Al Ahly SC",
        "team1": "Al Mokawloon Al Arab",
        "team2": "Al Ahly SC",
        "league": "Liga Internacional",
        "country": "Internacional",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Azam FC x Simba SC",
        "team1": "Azam FC",
        "team2": "Simba SC",
        "league": "Ligi Kuu Bara (Premier League)",
        "country": "Tanzânia",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Levski Sofia x CSKA Sofia",
        "team1": "Levski Sofia",
        "team2": "CSKA Sofia",
        "league": "First League (Bulgária)",
        "country": "Bulgária",
        "score": "2-4",
        "totalGoals": 6,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 162,
    "id": "bet-1788832428154-2bjt6dcgm",
    "date": "2026-09-08",
    "title": "Club Brugge x Aston Villa + FC Porto x Manchester City + Real Madrid x Inter",
    "odd": 2,
    "amount": 20,
    "profit": 20,
    "status": "Ganha",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 3,
    "redLegsCount": 0,
    "pendingLegsCount": 0,
    "legs": [
      {
        "matchTitle": "Club Brugge x Aston Villa",
        "team1": "Club Brugge",
        "team2": "Aston Villa",
        "league": "Liga Internacional",
        "country": "Internacional",
        "score": "2-3",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FC Porto x Manchester City",
        "team1": "FC Porto",
        "team2": "Manchester City",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-2",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Real Madrid x Inter",
        "team1": "Real Madrid",
        "team2": "Inter",
        "league": "La Liga",
        "country": "Espanha",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 163,
    "id": "bet-1794274647277-0uc3zmh2d",
    "date": "2026-11-25",
    "title": "Paris Saint-Germain x Roma + Shakhtar Donetsk x Fenerbahçe + Sporting CP x Manchester United",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 3,
    "legs": [
      {
        "matchTitle": "Paris Saint-Germain x Roma",
        "team1": "Paris Saint-Germain",
        "team2": "Roma",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shakhtar Donetsk x Fenerbahçe",
        "team1": "Shakhtar Donetsk",
        "team2": "Fenerbahçe",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sporting CP x Manchester United",
        "team1": "Sporting CP",
        "team2": "Manchester United",
        "league": "UEFA Champions League",
        "country": "Europa",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 164,
    "id": "bet-1794274633603-c0r5pgcmm",
    "date": "2026-11-22",
    "title": "UTA Arad x Universitatea Craiova + Nordsjælland x FC København + Sirius x Djurgården",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 0,
    "pendingLegsCount": 2,
    "legs": [
      {
        "matchTitle": "UTA Arad x Universitatea Craiova",
        "team1": "UTA Arad",
        "team2": "Universitatea Craiova",
        "league": "SuperLiga (Romênia)",
        "country": "Romênia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Nordsjælland x FC København",
        "team1": "Nordsjælland",
        "team2": "FC København",
        "league": "Superligaen",
        "country": "Dinamarca",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sirius x Djurgården",
        "team1": "Sirius",
        "team2": "Djurgården",
        "league": "Allsvenskan",
        "country": "Suécia",
        "score": "1-1",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 165,
    "id": "bet-1794274602424-mmejd2i0h",
    "date": "2026-11-22",
    "title": "Paris FC x Angers + Kortrijk x Union St.Gilloise + Dynamo Kyiv x Obolon Kyiv",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 3,
    "legs": [
      {
        "matchTitle": "Paris FC x Angers",
        "team1": "Paris FC",
        "team2": "Angers",
        "league": "Ligue 1",
        "country": "França",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Kortrijk x Union St.Gilloise",
        "team1": "Kortrijk",
        "team2": "Union St.Gilloise",
        "league": "Belgian Pro League",
        "country": "Internacional",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Dynamo Kyiv x Obolon Kyiv",
        "team1": "Dynamo Kyiv",
        "team2": "Obolon Kyiv",
        "league": "Premier League (UKR)",
        "country": "Internacional",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 166,
    "id": "bet-1794274665931-vje38w2kc",
    "date": "2026-11-22",
    "title": "Real Potosí x Bolívar + The Strongest x Blooming",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 2,
    "legs": [
      {
        "matchTitle": "Real Potosí x Bolívar",
        "team1": "Real Potosí",
        "team2": "Bolívar",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "The Strongest x Blooming",
        "team1": "The Strongest",
        "team2": "Blooming",
        "league": "División Profesional (Bolívia)",
        "country": "Bolívia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 167,
    "id": "bet-1794274617891-cb1jsflf6",
    "date": "2026-11-22",
    "title": "Araz PFK x FK Neftchi + Inter San Carlos x Sporting FC + KF Shkendija x FK Sileks",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 3,
    "legs": [
      {
        "matchTitle": "Araz PFK x FK Neftchi",
        "team1": "Araz PFK",
        "team2": "FK Neftchi",
        "league": "Premier League (AZE)",
        "country": "Internacional",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Inter San Carlos x Sporting FC",
        "team1": "Inter San Carlos",
        "team2": "Sporting FC",
        "league": "Primera Division Apertura",
        "country": "Internacional",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "KF Shkendija x FK Sileks",
        "team1": "KF Shkendija",
        "team2": "FK Sileks",
        "league": "Prva Liga (Macedônia do Norte)",
        "country": "Macedônia do Norte",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 168,
    "id": "bet-1794274550395-fzojxgyjw",
    "date": "2026-11-21",
    "title": "Tekstilshchik x Arsenal Tula + Arsenal Dzerzhinsk x Neman Grodno + BSK Banja Luka x Zrinjski Mostar",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 3,
    "legs": [
      {
        "matchTitle": "Tekstilshchik x Arsenal Tula",
        "team1": "Tekstilshchik",
        "team2": "Arsenal Tula",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Arsenal Dzerzhinsk x Neman Grodno",
        "team1": "Arsenal Dzerzhinsk",
        "team2": "Neman Grodno",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "BSK Banja Luka x Zrinjski Mostar",
        "team1": "BSK Banja Luka",
        "team2": "Zrinjski Mostar",
        "league": "Premijer Liga (Bósnia)",
        "country": "Bósnia e Herzegovina",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 169,
    "id": "bet-1794274511613-tggc4gct0",
    "date": "2026-11-21",
    "title": "Newcastle United x Arsenal + Nice x Paris Saint-Germain + OFK Mladost Donja Gorica x FK Arsenal Tivat",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 3,
    "legs": [
      {
        "matchTitle": "Newcastle United x Arsenal",
        "team1": "Newcastle United",
        "team2": "Arsenal",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Nice x Paris Saint-Germain",
        "team1": "Nice",
        "team2": "Paris Saint-Germain",
        "league": "Ligue 1",
        "country": "França",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "OFK Mladost Donja Gorica x FK Arsenal Tivat",
        "team1": "OFK Mladost Donja Gorica",
        "team2": "FK Arsenal Tivat",
        "league": "Premier League",
        "country": "Inglaterra",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 170,
    "id": "bet-1794274567653-qi1vvguxj",
    "date": "2026-11-21",
    "title": "FK Vardar Skopje x GFK Tikves Kavadarci + Sion x Servette + CFR Cluj x Oțelul Galați",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 0,
    "pendingLegsCount": 2,
    "legs": [
      {
        "matchTitle": "FK Vardar Skopje x GFK Tikves Kavadarci",
        "team1": "FK Vardar Skopje",
        "team2": "GFK Tikves Kavadarci",
        "league": "Prva Liga (Macedônia do Norte)",
        "country": "Macedônia do Norte",
        "score": "7-0",
        "totalGoals": 7,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sion x Servette",
        "team1": "Sion",
        "team2": "Servette",
        "league": "Swiss Super League",
        "country": "Suíça",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "CFR Cluj x Oțelul Galați",
        "team1": "CFR Cluj",
        "team2": "Oțelul Galați",
        "league": "SuperLiga (Romênia)",
        "country": "Romênia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 171,
    "id": "bet-1794274476519-0pbayqdq1",
    "date": "2026-11-20",
    "title": "Beijing Guoan x Shanghai Port + Shakhtar Donetsk x Liviy Bereh + The New Saints x Trefelin BGC",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 1,
    "redLegsCount": 0,
    "pendingLegsCount": 2,
    "legs": [
      {
        "matchTitle": "Beijing Guoan x Shanghai Port",
        "team1": "Beijing Guoan",
        "team2": "Shanghai Port",
        "league": "Copa da China (CFA Cup)",
        "country": "China",
        "score": "2-2",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Shakhtar Donetsk x Liviy Bereh",
        "team1": "Shakhtar Donetsk",
        "team2": "Liviy Bereh",
        "league": "Premier League (UKR)",
        "country": "Internacional",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "The New Saints x Trefelin BGC",
        "team1": "The New Saints",
        "team2": "Trefelin BGC",
        "league": "Cymru Premier",
        "country": "País de Gales",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 172,
    "id": "bet-1794274493627-iwja1xkit",
    "date": "2026-11-20",
    "title": "Stellenbosch FC x Orlando Pirates + Mačva Šabac x Vojvodina + FK Crvena Zvezda x FK Radnik Surdulica",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 3,
    "legs": [
      {
        "matchTitle": "Stellenbosch FC x Orlando Pirates",
        "team1": "Stellenbosch FC",
        "team2": "Orlando Pirates",
        "league": "League Cup",
        "country": "Internacional",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Mačva Šabac x Vojvodina",
        "team1": "Mačva Šabac",
        "team2": "Vojvodina",
        "league": "Super Liga",
        "country": "Internacional",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "FK Crvena Zvezda x FK Radnik Surdulica",
        "team1": "FK Crvena Zvezda",
        "team2": "FK Radnik Surdulica",
        "league": "SuperLiga (Sérvia)",
        "country": "Sérvia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 173,
    "id": "bet-1794274457385-2sfgvfw3b",
    "date": "2026-11-19",
    "title": "Al-Ain x Al-Dhafra + Al-Ahli x Al-Shamal + Al Ahli x Al-Faisaly",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 3,
    "legs": [
      {
        "matchTitle": "Al-Ain x Al-Dhafra",
        "team1": "Al-Ain",
        "team2": "Al-Dhafra",
        "league": "UAE Pro League",
        "country": "Emirados Árabes",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al-Ahli x Al-Shamal",
        "team1": "Al-Ahli",
        "team2": "Al-Shamal",
        "league": "Qatar Stars League",
        "country": "Catar",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Al Ahli x Al-Faisaly",
        "team1": "Al Ahli",
        "team2": "Al-Faisaly",
        "league": "Saudi Pro League",
        "country": "Arábia Saudita",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 174,
    "id": "bet-1794274370488-wvuug6zbs",
    "date": "2026-11-14",
    "title": "Temperley x Ciudad de Bolívar + Hatta x Al-Ain",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 2,
    "greenLegsCount": 0,
    "redLegsCount": 0,
    "pendingLegsCount": 2,
    "legs": [
      {
        "matchTitle": "Temperley x Ciudad de Bolívar",
        "team1": "Temperley",
        "team2": "Ciudad de Bolívar",
        "league": "Primera Nacional (Argentina)",
        "country": "Argentina",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Hatta x Al-Ain",
        "team1": "Hatta",
        "team2": "Al-Ain",
        "league": "UAE Pro League",
        "country": "Emirados Árabes",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 175,
    "id": "bet-1793526965843-eb9k8pf1s",
    "date": "2026-11-01",
    "title": "Supra du Québec x Cavalry FC + Independiente del Valle x LDU de Quito + Rangers x Partick Thistle",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 1,
    "legs": [
      {
        "matchTitle": "Supra du Québec x Cavalry FC",
        "team1": "Supra du Québec",
        "team2": "Cavalry FC",
        "league": "Canadian Premier League",
        "country": "Canadá",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Independiente del Valle x LDU de Quito",
        "team1": "Independiente del Valle",
        "team2": "LDU de Quito",
        "league": "Liga Profesional",
        "country": "Argentina",
        "score": "2-0",
        "totalGoals": 2,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Rangers x Partick Thistle",
        "team1": "Rangers",
        "team2": "Partick Thistle",
        "league": "Scottish Premiership",
        "country": "Escócia",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 176,
    "id": "bet-1793155247319-mor165znb",
    "date": "2026-10-28",
    "title": "Vancouver Whitecaps x San Diego FC + Sandnes Ulf x Bodø/Glimt + Panathinaikos x Aris Thessaloniki",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 1,
    "legs": [
      {
        "matchTitle": "Vancouver Whitecaps x San Diego FC",
        "team1": "Vancouver Whitecaps",
        "team2": "San Diego FC",
        "league": "Major League Soccer (MLS)",
        "country": "Estados Unidos",
        "score": "4-1",
        "totalGoals": 5,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Sandnes Ulf x Bodø/Glimt",
        "team1": "Sandnes Ulf",
        "team2": "Bodø/Glimt",
        "league": "NM Cup (Copa da Noruega)",
        "country": "Noruega",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Panathinaikos x Aris Thessaloniki",
        "team1": "Panathinaikos",
        "team2": "Aris Thessaloniki",
        "league": "Super League Grécia",
        "country": "Grécia",
        "score": "2-1",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  },
  {
    "ticketNumber": 177,
    "id": "bet-1792541169320-508uvg7k9",
    "date": "2026-10-21",
    "title": "Lion City Sailors FC x Tampines Rovers FC + Colo Colo x Caracas FC + Rasisalai United x Port FC",
    "odd": 2,
    "amount": 20,
    "profit": 0,
    "status": "Pendente",
    "format": "Múltipla",
    "totalLegsCount": 3,
    "greenLegsCount": 2,
    "redLegsCount": 0,
    "pendingLegsCount": 1,
    "legs": [
      {
        "matchTitle": "Lion City Sailors FC x Tampines Rovers FC",
        "team1": "Lion City Sailors FC",
        "team2": "Tampines Rovers FC",
        "league": "Singapore Premier League",
        "country": "Singapura",
        "score": "0-0",
        "totalGoals": 0,
        "status": "pending",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Colo Colo x Caracas FC",
        "team1": "Colo Colo",
        "team2": "Caracas FC",
        "league": "Primera División (Chile)",
        "country": "Chile",
        "score": "3-0",
        "totalGoals": 3,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      },
      {
        "matchTitle": "Rasisalai United x Port FC",
        "team1": "Rasisalai United",
        "team2": "Port FC",
        "league": "Thai League 1",
        "country": "Tailândia",
        "score": "1-3",
        "totalGoals": 4,
        "status": "green",
        "market": "OVER_1_5",
        "marketLabel": "Mais de 1.5 gols"
      }
    ]
  }
];

export const MASTER_RAIO_X_LEAGUES: MasterLeagueItem[] = [
  {
    "name": "Premier League",
    "country": "Inglaterra",
    "totalMatches": 21,
    "greens": 13,
    "reds": 3,
    "pendings": 5,
    "totalGoals": 49,
    "winRate": 81.3,
    "avgGoals": 2.33,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "UEFA Champions League",
    "country": "Europa",
    "totalMatches": 17,
    "greens": 11,
    "reds": 3,
    "pendings": 3,
    "totalGoals": 50,
    "winRate": 78.6,
    "avgGoals": 2.94,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Liga MX",
    "country": "México",
    "totalMatches": 17,
    "greens": 16,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 68,
    "winRate": 94.1,
    "avgGoals": 4,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Scottish Premiership",
    "country": "Escócia",
    "totalMatches": 13,
    "greens": 8,
    "reds": 4,
    "pendings": 1,
    "totalGoals": 33,
    "winRate": 66.7,
    "avgGoals": 2.54,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Liga Profesional",
    "country": "Argentina",
    "totalMatches": 12,
    "greens": 9,
    "reds": 2,
    "pendings": 1,
    "totalGoals": 32,
    "winRate": 81.8,
    "avgGoals": 2.67,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Major League Soccer (MLS)",
    "country": "Estados Unidos",
    "totalMatches": 12,
    "greens": 12,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 39,
    "winRate": 100,
    "avgGoals": 3.25,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Premyer Liqa (Azerbaijão)",
    "country": "Azerbaijão",
    "totalMatches": 11,
    "greens": 7,
    "reds": 4,
    "pendings": 0,
    "totalGoals": 27,
    "winRate": 63.6,
    "avgGoals": 2.45,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Brasileirão Série A",
    "country": "Brasil",
    "totalMatches": 10,
    "greens": 10,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 36,
    "winRate": 100,
    "avgGoals": 3.6,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Ligi Kuu Bara (Premier League)",
    "country": "Tanzânia",
    "totalMatches": 10,
    "greens": 8,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 29,
    "winRate": 80,
    "avgGoals": 2.9,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Cyprus First Division",
    "country": "Chipre",
    "totalMatches": 10,
    "greens": 6,
    "reds": 4,
    "pendings": 0,
    "totalGoals": 25,
    "winRate": 60,
    "avgGoals": 2.5,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Ligue 1",
    "country": "França",
    "totalMatches": 9,
    "greens": 7,
    "reds": 0,
    "pendings": 2,
    "totalGoals": 26,
    "winRate": 100,
    "avgGoals": 2.89,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Premier League (Cazaquistão)",
    "country": "Cazaquistão",
    "totalMatches": 9,
    "greens": 6,
    "reds": 3,
    "pendings": 0,
    "totalGoals": 26,
    "winRate": 66.7,
    "avgGoals": 2.89,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Super League Grécia",
    "country": "Grécia",
    "totalMatches": 9,
    "greens": 8,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 32,
    "winRate": 88.9,
    "avgGoals": 3.56,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Chinese Super League",
    "country": "China",
    "totalMatches": 9,
    "greens": 6,
    "reds": 3,
    "pendings": 0,
    "totalGoals": 35,
    "winRate": 66.7,
    "avgGoals": 3.89,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "League of Ireland Premier",
    "country": "Irlanda",
    "totalMatches": 9,
    "greens": 7,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 37,
    "winRate": 77.8,
    "avgGoals": 4.11,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Bundesliga",
    "country": "Alemanha",
    "totalMatches": 8,
    "greens": 7,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 39,
    "winRate": 87.5,
    "avgGoals": 4.88,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Ekstraklasa",
    "country": "Polônia",
    "totalMatches": 8,
    "greens": 8,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 31,
    "winRate": 100,
    "avgGoals": 3.88,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Primera División (El Salvador)",
    "country": "El Salvador",
    "totalMatches": 7,
    "greens": 4,
    "reds": 3,
    "pendings": 0,
    "totalGoals": 14,
    "winRate": 57.1,
    "avgGoals": 2,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "La Liga",
    "country": "Espanha",
    "totalMatches": 7,
    "greens": 5,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 16,
    "winRate": 71.4,
    "avgGoals": 2.29,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "AFC Champions League Elite (Oeste)",
    "country": "Ásia",
    "totalMatches": 7,
    "greens": 6,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 21,
    "winRate": 85.7,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "HNL (1. HNL)",
    "country": "Croácia",
    "totalMatches": 7,
    "greens": 6,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 27,
    "winRate": 85.7,
    "avgGoals": 3.86,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Liga Nacional (Honduras)",
    "country": "Honduras",
    "totalMatches": 7,
    "greens": 5,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 19,
    "winRate": 71.4,
    "avgGoals": 2.71,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "División de Honor (Paraguai)",
    "country": "Paraguai",
    "totalMatches": 7,
    "greens": 5,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 17,
    "winRate": 71.4,
    "avgGoals": 2.43,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Saudi Pro League",
    "country": "Arábia Saudita",
    "totalMatches": 7,
    "greens": 5,
    "reds": 1,
    "pendings": 1,
    "totalGoals": 23,
    "winRate": 83.3,
    "avgGoals": 3.29,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Primera División (Chile)",
    "country": "Chile",
    "totalMatches": 7,
    "greens": 6,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 25,
    "winRate": 85.7,
    "avgGoals": 3.57,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Prva Liga (Macedônia do Norte)",
    "country": "Macedônia do Norte",
    "totalMatches": 6,
    "greens": 4,
    "reds": 1,
    "pendings": 1,
    "totalGoals": 16,
    "winRate": 80,
    "avgGoals": 2.67,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "UEFA Europa League",
    "country": "Europa",
    "totalMatches": 6,
    "greens": 3,
    "reds": 3,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 50,
    "avgGoals": 1.33,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Canadian Premier League",
    "country": "Canadá",
    "totalMatches": 6,
    "greens": 4,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 12,
    "winRate": 66.7,
    "avgGoals": 2,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Chance Liga (1. Liga)",
    "country": "República Tcheca",
    "totalMatches": 6,
    "greens": 5,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 22,
    "winRate": 83.3,
    "avgGoals": 3.67,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Liga Internacional",
    "country": "Internacional",
    "totalMatches": 6,
    "greens": 5,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 16,
    "winRate": 83.3,
    "avgGoals": 2.67,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Veikkausliiga",
    "country": "Finlândia",
    "totalMatches": 6,
    "greens": 5,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 15,
    "winRate": 83.3,
    "avgGoals": 2.5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Cymru Premier",
    "country": "País de Gales",
    "totalMatches": 6,
    "greens": 5,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 18,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Singapore Premier League",
    "country": "Singapura",
    "totalMatches": 6,
    "greens": 5,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 18,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Russian Premier League",
    "country": "Internacional",
    "totalMatches": 5,
    "greens": 5,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 20,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Premijer Liga (Bósnia)",
    "country": "Bósnia e Herzegovina",
    "totalMatches": 5,
    "greens": 4,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 12,
    "winRate": 100,
    "avgGoals": 2.4,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "SuperLiga (Romênia)",
    "country": "Romênia",
    "totalMatches": 5,
    "greens": 3,
    "reds": 0,
    "pendings": 2,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 2.6,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Superligaen",
    "country": "Dinamarca",
    "totalMatches": 5,
    "greens": 4,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 2.6,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Betri deildin (Primeira Liga)",
    "country": "Ilhas Faroe",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 13,
    "winRate": 80,
    "avgGoals": 2.6,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Premier League (UKR)",
    "country": "Internacional",
    "totalMatches": 5,
    "greens": 2,
    "reds": 1,
    "pendings": 2,
    "totalGoals": 8,
    "winRate": 66.7,
    "avgGoals": 1.6,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "CAF Champions League",
    "country": "África",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 17,
    "winRate": 80,
    "avgGoals": 3.4,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Eliteserien",
    "country": "Noruega",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 14,
    "winRate": 80,
    "avgGoals": 2.8,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "J1 League",
    "country": "Japão",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 14,
    "winRate": 80,
    "avgGoals": 2.8,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Allsvenskan",
    "country": "Suécia",
    "totalMatches": 5,
    "greens": 3,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 60,
    "avgGoals": 1.6,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Qatar Stars League",
    "country": "Catar",
    "totalMatches": 5,
    "greens": 3,
    "reds": 1,
    "pendings": 1,
    "totalGoals": 15,
    "winRate": 75,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "NIFL Premiership",
    "country": "Irlanda do Norte",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 15,
    "winRate": 80,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Eredivisie",
    "country": "Holanda",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 12,
    "winRate": 80,
    "avgGoals": 2.4,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Primera Nacional (Argentina)",
    "country": "Argentina",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 1.75,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "V-League 1",
    "country": "Vietnã",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 50,
    "avgGoals": 2,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "AFC Champions League Elite (Leste)",
    "country": "Ásia",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 7,
    "winRate": 50,
    "avgGoals": 1.75,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Süper Lig (Turquia)",
    "country": "Turquia",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 15,
    "winRate": 75,
    "avgGoals": 3.75,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Iraq Stars League",
    "country": "Iraque",
    "totalMatches": 4,
    "greens": 1,
    "reds": 3,
    "pendings": 0,
    "totalGoals": 5,
    "winRate": 25,
    "avgGoals": 1.25,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "NB I (Nemzeti Bajnokság)",
    "country": "Hungria",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 3.25,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Virslīga (Letônia)",
    "country": "Letônia",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 9,
    "winRate": 75,
    "avgGoals": 2.25,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "ÖFB-Cup",
    "country": "Áustria",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 19,
    "winRate": 100,
    "avgGoals": 4.75,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "SuperLiga (Sérvia)",
    "country": "Sérvia",
    "totalMatches": 4,
    "greens": 2,
    "reds": 1,
    "pendings": 1,
    "totalGoals": 10,
    "winRate": 66.7,
    "avgGoals": 2.5,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "K League 1",
    "country": "Coreia do Sul",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 11,
    "winRate": 75,
    "avgGoals": 2.75,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "UAE Pro League",
    "country": "Emirados Árabes",
    "totalMatches": 4,
    "greens": 2,
    "reds": 0,
    "pendings": 2,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 1.75,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Swiss Super League",
    "country": "Suíça",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Superliga (Uzbequistão)",
    "country": "Uzbequistão",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 33.3,
    "avgGoals": 2.67,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Kategoria Superiore",
    "country": "Albânia",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 6,
    "winRate": 66.7,
    "avgGoals": 2,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Primera A (Liga BetPlay)",
    "country": "Colômbia",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 7,
    "winRate": 33.3,
    "avgGoals": 2.33,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Copa do Egito",
    "country": "Egito",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 6,
    "winRate": 66.7,
    "avgGoals": 2,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Super Liga (Moldávia)",
    "country": "Moldávia",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 3.67,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "National League North",
    "country": "Inglaterra",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 66.7,
    "avgGoals": 2.67,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "First League (Bulgária)",
    "country": "Bulgária",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 9,
    "winRate": 66.7,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "League Cup",
    "country": "Internacional",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 2,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "División Profesional (Bolívia)",
    "country": "Bolívia",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "A Lyga (Lituânia)",
    "country": "Lituânia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Botola Pro",
    "country": "Marrocos",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 50,
    "avgGoals": 1.5,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Copa da Rússia",
    "country": "Rússia",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Ghana Premier League",
    "country": "Gana",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 50,
    "avgGoals": 2,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Niké Liga",
    "country": "Eslováquia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Ligat ha'Al (Premier League)",
    "country": "Israel",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 5.5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Egyptian Premier League",
    "country": "Internacional",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Primera División (Uruguai)",
    "country": "Uruguai",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "AFC Challenge League",
    "country": "Ásia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Thai League 1",
    "country": "Tailândia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "USL Championship",
    "country": "Estados Unidos",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 50,
    "avgGoals": 2,
    "classification": "EVITAR",
    "tierLabel": "Alto Risco (Evitar)",
    "recommendationNote": "Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5."
  },
  {
    "name": "Regionalliga Nordost",
    "country": "Alemanha",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Liga 1 (Indonésia)",
    "country": "Indonésia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Premier League (Bangladesh)",
    "country": "Bangladesh",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 4.5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "Liga Portugal",
    "country": "Internacional",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "II Liga (3ª Divisão)",
    "country": "Polônia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "National Division (BGL Ligue)",
    "country": "Luxemburgo",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "UEFA Conference League",
    "country": "Europa",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "classification": "RECOMENDADA",
    "tierLabel": "Alta Assertividade (Tier Ouro)",
    "recommendationNote": "Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca."
  },
  {
    "name": "EFL Championship",
    "country": "Inglaterra",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Copa do Brasil",
    "country": "Brasil",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Copa da Polônia (Puchar Polski)",
    "country": "Polônia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Taça da Liga",
    "country": "Portugal",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Kuwait Premier League",
    "country": "Kuwait",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "First League",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Indian Super League",
    "country": "Índia",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Liga Portugal",
    "country": "Portugal",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Copa Libertadores Femenina",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Copa da Bulgária",
    "country": "Bulgária",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Taça de Portugal",
    "country": "Portugal",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Besta deildin",
    "country": "Islândia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Cup Grp. C",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "ADIB League Cup",
    "country": "Emirados Árabes",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Copa da Croácia",
    "country": "Croácia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Ligue 1",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "NB I",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Premier Soccer League",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Eerste Divisie",
    "country": "Holanda",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Copa da Ucrânia",
    "country": "Ucrânia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "KNVB Beker",
    "country": "Holanda",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 8,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "A-League",
    "country": "Austrália",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Premium liiga",
    "country": "Estônia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "CAF Confed Cup - 2nd Preliminary Round",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "1. Liga",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Qatar Stars League",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 7,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Copa Chile",
    "country": "Chile",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Super Lig",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Serie A",
    "country": "Itália",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Cup Grp. A",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 6,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Liga Profesional",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "3. Divisjon Avd. 1",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Liga Pro Serie A",
    "country": "Equador",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Svenska Cupen",
    "country": "Suécia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 8,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Belgian Pro League",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Premier League (AZE)",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Primera Division Apertura",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Copa da China (CFA Cup)",
    "country": "China",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "Super Liga",
    "country": "Internacional",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  },
  {
    "name": "NM Cup (Copa da Noruega)",
    "country": "Noruega",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "classification": "NEUTRA",
    "tierLabel": "Atenção e Monitoramento",
    "recommendationNote": "Manter cautela e analisar confronto direto."
  }
];

export const MASTER_RAIO_X_CLUBS: MasterClubItem[] = [
  {
    "name": "Alianza FC",
    "country": "El Salvador",
    "league": "Primera División (El Salvador)",
    "totalMatches": 8,
    "greens": 4,
    "reds": 4,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.88,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "4 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-0",
      "1-0",
      "1-0",
      "0-0",
      "0-0",
      "6-0",
      "1-1",
      "3-0"
    ]
  },
  {
    "name": "Bodø/Glimt",
    "country": "Noruega",
    "league": "Eliteserien",
    "totalMatches": 8,
    "greens": 5,
    "reds": 2,
    "pendings": 1,
    "winRate": 71.4,
    "avgGoals": 2.88,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "1-0",
      "0-2",
      "3-2",
      "4-3",
      "0-2",
      "5-0",
      "0-0"
    ]
  },
  {
    "name": "Olympiacos",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 7,
    "greens": 3,
    "reds": 4,
    "pendings": 0,
    "winRate": 42.9,
    "avgGoals": 1.71,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "4 REDs acumulados (42.9% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0",
      "5-0",
      "0-1",
      "1-0",
      "0-2",
      "2-1"
    ]
  },
  {
    "name": "Borussia Dortmund",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 6,
    "greens": 4,
    "reds": 2,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 2.67,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-1",
      "1-2",
      "0-0",
      "1-0",
      "2-2",
      "3-2"
    ]
  },
  {
    "name": "Vissel Kobe",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Leste)",
    "totalMatches": 6,
    "greens": 4,
    "reds": 2,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "0-0",
      "2-0",
      "0-3",
      "2-1",
      "2-1"
    ]
  },
  {
    "name": "St. Patrick's Athletic",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 6,
    "greens": 4,
    "reds": 2,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 4.17,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0",
      "1-0",
      "8-9",
      "1-2",
      "2-0",
      "2-0"
    ]
  },
  {
    "name": "Colo Colo",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 6,
    "greens": 5,
    "reds": 1,
    "pendings": 0,
    "winRate": 83.3,
    "avgGoals": 3.17,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (5G / 1R, 83.3% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-2",
      "1-0",
      "1-1",
      "3-0",
      "5-2",
      "3-0"
    ]
  },
  {
    "name": "FC Motagua",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 6,
    "greens": 4,
    "reds": 2,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 1.83,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-1",
      "1-0",
      "0-0",
      "2-0",
      "0-2",
      "3-0"
    ]
  },
  {
    "name": "Spartak Moscow",
    "country": "Internacional",
    "league": "Russian Premier League",
    "totalMatches": 5,
    "greens": 3,
    "reds": 2,
    "pendings": 0,
    "winRate": 60,
    "avgGoals": 2,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (60% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-0",
      "0-0",
      "0-0",
      "2-4",
      "1-1"
    ]
  },
  {
    "name": "FC Astana",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 5,
    "greens": 3,
    "reds": 2,
    "pendings": 0,
    "winRate": 60,
    "avgGoals": 2.6,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (60% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-2",
      "0-1",
      "2-1",
      "1-0",
      "2-2"
    ]
  },
  {
    "name": "Monterrey",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 5,
    "greens": 5,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (5 jogos com média de 4.4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-3",
      "2-1",
      "4-2",
      "1-4",
      "1-1"
    ]
  },
  {
    "name": "FC Porto",
    "country": "Portugal",
    "league": "Taça da Liga",
    "totalMatches": 5,
    "greens": 2,
    "reds": 3,
    "pendings": 0,
    "winRate": 40,
    "avgGoals": 1.8,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "3 REDs acumulados (40% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "0-1",
      "0-1",
      "4-0",
      "0-2"
    ]
  },
  {
    "name": "Kashima Antlers",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Leste)",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "winRate": 80,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (4G / 1R, 80% de acerto). Produção ofensiva segura.",
    "scores": [
      "3-0",
      "2-3",
      "0-1",
      "2-1",
      "2-1"
    ]
  },
  {
    "name": "Arsenal",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 5,
    "greens": 2,
    "reds": 1,
    "pendings": 2,
    "winRate": 66.7,
    "avgGoals": 1.4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0",
      "0-1",
      "2-2",
      "0-2",
      "0-0"
    ]
  },
  {
    "name": "Pafos FC",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 5,
    "greens": 2,
    "reds": 3,
    "pendings": 0,
    "winRate": 40,
    "avgGoals": 1.4,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "3 REDs acumulados (40% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0",
      "0-1",
      "2-2",
      "0-2"
    ]
  },
  {
    "name": "Fenerbahçe",
    "country": "Turquia",
    "league": "Süper Lig (Turquia)",
    "totalMatches": 5,
    "greens": 4,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3.6,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 3.6 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "2-2",
      "3-0",
      "8-0",
      "0-0"
    ]
  },
  {
    "name": "Kairat Almaty",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 5,
    "greens": 3,
    "reds": 2,
    "pendings": 0,
    "winRate": 60,
    "avgGoals": 2.6,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (60% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-2",
      "1-0",
      "1-0",
      "5-0",
      "1-1"
    ]
  },
  {
    "name": "Shakhtar Donetsk",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 5,
    "greens": 1,
    "reds": 2,
    "pendings": 2,
    "winRate": 33.3,
    "avgGoals": 0.8,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "1-0",
      "3-0",
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "Shamrock Rovers",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 5,
    "greens": 5,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (5 jogos com média de 3.2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-0",
      "2-1",
      "3-2",
      "2-0",
      "2-0"
    ]
  },
  {
    "name": "Zira",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "winRate": 80,
    "avgGoals": 2.8,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (4G / 1R, 80% de acerto). Produção ofensiva segura.",
    "scores": [
      "3-2",
      "1-1",
      "1-1",
      "1-0",
      "2-2"
    ]
  },
  {
    "name": "Levski Sofia",
    "country": "Bulgária",
    "league": "Copa da Bulgária",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "winRate": 80,
    "avgGoals": 2.6,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (4G / 1R, 80% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-2",
      "0-2",
      "0-1",
      "1-1",
      "2-4"
    ]
  },
  {
    "name": "Young Africans",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "winRate": 80,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (4G / 1R, 80% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-0",
      "2-1",
      "2-1",
      "4-1",
      "0-4"
    ]
  },
  {
    "name": "Manchester United",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 5,
    "greens": 4,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-3",
      "4-1",
      "1-1",
      "2-3",
      "0-0"
    ]
  },
  {
    "name": "PSV Eindhoven",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-2",
      "0-1",
      "1-1",
      "2-1"
    ]
  },
  {
    "name": "Palmeiras",
    "country": "Brasil",
    "league": "Copa do Brasil",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-0",
      "1-2",
      "2-0",
      "4-1"
    ]
  },
  {
    "name": "Qarabağ FK",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0",
      "3-3",
      "0-2"
    ]
  },
  {
    "name": "Ciudad de Bolívar",
    "country": "Argentina",
    "league": "Primera Nacional (Argentina)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 1.75 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "1-2",
      "0-2",
      "0-0"
    ]
  },
  {
    "name": "Ha Nội FC",
    "country": "Vietnã",
    "league": "V-League 1",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-1",
      "1-0",
      "1-2",
      "1-0"
    ]
  },
  {
    "name": "Real España",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 3,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "4-3",
      "0-1",
      "1-0",
      "2-1"
    ]
  },
  {
    "name": "Nacional",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2.5,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-1",
      "3-2",
      "1-0",
      "3-0"
    ]
  },
  {
    "name": "Libertad",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-0",
      "3-0",
      "3-1",
      "3-0"
    ]
  },
  {
    "name": "Inter",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-0",
      "0-2",
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "Real Madrid",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "1-2",
      "4-1",
      "2-1"
    ]
  },
  {
    "name": "Al Ahli",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-3",
      "0-4",
      "1-3",
      "0-0"
    ]
  },
  {
    "name": "FC København",
    "country": "Dinamarca",
    "league": "Superligaen",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-1",
      "3-0",
      "0-0"
    ]
  },
  {
    "name": "Dynamo Kyiv",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-0",
      "3-0",
      "0-0"
    ]
  },
  {
    "name": "Lech Poznań",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 4.75 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "6-1",
      "3-1",
      "1-4",
      "2-1"
    ]
  },
  {
    "name": "AZ Alkmaar",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "2-1",
      "1-0",
      "2-2",
      "2-0"
    ]
  },
  {
    "name": "Panathinaikos",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 3.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-0",
      "5-1",
      "2-1",
      "2-1"
    ]
  },
  {
    "name": "Atlético Ottawa",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-1",
      "2-1",
      "0-2",
      "3-0"
    ]
  },
  {
    "name": "Neftchi Fargona",
    "country": "Uzbequistão",
    "league": "Superliga (Uzbequistão)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-1",
      "1-2",
      "2-4",
      "3-1"
    ]
  },
  {
    "name": "Sturm Graz",
    "country": "Internacional",
    "league": "Liga Internacional",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 4.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "2-2",
      "6-1",
      "2-1"
    ]
  },
  {
    "name": "Riga FC",
    "country": "Letônia",
    "league": "Virslīga (Letônia)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-1",
      "2-1",
      "1-1",
      "0-2"
    ]
  },
  {
    "name": "Manchester City",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 5.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "6-5",
      "2-1",
      "0-2"
    ]
  },
  {
    "name": "FK Crvena Zvezda",
    "country": "Sérvia",
    "league": "SuperLiga (Sérvia)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 1,
    "pendings": 1,
    "winRate": 66.7,
    "avgGoals": 2.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-2",
      "0-1",
      "2-4",
      "0-0"
    ]
  },
  {
    "name": "Orlando Pirates",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.75 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-0",
      "4-0",
      "0-0"
    ]
  },
  {
    "name": "Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 4,
    "greens": 2,
    "reds": 1,
    "pendings": 1,
    "winRate": 66.7,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "0-2",
      "3-0",
      "0-0"
    ]
  },
  {
    "name": "Dinamo Zagreb",
    "country": "Croácia",
    "league": "Copa da Croácia",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-4",
      "2-1",
      "1-5",
      "3-2"
    ]
  },
  {
    "name": "FC Cincinnati",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 2.75 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "2-2",
      "2-1",
      "0-2"
    ]
  },
  {
    "name": "Górnik Zabrze",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "1-1",
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "Viktoria Plzeň",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-6",
      "1-2",
      "2-3",
      "2-3"
    ]
  },
  {
    "name": "Al-Ain",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 0,
    "pendings": 2,
    "winRate": 100,
    "avgGoals": 1.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 1.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "2-0",
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "Tampines Rovers FC",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "2-0",
      "2-0",
      "0-0"
    ]
  },
  {
    "name": "KF Shkendija",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 3,
    "greens": 1,
    "reds": 1,
    "pendings": 1,
    "winRate": 50,
    "avgGoals": 1.33,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "1-2",
      "0-0"
    ]
  },
  {
    "name": "Club Brugge",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "3-0",
      "2-3"
    ]
  },
  {
    "name": "Enugu Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.33,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "1-0",
      "1-1"
    ]
  },
  {
    "name": "Flamengo",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-1",
      "3-2"
    ]
  },
  {
    "name": "Zrinjski Mostar",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-4",
      "2-0",
      "0-0"
    ]
  },
  {
    "name": "FK Arsenal Tivat",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 3,
    "greens": 1,
    "reds": 1,
    "pendings": 1,
    "winRate": 50,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0",
      "1-2",
      "0-0"
    ]
  },
  {
    "name": "Pohang Steelers",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Leste)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "2-1",
      "3-1"
    ]
  },
  {
    "name": "Independiente Medellín",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "2-1",
      "0-2"
    ]
  },
  {
    "name": "Al-Shamal",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "2-3",
      "0-0"
    ]
  },
  {
    "name": "Hajduk Split",
    "country": "Croácia",
    "league": "HNL (1. HNL)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 2.67,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-2",
      "1-0",
      "3-0"
    ]
  },
  {
    "name": "Galatasaray",
    "country": "Turquia",
    "league": "Süper Lig (Turquia)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3.33,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-1",
      "0-1",
      "2-4"
    ]
  },
  {
    "name": "CFR Cluj",
    "country": "Romênia",
    "league": "SuperLiga (Romênia)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "3-1",
      "0-0"
    ]
  },
  {
    "name": "CF América",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "1-1",
      "4-3"
    ]
  },
  {
    "name": "Pachuca",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "2-1",
      "3-3"
    ]
  },
  {
    "name": "Cavalry FC",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "1-1",
      "2-1"
    ]
  },
  {
    "name": "AEK Athens",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "1-1",
      "3-1"
    ]
  },
  {
    "name": "Panetolikos",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "0-2",
      "1-3"
    ]
  },
  {
    "name": "Chengdu Rongcheng FC",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.67,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-1",
      "3-0",
      "0-1"
    ]
  },
  {
    "name": "Slovan Bratislava",
    "country": "Eslováquia",
    "league": "Niké Liga",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "4-0",
      "0-3"
    ]
  },
  {
    "name": "Zamalek SC",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.33,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "0-1",
      "0-2"
    ]
  },
  {
    "name": "Hammarby TFF",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 2.67,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-2",
      "0-1",
      "2-1"
    ]
  },
  {
    "name": "Necaxa",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-1",
      "1-0",
      "3-3"
    ]
  },
  {
    "name": "Lens",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "RB Leipzig",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "6-1",
      "4-0"
    ]
  },
  {
    "name": "Atlético Nacional",
    "country": "Colômbia",
    "league": "Primera A (Liga BetPlay)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "2-1",
      "1-4"
    ]
  },
  {
    "name": "Al Nassr FC",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "1-3",
      "3-1"
    ]
  },
  {
    "name": "Pyramids FC",
    "country": "Internacional",
    "league": "Egyptian Premier League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-4",
      "2-0",
      "5-1"
    ]
  },
  {
    "name": "APOEL Nicosia",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0",
      "2-2",
      "4-1"
    ]
  },
  {
    "name": "GFK Tikves Kavadarci",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "3-0",
      "7-0"
    ]
  },
  {
    "name": "Beijing Guoan",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "3-1",
      "2-2"
    ]
  },
  {
    "name": "Shanghai Port",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "4-6",
      "2-2"
    ]
  },
  {
    "name": "Hammarby",
    "country": "Suécia",
    "league": "Allsvenskan",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.33,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-1",
      "0-1",
      "0-2"
    ]
  },
  {
    "name": "Sparta Prague",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 1.33,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0",
      "1-1",
      "2-0"
    ]
  },
  {
    "name": "Borneo Samarinda",
    "country": "Ásia",
    "league": "AFC Challenge League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "2-1",
      "1-3"
    ]
  },
  {
    "name": "Bolívar",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 3,
    "greens": 1,
    "reds": 1,
    "pendings": 1,
    "winRate": 50,
    "avgGoals": 1.33,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "2-1",
      "0-0"
    ]
  },
  {
    "name": "Polissya Zhytomyr",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "3-1",
      "1-0",
      "2-2"
    ]
  },
  {
    "name": "Omonia 29 Maiou",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "4-1",
      "1-2"
    ]
  },
  {
    "name": "Bayern München",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "6-1",
      "2-2",
      "5-0"
    ]
  },
  {
    "name": "Los Angeles FC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "1-1",
      "1-1"
    ]
  },
  {
    "name": "Zenit St. Petersburg",
    "country": "Internacional",
    "league": "Cup Grp. C",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "3-2",
      "2-3"
    ]
  },
  {
    "name": "Rijeka",
    "country": "Croácia",
    "league": "HNL (1. HNL)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "2-1",
      "3-0"
    ]
  },
  {
    "name": "Al Ahly SC",
    "country": "Internacional",
    "league": "Egyptian Premier League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "3-0",
      "1-1"
    ]
  },
  {
    "name": "Djurgården",
    "country": "Suécia",
    "league": "Allsvenskan",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3.67,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "1-7",
      "1-1"
    ]
  },
  {
    "name": "Shanghai Shenhua",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "7-1",
      "2-1",
      "1-3"
    ]
  },
  {
    "name": "Tigres",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "0-2",
      "1-1"
    ]
  },
  {
    "name": "Toluca",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "2-3",
      "3-3"
    ]
  },
  {
    "name": "Coleraine",
    "country": "Irlanda do Norte",
    "league": "NIFL Premiership",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 3.33,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "1-3",
      "2-3"
    ]
  },
  {
    "name": "Al-Jazira",
    "country": "Emirados Árabes",
    "league": "ADIB League Cup",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.67,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "1-0",
      "2-2"
    ]
  },
  {
    "name": "Borac Banja Luka",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "2-1",
      "1-2"
    ]
  },
  {
    "name": "Nashville SC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "0-2",
      "3-2"
    ]
  },
  {
    "name": "FC Seoul",
    "country": "Coreia do Sul",
    "league": "K League 1",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "pendings": 0,
    "winRate": 66.7,
    "avgGoals": 2.67,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "2-2",
      "2-1"
    ]
  },
  {
    "name": "KuPS",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-2",
      "0-2"
    ]
  },
  {
    "name": "Angers",
    "country": "Internacional",
    "league": "Ligue 1",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 1.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "2-0",
      "0-0"
    ]
  },
  {
    "name": "Sporting CP",
    "country": "Internacional",
    "league": "League Cup",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "1-2",
      "0-0"
    ]
  },
  {
    "name": "Universidad Católica",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "2-2",
      "2-3"
    ]
  },
  {
    "name": "Barry Town",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-3",
      "4-1",
      "4-1"
    ]
  },
  {
    "name": "Larne",
    "country": "Irlanda do Norte",
    "league": "NIFL Premiership",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "2-3",
      "0-2"
    ]
  },
  {
    "name": "Independiente del Valle",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "2-2",
      "2-0"
    ]
  },
  {
    "name": "Lion City Sailors FC",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "6-1",
      "0-0"
    ]
  },
  {
    "name": "Paris Saint-Germain",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 3,
    "greens": 1,
    "reds": 0,
    "pendings": 2,
    "winRate": 100,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2",
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "The New Saints",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 1.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "0-2",
      "0-0"
    ]
  },
  {
    "name": "Rennes",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "Bendel Insurance",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "1-0"
    ]
  },
  {
    "name": "Grêmio",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-1"
    ]
  },
  {
    "name": "LD Alajuelense",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-4",
      "2-3"
    ]
  },
  {
    "name": "Lokomotiv Moscow",
    "country": "Internacional",
    "league": "Russian Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "3-3"
    ]
  },
  {
    "name": "FK Bregalnica Štip",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "3-0"
    ]
  },
  {
    "name": "Zhetysu Taldykorgan",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-2",
      "1-0"
    ]
  },
  {
    "name": "FK Kauno Žalgiris",
    "country": "Lituânia",
    "league": "A Lyga (Lituânia)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-4",
      "3-2"
    ]
  },
  {
    "name": "Wydad Casablanca",
    "country": "Marrocos",
    "league": "Botola Pro",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "1-1"
    ]
  },
  {
    "name": "Pakhtakor Tashkent",
    "country": "Uzbequistão",
    "league": "Superliga (Uzbequistão)",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-1",
      "1-0"
    ]
  },
  {
    "name": "Elbasani",
    "country": "Albânia",
    "league": "Kategoria Superiore",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-1",
      "0-0"
    ]
  },
  {
    "name": "Azam FC",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-0",
      "0-2"
    ]
  },
  {
    "name": "Once Caldas",
    "country": "Colômbia",
    "league": "Primera A (Liga BetPlay)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "0-2"
    ]
  },
  {
    "name": "Śląsk Wrocław ll",
    "country": "Polônia",
    "league": "Copa da Polônia (Puchar Polski)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-2"
    ]
  },
  {
    "name": "Académico Viseu",
    "country": "Portugal",
    "league": "Taça da Liga",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "1-2"
    ]
  },
  {
    "name": "Rubin Kazan",
    "country": "Rússia",
    "league": "Copa da Rússia",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "Al Hilal",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "2-3"
    ]
  },
  {
    "name": "FC Midtjylland",
    "country": "Dinamarca",
    "league": "Superligaen",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "2-1"
    ]
  },
  {
    "name": "Sabah FK",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0",
      "1-2"
    ]
  },
  {
    "name": "Klaksvik",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-2"
    ]
  },
  {
    "name": "Heart of Midlothian",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "7-1"
    ]
  },
  {
    "name": "Ghaz Al-Shamal SC",
    "country": "Iraque",
    "league": "Iraq Stars League",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "1-0"
    ]
  },
  {
    "name": "Naft Maysan",
    "country": "Iraque",
    "league": "Iraq Stars League",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "1-0"
    ]
  },
  {
    "name": "Boca Juniors",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "3-1"
    ]
  },
  {
    "name": "Bibiani Gold Stars",
    "country": "Gana",
    "league": "Ghana Premier League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-1",
      "1-0"
    ]
  },
  {
    "name": "Platense FC",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-3",
      "0-2"
    ]
  },
  {
    "name": "Sportivo Trinidense",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "2-1"
    ]
  },
  {
    "name": "Chivas",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "1-1"
    ]
  },
  {
    "name": "Cruzeiro",
    "country": "Internacional",
    "league": "Copa Libertadores Femenina",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "3-0"
    ]
  },
  {
    "name": "Club Bolivar",
    "country": "Internacional",
    "league": "Copa Libertadores Femenina",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "2-2"
    ]
  },
  {
    "name": "Zimbru",
    "country": "Moldávia",
    "league": "Super Liga (Moldávia)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "1-1"
    ]
  },
  {
    "name": "Công An Hà Nội",
    "country": "Vietnã",
    "league": "V-League 1",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-2",
      "0-1"
    ]
  },
  {
    "name": "Al-Sadd",
    "country": "Catar",
    "league": "Qatar Stars League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-3",
      "1-1"
    ]
  },
  {
    "name": "Port FC",
    "country": "Tailândia",
    "league": "Thai League 1",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "1-3"
    ]
  },
  {
    "name": "Celtic",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "7-1",
      "3-0"
    ]
  },
  {
    "name": "Lokomotive Leipzig",
    "country": "Alemanha",
    "league": "Regionalliga Nordost",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "3-1"
    ]
  },
  {
    "name": "Marseille",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "1-2"
    ]
  },
  {
    "name": "Irtysh Pavlodar",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "5-0"
    ]
  },
  {
    "name": "Pardubice",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "1-2"
    ]
  },
  {
    "name": "Slaven",
    "country": "Croácia",
    "league": "HNL (1. HNL)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "1-5"
    ]
  },
  {
    "name": "Chester FC",
    "country": "Inglaterra",
    "league": "National League North",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "2-1"
    ]
  },
  {
    "name": "Paksi SE",
    "country": "Hungria",
    "league": "NB I (Nemzeti Bajnokság)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "1-2"
    ]
  },
  {
    "name": "Simba SC",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "0-2"
    ]
  },
  {
    "name": "Werder Bremen",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "3-2"
    ]
  },
  {
    "name": "Abahani Limited",
    "country": "Bangladesh",
    "league": "Premier League (Bangladesh)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-5",
      "2-1"
    ]
  },
  {
    "name": "Al-Wahda",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "3-2"
    ]
  },
  {
    "name": "Al-Ahli",
    "country": "Catar",
    "league": "Qatar Stars League",
    "totalMatches": 2,
    "greens": 0,
    "reds": 1,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "0-0"
    ]
  },
  {
    "name": "Salzburg",
    "country": "Internacional",
    "league": "Liga Internacional",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "3-0",
      "0-1"
    ]
  },
  {
    "name": "Al Shorta",
    "country": "Iraque",
    "league": "Iraq Stars League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "2-0",
      "1-0"
    ]
  },
  {
    "name": "Forge FC",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "3-0"
    ]
  },
  {
    "name": "Apollon Limassol",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "2-2"
    ]
  },
  {
    "name": "IF Gnistan",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "1-1"
    ]
  },
  {
    "name": "HJK",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-2"
    ]
  },
  {
    "name": "Sloga Doboj",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "1-2"
    ]
  },
  {
    "name": "AEK Larnaca",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1",
      "1-2"
    ]
  },
  {
    "name": "Asteras Tripolis",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "5-1"
    ]
  },
  {
    "name": "Tottenham Hotspur",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0",
      "3-1"
    ]
  },
  {
    "name": "St. Mirren",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "0-2"
    ]
  },
  {
    "name": "Ulsan HD FC",
    "country": "Coreia do Sul",
    "league": "K League 1",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0",
      "2-1"
    ]
  },
  {
    "name": "Nice",
    "country": "Internacional",
    "league": "Ligue 1",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2",
      "0-0"
    ]
  },
  {
    "name": "Tromsø",
    "country": "Noruega",
    "league": "Eliteserien",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "3-1"
    ]
  },
  {
    "name": "Györi ETO",
    "country": "Internacional",
    "league": "NB I",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "1-2"
    ]
  },
  {
    "name": "Araz PFK",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2",
      "0-0"
    ]
  },
  {
    "name": "Mamelodi Sundowns FC",
    "country": "Internacional",
    "league": "Premier Soccer League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "1-1"
    ]
  },
  {
    "name": "Mačva Šabac",
    "country": "Sérvia",
    "league": "SuperLiga (Sérvia)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-4",
      "0-0"
    ]
  },
  {
    "name": "Bohemian FC",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 10,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 10 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "8-9",
      "2-1"
    ]
  },
  {
    "name": "FC Eindhoven",
    "country": "Holanda",
    "league": "Eerste Divisie",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "5-3"
    ]
  },
  {
    "name": "Viking",
    "country": "Noruega",
    "league": "Eliteserien",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "3-1"
    ]
  },
  {
    "name": "LASK",
    "country": "Áustria",
    "league": "ÖFB-Cup",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-4",
      "2-1"
    ]
  },
  {
    "name": "Ried",
    "country": "Áustria",
    "league": "ÖFB-Cup",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-4",
      "2-2"
    ]
  },
  {
    "name": "PAOK Thessaloniki",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "1-3"
    ]
  },
  {
    "name": "Brighton & Hove Albion",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 8,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 8 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "6-5",
      "2-3"
    ]
  },
  {
    "name": "Inter Miami CF",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "1-3"
    ]
  },
  {
    "name": "Montevideo City Torque",
    "country": "Uruguai",
    "league": "Primera División (Uruguai)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "3-1"
    ]
  },
  {
    "name": "Al Qadsiah",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-3"
    ]
  },
  {
    "name": "Feyenoord",
    "country": "Holanda",
    "league": "Eredivisie",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-0"
    ]
  },
  {
    "name": "Palestino",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-3"
    ]
  },
  {
    "name": "Always Ready",
    "country": "Bolívia",
    "league": "División Profesional (Bolívia)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-1",
      "2-1"
    ]
  },
  {
    "name": "Puskás FC Academy",
    "country": "Hungria",
    "league": "NB I (Nemzeti Bajnokság)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "3-1"
    ]
  },
  {
    "name": "Aston Villa",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "2-3"
    ]
  },
  {
    "name": "Paris FC",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1",
      "0-0"
    ]
  },
  {
    "name": "Corinthians",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "4-1"
    ]
  },
  {
    "name": "Al-Faisaly",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3",
      "0-0"
    ]
  },
  {
    "name": "CFFA",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "0-4"
    ]
  },
  {
    "name": "Como",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "1-3"
    ]
  },
  {
    "name": "Roma",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0",
      "0-0"
    ]
  },
  {
    "name": "Napoli",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-3",
      "1-1"
    ]
  },
  {
    "name": "Arsenal Dzerzhinsk",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0",
      "0-0"
    ]
  },
  {
    "name": "The Strongest",
    "country": "Bolívia",
    "league": "División Profesional (Bolívia)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1",
      "0-0"
    ]
  },
  {
    "name": "Fiorentina",
    "country": "Itália",
    "league": "Serie A",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-3",
      "1-1"
    ]
  },
  {
    "name": "Young Lions",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "6-1"
    ]
  },
  {
    "name": "FC Krasnodar",
    "country": "Internacional",
    "league": "Russian Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-3",
      "2-3"
    ]
  },
  {
    "name": "FK Neftchi",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-3",
      "0-0"
    ]
  },
  {
    "name": "Inter San Carlos",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-3",
      "0-0"
    ]
  },
  {
    "name": "Arsenal Tula",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0",
      "0-0"
    ]
  },
  {
    "name": "Shabab Al-Ahli Dubai FC",
    "country": "Emirados Árabes",
    "league": "UAE Pro League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "2-2"
    ]
  },
  {
    "name": "Tigre",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "1-2"
    ]
  },
  {
    "name": "Vancouver Whitecaps",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "4-1"
    ]
  },
  {
    "name": "Jagiellonia Białystok",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "Cruz Azul Hidalgo",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "Cerro Porteño",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "1-1"
    ]
  },
  {
    "name": "Cruz Azul",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-3",
      "4-3"
    ]
  },
  {
    "name": "Universitatea Craiova",
    "country": "Romênia",
    "league": "SuperLiga (Romênia)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-0",
      "0-0"
    ]
  },
  {
    "name": "Hatta",
    "country": "Catar",
    "league": "Qatar Stars League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2",
      "0-0"
    ]
  },
  {
    "name": "Servette",
    "country": "Suíça",
    "league": "Swiss Super League",
    "totalMatches": 2,
    "greens": 1,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-4",
      "0-0"
    ]
  },
  {
    "name": "Sirius",
    "country": "Suécia",
    "league": "Allsvenskan",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "1-1"
    ]
  },
  {
    "name": "LDU de Quito",
    "country": "Equador",
    "league": "Liga Pro Serie A",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-0"
    ]
  },
  {
    "name": "Llandudno FC",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "4-1"
    ]
  },
  {
    "name": "Balestier Khalsa FC",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "2-0"
    ]
  },
  {
    "name": "Airbus UK Broughton",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "0-2"
    ]
  },
  {
    "name": "Carrick Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "Clube com perfil ultraconservador ou atuando em liga periférica com baixa média de gols.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Glentoran",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "FK Struga",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "Clube com perfil ultraconservador ou atuando em liga periférica com baixa média de gols.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Queens Park Rangers",
    "country": "Inglaterra",
    "league": "EFL Championship",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Lincoln City",
    "country": "Inglaterra",
    "league": "EFL Championship",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Real Betis",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Firpo",
    "country": "El Salvador",
    "league": "Primera División (El Salvador)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Escorpiones",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-4"
    ]
  },
  {
    "name": "Rivers United FC",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Atletico Balboa",
    "country": "El Salvador",
    "league": "Primera División (El Salvador)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Lugano",
    "country": "Suíça",
    "league": "Swiss Super League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Basel",
    "country": "Suíça",
    "league": "Swiss Super League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Vasco da Gama",
    "country": "Brasil",
    "league": "Copa do Brasil",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "FK Qabala",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Željezničar",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-4"
    ]
  },
  {
    "name": "Deportivo Morón",
    "country": "Argentina",
    "league": "Primera Nacional (Argentina)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Atletico Madrid C",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "CF Talavera de la Reina",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Tijuana",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-3"
    ]
  },
  {
    "name": "Levante",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Atlético Madrid",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Hegelmann",
    "country": "Lituânia",
    "league": "A Lyga (Lituânia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-4"
    ]
  },
  {
    "name": "MAT Tetouan",
    "country": "Marrocos",
    "league": "Botola Pro",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Xorazm",
    "country": "Uzbequistão",
    "league": "Superliga (Uzbequistão)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Ninh Bình Club",
    "country": "Vietnã",
    "league": "V-League 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Partizani",
    "country": "Albânia",
    "league": "Kategoria Superiore",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Mbeya City",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "Bayer Leverkusen",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-2"
    ]
  },
  {
    "name": "1. FC Nürnberg",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-2"
    ]
  },
  {
    "name": "Polonia Środa",
    "country": "Polônia",
    "league": "Copa da Polônia (Puchar Polski)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "FK Bokelj",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Sporting BM",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Al-Arabi",
    "country": "Kuwait",
    "league": "Kuwait Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Al Fahaheel",
    "country": "Kuwait",
    "league": "Kuwait Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Internacional de Bogotá",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Daejeon Hana Citizen",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Leste)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "CD Marathón",
    "country": "El Salvador",
    "league": "Primera División (El Salvador)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Al Quwa Al Jawiya",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Nea Salamis",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Shinnik Yaroslavl",
    "country": "Internacional",
    "league": "First League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Spartak Kostroma",
    "country": "Internacional",
    "league": "First League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "NK Istra 1961",
    "country": "Croácia",
    "league": "HNL (1. HNL)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Mohun Bagan SG",
    "country": "Índia",
    "league": "Indian Super League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Chennaiyin FC",
    "country": "Índia",
    "league": "Indian Super League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Dinamo București",
    "country": "Romênia",
    "league": "SuperLiga (Romênia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Lyngby",
    "country": "Dinamarca",
    "league": "Superligaen",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Da Nẵng",
    "country": "Vietnã",
    "league": "V-League 1",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "B36 Tórshavn",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "NSÍ Runavík",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "HB Tórshavn",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Motherwell",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Kalamata",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-0"
    ]
  },
  {
    "name": "Independiente",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Vancouver FC",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Víkingur",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "EB/Streymur",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Heart of Lions",
    "country": "Gana",
    "league": "Ghana Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Aktobe",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Dalian Yingbo",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Gil Vicente",
    "country": "Portugal",
    "league": "Liga Portugal",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Zorya",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Dukla Banská Bystrica",
    "country": "Eslováquia",
    "league": "Niké Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "APR FC",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Vålerenga",
    "country": "Noruega",
    "league": "Eliteserien",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Kashiwa Reysol",
    "country": "Japão",
    "league": "J1 League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-3"
    ]
  },
  {
    "name": "Machida Zelvia",
    "country": "Japão",
    "league": "J1 League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Teuta Durrës",
    "country": "Albânia",
    "league": "Kategoria Superiore",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Hapoel Jerusalem FC",
    "country": "Israel",
    "league": "Ligat ha'Al (Premier League)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-3"
    ]
  },
  {
    "name": "Hapoel Tel Aviv",
    "country": "Israel",
    "league": "Ligat ha'Al (Premier League)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-3"
    ]
  },
  {
    "name": "Maccabi Tel Aviv",
    "country": "Israel",
    "league": "Ligat ha'Al (Premier League)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 8,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "6-2"
    ]
  },
  {
    "name": "Hapoel Haifa",
    "country": "Israel",
    "league": "Ligat ha'Al (Premier League)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 8,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "6-2"
    ]
  },
  {
    "name": "FC Järfälla",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Galway United FC",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Sligo Rovers",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "Sumqayıt",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Luqueño",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "FC Juárez",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Slavia Prague",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Cúcuta",
    "country": "Colômbia",
    "league": "Primera A (Liga BetPlay)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Neom SC",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Asyut Petroleum",
    "country": "Egito",
    "league": "Copa do Egito",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Tala'ea El Gaish",
    "country": "Internacional",
    "league": "Egyptian Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-4"
    ]
  },
  {
    "name": "Deportivo Maldonado",
    "country": "Uruguai",
    "league": "Primera División (Uruguai)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Al-Fayha",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-3"
    ]
  },
  {
    "name": "Derry City",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Arsimi",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Qingdao West Coast",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "FC Milsami Orhei",
    "country": "Moldávia",
    "league": "Super Liga (Moldávia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Nottingham Forest",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "AGF",
    "country": "Dinamarca",
    "league": "Superligaen",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Halmstads BK",
    "country": "Suécia",
    "league": "Allsvenskan",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Baník Ostrava",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Yangon United",
    "country": "Ásia",
    "league": "AFC Challenge League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Spartak Pleven",
    "country": "Bulgária",
    "league": "Copa da Bulgária",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "RSD Alcalá",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Real Madrid C",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Al-Duhail SC",
    "country": "Catar",
    "league": "Qatar Stars League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-3"
    ]
  },
  {
    "name": "Bangkok United",
    "country": "Tailândia",
    "league": "Thai League 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Santa Fe",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Nacional Potosí",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "FC Kapaz",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Debibi",
    "country": "Gana",
    "league": "Ghana Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Yeclano",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Poblense",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Anorthosis",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Korona Kielce",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "6-1"
    ]
  },
  {
    "name": "NK Varaždin",
    "country": "Croácia",
    "league": "HNL (1. HNL)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Alanyaspor",
    "country": "Turquia",
    "league": "Süper Lig (Turquia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "Sanjoanense",
    "country": "Portugal",
    "league": "Taça de Portugal",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Miami FC",
    "country": "Estados Unidos",
    "league": "USL Championship",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Charleston Battery",
    "country": "Estados Unidos",
    "league": "USL Championship",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Union Berlin",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Troyes",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "CA San Miguel",
    "country": "Argentina",
    "league": "Primera Nacional (Argentina)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "BSG Chemie Leipzig",
    "country": "Alemanha",
    "league": "Regionalliga Nordost",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Gençlerbirliği",
    "country": "Turquia",
    "league": "Süper Lig (Turquia)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "El Paso Locomotive FC",
    "country": "Estados Unidos",
    "league": "USL Championship",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Sacramento Republic FC",
    "country": "Estados Unidos",
    "league": "USL Championship",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Central Coast Mariners",
    "country": "Inglaterra",
    "league": "National League North",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Newcastle Jets",
    "country": "Inglaterra",
    "league": "National League North",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Keflavík",
    "country": "Islândia",
    "league": "Besta deildin",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "KR Reykjavík",
    "country": "Islândia",
    "league": "Besta deildin",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Hapoel Beer Sheva",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Lillestrøm",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Austin FC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Jeonbuk Hyundai Motors FC",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Leste)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Dynamo Makhachkala",
    "country": "Internacional",
    "league": "Cup Grp. C",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Fluminense",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "TRA United",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Enköping",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Cherno More Varna",
    "country": "Bulgária",
    "league": "First League (Bulgária)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Java United F.C.",
    "country": "Indonésia",
    "league": "Liga 1 (Indonésia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "CS Petrocub",
    "country": "Moldávia",
    "league": "Super Liga (Moldávia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Estrella Roja",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Bac Ninh",
    "country": "Vietnã",
    "league": "V-League 1",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Shamakhi FK",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Tobol Kostanay",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "CD Choloma",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Bedford Town",
    "country": "Inglaterra",
    "league": "National League North",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "MTK Budapest",
    "country": "Hungria",
    "league": "NB I (Nemzeti Bajnokság)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "Tianjin Jinmen Tiger",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Yunnan Yukun",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 8,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "7-1"
    ]
  },
  {
    "name": "Cliftonville",
    "country": "Irlanda do Norte",
    "league": "NIFL Premiership",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Sharjah Cultural Club",
    "country": "Emirados Árabes",
    "league": "ADIB League Cup",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Al Fateh FC",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-4"
    ]
  },
  {
    "name": "Dhaka Wanderers",
    "country": "Bangladesh",
    "league": "Premier League (Bangladesh)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-5"
    ]
  },
  {
    "name": "HFX Wanderers FC",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Audax Italiano",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Linfield",
    "country": "Irlanda do Norte",
    "league": "NIFL Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "Atlante",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-2"
    ]
  },
  {
    "name": "Eyüpspor",
    "country": "Turquia",
    "league": "Süper Lig (Turquia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 8,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "8-0"
    ]
  },
  {
    "name": "FC Sheriff",
    "country": "Moldávia",
    "league": "Super Liga (Moldávia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "7-0"
    ]
  },
  {
    "name": "FC Bălți",
    "country": "Moldávia",
    "league": "Super Liga (Moldávia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "7-0"
    ]
  },
  {
    "name": "Lokomotiv Tashkent",
    "country": "Uzbequistão",
    "league": "Superliga (Uzbequistão)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Santos Laguna",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-3"
    ]
  },
  {
    "name": "Al-Shahaniya",
    "country": "Catar",
    "league": "Qatar Stars League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Omonia Nicosia",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-1"
    ]
  },
  {
    "name": "Krasava Ypsonas FC",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-1"
    ]
  },
  {
    "name": "Telstar",
    "country": "Holanda",
    "league": "Eredivisie",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Turan Tovuz",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "FK Velež Mostar",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Al Kahrabaa",
    "country": "Iraque",
    "league": "Iraq Stars League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "FK Jelgava",
    "country": "Letônia",
    "league": "Virslīga (Letônia)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Voitsberg",
    "country": "Áustria",
    "league": "ÖFB-Cup",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Austria Salzburg",
    "country": "Áustria",
    "league": "ÖFB-Cup",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Kryvbas",
    "country": "Internacional",
    "league": "Liga Internacional",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "Skála",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Norwich City",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-0"
    ]
  },
  {
    "name": "Atyrau",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-3"
    ]
  },
  {
    "name": "Ordabasy Shymkent",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-3"
    ]
  },
  {
    "name": "Železničar Pančevo",
    "country": "Sérvia",
    "league": "SuperLiga (Sérvia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Žalgiris Vilnius",
    "country": "Lituânia",
    "league": "A Lyga (Lituânia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Al-Seeb",
    "country": "Iraque",
    "league": "Iraq Stars League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "1-0"
    ]
  },
  {
    "name": "FK IMT Beograd",
    "country": "Sérvia",
    "league": "SuperLiga (Sérvia)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-1"
    ]
  },
  {
    "name": "Everton",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "La Cure Waves SC",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "São Paulo",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Toronto FC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "NK Bedem Ivankovo",
    "country": "Croácia",
    "league": "Copa da Croácia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-4"
    ]
  },
  {
    "name": "TPS",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "SJK",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Stafford Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-3"
    ]
  },
  {
    "name": "Grimsby Town",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-3"
    ]
  },
  {
    "name": "El Sekka El Hadid",
    "country": "Egito",
    "league": "Copa do Egito",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "El Dakhleya",
    "country": "Egito",
    "league": "Copa do Egito",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Wieczysta Kraków",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Cove Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "Hamilton Academical",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "Sekhukhune United",
    "country": "Internacional",
    "league": "League Cup",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "Cowdenbeath",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Berwick Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Lyon",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Red Bull New York",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "KF Tirana",
    "country": "Albânia",
    "league": "Kategoria Superiore",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Egnatia",
    "country": "Albânia",
    "league": "Kategoria Superiore",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "CD Plaza Amador",
    "country": "El Salvador",
    "league": "Primera División (El Salvador)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "6-0"
    ]
  },
  {
    "name": "Vasas Budapest",
    "country": "Internacional",
    "league": "NB I",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Durban City",
    "country": "Internacional",
    "league": "Premier Soccer League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-1"
    ]
  },
  {
    "name": "Wisła Kraków",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Estoril",
    "country": "Internacional",
    "league": "Liga Portugal",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "CD Árabe Unido",
    "country": "El Salvador",
    "league": "Primera División (El Salvador)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "VSG Altglienicke",
    "country": "Alemanha",
    "league": "Regionalliga Nordost",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Helmond Sport",
    "country": "Holanda",
    "league": "Eerste Divisie",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Sandecja Nowy Sącz",
    "country": "Polônia",
    "league": "II Liga (3ª Divisão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Olimpia Grudziądz",
    "country": "Polônia",
    "league": "II Liga (3ª Divisão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Vysočina Jihlava",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-6"
    ]
  },
  {
    "name": "Venezia",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Club Atletico Peñarol",
    "country": "Uruguai",
    "league": "Primera División (Uruguai)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Independiente CG",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Marítimo",
    "country": "Internacional",
    "league": "League Cup",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Marine",
    "country": "Inglaterra",
    "league": "National League North",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Mashujaa",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "FC Volendam",
    "country": "Holanda",
    "league": "KNVB Beker",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 8,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-3"
    ]
  },
  {
    "name": "Universitario de Vinto",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Atlético-MG",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Al Ittihad",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Tractor",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Sydney FC",
    "country": "Austrália",
    "league": "A-League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Adelaide United",
    "country": "Austrália",
    "league": "A-League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Aucas",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Barcelona SC",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Unión La Calera",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "CDT Real Oruro",
    "country": "Bolívia",
    "league": "División Profesional (Bolívia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-1"
    ]
  },
  {
    "name": "Inter Toronto FC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Nõmme JK Kalju",
    "country": "Estônia",
    "league": "Premium liiga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Flora Tallinn",
    "country": "Estônia",
    "league": "Premium liiga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Mjällby",
    "country": "Suécia",
    "league": "Allsvenskan",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "FAR Rabat",
    "country": "Internacional",
    "league": "CAF Confed Cup - 2nd Preliminary Round",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "CO Korhogo",
    "country": "Internacional",
    "league": "CAF Confed Cup - 2nd Preliminary Round",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "FC Košice",
    "country": "Internacional",
    "league": "1. Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Žilina",
    "country": "Internacional",
    "league": "1. Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Juticalpa",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Nyíregyháza Spartacus FC",
    "country": "Hungria",
    "league": "NB I (Nemzeti Bajnokság)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "AFC Bournemouth",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-3"
    ]
  },
  {
    "name": "Barcelona",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Udinese",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Milan",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Elversberg",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "Haverfordwest",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "Bangor",
    "country": "Irlanda do Norte",
    "league": "NIFL Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Colón",
    "country": "Argentina",
    "league": "Primera Nacional (Argentina)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Shenzhen Peng City",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Víkingur Reykjavík",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Fram Reykjavík",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Qatar SC",
    "country": "Catar",
    "league": "Qatar Stars League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-3"
    ]
  },
  {
    "name": "Al-Sailiya",
    "country": "Internacional",
    "league": "Qatar Stars League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-6"
    ]
  },
  {
    "name": "Al-Rayyan",
    "country": "Internacional",
    "league": "Qatar Stars League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-6"
    ]
  },
  {
    "name": "Brothers Union",
    "country": "Bangladesh",
    "league": "Premier League (Bangladesh)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Wiliete Benguela",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "African Stars",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "León",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Puebla",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-4"
    ]
  },
  {
    "name": "DC United",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Tainan City",
    "country": "Ásia",
    "league": "AFC Challenge League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "Lille",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-4"
    ]
  },
  {
    "name": "Puerto Montt",
    "country": "Chile",
    "league": "Copa Chile",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "Dinamo Minsk",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Trabzonspor",
    "country": "Internacional",
    "league": "Super Lig",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Beşiktaş",
    "country": "Internacional",
    "league": "Super Lig",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Kalba FC",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "SK Super Nova",
    "country": "Letônia",
    "league": "Virslīga (Letônia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "FC Jurong",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Kaspiy Aktau",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Wuhan Three Towns",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "Sevilla",
    "country": "Espanha",
    "league": "La Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-1"
    ]
  },
  {
    "name": "Columbus Crew",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Gimcheon Sangmu",
    "country": "Coreia do Sul",
    "league": "K League 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "US Mondorf les Bains",
    "country": "Luxemburgo",
    "league": "National Division (BGL Ligue)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-1"
    ]
  },
  {
    "name": "FC Wiltz 71",
    "country": "Luxemburgo",
    "league": "National Division (BGL Ligue)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-1"
    ]
  },
  {
    "name": "Fagiano Okayama FC",
    "country": "Japão",
    "league": "J1 League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-3"
    ]
  },
  {
    "name": "FK Akhmat",
    "country": "Internacional",
    "league": "Russian Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Piast Gliwice",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Cambuur",
    "country": "Holanda",
    "league": "Eredivisie",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "IF Karlstad",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Jablonec",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-3"
    ]
  },
  {
    "name": "US Amal Tiznit",
    "country": "Marrocos",
    "league": "Botola Pro",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Grazer AK",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "6-1"
    ]
  },
  {
    "name": "Mornar",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Spartak Trnava",
    "country": "Eslováquia",
    "league": "Niké Liga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-3"
    ]
  },
  {
    "name": "Hamarkameratene",
    "country": "Noruega",
    "league": "Eliteserien",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "ADO Den Haag",
    "country": "Holanda",
    "league": "Eredivisie",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "FC Ufa",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Bucheon FC 1995",
    "country": "Coreia do Sul",
    "league": "K League 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Independiente Rivadavia",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Chicó FC",
    "country": "Colômbia",
    "league": "Primera A (Liga BetPlay)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-4"
    ]
  },
  {
    "name": "Atlanta United",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "New York City FC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Bologna",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "Welwalo Adigrat University",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-4"
    ]
  },
  {
    "name": "Al Ahli Tripoli",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-4"
    ]
  },
  {
    "name": "Olimpia",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Shelbourne",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Kokand 1912",
    "country": "Uzbequistão",
    "league": "Superliga (Uzbequistão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-4"
    ]
  },
  {
    "name": "NEC Nijmegen",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Braga",
    "country": "Dinamarca",
    "league": "Superligaen",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "CD Olimpia",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Rodina",
    "country": "Internacional",
    "league": "Cup Grp. A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-4"
    ]
  },
  {
    "name": "Al-Wasl",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "Pacific FC",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Bukovyna Chernivtsi",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-2"
    ]
  },
  {
    "name": "Imisli FK",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Coquimbo Unido",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-2"
    ]
  },
  {
    "name": "Banfield",
    "country": "Internacional",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "FK Tukums 2000",
    "country": "Letônia",
    "league": "Virslīga (Letônia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Śląsk Wrocław",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-4"
    ]
  },
  {
    "name": "Stal Stalowa Wola",
    "country": "Polônia",
    "league": "II Liga (3ª Divisão)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Dorados",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  },
  {
    "name": "Ready",
    "country": "Internacional",
    "league": "3. Divisjon Avd. 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "Union Carl Berner",
    "country": "Internacional",
    "league": "3. Divisjon Avd. 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-0"
    ]
  },
  {
    "name": "Krylya Sovetov Samara",
    "country": "Internacional",
    "league": "Russian Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Leones Negros",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Persijap Jepara",
    "country": "Indonésia",
    "league": "Liga 1 (Indonésia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Persib Bandung",
    "country": "Indonésia",
    "league": "Liga 1 (Indonésia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "NK Lokomotiva",
    "country": "Croácia",
    "league": "HNL (1. HNL)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Fulham",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "FCSB",
    "country": "Romênia",
    "league": "SuperLiga (Romênia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-0"
    ]
  },
  {
    "name": "VPS",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "AEL Limassol",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Kispest Honvéd",
    "country": "Hungria",
    "league": "NB I (Nemzeti Bajnokság)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Waterford FC",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "KPV",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "KuPS Akatemia",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "FC Differdange 03",
    "country": "Luxemburgo",
    "league": "National Division (BGL Ligue)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "Swift Hesperange",
    "country": "Luxemburgo",
    "league": "National Division (BGL Ligue)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "Thun",
    "country": "Suíça",
    "league": "Swiss Super League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-4"
    ]
  },
  {
    "name": "Kuwait SC",
    "country": "Emirados Árabes",
    "league": "UAE Pro League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-2"
    ]
  },
  {
    "name": "Liverpool",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Ratchaburi FC",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 10,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-6"
    ]
  },
  {
    "name": "Degerfors",
    "country": "Suécia",
    "league": "Allsvenskan",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-0"
    ]
  },
  {
    "name": "Liverpool FC",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Epitsentr Kamianets-Podilskyi",
    "country": "Internacional",
    "league": "Liga Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "Sigma Olomouc",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-3"
    ]
  },
  {
    "name": "Gor Mahia",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "5-1"
    ]
  },
  {
    "name": "BFC Daugavpils",
    "country": "Letônia",
    "league": "Virslīga (Letônia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "RFS",
    "country": "Letônia",
    "league": "Virslīga (Letônia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2"
    ]
  },
  {
    "name": "Sunderland",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Guaraní",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Deportivo Cuenca",
    "country": "Equador",
    "league": "Liga Pro Serie A",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "Portadown",
    "country": "Irlanda do Norte",
    "league": "NIFL Premiership",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "0-2"
    ]
  },
  {
    "name": "Sepsi OSK",
    "country": "Romênia",
    "league": "SuperLiga (Romênia)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "Central Córdoba de Santiago",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-1"
    ]
  },
  {
    "name": "IFK Haninge BRB",
    "country": "Suécia",
    "league": "Svenska Cupen",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 8,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-7"
    ]
  },
  {
    "name": "Al Mokawloon Al Arab",
    "country": "Internacional",
    "league": "Liga Internacional",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-1"
    ]
  },
  {
    "name": "CSKA Sofia",
    "country": "Bulgária",
    "league": "First League (Bulgária)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-4"
    ]
  },
  {
    "name": "UTA Arad",
    "country": "Romênia",
    "league": "SuperLiga (Romênia)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Nordsjælland",
    "country": "Dinamarca",
    "league": "Superligaen",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Kortrijk",
    "country": "Internacional",
    "league": "Belgian Pro League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Union St.Gilloise",
    "country": "Internacional",
    "league": "Belgian Pro League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Obolon Kyiv",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Real Potosí",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Blooming",
    "country": "Bolívia",
    "league": "División Profesional (Bolívia)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Sporting FC",
    "country": "Internacional",
    "league": "Primera Division Apertura",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "FK Sileks",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Tekstilshchik",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Neman Grodno",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "BSK Banja Luka",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Newcastle United",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "OFK Mladost Donja Gorica",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "FK Vardar Skopje",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 7,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "7-0"
    ]
  },
  {
    "name": "Sion",
    "country": "Suíça",
    "league": "Swiss Super League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Oțelul Galați",
    "country": "Romênia",
    "league": "SuperLiga (Romênia)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Liviy Bereh",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Trefelin BGC",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Stellenbosch FC",
    "country": "Internacional",
    "league": "League Cup",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Vojvodina",
    "country": "Internacional",
    "league": "Super Liga",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "FK Radnik Surdulica",
    "country": "Sérvia",
    "league": "SuperLiga (Sérvia)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Al-Dhafra",
    "country": "Emirados Árabes",
    "league": "UAE Pro League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Temperley",
    "country": "Argentina",
    "league": "Primera Nacional (Argentina)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Supra du Québec",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Partick Thistle",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "San Diego FC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "4-1"
    ]
  },
  {
    "name": "Sandnes Ulf",
    "country": "Noruega",
    "league": "NM Cup (Copa da Noruega)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "pendings": 1,
    "winRate": 0,
    "avgGoals": 0,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "Poucos jogos registrados (amostra < 2). Manter em monitoramento.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "Aris Thessaloniki",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "2-1"
    ]
  },
  {
    "name": "Caracas FC",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "3-0"
    ]
  },
  {
    "name": "Rasisalai United",
    "country": "Tailândia",
    "league": "Thai League 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-3"
    ]
  }
];

export const MASTER_TOP_ASSERTIVE_CLUBS: MasterClubItem[] = [
  {
    "name": "Colo Colo",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 6,
    "greens": 5,
    "reds": 1,
    "pendings": 0,
    "winRate": 83.3,
    "avgGoals": 3.17,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (5G / 1R, 83.3% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-2",
      "1-0",
      "1-1",
      "3-0",
      "5-2",
      "3-0"
    ]
  },
  {
    "name": "Monterrey",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 5,
    "greens": 5,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (5 jogos com média de 4.4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-3",
      "2-1",
      "4-2",
      "1-4",
      "1-1"
    ]
  },
  {
    "name": "Kashima Antlers",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Leste)",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "winRate": 80,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (4G / 1R, 80% de acerto). Produção ofensiva segura.",
    "scores": [
      "3-0",
      "2-3",
      "0-1",
      "2-1",
      "2-1"
    ]
  },
  {
    "name": "Fenerbahçe",
    "country": "Turquia",
    "league": "Süper Lig (Turquia)",
    "totalMatches": 5,
    "greens": 4,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3.6,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 3.6 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "2-2",
      "3-0",
      "8-0",
      "0-0"
    ]
  },
  {
    "name": "Shamrock Rovers",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 5,
    "greens": 5,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (5 jogos com média de 3.2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-0",
      "2-1",
      "3-2",
      "2-0",
      "2-0"
    ]
  },
  {
    "name": "Zira",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "winRate": 80,
    "avgGoals": 2.8,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (4G / 1R, 80% de acerto). Produção ofensiva segura.",
    "scores": [
      "3-2",
      "1-1",
      "1-1",
      "1-0",
      "2-2"
    ]
  },
  {
    "name": "Levski Sofia",
    "country": "Bulgária",
    "league": "Copa da Bulgária",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "winRate": 80,
    "avgGoals": 2.6,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (4G / 1R, 80% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-2",
      "0-2",
      "0-1",
      "1-1",
      "2-4"
    ]
  },
  {
    "name": "Young Africans",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "pendings": 0,
    "winRate": 80,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (4G / 1R, 80% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-0",
      "2-1",
      "2-1",
      "4-1",
      "0-4"
    ]
  },
  {
    "name": "Manchester United",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 5,
    "greens": 4,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-3",
      "4-1",
      "1-1",
      "2-3",
      "0-0"
    ]
  },
  {
    "name": "PSV Eindhoven",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-2",
      "0-1",
      "1-1",
      "2-1"
    ]
  },
  {
    "name": "Palmeiras",
    "country": "Brasil",
    "league": "Copa do Brasil",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-0",
      "1-2",
      "2-0",
      "4-1"
    ]
  },
  {
    "name": "Ciudad de Bolívar",
    "country": "Argentina",
    "league": "Primera Nacional (Argentina)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 1.75 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "1-2",
      "0-2",
      "0-0"
    ]
  },
  {
    "name": "Libertad",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-0",
      "3-0",
      "3-1",
      "3-0"
    ]
  },
  {
    "name": "Inter",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-0",
      "0-2",
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "Real Madrid",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "1-2",
      "4-1",
      "2-1"
    ]
  },
  {
    "name": "Al Ahli",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-3",
      "0-4",
      "1-3",
      "0-0"
    ]
  },
  {
    "name": "FC København",
    "country": "Dinamarca",
    "league": "Superligaen",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-1",
      "3-0",
      "0-0"
    ]
  },
  {
    "name": "Dynamo Kyiv",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-0",
      "3-0",
      "0-0"
    ]
  },
  {
    "name": "Lech Poznań",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 4.75 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "6-1",
      "3-1",
      "1-4",
      "2-1"
    ]
  },
  {
    "name": "AZ Alkmaar",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "2-1",
      "1-0",
      "2-2",
      "2-0"
    ]
  },
  {
    "name": "Panathinaikos",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 3.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "1-0",
      "5-1",
      "2-1",
      "2-1"
    ]
  },
  {
    "name": "Atlético Ottawa",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-1",
      "2-1",
      "0-2",
      "3-0"
    ]
  },
  {
    "name": "Neftchi Fargona",
    "country": "Uzbequistão",
    "league": "Superliga (Uzbequistão)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-1",
      "1-2",
      "2-4",
      "3-1"
    ]
  },
  {
    "name": "Sturm Graz",
    "country": "Internacional",
    "league": "Liga Internacional",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 4.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "2-2",
      "6-1",
      "2-1"
    ]
  },
  {
    "name": "Riga FC",
    "country": "Letônia",
    "league": "Virslīga (Letônia)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "pendings": 0,
    "winRate": 75,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "Alta regularidade (3G / 1R, 75% de acerto). Produção ofensiva segura.",
    "scores": [
      "0-1",
      "2-1",
      "1-1",
      "0-2"
    ]
  },
  {
    "name": "Manchester City",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 5.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "6-5",
      "2-1",
      "0-2"
    ]
  },
  {
    "name": "Orlando Pirates",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.75 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-0",
      "4-0",
      "0-0"
    ]
  },
  {
    "name": "Dinamo Zagreb",
    "country": "Croácia",
    "league": "Copa da Croácia",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-4",
      "2-1",
      "1-5",
      "3-2"
    ]
  },
  {
    "name": "FC Cincinnati",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.75,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 2.75 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "2-2",
      "2-1",
      "0-2"
    ]
  },
  {
    "name": "Górnik Zabrze",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "1-1",
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "Viktoria Plzeň",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (4 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-6",
      "1-2",
      "2-3",
      "2-3"
    ]
  },
  {
    "name": "Al-Ain",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 0,
    "pendings": 2,
    "winRate": 100,
    "avgGoals": 1.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 1.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "2-0",
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "Tampines Rovers FC",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 4,
    "greens": 3,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.25,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.25 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "2-0",
      "2-0",
      "0-0"
    ]
  },
  {
    "name": "Club Brugge",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "3-0",
      "2-3"
    ]
  },
  {
    "name": "Flamengo",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-1",
      "3-2"
    ]
  },
  {
    "name": "Zrinjski Mostar",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-4",
      "2-0",
      "0-0"
    ]
  },
  {
    "name": "Pohang Steelers",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Leste)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "2-1",
      "3-1"
    ]
  },
  {
    "name": "Independiente Medellín",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "2-1",
      "0-2"
    ]
  },
  {
    "name": "Al-Shamal",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "2-3",
      "0-0"
    ]
  },
  {
    "name": "CFR Cluj",
    "country": "Romênia",
    "league": "SuperLiga (Romênia)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "3-1",
      "0-0"
    ]
  },
  {
    "name": "CF América",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "1-1",
      "4-3"
    ]
  },
  {
    "name": "Pachuca",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "2-1",
      "3-3"
    ]
  },
  {
    "name": "AEK Athens",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "1-1",
      "3-1"
    ]
  },
  {
    "name": "Panetolikos",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "0-2",
      "1-3"
    ]
  },
  {
    "name": "Slovan Bratislava",
    "country": "Eslováquia",
    "league": "Niké Liga",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "4-0",
      "0-3"
    ]
  },
  {
    "name": "Lens",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "RB Leipzig",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "6-1",
      "4-0"
    ]
  },
  {
    "name": "Pyramids FC",
    "country": "Internacional",
    "league": "Egyptian Premier League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-4",
      "2-0",
      "5-1"
    ]
  },
  {
    "name": "GFK Tikves Kavadarci",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "3-0",
      "7-0"
    ]
  },
  {
    "name": "Shanghai Port",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "4-6",
      "2-2"
    ]
  },
  {
    "name": "Borneo Samarinda",
    "country": "Ásia",
    "league": "AFC Challenge League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "2-1",
      "1-3"
    ]
  },
  {
    "name": "Bayern München",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "6-1",
      "2-2",
      "5-0"
    ]
  },
  {
    "name": "Los Angeles FC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "1-1",
      "1-1"
    ]
  },
  {
    "name": "Zenit St. Petersburg",
    "country": "Internacional",
    "league": "Cup Grp. C",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "3-2",
      "2-3"
    ]
  },
  {
    "name": "Rijeka",
    "country": "Croácia",
    "league": "HNL (1. HNL)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "2-1",
      "3-0"
    ]
  },
  {
    "name": "Al Ahly SC",
    "country": "Internacional",
    "league": "Egyptian Premier League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "3-0",
      "1-1"
    ]
  },
  {
    "name": "Shanghai Shenhua",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "7-1",
      "2-1",
      "1-3"
    ]
  },
  {
    "name": "Tigres",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "0-2",
      "1-1"
    ]
  },
  {
    "name": "Toluca",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 5.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "2-3",
      "3-3"
    ]
  },
  {
    "name": "Borac Banja Luka",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "2-1",
      "1-2"
    ]
  },
  {
    "name": "Nashville SC",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "0-2",
      "3-2"
    ]
  },
  {
    "name": "KuPS",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 2.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-2",
      "0-2"
    ]
  },
  {
    "name": "Angers",
    "country": "Internacional",
    "league": "Ligue 1",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 1.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "2-0",
      "0-0"
    ]
  },
  {
    "name": "Sporting CP",
    "country": "Internacional",
    "league": "League Cup",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "1-2",
      "0-0"
    ]
  },
  {
    "name": "Universidad Católica",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "2-2",
      "2-3"
    ]
  },
  {
    "name": "Barry Town",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 4.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-3",
      "4-1",
      "4-1"
    ]
  },
  {
    "name": "Larne",
    "country": "Irlanda do Norte",
    "league": "NIFL Premiership",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "2-3",
      "0-2"
    ]
  },
  {
    "name": "Independiente del Valle",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.67,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (3 jogos com média de 3.67 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "2-2",
      "2-0"
    ]
  },
  {
    "name": "Lion City Sailors FC",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "6-1",
      "0-0"
    ]
  },
  {
    "name": "Paris Saint-Germain",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 3,
    "greens": 1,
    "reds": 0,
    "pendings": 2,
    "winRate": 100,
    "avgGoals": 1,
    "category": "EM_OBSERVACAO",
    "recommendation": "MONITORAR",
    "diagnosticNote": "1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.",
    "scores": [
      "1-2",
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "The New Saints",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 3,
    "greens": 2,
    "reds": 0,
    "pendings": 1,
    "winRate": 100,
    "avgGoals": 1.33,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 1.33 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "0-2",
      "0-0"
    ]
  },
  {
    "name": "Grêmio",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-1"
    ]
  },
  {
    "name": "LD Alajuelense",
    "country": "França",
    "league": "Ligue 1",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-4",
      "2-3"
    ]
  },
  {
    "name": "Lokomotiv Moscow",
    "country": "Internacional",
    "league": "Russian Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "3-3"
    ]
  },
  {
    "name": "FK Bregalnica Štip",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "3-0"
    ]
  },
  {
    "name": "FK Kauno Žalgiris",
    "country": "Lituânia",
    "league": "A Lyga (Lituânia)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-4",
      "3-2"
    ]
  },
  {
    "name": "Azam FC",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-0",
      "0-2"
    ]
  },
  {
    "name": "Śląsk Wrocław ll",
    "country": "Polônia",
    "league": "Copa da Polônia (Puchar Polski)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "3-2"
    ]
  },
  {
    "name": "Al Hilal",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "2-3"
    ]
  },
  {
    "name": "FC Midtjylland",
    "country": "Dinamarca",
    "league": "Superligaen",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "2-1"
    ]
  },
  {
    "name": "Klaksvik",
    "country": "Ilhas Faroe",
    "league": "Betri deildin (Primeira Liga)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-2"
    ]
  },
  {
    "name": "Heart of Midlothian",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "7-1"
    ]
  },
  {
    "name": "Platense FC",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-3",
      "0-2"
    ]
  },
  {
    "name": "Cruzeiro",
    "country": "Internacional",
    "league": "Copa Libertadores Femenina",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "3-0"
    ]
  },
  {
    "name": "Club Bolivar",
    "country": "Internacional",
    "league": "Copa Libertadores Femenina",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "2-2"
    ]
  },
  {
    "name": "Zimbru",
    "country": "Moldávia",
    "league": "Super Liga (Moldávia)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "1-1"
    ]
  },
  {
    "name": "Al-Sadd",
    "country": "Catar",
    "league": "Qatar Stars League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-3",
      "1-1"
    ]
  },
  {
    "name": "Port FC",
    "country": "Tailândia",
    "league": "Thai League 1",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "1-3"
    ]
  },
  {
    "name": "Celtic",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "7-1",
      "3-0"
    ]
  },
  {
    "name": "Lokomotive Leipzig",
    "country": "Alemanha",
    "league": "Regionalliga Nordost",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "3-1"
    ]
  },
  {
    "name": "Pardubice",
    "country": "República Tcheca",
    "league": "Chance Liga (1. Liga)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "1-2"
    ]
  },
  {
    "name": "Slaven",
    "country": "Croácia",
    "league": "HNL (1. HNL)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "1-5"
    ]
  },
  {
    "name": "Paksi SE",
    "country": "Hungria",
    "league": "NB I (Nemzeti Bajnokság)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-0",
      "1-2"
    ]
  },
  {
    "name": "Simba SC",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "0-2"
    ]
  },
  {
    "name": "Werder Bremen",
    "country": "Alemanha",
    "league": "Bundesliga",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "3-2"
    ]
  },
  {
    "name": "Abahani Limited",
    "country": "Bangladesh",
    "league": "Premier League (Bangladesh)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-5",
      "2-1"
    ]
  },
  {
    "name": "Forge FC",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "3-0"
    ]
  },
  {
    "name": "Apollon Limassol",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "2-2"
    ]
  },
  {
    "name": "IF Gnistan",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "1-1"
    ]
  },
  {
    "name": "HJK",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-2"
    ]
  },
  {
    "name": "Sloga Doboj",
    "country": "Bósnia e Herzegovina",
    "league": "Premijer Liga (Bósnia)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "1-2"
    ]
  },
  {
    "name": "Asteras Tripolis",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "5-1"
    ]
  },
  {
    "name": "Tromsø",
    "country": "Noruega",
    "league": "Eliteserien",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "3-1"
    ]
  },
  {
    "name": "Györi ETO",
    "country": "Internacional",
    "league": "NB I",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "1-2"
    ]
  },
  {
    "name": "Mamelodi Sundowns FC",
    "country": "Internacional",
    "league": "Premier Soccer League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "1-1"
    ]
  },
  {
    "name": "Bohemian FC",
    "country": "Irlanda",
    "league": "League of Ireland Premier",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 10,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 10 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "8-9",
      "2-1"
    ]
  },
  {
    "name": "FC Eindhoven",
    "country": "Holanda",
    "league": "Eerste Divisie",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "5-3"
    ]
  },
  {
    "name": "Viking",
    "country": "Noruega",
    "league": "Eliteserien",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-2",
      "3-1"
    ]
  },
  {
    "name": "LASK",
    "country": "Áustria",
    "league": "ÖFB-Cup",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-4",
      "2-1"
    ]
  },
  {
    "name": "Ried",
    "country": "Áustria",
    "league": "ÖFB-Cup",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-4",
      "2-2"
    ]
  },
  {
    "name": "PAOK Thessaloniki",
    "country": "Grécia",
    "league": "Super League Grécia",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-1",
      "1-3"
    ]
  },
  {
    "name": "Brighton & Hove Albion",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 8,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 8 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "6-5",
      "2-3"
    ]
  },
  {
    "name": "Inter Miami CF",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "1-3"
    ]
  },
  {
    "name": "Montevideo City Torque",
    "country": "Uruguai",
    "league": "Primera División (Uruguai)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "3-1"
    ]
  },
  {
    "name": "Al Qadsiah",
    "country": "Ásia",
    "league": "AFC Champions League Elite (Oeste)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-3"
    ]
  },
  {
    "name": "Feyenoord",
    "country": "Holanda",
    "league": "Eredivisie",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-0"
    ]
  },
  {
    "name": "Palestino",
    "country": "Chile",
    "league": "Primera División (Chile)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-3"
    ]
  },
  {
    "name": "Always Ready",
    "country": "Bolívia",
    "league": "División Profesional (Bolívia)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-1",
      "2-1"
    ]
  },
  {
    "name": "Puskás FC Academy",
    "country": "Hungria",
    "league": "NB I (Nemzeti Bajnokság)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-2",
      "3-1"
    ]
  },
  {
    "name": "Aston Villa",
    "country": "Inglaterra",
    "league": "Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "2-3"
    ]
  },
  {
    "name": "Corinthians",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "5-0",
      "4-1"
    ]
  },
  {
    "name": "CFFA",
    "country": "Tanzânia",
    "league": "Ligi Kuu Bara (Premier League)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "0-4"
    ]
  },
  {
    "name": "Como",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "1-3"
    ]
  },
  {
    "name": "Napoli",
    "country": "Europa",
    "league": "UEFA Champions League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 4.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 4.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-3",
      "1-1"
    ]
  },
  {
    "name": "Fiorentina",
    "country": "Itália",
    "league": "Serie A",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-3",
      "1-1"
    ]
  },
  {
    "name": "Young Lions",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "6-1"
    ]
  },
  {
    "name": "FC Krasnodar",
    "country": "Internacional",
    "league": "Russian Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-3",
      "2-3"
    ]
  },
  {
    "name": "Shabab Al-Ahli Dubai FC",
    "country": "Emirados Árabes",
    "league": "UAE Pro League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "2-2"
    ]
  },
  {
    "name": "Tigre",
    "country": "Argentina",
    "league": "Liga Profesional",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-2",
      "1-2"
    ]
  },
  {
    "name": "Vancouver Whitecaps",
    "country": "Estados Unidos",
    "league": "Major League Soccer (MLS)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "4-1"
    ]
  },
  {
    "name": "Jagiellonia Białystok",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "Cruz Azul Hidalgo",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 3.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 3.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-3",
      "2-1"
    ]
  },
  {
    "name": "Cerro Porteño",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-1",
      "1-1"
    ]
  },
  {
    "name": "Cruz Azul",
    "country": "México",
    "league": "Liga MX",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 6.5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 6.5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "3-3",
      "4-3"
    ]
  },
  {
    "name": "Sirius",
    "country": "Suécia",
    "league": "Allsvenskan",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "1-1"
    ]
  },
  {
    "name": "LDU de Quito",
    "country": "Equador",
    "league": "Liga Pro Serie A",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "1-1",
      "2-0"
    ]
  },
  {
    "name": "Llandudno FC",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 5,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 5 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "4-1",
      "4-1"
    ]
  },
  {
    "name": "Balestier Khalsa FC",
    "country": "Singapura",
    "league": "Singapore Premier League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "2-0",
      "2-0"
    ]
  },
  {
    "name": "Airbus UK Broughton",
    "country": "País de Gales",
    "league": "Cymru Premier",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "pendings": 0,
    "winRate": 100,
    "avgGoals": 2,
    "category": "MAIOR_ASSERTIVIDADE",
    "recommendation": "PRIORIZAR",
    "diagnosticNote": "100% de aproveitamento em Over 1.5 (2 jogos com média de 2 gols/jogo). Ataque prolífico e constante.",
    "scores": [
      "0-2",
      "0-2"
    ]
  }
];

export const MASTER_HIGH_RISK_CLUBS: MasterClubItem[] = [
  {
    "name": "Alianza FC",
    "country": "El Salvador",
    "league": "Primera División (El Salvador)",
    "totalMatches": 8,
    "greens": 4,
    "reds": 4,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 1.88,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "4 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-0",
      "1-0",
      "1-0",
      "0-0",
      "0-0",
      "6-0",
      "1-1",
      "3-0"
    ]
  },
  {
    "name": "Olympiacos",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 7,
    "greens": 3,
    "reds": 4,
    "pendings": 0,
    "winRate": 42.9,
    "avgGoals": 1.71,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "4 REDs acumulados (42.9% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0",
      "5-0",
      "0-1",
      "1-0",
      "0-2",
      "2-1"
    ]
  },
  {
    "name": "Spartak Moscow",
    "country": "Internacional",
    "league": "Russian Premier League",
    "totalMatches": 5,
    "greens": 3,
    "reds": 2,
    "pendings": 0,
    "winRate": 60,
    "avgGoals": 2,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (60% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-0",
      "0-0",
      "0-0",
      "2-4",
      "1-1"
    ]
  },
  {
    "name": "FC Astana",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 5,
    "greens": 3,
    "reds": 2,
    "pendings": 0,
    "winRate": 60,
    "avgGoals": 2.6,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (60% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-2",
      "0-1",
      "2-1",
      "1-0",
      "2-2"
    ]
  },
  {
    "name": "FC Porto",
    "country": "Portugal",
    "league": "Taça da Liga",
    "totalMatches": 5,
    "greens": 2,
    "reds": 3,
    "pendings": 0,
    "winRate": 40,
    "avgGoals": 1.8,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "3 REDs acumulados (40% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "0-1",
      "0-1",
      "4-0",
      "0-2"
    ]
  },
  {
    "name": "Pafos FC",
    "country": "Chipre",
    "league": "Cyprus First Division",
    "totalMatches": 5,
    "greens": 2,
    "reds": 3,
    "pendings": 0,
    "winRate": 40,
    "avgGoals": 1.4,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "3 REDs acumulados (40% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0",
      "0-1",
      "2-2",
      "0-2"
    ]
  },
  {
    "name": "Kairat Almaty",
    "country": "Cazaquistão",
    "league": "Premier League (Cazaquistão)",
    "totalMatches": 5,
    "greens": 3,
    "reds": 2,
    "pendings": 0,
    "winRate": 60,
    "avgGoals": 2.6,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (60% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-2",
      "1-0",
      "1-0",
      "5-0",
      "1-1"
    ]
  },
  {
    "name": "Shakhtar Donetsk",
    "country": "Internacional",
    "league": "Premier League (UKR)",
    "totalMatches": 5,
    "greens": 1,
    "reds": 2,
    "pendings": 2,
    "winRate": 33.3,
    "avgGoals": 0.8,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "1-0",
      "3-0",
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "Qarabağ FK",
    "country": "Azerbaijão",
    "league": "Premyer Liqa (Azerbaijão)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0",
      "3-3",
      "0-2"
    ]
  },
  {
    "name": "Ha Nội FC",
    "country": "Vietnã",
    "league": "V-League 1",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "2-1",
      "1-0",
      "1-2",
      "1-0"
    ]
  },
  {
    "name": "Real España",
    "country": "Honduras",
    "league": "Liga Nacional (Honduras)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 3,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "4-3",
      "0-1",
      "1-0",
      "2-1"
    ]
  },
  {
    "name": "Nacional",
    "country": "Paraguai",
    "league": "División de Honor (Paraguai)",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "pendings": 0,
    "winRate": 50,
    "avgGoals": 2.5,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (50% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-1",
      "3-2",
      "1-0",
      "3-0"
    ]
  },
  {
    "name": "Enugu Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.33,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "1-0",
      "1-1"
    ]
  },
  {
    "name": "Chengdu Rongcheng FC",
    "country": "China",
    "league": "Chinese Super League",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.67,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-1",
      "3-0",
      "0-1"
    ]
  },
  {
    "name": "Zamalek SC",
    "country": "África",
    "league": "CAF Champions League",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.33,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "0-1",
      "0-2"
    ]
  },
  {
    "name": "Hammarby",
    "country": "Suécia",
    "league": "Allsvenskan",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.33,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-1",
      "0-1",
      "0-2"
    ]
  },
  {
    "name": "Al-Jazira",
    "country": "Emirados Árabes",
    "league": "ADIB League Cup",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "pendings": 0,
    "winRate": 33.3,
    "avgGoals": 1.67,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (33.3% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "1-0",
      "2-2"
    ]
  },
  {
    "name": "Rennes",
    "country": "Europa",
    "league": "UEFA Europa League",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "Bendel Insurance",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "1-0"
    ]
  },
  {
    "name": "Pakhtakor Tashkent",
    "country": "Uzbequistão",
    "league": "Superliga (Uzbequistão)",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-1",
      "1-0"
    ]
  },
  {
    "name": "Rubin Kazan",
    "country": "Rússia",
    "league": "Copa da Rússia",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "0-0",
      "0-0"
    ]
  },
  {
    "name": "Ghaz Al-Shamal SC",
    "country": "Iraque",
    "league": "Iraq Stars League",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "1-0"
    ]
  },
  {
    "name": "Naft Maysan",
    "country": "Iraque",
    "league": "Iraq Stars League",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "2 REDs acumulados (0% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.",
    "scores": [
      "1-0",
      "1-0"
    ]
  },
  {
    "name": "Carrick Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 0,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "Clube com perfil ultraconservador ou atuando em liga periférica com baixa média de gols.",
    "scores": [
      "0-0"
    ]
  },
  {
    "name": "FK Struga",
    "country": "Macedônia do Norte",
    "league": "Prva Liga (Macedônia do Norte)",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "pendings": 0,
    "winRate": 0,
    "avgGoals": 1,
    "category": "RISCO_RED",
    "recommendation": "EVITAR",
    "diagnosticNote": "Clube com perfil ultraconservador ou atuando em liga periférica com baixa média de gols.",
    "scores": [
      "1-0"
    ]
  }
];

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
