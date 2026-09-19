import React from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Flame, 
  Code2, 
  BrainCircuit, 
  Moon, 
  Sun, 
  Trophy, 
  Zap,
  Sparkles
} from 'lucide-react';

export default function Achievements() {
  const { streak, solvedProblemsCount, answeredAptitudeCount, completedQuestsCount, rankInfo } = usePlayerStore();

  const badges = [
    {
      id: 'b1',
      title: 'FIRST QUEST',
      category: 'Progression',
      description: 'Accepted and completed your very first student learning contract.',
      xpReward: 50,
      unlocked: completedQuestsCount >= 1,
      icon: CheckCircle2,
      progress: Math.min(1, completedQuestsCount),
      total: 1
    },
    {
      id: 'b2',
      title: 'CODING BEGINNER',
      category: 'Coding',
      description: 'Defeated your first algorithmic barrier in the Coding Dungeon.',
      xpReward: 100,
      unlocked: solvedProblemsCount >= 1,
      icon: Code2,
      progress: Math.min(1, solvedProblemsCount),
      total: 1
    },
    {
      id: 'b3',
      title: 'PYTHON MASTER',
      category: 'Coding',
      description: 'Successfully conquered 10 Python dungeon challenges with optimal time complexity.',
      xpReward: 250,
      unlocked: solvedProblemsCount >= 10,
      icon: Zap,
      progress: Math.min(10, solvedProblemsCount),
      total: 10
    },
    {
      id: 'b4',
      title: '7 DAY STREAK',
      category: 'Dedication',
      description: 'Maintained an unbroken study meditation streak for 7 consecutive days.',
      xpReward: 200,
      unlocked: streak >= 7,
      icon: Flame,
      progress: Math.min(7, streak),
      total: 7
    },
    {
      id: 'b5',
      title: '100 QUESTIONS',
      category: 'Intellect',
      description: 'Answered over 100 aptitude and reasoning questions in the Arena.',
      xpReward: 300,
      unlocked: answeredAptitudeCount >= 100,
      icon: BrainCircuit,
      progress: Math.min(100, answeredAptitudeCount),
      total: 100
    },
    {
      id: 'b6',
      title: 'FIRST DUNGEON',
      category: 'Combat',
      description: 'Cleared all introductory floors of the Coding Dungeon.',
      xpReward: 150,
      unlocked: solvedProblemsCount >= 4,
      icon: Trophy,
      progress: Math.min(4, solvedProblemsCount),
      total: 4
    },
    {
      id: 'b7',
      title: 'NIGHT OWL',
      category: 'Discipline',
      description: 'Logged a study session and cleared a quest past midnight.',
      xpReward: 75,
      unlocked: true,
      icon: Moon,
      progress: 1,
      total: 1
    },
    {
      id: 'b8',
      title: 'EARLY RISER',
      category: 'Discipline',
      description: 'Awakened before 06:00 AM to solve an aptitude speed trial.',
      xpReward: 75,
      unlocked: false,
      icon: Sun,
      progress: 0,
      total: 1
    },
    {
      id: 'b9',
      title: 'S RANK ASCENSION',
      category: 'Prestige',
      description: 'Surpassed 10,000 XP and attained the ultimate title of Shadow Sovereign.',
      xpReward: 1000,
      unlocked: rankInfo.rank === 'S',
      icon: Sparkles,
      progress: rankInfo.rank === 'S' ? 1 : 0,
      total: 1
    },
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-6">
      
      {/* Achievements Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-[0_0_20px_#00E5FF] text-white">
            <Award size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                ACHIEVEMENT TROPHY VAULT
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono font-bold">
                SYSTEM RECOGNITION
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Unlock prestigious badges and trophies as you clear dungeons, streaks, and ranks.
            </p>
          </div>
        </div>

        {/* Counter */}
        <div className="text-right">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Trophies Unlocked</div>
          <div className="text-base font-black text-cyan-300 font-mono">{unlockedCount} / {badges.length}</div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`holo-panel p-6 border transition-all relative overflow-hidden flex flex-col justify-between ${
                badge.unlocked
                  ? 'border-cyan-500/40 hover:border-cyan-400/80 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                  : 'border-slate-800 opacity-60'
              }`}
            >
              {/* Corner Watermark */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl border ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_15px_#00E5FF]'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}>
                  <Icon size={22} />
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 uppercase">
                    {badge.category}
                  </span>
                  <div className="text-xs font-mono font-bold text-cyan-400 mt-1">
                    +{badge.xpReward} XP
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-black text-white tracking-wide">
                    {badge.title}
                  </h3>
                  {badge.unlocked ? (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-400/30 font-bold">
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-500 border border-slate-800 flex items-center gap-1 font-bold">
                      <Lock size={9} />
                      LOCKED
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {badge.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Requirement Progress</span>
                  <span>{badge.progress} / {badge.total}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
