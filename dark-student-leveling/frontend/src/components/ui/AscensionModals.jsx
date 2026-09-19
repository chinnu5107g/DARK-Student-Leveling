import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import { Sparkles, ArrowUp, CheckCircle, Flame } from 'lucide-react';
import RankBadge from './RankBadge';

export function LevelUpModal() {
  const { showLevelUpModal, unlockedLevel, rankInfo, closeLevelUpModal, stats } = usePlayerStore();

  if (!showLevelUpModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        {/* Holographic Ascension Rays */}
        <motion.div
          className="relative max-w-md w-full holo-panel p-8 text-center border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,229,255,0.4)]"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Energy Ring Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-[0_0_30px_#00E5FF] flex items-center justify-center">
            <span className="text-3xl font-black text-white">LV</span>
          </div>

          <div className="mt-8 space-y-2">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.3em] text-cyan-400">
              System Ascension
            </h2>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-400">
              LEVEL UP!
            </h1>
            <div className="text-2xl font-mono font-black text-cyan-300">
              LEVEL {unlockedLevel} REACHED
            </div>
          </div>

          <div className="my-6 p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-left space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>All Attributes Boosted</span>
              <span className="text-emerald-400 font-mono">+2 PTS EACH</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex justify-between"><span>Intelligence:</span> <span className="text-cyan-400 font-bold">{stats.intelligence}</span></div>
              <div className="flex justify-between"><span>Coding:</span> <span className="text-cyan-400 font-bold">{stats.coding}</span></div>
              <div className="flex justify-between"><span>Logic:</span> <span className="text-cyan-400 font-bold">{stats.logic}</span></div>
              <div className="flex justify-between"><span>Problem Solving:</span> <span className="text-cyan-400 font-bold">{stats.problemSolving}</span></div>
            </div>
          </div>

          <div className="text-xs text-slate-400 italic mb-6">
            "Your mana and intellect have surged. Keep moving forward." — DARK
          </div>

          <button
            onClick={closeLevelUpModal}
            className="w-full py-3 rounded-xl holo-btn text-sm font-bold tracking-wider"
          >
            CLAIM POWER & CONTINUE
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function RankUpModal() {
  const { showRankUpModal, unlockedRank, closeRankUpModal, rankInfo } = usePlayerStore();

  if (!showRankUpModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
        <motion.div
          className="relative max-w-md w-full holo-panel p-8 text-center border-2 border-purple-400 shadow-[0_0_60px_rgba(139,92,246,0.5)]"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
        >
          <div className="flex justify-center mb-6">
            <RankBadge rank={unlockedRank} size="xl" />
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase font-extrabold tracking-[0.3em] text-purple-400">
              Dimensional Promotion
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-300 to-indigo-400">
              RANK PROMOTION!
            </h1>
            <div className="text-xl font-bold text-white">
              {rankInfo.name} ({unlockedRank}-Rank)
            </div>
          </div>

          <p className="text-xs text-slate-300 my-5 bg-purple-950/40 p-3 rounded-lg border border-purple-500/30">
            You have unlocked high-tier dungeons, elite challenges, and advanced academy archives!
          </p>

          <button
            onClick={closeRankUpModal}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(139,92,246,0.5)] transition"
          >
            ACCEPT NEW RANK
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
