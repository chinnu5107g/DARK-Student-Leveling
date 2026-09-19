import React from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import soundEngine from '../services/soundEngine';
import { 
  CheckSquare, 
  Trophy, 
  Sparkles, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Award,
  ArrowRight
} from 'lucide-react';

export default function Quests() {
  const { quests, completeQuest, completedQuestsCount, addXP } = usePlayerStore();

  const completedCount = quests.filter(q => q.completed).length;
  const isAllComplete = completedCount === quests.length;

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-6">
      
      {/* Quests Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-[0_0_20px_#00E5FF] text-white">
            <CheckSquare size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                DAILY QUEST CONTRACTS
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono font-bold">
                SYSTEM ORDERS
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Complete all five daily directives before the midnight cycle reset to unlock the grand bonus.
            </p>
          </div>
        </div>

        {/* Daily Bonus Chip */}
        <div className="text-right">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Completion Bonus</div>
          <div className="text-base font-black text-cyan-300 font-mono">+250 XP EXTRA</div>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="holo-panel p-6 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase">
          <span className="text-slate-300">Daily Directive Progress</span>
          <span className="text-cyan-400 font-mono">{completedCount} / {quests.length} COMPLETED</span>
        </div>
        
        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-300 rounded-full shadow-[0_0_15px_#00E5FF]"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / quests.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {isAllComplete && (
          <motion.div
            className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-400 text-center text-cyan-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Sparkles size={16} className="text-cyan-300 animate-spin-slow" />
            <span>ALL DAILY CONTRACTS CLEARED • BONUS XP CLAIMED!</span>
          </motion.div>
        )}
      </div>

      {/* Quests List */}
      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`holo-panel p-5 border transition-all flex items-center justify-between gap-4 ${
              quest.completed
                ? 'border-emerald-500/40 bg-emerald-950/10'
                : 'border-slate-800 hover:border-cyan-500/40'
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => completeQuest(quest.id)}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${
                  quest.completed
                    ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_10px_#00E5FF]'
                    : 'border-slate-700 bg-slate-900 hover:border-cyan-400'
                }`}
              >
                {quest.completed && <CheckCircle2 size={16} className="text-slate-950" />}
              </button>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-900 border border-slate-700 text-cyan-400 uppercase">
                    {quest.category}
                  </span>
                  {quest.completed && (
                    <span className="text-[10px] font-bold text-emerald-400 font-mono">
                      COMPLETED
                    </span>
                  )}
                </div>
                <div className={`text-sm font-bold ${quest.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                  {quest.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Progress: {quest.progress} / {quest.total}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-sm font-black font-mono text-cyan-300">
                +{quest.xp} XP
              </div>
              {!quest.completed && (
                <button
                  onClick={() => completeQuest(quest.id)}
                  className="mt-1.5 px-3 py-1 rounded-md holo-btn text-[10px] font-bold"
                >
                  CLAIM
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
