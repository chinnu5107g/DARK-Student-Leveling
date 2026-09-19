import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterStore, CharacterStates } from '../../store/characterStore';

export default function DarkCharacter({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  const hipsRef = useRef();
  const chestRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftForearmRef = useRef();
  const rightForearmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftShinRef = useRef();
  const rightShinRef = useRef();
  const auraParticlesRef = useRef();
  const mouthRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const auraRingsRef = useRef();

  const currentState = useCharacterStore(state => state.currentState);
  const isSpeaking = useCharacterStore(state => state.isSpeaking);

  // Materials with Dark Cyber Aesthetic
  const materials = useMemo(() => {
    return {
      jacket: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0A0F1C'),
        roughness: 0.35,
        metalness: 0.6,
      }),
      jacketArmor: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#101A30'),
        roughness: 0.2,
        metalness: 0.8,
      }),
      energyTrim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00E5FF'),
        emissive: new THREE.Color('#00E5FF'),
        emissiveIntensity: 1.5,
        roughness: 0.1,
      }),
      skin: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F3D2BE'),
        roughness: 0.5,
        metalness: 0.05,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#080B14'),
        roughness: 0.7,
        metalness: 0.2,
      }),
      hairHighlight: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1E3A8A'),
        emissive: new THREE.Color('#00E5FF'),
        emissiveIntensity: 0.8,
        roughness: 0.3,
      }),
      eyesNormal: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00E5FF'),
        emissive: new THREE.Color('#00E5FF'),
        emissiveIntensity: 1.2,
      }),
      pants: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#080C16'),
        roughness: 0.6,
        metalness: 0.4,
      }),
      boots: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0F172A'),
        roughness: 0.25,
        metalness: 0.7,
      }),
      mouth: new THREE.MeshBasicMaterial({
        color: new THREE.Color('#78350F'),
      }),
    };
  }, []);

  // Aura Particles Buffer
  const particleCount = 60;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 1] = Math.random() * 2.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  // Animation Loop based on currentState
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Default neutral resets
    let breath = Math.sin(t * 2.2) * 0.03;
    let headBob = Math.sin(t * 2.2) * 0.02;

    if (chestRef.current) chestRef.current.position.y = 1.1 + breath;
    if (headRef.current) headRef.current.position.y = 1.7 + breath * 1.2;

    // Speaking jaw/mouth sync
    if (mouthRef.current) {
      if (currentState === CharacterStates.TALK || isSpeaking) {
        const talkMouth = Math.abs(Math.sin(t * 14)) * 0.04 + 0.01;
        mouthRef.current.scale.set(1, talkMouth * 15, 1);
        if (headRef.current) {
          headRef.current.rotation.x = Math.sin(t * 5) * 0.05;
          headRef.current.rotation.y = Math.sin(t * 3) * 0.08;
        }
      } else {
        mouthRef.current.scale.set(1, 0.2, 1);
      }
    }

    // Blinking logic
    const blink = Math.sin(t * 0.7);
    const isBlinking = blink > 0.96;
    if (eyeLeftRef.current && eyeRightRef.current) {
      eyeLeftRef.current.scale.y = isBlinking ? 0.1 : 1;
      eyeRightRef.current.scale.y = isBlinking ? 0.1 : 1;
    }

    // STATE-BASED ANIMATION CONTROLLER
    switch (currentState) {
      case CharacterStates.WALK: {
        const speed = 6;
        const walkCycle = Math.sin(t * speed);
        const cosCycle = Math.cos(t * speed);

        if (hipsRef.current) hipsRef.current.position.y = 0.95 + Math.abs(walkCycle) * 0.06;
        if (leftLegRef.current) leftLegRef.current.rotation.x = walkCycle * 0.6;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -walkCycle * 0.6;
        if (leftShinRef.current) leftShinRef.current.rotation.x = Math.max(0, -walkCycle * 0.6);
        if (rightShinRef.current) rightShinRef.current.rotation.x = Math.max(0, walkCycle * 0.6);

        if (leftArmRef.current) leftArmRef.current.rotation.x = -walkCycle * 0.5;
        if (rightArmRef.current) rightArmRef.current.rotation.x = walkCycle * 0.5;
        break;
      }

      case CharacterStates.RUN: {
        const speed = 10;
        const runCycle = Math.sin(t * speed);

        if (hipsRef.current) {
          hipsRef.current.position.y = 0.9 + Math.abs(runCycle) * 0.1;
          hipsRef.current.rotation.x = 0.25; // forward tilt
        }
        if (leftLegRef.current) leftLegRef.current.rotation.x = runCycle * 0.9;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -runCycle * 0.9;
        if (leftShinRef.current) leftShinRef.current.rotation.x = Math.max(0, -runCycle * 0.8);
        if (rightShinRef.current) rightShinRef.current.rotation.x = Math.max(0, runCycle * 0.8);

        if (leftArmRef.current) leftArmRef.current.rotation.x = -runCycle * 0.8;
        if (rightArmRef.current) rightArmRef.current.rotation.x = runCycle * 0.8;
        break;
      }

      case CharacterStates.JUMP: {
        const jumpTime = (t * 2) % 2;
        let yOffset = 0;
        if (jumpTime < 0.3) {
          // Crouch
          yOffset = -0.15;
          if (leftLegRef.current) leftLegRef.current.rotation.x = 0.4;
          if (rightLegRef.current) rightLegRef.current.rotation.x = 0.4;
        } else if (jumpTime < 1.4) {
          // Airborne
          const airbornePhase = (jumpTime - 0.3) / 1.1;
          yOffset = Math.sin(airbornePhase * Math.PI) * 0.8;
          if (leftArmRef.current) leftArmRef.current.rotation.x = -1.2;
          if (rightArmRef.current) rightArmRef.current.rotation.x = -1.2;
          if (leftLegRef.current) leftLegRef.current.rotation.x = -0.3;
          if (rightLegRef.current) rightLegRef.current.rotation.x = -0.3;
        } else {
          // Land
          yOffset = 0;
          if (leftLegRef.current) leftLegRef.current.rotation.x = 0.2;
          if (rightLegRef.current) rightLegRef.current.rotation.x = 0.2;
        }
        if (groupRef.current) groupRef.current.position.y = position[1] + yOffset;
        break;
      }

      case CharacterStates.THINK: {
        // Hand to chin, head tilted up
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -1.6;
          rightArmRef.current.rotation.z = -0.4;
        }
        if (rightForearmRef.current) {
          rightForearmRef.current.rotation.x = -1.2;
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -0.2;
          leftArmRef.current.rotation.z = 0.2;
        }
        if (headRef.current) {
          headRef.current.rotation.x = -0.25;
          headRef.current.rotation.y = 0.2;
        }
        break;
      }

      case CharacterStates.HAPPY:
      case CharacterStates.CELEBRATE: {
        // Fist pump, confident smile
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -2.2 + Math.sin(t * 8) * 0.2;
          rightArmRef.current.rotation.z = -0.2;
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -0.5;
          leftArmRef.current.rotation.z = 0.4;
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(t * 4) * 0.15;
          headRef.current.rotation.x = -0.1;
        }
        break;
      }

      case CharacterStates.MOTIVATE: {
        // Determined stance, hands clenched forward
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -0.8;
          rightArmRef.current.rotation.z = -0.3;
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -0.8;
          leftArmRef.current.rotation.z = 0.3;
        }
        if (headRef.current) {
          headRef.current.rotation.x = 0.1;
        }
        break;
      }

      case CharacterStates.LEVEL_UP: {
        // Dramatic ascension, arm raised to sky, rotating aura
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -2.8;
          rightArmRef.current.rotation.z = 0.1;
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -0.5;
          leftArmRef.current.rotation.z = 0.6;
        }
        if (headRef.current) {
          headRef.current.rotation.x = -0.4; // Look up at energy
        }
        if (auraRingsRef.current) {
          auraRingsRef.current.rotation.y += delta * 4;
          auraRingsRef.current.scale.setScalar(1 + Math.sin(t * 6) * 0.3);
        }
        break;
      }

      case CharacterStates.IDLE:
      default: {
        // Restful natural posture
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(t * 1.8) * 0.04;
          leftArmRef.current.rotation.z = 0.12 + Math.cos(t * 1.5) * 0.02;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -Math.sin(t * 1.8) * 0.04;
          rightArmRef.current.rotation.z = -0.12 - Math.cos(t * 1.5) * 0.02;
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(t * 0.8) * 0.06;
          headRef.current.rotation.x = Math.cos(t * 1.2) * 0.03;
        }
        if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
        if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
        break;
      }
    }

    // Animate Aura particles ascending
    if (auraParticlesRef.current) {
      const positions = auraParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * 0.6;
        if (positions[i * 3 + 1] > 2.4) {
          positions[i * 3 + 1] = 0.1;
          positions[i * 3] = (Math.random() - 0.5) * 1.2;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
        }
      }
      auraParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Root Hips */}
      <group ref={hipsRef} position={[0, 0.95, 0]}>
        {/* Lower Pelvis */}
        <mesh material={materials.pants} position={[0, 0, 0]}>
          <boxGeometry args={[0.34, 0.2, 0.22]} />
        </mesh>

        {/* Tactical Belt with Cyan Core */}
        <mesh material={materials.jacketArmor} position={[0, 0.08, 0]}>
          <boxGeometry args={[0.36, 0.06, 0.24]} />
        </mesh>
        <mesh material={materials.energyTrim} position={[0, 0.08, 0.125]}>
          <boxGeometry args={[0.08, 0.04, 0.02]} />
        </mesh>

        {/* Legs: Left */}
        <group ref={leftLegRef} position={[-0.12, -0.1, 0]}>
          <mesh material={materials.pants} position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.075, 0.32, 8, 12]} />
          </mesh>
          {/* Shin */}
          <group ref={leftShinRef} position={[0, -0.4, 0]}>
            <mesh material={materials.pants} position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.065, 0.3, 8, 12]} />
            </mesh>
            {/* Sneaker */}
            <mesh material={materials.boots} position={[0, -0.4, 0.06]}>
              <boxGeometry args={[0.12, 0.12, 0.24]} />
            </mesh>
            {/* Sneaker Cyan Soles */}
            <mesh material={materials.energyTrim} position={[0, -0.45, 0.06]}>
              <boxGeometry args={[0.13, 0.03, 0.25]} />
            </mesh>
          </group>
        </group>

        {/* Legs: Right */}
        <group ref={rightLegRef} position={[0.12, -0.1, 0]}>
          <mesh material={materials.pants} position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.075, 0.32, 8, 12]} />
          </mesh>
          {/* Shin */}
          <group ref={rightShinRef} position={[0, -0.4, 0]}>
            <mesh material={materials.pants} position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.065, 0.3, 8, 12]} />
            </mesh>
            {/* Sneaker */}
            <mesh material={materials.boots} position={[0, -0.4, 0.06]}>
              <boxGeometry args={[0.12, 0.12, 0.24]} />
            </mesh>
            {/* Sneaker Cyan Soles */}
            <mesh material={materials.energyTrim} position={[0, -0.45, 0.06]}>
              <boxGeometry args={[0.13, 0.03, 0.25]} />
            </mesh>
          </group>
        </group>

        {/* Chest / Torso */}
        <group ref={chestRef} position={[0, 0.25, 0]}>
          {/* Futuristic High-Collar Jacket */}
          <mesh material={materials.jacket} position={[0, 0.14, 0]}>
            <boxGeometry args={[0.38, 0.42, 0.24]} />
          </mesh>
          {/* Cyan Energy Stripes on Torso */}
          <mesh material={materials.energyTrim} position={[-0.1, 0.14, 0.125]}>
            <boxGeometry args={[0.025, 0.36, 0.01]} />
          </mesh>
          <mesh material={materials.energyTrim} position={[0.1, 0.14, 0.125]}>
            <boxGeometry args={[0.025, 0.36, 0.01]} />
          </mesh>
          {/* High Collar */}
          <mesh material={materials.jacketArmor} position={[0, 0.36, 0.02]}>
            <cylinderGeometry args={[0.14, 0.15, 0.12, 16, 1, true]} />
          </mesh>

          {/* Left Arm */}
          <group ref={leftArmRef} position={[-0.26, 0.28, 0]}>
            {/* Armored Shoulder Pauldron */}
            <mesh material={materials.jacketArmor} position={[-0.03, 0.02, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
            </mesh>
            {/* Upper Arm */}
            <mesh material={materials.jacket} position={[0, -0.16, 0]}>
              <capsuleGeometry args={[0.06, 0.22, 8, 12]} />
            </mesh>
            {/* Forearm & Wrist Gauntlet */}
            <group ref={leftForearmRef} position={[0, -0.3, 0]}>
              <mesh material={materials.jacket} position={[0, -0.14, 0]}>
                <capsuleGeometry args={[0.055, 0.2, 8, 12]} />
              </mesh>
              {/* Holographic Wrist Communicator Device */}
              <mesh material={materials.energyTrim} position={[-0.03, -0.14, 0.04]}>
                <boxGeometry args={[0.04, 0.08, 0.03]} />
              </mesh>
              {/* Hand */}
              <mesh material={materials.skin} position={[0, -0.27, 0]}>
                <boxGeometry args={[0.06, 0.08, 0.04]} />
              </mesh>
            </group>
          </group>

          {/* Right Arm */}
          <group ref={rightArmRef} position={[0.26, 0.28, 0]}>
            {/* Armored Shoulder Pauldron */}
            <mesh material={materials.jacketArmor} position={[0.03, 0.02, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
            </mesh>
            {/* Upper Arm */}
            <mesh material={materials.jacket} position={[0, -0.16, 0]}>
              <capsuleGeometry args={[0.06, 0.22, 8, 12]} />
            </mesh>
            {/* Forearm & Wrist Gauntlet */}
            <group ref={rightForearmRef} position={[0, -0.3, 0]}>
              <mesh material={materials.jacket} position={[0, -0.14, 0]}>
                <capsuleGeometry args={[0.055, 0.2, 8, 12]} />
              </mesh>
              {/* Wrist Gauntlet Trim */}
              <mesh material={materials.energyTrim} position={[0.03, -0.14, 0.04]}>
                <boxGeometry args={[0.04, 0.08, 0.03]} />
              </mesh>
              {/* Hand */}
              <mesh material={materials.skin} position={[0, -0.27, 0]}>
                <boxGeometry args={[0.06, 0.08, 0.04]} />
              </mesh>
            </group>
          </group>

          {/* Neck & Head */}
          <group ref={headRef} position={[0, 0.44, 0]}>
            <mesh material={materials.skin} position={[0, -0.04, 0]}>
              <cylinderGeometry args={[0.065, 0.07, 0.08, 12]} />
            </mesh>
            {/* Anime Head / Face */}
            <mesh material={materials.skin} position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.14, 20, 20]} />
            </mesh>
            {/* Anime Chin */}
            <mesh material={materials.skin} position={[0, 0.02, 0.06]}>
              <coneGeometry args={[0.09, 0.12, 8]} rotation={[0.4, 0, 0]} />
            </mesh>

            {/* Glowing Anime Eyes */}
            <group position={[0, 0.1, 0.13]}>
              <mesh ref={eyeLeftRef} material={materials.eyesNormal} position={[-0.05, 0, 0]}>
                <boxGeometry args={[0.032, 0.016, 0.01]} />
              </mesh>
              <mesh ref={eyeRightRef} material={materials.eyesNormal} position={[0.05, 0, 0]}>
                <boxGeometry args={[0.032, 0.016, 0.01]} />
              </mesh>
            </group>

            {/* Animated Mouth */}
            <mesh ref={mouthRef} material={materials.mouth} position={[0, 0.035, 0.135]}>
              <boxGeometry args={[0.035, 0.008, 0.008]} />
            </mesh>

            {/* Messy Spiky Hair with Blue Highlights */}
            <group position={[0, 0.12, 0]}>
              {/* Base Hair volume */}
              <mesh material={materials.hair} position={[0, 0.04, -0.02]}>
                <sphereGeometry args={[0.155, 14, 14]} />
              </mesh>
              {/* Spikes: Front Bangs */}
              <mesh material={materials.hair} position={[-0.08, 0.05, 0.12]} rotation={[0.4, -0.2, 0.3]}>
                <coneGeometry args={[0.04, 0.14, 6]} />
              </mesh>
              <mesh material={materials.hairHighlight} position={[-0.02, 0.04, 0.14]} rotation={[0.5, 0, -0.1]}>
                <coneGeometry args={[0.04, 0.16, 6]} />
              </mesh>
              <mesh material={materials.hairHighlight} position={[0.06, 0.05, 0.13]} rotation={[0.4, 0.3, -0.2]}>
                <coneGeometry args={[0.04, 0.15, 6]} />
              </mesh>
              {/* Side Hair Spikes */}
              <mesh material={materials.hair} position={[-0.15, 0.02, 0.02]} rotation={[0, 0, 0.6]}>
                <coneGeometry args={[0.045, 0.14, 6]} />
              </mesh>
              <mesh material={materials.hair} position={[0.15, 0.02, 0.02]} rotation={[0, 0, -0.6]}>
                <coneGeometry args={[0.045, 0.14, 6]} />
              </mesh>
              {/* Top Spikes */}
              <mesh material={materials.hair} position={[0, 0.16, -0.02]} rotation={[-0.2, 0, 0]}>
                <coneGeometry args={[0.07, 0.18, 6]} />
              </mesh>
              <mesh material={materials.hairHighlight} position={[0.05, 0.17, -0.05]} rotation={[-0.3, 0.4, 0]}>
                <coneGeometry args={[0.05, 0.16, 6]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Ascension Magic Rings for LEVEL UP state */}
      {currentState === CharacterStates.LEVEL_UP && (
        <group ref={auraRingsRef} position={[0, 0.2, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 0.9, 32]} />
            <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.25, 32]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Floating Cyan Energy Aura Particles */}
      <points ref={auraParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#00E5FF"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
