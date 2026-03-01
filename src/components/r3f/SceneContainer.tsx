import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useThemeColors } from "./helpers/ThemeColors";
import type { ComponentType } from "react";

type SceneContainerProps = {
	height?: string;
	className?: string;
	cameraPosition?: [number, number, number];
	cameraFov?: number;
	enableOrbitControls?: boolean;
	autoRotate?: boolean;
	autoRotateSpeed?: number;
	showGrid?: boolean;
	gridSize?: number;
	gridDivisions?: number;
	showAxes?: boolean;
	showGizmo?: boolean;
	ambientIntensity?: number;
	directionalIntensity?: number;
	directionalPosition?: [number, number, number];
	scene?: ComponentType;
};

export default function SceneContainer({
	height = "450px",
	className = "",
	cameraPosition = [5, 5, 5],
	cameraFov = 50,
	enableOrbitControls = true,
	autoRotate = false,
	autoRotateSpeed = 1.0,
	showGrid = true,
	gridSize = 10,
	gridDivisions = 10,
	showAxes = true,
	showGizmo = true,
	ambientIntensity = 0.6,
	directionalIntensity = 1.2,
	directionalPosition = [5, 8, 5] as [number, number, number],
	scene: Scene,
}: SceneContainerProps) {
	const colors = useThemeColors();

	return (
		<div
			className={`not-prose ${className}`}
			style={{
				height,
				width: "100%",
				borderRadius: "0.5rem",
				overflow: "hidden",
				border: "1px solid var(--theme-special-lighter)",
			}}
		>
			<Canvas
				camera={{ position: cameraPosition, fov: cameraFov }}
				style={{ background: colors.bg }}
				dpr={[1, 2]}
				shadows
			>
				<ambientLight intensity={ambientIntensity} />
				<directionalLight
					position={directionalPosition}
					intensity={directionalIntensity}
					castShadow
				/>

				{showGrid && (
					<Grid
						args={[gridSize, gridDivisions]}
						cellColor={colors.gridPrimary}
						sectionColor={colors.gridSection}
						infiniteGrid
						fadeDistance={gridSize * 2}
						rotation={[Math.PI / 2, 0, 0]} // Rotate around the X-axis
					/>
				)}

				{showAxes && <axesHelper args={[2]} />}

				{Scene && <Scene />}

				{enableOrbitControls && (
					<OrbitControls
						makeDefault
						autoRotate={autoRotate}
						autoRotateSpeed={autoRotateSpeed}
					/>
				)}

				{showGizmo && (
					<GizmoHelper alignment="bottom-right" margin={[80, 80]}>
						<GizmoViewport />
					</GizmoHelper>
				)}
			</Canvas>
		</div>
	);
}
