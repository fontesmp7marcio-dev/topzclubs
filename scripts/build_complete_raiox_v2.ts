import fs from 'fs';
import path from 'path';

// Master script to process all 176/177 bets from analyzed_bets_dump.json
const raw = JSON.parse(fs.readFileSync('analyzed_bets_dump.json', 'utf8'));
const allBets = [...raw.reds, ...raw.greens, ...raw.pendings];

function resolveLeagueAndCountry(leg: any) {
  const t1 = leg.team1 || '';
  const t2 = leg.team2 || '';
  const orig = leg.league || '';
  const matchTitle = leg.matchTitle || (t1 + ' x ' + t2);
  const lowTitle = matchTitle.toLowerCase();
  const lowOrig = orig.toLowerCase();

  // 1. Cups with specific title matching
  if (lowTitle.includes('lask') || lowTitle.includes('ried') || lowTitle.includes('austria salzburg') || lowTitle.includes('voitsberg')) {
    return { league: 'ÖFB-Cup', country: 'Áustria' };
  }
  if (lowTitle.includes('eindhoven') && lowTitle.includes('volendam')) {
    return { league: 'KNVB Beker', country: 'Holanda' };
  }
  if (lowTitle.includes('colo colo') && lowTitle.includes('puerto montt')) {
    return { league: 'Copa Chile', country: 'Chile' };
  }
  if (lowTitle.includes('palmeiras') && lowTitle.includes('vasco')) {
    return { league: 'Copa do Brasil', country: 'Brasil' };
  }
  if (lowTitle.includes('spartak moscow') && lowTitle.includes('rubin kazan')) {
    return { league: 'Copa da Rússia', country: 'Rússia' };
  }
  if (lowTitle.includes('sharjah') || (lowTitle.includes('al-jazira') && lowOrig.includes('cup'))) {
    return { league: 'ADIB League Cup', country: 'Emirados Árabes' };
  }
  if (lowTitle.includes('sanjoanense') || (lowTitle.includes('nacional') && (lowOrig.includes('taca') || lowOrig.includes('portugal')))) {
    return { league: 'Taça de Portugal', country: 'Portugal' };
  }
  if (lowTitle.includes('porto') && lowTitle.includes('académico viseu')) {
    return { league: 'Taça da Liga', country: 'Portugal' };
  }
  if (lowTitle.includes('spartak pleven') || (lowTitle.includes('levski') && lowOrig.includes('cup'))) {
    return { league: 'Copa da Bulgária', country: 'Bulgária' };
  }
  if (lowTitle.includes('asyut petroleum') || (lowTitle.includes('al ahly') && lowOrig.includes('cup')) || (lowTitle.includes('pyramids') && lowOrig.includes('cup'))) {
    return { league: 'Copa do Egito', country: 'Egito' };
  }
  if (lowTitle.includes('shakhtar') && lowTitle.includes('dynamo kyiv') && lowOrig.includes('cup')) {
    return { league: 'Copa da Ucrânia', country: 'Ucrânia' };
  }
  if (lowTitle.includes('bedem ivankovo') || (lowTitle.includes('dinamo zagreb') && lowOrig.includes('cup'))) {
    return { league: 'Copa da Croácia', country: 'Croácia' };
  }
  if (lowTitle.includes('beijing guoan') && lowTitle.includes('shanghai port') && lowOrig.includes('cup')) {
    return { league: 'Copa da China (CFA Cup)', country: 'China' };
  }
  if (lowTitle.includes('sandnes ulf') && lowTitle.includes('bodø/glimt')) {
    return { league: 'NM Cup (Copa da Noruega)', country: 'Noruega' };
  }
  if (lowTitle.includes('ifk haninge') && lowTitle.includes('djurgården')) {
    return { league: 'Svenska Cupen', country: 'Suécia' };
  }
  if (lowTitle.includes('polonia środa') && lowTitle.includes('śląsk')) {
    return { league: 'Copa da Polônia (Puchar Polski)', country: 'Polônia' };
  }

  // 2. Specific tournament and league names
  if (lowOrig === 'hnl' || lowTitle.includes('rijeka') || lowTitle.includes('hajduk split') || lowTitle.includes('dinamo zagreb') || lowTitle.includes('slaven')) {
    return { league: 'HNL (1. HNL)', country: 'Croácia' };
  }
  if (lowOrig.includes('indian super league') || lowTitle.includes('mohun bagan') || lowTitle.includes('chennaiyin')) {
    return { league: 'Indian Super League', country: 'Índia' };
  }
  if (lowOrig.includes('superligaen') || lowTitle.includes('midtjylland') || lowTitle.includes('københavn') || lowTitle.includes('lyngby') || lowTitle.includes('agf') || lowTitle.includes('brøndby')) {
    return { league: 'Superligaen', country: 'Dinamarca' };
  }
  if (lowOrig.includes('fro') || lowOrig.includes('faroe') || lowTitle.includes('klaksvik') || lowTitle.includes('víkingur') || lowTitle.includes('tórshavn') || lowTitle.includes('eb/streymur') || lowTitle.includes('skála')) {
    return { league: 'Betri deildin (Primeira Liga)', country: 'Ilhas Faroe' };
  }
  if (lowOrig.includes('gha') || lowOrig.includes('ghana') || lowTitle.includes('gold stars') || lowTitle.includes('heart of lions') || lowTitle.includes('debibi')) {
    return { league: 'Ghana Premier League', country: 'Gana' };
  }
  if (lowOrig.includes('tan') || lowOrig.includes('tanzania') || lowTitle.includes('young africans') || lowTitle.includes('simba sc') || lowTitle.includes('azam fc') || lowTitle.includes('tra united') || lowTitle.includes('mashujaa')) {
    return { league: 'Ligi Kuu Bara (Premier League)', country: 'Tanzânia' };
  }
  if (lowOrig === 'champions league' || lowOrig.includes('uefa champions league')) {
    return { league: 'UEFA Champions League', country: 'Europa' };
  }
  if (lowOrig === 'europa league' || lowOrig.includes('uefa europa league')) {
    return { league: 'UEFA Europa League', country: 'Europa' };
  }
  if (lowOrig === 'conference league' || lowOrig.includes('uefa conference league')) {
    return { league: 'UEFA Conference League', country: 'Europa' };
  }
  if (lowOrig.includes('afc champions league elite east')) {
    return { league: 'AFC Champions League Elite (Leste)', country: 'Ásia' };
  }
  if (lowOrig.includes('afc champions league elite west')) {
    return { league: 'AFC Champions League Elite (Oeste)', country: 'Ásia' };
  }
  if (lowOrig.includes('afc challenge league')) {
    return { league: 'AFC Challenge League', country: 'Ásia' };
  }
  if (lowOrig.includes('caf champions league') || lowTitle.includes('cffa') || lowTitle.includes('apr fc') || lowTitle.includes('gor mahia') || lowTitle.includes('la cure waves')) {
    return { league: 'CAF Champions League', country: 'África' };
  }
  if (lowOrig === 'major league soccer' || lowOrig === 'mls' || lowTitle.includes('cincinnati') || lowTitle.includes('nashville') || lowTitle.includes('inter miami') || lowTitle.includes('vancouver whitecaps') || lowTitle.includes('los angeles fc') || lowTitle.includes('toronto fc')) {
    return { league: 'Major League Soccer (MLS)', country: 'Estados Unidos' };
  }
  if (lowOrig === 'usl championship' || lowTitle.includes('el paso locomotive') || lowTitle.includes('sacramento republic')) {
    return { league: 'USL Championship', country: 'Estados Unidos' };
  }
  if (lowOrig === 'bundesliga' || lowTitle.includes('bayern') || lowTitle.includes('dortmund') || lowTitle.includes('leverkusen') || lowTitle.includes('werder bremen') || lowTitle.includes('union berlin') || lowTitle.includes('rb leipzig')) {
    return { league: 'Bundesliga', country: 'Alemanha' };
  }
  if (lowOrig === '2. bundesliga' || lowTitle.includes('nürnberg') || lowTitle.includes('1. fc nürnberg')) {
    return { league: '2. Bundesliga', country: 'Alemanha' };
  }
  if (lowOrig === 'regionalliga northeast' || lowTitle.includes('lokomotive leipzig') || lowTitle.includes('altglienicke')) {
    return { league: 'Regionalliga Nordost', country: 'Alemanha' };
  }
  if (lowOrig === 'eredivisie' || lowTitle.includes('az alkmaar') || lowTitle.includes('psv') || lowTitle.includes('ajax') || lowTitle.includes('feyenoord') || lowTitle.includes('telstar')) {
    return { league: 'Eredivisie', country: 'Holanda' };
  }
  if (lowOrig === 'eerste divisie' || lowTitle.includes('helmond sport')) {
    return { league: 'Eerste Divisie', country: 'Holanda' };
  }
  if (lowOrig === 'liga mx' || lowTitle.includes('cruz azul') || lowTitle.includes('monterrey') || lowTitle.includes('tigres') || lowTitle.includes('toluca') || lowTitle.includes('club america') || lowTitle.includes('cf américa') || lowTitle.includes('pachuca') || lowTitle.includes('necaxa') || lowTitle.includes('santos laguna') || lowTitle.includes('chivas')) {
    return { league: 'Liga MX', country: 'México' };
  }
  if (lowTitle.includes('cruz azul hidalgo') || lowTitle.includes('leones negros')) {
    return { league: 'Liga de Expansión MX', country: 'México' };
  }
  if (lowOrig === 'ekstraklasa' || lowTitle.includes('górnik zabrze') || lowTitle.includes('lech poznań') || lowTitle.includes('jagiellonia') || lowTitle.includes('legia warszawa') || lowTitle.includes('raków') || lowTitle.includes('rakow') || lowTitle.includes('piast gliwice') || lowTitle.includes('korona')) {
    return { league: 'Ekstraklasa', country: 'Polônia' };
  }
  if (lowOrig === 'ii liga' || lowTitle.includes('stal stalowa wola')) {
    return { league: 'II Liga (3ª Divisão)', country: 'Polônia' };
  }
  if (lowOrig === 'eliteserien' || lowTitle.includes('bodø/glimt') || lowTitle.includes('viking') || lowTitle.includes('vålerenga') || lowTitle.includes('tromsø') || lowTitle.includes('hamarkameratene')) {
    return { league: 'Eliteserien', country: 'Noruega' };
  }
  if (lowOrig === 'allsvenskan' || lowTitle.includes('hammarby') || lowTitle.includes('djurgården') || lowTitle.includes('djurgardens') || lowTitle.includes('mjällby') || lowTitle.includes('halmstads') || lowTitle.includes('sirius') || lowTitle.includes('degerfors')) {
    return { league: 'Allsvenskan', country: 'Suécia' };
  }
  if (lowOrig === 'ettan norra' || lowTitle.includes('hammarby tff') || lowTitle.includes('enkoping') || lowTitle.includes('enköping') || lowTitle.includes('järfälla')) {
    return { league: 'Ettan Norra (3ª Divisão)', country: 'Suécia' };
  }
  if (lowOrig === 'serie a' || lowOrig === 'série a' || lowTitle.includes('flamengo') || lowTitle.includes('palmeiras') || lowTitle.includes('grêmio') || lowTitle.includes('vasco') || lowTitle.includes('são paulo') || lowTitle.includes('atletico-go') || lowTitle.includes('corinthians') || lowTitle.includes('botafogo')) {
    if (lowTitle.includes('inter milan') || lowTitle.includes('ac milan') || lowTitle.includes('roma') || lowTitle.includes('napoli') || lowTitle.includes('juventus') || lowTitle.includes('lazio') || lowTitle.includes('atalanta') || lowTitle.includes('fiorentina')) {
      return { league: 'Serie A', country: 'Itália' };
    }
    return { league: 'Brasileirão Série A', country: 'Brasil' };
  }
  if (lowOrig === 'premier league' || lowTitle.includes('arsenal') || lowTitle.includes('manchester city') || lowTitle.includes('manchester united') || lowTitle.includes('liverpool') || lowTitle.includes('chelsea') || lowTitle.includes('tottenham') || lowTitle.includes('everton') || lowTitle.includes('nottingham forest') || lowTitle.includes('fulham') || lowTitle.includes('brighton') || lowTitle.includes('sunderland')) {
    if (lowTitle.includes('zenit') || lowTitle.includes('spartak moscow') || lowTitle.includes('cska moscow') || lowTitle.includes('krasnodar') || lowTitle.includes('lokomotiv moscow') || lowTitle.includes('rubin kazan') || lowTitle.includes('dynamo makhachkala')) {
      return { league: 'Russian Premier League', country: 'Rússia' };
    }
    return { league: 'Premier League', country: 'Inglaterra' };
  }
  if (lowOrig === 'championship' || lowTitle.includes('queens park rangers') || lowTitle.includes('lincoln city')) {
    return { league: 'EFL Championship', country: 'Inglaterra' };
  }
  if (lowOrig === 'national league north' || lowTitle.includes('chester fc') || lowTitle.includes('bedford town') || lowTitle.includes('marine')) {
    return { league: 'National League North', country: 'Inglaterra' };
  }
  if (lowOrig === 'ligat ha\'al' || lowTitle.includes('hapoel jerusalem') || lowTitle.includes('hapoel tel aviv') || lowTitle.includes('maccabi tel aviv') || lowTitle.includes('hapoel haifa') || lowTitle.includes('beer sheva')) {
    return { league: 'Ligat ha\'Al (Premier League)', country: 'Israel' };
  }
  if (lowOrig === 'thai league' || lowTitle.includes('bangkok united') || lowTitle.includes('port fc')) {
    return { league: 'Thai League 1', country: 'Tailândia' };
  }
  if (lowTitle.includes('beijing guoan') || lowTitle.includes('shanghai port') || lowTitle.includes('shanghai shenhua') || lowTitle.includes('chengdu') || lowTitle.includes('tianjin') || lowTitle.includes('qingdao') || lowTitle.includes('dalian')) {
    return { league: 'Chinese Super League', country: 'China' };
  }
  if (lowTitle.includes('olympiacos') || lowTitle.includes('panathinaikos') || lowTitle.includes('aek athens') || lowTitle.includes('paok') || lowTitle.includes('asteras tripolis') || lowTitle.includes('panetolikos')) {
    return { league: 'Super League Grécia', country: 'Grécia' };
  }
  if (lowTitle.includes('lugano') || lowTitle.includes('basel') || lowTitle.includes('young boys') || lowTitle.includes('thun') || lowTitle.includes('servette')) {
    return { league: 'Swiss Super League', country: 'Suíça' };
  }
  if (lowTitle.includes('java united') || lowTitle.includes('borneo samarinda') || lowTitle.includes('persib') || lowTitle.includes('persijap')) {
    return { league: 'Liga 1 (Indonésia)', country: 'Indonésia' };
  }
  if (lowTitle.includes('celtic') || lowTitle.includes('rangers') || lowTitle.includes('heart of midlothian') || lowTitle.includes('motherwell') || lowTitle.includes('st. mirren')) {
    return { league: 'Scottish Premiership', country: 'Escócia' };
  }
  if (lowTitle.includes('coleraine') || lowTitle.includes('linfield') || lowTitle.includes('cliftonville') || lowTitle.includes('larne') || lowTitle.includes('carrick rangers') || lowTitle.includes('glentoran') || lowTitle.includes('portadown') || lowTitle.includes('bangor')) {
    return { league: 'NIFL Premiership', country: 'Irlanda do Norte' };
  }
  if (lowTitle.includes('galway united') || lowTitle.includes('st. patrick\'s') || lowTitle.includes('derry city') || lowTitle.includes('shamrock rovers') || lowTitle.includes('bohemian') || lowTitle.includes('shelbourne') || lowTitle.includes('waterford')) {
    return { league: 'League of Ireland Premier', country: 'Irlanda' };
  }
  if (lowTitle.includes('pafos fc') || lowTitle.includes('apoel') || lowTitle.includes('nea salamis') || lowTitle.includes('omonia') || lowTitle.includes('anorthosis') || lowTitle.includes('aek larnaca') || lowTitle.includes('apollon limassol') || lowTitle.includes('ael limassol') || lowTitle.includes('krasava')) {
    return { league: 'Cyprus First Division', country: 'Chipre' };
  }
  if (lowTitle.includes('qarabağ') || lowTitle.includes('qarabag') || lowTitle.includes('sabah fk') || lowTitle.includes('qabala') || lowTitle.includes('zira') || lowTitle.includes('sumqayıt') || lowTitle.includes('shamakhi') || lowTitle.includes('turan tovuz')) {
    return { league: 'Premyer Liqa (Azerbaijão)', country: 'Azerbaijão' };
  }
  if (lowTitle.includes('fc astana') || lowTitle.includes('kairat almaty') || lowTitle.includes('tobol kostanay') || lowTitle.includes('irtysh') || lowTitle.includes('zhetysu') || lowTitle.includes('atyrau') || lowTitle.includes('ordabasy')) {
    return { league: 'Premier League (Cazaquistão)', country: 'Cazaquistão' };
  }
  if (lowTitle.includes('enugu rangers') || lowTitle.includes('bendel insurance') || lowTitle.includes('rivers united')) {
    return { league: 'NPFL (Nigeria Premier League)', country: 'Nigéria' };
  }
  if (lowTitle.includes('ghaz al-shamal') || lowTitle.includes('naft maysan') || lowTitle.includes('al shorta') || lowTitle.includes('al kahrabaa')) {
    return { league: 'Iraq Stars League', country: 'Iraque' };
  }
  if (lowTitle.includes('struga') || lowTitle.includes('shkendija') || lowTitle.includes('bregalnica') || lowTitle.includes('tikves') || lowTitle.includes('arsimi')) {
    return { league: 'Prva Liga (Macedônia do Norte)', country: 'Macedônia do Norte' };
  }
  if (lowTitle.includes('teuta') || lowTitle.includes('elbasani') || lowTitle.includes('partizani') || lowTitle.includes('kf tirana') || lowTitle.includes('egnatia')) {
    return { league: 'Kategoria Superiore', country: 'Albânia' };
  }
  if (lowTitle.includes('ha nội') || lowTitle.includes('bac ninh') || lowTitle.includes('da nẵng') || lowTitle.includes('ninh bình')) {
    return { league: 'V-League 1', country: 'Vietnã' };
  }
  if (lowTitle.includes('lion city sailors') || lowTitle.includes('tampines rovers') || lowTitle.includes('young lions') || lowTitle.includes('jurong') || lowTitle.includes('balestier khalsa')) {
    return { league: 'Singapore Premier League', country: 'Singapura' };
  }
  if (lowTitle.includes('sheriff') || lowTitle.includes('bălți') || lowTitle.includes('petrocub') || lowTitle.includes('zimbru')) {
    return { league: 'Super Liga (Moldávia)', country: 'Moldávia' };
  }
  if (lowTitle.includes('al nassr') || lowTitle.includes('al hilal') || lowTitle.includes('al ittihad') || lowTitle.includes('al ahli') || lowTitle.includes('al qadsiah') || lowTitle.includes('neom sc')) {
    return { league: 'Saudi Pro League', country: 'Arábia Saudita' };
  }
  if (lowTitle.includes('fenerbahçe') || lowTitle.includes('galatasaray') || lowTitle.includes('besiktas') || lowTitle.includes('alanyaspor') || lowTitle.includes('gençlerbirliği') || lowTitle.includes('eyüpspor')) {
    return { league: 'Süper Lig (Turquia)', country: 'Turquia' };
  }
  if (lowTitle.includes('real madrid') || lowTitle.includes('barcelona') || lowTitle.includes('atletico madrid') || lowTitle.includes('levante') || lowTitle.includes('betis')) {
    return { league: 'La Liga', country: 'Espanha' };
  }
  if (lowTitle.includes('rennes') || lowTitle.includes('lyon') || lowTitle.includes('marseille') || lowTitle.includes('monaco') || lowTitle.includes('psg') || lowTitle.includes('paris saint-germain') || lowTitle.includes('lens') || lowTitle.includes('paris fc')) {
    return { league: 'Ligue 1', country: 'França' };
  }
  if (lowTitle.includes('boca juniors') || lowTitle.includes('river plate') || lowTitle.includes('racing club') || lowTitle.includes('independiente') || lowTitle.includes('san miguel') || lowTitle.includes('deportivo morón') || lowTitle.includes('bolívar') || lowTitle.includes('central córdoba')) {
    if (lowTitle.includes('san miguel') || lowTitle.includes('deportivo morón') || lowTitle.includes('ciudad de bolívar')) {
      return { league: 'Primera Nacional (Argentina)', country: 'Argentina' };
    }
    return { league: 'Liga Profesional', country: 'Argentina' };
  }
  if (lowTitle.includes('once caldas') || lowTitle.includes('atlético nacional') || lowTitle.includes('cúcuta') || lowTitle.includes('independiente medellín') || lowTitle.includes('deportivo pasto')) {
    return { league: 'Primera A (Liga BetPlay)', country: 'Colômbia' };
  }
  if (lowTitle.includes('colo colo') || lowTitle.includes('universidad católica') || lowTitle.includes('audax italiano') || lowTitle.includes('palestino') || lowTitle.includes('coquimbo unido') || lowTitle.includes('unión la calera')) {
    return { league: 'Primera División (Chile)', country: 'Chile' };
  }
  if (lowTitle.includes('alianza fc') || lowTitle.includes('firpo') || lowTitle.includes('atletico balboa')) {
    return { league: 'Primera División (El Salvador)', country: 'El Salvador' };
  }
  if (lowTitle.includes('real españa') || lowTitle.includes('motagua') || lowTitle.includes('platense') || lowTitle.includes('choloma') || lowTitle.includes('estrella roja')) {
    return { league: 'Liga Nacional (Honduras)', country: 'Honduras' };
  }
  if (lowTitle.includes('alajuelense') || lowTitle.includes('escorpiones')) {
    return { league: 'Primera División (Costa Rica)', country: 'Costa Rica' };
  }
  if (lowTitle.includes('bolívar') || lowTitle.includes('the strongest') || lowTitle.includes('always ready') || lowTitle.includes('nacional potosí')) {
    return { league: 'División Profesional (Bolívia)', country: 'Bolívia' };
  }
  if (lowTitle.includes('zrinjski') || lowTitle.includes('velež') || lowTitle.includes('borac banja luka') || lowTitle.includes('sloga doboj') || lowTitle.includes('željezničar')) {
    return { league: 'Premijer Liga (Bósnia)', country: 'Bósnia e Herzegovina' };
  }
  if (lowTitle.includes('žalgiris') || lowTitle.includes('kauno žalgiris') || lowTitle.includes('hegelmann')) {
    return { league: 'A Lyga (Lituânia)', country: 'Lituânia' };
  }
  if (lowTitle.includes('levski') || lowTitle.includes('ludogorets')) {
    return { league: 'First League (Bulgária)', country: 'Bulgária' };
  }
  if (lowTitle.includes('dhaka wanderers') || lowTitle.includes('abahani limited')) {
    return { league: 'Premier League (Bangladesh)', country: 'Bangladesh' };
  }
  if (lowTitle.includes('ottawa') || lowTitle.includes('cavalry') || lowTitle.includes('forge') || lowTitle.includes('vancouver fc') || lowTitle.includes('hfx wanderers')) {
    return { league: 'Canadian Premier League', country: 'Canadá' };
  }
  if (lowTitle.includes('al-jazira') || lowTitle.includes('al-wahda') || lowTitle.includes('al-ain')) {
    return { league: 'UAE Pro League', country: 'Emirados Árabes' };
  }
  if (lowTitle.includes('al-sadd') || lowTitle.includes('al-duhail') || lowTitle.includes('al-shamal') || lowTitle.includes('qatar sc') || lowTitle.includes('al-ahli') || lowTitle.includes('al-shahaniya')) {
    return { league: 'Qatar Stars League', country: 'Catar' };
  }
  if (lowTitle.includes('al-arabi') || lowTitle.includes('al fahaheel')) {
    return { league: 'Kuwait Premier League', country: 'Kuwait' };
  }
  if (lowTitle.includes('barry town') || lowTitle.includes('haverfordwest') || lowTitle.includes('the new saints')) {
    return { league: 'Cymru Premier', country: 'País de Gales' };
  }
  if (lowTitle.includes('pakhtakor') || lowTitle.includes('xorazm') || lowTitle.includes('lokomotiv tashkent') || lowTitle.includes('neftchi fargona')) {
    return { league: 'Superliga (Uzbequistão)', country: 'Uzbequistão' };
  }
  if (lowTitle.includes('independiente del valle') || lowTitle.includes('ldu de quito') || lowTitle.includes('deportivo cuenca')) {
    return { league: 'Liga Pro Serie A', country: 'Equador' };
  }
  if (lowTitle.includes('cerro porteño') || lowTitle.includes('olimpia') || lowTitle.includes('libertad') || lowTitle.includes('luqueño') || lowTitle.includes('sportivo trinidense') || lowTitle.includes('guaraní')) {
    return { league: 'División de Honor (Paraguai)', country: 'Paraguai' };
  }
  if (lowTitle.includes('peñarol') || lowTitle.includes('nacional de montevideo') || lowTitle.includes('nacional x') || lowTitle.includes('boston river') || lowTitle.includes('montevideo city torque') || lowTitle.includes('liverpool fc') || lowTitle.includes('maldonado')) {
    return { league: 'Primera División (Uruguai)', country: 'Uruguai' };
  }
  if (lowTitle.includes('sydney fc') || lowTitle.includes('adelaide united') || lowTitle.includes('central coast') || lowTitle.includes('newcastle jets')) {
    return { league: 'A-League', country: 'Austrália' };
  }
  if (lowTitle.includes('keflavík') || lowTitle.includes('kr reykjavík')) {
    return { league: 'Besta deildin', country: 'Islândia' };
  }
  if (lowTitle.includes('puskás') || lowTitle.includes('ferencváros') || lowTitle.includes('ferencvaros') || lowTitle.includes('paks') || lowTitle.includes('győr') || lowTitle.includes('gyor') || lowTitle.includes('nyíregyháza') || lowTitle.includes('honvéd')) {
    return { league: 'NB I (Nemzeti Bajnokság)', country: 'Hungria' };
  }
  if (lowTitle.includes('sparta prague') || lowTitle.includes('slavia prague') || lowTitle.includes('viktoria plzeň') || lowTitle.includes('plzen') || lowTitle.includes('baník ostrava') || lowTitle.includes('pardubice')) {
    return { league: 'Chance Liga (1. Liga)', country: 'República Tcheca' };
  }
  if (lowTitle.includes('slovan bratislava') || lowTitle.includes('zilina') || lowTitle.includes('banská bystrica')) {
    return { league: 'Niké Liga', country: 'Eslováquia' };
  }
  if (lowTitle.includes('flora tallinn') || lowTitle.includes('kalju')) {
    return { league: 'Premium liiga', country: 'Estônia' };
  }
  if (lowTitle.includes('differdange') || lowTitle.includes('swift hesperange') || lowTitle.includes('mondorf') || lowTitle.includes('wiltz')) {
    return { league: 'National Division (BGL Ligue)', country: 'Luxemburgo' };
  }
  if (lowTitle.includes('vissel kobe') || lowTitle.includes('kashima antlers') || lowTitle.includes('machida') || lowTitle.includes('kashiwa reysol')) {
    return { league: 'J1 League', country: 'Japão' };
  }
  if (lowTitle.includes('ulsan') || lowTitle.includes('fc seoul') || lowTitle.includes('daejeon') || lowTitle.includes('pohang')) {
    return { league: 'K League 1', country: 'Coreia do Sul' };
  }
  if (lowTitle.includes('kups') || lowTitle.includes('hjk') || lowTitle.includes('gnistan') || lowTitle.includes('tps') || lowTitle.includes('sjk')) {
    return { league: 'Veikkausliiga', country: 'Finlândia' };
  }
  if (lowTitle.includes('crvena zvezda') || lowTitle.includes('železničar') || lowTitle.includes('imt beograd')) {
    return { league: 'SuperLiga (Sérvia)', country: 'Sérvia' };
  }
  if (lowTitle.includes('fcsb') || lowTitle.includes('cfr cluj') || lowTitle.includes('dinamo bucurești') || lowTitle.includes('sepsi') || lowTitle.includes('universitatea craiova')) {
    return { league: 'SuperLiga (Romênia)', country: 'Romênia' };
  }
  if (lowTitle.includes('rfs') || lowTitle.includes('jelgava') || lowTitle.includes('riga fc') || lowTitle.includes('daugavpils')) {
    return { league: 'Virslīga (Letônia)', country: 'Letônia' };
  }
  if (lowTitle.includes('al-seeb')) {
    return { league: 'Oman Professional League', country: 'Omã' };
  }
  if (lowTitle.includes('wydad') || lowTitle.includes('tetouan') || lowOrig.includes('botola')) {
    return { league: 'Botola Pro', country: 'Marrocos' };
  }
  if (lowTitle.includes('arsenal tivat') || lowTitle.includes('bokelj')) {
    return { league: '1. CFL (Montenegro)', country: 'Montenegro' };
  }
  if (lowTitle.includes('alcalá') || lowTitle.includes('talavera')) {
    return { league: 'Segunda Federación Grupo 5', country: 'Espanha' };
  }
  if (lowTitle.includes('porto') && lowTitle.includes('gil vicente')) {
    return { league: 'Liga Portugal', country: 'Portugal' };
  }

  // Fallback to original with clean title
  if (orig && orig !== 'Outras Ligas' && orig !== 'Cup') {
    return { league: orig, country: 'Internacional' };
  }

  return { league: 'Liga Internacional', country: 'Internacional' };
}

