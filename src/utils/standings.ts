import { Match, StandingItem, HeadToHeadStats } from '../types';

export function calculateStandings(matches: Match[]): StandingItem[] {
  const tableMap = new Map<string, {
    team: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
    form: ('W' | 'D' | 'L')[];
    home: {
      played: number;
      won: number;
      drawn: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
      points: number;
    };
    away: {
      played: number;
      won: number;
      drawn: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
      points: number;
    };
  }>();

  // Initialize or get team
  const getOrCreate = (teamName: string) => {
    if (!tableMap.has(teamName)) {
      tableMap.set(teamName, {
        team: teamName,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
        form: [],
        home: { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        away: { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      });
    }
    return tableMap.get(teamName)!;
  };

  // Sort matches by date to ensure proper form sequence
  const sortedMatches = [...matches].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  for (const match of sortedMatches) {
    if (!match.team1 || !match.team2) continue;
    const t1 = getOrCreate(match.team1);
    const t2 = getOrCreate(match.team2);

    // If match has concluded with a score
    if (match.score && Array.isArray(match.score.ft) && match.score.ft.length === 2) {
      const [score1, score2] = match.score.ft;

      // Overall
      t1.played += 1;
      t2.played += 1;
      t1.goalsFor += score1;
      t1.goalsAgainst += score2;
      t2.goalsFor += score2;
      t2.goalsAgainst += score1;

      // Home / Away
      t1.home.played += 1;
      t1.home.goalsFor += score1;
      t1.home.goalsAgainst += score2;

      t2.away.played += 1;
      t2.away.goalsFor += score2;
      t2.away.goalsAgainst += score1;

      if (score1 > score2) {
        t1.won += 1;
        t1.points += 3;
        t1.home.won += 1;
        t1.home.points += 3;

        t2.lost += 1;
        t2.away.lost += 1;

        t1.form.push('W');
        t2.form.push('L');
      } else if (score1 === score2) {
        t1.drawn += 1;
        t1.points += 1;
        t1.home.drawn += 1;
        t1.home.points += 1;

        t2.drawn += 1;
        t2.points += 1;
        t2.away.drawn += 1;
        t2.away.points += 1;

        t1.form.push('D');
        t2.form.push('D');
      } else {
        t2.won += 1;
        t2.points += 3;
        t2.away.won += 1;
        t2.away.points += 3;

        t1.lost += 1;
        t1.home.lost += 1;

        t1.form.push('L');
        t2.form.push('W');
      }
    }
  }

  // Convert map to array and compute goal diff & rank
  const items: StandingItem[] = Array.from(tableMap.values()).map((row) => ({
    rank: 0,
    team: row.team,
    played: row.played,
    won: row.won,
    drawn: row.drawn,
    lost: row.lost,
    goalsFor: row.goalsFor,
    goalsAgainst: row.goalsAgainst,
    goalDiff: row.goalsFor - row.goalsAgainst,
    points: row.points,
    form: row.form.slice(-5), // Last 5 matches
    home: row.home,
    away: row.away,
  }));

  // Sort by: Points (DESC), Goal Difference (DESC), Goals For (DESC), Team Name (ASC)
  items.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.localeCompare(b.team);
  });

  // Assign rankings
  items.forEach((item, index) => {
    item.rank = index + 1;
  });

  return items;
}

export function calculateHeadToHead(team1: string, team2: string, matches: Match[]): HeadToHeadStats {
  const directMatches = matches.filter(
    (m) =>
      (m.team1 === team1 && m.team2 === team2) ||
      (m.team1 === team2 && m.team2 === team1)
  );

  let team1Wins = 0;
  let team2Wins = 0;
  let draws = 0;
  let team1Goals = 0;
  let team2Goals = 0;
  let bothTeamsScoredCount = 0;
  let over25Count = 0;
  const playedMatches: Match[] = [];

  for (const match of directMatches) {
    if (match.score && Array.isArray(match.score.ft)) {
      playedMatches.push(match);
      const isTeam1Home = match.team1 === team1;
      const score1 = isTeam1Home ? match.score.ft[0] : match.score.ft[1];
      const score2 = isTeam1Home ? match.score.ft[1] : match.score.ft[0];

      team1Goals += score1;
      team2Goals += score2;

      if (score1 > score2) {
        team1Wins++;
      } else if (score1 < score2) {
        team2Wins++;
      } else {
        draws++;
      }

      if (score1 > 0 && score2 > 0) {
        bothTeamsScoredCount++;
      }
      if (score1 + score2 > 2.5) {
        over25Count++;
      }
    }
  }

  const totalMatches = playedMatches.length;
  const avgGoals = totalMatches > 0 ? (team1Goals + team2Goals) / totalMatches : 0;

  return {
    team1,
    team2,
    totalMatches,
    team1Wins,
    team2Wins,
    draws,
    team1Goals,
    team2Goals,
    avgGoals: Math.round(avgGoals * 100) / 100,
    bothTeamsScoredCount,
    over25Count,
    matches: directMatches,
  };
}

export function getLeagueOverviewStats(matches: Match[], standings: StandingItem[]) {
  const playedMatches = matches.filter((m) => m.score && Array.isArray(m.score.ft));
  let totalGoals = 0;
  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;
  let over25Matches = 0;
  let bttsMatches = 0;

  for (const match of playedMatches) {
    const [ft1, ft2] = match.score!.ft!;
    totalGoals += ft1 + ft2;
    if (ft1 > ft2) homeWins++;
    else if (ft2 > ft1) awayWins++;
    else draws++;

    if (ft1 + ft2 > 2.5) over25Matches++;
    if (ft1 > 0 && ft2 > 0) bttsMatches++;
  }

  const total = playedMatches.length || 1;
  const avgGoalsPerGame = totalGoals / total;

  const sortedByAttack = [...standings].sort((a, b) => b.goalsFor - a.goalsFor);
  const sortedByDefense = [...standings].sort((a, b) => a.goalsAgainst - b.goalsAgainst);

  return {
    totalMatches: matches.length,
    playedCount: playedMatches.length,
    upcomingCount: matches.length - playedMatches.length,
    totalGoals,
    avgGoalsPerGame: Math.round(avgGoalsPerGame * 100) / 100,
    homeWinPercentage: Math.round((homeWins / total) * 100),
    awayWinPercentage: Math.round((awayWins / total) * 100),
    drawPercentage: Math.round((draws / total) * 100),
    over25Percentage: Math.round((over25Matches / total) * 100),
    bttsPercentage: Math.round((bttsMatches / total) * 100),
    topAttackingTeams: sortedByAttack.slice(0, 5),
    bestDefenses: sortedByDefense.slice(0, 5),
  };
}
