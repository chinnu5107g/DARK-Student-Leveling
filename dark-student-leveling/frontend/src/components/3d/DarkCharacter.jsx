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
  const cloakRef = useRef();
  const daggerRef = useRef();
  const auraParticlesRef = useRef();
  const mouthRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const auraRingsRef = useRef();

  const currentState = useCharacterStore(state => state.currentState);
  const isSpeaking = useCharacterStore(state => state.isSpeaking);

  // Materials with Solo Leveling / Shadow Monarch Aesthetic
  const materials = useMemo(() => {
    return {
      trenchCoat: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#05000A'),
        roughness: 0.4,
        metalness: 0.5,
      }),
      shadowArmor: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#130026'),
        roughness: 0.2,
        metalness: 0.85,
      }),
      shadowVioletEnergy: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C084FC'),
        emissive: new THREE.Color('#9333EA'),
        emissiveIntensity: 2.2,
        roughness: 0.1,
      }),
      skin: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F1D5C9'),
        roughness: 0.5,
        metalness: 0.05,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#040008'),
        roughness: 0.7,
        metalness: 0.3,
      }),
      hairHighlight: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3B0764'),
        emissive: new THREE.Color('#7E22CE'),
        emissiveIntensity: 0.9,
        roughness: 0.3,
      }),
      monarchEyes: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E9D5FF'),
        emissive: new THREE.Color('#A855F7'),
        emissiveIntensity: 3.0,
      }),
      pants: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#080010'),
        roughness: 0.6,
        metalness: 0.3,
      }),
      boots: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0D001C'),
        roughness: 0.2,
        metalness: 0.8,
      }),
      daggerBlade: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C084FC'),
        emissive: new THREE.Color('#7E22CE'),
        emissiveIntensity: 2.5,
        roughness: 0.1,
        metalness: 0.9,
      }),
      mouth: new THREE.MeshBasicMaterial({
        color: new THREE.Color('#581C87'),
      }),
    };
  }, []);

  // Shadow Aura Particles Buffer
  const particleCount = 80;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.6;
      pos[i * 3 + 1] = Math.random() * 2.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
    }
    return pos;
  }, []);

  // Animation Loop based on currentState
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Default neutral resets
    let breath = Math.sin(t * 2.4) * 0.03;

    if (chestRef.current) chestRef.current.position.y = 1.1 + breath;
    if (headRef.current) headRef.current.position.y = 1.7 + breath * 1.2;

    // Dynamic Flowing Cloak Tail Physics
    if (cloakRef.current) {
      cloakRef.current.rotation.x = 0.2 + Math.sin(t * 3.5) * 0.15;
      cloakRef.current.rotation.z = Math.cos(t * 2.5) * 0.08;
    }

    // Dagger glow pulse
    if (daggerRef.current) {
      daggerRef.current.rotation.z = Math.sin(t * 3) * 0.05;
    }

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

    // Monarch Eyes glowing pulse
    const eyePulse = 1 + Math.sin(t * 4) * 0.15;
    if (eyeLeftRef.current && eyeRightRef.current) {
      eyeLeftRef.current.scale.set(eyePulse, eyePulse, 1);
      eyeRightRef.current.scale.set(eyePulse, eyePulse, 1);
    }

    // STATE-BASED ANIMATION CONTROLLER
    switch (currentState) {
      case CharacterStates.WALK: {
        const speed = 6;
        const walkCycle = Math.sin(t * speed);

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
          hipsRef.current.rotation.x = 0.25;
        }
        if (leftLegRef.current) leftLegRef.current.rotation.x = runCycle * 0.9;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -runCycle * 0.9;
        if (leftShinRef.current) leftShinRef.current.rotation.x = Math.max(0, -runCycle * 0.8);
        if (rightShinRef.current) rightShinRef.current.rotation.x = Math.max(0, runCycle * 0.8);

        if (leftArmRef.current) leftArmRef.current.rotation.x = -runCycle * 0.8;
        if (rightArmRef.current) rightArmRef.current.rotation.x = runCycle * 0.8;
        break;
      }

      case CharacterStates.LEVEL_UP: {
        // ARISE / Shadow Extraction Pose
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -2.7;
          rightArmRef.current.rotation.z = 0.2;
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -0.4;
          leftArmRef.current.rotation.z = 0.7;
        }
        if (headRef.current) {
          headRef.current.rotation.x = -0.35;
        }
        if (auraRingsRef.current) {
          auraRingsRef.current.rotation.y += delta * 4;
          auraRingsRef.current.scale.setScalar(1 + Math.sin(t * 6) * 0.3);
        }
        break;
      }

      case CharacterStates.IDLE:
      default: {
        // Confident Shadow Monarch Stance
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(t * 1.8) * 0.04;
          leftArmRef.current.rotation.z = 0.15 + Math.cos(t * 1.5) * 0.02;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -0.3 + Math.sin(t * 1.8) * 0.04;
          rightArmRef.current.rotation.z = -0.15 - Math.cos(t * 1.5) * 0.02;
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

    // Animate Shadow Flame Aura particles ascending
    if (auraParticlesRef.current) {
      const positions = auraParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * 0.8;
        if (positions[i * 3 + 1] > 2.6) {
          positions[i * 3 + 1] = 0.1;
          positions[i * 3] = (Math.random() - 0.5) * 1.4;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
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

        {/* Tactical Monarch Belt with Violet Core */}
        <mesh material={materials.shadowArmor} position={[0, 0.08, 0]}>
          <boxGeometry args={[0.36, 0.06, 0.24]} />
        </mesh>
        <mesh material={materials.shadowVioletEnergy} position={[0, 0.08, 0.125]}>
          <boxGeometry args={[0.08, 0.04, 0.02]} />
        </mesh>

        {/* Flowing Shadow Cloak Tail */}
        <group ref={cloakRef} position={[0, 0.1, -0.12]}>
          <mesh material={materials.trenchCoat} position={[0, -0.45, -0.05]}>
            <boxGeometry args={[0.42, 0.9, 0.04]} />
          </mesh>
          <mesh material={materials.shadowVioletEnergy} position={[0, -0.88, -0.03]}>
            <boxGeometry args={[0.44, 0.04, 0.02]} />
          </mesh>
        </group>

        {/* Legs: Left */}
        <group ref={leftLegRef} position={[-0.12, -0.1, 0]}>
          <mesh material={materials.pants} position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.075, 0.32, 8, 12]} />
          </mesh>
          {/* Shin & Armored Boots */}
          <group ref={leftShinRef} position={[0, -0.4, 0]}>
            <mesh material={materials.pants} position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.065, 0.3, 8, 12]} />
            </mesh>
            <mesh material={materials.boots} position={[0, -0.4, 0.06]}>
              <boxGeometry args={[0.12, 0.12, 0.24]} />
            </mesh>
            <mesh material={materials.shadowVioletEnergy} position={[0, -0.45, 0.06]}>
              <boxGeometry args={[0.13, 0.03, 0.25]} />
            </mesh>
          </group>
        </group>

        {/* Legs: Right */}
        <group ref={rightLegRef} position={[0.12, -0.1, 0]}>
          <mesh material={materials.pants} position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.075, 0.32, 8, 12]} />
          </mesh>
          {/* Shin & Armored Boots */}
          <group ref={rightShinRef} position={[0, -0.4, 0]}>
            <mesh material={materials.pants} position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.065, 0.3, 8, 12]} />
            </mesh>
            <mesh material={materials.boots} position={[0, -0.4, 0.06]}>
              <boxGeometry args={[0.12, 0.12, 0.24]} />
            </mesh>
            <mesh material={materials.shadowVioletEnergy} position={[0, -0.45, 0.06]}>
              <boxGeometry args={[0.13, 0.03, 0.25]} />
            </mesh>
          </group>
        </group>

        {/* Chest / Torso */}
        <group ref={chestRef} position={[0, 0.25, 0]}>
          
          {/* Monarch Trench Coat */}
          <mesh material={materials.trenchCoat} position={[0, 0.14, 0]}>
            <boxGeometry args={[0.4, 0.44, 0.24]} />
          </mesh>
          
          {/* Shadow Violet Energy Ribs */}
          <mesh material={materials.shadowVioletEnergy} position={[-0.1, 0.14, 0.125]}>
            <boxGeometry args={[0.025, 0.36, 0.01]} />
          </mesh>
          <mesh material={materials.shadowVioletEnergy} position={[0.1, 0.14, 0.125]}>
            <boxGeometry args={[0.025, 0.36, 0.01]} />
          </mesh>

          {/* High Shadow Collar */}
          <mesh material={materials.shadowArmor} position={[0, 0.38, 0.02]}>
            <cylinderGeometry args={[0.15, 0.16, 0.14, 16, 1, true]} />
          </mesh>

          {/* Left Arm */}
          <group ref={leftArmRef} position={[-0.26, 0.28, 0]}>
            <mesh material={materials.shadowArmor} position={[-0.03, 0.02, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
            </mesh>
            <mesh material={materials.trenchCoat} position={[0, -0.16, 0]}>
              <capsuleGeometry args={[0.06, 0.22, 8, 12]} />
            </mesh>
            <group ref={leftForearmRef} position={[0, -0.3, 0]}>
              <mesh material={materials.trenchCoat} position={[0, -0.14, 0]}>
                <capsuleGeometry args={[0.055, 0.2, 8, 12]} />
              </mesh>
              <mesh material={materials.shadowVioletEnergy} position={[-0.03, -0.14, 0.04]}>
                <boxGeometry args={[0.04, 0.08, 0.03]} />
              </mesh>
              <mesh material={materials.skin} position={[0, -0.27, 0]}>
                <boxGeometry args={[0.06, 0.08, 0.04]} />
              </mesh>
            </group>
          </group>

          {/* Right Arm & Shadow Dagger */}
          <group ref={rightArmRef} position={[0.26, 0.28, 0]}>
            <mesh material={materials.shadowArmor} position={[0.03, 0.02, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
            </mesh>
            <mesh material={materials.trenchCoat} position={[0, -0.16, 0]}>
              <capsuleGeometry args={[0.06, 0.22, 8, 12]} />
            </mesh>
            <group ref={rightForearmRef} position={[0, -0.3, 0]}>
              <mesh material={materials.trenchCoat} position={[0, -0.14, 0]}>
                <capsuleGeometry args={[0.055, 0.2, 8, 12]} />
              </mesh>
              <mesh material={materials.skin} position={[0, -0.27, 0]}>
                <boxGeometry args={[0.06, 0.08, 0.04]} />
              </mesh>

              {/* Glowing Shadow Dagger */}
              <group ref={daggerRef} position={[0.02, -0.28, 0.1]} rotation={[1.4, 0, 0]}>
                {/* Dagger Handle */}
                <mesh material={materials.shadowArmor} position={[0, -0.05, 0]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
                </mesh>
                {/* Glowing Blade */}
                <mesh material={materials.daggerBlade} position={[0, 0.12, 0]}>
                  <coneGeometry args={[0.035, 0.24, 4]} />
                </mesh>
              </group>
            </group>
          </group>

          {/* Head & Face */}
          <group ref={headRef} position={[0, 0.44, 0]}>
            <mesh material={materials.skin} position={[0, -0.04, 0]}>
              <cylinderGeometry args={[0.065, 0.07, 0.08, 12]} />
            </mesh>
            <mesh material={materials.skin} position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.14, 20, 20]} />
            </mesh>
            <mesh material={materials.skin} position={[0, 0.02, 0.06]}>
              <coneGeometry args={[0.09, 0.12, 8]} rotation={[0.4, 0, 0]} />
            </mesh>

            {/* Glowing Violet Monarch Eyes */}
            <group position={[0, 0.1, 0.13]}>
              <mesh ref={eyeLeftRef} material={materials.monarchEyes} position={[-0.05, 0, 0]}>
                <boxGeometry args={[0.035, 0.016, 0.01]} />
              </mesh>
              <mesh ref={eyeRightRef} material={materials.monarchEyes} position={[0.05, 0, 0]}>
                <boxGeometry args={[0.035, 0.016, 0.01]} />
              </mesh>
            </group>

            {/* Animated Mouth */}
            <mesh ref={mouthRef} material={materials.mouth} position={[0, 0.035, 0.135]}>
              <boxGeometry args={[0.035, 0.008, 0.008]} />
            </mesh>

            {/* Solo Leveling Sung Jin-woo Dark Hair with Purple Auras */}
            <group position={[0, 0.12, 0]}>
              <mesh material={materials.hair} position={[0, 0.04, -0.02]}>
                <sphereGeometry args={[0.155, 14, 14]} />
              </mesh>
              <mesh material={materials.hair} position={[-0.08, 0.05, 0.12]} rotation={[0.4, -0.2, 0.3]}>
                <coneGeometry args={[0.04, 0.14, 6]} />
              </mesh>
              <mesh material={materials.hairHighlight} position={[-0.02, 0.04, 0.14]} rotation={[0.5, 0, -0.1]}>
                <coneGeometry args={[0.04, 0.16, 6]} />
              </mesh>
              <mesh material={materials.hairHighlight} position={[0.06, 0.05, 0.13]} rotation={[0.4, 0.3, -0.2]}>
                <coneGeometry args={[0.04, 0.15, 6]} />
              </mesh>
              <mesh material={materials.hair} position={[-0.15, 0.02, 0.02]} rotation={[0, 0, 0.6]}>
                <coneGeometry args={[0.045, 0.14, 6]} />
              </mesh>
              <mesh material={materials.hair} position={[0.15, 0.02, 0.02]} rotation={[0, 0, -0.6]}>
                <coneGeometry args={[0.045, 0.14, 6]} />
              </mesh>
              <mesh material={materials.hairHighlight} position={[0, 0.16, -0.02]} rotation={[-0.2, 0, 0]}>
                <coneGeometry args={[0.07, 0.18, 6]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Shadow Extraction "ARISE" Magic Circle */}
      {currentState === CharacterStates.LEVEL_UP && (
        <group ref={auraRingsRef} position={[0, 0.05, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 0.95, 32]} />
            <meshBasicMaterial color="#C084FC" transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.3, 1.38, 32]} />
            <meshBasicMaterial color="#9333EA" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Floating Shadow Flame Particles */}
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
          size={0.055}
          color="#C084FC"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
