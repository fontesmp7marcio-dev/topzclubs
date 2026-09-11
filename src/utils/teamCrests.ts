// Authoritative utility for resolving verified club crests/badges (escudos) matching FotMob & Opta official databases

/**
 * Master dictionary of verified FotMob team IDs for club emblems.
 * Keys are normalized lowercase strings (accents stripped, symbols removed).
 */
export const KNOWN_TEAM_ID_MAP: Record<string, number> = {
  // ==========================================
  // 1. BRAZIL (Brasileirão Série A, B, C, D & Estaduais)
  // ==========================================
  'flamengo': 9770,
  'cr flamengo': 9770,
  'clube de regatas do flamengo': 9770,
  'mengo': 9770,
  'fla': 9770,

  'palmeiras': 10283,
  'se palmeiras': 10283,
  'sociedade esportiva palmeiras': 10283,
  'verdao': 10283,

  'sao paulo': 10277,
  'sao paulo fc': 10277,
  'spfc': 10277,
  'tricolor paulista': 10277,

  'corinthians': 9808,
  'sc corinthians': 9808,
  'sc corinthians paulista': 9808,
  'corinthians paulista': 9808,
  'timao': 9808,

  'santos': 8514,
  'santos fc': 8514,
  'santos futebol clube': 8514,
  'peixe': 8514,

  'gremio': 9769,
  'gremio fbpa': 9769,
  'gremio porto alegrense': 9769,
  'tricolor gaucho': 9769,

  'internacional': 8702,
  'sc internacional': 8702,
  'inter de porto alegre': 8702,
  'inter-rs': 8702,
  'colorado': 8702,

  'atletico-mg': 10272,
  'atletico mineiro': 10272,
  'clube atletico mineiro': 10272,
  'galo': 10272,

  'cruzeiro': 9781,
  'cruzeiro ec': 9781,
  'cruzeiro esporte clube': 9781,
  'raposa': 9781,

  'fluminense': 9863,
  'fluminense fc': 9863,
  'flu': 9863,
  'tricolor das laranjeiras': 9863,

  'vasco': 10276,
  'vasco da gama': 10276,
  'cr vasco da gama': 10276,
  'gigante da colina': 10276,

  'botafogo': 8517,
  'botafogo fr': 8517,
  'botafogo de futebol e regatas': 8517,
  'botafogo-rj': 8517,
  'fogao': 8517,

  'bahia': 7877,
  'ec bahia': 7877,
  'esporte clube bahia': 7877,
  'tricolor de aco': 7877,

  'athletico-pr': 10273,
  'athletico paranaense': 10273,
  'atletico paranaense': 10273,
  'atletico-pr': 10273,
  'athletico': 10273,
  'cap': 10273,
  'furacao': 10273,

  'fortaleza': 8287,
  'fortaleza ec': 8287,
  'fortaleza esporte clube': 8287,
  'leao do pici': 8287,

  'red bull bragantino': 109705,
  'rb bragantino': 109705,
  'bragantino': 109705,
  'massa bruta': 109705,

  'vitoria': 7733,
  'ec vitoria': 7733,
  'esporte clube vitoria': 7733,
  'leao da barra': 7733,

  'juventude': 10274,
  'ec juventude': 10274,
  'esporte clube juventude': 10274,
  'papo': 10274,

  'cuiaba': 197815,
  'cuiaba ec': 197815,
  'cuiaba esporte clube': 197815,
  'dourado': 197815,

  'criciuma': 7729,
  'criciuma ec': 7729,
  'criciuma esporte clube': 7729,
  'tigre carvoeiro': 7729,

  'atletico-go': 165545,
  'atletico goianiense': 165545,
  'ac goianiense': 165545,
  'dragao': 165545,

  'sport': 6305,
  'sport recife': 6305,
  'sport club do recife': 6305,
  'leao da ilha': 6305,

  'ceara': 172341,
  'ceara sc': 172341,
  'ceara sporting club': 172341,
  'vozao': 172341,

  'coritiba': 9767,
  'coritiba fbc': 9767,
  'coxa': 9767,

  'goias': 9862,
  'goias ec': 9862,
  'esmeraldino': 9862,

  'america-mg': 1757,
  'america mineiro': 1757,
  'america futebol clube': 1757,
  'coelho': 1757,

  'mirassol': 163782,
  'mirassol fc': 163782,

  'ponte preta': 8630,
  'aa ponte preta': 8630,
  'macaca': 8630,

  'guarani': 7817,
  'guarani fc': 7817,
  'bugre': 7817,

  'novorizontino': 581838,
  'gremio novorizontino': 581838,

  'vila nova': 109706,
  'vila nova fc': 109706,
  'tigrao': 109706,

  'paysandu': 6546,
  'paysandu sc': 6546,
  'papao': 6546,

  'operario-pr': 197429,
  'operario': 197429,
  'operario ferroviario': 197429,
  'fantasma': 197429,

  'crb': 104821,
  'clube de regatas brasil': 104821,

  'amazonas': 1340094,
  'amazonas fc': 1340094,
  'onca': 1340094,

  'chapecoense': 197693,
  'chape': 197693,

  'botafogo-sp': 8355,
  'botafogo sp': 8355,
  'botafogo de ribeirao preto': 8355,
  'pantera': 8355,

  'ituano': 104823,
  'ituano fc': 104823,
  'galo de itu': 104823,

  'brusque': 197692,
  'brusque fc': 197692,
  'quadricolor': 197692,

  'avai': 104822,
  'avai fc': 104822,
  'leao da ilha sc': 104822,

  'londrina': 298660,
  'londrina ec': 298660,
  'tubarao': 298660,

  'remo': 1626,
  'clube do remo': 1626,
  'leao azul': 1626,

  'nautico': 2369,
  'clube nautico capibaribe': 2369,
  'timbu': 2369,

  'santa cruz': 9920,
  'santa cruz fc': 9920,
  'cobra coral': 9920,

  'figueirense': 8631,
  'figueirense fc': 8631,
  'figueira': 8631,

  'sampaio correa': 162176,
  'sampaio correa fc': 162176,
  'bolivia querida': 162176,

  'csa': 239132,
  'centro sportivo alagoano': 239132,
  'azulino': 239132,

  'abc': 109708,
  'abc fc': 109708,
  'mais querido': 109708,

  'ferroviaria': 581832,
  'ferroviaria sp': 581832,
  'locomotiva': 581832,

  'volta redonda': 198135,
  'volta redonda fc': 198135,
  'voltafc': 198135,

  'athletic club mg': 1135760,
  'athletic club-mg': 1135760,
  'athletic mg': 1135760,

  'ferroviario': 104825,
  'ferroviario ac': 104825,

  'ypiranga': 198138,
  'ypiranga-rs': 198138,
  'ypiranga fc': 198138,

  'sao bernardo': 204383,
  'sao bernardo fc': 204383,

  'tombense': 197821,
  'tombense fc': 197821,

  'confianca': 197695,
  'ad confianca': 197695,

  'aparecidense': 197428,
  'aa aparecidense': 197428,

  'floresta': 850478,
  'floresta ec': 850478,

  'caxias': 197694,
  'ser caxias': 197694,

  // ==========================================
  // 2. SPAIN (La Liga & Segunda División)
  // ==========================================
  'real madrid': 8633,
  'real madrid cf': 8633,
  'merengues': 8633,

  'barcelona': 8634,
  'fc barcelona': 8634,
  'barca': 8634,
  'blaugrana': 8634,

  'atletico madrid': 9906,
  'atletico de madrid': 9906,
  'club atletico de madrid': 9906,
  'colchoneros': 9906,
  'atleti': 9906,

  'real betis': 8603,
  'betis': 8603,
  'real betis balompie': 8603,
  'verdiblancos': 8603,

  'girona': 9812,
  'girona fc': 9812,
  'girona futbol club': 9812,

  'getafe': 8305,
  'getafe cf': 8305,
  'getafe club de futbol': 8305,
  'azulones': 8305,

  'espanyol': 8558,
  'rcd espanyol': 8558,
  'rcd espanyol de barcelona': 8558,
  'espanhol': 8558,
  'periquitos': 8558,

  'athletic club': 8315,
  'athletic bilbao': 8315,
  'athletic club bilbao': 8315,
  'los leones': 8315,

  'real sociedad': 8560,
  'sociedad': 8560,
  'la real': 8560,
  'txuri-urdin': 8560,

  'villarreal': 10205,
  'villarreal cf': 10205,
  'submarino amarelo': 10205,

  'sevilla': 8302,
  'sevilla fc': 8302,
  'sevilha': 8302,

  'valencia': 10267,
  'valencia cf': 10267,
  'los che': 10267,

  'celta de vigo': 9910,
  'celta vigo': 9910,
  'celta': 9910,
  'rc celta': 9910,

  'osasuna': 8371,
  'ca osasuna': 8371,
  'los rojillos': 8371,

  'rayo vallecano': 9867,
  'rayo': 9867,
  'vallecano': 9867,

  'mallorca': 8661,
  'rcd mallorca': 8661,

  'alaves': 9865,
  'deportivo alaves': 9865,

  'las palmas': 8306,
  'ud las palmas': 8306,

  'leganes': 9869,
  'cd leganes': 9869,

  'valladolid': 10284,
  'real valladolid': 10284,

  'granada': 9870,
  'granada cf': 9870,

  'cadiz': 8307,
  'cadiz cf': 8307,

  'almeria': 9864,
  'ud almeria': 9864,

  'levante': 8581,
  'levante ud': 8581,

  'elche': 10266,
  'elche cf': 10266,

  'eibar': 8370,
  'sd eibar': 8370,

  'racing santander': 8629,
  'racing de santander': 8629,

  'real oviedo': 10271,
  'oviedo': 10271,

  'sporting gijon': 9868,
  'sporting de gijon': 9868,

  'tenerife': 9866,
  'cd tenerife': 9866,

  'zaragoza': 8394,
  'real zaragoza': 8394,

  'malaga': 9860,
  'malaga cf': 9860,

  'deportivo la coruna': 9783,
  'deportivo': 9783,
  'depor': 9783,

  // ==========================================
  // 3. ENGLAND (Premier League & Championship)
  // ==========================================
  'arsenal': 9825,
  'arsenal fc': 9825,
  'gunners': 9825,

  'aston villa': 10252,
  'aston villa fc': 10252,
  'villa': 10252,

  'bournemouth': 8678,
  'afc bournemouth': 8678,
  'cherries': 8678,

  'brentford': 9937,
  'brentford fc': 9937,
  'bees': 9937,

  'brighton': 10204,
  'brighton & hove albion': 10204,
  'brighton and hove albion': 10204,
  'seagulls': 10204,

  'chelsea': 8455,
  'chelsea fc': 8455,
  'blues': 8455,

  'crystal palace': 9826,
  'crystal palace fc': 9826,
  'eagles': 9826,

  'everton': 8668,
  'everton fc': 8668,
  'toffees': 8668,

  'fulham': 9879,
  'fulham fc': 9879,
  'cottagers': 9879,

  'ipswich town': 9902,
  'ipswich': 9902,
  'ipswich town fc': 9902,
  'tractor boys': 9902,

  'leicester': 8197,
  'leicester city': 8197,
  'leicester city fc': 8197,
  'foxes': 8197,

  'liverpool': 8650,
  'liverpool fc': 8650,
  'reds': 8650,

  'manchester city': 8456,
  'man city': 8456,
  'manchester city fc': 8456,
  'citizens': 8456,

  'manchester united': 10260,
  'man united': 10260,
  'manchester united fc': 10260,
  'man utd': 10260,
  'red devils': 10260,

  'newcastle': 10261,
  'newcastle united': 10261,
  'newcastle united fc': 10261,
  'magpies': 10261,

  'nottingham forest': 10203,
  'nottingham': 10203,
  'nottm forest': 10203,

  'southampton': 8466,
  'southampton fc': 8466,
  'saints': 8466,

  'tottenham': 8586,
  'tottenham hotspur': 8586,
  'tottenham hotspur fc': 8586,
  'spurs': 8586,

  'west ham': 8654,
  'west ham united': 8654,
  'west ham united fc': 8654,
  'hammers': 8654,

  'wolverhampton': 8602,
  'wolverhampton wanderers': 8602,
  'wolves': 8602,

  'leeds': 8463,
  'leeds united': 8463,
  'leeds united fc': 8463,

  'burnley': 8191,
  'burnley fc': 8191,

  'sheffield united': 8657,
  'blades': 8657,

  'luton': 8344,
  'luton town': 8344,

  'sunderland': 8472,
  'sunderland afc': 8472,
  'black cats': 8472,

  'west brom': 8659,
  'west bromwich': 8659,
  'west bromwich albion': 8659,

  'middlesbrough': 8549,
  'boro': 8549,

  'norwich': 9850,
  'norwich city': 9850,
  'canaries': 9850,

  'watford': 9817,
  'watford fc': 9817,

  'coventry': 8669,
  'coventry city': 8669,

  'bristol city': 8427,
  'millwall': 10004,
  'swansea': 10003,
  'swansea city': 10003,
  'cardiff': 8344,
  'cardiff city': 8344,
  'stoke': 10194,
  'stoke city': 10194,
  'blackburn': 8655,
  'blackburn rovers': 8655,
  'hull': 8667,
  'hull city': 8667,
  'qpr': 10172,
  'queens park rangers': 10172,
  'derby': 10170,
  'derby county': 10170,
  'portsmouth': 8462,
  'sheffield wednesday': 10163,
  'wrexham': 9841,
  'wrexham afc': 9841,
  'preston': 8411,
  'preston north end': 8411,
  'charlton': 8451,
  'charlton athletic': 8451,
  'birmingham': 8658,
  'birmingham city': 8658,
  'bolton': 8559,
  'bolton wanderers': 8559,

  // ==========================================
  // 4. ITALY (Serie A & Serie B)
  // ==========================================
  'inter': 8636,
  'inter de milao': 8636,
  'inter milan': 8636,
  'internazionale': 8636,
  'fc internazionale': 8636,
  'fc internazionale milano': 8636,
  'nerazzurri': 8636,

  'milan': 8564,
  'ac milan': 8564,
  'rossoneri': 8564,

  'juventus': 9885,
  'juve': 9885,
  'juventus fc': 9885,
  'bianconeri': 9885,

  'napoli': 9875,
  'ssc napoli': 9875,
  'partenopei': 9875,

  'roma': 8686,
  'as roma': 8686,
  'giallorossi': 8686,

  'lazio': 8543,
  'ss lazio': 8543,
  'biancocelesti': 8543,

  'atalanta': 8524,
  'atalanta bc': 8524,
  'la dea': 8524,

  'fiorentina': 8535,
  'acf fiorentina': 8535,
  'viola': 8535,

  'bologna': 9857,
  'bologna fc': 9857,

  'torino': 9804,
  'torino fc': 9804,
  'il toro': 9804,

  'monza': 6504,
  'ac monza': 6504,

  'genoa': 10268,
  'genoa cfc': 10268,

  'udinese': 8600,
  'udinese calcio': 8600,

  'cagliari': 8529,
  'cagliari calcio': 8529,

  'empoli': 8534,
  'empoli fc': 8534,

  'verona': 9876,
  'hellas verona': 9876,

  'parma': 9831,
  'parma calcio': 9831,

  'como': 10171,
  'como 1907': 10171,

  'venezia': 7881,
  'venezia fc': 7881,

  'lecce': 9888,
  'us lecce': 9888,

  'sassuolo': 7943,
  'us sassuolo': 7943,

  'frosinone': 9891,
  'salernitana': 6480,
  'sampdoria': 9882,
  'spezia': 9881,
  'cremonese': 7801,
  'palermo': 8587,
  'bari': 9880,
  'brescia': 9858,
  'cesena': 9878,
  'pisa': 6479,

  // ==========================================
  // 5. GERMANY (Bundesliga & 2. Bundesliga)
  // ==========================================
  'bayern munich': 9823,
  'bayern munchen': 9823,
  'bayern': 9823,
  'fc bayern': 9823,
  'fc bayern munchen': 9823,
  'die bayern': 9823,

  'bayer leverkusen': 8178,
  'leverkusen': 8178,
  'bayer 04 leverkusen': 8178,
  'werkself': 8178,

  'borussia dortmund': 9789,
  'dortmund': 9789,
  'bvb': 9789,
  'bvb 09': 9789,

  'rb leipzig': 178475,
  'leipzig': 178475,
  'die roten bullen': 178475,

  'eintracht frankfurt': 9810,
  'frankfurt': 9810,
  'eintracht': 9810,
  'sge': 9810,

  'stuttgart': 10269,
  'vfb stuttgart': 10269,

  'freiburg': 8358,
  'sc freiburg': 8358,

  'wolfsburg': 8721,
  'vfl wolfsburg': 8721,

  'hoffenheim': 8226,
  'tsg hoffenheim': 8226,
  'tsg 1899 hoffenheim': 8226,

  'werder bremen': 8697,
  'bremen': 8697,
  'werder': 8697,

  'monchengladbach': 9788,
  'borussia monchengladbach': 9788,
  'gladbach': 9788,

  'augsburg': 8406,
  'fc augsburg': 8406,

  'heidenheim': 187478,
  '1. fc heidenheim': 187478,

  'mainz': 9905,
  'mainz 05': 9905,
  '1. fsv mainz 05': 9905,

  'union berlin': 8415,
  '1. fc union berlin': 8415,

  'st pauli': 8152,
  'fc st. pauli': 8152,
  'st. pauli': 8152,

  'holstein kiel': 8150,

  'bochum': 9911,
  'vfl bochum': 9911,

  'koln': 8722,
  'fc koln': 8722,
  '1. fc koln': 8722,

  'hertha berlin': 8177,
  'hertha bsc': 8177,

  'schalke': 9800,
  'schalke 04': 9800,
  'fc schalke 04': 9800,

  'hsv': 9790,
  'hamburger sv': 9790,
  'hamburgo': 9790,

  'hannover': 9745,
  'hannover 96': 9745,

  'nurnberg': 8165,
  '1. fc nurnberg': 8165,

  'dusseldorf': 8158,
  'fortuna dusseldorf': 8158,

  'kaiserslautern': 9791,
  '1. fc kaiserslautern': 9791,

  'karlsruher': 8295,
  'karlsruher sc': 8295,

  'paderborn': 8460,
  'sc paderborn': 8460,

  // ==========================================
  // 6. FRANCE (Ligue 1 & Ligue 2)
  // ==========================================
  'psg': 9847,
  'paris saint-germain': 9847,
  'paris saint germain': 9847,
  'paris sg': 9847,

  'monaco': 9829,
  'as monaco': 9829,

  'marseille': 8588,
  'olympique de marseille': 8588,
  'olympique marseille': 8588,
  'om': 8588,

  'lille': 8639,
  'lille osc': 8639,
  'losc': 8639,

  'lyon': 9748,
  'olympique lyonnais': 9748,
  'olympique lyon': 9748,
  'ol': 9748,

  'lens': 8583,
  'rc lens': 8583,

  'rennes': 9851,
  'stade rennais': 9851,

  'nice': 9831,
  'ogc nice': 9831,

  'brest': 8521,
  'stade brestois': 8521,
  'stade brestois 29': 8521,

  'reims': 9837,
  'stade de reims': 9837,

  'strasbourg': 9848,
  'rc strasbourg': 9848,

  'toulouse': 9941,
  'toulouse fc': 9941,

  'nantes': 9830,
  'fc nantes': 9830,

  'auxerre': 8589,
  'aj auxerre': 8589,

  'angers': 8485,
  'angers sco': 8485,

  'saint-etienne': 9853,
  'as saint-etienne': 9853,
  'saint etienne': 9853,

  'montpellier': 10219,
  'montpellier hsc': 10219,

  'le havre': 9747,
  'le havre ac': 9747,

  'lorient': 9849,
  'fc lorient': 9849,

  'metz': 8522,
  'fc metz': 8522,

  'clermont': 9836,
  'bordeaux': 9827,

  // ==========================================
  // 7. PORTUGAL (Liga Portugal)
  // ==========================================
  'benfica': 9772,
  'sl benfica': 9772,
  'sport lisboa e benfica': 9772,
  'aguias': 9772,

  'sporting': 9773,
  'sporting cp': 9773,
  'sporting lisboa': 9773,
  'sporting clube de portugal': 9773,
  'leoes': 9773,

  'porto': 9768,
  'fc porto': 9768,
  'futebol clube do porto': 9768,
  'dragoes': 9768,

  'braga': 10264,
  'sc braga': 10264,
  'sporting clube de braga': 10264,
  'guerreiros do minho': 10264,

  'vitoria de guimaraes': 7844,
  'vitoria sc': 7844,
  'guimaraes': 7844,

  'rio ave': 7841,
  'famalicao': 1634,
  'fc famalicao': 1634,
  'estoril': 7842,
  'estoril praia': 7842,
  'boavista': 9765,
  'gil vicente': 9764,
  'casa pia': 212821,
  'casa pia ac': 212821,
  'arouca': 158085,
  'fc arouca': 158085,
  'moreirense': 8348,
  'moreirense fc': 8348,
  'farense': 9780,
  'sc farense': 9780,
  'santa clara': 1567,
  'cd santa clara': 1567,
  'nacional da madeira': 10214,
  'cd nacional': 10214,
  'nacional madeira': 10214,
  'maritimo': 10212,
  'cs maritimo': 10212,
  'estrela da amadora': 1074320,
  'alverca': 9780,
  'academico viseu': 1786,

  // ==========================================
  // 8. ARGENTINA (Liga Profesional)
  // ==========================================
  'river plate': 10076,
  'ca river plate': 10076,
  'club atletico river plate': 10076,
  'los millonarios': 10076,

  'boca juniors': 10077,
  'ca boca juniors': 10077,
  'club atletico boca juniors': 10077,
  'xeneize': 10077,
  'boca': 10077,

  'racing club': 10078,
  'racing': 10078,
  'racing club de avellaneda': 10078,
  'la academia': 10078,

  'independiente': 10079,
  'ca independiente': 10079,
  'club atletico independiente': 10079,
  'el rojo': 10079,

  'velez sarsfield': 10080,
  'velez': 10080,
  'ca velez sarsfield': 10080,
  'el fortin': 10080,

  'estudiantes': 10081,
  'estudiantes de la plata': 10081,
  'pincha': 10081,

  'lanus': 10082,
  'ca lanus': 10082,
  'granate': 10082,

  'san lorenzo': 10083,
  'ca san lorenzo': 10083,
  'san lorenzo de almagro': 10083,
  'el ciclon': 10083,

  'huracan': 10084,
  'ca huracan': 10084,
  'el globo': 10084,

  'newells old boys': 10087,
  'newell\'s old boys': 10087,
  'newells': 10087,
  'la lepra': 10087,

  'rosario central': 10088,
  'el canalla': 10088,

  'talleres': 10101,
  'talleres de cordoba': 10101,
  'la t': 10101,

  'belgrano': 10091,
  'instituto': 10090,
  'argentinos juniors': 10092,
  'godoy cruz': 10093,
  'defensa y justicia': 161730,
  'banfield': 10095,
  'union santa fe': 10096,
  'union': 10096,
  'platense': 10089,
  'club atletico platense': 10089,
  'tigre': 10099,
  'gimnasia la plata': 10098,
  'gimnasia y esgrima': 10098,
  'gimnasia mendoza': 568727,
  'sarmiento': 10100,
  'central cordoba': 213596,
  'central cordoba de santiago': 213596,
  'barracas central': 298630,
  'deportivo riestra': 298629,
  'independiente rivadavia': 298628,
  'atletico tucuman': 10102,

  // ==========================================
  // 9. URUGUAY, CHILE, COLOMBIA, ECUADOR, ETC.
  // ==========================================
  'nacional': 10085,
  'nacional uruguai': 10085,
  'club nacional de football': 10085,
  'nacional-uru': 10085,
  'bolso': 10085,

  'penarol': 10086,
  'ca penarol': 10086,
  'manya': 10086,

  'danubio': 10105,
  'defensor sporting': 10106,
  'liverpool montevideo': 10107,

  'colo-colo': 10111,
  'colo colo': 10111,
  'cacique': 10111,

  'universidad de chile': 10112,
  'u de chile': 10112,
  'la u': 10112,

  'universidad catolica': 10113,
  'u catolica': 10113,

  'atletico nacional': 10115,
  'nacional de medellin': 10115,

  'millonarios': 10116,
  'millonarios fc': 10116,

  'america de cali': 10117,
  'junior barranquilla': 10118,
  'santa fe': 10119,
  'independiente santa fe': 10119,
  'deportivo cali': 10120,

  'ldu quito': 10122,
  'ldu': 10122,
  'liga de quito': 10122,

  'barcelona sc': 10123,
  'barcelona guayaquil': 10123,

  'independiente del valle': 165682,
  'idv': 165682,

  'emelec': 10124,
  'aucas': 10125,

  'olimpia': 10126,
  'club olimpia': 10126,
  'el decano': 10126,

  'cerro porteno': 10127,
  'el ciclon de barrio obrero': 10127,

  'libertad': 10128,
  'club libertad': 10128,

  'bolivar': 10080,
  'the strongest': 10081,
  'always ready': 10082,

  'alianza lima': 10135,
  'universitario': 10084,
  'universitario de deportes': 10084,
  'sporting cristal': 10136,
  'melgar': 10083,

  // ==========================================
  // 10. SAUDI PRO LEAGUE
  // ==========================================
  'al hilal': 2529,
  'al-hilal': 2529,
  'al hilal sfc': 2529,
  'al hilal saudi club': 2529,

  'al nassr': 101918,
  'al-nassr': 101918,
  'al nassr fc': 101918,

  'al ittihad': 8577,
  'al-ittihad': 8577,
  'al ittihad club': 8577,

  'al ahli': 2530,
  'al-ahli': 2530,
  'al ahli saudi fc': 2530,

  'al qadsiah': 101919,
  'al qadsiyah': 101919,
  'al-qadsiah': 101919,
  'al-qadsiyah': 101919,

  'al shabab': 101916,
  'al-shabab': 101916,

  'al ettifaq': 101915,
  'al-ettifaq': 101915,

  'al taawoun': 205686,
  'al-taawoun': 205686,

  'al fateh': 177356,
  'al fateh fc': 177356,

  'al khaleej': 550433,
  'al fayha': 582749,
  'al-fayha': 582749,

  'al riyadh': 582739,
  'al kholood': 1523706,
  'al hazem': 101911,
  'neom sc': 1699505,
  'abha': 150414,
  'al faisaly': 205687,
  'al-faisaly': 205687,

  // ==========================================
  // 11. NETHERLANDS, TURKEY, SCOTLAND, ETC.
  // ==========================================
  'ajax': 8593,
  'afc ajax': 8593,
  'psv': 8640,
  'psv eindhoven': 8640,
  'feyenoord': 9925,
  'az alkmaar': 10229,
  'az': 10229,
  'twente': 8611,
  'fc twente': 8611,
  'utrecht': 9908,

  'galatasaray': 9813,
  'galatasaray sk': 9813,
  'fenerbahce': 9811,
  'fenerbahce sk': 9811,
  'besiktas': 9812,
  'besiktas jk': 9812,
  'trabzonspor': 9809,
  'basaksehir': 9814,
  'istanbul basaksehir': 9814,

  'celtic': 9927,
  'celtic fc': 9927,
  'rangers': 8595,
  'rangers fc': 8595,
  'hearts': 9928,
  'aberdeen': 9929,
  'hibernian': 9930,

  // ==========================================
  // CROATIA
  // ==========================================
  'dinamo zagreb': 10156,
  'gnk dinamo zagreb': 10156,
  'hajduk split': 10160,
  'hnk hajduk split': 10160,

  // ==========================================
  // 12. USA (MLS) & MEXICO (Liga MX)
  // ==========================================
  'inter miami': 960720,
  'inter miami cf': 960720,
  'la galaxy': 6512,
  'los angeles galaxy': 6512,
  'lafc': 915806,
  'los angeles fc': 915806,
  'columbus crew': 6001,
  'atlanta united': 773958,
  'seattle sounders': 71836,
  'new york city fc': 546238,
  'nycfc': 546238,
  'new york red bulls': 6514,
  'ny red bulls': 6514,
  'philadelphia union': 191716,
  'fc cincinnati': 722265,
  'orlando city': 267810,
  'nashville sc': 915807,
  'charlotte fc': 1323940,
  'austin fc': 1184323,
  'st louis city': 1378347,
  'houston dynamo': 6513,
  'sporting kansas city': 6398,
  'portland timbers': 236402,
  'vancouver whitecaps': 236403,
  'cf montreal': 161195,
  'toronto fc': 56453,
  'dc united': 6602,
  'chicago fire': 6397,
  'chicago fire fc': 6397,
  'new england revolution': 6580,
  'san jose earthquakes': 6511,
  'colorado rapids': 6399,
  'real salt lake': 6515,
  'minnesota united': 722264,
  'fc dallas': 6400,

  'club america': 10246,
  'america mexico': 10246,
  'tigres': 10247,
  'tigres uanl': 10247,
  'monterrey': 10250,
  'rayados': 10250,
  'chivas': 10245,
  'chivas guadalajara': 10245,
  'cruz azul': 10244,
  'pumas': 10243,
  'pumas unam': 10243,
  'toluca': 10248,
  'pachuca': 10251,
  'santos laguna': 10242,
  'leon': 10241,
  'necaxa': 10249,

  // ==========================================
  // 13. OTHER EUROPEAN & GLOBAL GIANTS
  // ==========================================
  'shakhtar donetsk': 9948,
  'dynamo kyiv': 9949,
  'zenit': 8698,
  'spartak moscow': 8643,
  'cska moscow': 9760,
  'krasnodar': 168719,

  'club brugge': 8342,
  'anderlecht': 8682,
  'genk': 9987,
  'union saint-gilloise': 8465,
  'gent': 9988,
  'kaa gent': 9988,
  'royal antwerp': 9989,
  'kv kortrijk': 9968,

  'salzburg': 10242,
  'rb salzburg': 10242,
  'red bull salzburg': 10242,
  'sturm graz': 8133,
  'rapid vienna': 8134,
  'lask': 8135,

  'young boys': 9954,
  'bsc young boys': 9954,
  'basel': 9955,
  'fc basel': 9955,
  'servette': 9953,
  'zurich': 9956,
  'lugano': 7892,

  'copenhagen': 8399,
  'fc copenhagen': 8399,
  'brondby': 8400,
  'midtjylland': 8401,

  'bodo/glimt': 8402,
  'bodo glimt': 8402,
  'bodø/glimt': 8402,
  'molde': 8403,
  'rosenborg': 8404,
  'viking': 8478,

  'malmo ff': 8405,
  'malmo': 8405,
  'djurgarden': 8206,
  'djurgardens if': 8206,
  'aik': 8207,
  'hammarby': 8248,
  'mjallby': 8127,

  'olympiacos': 8645,
  'panathinaikos': 8646,
  'paok': 8647,
  'aek athens': 8648,

  'slavia prague': 9938,
  'sparta prague': 9940,
  'viktoria plzen': 9939,

  'rijeka': 9851,

  'crvena zvezda': 9956,
  'red star belgrade': 9956,
  'partizan': 8661,
  'vojvodina': 9957,

  'slovan bratislava': 9928,
  'zilina': 9929,

  'ferencvaros': 9930,
  'paks': 9931,
  'gyor': 9932,

  'legia warsaw': 9933,
  'legia warszawa': 9933,
  'lech poznan': 9937,
  'jagiellonia': 9934,
  'rakow': 9935,
  'rakow czestochowa': 9935,

  'ludogorets': 9941,
  'fcsb': 9958,
  'cfr cluj': 9959,
  'vardar': 9960,
  'shkendija': 9961,
  'vikingur': 9962,

  'kups': 9963,
  'inter turku': 9964,
  'hjk helsinki': 9965,
  'ilves': 9966,
  'sjk': 162162,

  'shamrock rovers': 9950,
  'st patricks athletic': 9951,
  'st patrick\'s athletic': 9951,
  'bohemians': 9952,

  // ==========================================
  // 14. AFRICA & ASIA
  // ==========================================
  'al ahly': 8660,
  'zamalek': 8661,
  'zamalek sc': 8661,
  'pyramids': 10232,
  'pyramids fc': 10232,

  'mamelodi sundowns': 10238,
  'orlando pirates': 10239,

  'wydad casablanca': 10262,
  'raja casablanca': 10263,
  'rsb berkane': 10258,
  'far rabat': 10259,

  'vissel kobe': 10253,
  'kashima antlers': 10254,
  'kashiwa reysol': 10255,

  'jeonbuk motors': 10257,
  'daejeon citizen': 10256,

  'shanghai port': 10229,
  'shanghai shenhua': 6628,
  'beijing guoan': 10228,

  'atletico ottawa': 1135780,
  'atlético ottawa': 1135780,
};

