import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import DarkCharacter from './DarkCharacter';
import DarkCompanion from './DarkCompanion';
import FloatingIslands from './FloatingIslands';
import SkyVortex from './SkyVortex';
import SceneCamera from './SceneCamera';

export default function AcademyWorld({
  cameraMode = 'character',
  selectedLocation = null,
  onSelectLocation = null,
  showDark = true,
  showCompanion = true,
  className = "w-full h-full"
}) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 2.0, 5.2], fov: 46 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#05070D');
        }}
      >
        <Suspense fallback={null}>
          {/* Ambient Lighting for base visibility */}
          <ambientLight intensity={0.75} color="#1E293B" />

          {/* Key Directional Sun/Moonlight */}
          <directionalLight
            position={[8, 15, 10]}
            intensity={1.8}
            color="#E0F2FE"
          />

          {/* Secondary Violet Fill */}
          <directionalLight
            position={[-10, 10, -5]}
            intensity={0.8}
            color="#8B5CF6"
          />

          {/* DEDICATED SPOTLIGHT ON DARK CHARACTER */}
          <pointLight
            position={[0.8, 3.2, 3.8]}
            intensity={4.5}
            distance={10}
            color="#FFFFFF"
          />

          {/* CYAN RIM LIGHT BEHIND DARK */}
          <pointLight
            position={[0.3, 2.0, 0.8]}
            intensity={5.0}
            distance={8}
            color="#00E5FF"
          />

          {/* Holographic Ground Pedestal Glow */}
          <pointLight
            position={[0.8, 0.4, 1.8]}
            intensity={3.0}
            distance={5}
            color="#00E5FF"
          />

          {/* Sky Vortex & Celestial Stars */}
          <SkyVortex />

          {/* Interactive Floating Islands Campus */}
          <FloatingIslands 
            selectedLocation={selectedLocation} 
            onSelectLocation={onSelectLocation} 
          />

          {/* 3D DARK Character (Front & Center on the Plaza) */}
          {showDark && (
            <DarkCharacter 
              position={[0.8, 0.26, 1.8]} 
              rotation={[0, -0.25, 0]} 
              scale={1.15} 
            />
          )}

          {/* 3D Floating Mini AI Robot Companion */}
          {showCompanion && (
            <DarkCompanion 
              offset={[1.7, 1.8, 1.8]} 
              scale={0.52} 
            />
          )}

          {/* Camera Controller */}
          <SceneCamera 
            mode={cameraMode} 
            targetLocation={selectedLocation} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