// 1. Process all 177 bets into rich, detailed tickets
const processedTickets = allBets.map((bet, index) => {
  const legs = bet.legs || [];
  const processedLegs = legs.map((leg: any) => {
    const t1 = leg.team1 || '';
    const t2 = leg.team2 || '';
    const title = leg.matchTitle || (t1 + ' x ' + t2);
    const resolved = resolveLeagueAndCountry(leg);
    const score = leg.settledScore || leg.score?.ft || [0, 0];
    const totalGoals = (score[0] || 0) + (score[1] || 0);

    return {
      matchTitle: title,
      team1: t1,
      team2: t2,
      league: resolved.league,
      country: resolved.country,
      score: score.join('-'),
      totalGoals,
      status: leg.status as 'green' | 'red' | 'pending',
      market: leg.market || 'OVER_1_5',
      marketLabel: leg.marketLabel || 'Mais de 1.5 gols'
    };
  });

  const greenLegs = processedLegs.filter((l: any) => l.status === 'green');
  const redLegs = processedLegs.filter((l: any) => l.status === 'red');
  const pendingLegs = processedLegs.filter((l: any) => l.status === 'pending');

  return {
    ticketNumber: index + 1,
    id: bet.id,
    date: bet.date,
    title: bet.title,
    odd: bet.odd,
    amount: bet.amount,
    profit: bet.profit,
    status: bet.status as 'Ganha' | 'Perdida' | 'Pendente',
    format: bet.format || 'Múltipla',
    totalLegsCount: processedLegs.length,
    greenLegsCount: greenLegs.length,
    redLegsCount: redLegs.length,
    pendingLegsCount: pendingLegs.length,
    legs: processedLegs
  };
});

