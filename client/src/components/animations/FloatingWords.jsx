import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const WordBubble = ({ word, position, color, scale }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group position={position}>
        <Sphere args={[1, 32, 32]} scale={scale}>
          <MeshDistortMaterial
            color={color}
            speed={1.5}
            distort={0.4}
            radius={1}
            opacity={0.3}
            transparent
          />
        </Sphere>
        <Text
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {word}
        </Text>
      </group>
    </Float>
  );
};

const FloatingWords = () => {
  const words = [
    { text: 'Grammar', color: '#2563EB', scale: 0.7 },
    { text: 'Spelling', color: '#10B981', scale: 0.9 },
    { text: 'Correct', color: '#EF4444', scale: 0.8 },
    { text: 'Clarity', color: '#6366F1', scale: 0.65 },
    { text: 'Style', color: '#F59E0B', scale: 0.75 },
    { text: 'Flow', color: '#EC4899', scale: 0.6 },
  ];

  const positions = useMemo(() => {
    return words.map(() => [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4,
    ]);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {words.map((w, i) => (
          <WordBubble 
            key={i} 
            word={w.text} 
            position={positions[i]} 
            color={w.color} 
          />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingWords;