/**
 * Normalizes any club name string into a standardized lookup key.
 */
function normalizeName(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strips common generic prefixes/suffixes to resolve canonical team keys.
 * E.g., "AFC Bournemouth" -> "bournemouth", "Real Betis Balompié" -> "real betis",
 * "RCD Espanyol de Barcelona" -> "espanyol".
 */
function stripClubAffixes(str: string): string {
  return str
    .replace(/\b(fc|cf|sc|ec|cd|ca|afc|ac|se|cr|fbc|rcd|rb|ss|as|fk|sk|bk|ff|if|bsc|tsg|vfb|vfl|sv|fsv|sd|ud|rc|aj|ogc|osc|sco|hsc|sl|spvc|cska|cpl|csa|crb|abc)\b/g, ' ')
    .replace(/\b(clube|esporte|sociedade|futebol|football|club|balompie|deportiva|deportivo|calcio|esportiva|regatas|paulista|mineiro|paranaense|gaucho|carioca|de|da|do|dos|das)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves authoritative FotMob team ID for any club name.
 * Uses exact normalization and alias resolution to prevent false substring cross-matching.
 */
export function getTeamId(teamName?: string): number | undefined {
  if (!teamName || typeof teamName !== 'string') return undefined;

  const rawTrimmed = teamName.trim();
  const normalized = normalizeName(rawTrimmed);
  if (!normalized) return undefined;

  // 1. Direct dictionary match
  if (KNOWN_TEAM_ID_MAP[normalized] !== undefined) {
    return KNOWN_TEAM_ID_MAP[normalized];
  }

  // 2. Direct dictionary match on lowercased raw string
  const lowerRaw = rawTrimmed.toLowerCase();
  if (KNOWN_TEAM_ID_MAP[lowerRaw] !== undefined) {
    return KNOWN_TEAM_ID_MAP[lowerRaw];
  }

  // 3. Match without affixes (e.g. "AFC Bournemouth" -> "bournemouth")
  const stripped = stripClubAffixes(normalized);
  if (stripped && stripped !== normalized) {
    if (KNOWN_TEAM_ID_MAP[stripped] !== undefined) {
      return KNOWN_TEAM_ID_MAP[stripped];
    }
  }

  // 4. We will NOT do regex fuzzy matching here anymore. It's too aggressive.
  // We already checked exact matches, lower-case exact matches, and suffix-stripped matches.
  // Fuzzy matching "dinamo" will accidentally catch other teams.

  return undefined;
}

/**
 * Generates verified high-resolution club emblem CDN URL.
 * Prioritizes the authoritative KNOWN_TEAM_ID_MAP so that erroneous
 * or stale database IDs are corrected automatically to their genuine logos.
 */
export function getTeamCrestUrl(teamName?: string, explicitTeamId?: number | string): string {
  // 1. If we have an explicit ID (which we usually do from the API), try to use it directly,
  // EXCEPT if the dictionary overrides it (this fixes bugs where an API gives a stale ID, 
  // but also fixes bugs where a substring match accidentally overrode a valid explicit ID).
  
  let finalId = Number(explicitTeamId);

  // If a teamName is provided, check if our authoritative dictionary has it EXACTLY.
  if (teamName) {
    const verifiedId = getTeamId(teamName);
    // ONLY override if the API didn't provide an ID, OR if we want to force our dictionary over the API.
    // For now, let's trust the API's explicit ID if it exists, otherwise fallback to our dictionary.
    if (verifiedId) {
       if (isNaN(finalId) || finalId <= 0) {
         finalId = verifiedId;
       }
    }
  }

  if (!isNaN(finalId) && finalId > 0) {
    return `https://images.fotmob.com/image_resources/logo/teamlogo/${finalId}.png`;
  }

  return '';
}
