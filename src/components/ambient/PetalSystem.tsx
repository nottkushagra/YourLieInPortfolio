"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PETAL_COUNT = 8;

function Petal({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useRef(0.1 + Math.random() * 0.15);
  const drift = useRef(-0.03 - Math.random() * 0.04);
  const rotSpeed = useRef((Math.random() - 0.5) * 0.02);
  const startX = useRef(3 + Math.random() * 5);
  const startY = useRef(2 + Math.random() * 6);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(startX.current, startY.current, 0);
      ref.current.rotation.z = Math.random() * Math.PI;
    }
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.y -= speed.current * 0.016;
    ref.current.position.x += drift.current * 0.016;
    ref.current.rotation.z += rotSpeed.current;

    // Reset when off screen
    if (ref.current.position.y < -5 || ref.current.position.x < -6) {
      ref.current.position.set(4 + Math.random() * 4, 5 + Math.random() * 3, 0);
    }
  });

  return (
    <mesh ref={ref} scale={[0.06 + Math.random() * 0.04, 0.03, 0.01]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#B8909A"
        transparent
        opacity={0.15 + Math.random() * 0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function PetalScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {Array.from({ length: PETAL_COUNT }, (_, i) => (
        <Petal key={i} index={i} />
      ))}
    </>
  );
}

export default function PetalSystem() {
  // Respect reduced motion
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[2]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <PetalScene />
      </Canvas>
    </div>
  );
}
