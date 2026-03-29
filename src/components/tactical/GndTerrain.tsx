"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const segments = 64;

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, segments, segments);
    const positions = geo.getAttribute("position");

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const height =
        Math.sin(x * 0.8) * Math.cos(y * 0.6) * 0.8 +
        Math.sin(x * 1.5 + 1) * Math.cos(y * 1.2 + 2) * 0.4 +
        Math.sin(x * 3 + y * 2) * 0.15;
      positions.setZ(i, height);
    }

    positions.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.5, 0, 0]}
      position={[0, -0.5, 0]}
    >
      <shaderMaterial
        ref={materialRef}
        wireframe
        transparent
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#00ff44") },
        }}
        vertexShader={`
          varying vec3 vPosition;
          varying float vElevation;
          void main() {
            vPosition = position;
            vElevation = position.z;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vPosition;
          varying float vElevation;
          uniform vec3 uColor;
          uniform float uTime;
          void main() {
            float intensity = smoothstep(-0.5, 1.2, vElevation) * 0.7 + 0.3;
            float scanLine = sin(vPosition.y * 20.0 + uTime * 2.0) * 0.1 + 0.9;
            gl_FragColor = vec4(uColor * intensity * scanLine, intensity * 0.85);
          }
        `}
      />
    </mesh>
  );
}

export default function GndTerrain() {
  return (
    <Canvas
      camera={{ position: [0, 4, 6], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={["#020804"]} />
      <ambientLight intensity={0.1} />
      <Terrain />
    </Canvas>
  );
}
