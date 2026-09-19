import React from 'react';

export default function RankBadge({ rank = 'B', size = 'md' }) {
  const rankConfigs = {
    S: { border: 'border-yellow-400 text-yellow-300 shadow-yellow-500/40 bg-yellow-950/40', title: 'S-Rank' },
    A: { border: 'border-purple-400 text-purple-300 shadow-purple-500/40 bg-purple-950/40', title: 'A-Rank' },
    B: { border: 'border-blue-400 text-blue-300 shadow-blue-500/40 bg-blue-950/40', title: 'B-Rank' },
    C: { border: 'border-cyan-400 text-cyan-300 shadow-cyan-500/40 bg-cyan-950/40', title: 'C-Rank' },
    D: { border: 'border-emerald-400 text-emerald-300 shadow-emerald-500/40 bg-emerald-950/40', title: 'D-Rank' },
    E: { border: 'border-slate-400 text-slate-300 shadow-slate-500/40 bg-slate-900/40', title: 'E-Rank' },
  };

  const config = rankConfigs[rank] || rankConfigs.E;

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs border',
    md: 'w-10 h-10 text-sm border-2',
    lg: 'w-16 h-16 text-2xl border-2 font-black',
    xl: 'w-24 h-24 text-4xl border-4 font-black shadow-2xl',
  };

  return (
    <div 
      className={`inline-flex items-center justify-center font-bold rounded-lg transform rotate-45 transition-transform hover:scale-110 shadow-lg ${sizeClasses[size]} ${config.border}`}
      title={config.title}
    >
      <span className="transform -rotate-45 tracking-tighter">
        {rank}
      </span>
    </div>
  );
}
