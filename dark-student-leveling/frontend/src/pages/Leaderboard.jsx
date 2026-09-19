import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RankBadge from '../components/ui/RankBadge';
import { usePlayerStore } from '../store/playerStore';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Code2, 
  BrainCircuit, 
  Medal, 
  Sparkles,
  ArrowUp
} from 'lucide-react';

export default function Leaderboard() {
  const { user, level, totalXp, rankInfo } = usePlayerStore();
  const [filter, setFilter] = useState('global');

  const topStudents = [
    {
      rank: 1,
      name: 'Vanguard_Kael',
      title: 'Monarch of Binary',
      level: 28,
      xp: 14850,
      studentRank: 'S',
      codingScore: 980,
      aptitudeScore: 940,
      streak: 42,
      avatar: 'K'
    },
    {
      rank: 2,
      name: 'Aether_Ren',
      title: 'Neural Grandmaster',
      level: 24,
      xp: 11200,
      studentRank: 'S',
      codingScore: 910,
      aptitudeScore: 890,
      streak: 31,
      avatar: 'A'
    },
    {
      rank: 3,
      name: 'Cipher_Elena',
      title: 'Algorithm Weaver',
      level: 19,
      xp: 8750,
      studentRank: 'A',
      codingScore: 840,
      aptitudeScore: 860,
      streak: 25,
      avatar: 'C'
    },
    {
      rank: 4,
      name: 'Shadow_Jin',
      title: 'Syntax Assassin',
      level: 16,
      xp: 6900,
      studentRank: 'A',
      codingScore: 780,
      aptitudeScore: 750,
      streak: 19,
      avatar: 'S'
    },
    {
      rank: 5,
      name: 'Nova_Tariq',
      title: 'Data Architect',
      level: 14,
      xp: 5400,
      studentRank: 'B',
      codingScore: 710,
      aptitudeScore: 730,
      streak: 14,
      avatar: 'N'
    },
    {
      rank: 6,
      name: user.name, // Current user
      title: user.title,
      level: level,
      xp: totalXp,
      studentRank: rankInfo.rank,
      codingScore: 650,
      aptitudeScore: 680,
      streak: 7,
      avatar: 'P',
      isCurrentUser: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Leaderboard Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-950/40 via-slate-900 to-slate-950 border border-yellow-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-600 to-amber-500 shadow-[0_0_25px_rgba(234,179,8,0.5)] text-slate-950 font-black">
            <Trophy size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                HALL OF MONARCHS & SOVEREIGNS
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-500/30 font-mono font-bold">
                ACADEMY RANKINGS
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Global and weekly leaderboards showcasing the highest-ranking students in the academy.
            </p>
          </div>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilter('global')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'global'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Global All-Time
          </button>
          <button
            onClick={() => setFilter('weekly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'weekly'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly Sprint
          </button>
        </div>
      </div>

      {/* Podium Top 3 3D Effect Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 holo-panel p-6 border border-slate-500/30 flex flex-col items-center text-center relative mt-0 md:mt-6">
          <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm mb-3">
            #2
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-slate-400 overflow-hidden bg-slate-900 flex items-center justify-center text-xl font-black text-slate-300 mb-3 shadow-[0_0_20px_rgba(148,163,184,0.3)]">
            {topStudents[1].avatar}
          </div>
          <h3 className="text-base font-bold text-white">{topStudents[1].name}</h3>
          <p className="text-xs text-slate-400 mb-3">{topStudents[1].title}</p>
          <div className="w-full bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between font-mono"><span>XP:</span> <span className="text-cyan-400 font-bold">{topStudents[1].xp}</span></div>
            <div className="flex justify-between font-mono"><span>Rank:</span> <span className="text-purple-400 font-bold">{topStudents[1].studentRank}</span></div>
          </div>
        </div>

        {/* 1st Place Champion */}
        <div className="order-1 md:order-2 holo-panel-cyan p-6 border-2 border-yellow-400/80 flex flex-col items-center text-center relative shadow-[0_0_35px_rgba(234,179,8,0.3)]">
          <div className="absolute -top-4 w-8 h-8 rounded-full bg-yellow-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
            <Crown size={18} />
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden bg-slate-900 flex items-center justify-center text-2xl font-black text-yellow-300 my-2 shadow-[0_0_25px_#EAB308]">
            {topStudents[0].avatar}
          </div>
          <h3 className="text-lg font-black text-white">{topStudents[0].name}</h3>
          <p className="text-xs text-yellow-400/90 font-medium mb-3">{topStudents[0].title}</p>
          <div className="w-full bg-slate-950/90 p-3.5 rounded-xl border border-yellow-500/30 space-y-1.5 text-xs">
            <div className="flex justify-between font-mono"><span>Total XP:</span> <span className="text-yellow-300 font-bold">{topStudents[0].xp}</span></div>
            <div className="flex justify-between font-mono"><span>Level:</span> <span className="text-cyan-400 font-bold">LV. {topStudents[0].level}</span></div>
            <div className="flex justify-between font-mono"><span>Rank:</span> <span className="text-yellow-400 font-bold">S-Rank</span></div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 holo-panel p-6 border border-amber-700/30 flex flex-col items-center text-center relative mt-0 md:mt-8">
          <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-200 flex items-center justify-center font-bold text-sm mb-3">
            #3
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-amber-600 overflow-hidden bg-slate-900 flex items-center justify-center text-xl font-black text-amber-300 mb-3 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
            {topStudents[2].avatar}
          </div>
          <h3 className="text-base font-bold text-white">{topStudents[2].name}</h3>
          <p className="text-xs text-slate-400 mb-3">{topStudents[2].title}</p>
          <div className="w-full bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between font-mono"><span>XP:</span> <span className="text-cyan-400 font-bold">{topStudents[2].xp}</span></div>
            <div className="flex justify-between font-mono"><span>Rank:</span> <span className="text-purple-400 font-bold">{topStudents[2].studentRank}</span></div>
          </div>
        </div>
      </div>

      {/* Complete Rankings Table */}
      <div className="holo-panel rounded-2xl overflow-hidden border border-cyan-500/20">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Complete Roster</span>
          <span>Attributes & Standings</span>
        </div>

        <div className="divide-y divide-slate-850">
          {topStudents.map((st) => (
            <div
              key={st.rank}
              className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
                st.isCurrentUser
                  ? 'bg-blue-950/40 border-l-4 border-cyan-400 shadow-inner'
                  : 'hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-7 text-center font-mono font-bold text-slate-400 text-sm">
                  #{st.rank}
                </span>

                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-cyan-300 text-sm">
                  {st.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{st.name}</span>
                    {st.isCurrentUser && (
                      <span className="text-[10px] px-2 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{st.title}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end sm:self-center">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Rating</div>
                  <div className="text-xs font-mono text-cyan-400 font-bold">LV. {st.level}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">XP</div>
                  <div className="text-sm font-mono font-black text-white">{st.xp}</div>
                </div>

                <RankBadge rank={st.studentRank} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
