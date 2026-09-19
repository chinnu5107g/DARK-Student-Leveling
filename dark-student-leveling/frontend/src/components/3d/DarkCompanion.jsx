import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterStore, CharacterStates } from '../../store/characterStore';

export default function DarkCompanion({ scale = 0.55, offset = [1.2, 1.6, 0.4] }) {
  const robotRef = useRef();
  const visorRef = useRef();
  const thrusterFlameRef = useRef();
  const leftEarRef = useRef();
  const rightEarRef = useRef();
  const eyesMeshRef = useRef();

  const currentState = useCharacterStore(state => state.currentState);
  const isSpeaking = useCharacterStore(state => state.isSpeaking);

  // Robot Materials
  const materials = useMemo(() => {
    return {
      chassis: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0A0F1C'),
        roughness: 0.2,
        metalness: 0.9,
      }),
      accents: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1E293B'),
        roughness: 0.3,
        metalness: 0.8,
      }),
      visor: new THREE.MeshBasicMaterial({
        color: new THREE.Color('#030712'),
      }),
      eyesGlow: new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00E5FF'),
      }),
      thrusterGlow: new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00E5FF'),
        transparent: true,
        opacity: 0.85,
      }),
      earTrim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00E5FF'),
        emissive: new THREE.Color('#00E5FF'),
        emissiveIntensity: 1.5,
      })
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!robotRef.current) return;

    // Levitation floating bob
    const bobY = Math.sin(t * 2.5) * 0.08;
    const swayX = Math.cos(t * 1.5) * 0.04;
    const tiltZ = Math.sin(t * 1.8) * 0.05;

    robotRef.current.position.set(
      offset[0] + swayX,
      offset[1] + bobY,
      offset[2]
    );

    robotRef.current.rotation.z = tiltZ;
    robotRef.current.rotation.y = Math.sin(t * 0.8) * 0.15;

    // Thruster flame flicker
    if (thrusterFlameRef.current) {
      const flicker = 0.8 + Math.random() * 0.4;
      thrusterFlameRef.current.scale.set(flicker, flicker * 1.5, flicker);
    }

    // Ear fin micro-wiggles
    if (leftEarRef.current && rightEarRef.current) {
      leftEarRef.current.rotation.z = 0.35 + Math.sin(t * 4) * 0.05;
      rightEarRef.current.rotation.z = -0.35 - Math.sin(t * 4) * 0.05;
    }

    // Visor eyes animation
    if (eyesMeshRef.current) {
      if (currentState === CharacterStates.THINK) {
        // Pulsing thinking rotation
        eyesMeshRef.current.rotation.z = t * 4;
        eyesMeshRef.current.scale.set(0.8, 0.8, 1);
      } else if (currentState === CharacterStates.HAPPY || currentState === CharacterStates.CELEBRATE) {
        // Happy arch eyes
        eyesMeshRef.current.rotation.z = 0;
        eyesMeshRef.current.scale.set(1.2, 0.5, 1);
      } else if (isSpeaking || currentState === CharacterStates.TALK) {
        // Talking soundwave rhythm
        const bounce = Math.abs(Math.sin(t * 12)) * 0.8 + 0.6;
        eyesMeshRef.current.scale.set(1, bounce, 1);
        eyesMeshRef.current.rotation.z = 0;
      } else {
        // Normal blinking
        const blink = Math.sin(t * 1.1);
        const isBlinking = blink > 0.95;
        eyesMeshRef.current.scale.set(1, isBlinking ? 0.1 : 1, 1);
        eyesMeshRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <group ref={robotRef} scale={scale}>
      {/* Main Spherical Chassis */}
      <mesh material={materials.chassis}>
        <sphereGeometry args={[0.32, 28, 28]} />
      </mesh>

      {/* Outer Armor Rings */}
      <mesh material={materials.accents} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.33, 0.02, 16, 32]} />
      </mesh>

      {/* Cyber Ear Fin: Left */}
      <group ref={leftEarRef} position={[-0.26, 0.22, 0]} rotation={[0, 0, 0.35]}>
        <mesh material={materials.chassis}>
          <coneGeometry args={[0.07, 0.22, 6]} />
        </mesh>
        <mesh material={materials.earTrim} position={[0, 0.05, 0]}>
          <coneGeometry args={[0.04, 0.12, 6]} />
        </mesh>
      </group>

      {/* Cyber Ear Fin: Right */}
      <group ref={rightEarRef} position={[0.26, 0.22, 0]} rotation={[0, 0, -0.35]}>
        <mesh material={materials.chassis}>
          <coneGeometry args={[0.07, 0.22, 6]} />
        </mesh>
        <mesh material={materials.earTrim} position={[0, 0.05, 0]}>
          <coneGeometry args={[0.04, 0.12, 6]} />
        </mesh>
      </group>

      {/* Curved Visor Screen Face */}
      <mesh ref={visorRef} material={materials.visor} position={[0, 0.02, 0.22]}>
        <sphereGeometry args={[0.22, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
      </mesh>

      {/* Expressive Glowing Visor Eyes */}
      <group ref={eyesMeshRef} position={[0, 0.06, 0.35]}>
        {/* Left Eye */}
        <mesh material={materials.eyesGlow} position={[-0.08, 0, 0]}>
          <boxGeometry args={[0.055, 0.035, 0.01]} />
        </mesh>
        {/* Right Eye */}
        <mesh material={materials.eyesGlow} position={[0.08, 0, 0]}>
          <boxGeometry args={[0.055, 0.035, 0.01]} />
        </mesh>
      </group>

      {/* Bottom Thruster Nozzle */}
      <mesh material={materials.accents} position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.06, 0.08, 16]} />
      </mesh>

      {/* Animated Glowing Thruster Plasma Flame */}
      <mesh ref={thrusterFlameRef} material={materials.thrusterGlow} position={[0, -0.4, 0]}>
        <coneGeometry args={[0.07, 0.18, 12]} rotation={[Math.PI, 0, 0]} />
      </mesh>
    </group>
  );
}
