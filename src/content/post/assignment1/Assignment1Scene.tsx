import SceneContainer from "@/components/r3f/SceneContainer";
import { DragControls, Line, Text3D } from "@react-three/drei";
import { useRef } from "react";
import { useMemo } from "react";
import { Group, MeshBasicMaterial, Vector3 } from "three";

function circlePoints(radius: number, segments: number): Vector3[] {
  const points: Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      new Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    );
  }
  return points;
}
const RADIUS = 1;
const PLAYER_RADIUS = 0.05;

function Scene() {
  const dangerGroupRef = useRef<Group>(null);
  const playerGroupRef = useRef<Group>(null);
  const playerMatRef = useRef<MeshBasicMaterial>(null);
  const points = useMemo(() => circlePoints(RADIUS, 64), []);

  const dangerPos = new Vector3();
  const playerPos = new Vector3();

  function checkCollision() {
    if (
      !dangerGroupRef.current ||
      !playerGroupRef.current ||
      !playerMatRef.current
    )
      return;
    dangerGroupRef.current.getWorldPosition(dangerPos);
    playerGroupRef.current.getWorldPosition(playerPos);
    const distance = dangerPos.distanceTo(playerPos);
    playerMatRef.current.color.set(distance <= RADIUS + PLAYER_RADIUS ? "red" : "green");
  }

  return (
    <>
      <DragControls
        dragLimits={[undefined, undefined, [0, 0]]}
        onDrag={checkCollision}
      >
        <group ref={dangerGroupRef} position={[0, 0, 0]}>
          <Text3D
            font="/SF Pro Rounded_Regular.json"
            size={0.1}
            height={0.0}
            curveSegments={12}
            position={[-0.2, -0.2, 0]}
          >
            Danger
            <meshStandardMaterial color="red" />
          </Text3D>
          <Line points={points} color="#e05555" lineWidth={1} />
          <mesh>
            <circleGeometry args={[RADIUS, 64]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>
      </DragControls>
      <DragControls
        dragLimits={[undefined, undefined, [0, 0]]}
        onDrag={checkCollision}
      >
        <group ref={playerGroupRef} position={[2, 2, 0]}>
          <Text3D
            font="/SF Pro Rounded_Regular.json"
            size={0.1}
            height={0.0}
            curveSegments={12}
            position={[-0.2, -0.2, 0]}
          >
            Player
            <meshStandardMaterial color="yellow" />
          </Text3D>
          <mesh>
            <circleGeometry args={[PLAYER_RADIUS, 64]} />
            <meshBasicMaterial ref={playerMatRef} color="green" />
          </mesh>
        </group>
      </DragControls>
    </>
  );
}

export default function Assignment1Scene() {
  return (
    <SceneContainer
      height="500px"
      cameraPosition={[0, 0, 5]}
      showGizmo={true}
      scene={Scene}
    />
  );
}
