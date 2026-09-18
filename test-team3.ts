import { scrapeFotMobTeamFixtures } from './server/fotmobScraper';
(async () => {
  const data = await scrapeFotMobTeamFixtures(8686, 'team', false, 'Roma');
  console.log(data?.pastMatches);
})();