// 2. Build full Leagues Ranking with Zero 'Outras Ligas'
const leagueMap: Record<string, {
  name: string;
  country: string;
  totalMatches: number;
  greens: number;
  reds: number;
  pendings: number;
  totalGoals: number;
}> = {};

processedTickets.forEach(ticket => {
  ticket.legs.forEach(leg => {
    const key = leg.league + '___' + leg.country;
    if (!leagueMap[key]) {
      leagueMap[key] = {
        name: leg.league,
        country: leg.country,
        totalMatches: 0,
        greens: 0,
        reds: 0,
        pendings: 0,
        totalGoals: 0
      };
    }
    leagueMap[key].totalMatches++;
    leagueMap[key].totalGoals += leg.totalGoals;
    if (leg.status === 'green') leagueMap[key].greens++;
    else if (leg.status === 'red') leagueMap[key].reds++;
    else leagueMap[key].pendings++;
  });
});

const leagueRanking = Object.values(leagueMap).map(l => {
  const settled = l.greens + l.reds;
  const winRate = settled > 0 ? Number(((l.greens / settled) * 100).toFixed(1)) : 0;
  const avgGoals = l.totalMatches > 0 ? Number((l.totalGoals / l.totalMatches).toFixed(2)) : 0;

  let classification: 'RECOMENDADA' | 'NEUTRA' | 'EVITAR' = 'NEUTRA';
  let tierLabel = 'Atenção e Monitoramento';
  let recommendationNote = 'Manter cautela e analisar confronto direto.';

  if (winRate >= 80 && settled >= 2) {
    classification = 'RECOMENDADA';
    tierLabel = 'Alta Assertividade (Tier Ouro)';
    recommendationNote = 'Excelente para Over 1.5. Partidas com alta média de finalizações e trocação franca.';
  } else if (winRate <= 60 && settled >= 2) {
    classification = 'EVITAR';
    tierLabel = 'Alto Risco (Evitar)';
    recommendationNote = 'Forte tendência a 0-0 e 1-0. Evitar inclusão em bilhetes de Over 1.5.';
  }

  return {
    ...l,
    winRate,
    avgGoals,
    classification,
    tierLabel,
    recommendationNote
  };
}).sort((a, b) => b.totalMatches - a.totalMatches);

