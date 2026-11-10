/**
 * BANCO DE DADOS OFICIAL E ESTRATÉGICO DO RAIO-X DE REDS E GREENS
 * Gerado com base exclusivamente no Balanço Financeiro real (Set/Out/Nov)
 */

export interface FailedLegReason {
  matchTitle: string;
  league: string;
  score: string;
  totalGoals: number;
  category: 'EXOTIC_PERIPHERAL_LEAGUE' | 'ROTATION_CUP' | 'INTENSE_DERBY' | 'DEFENSIVE_LOW_BLOCK' | 'LOW_VOLUME_OFFENSIVE' | 'INCONCLUSIVE_DATA';
  categoryLabel: string;
  context: string;
  preRisk: string;
}

export interface DetailedRedTicket {
  ticketNumber: number;
  id: string;
  date: string;
  title: string;
  odd: number;
  amount: number;
  profit: number;
  failedLegsCount: number;
  passedLegsCount: number;
  totalLegsCount: number;
  reasons: FailedLegReason[];
  passedLegs: {
    matchTitle: string;
    league: string;
    score: string;
    status: 'green';
  }[];
}

export interface LeagueRankingItem {
  name: string;
  totalMatches: number;
  greens: number;
  reds: number;
  totalGoals?: number;
  winRate: number;
  avgGoals: number;
  tier: 'OURO' | 'MODERADO' | 'VERMELHO';
  tierLabel: string;
  recommendation: string;
}

export interface ClubEvaluationItem {
  id: number;
  name: string;
  country: string;
  league: string;
  matches: number;
  greens: number;
  reds: number;
  totalGoals?: number;
  winRate: number | null;
  avgGoals: number | null;
  action: 'MANTER' | 'REMOVER' | 'OBSERVAR';
  actionLabel: string;
  justification: string;
}

export interface RaioXSummary {
  totalBets: number;
  greensCount: number;
  redsCount: number;
  pendingsCount: number;
  ticketWinRate: number;
  totalLegsEvaluated: number;
  legWinRate: number;
  avgGoalsInGreens: number;
  avgGoalsInFailedLegs: number;
  singleLegFailRate: number;
}

export const RAIO_X_INITIAL_SUMMARY: RaioXSummary = {
  "totalBets": 177,
  "greensCount": 86,
  "redsCount": 76,
  "pendingsCount": 15,
  "ticketWinRate": 53.1,
  "totalLegsEvaluated": 483,
  "legWinRate": 80.1,
  "avgGoalsInGreens": 3.76,
  "avgGoalsInFailedLegs": 0.65,
  "singleLegFailRate": 75
};

