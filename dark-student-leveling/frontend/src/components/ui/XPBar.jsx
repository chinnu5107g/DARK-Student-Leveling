import React from 'react';
import { motion } from 'framer-motion';

export default function XPBar({ current = 820, max = 1200, level = 12, showText = true }) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className="w-full">
      {showText && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium tracking-wide">
          <span className="text-cyan-400 font-bold uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            EXP PROGRESS
          </span>
          <span className="text-slate-300 font-mono">
            <span className="text-cyan-300 font-semibold">{current}</span>
            <span className="text-slate-500"> / </span>
            <span>{max} XP</span>
            <span className="ml-2 text-cyan-400/80">({percentage.toFixed(1)}%)</span>
          </span>
        </div>
      )}
      <div className="relative h-3 w-full bg-slate-950/80 border border-cyan-500/30 rounded-full overflow-hidden p-0.5 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-300 relative shadow-[0_0_12px_#00E5FF]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated energy line on bar */}
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
