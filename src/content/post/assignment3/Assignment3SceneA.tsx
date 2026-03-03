import SceneContainer from "@/components/r3f/SceneContainer";
import { PivotControls } from "@react-three/drei";
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

const SceneContext = createContext({ hops: 5, seed: 42 });

function ConcaveSurface() {
  const { hops, seed } = useContext(SceneContext);
  const terrainWidth = 25;
  const terrainDepth = 25;

  const geometry = useMemo(() => {
    // 2. Create Geometry (Plane)
    // Using a high number of segments (e.g., 100x100) is crucial for smooth waves
    const segments = 10;
    const geometry = new THREE.PlaneGeometry(
      terrainWidth,
      terrainDepth,
      segments,
      segments
    );
    geometry.rotateX(-Math.PI / 2); // Rotate to lie flat (XZ plane)

    // 3. Manipulate Vertices with Sine Wave
    const vertices = geometry.attributes.position?.array;

    if (!vertices) return;

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]!;
      const z = vertices[i + 2]!; // In Three.js, z is the depth axis

      // Use multiple sine waves to create complex, varying heights
      // y = sin(x) * amp1 + cos(z) * amp2
      const wave1 = (Math.cos(x * 0.2) * 2 * seed) / 100;
      const wave2 = Math.cos(z * 0.3) * 1.5;
      const wave3 = Math.cos((x + z) * 0.1) * 1;

      vertices[i + 1] = wave1 + wave2 + wave3; // Set the Y height
    }
    geometry.computeVertexNormals(); // Smooth out lighting

    return geometry;
  }, [seed]);

  const surfaceMeshRef = useRef<THREE.Mesh>(null);
  const turretRef = useRef<THREE.Group>(null);
  const keys = useRef<{ w: boolean; a: boolean; s: boolean; d: boolean }>({
    w: false,
    a: false,
    s: false,
    d: false,
  });
  const moveSpeed = 0.05;
  const rotationLerpFactor = 0.05;
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const halfWidth = terrainWidth / 2;
  const halfDepth = terrainDepth / 2;

  useEffect(() => {
    document.body.addEventListener("keydown", function (e) {
      const key = e.code.replace("Key", "").toLowerCase();
      if (
        keys.current &&
        keys.current[key as keyof typeof keys.current] !== undefined
      )
        keys.current[key as keyof typeof keys.current] = true;
    });

    document.body.addEventListener("keyup", function (e) {
      const key = e.code.replace("Key", "").toLowerCase();
      if (
        keys.current &&
        keys.current[key as keyof typeof keys.current] !== undefined
      )
        keys.current[key as keyof typeof keys.current] = false;
    });

    return () => {
      document.body.removeEventListener("keydown", function (e) {
        const key = e.code.replace("Key", "").toLowerCase();
        if (
          keys.current &&
          keys.current[key as keyof typeof keys.current] !== undefined
        )
          keys.current[key as keyof typeof keys.current] = true;
      });

      document.body.removeEventListener("keyup", function (e) {
        const key = e.code.replace("Key", "").toLowerCase();
        if (
          keys.current &&
          keys.current[key as keyof typeof keys.current] !== undefined
        )
          keys.current[key as keyof typeof keys.current] = false;
      });
    };
  }, []);

  const { camera, controls } = useThree();

  useFrame(() => {
    if (!surfaceMeshRef.current || !turretRef.current) return;

    // Get camera's forward direction projected onto the XZ plane
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    // Right vector is perpendicular to forward on the XZ plane
    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    // Save position before movement to compute delta
    const prevPos = turretRef.current.position.clone();

    if (keys.current.w) {
      turretRef.current.position.addScaledVector(forward, moveSpeed);
    }
    if (keys.current.s) {
      turretRef.current.position.addScaledVector(forward, -moveSpeed);
    }
    if (keys.current.a) {
      turretRef.current.position.addScaledVector(right, -moveSpeed);
    }
    if (keys.current.d) {
      turretRef.current.position.addScaledVector(right, moveSpeed);
    }

    // Clamp position within plane bounds
    turretRef.current.position.x = THREE.MathUtils.clamp(
      turretRef.current.position.x,
      -halfWidth,
      halfWidth
    );
    turretRef.current.position.z = THREE.MathUtils.clamp(
      turretRef.current.position.z,
      -halfDepth,
      halfDepth
    );

    // Move camera and orbit target by the same delta so camera follows turret
    const delta = turretRef.current.position.clone().sub(prevPos);
    camera.position.add(delta);
    const orbitControls = controls as any;
    if (orbitControls?.target) {
      orbitControls.target.add(delta);
    }

    // Raycast downward to stick turret to terrain surface
    raycaster.set(
      new THREE.Vector3(
        turretRef.current.position.x,
        50,
        turretRef.current.position.z
      ),
      new THREE.Vector3(0, -1, 0)
    );
    const hits = raycaster.intersectObject(surfaceMeshRef.current);
    if (hits.length > 0) {
      turretRef.current.position.y = hits[0]!.point.y;

      // Tilt turret to match terrain normal + rotate to face away from camera
      const normal = hits[0]!.face!.normal.clone().normalize();
      const yawAngle = Math.atan2(-forward.x, -forward.z) + Math.PI / 2;

      // Quaternion to align up vector with terrain normal
      const tiltQuat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        normal
      );
      // Quaternion for yaw rotation around Y
      const yawQuat = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        yawAngle
      );
      // Combine: first apply yaw, then tilt
      const targetQuat = tiltQuat.multiply(yawQuat);

      // Smoothly interpolate toward target orientation
      turretRef.current.quaternion.slerp(targetQuat, rotationLerpFactor);
    }
  });

  return (
    <>
      {/**plane */}
      {geometry && (
        <mesh
          ref={surfaceMeshRef}
          geometry={geometry}
          userData={{ raycastTarget: true }}
        >
          <meshStandardMaterial
            color="green"
            roughness={0.6}
            metalness={0.5}
            side={2}
          />
        </mesh>
      )}
      {/* turret */}
      <group position={[0, 5, 0]} ref={turretRef}>
        <mesh>
          <sphereGeometry args={[2, , , , , , 1.55]} translate={[0, -2, 0]} />
          <meshStandardMaterial
            color="#EED761"
            metalness={0.4}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[1.5, 1.5, 0]}>
          <boxGeometry args={[3]} />
          <meshStandardMaterial
            color="#EED761"
            metalness={0.4}
            roughness={0.1}
          />
        </mesh>
      </group>
    </>
  );
}

