import SceneContainer from "@/components/r3f/SceneContainer";
import {
  DragControls,
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

const SceneContext = createContext({
  outerRadius: 10,
  innerRadius: 1,
  type: "wedgeA",
  height: 5,
  range: 0.5,
  showMesh: false,
});

function LineSegment({
  points,
  color = "black",
}: {
  points: THREE.Vector3[];
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
    });
    const line = new THREE.Line(geometry, material);
    groupRef.current.add(line);
    return () => {
      groupRef.current?.remove(line);
      geometry.dispose();
      material.dispose();
    };
  }, [points, color]);

  return <group ref={groupRef} />;
}

function Turret() {
  const { outerRadius, height, range, type, innerRadius, showMesh } =
    useContext(SceneContext);
  const { camera, controls, scene, gl } = useThree();
  const gunRef = useRef<THREE.Object3D>(null);

  const orbitRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    scene.background = new THREE.Color("#ffffff");
  }, [scene]);

  // useEffect(() => {
  //   if (!turretRef.current) return;
  //   const tc = new TransformControls(camera, gl.domElement);
  //   tc.attach(turretRef.current);
  //   tc.addEventListener("dragging-changed", (e) => {
  //     if (orbitRef.current) orbitRef.current.enabled = !e.value;
  //   });
  //   tc.addEventListener("change", handleDrag);
  //   scene.add(tc.getHelper());

  //   // Press T for translate, R for rotate
  //   const onKey = (e: KeyboardEvent) => {
  //     if (e.key === "t") tc.setMode("translate");
  //     if (e.key === "r") tc.setMode("rotate");
  //   };
  //   window.addEventListener("keydown", onKey);

  //   return () => {
  //     window.removeEventListener("keydown", onKey);
  //     tc.removeEventListener("change", handleDrag);
  //     tc.detach();
  //     scene.remove(tc.getHelper());
  //     tc.dispose();
  //   };
  // }, [camera, gl, scene]);

  const targetRef = useRef<THREE.Object3D>(null);
  const turretRef = useRef<THREE.Object3D>(null);
  const tankRef = useRef<THREE.Object3D>(null);

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
      .multiplyScalar(outerRadius);
    const vleft: THREE.Vector3 = new THREE.Vector3(1, 0, 0)
      .multiplyScalar(p)
      .add(new THREE.Vector3(0, 0, 1).multiplyScalar(-x))
      .multiplyScalar(outerRadius);

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
  }, [range, outerRadius, height]);

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

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/cannon/tank1.gltf",
      (gltf) => {
        scene.add(gltf.scene);
        tankRef.current = gltf.scene;

        gunRef.current = gltf.scene.getObjectByName("gub_sphere") ?? null;
        tankRef.current.rotation.y = -Math.PI / 2;
        tankRef.current.scale.set(0.75, 0.75, 0.75);
        tankRef.current.position.set(3, -4, 0);
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

  useEffect(() => {
    if (!tankRef.current) return;

    tankRef.current.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.material.wireframe = showMesh;
        node.material.needsUpdate = showMesh; // Required for some materials
      }
    });
  }, [showMesh]);

  const moveSpeed = 0.1;

  useFrame(() => {
    if (!tankRef.current || !turretRef.current) return;

    const right = new THREE.Vector3();
    const forward = new THREE.Vector3();

    tankRef.current.matrixWorld.extractBasis(
      right,
      new THREE.Vector3(),
      forward
    );

    if (keys.current.w) {
      turretRef.current.position.addScaledVector(forward, -moveSpeed);
      tankRef.current.position.addScaledVector(forward, -moveSpeed);
    }
    if (keys.current.s) {
      turretRef.current.position.addScaledVector(forward, moveSpeed);
      tankRef.current.position.addScaledVector(forward, moveSpeed);
    }
    if (keys.current.a) {
      turretRef.current.position.addScaledVector(right, -moveSpeed);
      tankRef.current.position.addScaledVector(right, -moveSpeed);
    }
    if (keys.current.d) {
      turretRef.current.position.addScaledVector(right, moveSpeed);
      tankRef.current.position.addScaledVector(right, moveSpeed);
    }
    handleDrag();
  });

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
    let collision = false;

    switch (type) {
      case "wedgeA":
        {
          //inside height
          if (targetLVec.y < height && targetLVec.y > 0) {
            h = true;
          }

          //inside radius
          if (Math.hypot(targetLVec.x, targetLVec.z) < outerRadius) {
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
          collision = h && r && ra;
        }
        break;
      case "wedgeB":
        {
          //inside height
          if (targetLVec.y < height && targetLVec.y > 0) {
            h = true;
          }

          //inside radius
          const hypot = Math.hypot(targetLVec.x, targetLVec.z);
          if (hypot < outerRadius && hypot > innerRadius) {
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
          collision = h && r && ra;
        }
        break;
      case "sphere":
        {
          const turretWorld = new THREE.Vector3();
          const targettWorld = new THREE.Vector3();

          turretRef.current.getWorldPosition(turretWorld);
          targetRef.current.getWorldPosition(targettWorld);

          //inside radius
          if (turretWorld.distanceTo(targettWorld) < outerRadius) {
            r = true;
          }

          collision = r;
        }
        break;
      case "cone":
        {
          const targetWorld = new THREE.Vector3();
          targetRef.current.getWorldPosition(targetWorld);

          // Transform target into cone mesh's local space
          const coneMesh = turretRef.current;
          const targetLocal = coneMesh.worldToLocal(targetWorld.clone());

          // In local space, the cone geometry (after translate + rotateZ) has:
          // Apex at (0, 1.2, 0), base center at (outerRadius, 1.2, 0)
          // Axis along +X, cone height = outerRadius, base radius = height
          const apexLocal = new THREE.Vector3(0, 1.2, 0);
          const axisDir = new THREE.Vector3(1, 0, 0);
          const coneHeight = outerRadius;
          const baseRadius = height;

          const pointFromApex = targetLocal.clone().sub(apexLocal);
          const distAlongAxis = pointFromApex.dot(axisDir);

          // Check if point is between apex and base along the axis
          if (distAlongAxis < 0 || distAlongAxis > coneHeight) {
            break;
          }

          // Cone radius at this distance along the axis
          const radiusAtDist = (distAlongAxis / coneHeight) * baseRadius;

          // Perpendicular distance from the axis
          const projOnAxis = axisDir.clone().multiplyScalar(distAlongAxis);
          const perpDist = pointFromApex.clone().sub(projOnAxis).length();

          if (perpDist > radiusAtDist) {
            break;
          }

          collision = true;
        }
        break;
    }

    if (collision) {
      (
        (targetRef.current as THREE.Mesh).material as THREE.MeshStandardMaterial
      ).color.set("red");
      (
        (turretRef.current as THREE.Mesh).material as THREE.MeshStandardMaterial
      ).color.set("red");
    } else {
      (
        (targetRef.current as THREE.Mesh).material as THREE.MeshStandardMaterial
      ).color.set("#0FFEAE");
      (
        (turretRef.current as THREE.Mesh).material as THREE.MeshStandardMaterial
      ).color.set("green");
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
      {/* <PivotControls disableScaling scale={4} onDrag={handleDrag}> */}
      {/* <group position={[0, 0, 0]} ref={turretRef}>
          <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius, radius]} />
            <meshStandardMaterial color="black" roughness={0.1} wireframe />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[radius, radius]} />
            <meshStandardMaterial color="black" roughness={0.1} wireframe />
          </mesh>
          <LineSegment points={points.rb} color="black" />
          <LineSegment points={points.rt} color="black" />
          <LineSegment points={points.lb} color="black" />
          <LineSegment points={points.lt} color="black" />
          <LineSegment points={points.rh} color="black" />
          <LineSegment points={points.lh} color="black" />
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
        </group> */}
      {/* </PivotControls> */}
      <WedgeMesh
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        type={type}
        height={height}
        range={range}
        ref={turretRef}
      />
      <OrbitControls ref={orbitRef} makeDefault />
    </>
  );
}

function Scene() {
  return <Turret />;
}

export default function Assignment4SceneB() {
  const [outerRadius, setOuterRadius] = useState(20);
  const [innerRadius, setInnerRadius] = useState(1);
  const [height, setHeight] = useState(3);
  const [range, setRange] = useState(0.5);
  const [type, setType] = useState("cone");
  const [mesh, setMesh] = useState(false);
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
        <div className="  bg-color-100 rounded-xl p-1 px-2 flex flex-col  gap-2 ">
          <div className=" flex items-cente gap-2 font-bold text-lg">
            <label htmlFor="volume">Use W,A,S,D to move tank</label>
          </div>
          <div className=" flex items-cente gap-2">
            <label htmlFor="r">Show tank mesh</label>
            <input
              type="checkbox"
              id="m"
              name="m"
              checked={mesh}
              onChange={(e) => setMesh(e.currentTarget.checked)}
            />
            {/* <p className=" border border-color-200 rounded p-0.5 w-10 text-center">
              {mesh === true ? "yes" : "no"}
            </p> */}
          </div>
          <div className=" flex items-center gap-2">
            <label htmlFor="ra">Type</label>
            <select
              className=" h-8 bg-transparent border-[1px] border-color-250 rounded"
              id="t"
              value={type}
              onChange={(e) => setType(e.currentTarget.value)}
            >
              <option value="wedgeA">Wedge A</option>
              <option value="wedgeB">Wedge B</option>
              <option value="sphere">Sphere</option>
              <option value="cone">Cone</option>
            </select>
            {/* <p className=" border border-color-200 rounded p-0.5 w-11 text-center">
              {range}
            </p> */}
          </div>
          <div className=" flex items-cente gap-2">
            <label htmlFor="r">
              {(type === "wedgeA" || type === "sphere") && "Radius"}
              {type === "wedgeB" && "Max Radius"}
              {type === "cone" && "Length"}
            </label>
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
          {["wedgeB"].includes(type) && (
            <div className=" flex items-cente gap-2">
              <label htmlFor="r">Min Radius</label>
              <input
                type="range"
                id="r"
                name="r"
                min="1"
                max="100"
                step={1}
                value={innerRadius}
                onChange={(e) => setInnerRadius(Number(e.target.value))}
              />
              <p className=" border border-color-200 rounded p-0.5 w-10 text-center">
                {innerRadius}
              </p>
            </div>
          )}
          {!["sphere"].includes(type) && (
            <div className=" flex items-center gap-2">
              <label htmlFor="h">{type === "cone" ? "Radius" : "Height"}</label>
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
          )}
          {["wedgeA", "wedgeB"].includes(type) && (
            <div className=" flex items-center gap-2">
              <label htmlFor="ra">Range</label>
              <input
                type="range"
                id="ra"
                name="ra"
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
          )}
        </div>
        <Canvas
          className=" !size-full !h-[500px] border rounded-lg bg-white"
          shadows
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer({
              ...(props as WebGPURendererParameters),
              // forceWebGL: true,
            });
            await renderer.init();
            return renderer;
          }}
          camera={{ position: [-15, 10, 35] }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <Turret />
          {/* <Stats showPanel={1}/> */}
          {/* <Stats showPanel={2}/> */}
        </Canvas>
      </div>
    </SceneContext.Provider>
  );
}