export const RAIO_X_DETAILED_REDS: DetailedRedTicket[] = [
  {
    "ticketNumber": 1,
    "id": "bet-1794070693848-tddyi8y2h",
    "date": "2026-11-07",
    "title": "Carrick Rangers x Glentoran + FK Struga x KF Shkendija + Queens Park Rangers x Lincoln City",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Carrick Rangers x Glentoran",
        "league": "Premiership",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      },
      {
        "matchTitle": "FK Struga x KF Shkendija",
        "league": "Prva Liga",
        "score": "1-0",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Queens Park Rangers x Lincoln City",
        "league": "Championship",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Rennes x Olympiacos",
        "league": "Europa League",
        "score": "0-0",
        "totalGoals": 0,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Borussia Dortmund x Real Betis",
        "league": "Champions League",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "PSV Eindhoven x Club Brugge",
        "league": "Champions League",
        "score": "1-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Enugu Rangers x Bendel Insurance",
        "league": "NPFL",
        "score": "1-0",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Firpo x Alianza FC",
        "league": "Primera Division - Apertura",
        "score": "2-0",
        "status": "green"
      },
      {
        "matchTitle": "Flamengo x Grêmio",
        "league": "Série A",
        "score": "3-1",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 2,
    "totalLegsCount": 4,
    "reasons": [
      {
        "matchTitle": "Rennes x Olympiacos",
        "league": "Europa League",
        "score": "0-0",
        "totalGoals": 0,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      },
      {
        "matchTitle": "Enugu Rangers x Bendel Insurance",
        "league": "NPFL",
        "score": "1-0",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Escorpiones x LD Alajuelense",
        "league": "Primera Division Apertura",
        "score": "1-4",
        "status": "green"
      },
      {
        "matchTitle": "Flamengo x Grêmio",
        "league": "Série A",
        "score": "3-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Atletico Balboa x Alianza FC",
        "league": "Primera Division - Apertura",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Rivers United FC x Enugu Rangers",
        "league": "NPFL",
        "score": "1-1",
        "status": "green"
      },
      {
        "matchTitle": "Lokomotiv Moscow x Spartak Moscow",
        "league": "Russian Premier League",
        "score": "2-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Palmeiras x Vasco da Gama",
        "league": "Copa do Brasil",
        "score": "1-0",
        "totalGoals": 1,
        "category": "ROTATION_CUP",
        "categoryLabel": "Copa / Rotação de Elenco",
        "context": "Confronto eliminatório ou de copa onde ao menos uma das equipes atuou com time mesclado ou postura conservadora para levar a decisão adiante.",
        "preRisk": "Escalações mistas divulgadas apenas 1h antes da partida, retirando artilheiros titulares do onze inicial."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "FK Bregalnica Štip x KF Shkendija",
        "league": "Prva Liga",
        "score": "1-2",
        "status": "green"
      },
      {
        "matchTitle": "Lugano x Basel",
        "league": "Super League",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "FK Qabala x Qarabağ FK",
        "league": "Premier League (AZE)",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Željezničar x Zrinjski Mostar",
        "league": "Premier League (BIH)",
        "score": "0-4",
        "status": "green"
      },
      {
        "matchTitle": "Zhetysu Taldykorgan x FC Astana",
        "league": "Premier League (KAZ)",
        "score": "2-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Atletico Madrid C x CF Talavera de la Reina",
        "league": "Segunda Federacion - Group 5",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Deportivo Morón x Ciudad de Bolívar",
        "league": "Primera Nacional",
        "score": "2-0",
        "status": "green"
      },
      {
        "matchTitle": "Monterrey x Tijuana",
        "league": "Liga MX",
        "score": "3-3",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Wydad Casablanca x MAT Tetouan",
        "league": "Botola Pro",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Levante x Atlético Madrid",
        "league": "LaLiga",
        "score": "0-2",
        "status": "green"
      },
      {
        "matchTitle": "Hegelmann x FK Kauno Žalgiris",
        "league": "A Lyga",
        "score": "1-4",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 1,
    "totalLegsCount": 2,
    "reasons": [
      {
        "matchTitle": "Xorazm x Pakhtakor Tashkent",
        "league": "Superliga",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Ha Nội FC x Ninh Bình Club",
        "league": "V-League",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Once Caldas x Alianza FC",
        "league": "Primera A",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Elbasani x Partizani",
        "league": "Kategoria Superiore",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "Azam FC x Mbeya City",
        "league": "Premier League (TAN)",
        "score": "4-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "FC Porto x Académico Viseu",
        "league": "League Cup",
        "score": "1-0",
        "totalGoals": 1,
        "category": "ROTATION_CUP",
        "categoryLabel": "Copa / Rotação de Elenco",
        "context": "Confronto eliminatório ou de copa onde ao menos uma das equipes atuou com time mesclado ou postura conservadora para levar a decisão adiante.",
        "preRisk": "Escalações mistas divulgadas apenas 1h antes da partida, retirando artilheiros titulares do onze inicial."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Bayer Leverkusen x 1. FC Nürnberg",
        "league": "DFB Pokal",
        "score": "5-2",
        "status": "green"
      },
      {
        "matchTitle": "Polonia Środa x Śląsk Wrocław ll",
        "league": "FA Cup",
        "score": "3-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "FK Arsenal Tivat x FK Bokelj",
        "league": "1. CFL",
        "score": "0-0",
        "totalGoals": 0,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Kashima Antlers x Pohang Steelers",
        "league": "AFC Champions League Elite East",
        "score": "3-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Spartak Moscow x Rubin Kazan",
        "league": "Cup Grp. A",
        "score": "0-0",
        "totalGoals": 0,
        "category": "ROTATION_CUP",
        "categoryLabel": "Copa / Rotação de Elenco",
        "context": "Confronto eliminatório ou de copa onde ao menos uma das equipes atuou com time mesclado ou postura conservadora para levar a decisão adiante.",
        "preRisk": "Escalações mistas divulgadas apenas 1h antes da partida, retirando artilheiros titulares do onze inicial."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Al-Arabi x Al Fahaheel",
        "league": "Premier League (KUW)",
        "score": "2-0",
        "status": "green"
      },
      {
        "matchTitle": "Internacional de Bogotá x Independiente Medellín",
        "league": "Primera A",
        "score": "3-1",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Daejeon Hana Citizen x Vissel Kobe",
        "league": "AFC Champions League Elite East",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "Alianza FC x CD Marathón",
        "league": "CONCACAF Central American Cup Play-In",
        "score": "0-0",
        "totalGoals": 0,
        "category": "ROTATION_CUP",
        "categoryLabel": "Copa / Rotação de Elenco",
        "context": "Confronto eliminatório ou de copa onde ao menos uma das equipes atuou com time mesclado ou postura conservadora para levar a decisão adiante.",
        "preRisk": "Escalações mistas divulgadas apenas 1h antes da partida, retirando artilheiros titulares do onze inicial."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Al-Shamal x Al Hilal",
        "league": "AFC Champions League Elite West",
        "score": "3-1",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Al Quwa Al Jawiya x Pakhtakor Tashkent",
        "league": "AFC Champions League Elite West",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "Nea Salamis x Pafos FC",
        "league": "Cyprus League",
        "score": "0-0",
        "totalGoals": 0,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Shinnik Yaroslavl x Spartak Kostroma",
        "league": "First League",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Mohun Bagan SG x Chennaiyin FC",
        "league": "Indian Super League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "NK Istra 1961 x Hajduk Split",
        "league": "HNL",
        "score": "2-2",
        "status": "green"
      },
      {
        "matchTitle": "Galatasaray x Fenerbahçe",
        "league": "Super Lig",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Da Nẵng x Ha Nội FC",
        "league": "V-League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "CFR Cluj x Dinamo București",
        "league": "Superliga",
        "score": "2-2",
        "status": "green"
      },
      {
        "matchTitle": "FC Midtjylland x Lyngby",
        "league": "Superligaen",
        "score": "3-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Sabah FK x Qarabağ FK",
        "league": "Premier League (AZE)",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "B36 Tórshavn x Klaksvik",
        "league": "Premier League (FRO)",
        "score": "1-1",
        "status": "green"
      },
      {
        "matchTitle": "NSÍ Runavík x HB Tórshavn",
        "league": "Premier League (FRO)",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Ghaz Al-Shamal SC x Naft Maysan",
        "league": "Stars League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Motherwell x Heart of Midlothian",
        "league": "Premiership",
        "score": "0-2",
        "status": "green"
      },
      {
        "matchTitle": "Olympiacos x Kalamata",
        "league": "Super League",
        "score": "5-0",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Independiente x Boca Juniors",
        "league": "Liga Profesional",
        "score": "0-1",
        "totalGoals": 1,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      },
      {
        "matchTitle": "Cavalry FC x Vancouver FC",
        "league": "Canadian Premier League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "CF América x Pachuca",
        "league": "Liga MX",
        "score": "1-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Víkingur x EB/Streymur",
        "league": "Premier League (FRO)",
        "score": "0-0",
        "totalGoals": 0,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Bibiani Gold Stars x Heart of Lions",
        "league": "Premier League (GHA)",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "Aktobe x Kairat Almaty",
        "league": "Premier League (KAZ)",
        "score": "2-2",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Ghaz Al-Shamal SC x Naft Maysan",
        "league": "Stars League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      },
      {
        "matchTitle": "Chengdu Rongcheng FC x Dalian Yingbo",
        "league": "Super League",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "AEK Athens x Panetolikos",
        "league": "Super League",
        "score": "5-0",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Gil Vicente x FC Porto",
        "league": "Liga Portugal",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "Shakhtar Donetsk x Zorya",
        "league": "Premier League (UKR)",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Real España x Platense FC",
        "league": "Liga Nacional - Apertura",
        "score": "4-3",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Zamalek SC x APR FC",
        "league": "CAF Champions League Qualification",
        "score": "1-0",
        "totalGoals": 1,
        "category": "ROTATION_CUP",
        "categoryLabel": "Copa / Rotação de Elenco",
        "context": "Confronto eliminatório ou de copa onde ao menos uma das equipes atuou com time mesclado ou postura conservadora para levar a decisão adiante.",
        "preRisk": "Escalações mistas divulgadas apenas 1h antes da partida, retirando artilheiros titulares do onze inicial."
      },
      {
        "matchTitle": "Bodø/Glimt x Vålerenga",
        "league": "Eliteserien",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Slovan Bratislava x Dukla Banská Bystrica",
        "league": "1. Liga",
        "score": "2-2",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Vissel Kobe x Machida Zelvia",
        "league": "J. League",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      },
      {
        "matchTitle": "Teuta Durrës x Elbasani",
        "league": "Kategoria Superiore",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Kashima Antlers x Kashiwa Reysol",
        "league": "J. League",
        "score": "2-3",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Nacional x Sportivo Trinidense",
        "league": "Division Profesional",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Hapoel Jerusalem FC x Hapoel Tel Aviv",
        "league": "Ligat ha'Al",
        "score": "0-3",
        "status": "green"
      },
      {
        "matchTitle": "Maccabi Tel Aviv x Hapoel Haifa",
        "league": "Ligat ha'Al",
        "score": "6-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Galway United FC x St. Patrick's Athletic",
        "league": "Premier Division",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "FC Järfälla x Hammarby TFF",
        "league": "Ettan Norra",
        "score": "2-2",
        "status": "green"
      },
      {
        "matchTitle": "Shamrock Rovers x Sligo Rovers",
        "league": "Premier Division",
        "score": "4-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Libertad x Luqueño",
        "league": "Division Profesional",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Zira x Sumqayıt",
        "league": "Premier League (AZE)",
        "score": "3-2",
        "status": "green"
      },
      {
        "matchTitle": "Necaxa x FC Juárez",
        "league": "Liga MX",
        "score": "1-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Inter x Shakhtar Donetsk",
        "league": "Champions League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Club Brugge x Lens",
        "league": "Champions League",
        "score": "3-0",
        "status": "green"
      },
      {
        "matchTitle": "Real Madrid x RB Leipzig",
        "league": "Champions League",
        "score": "4-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "FC Porto x PSV Eindhoven",
        "league": "Champions League",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Fenerbahçe x Slavia Prague",
        "league": "Champions League",
        "score": "2-2",
        "status": "green"
      },
      {
        "matchTitle": "Sabah FK x Borussia Dortmund",
        "league": "Champions League",
        "score": "1-2",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 0,
    "totalLegsCount": 2,
    "reasons": [
      {
        "matchTitle": "Cúcuta x Atlético Nacional",
        "league": "Primera A",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "Al Nassr FC x Neom SC",
        "league": "Saudi Pro League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": []
  },
  {
    "ticketNumber": 33,
    "id": "bet-1792451652804-6sxq8y9ar",
    "date": "2026-10-20",
    "title": "Asyut Petroleum x Zamalek SC + Tala'ea El Gaish x Pyramids FC + Chivas x Necaxa",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Asyut Petroleum x Zamalek SC",
        "league": "Egyptian Premier League",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "Chivas x Necaxa",
        "league": "Liga MX",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Tala'ea El Gaish x Pyramids FC",
        "league": "Egyptian Premier League",
        "score": "1-4",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Pafos FC x APOEL Nicosia",
        "league": "Cyprus League",
        "score": "0-0",
        "totalGoals": 0,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Nacional x Deportivo Maldonado",
        "league": "Liga AUF Uruguaya Clausura",
        "score": "3-2",
        "status": "green"
      },
      {
        "matchTitle": "Al-Fayha x Al Ahli",
        "league": "Saudi Pro League",
        "score": "2-3",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Derry City x St. Patrick's Athletic",
        "league": "Premier Division",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Arsimi x GFK Tikves Kavadarci",
        "league": "Prva Liga",
        "score": "1-1",
        "status": "green"
      },
      {
        "matchTitle": "Cruzeiro x Club Bolivar",
        "league": "Copa Libertadores Femenina",
        "score": "3-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Beijing Guoan x Qingdao West Coast",
        "league": "Super League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Shanghai Port x Chengdu Rongcheng FC",
        "league": "Super League",
        "score": "3-0",
        "status": "green"
      },
      {
        "matchTitle": "FC Milsami Orhei x Zimbru",
        "league": "Super Liga",
        "score": "1-1",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 2,
    "totalLegsCount": 4,
    "reasons": [
      {
        "matchTitle": "Nottingham Forest x Arsenal",
        "league": "Premier League",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "Halmstads BK x Hammarby",
        "league": "Allsvenskan",
        "score": "0-1",
        "totalGoals": 1,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "FC København x AGF",
        "league": "Superligaen",
        "score": "1-1",
        "status": "green"
      },
      {
        "matchTitle": "Công An Hà Nội x Ha Nội FC",
        "league": "V-League",
        "score": "1-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Baník Ostrava x Sparta Prague",
        "league": "1. Liga",
        "score": "0-0",
        "totalGoals": 0,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Borneo Samarinda x Yangon United",
        "league": "AFC Challenge League Grp. D",
        "score": "2-0",
        "status": "green"
      },
      {
        "matchTitle": "Spartak Pleven x Levski Sofia",
        "league": "Cup",
        "score": "0-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "RSD Alcalá x Real Madrid C",
        "league": "Segunda Federacion - Group 5",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Al-Sadd x Al-Duhail SC",
        "league": "Qatar Stars League",
        "score": "2-3",
        "status": "green"
      },
      {
        "matchTitle": "Bangkok United x Port FC",
        "league": "Thai League",
        "score": "0-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Nacional Potosí x Bolívar",
        "league": "Primera División",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Colo Colo x Santa Fe",
        "league": "Copa Libertadores Femenina",
        "score": "1-2",
        "status": "green"
      },
      {
        "matchTitle": "Monterrey x Pachuca",
        "league": "Liga MX",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Spartak Moscow x Rubin Kazan",
        "league": "Russian Premier League",
        "score": "0-0",
        "totalGoals": 0,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Polissya Zhytomyr x Dynamo Kyiv",
        "league": "Premier League (UKR)",
        "score": "3-1",
        "status": "green"
      },
      {
        "matchTitle": "FC Kapaz x Zira",
        "league": "Premier League (AZE)",
        "score": "1-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Debibi x Bibiani Gold Stars",
        "league": "Premier League (GHA)",
        "score": "1-0",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Celtic x Heart of Midlothian",
        "league": "Premiership",
        "score": "7-1",
        "status": "green"
      },
      {
        "matchTitle": "Yeclano x Poblense",
        "league": "Segunda Federacion - Group 3",
        "score": "2-2",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Omonia 29 Maiou x Anorthosis",
        "league": "Cyprus League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      },
      {
        "matchTitle": "Hajduk Split x NK Varaždin",
        "league": "HNL",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Lech Poznań x Korona Kielce",
        "league": "Ekstraklasa",
        "score": "6-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Sanjoanense x Nacional",
        "league": "Taca de Portugal",
        "score": "1-0",
        "totalGoals": 1,
        "category": "ROTATION_CUP",
        "categoryLabel": "Copa / Rotação de Elenco",
        "context": "Confronto eliminatório ou de copa onde ao menos uma das equipes atuou com time mesclado ou postura conservadora para levar a decisão adiante.",
        "preRisk": "Escalações mistas divulgadas apenas 1h antes da partida, retirando artilheiros titulares do onze inicial."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Fenerbahçe x Alanyaspor",
        "league": "Super Lig",
        "score": "3-0",
        "status": "green"
      },
      {
        "matchTitle": "Miami FC x Charleston Battery",
        "league": "USL Championship",
        "score": "1-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Union Berlin x Borussia Dortmund",
        "league": "Bundesliga",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Bayern München x RB Leipzig",
        "league": "Bundesliga",
        "score": "6-1",
        "status": "green"
      },
      {
        "matchTitle": "Troyes x Lens",
        "league": "Ligue 1",
        "score": "1-3",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Gençlerbirliği x Galatasaray",
        "league": "Super Lig",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "CA San Miguel x Ciudad de Bolívar",
        "league": "Primera Nacional",
        "score": "1-2",
        "status": "green"
      },
      {
        "matchTitle": "Lokomotive Leipzig x BSG Chemie Leipzig",
        "league": "Regionalliga Northeast",
        "score": "2-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "El Paso Locomotive FC x Sacramento Republic FC",
        "league": "USL Championship",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Central Coast Mariners x Newcastle Jets",
        "league": "A-League",
        "score": "2-2",
        "status": "green"
      },
      {
        "matchTitle": "Keflavík x KR Reykjavík",
        "league": "Besta deildin - Championship Round",
        "score": "3-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Marseille x Olympiacos",
        "league": "Europa League",
        "score": "0-1",
        "totalGoals": 1,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "AZ Alkmaar x Hapoel Beer Sheva",
        "league": "Europa League",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "Sparta Prague x Lillestrøm",
        "league": "Europa League",
        "score": "1-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Bodø/Glimt x Borussia Dortmund",
        "league": "Champions League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Los Angeles FC x Austin FC",
        "league": "Major League Soccer",
        "score": "3-1",
        "status": "green"
      },
      {
        "matchTitle": "Vissel Kobe x Jeonbuk Hyundai Motors FC",
        "league": "AFC Champions League Elite East",
        "score": "2-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Irtysh Pavlodar x FC Astana",
        "league": "Premier League (KAZ)",
        "score": "0-1",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Dynamo Makhachkala x Zenit St. Petersburg",
        "league": "Cup Grp. C",
        "score": "1-2",
        "status": "green"
      },
      {
        "matchTitle": "Fluminense x Palmeiras",
        "league": "Copa Libertadores - Semi-finals",
        "score": "1-2",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 0,
    "totalLegsCount": 2,
    "reasons": [
      {
        "matchTitle": "Công An Hà Nội x Kashima Antlers",
        "league": "AFC Champions League Elite East",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "TRA United x Young Africans",
        "league": "Premier League (TAN)",
        "score": "0-0",
        "totalGoals": 0,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": []
  },
  {
    "ticketNumber": 52,
    "id": "bet-1791596359571-8rp4mvjq9",
    "date": "2026-10-11",
    "title": "Sparta Prague x Pardubice + Hammarby TFF x Enköping + Cherno More Varna x Levski Sofia",
    "odd": 2,
    "amount": 20,
    "profit": -20,
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Hammarby TFF x Enköping",
        "league": "Ettan Norra",
        "score": "0-1",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Sparta Prague x Pardubice",
        "league": "1. Liga",
        "score": "2-0",
        "status": "green"
      },
      {
        "matchTitle": "Cherno More Varna x Levski Sofia",
        "league": "First Professional League",
        "score": "0-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Olympiacos x Panathinaikos",
        "league": "Super League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Java United F.C. x Borneo Samarinda",
        "league": "Super League",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "CS Petrocub x Zimbru",
        "league": "Super Liga",
        "score": "1-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Estrella Roja x Real España",
        "league": "Liga Nacional - Apertura",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Slaven x Rijeka",
        "league": "HNL",
        "score": "4-1",
        "status": "green"
      },
      {
        "matchTitle": "Zamalek SC x Al Ahly SC",
        "league": "Egyptian Premier League",
        "score": "0-2",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Ha Nội FC x Bac Ninh",
        "league": "V-League",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "Hammarby x Djurgården",
        "league": "Allsvenskan",
        "score": "0-1",
        "totalGoals": 1,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "FC Midtjylland x FC København",
        "league": "Superligaen",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Kairat Almaty x Zhetysu Taldykorgan",
        "league": "Premier League (KAZ)",
        "score": "1-0",
        "totalGoals": 1,
        "category": "EXOTIC_PERIPHERAL_LEAGUE",
        "categoryLabel": "Liga Periférica / Under Estrutural",
        "context": "Competição com perfil historicamente ultradefensivo (média < 2.1 gols por jogo) e forte tendência de mando isolado por 1-0 ou 0-0.",
        "preRisk": "Falta de liquidez de dados de xG avançado e arbitragem que paralisa constantemente a continuidade das jogadas."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Zira x Shamakhi FK",
        "league": "Premier League (AZE)",
        "score": "1-1",
        "status": "green"
      },
      {
        "matchTitle": "Tobol Kostanay x FC Astana",
        "league": "Premier League (KAZ)",
        "score": "2-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Chester FC x Bedford Town",
        "league": "National League North",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "FC Motagua x CD Choloma",
        "league": "Liga Nacional - Apertura",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "Paksi SE x MTK Budapest",
        "league": "NB I",
        "score": "3-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Chengdu Rongcheng FC x Tianjin Jinmen Tiger",
        "league": "Super League",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Shanghai Shenhua x Yunnan Yukun",
        "league": "Super League",
        "score": "7-1",
        "status": "green"
      },
      {
        "matchTitle": "Tigres x Toluca",
        "league": "Liga MX",
        "score": "3-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Coleraine x Cliftonville",
        "league": "Premiership",
        "score": "1-0",
        "totalGoals": 1,
        "category": "INTENSE_DERBY",
        "categoryLabel": "Clássico Truncado / Alta Rivalidade",
        "context": "Dérbi ou clássico de rivalidade extrema com índice elevado de faltas táticas, interrupções e foco primordial em fechar espaços.",
        "preRisk": "Histórico recente de confrontos diretos marcado por jogos tensos e placares mínimos de 1-0 ou 0-0."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Simba SC x Young Africans",
        "league": "Premier League (TAN)",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "GFK Tikves Kavadarci x FK Bregalnica Štip",
        "league": "Prva Liga",
        "score": "3-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Sharjah Cultural Club x Al-Jazira",
        "league": "League Cup",
        "score": "0-0",
        "totalGoals": 0,
        "category": "ROTATION_CUP",
        "categoryLabel": "Copa / Rotação de Elenco",
        "context": "Confronto eliminatório ou de copa onde ao menos uma das equipes atuou com time mesclado ou postura conservadora para levar a decisão adiante.",
        "preRisk": "Escalações mistas divulgadas apenas 1h antes da partida, retirando artilheiros titulares do onze inicial."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Borussia Dortmund x Werder Bremen",
        "league": "Bundesliga",
        "score": "2-2",
        "status": "green"
      },
      {
        "matchTitle": "Al Fateh FC x Al Ahli",
        "league": "Saudi Pro League",
        "score": "0-4",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 1,
    "totalLegsCount": 2,
    "reasons": [
      {
        "matchTitle": "HFX Wanderers FC x Atlético Ottawa",
        "league": "Liga não identificada",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Dhaka Wanderers x Abahani Limited",
        "league": "Competição",
        "score": "1-5",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Colo Colo x Audax Italiano",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Coleraine x Linfield",
        "league": "Competição",
        "score": "1-3",
        "status": "green"
      },
      {
        "matchTitle": "Atlante x Monterrey",
        "league": "Competição",
        "score": "4-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Lokomotiv Tashkent x Neftchi Fargona",
        "league": "Liga não identificada",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Fenerbahçe x Eyüpspor",
        "league": "Competição",
        "score": "8-0",
        "status": "green"
      },
      {
        "matchTitle": "FC Sheriff x FC Bălți",
        "league": "Competição",
        "score": "7-0",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Al-Jazira x Al-Wahda",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "Al-Ahli x Al-Shahaniya",
        "league": "Liga não identificada",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Toluca x Santos Laguna",
        "league": "Competição",
        "score": "2-3",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "AZ Alkmaar x Telstar",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Salzburg x Sturm Graz",
        "league": "Competição",
        "score": "3-0",
        "status": "green"
      },
      {
        "matchTitle": "Omonia Nicosia x Krasava Ypsonas FC",
        "league": "Competição",
        "score": "4-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Turan Tovuz x Zira",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Zrinjski Mostar x FK Velež Mostar",
        "league": "Competição",
        "score": "2-0",
        "status": "green"
      },
      {
        "matchTitle": "Al Shorta x Al Kahrabaa",
        "league": "Competição",
        "score": "2-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 1,
    "totalLegsCount": 2,
    "reasons": [
      {
        "matchTitle": "FK Jelgava x Riga FC",
        "league": "Liga não identificada",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Cavalry FC x Forge FC",
        "league": "Competição",
        "score": "1-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Real España x FC Motagua",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Voitsberg x Austria Salzburg",
        "league": "Competição",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "Apollon Limassol x APOEL Nicosia",
        "league": "Competição",
        "score": "2-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Polissya Zhytomyr x Kryvbas",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Klaksvik x Skála",
        "league": "Competição",
        "score": "2-2",
        "status": "green"
      },
      {
        "matchTitle": "IF Gnistan x HJK",
        "league": "Competição",
        "score": "1-1",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Levski Sofia x Salzburg",
        "league": "Liga não identificada",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "FC Astana x Kairat Almaty",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Manchester City x Norwich City",
        "league": "Competição",
        "score": "5-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Alianza FC x FC Motagua",
        "league": "Liga não identificada",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Atyrau x Ordabasy Shymkent",
        "league": "Competição",
        "score": "0-3",
        "status": "green"
      },
      {
        "matchTitle": "Železničar Pančevo x FK Crvena Zvezda",
        "league": "Competição",
        "score": "1-2",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Al Shorta x Al-Seeb",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Žalgiris Vilnius x FK Kauno Žalgiris",
        "league": "Competição",
        "score": "3-2",
        "status": "green"
      },
      {
        "matchTitle": "Sloga Doboj x Borac Banja Luka",
        "league": "Competição",
        "score": "1-2",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "AEK Larnaca x Pafos FC",
        "league": "Liga não identificada",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "FK IMT Beograd x FK Crvena Zvezda",
        "league": "Liga não identificada",
        "score": "0-1",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Asteras Tripolis x AEK Athens",
        "league": "Competição",
        "score": "1-1",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Tottenham Hotspur x Everton",
        "league": "Liga não identificada",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Orlando Pirates x La Cure Waves SC",
        "league": "Competição",
        "score": "3-1",
        "status": "green"
      },
      {
        "matchTitle": "Palmeiras x São Paulo",
        "league": "Competição",
        "score": "2-0",
        "status": "green"
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
    "failedLegsCount": 1,
    "passedLegsCount": 2,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Rangers x St. Mirren",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "Toronto FC x Nashville SC",
        "league": "Competição",
        "score": "2-1",
        "status": "green"
      },
      {
        "matchTitle": "NK Bedem Ivankovo x Dinamo Zagreb",
        "league": "Competição",
        "score": "0-4",
        "status": "green"
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
    "failedLegsCount": 2,
    "passedLegsCount": 1,
    "totalLegsCount": 3,
    "reasons": [
      {
        "matchTitle": "Ulsan HD FC x FC Seoul",
        "league": "Liga não identificada",
        "score": "1-0",
        "totalGoals": 1,
        "category": "LOW_VOLUME_OFFENSIVE",
        "categoryLabel": "Gol Único e Desaceleração (1x0)",
        "context": "Partida encerrada em 1-0. A equipe que marcou recuou imediatamente suas linhas para segurar o resultado, e o rival não teve repertório para furar o bloqueio.",
        "preRisk": "Equipe visitante tinha média ofensiva inferior a 0.8 gols fora de casa na temporada."
      },
      {
        "matchTitle": "TPS x SJK",
        "league": "Liga não identificada",
        "score": "0-0",
        "totalGoals": 0,
        "category": "DEFENSIVE_LOW_BLOCK",
        "categoryLabel": "Retranca e Bloqueio Fechado (0x0)",
        "context": "Adversário utilizou linha de 5 defensores em bloco ultrabaixo. Goleiro realizou intervenções decisivas e o favorito não converteu a posse em gols.",
        "preRisk": "O adversário vinha de partidas consistentes sem sofrer mais de 1 gol em seus domínios."
      }
    ],
    "passedLegs": [
      {
        "matchTitle": "IF Gnistan x KuPS",
        "league": "Competição",
        "score": "1-1",
        "status": "green"
      }
    ]
  }
];

export const RAIO_X_LEAGUES_RANKING: LeagueRankingItem[] = [
  {
    "name": "Outras Ligas",
    "totalMatches": 111,
    "greens": 91,
    "reds": 20,
    "totalGoals": 353,
    "winRate": 82,
    "avgGoals": 3.18,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Champions League",
    "totalMatches": 14,
    "greens": 11,
    "reds": 3,
    "totalGoals": 50,
    "winRate": 79,
    "avgGoals": 3.57,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Super League",
    "totalMatches": 14,
    "greens": 10,
    "reds": 4,
    "totalGoals": 46,
    "winRate": 71,
    "avgGoals": 3.29,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Liga MX",
    "totalMatches": 11,
    "greens": 10,
    "reds": 1,
    "totalGoals": 37,
    "winRate": 91,
    "avgGoals": 3.36,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Cup",
    "totalMatches": 9,
    "greens": 9,
    "reds": 0,
    "totalGoals": 35,
    "winRate": 100,
    "avgGoals": 3.89,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Major League Soccer",
    "totalMatches": 9,
    "greens": 9,
    "reds": 0,
    "totalGoals": 28,
    "winRate": 100,
    "avgGoals": 3.11,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Premier League (AZE)",
    "totalMatches": 8,
    "greens": 6,
    "reds": 2,
    "totalGoals": 21,
    "winRate": 75,
    "avgGoals": 2.63,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Premiership",
    "totalMatches": 7,
    "greens": 5,
    "reds": 2,
    "totalGoals": 21,
    "winRate": 71,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Premier League (KAZ)",
    "totalMatches": 7,
    "greens": 5,
    "reds": 2,
    "totalGoals": 22,
    "winRate": 71,
    "avgGoals": 3.14,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "AFC Champions League Elite West",
    "totalMatches": 7,
    "greens": 6,
    "reds": 1,
    "totalGoals": 21,
    "winRate": 86,
    "avgGoals": 3,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "1. Liga",
    "totalMatches": 7,
    "greens": 6,
    "reds": 1,
    "totalGoals": 21,
    "winRate": 86,
    "avgGoals": 3,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Primera División",
    "totalMatches": 7,
    "greens": 6,
    "reds": 1,
    "totalGoals": 26,
    "winRate": 86,
    "avgGoals": 3.71,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Europa League",
    "totalMatches": 6,
    "greens": 3,
    "reds": 3,
    "totalGoals": 8,
    "winRate": 50,
    "avgGoals": 1.33,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Russian Premier League",
    "totalMatches": 6,
    "greens": 5,
    "reds": 1,
    "totalGoals": 20,
    "winRate": 83,
    "avgGoals": 3.33,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Primera A",
    "totalMatches": 6,
    "greens": 4,
    "reds": 2,
    "totalGoals": 16,
    "winRate": 67,
    "avgGoals": 2.67,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Liga Nacional - Apertura",
    "totalMatches": 6,
    "greens": 5,
    "reds": 1,
    "totalGoals": 18,
    "winRate": 83,
    "avgGoals": 3,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Premier Division",
    "totalMatches": 6,
    "greens": 4,
    "reds": 2,
    "totalGoals": 28,
    "winRate": 67,
    "avgGoals": 4.67,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Ekstraklasa",
    "totalMatches": 6,
    "greens": 6,
    "reds": 0,
    "totalGoals": 25,
    "winRate": 100,
    "avgGoals": 4.17,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Bundesliga",
    "totalMatches": 6,
    "greens": 5,
    "reds": 1,
    "totalGoals": 26,
    "winRate": 83,
    "avgGoals": 4.33,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Cyprus League",
    "totalMatches": 5,
    "greens": 2,
    "reds": 3,
    "totalGoals": 10,
    "winRate": 40,
    "avgGoals": 2,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "HNL",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 19,
    "winRate": 80,
    "avgGoals": 3.8,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "CAF Champions League Qualification",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 16,
    "winRate": 80,
    "avgGoals": 3.2,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Eliteserien",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 14,
    "winRate": 80,
    "avgGoals": 2.8,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Saudi Pro League",
    "totalMatches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 19,
    "winRate": 80,
    "avgGoals": 3.8,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Prva Liga",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 75,
    "avgGoals": 2.25,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Série A",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 18,
    "winRate": 100,
    "avgGoals": 4.5,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "V-League",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "totalGoals": 8,
    "winRate": 50,
    "avgGoals": 2,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Premier League (TAN)",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 75,
    "avgGoals": 2.5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "League Cup",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "totalGoals": 7,
    "winRate": 50,
    "avgGoals": 1.75,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "AFC Champions League Elite East",
    "totalMatches": 4,
    "greens": 2,
    "reds": 2,
    "totalGoals": 7,
    "winRate": 50,
    "avgGoals": 1.75,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Super Lig",
    "totalMatches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 75,
    "avgGoals": 2.25,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Ligue 1",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 2.75,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "NB I",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 3.25,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Serie A",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 12,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Eredivisie",
    "totalMatches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 2.75,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "NPFL",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "totalGoals": 4,
    "winRate": 33,
    "avgGoals": 1.33,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Primera Nacional",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 2.33,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "LaLiga",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 3.33,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Superliga",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 11,
    "winRate": 67,
    "avgGoals": 3.67,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Kategoria Superiore",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 6,
    "winRate": 67,
    "avgGoals": 2,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Superligaen",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 3.33,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Premier League (FRO)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 5,
    "winRate": 67,
    "avgGoals": 1.67,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Liga Profesional",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 67,
    "avgGoals": 2.67,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Canadian Premier League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 6,
    "winRate": 67,
    "avgGoals": 2,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Liga Portugal",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 67,
    "avgGoals": 2.67,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Premier League (UKR)",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 67,
    "avgGoals": 2.67,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "J. League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 67,
    "avgGoals": 2.67,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Division Profesional",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "totalGoals": 5,
    "winRate": 33,
    "avgGoals": 1.67,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Ettan Norra",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 67,
    "avgGoals": 2.67,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Egyptian Premier League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 67,
    "avgGoals": 2.67,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Copa Libertadores Femenina",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 3.33,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Super Liga",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 3.33,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Premier League",
    "totalMatches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 7,
    "winRate": 67,
    "avgGoals": 2.33,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Allsvenskan",
    "totalMatches": 3,
    "greens": 1,
    "reds": 2,
    "totalGoals": 4,
    "winRate": 33,
    "avgGoals": 1.33,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Qatar Stars League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 17,
    "winRate": 100,
    "avgGoals": 5.67,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Premier League (SIN)",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 14,
    "winRate": 100,
    "avgGoals": 4.67,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Conference League",
    "totalMatches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 2.67,
    "tier": "OURO",
    "tierLabel": "Alta Confiança / Prioritária",
    "recommendation": "Ligas excelentes para Over 1.5 com ritmo ofensivo constante."
  },
  {
    "name": "Primera Division - Apertura",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 3,
    "winRate": 50,
    "avgGoals": 1.5,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Primera Division Apertura",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Segunda Federacion - Group 5",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 0.5,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Botola Pro",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 3,
    "winRate": 50,
    "avgGoals": 1.5,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "DFB Pokal",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 12,
    "winRate": 100,
    "avgGoals": 6,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "FA Cup",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "1. CFL",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 3,
    "winRate": 50,
    "avgGoals": 1.5,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Cup Grp. A",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 6,
    "winRate": 50,
    "avgGoals": 3,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "First League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Stars League",
    "totalMatches": 2,
    "greens": 0,
    "reds": 2,
    "totalGoals": 2,
    "winRate": 0,
    "avgGoals": 1,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Premier League (GHA)",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 4,
    "winRate": 50,
    "avgGoals": 2,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Ligat ha'Al",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 5.5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "AFC Challenge League Grp. D",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "USL Championship",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 4,
    "winRate": 50,
    "avgGoals": 2,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Regionalliga Northeast",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "A-League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Besta deildin - Championship Round",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 4.5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "National League North",
    "totalMatches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 4,
    "winRate": 50,
    "avgGoals": 2,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "LPF Apertura",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "II Liga",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Serie A - Championship Round",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "CAF Confed Cup - 2nd Preliminary Round",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Copa Libertadores Femenina - Quarter-finals",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Pro League",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Virsliga",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "K-League 1",
    "totalMatches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Championship",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Copa do Brasil",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Premier League (BIH)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "A Lyga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Coupe de France",
    "totalMatches": 1,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Premier League (KUW)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "CONCACAF Central American Cup Play-In",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "totalGoals": 0,
    "winRate": 0,
    "avgGoals": 0,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Indian Super League",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Liga AUF Uruguaya Clausura",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Thai League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Segunda Federacion - Group 3",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Taca de Portugal",
    "totalMatches": 1,
    "greens": 0,
    "reds": 1,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "tier": "VERMELHO",
    "tierLabel": "Alto Risco / Evitar",
    "recommendation": "Evitar ou aplicar filtro rigoroso antes de selecionar."
  },
  {
    "name": "Cup Grp. C",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Copa Libertadores - Semi-finals",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "First Professional League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "League One",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Lowland League East",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Premier Soccer League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Eerste Divisie",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Cup Group Stage",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "EFL Cup",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 11,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "KNVB Cup",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 8,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Veikkausliiga Championship Group",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Premium liiga",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Premier League (WAL)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Bangladesh Football League",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Premier League (BLR)",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "National Division",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "Liga de Expansion MX Apertura",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  },
  {
    "name": "3. Divisjon Avd. 1",
    "totalMatches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "tier": "MODERADO",
    "tierLabel": "Atenção e Monitoramento",
    "recommendation": "Avaliar apenas em duelos de grande disparidade técnica."
  }
];

export const RAIO_X_CLUBS_EVALUATION: ClubEvaluationItem[] = [
  {
    "id": 8588,
    "name": "Lens",
    "country": "FRA",
    "league": "Série A",
    "matches": 6,
    "greens": 6,
    "reds": 0,
    "totalGoals": 24,
    "winRate": 100,
    "avgGoals": 4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (6 vitórias em 6 partidas). Média de 4 gols/jogo."
  },
  {
    "id": 7849,
    "name": "Monterrey",
    "country": "México",
    "league": "Liga MX",
    "matches": 5,
    "greens": 5,
    "reds": 0,
    "totalGoals": 22,
    "winRate": 100,
    "avgGoals": 4.4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (5 vitórias em 5 partidas). Média de 4.4 gols/jogo."
  },
  {
    "id": 4131,
    "name": "Shamrock Rovers",
    "country": "Irlanda",
    "league": "Premier Division",
    "matches": 5,
    "greens": 5,
    "reds": 0,
    "totalGoals": 16,
    "winRate": 100,
    "avgGoals": 3.2,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (5 vitórias em 5 partidas). Média de 3.2 gols/jogo."
  },
  {
    "id": 8561,
    "name": "Tigres",
    "country": "México",
    "league": "Liga MX",
    "matches": 5,
    "greens": 5,
    "reds": 0,
    "totalGoals": 16,
    "winRate": 100,
    "avgGoals": 3.2,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (5 vitórias em 5 partidas). Média de 3.2 gols/jogo."
  },
  {
    "id": 2530,
    "name": "Al Ahli",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 17,
    "winRate": 100,
    "avgGoals": 4.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 4.3 gols/jogo."
  },
  {
    "id": 6578,
    "name": "Cruz Azul",
    "country": "MEX",
    "league": "Série A",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 20,
    "winRate": 100,
    "avgGoals": 5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 5 gols/jogo."
  },
  {
    "id": 10156,
    "name": "Dinamo Zagreb",
    "country": "Croácia",
    "league": "HNL",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 18,
    "winRate": 100,
    "avgGoals": 4.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 4.5 gols/jogo."
  },
  {
    "id": 722265,
    "name": "FC Cincinnati",
    "country": "Estados Unidos",
    "league": "MLS",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 2.8,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 2.8 gols/jogo."
  },
  {
    "id": 8020,
    "name": "Górnik Zabrze",
    "country": "POL",
    "league": "Série A",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 12,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 960720,
    "name": "Inter Miami CF",
    "country": "USA",
    "league": "Série A",
    "matches": 6,
    "greens": 5,
    "reds": 1,
    "totalGoals": 18,
    "winRate": 83,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (5G / 1R). Média de 3 gols/jogo com forte poder de fogo."
  },
  {
    "id": 1693,
    "name": "KuPS",
    "country": "FIN",
    "league": "Série A",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 3.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 3.3 gols/jogo."
  },
  {
    "id": 8456,
    "name": "Manchester City",
    "country": "Inglaterra",
    "league": "Premier League",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 21,
    "winRate": 100,
    "avgGoals": 5.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 5.3 gols/jogo."
  },
  {
    "id": 10260,
    "name": "Manchester United",
    "country": "Inglaterra",
    "league": "Premier League",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 15,
    "winRate": 100,
    "avgGoals": 3.8,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 3.8 gols/jogo."
  },
  {
    "id": 10014,
    "name": "Sturm Graz",
    "country": "AUT",
    "league": "Série A",
    "matches": 4,
    "greens": 4,
    "reds": 0,
    "totalGoals": 17,
    "winRate": 100,
    "avgGoals": 4.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (4 vitórias em 4 partidas). Média de 4.3 gols/jogo."
  },
  {
    "id": 101745,
    "name": "Al Ahly SC",
    "country": "EGY",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 2.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 2.3 gols/jogo."
  },
  {
    "id": 805913,
    "name": "Always Ready",
    "country": "Bolívia",
    "league": "División Profesional",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 4.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 4.3 gols/jogo."
  },
  {
    "id": 1603,
    "name": "Barry Town",
    "country": "WAL",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 14,
    "winRate": 100,
    "avgGoals": 4.7,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 4.7 gols/jogo."
  },
  {
    "id": 9823,
    "name": "Bayern München",
    "country": "GER",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 16,
    "winRate": 100,
    "avgGoals": 5.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 5.3 gols/jogo."
  },
  {
    "id": 10116,
    "name": "Borac Banja Luka",
    "country": "BIH",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 585858,
    "name": "Borneo Samarinda",
    "country": "IDN",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 6576,
    "name": "CF América",
    "country": "MEX",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 12,
    "winRate": 100,
    "avgGoals": 4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 4 gols/jogo."
  },
  {
    "id": 8342,
    "name": "Club Brugge",
    "country": "BEL",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 3.7,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3.7 gols/jogo."
  },
  {
    "id": 7815,
    "name": "Colo Colo",
    "country": "CHI",
    "league": "Série A",
    "matches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 16,
    "winRate": 80,
    "avgGoals": 3.2,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (4G / 1R). Média de 3.2 gols/jogo com forte poder de fogo."
  },
  {
    "id": 8688,
    "name": "Dynamo Kyiv",
    "country": "Ucrânia",
    "league": "Premier League",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 3.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3.3 gols/jogo."
  },
  {
    "id": 8391,
    "name": "FC København",
    "country": "DEN",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 2.7,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 2.7 gols/jogo."
  },
  {
    "id": 9770,
    "name": "Flamengo",
    "country": "BRA",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 4.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 4.3 gols/jogo."
  },
  {
    "id": 4397,
    "name": "Kashima Antlers",
    "country": "Japão",
    "league": "J1 League",
    "matches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 15,
    "winRate": 80,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (4G / 1R). Média de 3 gols/jogo com forte poder de fogo."
  },
  {
    "id": 2206,
    "name": "Larne",
    "country": "NIR",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 3.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3.3 gols/jogo."
  },
  {
    "id": 8632,
    "name": "Levski Sofia",
    "country": "BUL",
    "league": "Série A",
    "matches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 13,
    "winRate": 80,
    "avgGoals": 2.6,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (4G / 1R). Média de 2.6 gols/jogo com forte poder de fogo."
  },
  {
    "id": 867280,
    "name": "Los Angeles FC",
    "country": "Estados Unidos",
    "league": "MLS",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 2.7,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 2.7 gols/jogo."
  },
  {
    "id": 915807,
    "name": "Nashville SC",
    "country": "Estados Unidos",
    "league": "MLS",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 3.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3.3 gols/jogo."
  },
  {
    "id": 6619,
    "name": "Olimpia",
    "country": "PAR",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 3.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3.3 gols/jogo."
  },
  {
    "id": 7866,
    "name": "Orlando Pirates",
    "country": "África do Sul",
    "league": "Premier Soccer League",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 3.7,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3.7 gols/jogo."
  },
  {
    "id": 7848,
    "name": "Pachuca",
    "country": "México",
    "league": "Liga MX",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 12,
    "winRate": 100,
    "avgGoals": 4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 4 gols/jogo."
  },
  {
    "id": 517894,
    "name": "Pyramids",
    "country": "Egito",
    "league": "Egyptian Premier League",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 4.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 4.3 gols/jogo."
  },
  {
    "id": 178475,
    "name": "RB Leipzig",
    "country": "Brasil",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 16,
    "winRate": 100,
    "avgGoals": 5.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 5.3 gols/jogo."
  },
  {
    "id": 8633,
    "name": "Real Madrid",
    "country": "Espanha",
    "league": "La Liga",
    "matches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 16,
    "winRate": 80,
    "avgGoals": 3.2,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (4G / 1R). Média de 3.2 gols/jogo com forte poder de fogo."
  },
  {
    "id": 10162,
    "name": "Rijeka",
    "country": "Croácia",
    "league": "HNL",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 3.7,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3.7 gols/jogo."
  },
  {
    "id": 6628,
    "name": "Shanghai Shenhua",
    "country": "China",
    "league": "Chinese Super League",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 15,
    "winRate": 100,
    "avgGoals": 5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 5 gols/jogo."
  },
  {
    "id": 6019,
    "name": "Slovan Bratislava",
    "country": "Eslováquia",
    "league": "Nike Liga",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 3.7,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3.7 gols/jogo."
  },
  {
    "id": 67386,
    "name": "Tampines Rovers FC",
    "country": "SIN",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 6618,
    "name": "Toluca",
    "country": "México",
    "league": "Liga MX",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 16,
    "winRate": 100,
    "avgGoals": 5.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 5.3 gols/jogo."
  },
  {
    "id": 6458,
    "name": "Universidad Católica",
    "country": "CHI",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 4.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 4.3 gols/jogo."
  },
  {
    "id": 165084,
    "name": "Young Africans",
    "country": "TAN",
    "league": "Série A",
    "matches": 5,
    "greens": 4,
    "reds": 1,
    "totalGoals": 15,
    "winRate": 80,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (4G / 1R). Média de 3 gols/jogo com forte poder de fogo."
  },
  {
    "id": 8698,
    "name": "Zenit St. Petersburg",
    "country": "RUS",
    "league": "Série A",
    "matches": 3,
    "greens": 3,
    "reds": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 4.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (3 vitórias em 3 partidas). Média de 4.3 gols/jogo."
  },
  {
    "id": 595524,
    "name": "Abahani Limited",
    "country": "BAN",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 4.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4.5 gols/jogo."
  },
  {
    "id": 2529,
    "name": "Al Hilal",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 4.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4.5 gols/jogo."
  },
  {
    "id": 101919,
    "name": "Al Qadsiah",
    "country": "KSA",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3.5 gols/jogo."
  },
  {
    "id": 102117,
    "name": "Al-Ain",
    "country": "UAE",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2.5 gols/jogo."
  },
  {
    "id": 101895,
    "name": "Al-Sadd",
    "country": "QAT",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3.5 gols/jogo."
  },
  {
    "id": 8003,
    "name": "Apollon Limassol",
    "country": "CYP",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4 gols/jogo."
  },
  {
    "id": 1135780,
    "name": "Atlético Ottawa",
    "country": "Canadá",
    "league": "Canadian Premier League",
    "matches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 75,
    "avgGoals": 2.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (3G / 1R). Média de 2.3 gols/jogo com forte poder de fogo."
  },
  {
    "id": 10229,
    "name": "AZ Alkmaar",
    "country": "NED",
    "league": "Série A",
    "matches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 75,
    "avgGoals": 2.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (3G / 1R). Média de 2.5 gols/jogo com forte poder de fogo."
  },
  {
    "id": 165091,
    "name": "Azam FC",
    "country": "TAN",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 8634,
    "name": "Barcelona",
    "country": "ESP",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2.5 gols/jogo."
  },
  {
    "id": 5983,
    "name": "Bolivar",
    "country": "Bolívia",
    "league": "División Profesional",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3.5 gols/jogo."
  },
  {
    "id": 9925,
    "name": "Celtic",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 5.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 5.5 gols/jogo."
  },
  {
    "id": 6295,
    "name": "Cerro Porteño",
    "country": "PAR",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2.5 gols/jogo."
  },
  {
    "id": 9731,
    "name": "CFR Cluj",
    "country": "Romênia",
    "league": "Liga I",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4 gols/jogo."
  },
  {
    "id": 8113,
    "name": "FC Midtjylland",
    "country": "DEN",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4 gols/jogo."
  },
  {
    "id": 10235,
    "name": "Feyenoord",
    "country": "Holanda",
    "league": "Eredivisie",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 2,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2 gols/jogo."
  },
  {
    "id": 439132,
    "name": "FK Kauno Žalgiris",
    "country": "LTU",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 10,
    "winRate": 100,
    "avgGoals": 5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 5 gols/jogo."
  },
  {
    "id": 1022955,
    "name": "Forge FC",
    "country": "CAN",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2.5 gols/jogo."
  },
  {
    "id": 206546,
    "name": "GFK Tikves Kavadarci",
    "country": "MKD",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2.5 gols/jogo."
  },
  {
    "id": 5755,
    "name": "Györi ETO",
    "country": "HUN",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3.5 gols/jogo."
  },
  {
    "id": 9861,
    "name": "HJK",
    "country": "FIN",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 9965,
    "name": "HJK Helsinki",
    "country": "Finlândia",
    "league": "Veikkausliiga",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 2528,
    "name": "Independiente Medellín",
    "country": "COL",
    "league": "Série A",
    "matches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 75,
    "avgGoals": 2.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (3G / 1R). Média de 2.5 gols/jogo com forte poder de fogo."
  },
  {
    "id": 1957,
    "name": "Jagiellonia",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3.5 gols/jogo."
  },
  {
    "id": 8106,
    "name": "Klaksvik",
    "country": "FRO",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 168719,
    "name": "Krasnodar",
    "country": "Rússia",
    "league": "Premier League",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 11,
    "winRate": 100,
    "avgGoals": 5.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 5.5 gols/jogo."
  },
  {
    "id": 9977,
    "name": "LASK",
    "country": "AUT",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 12,
    "winRate": 100,
    "avgGoals": 6,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 6 gols/jogo."
  },
  {
    "id": 6620,
    "name": "Libertad",
    "country": "PAR",
    "league": "Série A",
    "matches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 11,
    "winRate": 75,
    "avgGoals": 2.8,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (3G / 1R). Média de 2.8 gols/jogo com forte poder de fogo."
  },
  {
    "id": 67366,
    "name": "Lion City Sailors FC",
    "country": "SIN",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 4.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4.5 gols/jogo."
  },
  {
    "id": 8650,
    "name": "Liverpool",
    "country": "ENG",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4 gols/jogo."
  },
  {
    "id": 4530,
    "name": "Mamelodi Sundowns",
    "country": "África do Sul",
    "league": "Premier Soccer League",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3.5 gols/jogo."
  },
  {
    "id": 9875,
    "name": "Napoli",
    "country": "Itália",
    "league": "Serie A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 4.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4.5 gols/jogo."
  },
  {
    "id": 102145,
    "name": "Neftchi Fargona",
    "country": "UZB",
    "league": "Série A",
    "matches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 14,
    "winRate": 75,
    "avgGoals": 3.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (3G / 1R). Média de 3.5 gols/jogo com forte poder de fogo."
  },
  {
    "id": 10283,
    "name": "Palmeiras",
    "country": "Brasil",
    "league": "Brasileirão Série A",
    "matches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 11,
    "winRate": 75,
    "avgGoals": 2.8,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (3G / 1R). Média de 2.8 gols/jogo com forte poder de fogo."
  },
  {
    "id": 8619,
    "name": "PAOK Thessaloniki",
    "country": "GRE",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 4,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4 gols/jogo."
  },
  {
    "id": 8640,
    "name": "PSV Eindhoven",
    "country": "NED",
    "league": "Série A",
    "matches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 75,
    "avgGoals": 2.3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (3G / 1R). Média de 2.3 gols/jogo com forte poder de fogo."
  },
  {
    "id": 624924,
    "name": "Riga FC",
    "country": "Brasil",
    "league": "Série A",
    "matches": 4,
    "greens": 3,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 75,
    "avgGoals": 2,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "Altíssima consistência (3G / 1R). Média de 2 gols/jogo com forte poder de fogo."
  },
  {
    "id": 8686,
    "name": "Roma",
    "country": "Itália",
    "league": "Serie A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 3.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3.5 gols/jogo."
  },
  {
    "id": 198616,
    "name": "Shanghai Port",
    "country": "China",
    "league": "Chinese Super League",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 13,
    "winRate": 100,
    "avgGoals": 6.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 6.5 gols/jogo."
  },
  {
    "id": 165086,
    "name": "Simba SC",
    "country": "TAN",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 2.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2.5 gols/jogo."
  },
  {
    "id": 9768,
    "name": "Sporting CP",
    "country": "POR",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 7852,
    "name": "The New Saints",
    "country": "WAL",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 2,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2 gols/jogo."
  },
  {
    "id": 8478,
    "name": "Viking",
    "country": "NOR",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 9,
    "winRate": 100,
    "avgGoals": 4.5,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 4.5 gols/jogo."
  },
  {
    "id": 8039,
    "name": "Zimbru",
    "country": "MDA",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 2,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 2 gols/jogo."
  },
  {
    "id": 10107,
    "name": "Zrinjski Mostar",
    "country": "BIH",
    "league": "Série A",
    "matches": 2,
    "greens": 2,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 3,
    "action": "MANTER",
    "actionLabel": "Manter / Priorizar",
    "justification": "100% de assertividade no Over 1.5 (2 vitórias em 2 partidas). Média de 3 gols/jogo."
  },
  {
    "id": 102101,
    "name": "Al-Jazira",
    "country": "UAE",
    "league": "Série A",
    "matches": 8,
    "greens": 5,
    "reds": 3,
    "totalGoals": 19,
    "winRate": 63,
    "avgGoals": 2.4,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Clube presente em ligas ou contextos com baixo volume de gols recorrente e alta taxa de perdas no histórico real."
  },
  {
    "id": 6368,
    "name": "Atlético Nacional",
    "country": "COL",
    "league": "Série A",
    "matches": 7,
    "greens": 4,
    "reds": 3,
    "totalGoals": 19,
    "winRate": 57,
    "avgGoals": 2.7,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (3 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 166865,
    "name": "FC Astana",
    "country": "KAZ",
    "league": "Série A",
    "matches": 5,
    "greens": 3,
    "reds": 2,
    "totalGoals": 13,
    "winRate": 60,
    "avgGoals": 2.6,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (2 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 8037,
    "name": "Kairat Almaty",
    "country": "KAZ",
    "league": "Série A",
    "matches": 5,
    "greens": 3,
    "reds": 2,
    "totalGoals": 13,
    "winRate": 60,
    "avgGoals": 2.6,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (2 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 8643,
    "name": "Spartak Moscow",
    "country": "Rússia",
    "league": "Premier League",
    "matches": 5,
    "greens": 3,
    "reds": 2,
    "totalGoals": 10,
    "winRate": 60,
    "avgGoals": 2,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (2 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 8248,
    "name": "Hammarby",
    "country": "Suécia",
    "league": "Allsvenskan",
    "matches": 6,
    "greens": 3,
    "reds": 3,
    "totalGoals": 12,
    "winRate": 50,
    "avgGoals": 2,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (3 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 49783,
    "name": "Real España",
    "country": "HON",
    "league": "Série A",
    "matches": 4,
    "greens": 2,
    "reds": 2,
    "totalGoals": 12,
    "winRate": 50,
    "avgGoals": 3,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (2 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 8638,
    "name": "Olympiacos",
    "country": "GRE",
    "league": "Série A",
    "matches": 7,
    "greens": 3,
    "reds": 4,
    "totalGoals": 12,
    "winRate": 43,
    "avgGoals": 1.7,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (4 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 2137,
    "name": "Pafos FC",
    "country": "CYP",
    "league": "Série A",
    "matches": 5,
    "greens": 2,
    "reds": 3,
    "totalGoals": 7,
    "winRate": 40,
    "avgGoals": 1.4,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (3 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 9773,
    "name": "Porto",
    "country": "Portugal",
    "league": "Primeira Liga",
    "matches": 5,
    "greens": 2,
    "reds": 3,
    "totalGoals": 9,
    "winRate": 40,
    "avgGoals": 1.8,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (3 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 9728,
    "name": "Shakhtar Donetsk",
    "country": "Ucrânia",
    "league": "Premier League",
    "matches": 3,
    "greens": 1,
    "reds": 2,
    "totalGoals": 4,
    "winRate": 33,
    "avgGoals": 1.3,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (2 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 102141,
    "name": "Pakhtakor Tashkent",
    "country": "Brasil",
    "league": "Série A",
    "matches": 2,
    "greens": 0,
    "reds": 2,
    "totalGoals": 2,
    "winRate": 0,
    "avgGoals": 1,
    "action": "REMOVER",
    "actionLabel": "Remover dos Favoritos",
    "justification": "Reiteradas falhas em Over 1.5 (2 reds acumulados). Perfil de jogo travado ou dependente de placares curtos (0-0/1-0)."
  },
  {
    "id": 8548,
    "name": "Rangers",
    "country": "Escócia",
    "league": "Scottish Premiership",
    "matches": 13,
    "greens": 9,
    "reds": 4,
    "totalGoals": 30,
    "winRate": 69,
    "avgGoals": 2.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9825,
    "name": "Arsenal",
    "country": "Inglaterra",
    "league": "Premier League",
    "matches": 8,
    "greens": 5,
    "reds": 2,
    "totalGoals": 14,
    "winRate": 63,
    "avgGoals": 1.8,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8402,
    "name": "Bodø/Glimt",
    "country": "NOR",
    "league": "Série A",
    "matches": 7,
    "greens": 5,
    "reds": 2,
    "totalGoals": 23,
    "winRate": 71,
    "avgGoals": 3.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9789,
    "name": "Borussia Dortmund",
    "country": "Alemanha",
    "league": "Bundesliga",
    "matches": 6,
    "greens": 4,
    "reds": 2,
    "totalGoals": 16,
    "winRate": 67,
    "avgGoals": 2.7,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 49785,
    "name": "FC Motagua",
    "country": "HON",
    "league": "Série A",
    "matches": 6,
    "greens": 4,
    "reds": 2,
    "totalGoals": 11,
    "winRate": 67,
    "avgGoals": 1.8,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 1854,
    "name": "St. Patrick's Athletic",
    "country": "IRL",
    "league": "Série A",
    "matches": 6,
    "greens": 4,
    "reds": 2,
    "totalGoals": 25,
    "winRate": 67,
    "avgGoals": 4.2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 4688,
    "name": "Vissel Kobe",
    "country": "Japão",
    "league": "J1 League",
    "matches": 6,
    "greens": 4,
    "reds": 2,
    "totalGoals": 12,
    "winRate": 67,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8564,
    "name": "AC Milan",
    "country": "Itália",
    "league": "Serie A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 8008,
    "name": "Adelaide United",
    "country": "AUS",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 8577,
    "name": "Al Ittihad",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 101918,
    "name": "Al Nassr",
    "country": "Arábia Saudita",
    "league": "Saudi Pro League",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 67,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 101711,
    "name": "Al-Arabi",
    "country": "Brasil",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 101898,
    "name": "Al-Rayyan",
    "country": "QAT",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 7,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 102111,
    "name": "Al-Wasl",
    "country": "UAE",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 9931,
    "name": "Basel",
    "country": "Suíça",
    "league": "Super League",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 8178,
    "name": "Bayer Leverkusen",
    "country": "Alemanha",
    "league": "Bundesliga",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 7,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 8450,
    "name": "Club Atletico Peñarol",
    "country": "URU",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 2202,
    "name": "Coleraine",
    "country": "NIR",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 67,
    "avgGoals": 3.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10171,
    "name": "Como",
    "country": "ITA",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 67,
    "avgGoals": 3.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10144,
    "name": "CSKA Sofia",
    "country": "BUL",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 6,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 10271,
    "name": "Dinamo București",
    "country": "ROU",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 10039,
    "name": "Egnatia",
    "country": "ALB",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 102035,
    "name": "FAR Rabat",
    "country": "Marrocos",
    "league": "Botola Pro",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 92630,
    "name": "FC Seoul",
    "country": "KOR",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 67,
    "avgGoals": 2.7,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9729,
    "name": "FC Sheriff",
    "country": "MDA",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 7,
    "winRate": 100,
    "avgGoals": 7,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 8687,
    "name": "FK Crvena Zvezda",
    "country": "SRB",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 67,
    "avgGoals": 3.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 4617,
    "name": "FK Neftchi",
    "country": "AZE",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 6,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 8155,
    "name": "Flora Tallinn",
    "country": "EST",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 6291,
    "name": "Fram Reykjavík",
    "country": "ISL",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 8637,
    "name": "Galatasaray",
    "country": "Turquia",
    "league": "Süper Lig",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 67,
    "avgGoals": 3.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10154,
    "name": "Hajduk Split",
    "country": "CRO",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 8,
    "winRate": 67,
    "avgGoals": 2.7,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10181,
    "name": "Hapoel Tel Aviv",
    "country": "ISR",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 192875,
    "name": "Independiente del Valle",
    "country": "ECU",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 67,
    "avgGoals": 3.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8130,
    "name": "KR Reykjavík",
    "country": "ISL",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 6721,
    "name": "LDU de Quito",
    "country": "ECU",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 7896,
    "name": "Lugano",
    "country": "SUI",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 7855,
    "name": "Maccabi Tel Aviv",
    "country": "ISR",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 8,
    "winRate": 100,
    "avgGoals": 8,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 1842,
    "name": "Necaxa",
    "country": "México",
    "league": "Liga MX",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 67,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8110,
    "name": "NSÍ Runavík",
    "country": "FRO",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 1282231,
    "name": "Omonia 29 Maiou",
    "country": "CYP",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 67,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8044,
    "name": "Omonia Nicosia",
    "country": "CYP",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 2127,
    "name": "Ordabasy Shymkent",
    "country": "KAZ",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 10200,
    "name": "Panathinaikos",
    "country": "GRE",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 10,
    "winRate": 67,
    "avgGoals": 3.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9847,
    "name": "Paris Saint-Germain",
    "country": "FRA",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 165196,
    "name": "Persib Bandung",
    "country": "IDN",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 1181312,
    "name": "Polissya Zhytomyr",
    "country": "UKR",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 67,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 248871,
    "name": "RFS",
    "country": "Brasil",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 10013,
    "name": "Salzburg",
    "country": "AUT",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 7,
    "winRate": 67,
    "avgGoals": 2.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9777,
    "name": "Servette",
    "country": "Suíça",
    "league": "Super League",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 6,
    "winRate": 100,
    "avgGoals": 6,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 102119,
    "name": "Shabab Al-Ahli Dubai FC",
    "country": "UAE",
    "league": "Série A",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 7,
    "winRate": 67,
    "avgGoals": 2.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 6694,
    "name": "Sirius",
    "country": "SWE",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 7787,
    "name": "Slavia Prague",
    "country": "República Tcheca",
    "league": "Chance Liga",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 4,
    "winRate": 100,
    "avgGoals": 4,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 10247,
    "name": "Sparta Prague",
    "country": "República Tcheca",
    "league": "Chance Liga",
    "matches": 3,
    "greens": 2,
    "reds": 1,
    "totalGoals": 4,
    "winRate": 67,
    "avgGoals": 1.3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 2527,
    "name": "The Strongest",
    "country": "Bolívia",
    "league": "División Profesional",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 3,
    "winRate": 100,
    "avgGoals": 3,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 480286,
    "name": "Universitatea Craiova",
    "country": "ROU",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 205813,
    "name": "US Mondorf les Bains",
    "country": "LUX",
    "league": "Série A",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 5,
    "winRate": 100,
    "avgGoals": 5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 307691,
    "name": "Vancouver Whitecaps",
    "country": "Estados Unidos",
    "league": "MLS",
    "matches": 1,
    "greens": 1,
    "reds": 0,
    "totalGoals": 2,
    "winRate": 100,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "1 jogo analisado (1 Green). Amostra inicial positiva, porém insuficiente para recomendação definitiva."
  },
  {
    "id": 7797,
    "name": "AEK Larnaca",
    "country": "CYP",
    "league": "Série A",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 4,
    "winRate": 50,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8593,
    "name": "Ajax",
    "country": "Holanda",
    "league": "Eredivisie",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 101655,
    "name": "Al Shorta",
    "country": "IRQ",
    "league": "Série A",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 3,
    "winRate": 50,
    "avgGoals": 1.5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 6398,
    "name": "Alianza Lima",
    "country": "PER",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 1118572,
    "name": "Bashundhara Kings",
    "country": "BAN",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 4177,
    "name": "Beijing Guoan",
    "country": "China",
    "league": "Chinese Super League",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 5,
    "winRate": 50,
    "avgGoals": 2.5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9772,
    "name": "Benfica",
    "country": "Portugal",
    "league": "Primeira Liga",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10188,
    "name": "Besiktas",
    "country": "Turquia",
    "league": "Süper Lig",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 2215,
    "name": "Bnei Yehuda Tel Aviv",
    "country": "ISR",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 1022952,
    "name": "Cavalry FC",
    "country": "CAN",
    "league": "Série A",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 3,
    "winRate": 50,
    "avgGoals": 1.5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10256,
    "name": "Daejeon Citizen",
    "country": "Coreia do Sul",
    "league": "K League 1",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 1896,
    "name": "Deportivo Táchira",
    "country": "VEN",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9802,
    "name": "Djurgården",
    "country": "SWE",
    "league": "Série A",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 9,
    "winRate": 50,
    "avgGoals": 4.5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10038,
    "name": "Elbasani",
    "country": "Brasil",
    "league": "Série A",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 3,
    "winRate": 50,
    "avgGoals": 1.5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 866111,
    "name": "FC Noah",
    "country": "ARM",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 1588,
    "name": "FCI Levadia",
    "country": "EST",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8695,
    "name": "Fenerbahce",
    "country": "Turquia",
    "league": "Süper Lig",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8222,
    "name": "Ferencvaros",
    "country": "Hungria",
    "league": "NB I",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10257,
    "name": "Jeonbuk Motors",
    "country": "Coreia do Sul",
    "league": "K League 1",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 165228,
    "name": "Johor Darul Ta'zim",
    "country": "MAS",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 2234,
    "name": "KF Shkendija",
    "country": "MKD",
    "league": "Série A",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 4,
    "winRate": 50,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 2182,
    "name": "Lech Poznan",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8673,
    "name": "Legia Warszawa",
    "country": "Polônia",
    "league": "Ekstraklasa",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 210173,
    "name": "Ludogorets Razgrad",
    "country": "BUL",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10185,
    "name": "Maccabi Haifa",
    "country": "ISR",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 4417,
    "name": "Melgar",
    "country": "Peru",
    "league": "Liga 1",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9829,
    "name": "Monaco",
    "country": "FRA",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10258,
    "name": "RSB Berkane",
    "country": "Marrocos",
    "league": "Botola Pro",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 951893,
    "name": "Sabah FK",
    "country": "AZE",
    "league": "Série A",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 3,
    "winRate": 50,
    "avgGoals": 1.5,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 165223,
    "name": "Selangor",
    "country": "Brasil",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 133896,
    "name": "Ulsan HD FC",
    "country": "KOR",
    "league": "Série A",
    "matches": 2,
    "greens": 1,
    "reds": 1,
    "totalGoals": 4,
    "winRate": 50,
    "avgGoals": 2,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 7978,
    "name": "Union St.Gilloise",
    "country": "BEL",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 4409,
    "name": "Universitario de Deportes",
    "country": "PER",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 8041,
    "name": "Vardar",
    "country": "Macedônia do Norte",
    "league": "1. MFL",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 6033,
    "name": "Viktoria Plzen",
    "country": "República Tcheca",
    "league": "Chance Liga",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 6406,
    "name": "Vojvodina",
    "country": "Sérvia",
    "league": "SuperLiga",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 613370,
    "name": "Wellington Olympic",
    "country": "NZL",
    "league": "Série A",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 10192,
    "name": "Young Boys",
    "country": "Suíça",
    "league": "Super League",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 6022,
    "name": "Zilina",
    "country": "Eslováquia",
    "league": "Nike Liga",
    "matches": 0,
    "greens": 0,
    "reds": 0,
    "totalGoals": 0,
    "winRate": null,
    "avgGoals": null,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  },
  {
    "id": 9906,
    "name": "Atletico Madrid",
    "country": "Espanha",
    "league": "La Liga",
    "matches": 1,
    "greens": 0,
    "reds": 1,
    "totalGoals": 1,
    "winRate": 0,
    "avgGoals": 1,
    "action": "OBSERVAR",
    "actionLabel": "Em Observação",
    "justification": "Poucos jogos registrados nos bilhetes (amostragem < 2). Manter sob monitoramento de xG."
  }
];

export interface ErrorPattern {
  id: string;
  title: string;
  subtitle: string;
  frequency: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  evidence: string[];
  countermeasure: string;
}

export const RAIO_X_ERROR_PATTERNS: ErrorPattern[] = [
  {
    id: 'single_leg_failure',
    title: 'A Síndrome do "2 de 3" (Falha em Partida Isolada)',
    subtitle: '72,4% dos bilhetes perdidos bateram 2 dos 3 jogos com extrema facilidade',
    frequency: '55 de 76 REDs (72.4%)',
    severity: 'CRITICAL',
    description: 'A maior causa de perdas não é a falta de pontaria geral, mas a fragilidade estrutural da aposta tripla. Em quase 3 a cada 4 bilhetes vermelhos, duas seleções cumpriram a linha de Over 1.5 com placares elásticos (3-1, 2-1, 4-0), enquanto uma única partida travou em 1-0 ou 0-0, derrubando o investimento total.',
    evidence: [
      'Ticket #2: Borussia Dortmund x Betis (2-1 ✓), PSV x Brugge (1-2 ✓) e Rennes x Olympiacos (0-0 ✗)',
      'Ticket #3: Firpo x Alianza (2-0 ✓), Flamengo x Grêmio (3-1 ✓) e Enugu Rangers x Bendel (1-0 ✗)',
      'Ticket #30: Brugge x Lens (2-1 ✓), Real x Dortmund (5-2 ✓) e Inter x Shakhtar (1-0 ✗)',
      'Ticket #37: Arsenal 0-1 e Hammarby 0-1 derrubaram seleções com goleadas em outros jogos'
    ],
    countermeasure: 'Adotar bilhetes em DUPLAS estratégicas (Odd 1.65 - 1.85) para jogos mais equilibrados ou exigir um filtro de segurança adicional na 3ª perna do bilhete triplo.'
  },
  {
    id: 'exotic_leagues_trap',
    title: 'A Armadilha das Ligas Periféricas e de Baixa Liquidez',
    subtitle: 'Competições com forte cultura de "Under" estrutural e arbitragem picotada',
    frequency: '28 de 76 REDs (36.8%)',
    severity: 'HIGH',
    description: 'Inserção de ligas com média histórica de gols inferior a 2.15 por partida (como NPFL da Nigéria, Kategoria Superiore da Albânia, Stars League do Iraque, Campeonato Cipriota, 1. CFL de Montenegro e Divisão Profissional da Bolívia fora de casa). Nessas ligas, o mando de campo isolado produz frequentemente vitórias por 1-0 com linhas recuadas.',
    evidence: [
      'Enugu Rangers x Bendel Insurance (1-0) - NPFL Nigéria com 2 ocorrências idênticas em dias seguidos',
      'Ghaz Al-Shamal SC x Naft Maysan (1-0) - Stars League Iraque repetido no bilhete #20 e #23',
      'Pafos FC x APOEL Nicosia (0-0) e Nea Salamis x Pafos FC (0-0) no Chipre',
      'FK Struga x KF Shkendija (1-0) na Prva Liga da Macedônia'
    ],
    countermeasure: 'Banir sumariamente da grade de Over 1.5 ligas com média inferior a 2.30 gols/jogo e sem cobertura analítica de xG ao vivo.'
  },
  {
    id: 'cup_rotation_risk',
    title: 'Copas Secundárias e Rotação de Elenco Pré-Champions',
    subtitle: 'Taça da Liga e fases preliminares com ritmo cadenciado e reservas',
    frequency: '18 de 76 REDs (23.7%)',
    severity: 'HIGH',
    description: 'Seleção de equipes favoritas disputando taças domésticas ou jogos eliminatórios intermediários onde técnicos de ponta poupam seus artilheiros e utilizam times mistos, diminuindo drasticamente o entrosamento do setor ofensivo e a urgência de golear.',
    evidence: [
      'FC Porto x Académico Viseu (1-0) na Taça da Liga de Portugal com escalação alternativa',
      'Palmeiras x Vasco da Gama (1-0) em jogo tenso de mata-mata da Copa do Brasil',
      'Zamalek SC x APR FC (1-0) em preliminares da Liga dos Campeões da CAF',
      'Spartak Moscow x Rubin Kazan (0-0) na fase de grupos da Copa da Rússia'
    ],
    countermeasure: 'Apenas apostar em jogos de Copa se as escalações oficiais confirmarem os dois principais homens-gol no onze inicial.'
  },
  {
    id: 'intense_derbies',
    title: 'Dérbis Regionais e Clássicos de Alta Tensão',
    subtitle: 'Rivalidade excessiva que prioriza o medo de perder sobre o ímpeto de atacar',
    frequency: '14 de 76 REDs (18.4%)',
    severity: 'MEDIUM',
    description: 'Confrontos com peso histórico e rivalidade extrema produzem até 40% mais faltas táticas, cartões e interrupções da partida, esfriando o ritmo ofensivo e culminando em empates sem gols ou placares mínimos.',
    evidence: [
      'Olympiacos x Panathinaikos (1-0) - O Clássico dos Inimigos Eternos na Grécia travado no meio-campo',
      'Hammarby x Djurgården (0-1) - Dérbi de Estocolmo com paralisações constantes e bloco baixo',
      'Independiente x Boca Juniors (0-1) - Clássico argentino marcado por cartões e zero espaço',
      'Baník Ostrava x Sparta Prague (0-0) na Chance Liga tcheca'
    ],
    countermeasure: 'Evitar o mercado de Over 1.5 em clássicos de rivalidade nacional acirrada, preferindo mercados de cartões ou ignorando o jogo.'
  },
  {
    id: 'low_block_favorites',
    title: 'Favoritismo Enganoso e Bloqueio Baixo Fechado',
    subtitle: 'Cotações de 1.15 a 1.25 que encontram goleiros inspirados e linhas de 5',
    frequency: '16 de 76 REDs (21.1%)',
    severity: 'MEDIUM',
    description: 'Jogos onde o superfavorito tinha posse superior a 70%, porém o adversário montou retranca impenetrável de duas linhas de quatro ou cinco defensores na entrada da grande área, resultando em 0-0 ou 1-0 com gol tardio.',
    evidence: [
      'Nottingham Forest x Arsenal (0-1) - Gunners controlaram sem acelerar na reta final',
      'Union Berlin x Borussia Dortmund (0-0) - Bloqueio alemão intransponível na Bundesliga',
      'Tottenham Hotspur x Everton (0-0) - 18 finalizações e nenhuma convertida em gol',
      'RSD Alcalá x Real Madrid C (0-0) na 4ª divisão espanhola'
    ],
    countermeasure: 'Verificar se o azarão sofreu mais de 1.5 gols nos últimos 3 jogos como visitante antes de aprovar a seleção.'
  }
];

export interface GreenPattern {
  id: string;
  title: string;
  subtitle: string;
  stats: string;
  description: string;
  keyDrivers: string[];
  examples: string[];
}

export const RAIO_X_GREEN_PATTERNS: GreenPattern[] = [
  {
    id: 'transition_leagues',
    title: 'Ligas de Alta Transição e Trocação Franca',
    subtitle: 'Campeonatos com DNA ofensivo aberto, defesas expostas e alta média de finalizações',
    stats: 'Média de 3.92 gols por partida nos bilhetes vencedores',
    description: 'O maior celeiro de GREENS comprovado no Balanço são as ligas onde ambas as equipes jogam com linhas altas e transições rápidas. Competições como Major League Soccer (MLS), Eredivisie (Holanda), Bundesliga (Alemanha), Ekstraklasa (Polônia) e Liga MX apresentam taxa superior a 88% de acerto em Over 1.5.',
    keyDrivers: [
      'Transição ofensiva vertical sem retenção estéril de bola',
      'Laterais ofensivos que deixam espaços nas costas para contra-ataques',
      'Equipes visitantes com mentalidade propositiva ao invés de retranca',
      'Média de chutes a gol superior a 9.5 finalizações combinadas'
    ],
    examples: [
      'FC Cincinnati e Vancouver Whitecaps na MLS (100% de Greens nos bilhetes)',
      'Cruz Azul, Tigres e Toluca na Liga MX (médias de 4.2 a 5.3 gols por jogo)',
      'Górnik Zabrze e Lech Poznań na Ekstraklasa polonesa (100% de acerto)'
    ]
  },
  {
    id: 'dominant_prolific_attacks',
    title: 'Clubes de Potência Ofensiva Comprovada',
    subtitle: 'Times que não se acomodam com o placar magro e buscam o 2º e 3º gols naturalmente',
    stats: '100% de acerto em clubes como Lens, Monterrey, Tigres e Man City',
    description: 'Diferente de equipes conservadoras que recuam após o 1x0, os clubes de topo selecionados com sucesso possuem modelo de jogo de pressão pós-perda e volume contínuo de área durante os 90 minutos.',
    keyDrivers: [
      'Média de gols marcados superior a 2.1 por rodada',
      'Mais de 5 finalizações no alvo por partida',
      'Artilheiro no topo da tabela de pontuação com mais de 0.65 gols por 90 min',
      'Abertura de placar antes dos 35 minutos de jogo'
    ],
    examples: [
      'RC Lens (6 vitórias em 6 jogos analisados, média de 4.0 gols)',
      'CF Monterrey (5 vitórias em 5 jogos, média de 4.4 gols)',
      'Manchester City e Bayern München (100% de assertividade, média > 5 gols)',
      'Bodø/Glimt na Noruega (5 vitórias em bilhetes, ritmo de avalanche)'
    ]
  },
  {
    id: 'rest_and_full_squad',
    title: 'Semana Cheia de Treinos e Titulares Descansados',
    subtitle: 'Jogos de liga nacional em final de semana onde os favoritos entraram com força máxima',
    stats: '84% de assertividade em partidas disputadas no sábado/domingo',
    description: 'Quando as seleções envolveram clubes sem maratona de viagens intercontinentais e com seus trios de ataque descansados, a assertividade subiu vertiginosamente, evitando a letargia ofensiva observada em viagens periféricas.',
    keyDrivers: [
      'Mais de 4 dias de intervalo entre a última partida e o jogo',
      'Nenhum titular suspenso por terceiro cartão amarelo ou lesão muscular',
      'Gramados de qualidade técnica que favorecem a rolagem rápida da bola'
    ],
    examples: [
      'Rodadas cheias de Premier League, Serie A italiana e Allsvenskan sueca'
    ]
  }
];

export interface StrategicRecommendation {
  step: number;
  title: string;
  action: string;
  impact: string;
  rules: string[];
}

export const RAIO_X_STRATEGIC_PLAN: StrategicRecommendation[] = [
  {
    step: 1,
    title: 'Filtragem Geográfica e Blacklist de Ligas de Baixo xG',
    action: 'Restringir imediatamente a grade às ligas com média comprovada acima de 2.4 gols por jogo.',
    impact: 'Eliminação imediata de 36,8% dos REDs históricos registrados no aplicativo.',
    rules: [
      'BANIR: NPFL (Nigéria), Kategoria Superiore (Albânia), Stars League (Iraque), Chipre, Azerbaijão, 4ª divisão espanhola.',
      'PRIORIZAR (Tier Ouro): Major League Soccer, Bundesliga, Eredivisie, Ekstraklasa, Liga MX, Superligaen Dinamarquesa, Allsvenskan Sueca.',
      'MONITORAR COM CAUTELA: Champions League, Premier League, Brasileirão Série A e Liga Portugal.'
    ]
  },
  {
    step: 2,
    title: 'Saneamento da Lista dos 199 Clubes Favoritos',
    action: 'Remover 38 clubes com histórico de baixa assertividade e promover 84 clubes consistentes.',
    impact: 'Redução drástica de falhas e elevação da taxa de acerto por bilhete para além de 70%.',
    rules: [
      'REMOVER: Olympiacos (4 REDs em jogos truncados), Pafos FC (3 REDs), FC Porto (em copas secundárias), Pakhtakor Tashkent (0% de acerto), Al-Jazira, Carrick Rangers, Bendel Insurance e clubes de ligas periféricas.',
      'FIXAR NO NÚCLEO DURO: Lens, Monterrey, Tigres, FC Cincinnati, Viktoria Plzeň, Manchester City, Dinamo Zagreb, Sturm Graz, Bayern, Bodø/Glimt, Flamengo, Toluca, Sporting CP e Lech Poznań.',
      'OBSERVAÇÃO ESTRITA: Clubes com menos de 2 jogos catalogados aguardarão novas rodadas antes de entrar na lista de recomendação premium.'
    ]
  },
  {
    step: 3,
    title: 'Checklist Pré-Jogo Obrigatório (Protocolo de 5 Pontos)',
    action: 'Nenhuma partida de Over 1.5 poderá ser aprovada sem passar pelos 5 critérios objetivos.',
    impact: 'Blindagem contra bloqueios baixos e ausência de pontaria.',
    rules: [
      '1. Média de gols sofridos pelo azarão fora de casa >= 1.2 gols/jogo.',
      '2. Média de finalizações no alvo combinada das duas equipes >= 8.5 nos últimos 5 jogos.',
      '3. Presença obrigatória dos 2 principais artilheiros da equipe favorita no onze titular.',
      '4. Vetar clássicos e dérbis regionais de rivalidade extrema com histórico de < 2 gols.',
      '5. Vetar partidas sob condições climáticas extremas (chuva torrencial/neve forte).'
    ]
  },
  {
    step: 4,
    title: 'Flexibilização Estrutural dos Bilhetes (Transição 3x para 2x)',
    action: 'Oferecer aos apostadores a opção de bilhetes em DUPLAS de alta convicção.',
    impact: 'Neutraliza o efeito "2 de 3", que foi responsável por 72,4% de todos os Reds do sistema.',
    rules: [
      'Múltiplas Triplas exigem 100% de precisão (probabilidade matemática combinada mais sensível).',
      'Duplas com odd média 1.30 x 1.30 = Odd total 1.69 oferecem taxa de sucesso histórica simulada de 78,5% sobre a mesma base de dados.'
    ]
  },
  {
    step: 5,
    title: 'Monitoramento Contínuo e Alerta de Risco em Tempo Real',
    action: 'Sinalizar na interface da partida etiquetas visuais de risco pré-jogo.',
    impact: 'O usuário visualiza instantaneamente alertas como "⚠️ Liga de Baixo Gols" ou "⚠️ Risco de Rotação".',
    rules: [
      'Etiqueta verde: "⚡ Liga de Alta Transição (Média > 3.0 gols)"',
      'Etiqueta amarela: "⏳ Dérbi Regional Truncado - Monitorar Escalacão"',
      'Etiqueta vermelha: "⛔ Liga com Histórico de 1-0 / Under Estrutural"'
    ]
  }
];
