import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DarkCharacter from './DarkCharacter';
import DarkCompanion from './DarkCompanion';
import { useCharacterStore, CharacterStates } from '../../store/characterStore';
import soundEngine from '../../services/soundEngine';
import { Bot, Sparkles, Volume2 } from 'lucide-react';

export default function DarkCompanionStage({ className = "h-80" }) {
  const { currentState, setState, setSpeaking, isSpeaking } = useCharacterStore();

  const animationButtons = [
    { label: 'Idle', state: CharacterStates.IDLE },
    { label: 'Walk', state: CharacterStates.WALK },
    { label: 'Run', state: CharacterStates.RUN },
    { label: 'Jump', state: CharacterStates.JUMP },
    { label: 'Talk', state: CharacterStates.TALK },
    { label: 'Think', state: CharacterStates.THINK },
    { label: 'Celebrate', state: CharacterStates.CELEBRATE },
    { label: 'Motivate', state: CharacterStates.MOTIVATE },
    { label: 'Level Up', state: CharacterStates.LEVEL_UP },
  ];

  const handleVoiceQuote = () => {
    soundEngine.playClick();
    const quotes = [
      "Don't just study... Level up.",
      "Welcome back, Player. Your next challenge is ready.",
      "You're getting stronger with every line of code.",
      "Failure isn't the end. It's just uncollected XP.",
      "Let's conquer this dungeon together."
    ];
    const text = quotes[Math.floor(Math.random() * quotes.length)];
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 0.85;
      utterance.onstart = () => setSpeaking(true, text);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeaking(true, text);
      setTimeout(() => setSpeaking(false), 3000);
    }
  };

  return (
    <div className="holo-panel rounded-2xl overflow-hidden border border-cyan-500/30 flex flex-col">
      {/* Header */}
      <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_10px_#00E5FF]">
            <Bot size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-white tracking-wider">DARK • 3D COMPANION</h3>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 font-mono font-bold border border-cyan-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-mono">Interactive 3D Animated AI Rig</p>
          </div>
        </div>

        <button
          onClick={handleVoiceQuote}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold hover:bg-cyan-900/60 transition"
          title="Play Voice Line"
        >
          <Volume2 size={13} />
          <span>SPEAK</span>
        </button>
      </div>

      {/* 3D Canvas Viewport */}
      <div className={`relative ${className} w-full bg-[#05070D]`}>
        <Canvas
          camera={{ position: [0, 1.4, 3.2], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl }) => {
            gl.setClearColor('#05070D');
          }}
        >
          <Suspense fallback={null}>
            {/* Ambient Lighting */}
            <ambientLight intensity={0.8} color="#1E293B" />

            {/* Key Lighting from top-front */}
            <directionalLight
              position={[2, 4, 3]}
              intensity={2.2}
              color="#FFFFFF"
            />

            {/* Back Cyan Rim Light */}
            <pointLight
              position={[-1, 2, -2]}
              intensity={4.0}
              distance={8}
              color="#00E5FF"
            />

            {/* Holographic Glowing Base Ring */}
            <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.0, 1.25, 32]} />
              <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} />
            </mesh>
            <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.98, 32]} />
              <meshBasicMaterial color="#0A1128" />
            </mesh>

            {/* 3D DARK Character */}
            <DarkCharacter
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
            />

            {/* 3D Mini Drone Companion */}
            <DarkCompanion
              offset={[0.85, 1.6, 0.2]}
              scale={0.48}
            />

            {/* Interactive OrbitControls */}
            <OrbitControls
              enablePan={false}
              minDistance={1.8}
              maxDistance={5.5}
              maxPolarAngle={Math.PI / 2 + 0.1}
              target={[0, 1.1, 0]}
            />
          </Suspense>
        </Canvas>

        {/* Live Animation Overlay Tag */}
        <div className="absolute top-2 left-2 pointer-events-none">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-cyan-400">
            STATE: {currentState}
          </span>
        </div>
      </div>

      {/* Animation Action Palette */}
      <div className="p-2.5 bg-slate-950/90 border-t border-slate-850">
        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex justify-between">
          <span>Animation Controls</span>
          <span className="text-cyan-400/80 font-mono">Drag 3D to Rotate</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1">
          {animationButtons.map(btn => (
            <button
              key={btn.label}
              onClick={() => {
                soundEngine.playClick();
                setState(btn.state);
              }}
              className={`px-2 py-1 text-[10px] font-bold rounded-lg transition ${
                currentState === btn.state
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_#00E5FF]'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