function WedgeMesh({
  outerRadius,
  innerRadius,
  height,
  range,
  type,
  ref,
}: {
  outerRadius: number;
  innerRadius: number;
  height: number;
  range: number;
  type: string;
  ref: ForwardedRef<THREE.Object3D>;
}) {
  const geometry = useMemo(() => {
    const p = range;
    const x = Math.sqrt(1 - p * p);
    // Arc from right edge to left edge
    const angleRight = Math.atan2(x, p);
    const angleLeft = -angleRight;
    let geo = new THREE.ExtrudeGeometry();

    // Create the wedge shape (top-down cross-section as a 2D shape)
    const shape = new THREE.Shape();
    switch (type) {
      case "wedgeA":
        shape.moveTo(0, 0); // origin

        shape.lineTo(p * outerRadius, x * outerRadius);
        shape.absarc(0, 0, outerRadius, angleRight, angleLeft, true);
        shape.lineTo(0, 0);

        // Extrude upward to get the 3D wedge
        geo = new THREE.ExtrudeGeometry(shape, {
          depth: height,
          bevelEnabled: false,
        });

        // ExtrudeGeometry extrudes along Z, rotate so it goes along Y
        geo.rotateX(-Math.PI / 2);
        break;
      case "wedgeB":
        //move to innerRadius start point
        shape.moveTo(p * innerRadius, x * innerRadius);
        shape.absarc(0, 0, innerRadius, angleRight, angleLeft, true);
        shape.lineTo(p * outerRadius, -x * outerRadius);
        shape.absarc(0, 0, outerRadius, angleLeft, angleRight, false);
        shape.lineTo(p * innerRadius, x * innerRadius);

        // Extrude upward to get the 3D wedge
        geo = new THREE.ExtrudeGeometry(shape, {
          depth: height,
          bevelEnabled: false,
        });

        // ExtrudeGeometry extrudes along Z, rotate so it goes along Y
        geo.rotateX(-Math.PI / 2);
        break;
      case "sphere": {
        return new THREE.SphereGeometry(outerRadius);
      }
      case "cone": {
        const shape = new THREE.ConeGeometry(height, outerRadius);
        shape.translate(1.2, -(outerRadius / 2), 0);
        shape.rotateZ(Math.PI / 2);
        return shape;
      }
    }

    return geo;
  }, [outerRadius, height, range, type, innerRadius]);

  return (
    <mesh geometry={geometry} ref={ref} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="green"
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
        wireframe={false}
        shadowSide={THREE.FrontSide}
      />
    </mesh>
  );
}
