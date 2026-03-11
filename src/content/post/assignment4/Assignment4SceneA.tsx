import SceneContainer from "@/components/r3f/SceneContainer";
import { DragControls, Line, PivotControls, Text3D } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

const SceneContext = createContext({ radius: 10, height: 5, range: 0.5 });

function ConcaveSurface() {
  const { radius, height, range } = useContext(SceneContext);
  const { camera, controls, scene } = useThree();

  const targetRef = useRef<THREE.Object3D>(null);
  const turretRef = useRef<THREE.Object3D>(null);

  const keys = useRef<{ w: boolean; a: boolean; s: boolean; d: boolean }>({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const points: {
    rb: THREE.Vector3[];
    rt: THREE.Vector3[];
    lb: THREE.Vector3[];
    lt: THREE.Vector3[];
    rh: THREE.Vector3[];
    lh: THREE.Vector3[];
  } = useMemo(() => {
    const p: number = range;
    const x = Math.sqrt(1 - p * p);
    const vright: THREE.Vector3 = new THREE.Vector3(1, 0, 0)
      .multiplyScalar(p)
      .add(new THREE.Vector3(0, 0, 1).multiplyScalar(x))
      .multiplyScalar(radius);
    const vleft: THREE.Vector3 = new THREE.Vector3(1, 0, 0)
      .multiplyScalar(p)
      .add(new THREE.Vector3(0, 0, 1).multiplyScalar(-x))
      .multiplyScalar(radius);

    const vrh = vright.clone().add(new THREE.Vector3(0, height, 0));
    const vlh = vleft.clone().add(new THREE.Vector3(0, height, 0));

    return {
      rb: [new THREE.Vector3(0, 0, 0), vright],
      rt: [new THREE.Vector3(0, height, 0), vrh],
      lb: [new THREE.Vector3(0, 0, 0), vleft],
      lt: [new THREE.Vector3(0, height, 0), vlh],
      rh: [vright, vrh],
      lh: [vleft, vlh],
    };
    // return [[0,0,0], vright.toArray()]
  }, [range, radius, height]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      const key = e.code.replace("Key", "").toLowerCase();
      if (
        keys.current &&
        keys.current[key as keyof typeof keys.current] !== undefined
      )
        keys.current[key as keyof typeof keys.current] = true;
    });

    document.body.addEventListener("keyup", (e) => {
      const key = e.code.replace("Key", "").toLowerCase();
      if (
        keys.current &&
        keys.current[key as keyof typeof keys.current] !== undefined
      )
        keys.current[key as keyof typeof keys.current] = false;
    });

    return () => {
      document.body.removeEventListener("keydown", (e) => {
        const key = e.code.replace("Key", "").toLowerCase();
        if (
          keys.current &&
          keys.current[key as keyof typeof keys.current] !== undefined
        )
          keys.current[key as keyof typeof keys.current] = true;
      });

      document.body.removeEventListener("keyup", (e) => {
        const key = e.code.replace("Key", "").toLowerCase();
        if (
          keys.current &&
          keys.current[key as keyof typeof keys.current] !== undefined
        )
          keys.current[key as keyof typeof keys.current] = false;
      });
    };
  }, []);

  useFrame(() => {});

  function handleDrag() {
    if (!targetRef.current || !turretRef.current) return;

    const targetWVec = new THREE.Vector3();
    targetRef.current.getWorldPosition(targetWVec);

    // const cannonWVec = new THREE.Vector3();
    // turretRef.current.getWorldPosition(cannonWVec);

    // Transform target into turret's local space
    const targetLVec = turretRef.current.worldToLocal(targetWVec.clone());

    let h = false;
    let r = false;
    let ra = false;
    //inside height
    if (targetLVec.y < height && targetLVec.y > 0) {
      h = true;
    }

    //inside radius
    if (Math.hypot(targetLVec.x, targetLVec.z) < radius) {
      r = true;
    }

    //inside range
    const targetNV = new THREE.Vector3(
      targetLVec.x,
      0,
      targetLVec.z
    ).normalize();

    if (
      targetNV.clone().dot(new THREE.Vector3(1, 0, 0)) >= range &&
      targetNV.clone().dot(new THREE.Vector3(1, 0, 0)) <= 1
    ) {
      ra = true;
    }

    if (h && r && ra) {
      (
        (targetRef.current as THREE.Mesh).material as THREE.MeshStandardMaterial
      ).color.set("red");
    } else {
      (
        (targetRef.current as THREE.Mesh).material as THREE.MeshStandardMaterial
      ).color.set("#0FFEAE");
    }
  }

  return (
    <>
      <DragControls onDrag={handleDrag}>
        <group position={[8, 8, 8]}>
          <mesh position={[2.5, 1, 0]} ref={targetRef}>
            <sphereGeometry args={[0.2]} />
            <meshStandardMaterial color="#0FFEAE" />
          </mesh>
          <Text3D
            font="/SF Pro Rounded_Regular.json"
            size={0.5}
            height={0.0}
            curveSegments={12}
            position={[-0.2, -1, 0]}
            userData={{ text: true }}
          >
            I am the Target :{"("}
            <meshStandardMaterial color="#0FFEAE" />
          </Text3D>
          <Text3D
            font="/SF Pro Rounded_Regular.json"
            size={0.5}
            height={0.0}
            curveSegments={12}
            position={[1.2, -0.2, 0]}
            userData={{ text: true }}
          >
            Drag me
            <meshStandardMaterial color="#0FFEAE" />
          </Text3D>
        </group>
      </DragControls>
      {/* turret cone representation */}
      <PivotControls disableScaling scale={4} onDrag={handleDrag}>
        <group position={[0, 0, 0]} ref={turretRef}>
          <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius, radius]} />
            <meshStandardMaterial color="black" roughness={0.1} wireframe />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[radius, radius]} />
            <meshStandardMaterial color="black" roughness={0.1} wireframe />
          </mesh>
          {/**line right bottom */}
          {/* <line>
          <bufferGeometry setFromPoints={pointsRB} attach="geometry" />
          <lineBasicMaterial attach="material" color="black" linewidth={2} />
        </line> */}
          {/**line right bottom */}
          <Line points={points.rb} color="black" />
          {/**line right top */}
          <Line points={points.rt} color="black" />
          {/**line left bottom */}
          <Line points={points.lb} color="black" />
          {/**line left top */}
          <Line points={points.lt} color="black" />
          {/**line right height */}
          <Line points={points.rh} color="black" />
          {/**line left height */}
          <Line points={points.lh} color="black" />
          <Text3D
            font="/SF Pro Rounded_Regular.json"
            size={0.5}
            height={0.0}
            curveSegments={12}
            position={[-6, -1, 0]}
            userData={{ text: true }}
          >
            I am the Cannon :P
            <meshStandardMaterial color="#0FFEAE" />
          </Text3D>
          <Text3D
            font="/SF Pro Rounded_Regular.json"
            size={0.5}
            height={0.0}
            curveSegments={12}
            position={[-4.2, -0.2, 0]}
            userData={{ text: true }}
          >
            Drag me
            <meshStandardMaterial color="#0FFEAE" />
          </Text3D>
        </group>
      </PivotControls>
    </>
  );
}

