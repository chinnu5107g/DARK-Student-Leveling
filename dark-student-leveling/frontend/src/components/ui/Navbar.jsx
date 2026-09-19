import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Volume2, 
  VolumeX, 
  Bot, 
  Flame, 
  Menu, 
  LayoutDashboard, 
  Compass, 
  Code2, 
  BrainCircuit, 
  BookOpen, 
  CheckSquare, 
  Trophy, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';
import soundEngine from '../../services/soundEngine';
import RankBadge from './RankBadge';

export default function Navbar({ onOpenAI, onToggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, level, rankInfo, streak, currentLevelXp, xpForNextLevel } = usePlayerStore();
  const [soundOn, setSoundOn] = useState(true);

  const isHomePage = location.pathname === '/';

  const handleSoundToggle = () => {
    const newState = soundEngine.toggleSound();
    setSoundOn(newState);
    if (newState) soundEngine.playClick();
  };

  // Nav links shown on all pages AFTER home page
  const mainNavLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/world', label: '3D World', icon: Compass },
    { to: '/coding', label: 'Coding Dungeon', icon: Code2 },
    { to: '/aptitude', label: 'Aptitude Trials', icon: BrainCircuit },
    { to: '/library', label: 'Library', icon: BookOpen },
    { to: '/quests', label: 'Quests', icon: CheckSquare },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  /* -------------------------------------------------------------
   * HOME PAGE NAVBAR: Minimalist, Cinematic Floating Header
   * ------------------------------------------------------------- */
  if (isHomePage) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent px-6 sm:px-12 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-cyan-500 to-indigo-900 p-0.5 shadow-[0_0_20px_rgba(0,229,255,0.6)] group-hover:scale-105 transition-transform flex items-center justify-center">
              <span className="font-black text-white text-lg tracking-tighter">D</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-400">
                  DARK
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono">
                  LEVELING SYSTEM
                </span>
              </div>
              <p className="text-[9px] tracking-widest text-slate-400 uppercase font-semibold">
                AI Student Progression
              </p>
            </div>
          </Link>

          {/* Right Action: Audio + Quick Enter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSoundToggle}
              className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition shadow-sm backdrop-blur-md"
              title={soundOn ? "Sound Effects ON" : "Sound Effects MUTED"}
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} className="text-red-400" />}
            </button>

            <button
              onClick={() => {
                soundEngine.playLevelUp();
                navigate('/dashboard');
              }}
              className="px-5 py-2.5 rounded-xl holo-btn text-xs font-black tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              <span>ENTER ACADEMY</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </nav>
    );
  }

  /* -------------------------------------------------------------
   * AFTER HOME PAGE NAVBAR: Complete Student Command Center HUD
   * ------------------------------------------------------------- */
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-b border-cyan-500/30 px-3 sm:px-6 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Section: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-cyan-400 hover:bg-slate-800/80 rounded-xl transition border border-transparent hover:border-cyan-500/30"
            aria-label="Toggle navigation drawer"
            title="Open Module Directory"
          >
            <Menu size={20} />
          </button>

          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-cyan-400 p-0.5 shadow-[0_0_12px_rgba(0,229,255,0.5)] group-hover:scale-105 transition-transform flex items-center justify-center">
              <span className="font-black text-white text-sm">D</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">
                DARK
              </span>
              <span className="text-[9px] text-cyan-400/80 font-mono block -mt-1 uppercase tracking-wider">
                COMMAND HUD
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section: Desktop Module Quick Links */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/90">
          {mainNavLinks.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => soundEngine.playClick()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-900/80 to-cyan-950/80 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-cyan-400' : 'text-slate-400'} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Right Section: Student Telemetry, Audio, DARK AI & Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Level & Rank Indicator */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-inner">
            <div className="text-right">
              <div className="text-[9px] uppercase font-mono text-slate-400 font-bold leading-none">Level</div>
              <div className="text-xs font-black text-cyan-300 font-mono leading-tight">LV. {level}</div>
            </div>
            <RankBadge rank={rankInfo.rank} size="sm" />
            
            {/* XP Mini Bar (Medium+ screens) */}
            <div className="hidden md:block w-24 pl-1">
              <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-0.5">
                <span>EXP</span>
                <span className="text-cyan-400">{Math.round((currentLevelXp / xpForNextLevel) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full shadow-[0_0_6px_#00E5FF]" 
                  style={{ width: `${Math.min(100, (currentLevelXp / xpForNextLevel) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Streak Flame */}
            <div className="hidden sm:flex items-center gap-1 pl-1.5 border-l border-slate-800 text-xs font-bold text-orange-400" title="Active Study Streak">
              <Flame size={14} className="animate-pulse" />
              <span>{streak}d</span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition"
            title={soundOn ? "Sound Effects ON" : "Sound Effects MUTED"}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} className="text-red-400" />}
          </button>

          {/* Summon DARK AI Assistant Button */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_0_15px_rgba(0,229,255,0.4)] transition hover:scale-105"
            title="Open DARK AI Companion"
          >
            <Bot size={15} />
            <span className="hidden sm:inline font-mono">DARK AI</span>
          </button>

          {/* Player Profile Link */}
          <Link
            to="/profile"
            className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-800"
            title="View Player Profile & Attributes"
          >
            <div className="w-8 h-8 rounded-full border border-cyan-400/80 bg-slate-900 flex items-center justify-center font-black text-cyan-300 text-xs shadow-[0_0_10px_rgba(0,229,255,0.3)]">
              {user.name.charAt(0)}
            </div>
          </Link>

        </div>

      </div>
    </nav>
  );
}
