import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Torus, Octahedron, Icosahedron, Box } from '@react-three/drei';

const IconMesh = ({ type, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'torus': return <Torus args={[1, 0.4, 16, 32]} />;
      case 'octahedron': return <Octahedron args={[1, 0]} />;
      case 'icosahedron': return <Icosahedron args={[1, 0]} />;
      default: return <Box args={[1.5, 1.5, 1.5]} />;
    }
  };

  return (
    <mesh ref={meshRef}>
      {getGeometry()}
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.4}
        radius={1}
      />
    </mesh>
  );
};

const ThreeDIcon = ({ type, color, className }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <IconMesh type={type} color={color} />
        </Float>
      </Canvas>
    </div>
  );
};

export default ThreeDIcon;
