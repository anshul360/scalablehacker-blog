import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three/webgpu"; // The 2026 way: WebGPU by default
import { color, time, vec3, positionLocal, mix } from "three/tsl";
import { Suspense, useEffect, useRef } from "react";
import type { WebGPURendererParameters } from "three/src/renderers/webgpu/WebGPURenderer.js";

const Scene = () => {
  const { scene } = useThree();

  useEffect(() => {
    // 1. scene setup
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    scene.background = new THREE.Color(0x050505);

    // const controls = new OrbitControls(camera, renderer.domElement);

    // 3. The "Hello World" TSL Logic
    // Instead of strings, we use JS functions that represent GPU math logic.
    const material = new THREE.MeshStandardNodeMaterial();

    // LOGIC: Create a pulse using Time and Sin`
    // pulse = sin(time * 2.0) * 0.5 + 0.5
    const pulse = time.mul(2.0).sin().mul(1).add(0.5);

    // LOGIC: Map that pulse to the Color (Red to Blue)
    const colorA = color(0xff0000); // Red
    const colorB = color(0x0000ff); // Blue
    material.colorNode = mix(colorA, colorB, pulse);

    // LOGIC: Physical Displacement (Math/Physics logic)
    // Displace vertices based on their local Y position + Time
    const wave = positionLocal.y.add(time).cos().mul(0.2);
    material.positionNode = positionLocal.add(vec3(0, wave, 0));

    // 4. Mesh
    const geometry = new THREE.IcosahedronGeometry(2, 64);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }, []);

  return <> </>;
};

export default function GPUShader() {
  return (
    <div
      className=" w-50 h-50"
      style={{
        width: "100%",
        height: 500,
      }}
    >
      <Canvas
        shadows
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer({
            ...(props as WebGPURendererParameters),
            // forceWebGL: true,
          });
          await renderer.init();

          return renderer;
        }}
      >
        <Scene />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