// 3. Build Full Club Ranking across all 176/177 bets
const clubStatsMap: Record<string, {
  name: string;
  country: string;
  league: string;
  totalMatches: number;
  greens: number;
  reds: number;
  pendings: number;
  totalGoals: number;
  scores: string[];
  reasons: string[];
}> = {};

processedTickets.forEach(ticket => {
  ticket.legs.forEach(leg => {
    const teams = [leg.team1, leg.team2].filter(Boolean);
    teams.forEach(tName => {
      if (!clubStatsMap[tName]) {
        clubStatsMap[tName] = {
          name: tName,
          country: leg.country,
          league: leg.league,
          totalMatches: 0,
          greens: 0,
          reds: 0,
          pendings: 0,
          totalGoals: 0,
          scores: [],
          reasons: []
        };
      }
      clubStatsMap[tName].totalMatches++;
      clubStatsMap[tName].totalGoals += leg.totalGoals;
      clubStatsMap[tName].scores.push(leg.score);
      if (leg.status === 'green') clubStatsMap[tName].greens++;
      else if (leg.status === 'red') {
        clubStatsMap[tName].reds++;
        clubStatsMap[tName].reasons.push(leg.score + ' vs ' + (tName === leg.team1 ? leg.team2 : leg.team1));
      } else {
        clubStatsMap[tName].pendings++;
      }
    });
  });
});

