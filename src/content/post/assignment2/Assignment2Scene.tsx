import SceneContainer from "@/components/r3f/SceneContainer";
import { PivotControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SceneContext = createContext({ hops: 5, seed: 42 });

function createConcaveSurface(
  seed = 92,
  numPoints = 32,
  baseRadius = 2.5,
  bumpAmplitude = 0.2,
  bumpFrequency = 10
) {
  // Seeded random for deterministic bumps
  function seededRandom(s: number) {
    const x = Math.sin(s * 9301 + 49297) * 49297;
    return x - Math.floor(x);
  }

  // Generate random bump offsets
  const bumpOffsets: number[] = [];
  for (let i = 0; i < bumpFrequency * 2; i++) {
    bumpOffsets.push(seededRandom(seed + i) * Math.PI * 2);
  }

  // Create open curve points with bumps (leave a gap on one side)
  const openingAngle = Math.PI * 0.2; // size of the opening
  const startAngle = openingAngle / 2;
  const endAngle = Math.PI * 2 - openingAngle / 2;
  const arcRange = endAngle - startAngle;

  const curvePoints: THREE.Vector3[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = startAngle + (i / numPoints) * arcRange;
    let r = baseRadius;

    // Add multiple sinusoidal bumps at different frequencies
    for (let j = 0; j < bumpFrequency; j++) {
      const amp = bumpAmplitude * (0.3 + 0.7 * seededRandom(seed + j + 100));
      const freq = 2 + Math.floor(seededRandom(seed + j + 200) * 5);
      r += amp * Math.sin(freq * t + (bumpOffsets[j] ?? 0));
    }

    // Ensure minimum radius so surface stays concave
    r = Math.max(r, 1.0);

    curvePoints.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0));
  }

  return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
}

