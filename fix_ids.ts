import fs from 'fs';
import { searchFotMobTeam } from './server/fotmobScraper';
import { USER_FAVORITE_CLUBS_DATA } from './src/data/favoriteClubs';
import { supabaseAdmin } from './server/supabase';

async function main() {
  const updatedClubs = [];
  
  for (const club of USER_FAVORITE_CLUBS_DATA) {
    try {
      const searchRes = await searchFotMobTeam(club.name);
      let realId = club.id;
      if (searchRes && searchRes.team && searchRes.team.id) {
        realId = Number(searchRes.team.id);
      }
      
      updatedClubs.push({
        ...club,
        id: realId
      });
      
      console.log(`[${club.name}] Old: ${club.id}, New: ${realId}`);
      await new Promise(r => setTimeout(r, 100)); // sleep
    } catch (e) {
      console.log(`Failed for ${club.name}`);
      updatedClubs.push(club);
    }
  }

  // write back to file
  let fileContent = `/**\n * Complete list of user favorite clubs from Supabase (126 deduplicated male primary clubs)\n */\n`;
  fileContent += `export const USER_FAVORITE_CLUBS_DATA: { id: number; name: string; country: string; league?: string }[] = [\n`;
  updatedClubs.forEach(c => {
    fileContent += `  { id: ${c.id}, name: '${c.name}', country: '${c.country}'${c.league ? `, league: '${c.league}'` : ''} },\n`;
  });
  fileContent += `];\n`;
  
  fs.writeFileSync('./src/data/favoriteClubs.ts', fileContent);
  
  // Update supabase
  const { data } = await supabaseAdmin.from('shared_favorite_clubs').select('*');
  console.log(`Updating ${data?.length} in Supabase...`);
  
  await supabaseAdmin.from('shared_favorite_clubs').delete().neq('id', 0); // clear all
  
  const insertData = updatedClubs.map(c => ({
    id: c.id,
    name: c.name,
    country: c.country,
    league: c.league
  }));
  
  // chunk insert
  for(let i=0; i<insertData.length; i+=20) {
     const chunk = insertData.slice(i, i+20);
     await supabaseAdmin.from('shared_favorite_clubs').insert(chunk);
  }
  
  console.log('Done fixing IDs');
}
main();