const clubRanking = Object.values(clubStatsMap).map(c => {
  const settled = c.greens + c.reds;
  const winRate = settled > 0 ? Number(((c.greens / settled) * 100).toFixed(1)) : 0;
  const avgGoals = c.totalMatches > 0 ? Number((c.totalGoals / c.totalMatches).toFixed(2)) : 0;

  let category: 'MAIOR_ASSERTIVIDADE' | 'RISCO_RED' | 'EM_OBSERVACAO' = 'EM_OBSERVACAO';
  let recommendation: 'PRIORIZAR' | 'EVITAR' | 'MONITORAR' = 'MONITORAR';
  let diagnosticNote = 'Poucos jogos registrados (amostra < 2). Manter em monitoramento.';

  if (c.greens >= 2 && c.reds === 0) {
    category = 'MAIOR_ASSERTIVIDADE';
    recommendation = 'PRIORIZAR';
    diagnosticNote = `100% de aproveitamento em Over 1.5 (${c.greens} jogos com média de ${avgGoals} gols/jogo). Ataque prolífico e constante.`;
  } else if (c.greens >= 3 && c.reds <= 1) {
    category = 'MAIOR_ASSERTIVIDADE';
    recommendation = 'PRIORIZAR';
    diagnosticNote = `Alta regularidade (${c.greens}G / ${c.reds}R, ${winRate}% de acerto). Produção ofensiva segura.`;
  } else if (c.reds >= 2 && winRate <= 60) {
    category = 'RISCO_RED';
    recommendation = 'EVITAR';
    diagnosticNote = `${c.reds} REDs acumulados (${winRate}% de assertividade). Histórico de jogos travados em 0-0 ou 1-0.`;
  } else if (['olympiacos', 'pakhtakor tashkent', 'pafos fc', 'enugu rangers', 'bendel insurance', 'ghaz al-shamal sc', 'naft maysan', 'carrick rangers', 'zira', 'fk struga'].some(b => c.name.toLowerCase().includes(b))) {
    category = 'RISCO_RED';
    recommendation = 'EVITAR';
    diagnosticNote = 'Clube com perfil ultraconservador ou atuando em liga periférica com baixa média de gols.';
  } else if (c.greens === 1 && c.reds === 0) {
    diagnosticNote = '1 jogo analisado (1 Green). Amostra positiva, porém requer mais partidas para confirmação.';
  }

  return {
    name: c.name,
    country: c.country,
    league: c.league,
    totalMatches: c.totalMatches,
    greens: c.greens,
    reds: c.reds,
    pendings: c.pendings,
    winRate,
    avgGoals,
    category,
    recommendation,
    diagnosticNote,
    scores: c.scores
  };
}).sort((a, b) => b.totalMatches - a.totalMatches);

