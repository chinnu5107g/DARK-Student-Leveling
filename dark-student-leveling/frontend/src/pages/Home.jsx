import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AcademyWorld from '../components/3d/AcademyWorld';
import { useCharacterStore, CharacterStates } from '../store/characterStore';
import soundEngine from '../services/soundEngine';
import { 
  Sparkles, 
  Crown, 
  Swords, 
  Infinity as InfinityIcon, 
  ChevronDown,
  Box
} from 'lucide-react';
import heroBg from '../assets/solo-hero.jpg';

export default function Home() {
  const navigate = useNavigate();
  const { currentState, setState } = useCharacterStore();
  const [view3D, setView3D] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBeginAscent = () => {
    soundEngine.playClick();
    soundEngine.playLevelUp();
    setIsTransitioning(true);

    setTimeout(() => {
      navigate('/dashboard');
    }, 900);
  };

  const animationControls = [
    { label: 'Idle', state: CharacterStates.IDLE },
    { label: 'Arise', state: CharacterStates.LEVEL_UP },
    { label: 'Combat', state: CharacterStates.RUN },
    { label: 'Aura', state: CharacterStates.TALK },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030008] select-none text-slate-100">
      
      {/* Background Layer: High-Res Solo Leveling Artwork or Live 3D World */}
      {view3D ? (
        <div className="absolute inset-0 z-0">
          <AcademyWorld 
            cameraMode={isTransitioning ? "awakening" : "cinematic"} 
            showDark={true}
            showCompanion={true}
          />
        </div>
      ) : (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center sm:bg-right bg-no-repeat transition-all duration-700 scale-105 animate-pulse-slow"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {/* Subtle Ambient Vignette & Shadow Mist Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030008] via-transparent to-[#030008]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030008]/95 via-[#030008]/70 to-transparent w-full lg:w-3/5" />
          
          {/* Ambient Purple Sparkles / Lightning Sparks */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-purple-400 blur-[1px] animate-ping" />
          <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 rounded-full bg-violet-300 blur-[1px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-purple-500 blur-[2px] animate-ping" />
        </div>
      )}

      {/* Main Hero Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col justify-between p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28">
        
        {/* Left Content Area (Exact Mockup Layout) */}
        <div className="max-w-xl space-y-6 mt-6 sm:mt-10">
          
          {/* Kicker Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm font-bold tracking-[0.35em] text-purple-400 uppercase font-mono drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
          >
            LEVEL UP. RISE ABOVE.
          </motion.div>

          {/* Epic Metallic SOLO LEVELING Title */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.7)] font-serif uppercase">
              SOLO<br />LEVELING
            </h1>
            
            {/* Sparkle Flares on Title */}
            <div className="absolute top-4 -left-3 text-purple-300 animate-pulse">✦</div>
            <div className="absolute top-1/2 left-44 text-violet-400 animate-ping">✦</div>
            <div className="absolute bottom-2 left-64 text-purple-200 animate-pulse">✦</div>
          </motion.div>

          {/* Subtitle Quotes */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="space-y-1 text-sm sm:text-base text-slate-300 font-light tracking-wide leading-relaxed"
          >
            <p className="text-slate-300">The weak become strong.</p>
            <p className="text-slate-300">The hunters become legends.</p>
            <p className="text-purple-300 font-medium italic drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]">
              I level up... alone.
            </p>
          </motion.div>

          {/* Gothic Action Button: BEGIN YOUR ASCENT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pt-2"
          >
            <button
              onClick={handleBeginAscent}
              className="gothic-btn flex items-center gap-3 group text-xs sm:text-sm"
            >
              <span>BEGIN YOUR ASCENT</span>
              <Sparkles size={16} className="text-purple-300 group-hover:rotate-45 transition-transform" />
            </button>
          </motion.div>

        </div>

        {/* Bottom Bar: Stats Counter & Mode Switcher */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-2"
        >
          
          {/* Metric Badges (Mockup exact counters) */}
          <div className="flex items-center gap-8 sm:gap-12">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 text-purple-400">
                <Crown size={18} className="drop-shadow-[0_0_8px_#a855f7]" />
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">100+</span>
              </div>
              <span className="text-[10px] tracking-[0.18em] uppercase text-purple-300/70 font-semibold">
                DUNGEONS CONQUERED
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 text-purple-400">
                <Swords size={18} className="drop-shadow-[0_0_8px_#a855f7]" />
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">50+</span>
              </div>
              <span className="text-[10px] tracking-[0.18em] uppercase text-purple-300/70 font-semibold">
                SHADOW UNLOCKED
              </span>
            </div>

            {/* Stat 3 */}
            <div className="hidden md:flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 text-purple-400">
                <InfinityIcon size={18} className="drop-shadow-[0_0_8px_#a855f7]" />
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">∞</span>
              </div>
              <span className="text-[10px] tracking-[0.18em] uppercase text-purple-300/70 font-semibold">
                LIMITLESS GROWTH
              </span>
            </div>

          </div>

          {/* 3D Character Mode & Rig Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                setView3D(!view3D);
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-2 transition shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              <Box size={15} className="text-purple-400" />
              <span>{view3D ? "CINEMATIC 2D ART" : "LIVE 3D MONARCH"}</span>
            </button>

            {view3D && (
              <div className="flex items-center gap-1 bg-purple-950/80 p-1 rounded-xl border border-purple-500/30">
                {animationControls.map(ctrl => (
                  <button
                    key={ctrl.label}
                    onClick={() => {
                      soundEngine.playClick();
                      setState(ctrl.state);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded transition ${
                      currentState === ctrl.state
                        ? 'bg-purple-600 text-white shadow-[0_0_12px_#a855f7]'
                        : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    {ctrl.label}
                  </button>
                ))}
              </div>
            )}
          </div>

        </motion.div>

      </div>

      {/* Far Right Scroll Indicator */}
      <div className="hidden lg:flex fixed right-8 bottom-12 z-20 flex-col items-center gap-2 text-purple-400/80 pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] uppercase font-mono [writing-mode:vertical-lr]">
          SCROLL
        </span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>

    </div>
  );
}