function ConcaveSurface() {
  const { hops, seed } = useContext(SceneContext);
  const geometry = useMemo(() => {
    const curve = createConcaveSurface(seed);
    const segments = 128;
    const halfHeight = 0.5; // wall extends ±0.5 in Z
    const pts = curve.getPoints(segments);

    // Build a flat wall: for each curve point, create top and bottom vertices
    const vertices: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]!;
      // Bottom vertex
      vertices.push(p.x, p.y, -halfHeight);
      // Top vertex
      vertices.push(p.x, p.y, halfHeight);
    }

    // Create quad faces between consecutive pairs
    for (let i = 0; i < pts.length - 1; i++) {
      const bl = i * 2; // bottom-left
      const tl = i * 2 + 1; // top-left
      const br = (i + 1) * 2; // bottom-right
      const tr = (i + 1) * 2 + 1; // top-right

      // Two triangles per quad
      indices.push(bl, br, tl);
      indices.push(tl, br, tr);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [seed]);

  const surfaceMeshRef = useRef<THREE.Mesh>(null);
  const sphereMeshRef = useRef<THREE.Mesh>(null);
  const cylinderGroupRef = useRef<THREE.Group>(null);
  const hitMarkersRef = useRef<THREE.Group>(null);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const direction = useMemo(() => new THREE.Vector3(-1, 0, 0), []);
  const { scene } = useThree();
  // Pre-allocate buffer for max possible points (hops + 2: origin + hops hits + 1 escape)
  const MAX_POINTS = 102;
  const lineObject = useMemo(() => {
    const positions = new Float32Array(MAX_POINTS * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setDrawRange(0, 0);
    const mat = new THREE.LineBasicMaterial({ color: "red" });
    return new THREE.Line(geo, mat);
  }, []);

  useFrame(() => {
    if (!cylinderGroupRef.current) return;

    // Get world position and rotation of the cylinder group
    const rayOrigin = new THREE.Vector3();
    cylinderGroupRef.current.getWorldPosition(rayOrigin);

    const quaternion = new THREE.Quaternion();
    cylinderGroupRef.current.getWorldQuaternion(quaternion);
    let rayDir = direction.clone().applyQuaternion(quaternion);

    // Collect raycast targets
    const targets: THREE.Object3D[] = [];
    scene.traverse((obj) => {
      if (obj.userData.raycastTarget) targets.push(obj);
    });

    // Bounce the ray up to `hops` times
    const points: THREE.Vector3[] = [rayOrigin.clone()];
    let currentOrigin = rayOrigin.clone();
    let currentDir = rayDir.clone().normalize();

    for (let i = 0; i < hops; i++) {
      raycaster.set(currentOrigin, currentDir);
      raycaster.near = 0.1; // skip very close self-intersections
      raycaster.far = Infinity;
      const intersects = raycaster.intersectObjects(targets, false);

      if (intersects.length > 0) {
        const hit = intersects[0]!;
        points.push(hit.point.clone());

        if (!hit.face) break; // no face normal available

        // Reflect direction: r = d - 2(d·n)n
        const normal = hit.face.normal.clone();
        // Transform normal from object local space to world space
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(
          hit.object.matrixWorld
        );
        normal.applyMatrix3(normalMatrix).normalize();

        // Ensure normal faces against the incoming ray (flip if hitting back face)
        if (currentDir.dot(normal) > 0) {
          normal.negate();
        }

        const d = currentDir.dot(normal);
        currentDir = currentDir
          .clone()
          .sub(normal.clone().multiplyScalar(2 * d))
          .normalize();

        // Move origin to the hit point for the next ray
        currentOrigin = hit.point.clone();
      } else {
        // No hit — extend ray and stop bouncing
        points.push(
          currentOrigin.clone().add(currentDir.clone().multiplyScalar(20))
        );
        break;
      }
    }

    // Update line geometry buffer in place
    const lineGeo = lineObject.geometry;
    const posAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < points.length; i++) {
      posAttr.setXYZ(i, points[i]!.x, points[i]!.y, points[i]!.z);
    }
    posAttr.needsUpdate = true;
    lineGeo.setDrawRange(0, points.length);
    lineGeo.computeBoundingSphere();

    // Place yellow spheres at each bounce point
    if (hitMarkersRef.current) {
      const markers = hitMarkersRef.current.children;
      // points[0] is origin, bounce hits are points[1..n-1] (last might be escape)
      // Show markers at indices 1 to points.length-2 (actual surface hits)
      const bouncePoints = points.slice(
        1,
        points.length <= hops + 1 ? points.length : points.length - 1
      );
      for (let i = 0; i < markers.length; i++) {
        if (i < bouncePoints.length) {
          markers[i]!.position.copy(bouncePoints[i]!);
          markers[i]!.visible = true;
        } else {
          markers[i]!.visible = false;
        }
      }
    }
  });

  return (
    <>
      <mesh
        ref={surfaceMeshRef}
        geometry={geometry}
        userData={{ raycastTarget: true }}
      >
        <meshStandardMaterial
          color="#3399ff"
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        ref={sphereMeshRef}
        position={[0, 0, 0]}
        userData={{ raycastTarget: true }}
        rotation={[0, 0, Math.PI / 3]}
      >
        <boxGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#3399ff"
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ray line */}
      <primitive object={lineObject} />

      {/* Hit point markers — one per possible bounce */}
      <group ref={hitMarkersRef}>
        {Array.from({ length: MAX_POINTS }, (_, i) => (
          <mesh key={i} visible={false}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="yellow" />
          </mesh>
        ))}
      </group>

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        scale={0.6}
        activeAxes={[true, true, false]}
        disableScaling
      >
        <group ref={cylinderGroupRef} position={[2, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 1, 64]} />
            <meshStandardMaterial
              color="white"
              roughness={0.4}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </PivotControls>
    </>
  );
}

function Scene() {
  return <ConcaveSurface />;
}

export default function Assignment2Scene() {
  const [hops, setHops] = useState(5);
  const [seed, setSeed] = useState(42);
  return (
    <SceneContext.Provider value={{ hops, seed }}>
      <div className=" relative not-prose space-y-2">
        <div className="  bg-color-100 rounded-xl p-1 px-2 flex flex-col  gap-2 ">
          <div className=" flex items-cente gap-2">
            <label htmlFor="volume">Laser hops</label>
            <input
              type="range"
              id="volume"
              name="volume"
              min="1"
              max="100"
              step={1}
              value={hops}
              onChange={(e) => setHops(Number(e.target.value))}
            />
            <p className=" border border-color-200 rounded p-0.5 w-10 text-center">{hops}</p>
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
            <p className=" border border-color-200 rounded p-0.5 w-10 text-center">{seed}</p>
          </div>
        </div>
        <SceneContainer
          height="500px"
          showGrid={false}
          cameraPosition={[0, 0, 12]}
          showGizmo={true}
          scene={Scene}
        />
      </div>
    </SceneContext.Provider>
  );
}
