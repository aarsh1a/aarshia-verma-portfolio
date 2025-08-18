"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- CSS for the Aurora ---
const auroraStyle = `
  .aurora-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
  }

  @keyframes aurora-anim {
    0% { transform: translate(-50%, -50%) rotate(0deg) scale(1.5); opacity: 0.4; }
    50% { transform: translate(-50%, -50%) rotate(180deg) scale(2); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) rotate(360deg) scale(1.5); opacity: 0.4; }
  }

  .aurora-container::before, .aurora-container::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120vmax;
    height: 120vmax;
    border-radius: 50%;
    animation: aurora-anim 25s linear infinite;
  }

  .aurora-container::before {
    background-image: radial-gradient(circle, rgba(0, 255, 255, 0.5) 0%, rgba(173, 216, 230, 0) 60%);
  }

  .aurora-container::after {
    background-image: radial-gradient(circle, rgba(255, 105, 180, 0.5) 0%, rgba(75, 0, 130, 0) 60%);
    animation-delay: -12s;
  }
`;

// --- Component for a single shooting star ---
function Star() {
    const ref = useRef<THREE.Mesh>(null!);

    const [x, y, z, speed] = useMemo(() => {
        const x = THREE.MathUtils.randFloatSpread(20);
        const y = THREE.MathUtils.randFloat(5, 15); // Start above the screen
        const z = THREE.MathUtils.randFloatSpread(5);
        const speed = THREE.MathUtils.randFloat(0.05, 0.15);
        return [x, y, z, speed];
    }, []);

    useFrame(() => {
        if (ref.current) {
            ref.current.position.y -= speed;
            if (ref.current.position.y < -10) {
                ref.current.position.y = 10; // Reset to the top
            }
        }
    });

    return (
        <mesh ref={ref} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
        </mesh>
    );
}

// --- Main component that controls the effect ---
interface StarryNightProps {
    isActive: boolean;
}

export const StarryNight = ({ isActive }: StarryNightProps) => {
    if (!isActive) {
        return null; // Don't render anything if not active
    }

    return (
        <>
            {/* Inject the Aurora CSS */}
            <style>{auroraStyle}</style>
            {/* Render the Aurora background */}
            <div className="aurora-container" />

            {/* Render the Shooting Stars Canvas */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1, // Above the aurora but behind content
                    pointerEvents: "none",
                }}
            >
                <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                    {Array.from({ length: 100 }).map((_, i) => (
                        <Star key={i} />
                    ))}
                </Canvas>
            </div>
        </>
    );
};