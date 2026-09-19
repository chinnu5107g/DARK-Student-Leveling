import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Compass, 
  Home, 
  LayoutDashboard, 
  Code2, 
  BrainCircuit, 
  BookOpen, 
  CheckSquare, 
  CalendarDays, 
  Trophy, 
  Award, 
  Bot, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import soundEngine from '../../services/soundEngine';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { to: '/', label: 'Awakening Home', icon: Home, highlight: false },
    { to: '/dashboard', label: 'Dashboard Hub', icon: LayoutDashboard, highlight: false },
    { to: '/world', label: '3D World Map', icon: Compass, highlight: true },
    { to: '/coding', label: 'Coding Dungeon', icon: Code2, badge: 'Floors', highlight: false },
    { to: '/aptitude', label: 'Aptitude Trials', icon: BrainCircuit, badge: 'Arena', highlight: false },
    { to: '/library', label: 'Knowledge Library', icon: BookOpen, highlight: false },
    { to: '/quests', label: 'Daily Quests', icon: CheckSquare, badge: '+375 XP', highlight: false },
    { to: '/planner', label: 'Study Planner', icon: CalendarDays, highlight: false },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy, highlight: false },
    { to: '/achievements', label: 'Achievements', icon: Award, highlight: false },
    { to: '/dark-ai', label: 'DARK AI Chamber', icon: Bot, highlight: true },
    { to: '/admin', label: 'Admin Portal', icon: ShieldCheck, highlight: false },
  ];

  const handleNavClick = () => {
    soundEngine.playClick();
    if (onClose) onClose();
  };

  return (
    <>
      {/* Backdrop overlay when open on any screen */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950/98 backdrop-blur-2xl border-r border-cyan-500/30 pt-6 pb-6 px-4 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-850">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-cyan-400 flex items-center justify-center font-black text-white text-sm shadow-[0_0_10px_#00E5FF]">
              D
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-wider">DARK ACADEMY</span>
              <span className="text-[9px] text-cyan-400 font-mono block -mt-0.5">Directory & Modules</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition"
            title="Close Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="space-y-1 overflow-y-auto pr-1 py-4 flex-1">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-3 py-1">
            Academy Navigation
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-900/60 to-cyan-900/40 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 hover:border-slate-800 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className="shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer Companion Tag */}
        <div className="pt-4 border-t border-slate-900 px-2">
          <div className="holo-panel p-3 text-center rounded-lg border border-cyan-500/20 bg-slate-900/40">
            <div className="text-[11px] font-bold text-cyan-300 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              DARK AI ONLINE
            </div>
            <p className="text-[10px] text-slate-400 mt-1 italic">
              "Don't just study... Level up."
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