function Scene() {
  return <ConcaveSurface />;
}

export default function Assignment4SceneA() {
  const [radius, setRadius] = useState(7);
  const [height, setHeight] = useState(3);
  const [range, setRange] = useState(0.5);
  return (
    <SceneContext.Provider
      value={{ radius: radius, height: height, range: range }}
    >
      <div className=" relative not-prose space-y-2">
        <div className="  bg-color-100 rounded-xl p-1 px-2 flex flex-col  gap-2 ">
          {/* <div className=" flex items-cente gap-2">
            <label htmlFor="volume">Use WASD to move</label>
          </div> */}
          <div className=" flex items-cente gap-2">
            <label htmlFor="r">Radius</label>
            <input
              type="range"
              id="r"
              name="r"
              min="1"
              max="100"
              step={1}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
            <p className=" border border-color-200 rounded p-0.5 w-10 text-center">
              {radius}
            </p>
          </div>
          <div className=" flex items-center gap-2">
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
          <div className=" flex items-center gap-2">
            <label htmlFor="ra">Range</label>
            <input
              type="range"
              id="ra"
              name="ar"
              min="0"
              max="1"
              step={0.05}
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            />
            <p className=" border border-color-200 rounded p-0.5 w-11 text-center">
              {range}
            </p>
          </div>
        </div>
        <SceneContainer
          height="500px"
          showGrid={false}
          cameraPosition={[0, 10, 35]}
          showGizmo={true}
          scene={Scene}
        />
      </div>
    </SceneContext.Provider>
  );
}
