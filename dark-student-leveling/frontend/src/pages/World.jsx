import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AcademyWorld from '../components/3d/AcademyWorld';
import { useCharacterStore, CharacterStates } from '../store/characterStore';
import soundEngine from '../services/soundEngine';
import { 
  Compass, 
  Eye, 
  Orbit, 
  Video, 
  Code2, 
  BrainCircuit, 
  BookOpen, 
  Trophy, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function World() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('castle');
  const [cameraMode, setCameraMode] = useState('orbit');
  const { setState } = useCharacterStore();

  const locationData = {
    castle: {
      name: 'Knowledge Castle & Academy Central',
      description: 'The supreme citadel of the Dark Academy where student ranks, system ascension, and main trials converge.',
      route: '/dashboard',
      icon: Trophy,
      color: 'text-cyan-400',
      tag: 'LEVEL PROGRESSION',
      bgGlow: 'border-cyan-500/50 shadow-cyan-500/30'
    },
    coding: {
      name: 'Coding Dungeon',
      description: 'Multi-tiered cyber dungeon towers. Defeat algorithmic challenges in Python, JavaScript, C++, Java, and SQL to earn massive XP.',
      route: '/coding',
      icon: Code2,
      color: 'text-cyan-400',
      tag: 'FLOOR CHALLENGES',
      bgGlow: 'border-cyan-500/50 shadow-cyan-500/30'
    },
    aptitude: {
      name: 'Aptitude Arena',
      description: 'Colosseum of speed and intellect. Battle timed challenges across Quantitative Aptitude, Logical Reasoning, and Data Interpretation.',
      route: '/aptitude',
      icon: BrainCircuit,
      color: 'text-purple-400',
      tag: 'TIME ATTACK ARENA',
      bgGlow: 'border-purple-500/50 shadow-purple-500/30'
    },
    library: {
      name: 'Knowledge Library Dome',
      description: 'Geodesic archive of high-yield computer science notes, cheat-sheets, OS, DBMS, Computer Networks, and interactive subject quizzes.',
      route: '/library',
      icon: BookOpen,
      color: 'text-blue-400',
      tag: 'STUDY SANCTUARY',
      bgGlow: 'border-blue-500/50 shadow-blue-500/30'
    },
    quests: {
      name: 'Daily Quest Hall & Monolith',
      description: 'Ascension obelisk tracking daily learning contracts, continuous study streaks, and global player leaderboards.',
      route: '/quests',
      icon: Trophy,
      color: 'text-yellow-400',
      tag: 'CONTRACT REWARDS',
      bgGlow: 'border-yellow-500/50 shadow-yellow-500/30'
    }
  };

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setCameraMode('location');
    soundEngine.playHoloSelect();
    setState(CharacterStates.THINK);
  };

  const currentLoc = locationData[selectedLocation] || locationData.castle;
  const CurrentIcon = currentLoc.icon;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070D] pt-14">
      {/* Interactive 3D World Canvas */}
      <div className="absolute inset-0">
        <AcademyWorld
          cameraMode={cameraMode}
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
          showDark={true}
          showCompanion={true}
        />
      </div>

      {/* Camera Mode Selector Toolbar (Top Left) */}
      <div className="absolute top-18 left-6 z-20 flex items-center gap-2 holo-panel p-1.5 rounded-xl border border-cyan-500/30">
        <button
          onClick={() => {
            soundEngine.playClick();
            setCameraMode('orbit');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            cameraMode === 'orbit' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Orbit size={14} />
          <span>Free Orbit</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setCameraMode('character');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            cameraMode === 'character' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye size={14} />
          <span>Follow DARK</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setCameraMode('cinematic');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            cameraMode === 'cinematic' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Video size={14} />
          <span>Cinematic</span>
        </button>
      </div>

      {/* Location Fast Jump Dial (Top Right) */}
      <div className="absolute top-18 right-6 z-20 flex items-center gap-1.5 holo-panel p-1.5 rounded-xl border border-cyan-500/30">
        {Object.entries(locationData).map(([key, item]) => (
          <button
            key={key}
            onClick={() => handleSelectLocation(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize ${
              selectedLocation === key
                ? 'bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Selected Location Holographic Card (Bottom Center) */}
      <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-12 sm:max-w-md z-20">
        <div className={`holo-panel-cyan p-5 border-2 ${currentLoc.bgGlow} transition-all duration-300`}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                <CurrentIcon size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {currentLoc.tag}
                </span>
                <h2 className="text-base font-black text-white">{currentLoc.name}</h2>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {currentLoc.description}
          </p>

          <button
            onClick={() => {
              soundEngine.playLevelUp();
              navigate(currentLoc.route);
            }}
            className="w-full py-2.5 rounded-xl holo-btn text-xs font-black tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <span>ENTER {selectedLocation.toUpperCase()}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
