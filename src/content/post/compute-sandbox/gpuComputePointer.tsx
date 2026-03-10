import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three/webgpu"; // The 2026 way: WebGPU by default
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
  const { scene, gl, camera } = useThree();
  const renderer = gl as unknown as THREE.WebGPURenderer;
  // 1. Create a TSL uniform for the mouse position
  const mousePos = uniform(new THREE.Vector3());

  // 2. Update the uniform with real mouse data in the loop
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // XY Plane
  const raycaster = new THREE.Raycaster();
  const mouseCoords = new THREE.Vector2();

  // Buffers & shader definition — created once, never rebuilt
  const { computeFn, positionBuffer } = useMemo(() => {
    const positionBuffer = storage(
      new THREE.StorageInstancedBufferAttribute(count, 3),
      "vec3",
      count
    );
    const velocityBuffer = storage(
      new THREE.StorageInstancedBufferAttribute(count, 3),
      "vec3",
      count
    );

    // Analytical harmonic oscillator: pos(t) = initialPos * cos(sqrt(k) * t)
    const computeFn = Fn(() => {
      const pos = positionBuffer.element(instanceIndex);
      const vel = velocityBuffer.element(instanceIndex);

      // Calculate Vector toward Mouse
      const dir = mousePos.sub(pos);
      const dist = dir.length();

      // Normalize and scale by strength (only if within a certain distance)
      const strength = 0.05;
      const force = dir.normalize().mul(strength);

      // Apply a simple drag/friction so they don't orbit forever
      vel.mulAssign(0.98);

      // Add attraction to velocity
      vel.addAssign(force);

      // Update position
      pos.x.addAssign(vel.x);
    });

    return { positionBuffer, computeFn };
  }, [mousePos, count]);

  // Dispatch only as many threads as there are active particles
  const computePhysics = useMemo(
    () => computeFn().compute(count),
    [computeFn, count]
  );

  useEffect(() => {
    const size = new THREE.Vector2();
    renderer.getSize(size);

    scene.background = new THREE.Color(0x050505);


    window.addEventListener("mousemove", (event) => {
      // Normalize mouse to -1 to +1
      mouseCoords.x = (event.clientX / size.width) * 2 - 1;
      mouseCoords.y = -(event.clientY / size.height) * 2 + 1;
    });

    return () => {
      window.removeEventListener("mousemove", (event) => {
        // Normalize mouse to -1 to +1
        mouseCoords.x = (event.clientX / size.width) * 2 - 1;
        mouseCoords.y = -(event.clientY / size.height) * 2 + 1;
      });
    };
  }, [scene, mouseCoords, renderer]);

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

    scene.add(mesh);

    return () => {
      scene.remove(mesh);
      // meshRef.current = null;
    };
  }, [scene, particleSize, positionBuffer]);

  useFrame(() => {
    raycaster.setFromCamera(mouseCoords, camera);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectPoint);

    // Update the GPU uniform
    mousePos.value.copy(intersectPoint);
    // timeUniform.value += 1;
    renderer.compute(computePhysics);
  });

  return <></>;
}

export default function GPUCompute() {
  const [count, setCount] = useState(1000);
  const [particleSize, setParticleSize] = useState(0.02);

  return (
    <div
      className="w-50 h-50 border rounded-lg overflow-hidden"
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
          });
          await renderer.init();
          return renderer;
        }}
        camera={{ position: [8, 8, 8] }}
      >
        <Scene count={count} particleSize={particleSize} />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