function Scene() {
  return <ConcaveSurface />;
}

export default function Assignment3SceneA() {
  const [hops, setHops] = useState(5);
  const [seed, setSeed] = useState(42);
  return (
    <SceneContext.Provider value={{ hops, seed }}>
      <div className=" relative not-prose space-y-2">
        <div className="  bg-color-100 rounded-xl p-1 px-2 flex flex-col  gap-2 ">
          <div className=" flex items-cente gap-2">
            <label htmlFor="volume">Use WASD to move</label>
            {/* <input
              type="range"
              id="volume"
              name="volume"
              min="1"
              max="100"
              step={1}
              value={hops}
              onChange={(e) => setHops(Number(e.target.value))}
            />
            <p className=" border border-color-200 rounded p-0.5 w-10 text-center">
              {hops}
            </p> */}
          </div>
          <div className=" flex items-center gap-2">
            <label htmlFor="volume">Change plane curves</label>
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="100"
              step={1}
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
            />
            <p className=" border border-color-200 rounded p-0.5 w-10 text-center">
              {seed}
            </p>
          </div>
        </div>
        <SceneContainer
          height="500px"
          showGrid={false}
          cameraPosition={[0, 15, 30]}
          showGizmo={true}
          scene={Scene}
        />
      </div>
    </SceneContext.Provider>
  );
}
