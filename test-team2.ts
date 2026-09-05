import { scrapeFotMobTeamFixtures } from './server/fotmobScraper';
(async () => {
  const data = await scrapeFotMobTeamFixtures(10228, 'team', false, 'Beijing Guoan');
  console.log(data?.teamName);
})();
