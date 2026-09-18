import React from 'react';
import { Match, StandingItem } from '../types';
import { getLeagueOverviewStats } from '../utils/standings';
import { TeamBadge } from './TeamBadge';
import { Flame, Shield, TrendingUp, BarChart3, Target, Goal, CheckCircle2, Award } from 'lucide-react';

interface StatsDashboardProps {
  matches: Match[];
  standings: StandingItem[];
  leagueName: string;
  onSelectTeam: (team: string) => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  matches,
  standings,
  leagueName,
  onSelectTeam,
}) => {
  const stats = getLeagueOverviewStats(matches, standings);

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-[#111111] p-5 rounded-xl border border-zinc-800">
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-2 font-['Outfit']">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>Estatísticas Gerais & Métricas da Liga</span>
        </h2>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Visão quantitativa de gols, aproveitamento de mandantes/visitantes e recordes da temporada
        </p>
      </div>

      {/* Top Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Goals */}
        <div className="bg-[#111111] p-4 rounded-xl border border-zinc-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Total de Gols</span>
            <Goal className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-white font-mono">
            {stats.totalGoals}
          </div>
          <span className="text-[10px] text-zinc-500 block mt-1 font-mono">
            em {stats.playedCount} jogos realizados
          </span>
        </div>

        {/* Avg Goals Per Game */}
        <div className="bg-[#111111] p-4 rounded-xl border border-zinc-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Média por Partida</span>
            <Flame className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-400 font-mono">
            {stats.avgGoalsPerGame}
          </div>
          <span className="text-[10px] text-zinc-500 block mt-1 font-mono">
            gols/jogo na liga
          </span>
        </div>

        {/* Over 2.5 Goals */}
        <div className="bg-[#111111] p-4 rounded-xl border border-zinc-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Over 2.5 Gols</span>
            <TrendingUp className="w-4 h-4 text-zinc-300" />
          </div>
          <div className="mt-2 text-2xl font-black text-zinc-100 font-mono">
            {stats.over25Percentage}%
          </div>
          <span className="text-[10px] text-zinc-500 block mt-1 font-mono">
            jogos com 3+ gols
          </span>
        </div>

        {/* BTTS (Both Teams To Score) */}
        <div className="bg-[#111111] p-4 rounded-xl border border-zinc-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Ambas Marcam</span>
            <Target className="w-4 h-4 text-zinc-300" />
          </div>
          <div className="mt-2 text-2xl font-black text-zinc-100 font-mono">
            {stats.bttsPercentage}%
          </div>
          <span className="text-[10px] text-zinc-500 block mt-1 font-mono">
            ambas equipes marcaram
          </span>
        </div>
      </div>

      {/* Home vs Draw vs Away Distribution */}
      <div className="bg-[#111111] p-5 rounded-xl border border-zinc-800 space-y-3 shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300 font-['Outfit']">
          Distribuição dos Resultados (Fator Mando de Campo)
        </h3>
        
        {/* Progress Bar */}
        <div className="h-4 w-full bg-zinc-950 rounded-full overflow-hidden flex border border-zinc-800 p-0.5">
          <div
            style={{ width: `${stats.homeWinPercentage}%` }}
            className="bg-emerald-500 h-full rounded-l-full flex items-center justify-center text-[9px] font-mono font-bold text-black"
            title={`Vitórias Mandantes: ${stats.homeWinPercentage}%`}
          >
            {stats.homeWinPercentage > 10 && `${stats.homeWinPercentage}%`}
          </div>
          <div
            style={{ width: `${stats.drawPercentage}%` }}
            className="bg-zinc-600 h-full flex items-center justify-center text-[9px] font-mono font-bold text-zinc-200"
            title={`Empates: ${stats.drawPercentage}%`}
          >
            {stats.drawPercentage > 10 && `${stats.drawPercentage}%`}
          </div>
          <div
            style={{ width: `${stats.awayWinPercentage}%` }}
            className="bg-zinc-800 h-full rounded-r-full flex items-center justify-center text-[9px] font-mono font-bold text-zinc-300"
            title={`Vitórias Visitantes: ${stats.awayWinPercentage}%`}
          >
            {stats.awayWinPercentage > 10 && `${stats.awayWinPercentage}%`}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1">
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block font-bold">Vitória Mandante</span>
            <span className="text-emerald-400 font-mono font-bold text-sm">{stats.homeWinPercentage}%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block font-bold">Empates</span>
            <span className="text-zinc-300 font-mono font-bold text-sm">{stats.drawPercentage}%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block font-bold">Vitória Visitante</span>
            <span className="text-zinc-400 font-mono font-bold text-sm">{stats.awayWinPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Leaderboards: Top Attacks vs Best Defenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Top Attacks */}
        <div className="bg-[#111111] p-5 rounded-xl border border-zinc-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-emerald-500/10 text-emerald-400">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-200 font-['Outfit']">
                Melhores Ataques
              </h3>
            </div>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-2">
            {stats.topAttackingTeams.map((team, idx) => (
              <div
                key={team.team}
                onClick={() => onSelectTeam(team.team)}
                className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-850 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 text-center text-xs font-mono font-bold text-zinc-500">
                    #{idx + 1}
                  </span>
                  <TeamBadge teamName={team.team} size="sm" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {Math.round((team.goalsFor / (team.played || 1)) * 10) / 10} g/j
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-xs font-mono">
                    {team.goalsFor} gols
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Defenses */}
        <div className="bg-[#111111] p-5 rounded-xl border border-zinc-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-zinc-800 text-zinc-300">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-200 font-['Outfit']">
                Melhores Defesas
              </h3>
            </div>
            <Award className="w-4 h-4 text-zinc-400" />
          </div>

          <div className="space-y-2">
            {stats.bestDefenses.map((team, idx) => (
              <div
                key={team.team}
                onClick={() => onSelectTeam(team.team)}
                className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-850 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 text-center text-xs font-mono font-bold text-zinc-500">
                    #{idx + 1}
                  </span>
                  <TeamBadge teamName={team.team} size="sm" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {Math.round((team.goalsAgainst / (team.played || 1)) * 10) / 10} sofridos/j
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs font-mono">
                    {team.goalsAgainst} gols
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
