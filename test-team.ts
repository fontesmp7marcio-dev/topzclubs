import { scrapeFotMobTeamFixtures } from './server/fotmobScraper';
(async () => {
  const data = await scrapeFotMobTeamFixtures(10229, 'team', false, 'Shanghai Port');
  console.log(JSON.stringify(data?.pastMatches[0], null, 2));
})();
