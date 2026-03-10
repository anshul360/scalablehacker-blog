import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three/webgpu"; // The 2026 way: WebGPU by default
import { Perf } from 'r3f-perf';
import {
  storage,
  uniform,
  instanceIndex,
  Fn,
  positionLocal,
  float,
  cos,
} from "three/tsl";
import { useEffect, useMemo, useRef, useState } from "react";
import type { WebGPURendererParameters } from "three/src/renderers/webgpu/WebGPURenderer.js";

const MAX_PARTICLES = 100000;

function Scene({
  count,
  particleSize,
}: {
  count: number;
  particleSize: number;
}) {
  const { scene, gl } = useThree();
  const renderer = gl as unknown as THREE.WebGPURenderer;
  const meshRef = useRef<THREE.InstancedMesh | null>(null);

  const timeUniform = useMemo(() => uniform(float(0)), []);

  // Buffers & shader definition — created once, never rebuilt
  const { positionBuffer, computeFn } = useMemo(() => {
    const posArray = new Float32Array(MAX_PARTICLES * 3);
    for (let i = 0; i < MAX_PARTICLES * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    const initialAttr = new THREE.StorageInstancedBufferAttribute(
      new Float32Array(posArray),
      3
    );
    const posAttr = new THREE.StorageInstancedBufferAttribute(MAX_PARTICLES, 3);

    const initialBuffer = storage(initialAttr, "vec3", MAX_PARTICLES);
    const positionBuffer = storage(posAttr, "vec3", MAX_PARTICLES);

    // Analytical harmonic oscillator: pos(t) = initialPos * cos(sqrt(k) * t)
    const computeFn = Fn(() => {
      const initPos = initialBuffer.element(instanceIndex);
      const pos = positionBuffer.element(instanceIndex);

      pos.assign(initPos.mul(cos(timeUniform.mul(float(0.03)))));
    });

    return { positionBuffer, computeFn };
  }, [timeUniform]);

  // Dispatch only as many threads as there are active particles
  const computePhysics = useMemo(
    () => computeFn().compute(count),
    [computeFn, count]
  );

  // Update visible particle count without recreating anything
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.count = count;
    }
  }, [count]);

  useEffect(() => {
    scene.background = new THREE.Color(0x050505);
  }, [scene]);

  // Recreate mesh only when particleSize changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const material = new THREE.MeshBasicNodeMaterial();
    material.color = new THREE.Color(0x00ffaa);
    material.positionNode = positionLocal.add(
      positionBuffer.element(instanceIndex)
    );

    const s = particleSize;
    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(s, s, s),
      material,
      MAX_PARTICLES
    );
    mesh.count = count; // Only render active particles
    meshRef.current = mesh;
    scene.add(mesh);

    return () => {
      scene.remove(mesh);
      meshRef.current = null;
    };
  }, [scene, particleSize, positionBuffer]);

  useFrame(() => {
    timeUniform.value += 1;
    renderer.compute(computePhysics);
  });

  return <></>;
}

export default function GPUCompute() {
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
        shadows
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer({
            ...(props as WebGPURendererParameters),
            forceWebGL: true
          });
          await renderer.init();
          return renderer;
        }}
        camera={{ position: [8, 8, 8] }}
      >
        <Scene count={count} particleSize={particleSize} />
        <OrbitControls makeDefault />
        {/* <Stats showPanel={1}/> */}
        {/* <Stats showPanel={2}/> */}
      </Canvas>
    </div>
  );
}
