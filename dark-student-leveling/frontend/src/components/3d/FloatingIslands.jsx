import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import soundEngine from '../../services/soundEngine';
import { useCharacterStore, CharacterStates } from '../../store/characterStore';

export default function FloatingIslands({ onSelectLocation, selectedLocation }) {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const ringRefs = useRef([]);

  const handlePointerOver = (e, loc) => {
    e.stopPropagation();
    setHoveredLocation(loc);
    soundEngine.playHoloSelect();
    useCharacterStore.getState().triggerReaction(CharacterStates.THINK, 2000);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHoveredLocation(null);
  };

  const handleClick = (e, loc) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (onSelectLocation) {
      onSelectLocation(loc);
    }
  };

  useFrame((state, delta) => {
    ringRefs.current.forEach((ring, idx) => {
      if (ring) {
        ring.rotation.z += delta * (0.4 + idx * 0.1);
      }
    });
  });

  return (
    <group>
      {/* 1. CENTRAL MAIN ISLAND - KNOWLEDGE CASTLE PLAZA */}
      <group 
        position={[0, 0, 0]}
        onPointerOver={(e) => handlePointerOver(e, 'castle')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'castle')}
      >
        {/* Inverted Floating Rock Foundation */}
        <mesh position={[0, -2.5, 0]}>
          <coneGeometry args={[7.5, 5, 8]} rotation={[Math.PI, 0, 0]} />
          <meshStandardMaterial color="#0A0F1C" roughness={0.9} metalness={0.2} />
        </mesh>
        {/* Castle Plaza Deck */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[7.5, 7.2, 0.5, 16]} />
          <meshStandardMaterial color="#101A30" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Outer Cyan Energy Rune Plaza Ring */}
        <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.2, 5.5, 32]} />
          <meshBasicMaterial 
            color={hoveredLocation === 'castle' ? '#00E5FF' : '#3862F6'} 
            transparent 
            opacity={0.8} 
          />
        </mesh>

        {/* Dedicated DARK Holographic Stand Pedestal */}
        <mesh position={[0.8, 0.26, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.1, 32]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0.8, 0.26, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.88, 32]} />
          <meshBasicMaterial color="#182A4D" transparent opacity={0.5} />
        </mesh>

        {/* Grand Castle Central Keep (Moved back to frame behind DARK) */}
        <mesh position={[0, 2.5, -3.8]}>
          <boxGeometry args={[5.0, 5.0, 3.5]} />
          <meshStandardMaterial color="#0F172A" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Gothic Spire Main */}
        <mesh position={[0, 6.5, -3.8]}>
          <coneGeometry args={[1.6, 3.8, 8]} />
          <meshStandardMaterial 
            color="#1E3A8A" 
            emissive={hoveredLocation === 'castle' ? '#00E5FF' : '#3862F6'}
            emissiveIntensity={hoveredLocation === 'castle' ? 1.4 : 0.6}
            roughness={0.3} 
          />
        </mesh>
        {/* Left Tower */}
        <mesh position={[-2.8, 3.2, -3.2]}>
          <cylinderGeometry args={[0.9, 1.1, 6.2, 8]} />
          <meshStandardMaterial color="#0B132B" roughness={0.4} />
        </mesh>
        <mesh position={[-2.8, 6.8, -3.2]}>
          <coneGeometry args={[1.1, 2.2, 8]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.8} />
        </mesh>
        {/* Right Tower */}
        <mesh position={[2.8, 3.2, -3.2]}>
          <cylinderGeometry args={[0.9, 1.1, 6.2, 8]} />
          <meshStandardMaterial color="#0B132B" roughness={0.4} />
        </mesh>
        <mesh position={[2.8, 6.8, -3.2]}>
          <coneGeometry args={[1.1, 2.2, 8]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.8} />
        </mesh>

        {/* Floating 3D Title Placard */}
        <Text
          position={[0, 9.2, -3.8]}
          fontSize={0.55}
          color="#00E5FF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#05070D"
        >
          KNOWLEDGE CASTLE
        </Text>
      </group>

      {/* 2. CODING DUNGEON TOWER (North-West) */}
      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.3}>
        <group 
          position={[-18, 4, -12]}
          onPointerOver={(e) => handlePointerOver(e, 'coding')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'coding')}
        >
          {/* Island Rock Base */}
          <mesh position={[0, -2, 0]}>
            <coneGeometry args={[5, 4, 6]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#090D1A" roughness={0.9} />
          </mesh>
          {/* Monolithic Cyber Tower */}
          <mesh position={[0, 4, 0]}>
            <boxGeometry args={[3.2, 8, 3.2]} />
            <meshStandardMaterial color="#0A0F1C" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Vertical Matrix Energy Conduit Stripes */}
          <mesh position={[0, 4, 1.62]}>
            <boxGeometry args={[0.4, 7.8, 0.05]} />
            <meshStandardMaterial 
              color="#00E5FF" 
              emissive="#00E5FF" 
              emissiveIntensity={hoveredLocation === 'coding' ? 2.5 : 1.2} 
            />
          </mesh>
          <mesh position={[-1.62, 4, 0]}>
            <boxGeometry args={[0.05, 7.8, 0.4]} />
            <meshStandardMaterial color="#3862F6" emissive="#3862F6" emissiveIntensity={1.0} />
          </mesh>

          {/* Floating Holographic Compass Ring above Tower */}
          <mesh 
            ref={el => ringRefs.current[0] = el}
            position={[0, 8.5, 0]} 
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[2.2, 0.08, 16, 32]} />
            <meshBasicMaterial color="#00E5FF" wireframe />
          </mesh>

          {/* Title */}
          <Text
            position={[0, 10.2, 0]}
            fontSize={0.6}
            color="#00E5FF"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#05070D"
          >
            CODING DUNGEON
          </Text>
        </group>
      </Float>

      {/* 3. APTITUDE ARENA (South-West) */}
      <Float speed={1.3} rotationIntensity={0.06} floatIntensity={0.25}>
        <group 
          position={[-16, 2, 14]}
          onPointerOver={(e) => handlePointerOver(e, 'aptitude')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'aptitude')}
        >
          {/* Island Rock Base */}
          <mesh position={[0, -2, 0]}>
            <coneGeometry args={[6, 4, 7]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#090D1A" roughness={0.9} />
          </mesh>
          {/* Colosseum Circular Ring */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[5, 5.2, 1.2, 24, 1, true]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Inner Battle Floor */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[4.9, 4.9, 0.2, 24]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          {/* Pulsing Arcane Logic Glyph */}
          <mesh 
            ref={el => ringRefs.current[1] = el}
            position={[0, 0.22, 0]} 
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[2.5, 3.8, 32]} />
            <meshBasicMaterial 
              color={hoveredLocation === 'aptitude' ? '#8B5CF6' : '#3862F6'} 
              transparent 
              opacity={0.85} 
            />
          </mesh>
          {/* Floating Crystal Core */}
          <mesh position={[0, 2.5, 0]}>
            <octahedronGeometry args={[1.2]} />
            <meshStandardMaterial 
              color="#8B5CF6" 
              emissive="#8B5CF6" 
              emissiveIntensity={hoveredLocation === 'aptitude' ? 2.0 : 1.0} 
            />
          </mesh>

          {/* Title */}
          <Text
            position={[0, 5.2, 0]}
            fontSize={0.6}
            color="#8B5CF6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#05070D"
          >
            APTITUDE TRIALS
          </Text>
        </group>
      </Float>

      {/* 4. KNOWLEDGE LIBRARY (North-East) */}
      <Float speed={1.4} rotationIntensity={0.07} floatIntensity={0.28}>
        <group 
          position={[18, 3, -14]}
          onPointerOver={(e) => handlePointerOver(e, 'library')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'library')}
        >
          {/* Rock Foundation */}
          <mesh position={[0, -2, 0]}>
            <coneGeometry args={[5.5, 4, 7]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#090D1A" roughness={0.9} />
          </mesh>
          {/* Geodesic Dome Sanctuary */}
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[3.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial 
              color="#1E3A8A" 
              wireframe 
              emissive={hoveredLocation === 'library' ? '#00E5FF' : '#3862F6'}
              emissiveIntensity={hoveredLocation === 'library' ? 1.8 : 0.8}
            />
          </mesh>
          {/* Inner Data Core */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[2.2, 16, 16]} />
            <meshStandardMaterial color="#0A0F1C" roughness={0.2} metalness={0.9} />
          </mesh>

          {/* Title */}
          <Text
            position={[0, 5.8, 0]}
            fontSize={0.6}
            color="#00E5FF"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#05070D"
          >
            KNOWLEDGE LIBRARY
          </Text>
        </group>
      </Float>

      {/* 5. LEADERBOARD MONUMENT & QUEST HALL (South-East) */}
      <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.22}>
        <group 
          position={[16, 2.5, 12]}
          onPointerOver={(e) => handlePointerOver(e, 'quests')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'quests')}
        >
          {/* Rock Base */}
          <mesh position={[0, -2, 0]}>
            <coneGeometry args={[5, 4, 6]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#090D1A" roughness={0.9} />
          </mesh>
          {/* Floating Obelisk */}
          <mesh position={[0, 3.5, 0]}>
            <cylinderGeometry args={[0.6, 1.6, 6, 4]} />
            <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 6.8, 0]}>
            <coneGeometry args={[0.6, 1.2, 4]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={hoveredLocation === 'quests' ? 2.0 : 0.9} 
            />
          </mesh>

          {/* Title */}
          <Text
            position={[0, 8.2, 0]}
            fontSize={0.6}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#05070D"
          >
            DAILY QUESTS & RANKS
          </Text>
        </group>
      </Float>
    </group>
  );
}
