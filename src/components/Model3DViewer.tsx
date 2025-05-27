'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

function Model() {
  // The path is relative to the /public directory
  const { scene } = useGLTF('/models/MyFirstRobot.gltf');
  console.log(scene);
  // You can adjust these values based on your model's size and orientation
  const scale = 2;
  const position = [0, -2, 0];
  const rotation = [0, 0, 0];

  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  );
}

// Pre-load the model
useGLTF.preload('/models/your-model.gltf');

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[rgb(0,62,65)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[rgb(0,62,65)]">Loading 3D Model...</p>
      </div>
    </div>
  );
}

export default function Model3DViewer() {
  return (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          shadows
        >
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
          />
          <Model />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </Suspense>
    </div>
  );
} 