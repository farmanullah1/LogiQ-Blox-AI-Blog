import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const WordBubble = ({ word, position, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position}>
        <Sphere args={[1, 32, 32]} scale={0.8}>
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.3}
            radius={1}
            opacity={0.4}
            transparent
          />
        </Sphere>
        <Text
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/plusjakartasans/v8/LMS64oEb9fDRGNo9p1sq_FjTNq72mv0.woff"
        >
          {word}
        </Text>
      </group>
    </Float>
  );
};

const FloatingWords = () => {
  const words = [
    { text: 'Grammar', color: '#2563EB' },
    { text: 'Spelling', color: '#10B981' },
    { text: 'Correct', color: '#EF4444' },
    { text: 'Clarity', color: '#6366F1' },
    { text: 'Style', color: '#F59E0B' },
  ];

  const positions = useMemo(() => {
    return words.map(() => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 5,
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
