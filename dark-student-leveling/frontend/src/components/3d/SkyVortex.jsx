import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SkyVortex() {
  const starsRef = useRef();
  const vortexRef = useRef();
  const moonRef = useRef();

  // Celestial Starfield Particles
  const starCount = 800;
  const [starPositions, starColors] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const cols = new Float32Array(starCount * 3);
    const colorPalette = [
      new THREE.Color('#C084FC'),
      new THREE.Color('#9333EA'),
      new THREE.Color('#7E22CE'),
      new THREE.Color('#E9D5FF'),
      new THREE.Color('#FFFFFF'),
    ];

    for (let i = 0; i < starCount; i++) {
      // Sphere distribution around the world
      const radius = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.max(5, radius * Math.sin(phi) * Math.sin(theta)); // Keep sky high
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state, delta) => {
    if (vortexRef.current) {
      vortexRef.current.rotation.z += delta * 0.15;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Background Starfield */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starCount}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.6}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Cosmic Celestial Shadow Moon */}
      <group ref={moonRef} position={[25, 45, -50]}>
        <mesh>
          <sphereGeometry args={[7, 32, 32]} />
          <meshStandardMaterial
            color="#F3E8FF"
            emissive="#A855F7"
            emissiveIntensity={0.8}
            roughness={0.9}
          />
        </mesh>
        {/* Moon Halo Glow */}
        <mesh scale={1.2}>
          <sphereGeometry args={[7, 24, 24]} />
          <meshBasicMaterial
            color="#C084FC"
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Swirling Arcane Sky Vortex (Shadow Gate Ascension) */}
      <group position={[0, 48, -40]} rotation={[0.4, 0, 0]}>
        <group ref={vortexRef}>
          {/* Outer Spiral Ring */}
          <mesh>
            <ringGeometry args={[14, 18, 48]} />
            <meshBasicMaterial
              color="#6B21A8"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Middle Violet Ring */}
          <mesh rotation={[0, 0, 0.8]}>
            <ringGeometry args={[8, 13, 36]} />
            <meshBasicMaterial
              color="#A855F7"
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Inner Starlight Eye */}
          <mesh>
            <ringGeometry args={[2, 6, 24]} />
            <meshBasicMaterial
              color="#E9D5FF"
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

        {/* Luminous Shadow Gate Light Beam */}
        <mesh position={[0, -25, 0]}>
          <cylinderGeometry args={[0.8, 4, 50, 24, 1, true]} />
          <meshBasicMaterial
            color="#C084FC"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
