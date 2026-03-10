import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Perf } from "r3f-perf";

const MAX_PARTICLES = 100000;

function Scene({
  count,
  particleSize,
}: {
  count: number;
  particleSize: number;
}) {
  const { scene } = useThree();
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const timeRef = useRef(0);

  // Generate initial random positions once
  const initialPositions = useMemo(() => {
    const arr = new Float32Array(MAX_PARTICLES * 3);
    for (let i = 0; i < MAX_PARTICLES * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    scene.background = new THREE.Color(0x050505);
  }, [scene]);

  // Recreate mesh when particleSize changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffaa });
    const s = particleSize;
    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(s, s, s),
      material,
      MAX_PARTICLES
    );
    mesh.count = count;
    meshRef.current = mesh;
    scene.add(mesh);

    return () => {
      scene.remove(mesh);
      mesh.geometry.dispose();
      material.dispose();
      meshRef.current = null;
    };
  }, [scene, particleSize]);

  // Update visible count without recreating mesh
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.count = count;
    }
  }, [count]);

  useFrame(() => {

    timeRef.current += 1;
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = timeRef.current;
    const cosFactor = Math.cos(t * 0.03);

    // Analytical harmonic oscillator: pos(t) = initialPos * cos(sqrt(k) * t)
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      dummy.position.set(
        (initialPositions[ix] ?? 0)  * cosFactor,
        (initialPositions[ix + 1] ?? 0) * cosFactor,
        (initialPositions[ix + 2] ?? 0) * cosFactor
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return <></>;
}

export default function GPUComputeWebGL() {
  const [count, setCount] = useState(1000);
  const [particleSize, setParticleSize] = useState(0.02);

  return (
    <div
      className="w-50 h-50 border rounded-lg overflow-hidden relative"
      style={{ width: "100%", height: 500, position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          background: "rgba(0,0,0,0.7)",
          padding: "10px 14px",
          borderRadius: 8,
          color: "#fff",
          fontSize: 13,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <label
          htmlFor=""
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          Particles: {count}
        </label>
        <input
          type="range"
          min={100}
          max={MAX_PARTICLES}
          step={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ width: 140 }}
        />
        <label
          htmlFor=""
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          Size: {particleSize.toFixed(3)}
        </label>
        <input
          type="range"
          min={0.005}
          max={0.2}
          step={0.005}
          value={particleSize}
          onChange={(e) => setParticleSize(Number(e.target.value))}
          style={{ width: 140 }}
        />
      </div>
      <Canvas
        camera={{ position: [8, 8, 8] }}
      >
        <Scene count={count} particleSize={particleSize} />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
