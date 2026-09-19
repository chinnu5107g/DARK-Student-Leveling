import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerStats from '../components/ui/PlayerStats';
import RankBadge from '../components/ui/RankBadge';
import { usePlayerStore } from '../store/playerStore';
import { useCharacterStore, CharacterStates } from '../store/characterStore';
import soundEngine from '../services/soundEngine';
import { 
  Code2, 
  BrainCircuit, 
  BookOpen, 
  CheckSquare, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Bot, 
  Award,
  Zap
} from 'lucide-react';

import DarkCompanionStage from '../components/3d/DarkCompanionStage';

export default function Dashboard() {
  const navigate = useNavigate();
  const { quests, completeQuest, rankInfo, totalXp, addXP } = usePlayerStore();
  const { currentState, setState } = useCharacterStore();

  const ranks = [
    { rank: 'E', min: '0-500' },
    { rank: 'D', min: '501-1.5K' },
    { rank: 'C', min: '1.5K-3K' },
    { rank: 'B', min: '3K-6K' },
    { rank: 'A', min: '6K-10K' },
    { rank: 'S', min: '10K+' },
  ];

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-slate-950 p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,229,255,0.15)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              SYSTEM ACTIVE • ACADEMY SECTOR 7
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              WELCOME BACK, <span className="text-cyan-400">PLAYER</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              DARK is standing by. Complete your daily contracts, conquer dungeon floors, and advance towards S-Rank.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playLevelUp();
                addXP(100, "Daily Meditation & Check-in");
              }}
              className="px-4 py-2.5 rounded-xl holo-btn text-xs font-bold flex items-center gap-2"
            >
              <Zap size={15} />
              <span>CLAIM DAILY ENERGY (+100 XP)</span>
            </button>
          </div>
        </div>

        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: 3D Companion Stage + Player Status HUD (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <DarkCompanionStage className="h-72" />
          <PlayerStats />

          {/* Quick Rank Tier Track */}
          <div className="holo-panel p-5 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-300 uppercase">
              <span>Dimensional Rank Progression</span>
              <span className="text-cyan-400 font-mono">Current: {rankInfo.rank}</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {ranks.map(r => {
                const isCurrent = rankInfo.rank === r.rank;
                return (
                  <div 
                    key={r.rank} 
                    className={`flex flex-col items-center p-2 rounded-lg border text-center transition ${
                      isCurrent 
                        ? 'bg-blue-900/60 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.4)]' 
                        : 'bg-slate-900/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <RankBadge rank={r.rank} size="sm" />
                    <span className="text-[10px] font-mono mt-1.5">{r.min}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Quests & Active Dungeon Floors (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Daily Quests Panel */}
          <div className="holo-panel p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <CheckSquare size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Daily Contracts</h2>
                  <p className="text-[11px] text-slate-400">Total Completion Reward: <span className="text-cyan-400 font-bold">+375 XP</span></p>
                </div>
              </div>
              <button
                onClick={() => navigate('/quests')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="space-y-3">
              {quests.map(quest => (
                <div
                  key={quest.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition ${
                    quest.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 opacity-80'
                      : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={quest.completed}
                      onChange={() => completeQuest(quest.id)}
                      className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <div className={`text-xs font-semibold ${quest.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {quest.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Progress: {quest.progress}/{quest.total} • Category: {quest.category}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono text-cyan-400">
                      +{quest.xp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Challenge Portals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Coding Dungeon Quick Card */}
            <div className="holo-panel-cyan p-5 border border-cyan-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-cyan-500/30 uppercase font-bold">
                    FLOOR 01 • PYTHON BASICS
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300">+100 XP</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Find the Largest Number</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Defeat Floor 1 by writing a function to find the maximum element in a list of integers.
                </p>
              </div>

              <button
                onClick={() => {
                  soundEngine.playHoloSelect();
                  navigate('/coding');
                }}
                className="mt-4 w-full py-2.5 rounded-lg holo-btn text-xs font-bold flex items-center justify-center gap-2"
              >
                <Code2 size={15} />
                <span>START CHALLENGE</span>
              </button>
            </div>

            {/* Aptitude Arena Quick Card */}
            <div className="holo-panel p-5 border border-purple-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 uppercase font-bold">
                    TIME TRIAL • QUANT & LOGIC
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-300">+25 XP / Q</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Aptitude Speed Duel</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter the Arena to solve quantitative reasoning, speed math, and verbal aptitude under time pressure.
                </p>
              </div>

              <button
                onClick={() => {
                  soundEngine.playHoloSelect();
                  navigate('/aptitude');
                }}
                className="mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition"
              >
                <BrainCircuit size={15} />
                <span>ENTER ARENA</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
