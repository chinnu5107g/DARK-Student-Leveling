import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function SceneCamera({ mode = 'character', targetLocation = null }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  
  // Location focus presets focused around DARK and landmarks
  const locations = {
    castle: { pos: [0.8, 2.2, 5.0], look: [0.8, 1.3, 1.8] },
    coding: { pos: [-18, 7, 2], look: [-18, 4, -12] },
    aptitude: { pos: [-16, 5, 26], look: [-16, 2, 14] },
    library: { pos: [18, 6, 0], look: [18, 3, -14] },
    quests: { pos: [16, 5, 24], look: [16, 3, 12] },
    awakening: { pos: [0.2, 1.9, 4.5], look: [0.8, 1.3, 1.8] },
    character: { pos: [0.6, 2.0, 4.6], look: [0.8, 1.3, 1.8] },
    cinematic: { pos: [0.8, 2.0, 4.8], look: [0.8, 1.3, 1.8] }
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (mode === 'cinematic') {
      // Gentle cinematic breathing pan in front of DARK without flying behind buildings
      const swayX = 0.6 + Math.sin(t * 0.35) * 0.5;
      const bobY = 1.9 + Math.cos(t * 0.45) * 0.15;
      const zoomZ = 4.6 + Math.sin(t * 0.25) * 0.3;

      camera.position.lerp(new THREE.Vector3(swayX, bobY, zoomZ), 0.04);
      camera.lookAt(0.8, 1.3, 1.8);
    } else if (mode === 'location' && targetLocation && locations[targetLocation]) {
      const config = locations[targetLocation];
      const targetPos = new THREE.Vector3(...config.pos);
      camera.position.lerp(targetPos, 0.05);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(new THREE.Vector3(...config.look), 0.05);
        controlsRef.current.update();
      }
    } else if (mode === 'awakening') {
      const config = locations.awakening;
      camera.position.lerp(new THREE.Vector3(...config.pos), 0.04);
      camera.lookAt(new THREE.Vector3(...config.look));
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 + 0.05}
      minDistance={2}
      maxDistance={40}
      target={[0.8, 1.3, 1.8]}
    />
  );
}
