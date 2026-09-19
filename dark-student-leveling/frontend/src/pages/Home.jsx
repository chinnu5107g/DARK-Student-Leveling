import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AcademyWorld from '../components/3d/AcademyWorld';
import { useCharacterStore, CharacterStates } from '../store/characterStore';
import soundEngine from '../services/soundEngine';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Code2, 
  BrainCircuit, 
  BookOpen, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { currentState, setState, triggerReaction } = useCharacterStore();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBeginJourney = () => {
    soundEngine.playClick();
    soundEngine.playLevelUp();
    setState(CharacterStates.WALK);
    setIsTransitioning(true);

    setTimeout(() => {
      navigate('/dashboard');
      setState(CharacterStates.IDLE);
    }, 1200);
  };

  const animationControls = [
    { label: 'Idle', state: CharacterStates.IDLE },
    { label: 'Walk', state: CharacterStates.WALK },
    { label: 'Run', state: CharacterStates.RUN },
    { label: 'Jump', state: CharacterStates.JUMP },
    { label: 'Think', state: CharacterStates.THINK },
    { label: 'Talk', state: CharacterStates.TALK },
    { label: 'Celebrate', state: CharacterStates.CELEBRATE },
    { label: 'Level Up', state: CharacterStates.LEVEL_UP },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070D]">
      {/* Background 3D Scene */}
      <div className="absolute inset-0">
        <AcademyWorld 
          cameraMode={isTransitioning ? "awakening" : "cinematic"} 
          showDark={true}
          showCompanion={true}
        />
      </div>

      {/* Cinematic Vignette Overlay - Left gradient for text contrast, open on right for 3D character */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#05070D] via-transparent to-[#05070D]/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#05070D]/95 via-[#05070D]/60 to-transparent w-full md:w-3/5" />

      {/* Hero Content Overlay (Left Aligned) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none">
        
        {/* Top Branding Pill */}
        <motion.div 
          className="pointer-events-auto flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            DARK AI STUDENT NEXUS
          </div>
        </motion.div>

        {/* Center Main Hero Typography */}
        <motion.div 
          className="max-w-2xl pointer-events-auto space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="space-y-1">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-500 drop-shadow-[0_0_35px_rgba(0,229,255,0.5)]">
              DARK
            </h1>
            <div className="text-sm sm:text-base font-bold tracking-[0.35em] text-cyan-400 uppercase font-mono">
              STUDENT LEVELING SYSTEM
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-widest text-slate-300 uppercase">
            <span>STUDY</span>
            <span className="text-cyan-400">•</span>
            <span>PRACTICE</span>
            <span className="text-cyan-400">•</span>
            <span>LEVEL UP</span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
            Turn your learning journey into an epic adventure. Level up your coding, logic, and problem-solving skills in a futuristic 3D fantasy academy alongside your AI companion DARK.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleBeginJourney}
              className="px-8 py-4 rounded-xl holo-btn text-sm font-black flex items-center gap-3 shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:scale-105 transition"
            >
              <span>BEGIN YOUR JOURNEY</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate('/world')}
              className="px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 text-sm font-bold flex items-center gap-2 transition"
            >
              <Compass size={18} className="text-cyan-400" />
              <span>EXPLORE 3D WORLD</span>
            </button>
          </div>
        </motion.div>

        {/* Bottom Feature Badges & Character Live Animation Rig Tester */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          
          {/* Feature Pillars */}
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2">
              <Code2 size={14} className="text-cyan-400" />
              Coding Dungeon
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2">
              <BrainCircuit size={14} className="text-purple-400" />
              Aptitude Arena
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2">
              <BookOpen size={14} className="text-blue-400" />
              Knowledge Library
            </div>
          </div>

          {/* Interactive 3D Character Pose Control */}
          <div className="holo-panel p-2.5 rounded-xl border border-cyan-500/30">
            <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-1.5 flex items-center justify-between">
              <span>DARK 3D Animation Rig</span>
              <span className="font-mono text-white">{currentState}</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {animationControls.map(ctrl => (
                <button
                  key={ctrl.label}
                  onClick={() => {
                    soundEngine.playClick();
                    setState(ctrl.state);
                  }}
                  className={`px-2 py-1 text-[10px] font-bold rounded transition ${
                    currentState === ctrl.state
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_#00E5FF]'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-cyan-300'
                  }`}
                >
                  {ctrl.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
