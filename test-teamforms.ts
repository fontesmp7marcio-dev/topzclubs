import { scrapeFotMobTeamFixtures } from './server/fotmobScraper';
(async () => {
  const data = await scrapeFotMobTeamFixtures(198616, 'team', false, 'Shanghai Port');
  const recent = data?.pastMatches?.slice(0, 3).reverse().map((m: any) => {
    const totalGoals = (typeof m.homeScore === 'number' && typeof m.awayScore === 'number') 
      ? (m.homeScore + m.awayScore) 
      : 99;
    if (totalGoals < 2) return '🔥';
    if (m.result === 'D') return '🔻';
    if (m.result === 'E') return '🛡️';
    if (m.result === 'V') return '✅';
    if (m.result === 'L') return '🔻'; // add L
    if (m.result === 'W') return '✅'; // add W
    return m.result;
  });
  console.log('recent', recent);
})();
