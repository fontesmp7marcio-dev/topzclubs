import fs from 'fs';
import { addSharedFavorite, fetchSharedFavorites } from './server/supabase';
import { searchFotMobTeam } from './server/fotmobScraper';
import { USER_FAVORITE_CLUBS_DATA } from './src/data/favoriteClubs';

const inputList = [
  "Beijing Guoan", "Shanghai Port", "Shanghai Shenhua", "Bolivar", "The Strongest", "Always Ready", "Atlético Ottawa", "Rijeka", "Dinamo Zagreb", "Pyramids", "Al Ahly", "Zamalek", "Celtic", "Rangers", "Slovan Bratislava", "Zilina", "Ferencvaros", "Paks", "Gyor", "Melgar", "Universitario", "Legia Warszawa", "Jagiellonia", "Rakow", "Sporting", "Braga", "Fenerbahce", "Besiktas", "Al Ahli", "Al Ittihad", "Al Qadsiyah", "Al Nassr", "Al Hilal", "Slavia Prague", "Viktoria Plzen", "Mamelodi Sundowns", "Orlando Pirates", "Bayer Leverkusen", "Tottenham", "Arsenal", "Barcelona", "Real Madrid", "Inter Milan", "AC Milan", "Roma", "Napoli", "Juventus", "Lazio", "Atalanta", "Monaco", "AZ Alkmaar", "Feyenoord", "Inter Miami", "Vancouver Whitecaps", "Los Angeles FC", "Nashville SC", "FC Cincinnati", "Club America", "Tigres", "Toluca", "Necaxa", "Monterrey", "Pachuca", "River Plate", "Racing Club", "Nacional", "Penarol", "Ludogorets", "Benfica", "Galatasaray", "Borussia Dortmund", "Bayern Munich", "Chelsea", "Liverpool", "Manchester City", "Manchester United", "Atletico Madrid", "Olympique Marseille", "Ajax", "PSV", "Bodo/Glimt", "Lyon", "Flamengo", "Palmeiras", "Porto", "Copenhagen", "Djurgardens IF", "Mjallby", "Hammarby", "Boca Juniors", "Zenit", "CSKA Moscow", "Spartak Moscow", "Krasnodar", "Vissel Kobe", "Kashima Antlers", "Kashiwa Reysol", "Viking", "Daejeon Citizen", "Jeonbuk Motors", "RSB Berkane", "FAR Rabat", "Wydad Casablanca", "Shakhtar Donetsk", "Shamrock Rovers", "Dynamo Kyiv", "St Patrick's Athletic", "Bohemians", "Servette", "Young Boys", "Basel", "Crvena zvezda", "Vojvodina", "FCSB", "CFR Cluj", "Slavia Prague", "Sparta Prague", "Lech Poznan", "Rakow Czestochowa", "Vardar", "Shkendija", "Vikingur", "KuPS", "Inter Turku", "HJK Helsinki", "Ilves", "SJK", "PSG"
];

async function main() {
  // deduplicate
  const uniqueNames = [...new Set(inputList)];
  console.log(`Unique names to process: ${uniqueNames.length}`);

  let allTeams = [...USER_FAVORITE_CLUBS_DATA];
  try {
    const scraped = JSON.parse(fs.readFileSync('./scraped_teams.json', 'utf-8'));
    allTeams = [...allTeams, ...scraped];
  } catch (e) {}

  const currentFavs = await fetchSharedFavorites();
  const currentIds = new Set(currentFavs.map((f: any) => Number(f.id)));

  let added = 0;
  let notFound = [];

  for (const name of uniqueNames) {
    console.log(`Processing: ${name}`);
    
    // 1. Try local data first
    let team = allTeams.find(t => t.name.toLowerCase() === name.toLowerCase());
    
    // 2. Try FotMob Search if not found
    if (!team) {
      const searchRes = await searchFotMobTeam(name);
      if (searchRes && searchRes.team) {
        team = {
          id: searchRes.team.id,
          name: searchRes.team.name,
          country: searchRes.team.country,
          league: searchRes.team.leagueName || searchRes.team.league
        };
      }
    }

    if (team) {
      if (!currentIds.has(Number(team.id))) {
        const success = await addSharedFavorite({
          id: Number(team.id),
          name: team.name,
          country: team.country,
          league: team.league || (team as any).leagueName
        });
        if (success) {
          added++;
          currentIds.add(Number(team.id));
          console.log(`✅ Added: ${team.name} (${team.id})`);
        } else {
          console.log(`❌ Failed to add: ${team.name}`);
        }
      } else {
        console.log(`ℹ️ Already in favorites: ${team.name}`);
      }
    } else {
      console.log(`⚠️ NOT FOUND anywhere: ${name}`);
      notFound.push(name);
    }
    
    // small delay to not spam fotmob api
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n🎉 Successfully added: ${added} new teams!`);
  if (notFound.length > 0) {
    console.log(`Teams not found:`, notFound);
  }
}

main();
