import SceneContainer from "@/components/r3f/SceneContainer";
import {
  DragControls,
  GizmoHelper,
  GizmoViewport,
  // Line,
  OrbitControls,
  PivotControls,
  Text3D,
  type OrbitControlsProps,
} from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
} from "react";
import * as THREE from "three/webgpu";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
// import { Inspector } from "three/examples/jsm/inspector/Inspector.js";
// import type { WebGPURenderer } from "three/webgpu";
import type { WebGPURendererParameters } from "three/src/renderers/webgpu/WebGPURenderer.js";
import type { ForwardRefComponent } from "@react-three/drei/helpers/ts-utils";
import { color, mix, negate, oneMinus, time, uv, uvec2 } from "three/tsl";

const SceneContext = createContext({
  outerRadius: 10,
  innerRadius: 1,
  type: "wedgeA",
  height: 5,
  range: 0.5,
  showMesh: false,
});

function Scene() {
  const { scene } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
    const tankRef = useRef<THREE.Object3D>(null);
  const { height, outerRadius } = useContext(SceneContext);

  useEffect(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const material = new THREE.MeshPhysicalNodeMaterial();

    let wavePattern = uv()
      .y.mul(height)
      .add(
        uv()
          .x.mul(Math.PI * 2 * 4)
          .cos()
          .mul(0.05)
      )
      .add(negate(time))
      .mul(Math.PI * 2)
      .cos()
      .mul(1)
      .add(1);
    wavePattern = wavePattern.mul(oneMinus(uv().y));

    material.colorNode = mix(color("#fff"), color("lightgreen"), wavePattern);
    material.opacityNode = oneMinus(uv().y);
    material.transparent = true;
    material.side = THREE.DoubleSide;
    material.blending = THREE.AdditiveBlending;

    mesh.material = material;
  }, [height]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/cannon/tank1.gltf",
      (gltf) => {
        scene.add(gltf.scene);
        tankRef.current = gltf.scene;
        tankRef.current.rotation.y = -Math.PI / 2;
        tankRef.current.scale.set(0.6, 0.6, 0.6);
        tankRef.current.position.set(2, 0, 0);
        // if(gunRef.current)gunRef.current.rotation.y = - Math.PI / 2;
        // if(turretRef.current)turretRef.current.rotation.y = - Math.PI / 2;
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
    return () => {
      // cleanup on unmount
    };
  }, [scene]);

  useFrame((_, delta) => {});

  return (
    <>
      <mesh position={[0, height/2, 0]} ref={meshRef}>
        {/* <planeGeometry args={[5, 5]} /> */}
        <cylinderGeometry
          args={[outerRadius, outerRadius, height, 32, 1, true]}
        />
        {/* <meshPhysicalMaterial color={new THREE.Color("lightgray")} ref={meshRef}/> */}
      </mesh>
      {/* <DragControls>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[4.5]} />
          <meshPhysicalMaterial color={"lightyellow"} />
        </mesh>
      </DragControls> */}
    </>
  );
}

export default function Shader1() {
  const [outerRadius, setOuterRadius] = useState(5);
  const [innerRadius, setInnerRadius] = useState(1);
  const [height, setHeight] = useState(3);
  const [range, setRange] = useState(0.5);
  const [type, setType] = useState("cone");
  const [mesh, setMesh] = useState(false);
  const [frameloop, setFrameloop] = useState<"never" | "always">("never");

  return (
    <SceneContext.Provider
      value={{
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        type: type,
        height: height,
        range: range,
        showMesh: mesh,
      }}
    >
      <div className=" relative not-prose space-y-2 !size-full !h-fit">
        <div className=" flex items-cente gap-2">
          <label htmlFor="h">Radius</label>
          <input
            type="range"
            id="r"
            name="r"
            min="1"
            max="100"
            step={1}
            value={outerRadius}
            onChange={(e) => setOuterRadius(Number(e.target.value))}
          />
          <p className=" border border-color-200 rounded p-0.5 w-10 text-center">
            {outerRadius}
          </p>
        </div>
        <div className=" flex items-cente gap-2">
          <label htmlFor="h">Height</label>
          <input
            type="range"
            id="h"
            name="h"
            min="1"
            max="100"
            step={1}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <p className=" border border-color-200 rounded p-0.5 w-10 text-center">
            {height}
          </p>
        </div>
        <Canvas
          frameloop={frameloop}
          className=" !size-full !h-[500px] border rounded-lg bg-white"
          shadows
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer({
              ...(props as WebGPURendererParameters),
              forceWebGL: true,
            });
            await renderer.init().then(() => setFrameloop("always"));
            return renderer;
          }}
          camera={{ position: [0, 4, 15] }}
        >
          {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper> */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <Scene />
          {/* <Stats showPanel={1}/> */}
          {/* <Stats showPanel={2}/> */}
          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </SceneContext.Provider>
  );
}
