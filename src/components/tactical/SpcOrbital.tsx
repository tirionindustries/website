"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Line } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial
        color="#0a2040"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function OrbitRing({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const satRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(radius * 2.7);

  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  useFrame(() => {
    angleRef.current += speed;
    if (satRef.current) {
      satRef.current.position.x = Math.cos(angleRef.current) * radius;
      satRef.current.position.z = Math.sin(angleRef.current) * radius;
    }
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      <Line points={points} color={color} lineWidth={0.5} transparent opacity={0.25} />
      <mesh ref={satRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function SpcOrbital() {
  return (
    <Canvas
      camera={{ position: [0, 2, 4.5], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={["#020208"]} />
      <Stars radius={50} depth={20} count={800} factor={2} saturation={0} fade speed={0.5} />
      <ambientLight intensity={0.3} />
      <Globe />
      <OrbitRing radius={2.2} tilt={0.3} speed={0.015} color="#4a8fff" />
      <OrbitRing radius={2.6} tilt={-0.5} speed={0.01} color="#00ccff" />
      <OrbitRing radius={3.0} tilt={0.8} speed={0.008} color="#4a8fff" />
      <OrbitRing radius={2.0} tilt={1.2} speed={0.02} color="#00ffcc" />
    </Canvas>
  );
}
