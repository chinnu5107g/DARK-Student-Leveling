import React from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import RankBadge from './RankBadge';
import XPBar from './XPBar';
import { Brain, Code2, Cpu, BookOpen, Target, Flame, Trophy } from 'lucide-react';

export default function PlayerStats({ compact = false }) {
  const { 
    user, 
    level, 
    currentLevelXp, 
    xpForNextLevel, 
    rankInfo, 
    stats, 
    streak, 
    completedQuestsCount,
    solvedProblemsCount 
  } = usePlayerStore();

  const statItems = [
    { label: 'Intelligence', value: stats.intelligence, icon: Brain, color: 'text-cyan-400', bar: 'from-blue-600 to-cyan-400' },
    { label: 'Coding', value: stats.coding, icon: Code2, color: 'text-blue-400', bar: 'from-indigo-600 to-blue-400' },
    { label: 'Logic', value: stats.logic, icon: Cpu, color: 'text-purple-400', bar: 'from-violet-600 to-purple-400' },
    { label: 'Knowledge', value: stats.knowledge, icon: BookOpen, color: 'text-emerald-400', bar: 'from-teal-600 to-emerald-400' },
    { label: 'Problem Solving', value: stats.problemSolving, icon: Target, color: 'text-amber-400', bar: 'from-orange-600 to-amber-400' },
  ];

  return (
    <div className="holo-panel p-6 relative overflow-hidden border border-cyan-500/30">
      {/* Subtle Corner Hologram Decals */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-400/80 overflow-hidden bg-slate-900 shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center font-bold text-cyan-300 text-lg">
              {user.name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <RankBadge rank={rankInfo.rank} size="sm" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide uppercase flex items-center gap-2">
              {user.name}
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono">
                LV. {level}
              </span>
            </h3>
            <p className="text-xs text-cyan-400/80 font-medium">{user.title}</p>
          </div>
        </div>

        {/* Rank Crest & Streak */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Class Rank</div>
            <div className="text-sm font-bold text-cyan-300">{rankInfo.name}</div>
          </div>
          <RankBadge rank={rankInfo.rank} size="md" />
        </div>
      </div>

      {/* Level & XP Gauge */}
      <div className="mb-5 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
        <XPBar current={currentLevelXp} max={xpForNextLevel} level={level} />
      </div>

      {/* Attributes Grid */}
      <div className="space-y-3 mb-5">
        <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase flex justify-between">
          <span>Student Attributes</span>
          <span className="text-cyan-400">Combat & Academic Ratings</span>
        </div>

        {statItems.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Icon size={14} className={item.color} />
                  {item.label}
                </span>
                <span className="font-mono font-bold text-white">{item.value} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.bar} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Player Meta Stats */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center">
        <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
          <div className="flex items-center justify-center gap-1 text-orange-400 text-xs font-semibold">
            <Flame size={13} />
            Streak
          </div>
          <div className="text-sm font-bold text-white font-mono mt-0.5">{streak} Days</div>
        </div>
        <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
          <div className="flex items-center justify-center gap-1 text-cyan-400 text-xs font-semibold">
            <Trophy size={13} />
            Quests
          </div>
          <div className="text-sm font-bold text-white font-mono mt-0.5">{completedQuestsCount} Done</div>
        </div>
        <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
          <div className="flex items-center justify-center gap-1 text-purple-400 text-xs font-semibold">
            <Code2 size={13} />
            Dungeons
          </div>
          <div className="text-sm font-bold text-white font-mono mt-0.5">{solvedProblemsCount} Cleared</div>
        </div>
      </div>
    </div>
  );
}