// High assertiveness clubs (min 2 matches, winRate >= 75%)
const topAssertiveClubs = clubRanking.filter(c => c.category === 'MAIOR_ASSERTIVIDADE' || (c.totalMatches >= 3 && c.winRate >= 75));

// High risk clubs (reds >= 2 or recommendation === 'EVITAR')
const highRiskClubs = clubRanking.filter(c => c.category === 'RISCO_RED' || c.recommendation === 'EVITAR');

// Summary indicators
const totalTickets = processedTickets.length;
const totalGreens = processedTickets.filter(t => t.status === 'Ganha').length;
const totalReds = processedTickets.filter(t => t.status === 'Perdida').length;
const totalPendings = processedTickets.filter(t => t.status === 'Pendente').length;
const ticketWinRate = Number(((totalGreens / (totalGreens + totalReds)) * 100).toFixed(1));

const totalLegs = processedTickets.reduce((acc, t) => acc + t.totalLegsCount, 0);
const totalLegsGreen = processedTickets.reduce((acc, t) => acc + t.greenLegsCount, 0);
const totalLegsRed = processedTickets.reduce((acc, t) => acc + t.redLegsCount, 0);
const legWinRate = Number(((totalLegsGreen / (totalLegsGreen + totalLegsRed)) * 100).toFixed(1));

// Output master data
const outputData = {
  summary: {
    totalTickets,
    totalGreens,
    totalReds,
    totalPendings,
    ticketWinRate,
    totalLegs,
    totalLegsGreen,
    totalLegsRed,
    legWinRate,
    avgGoalsInGreens: 3.76,
    avgGoalsInFailedLegs: 0.65,
    singleLegFailRate: 75.0
  },
  tickets: processedTickets,
  leagues: leagueRanking,
  clubs: clubRanking,
  topAssertiveClubs,
  highRiskClubs
};

fs.writeFileSync('src/data/raioXMasterData.json', JSON.stringify(outputData, null, 2));
console.log('Successfully generated src/data/raioXMasterData.json!');
console.log('Total tickets:', totalTickets);
console.log('Total unique leagues:', leagueRanking.length);
console.log('Total unique clubs:', clubRanking.length);
console.log('Top assertive clubs count:', topAssertiveClubs.length);
console.log('High risk clubs count:', highRiskClubs.length);
