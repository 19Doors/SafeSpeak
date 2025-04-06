// components/ThreeScene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

export default function ThreeScene() {
  const meshRef = useRef<Mesh>(null);

  return (
    <div className="w-full h-[500px] bg-black rounded-lg">
      <Canvas camera={{ position: [2, 2, 5], fov: 60 }}>
        {/* Lights */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />

        {/* Rotating Cube */}
        <mesh ref={meshRef} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>

        {/* Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
