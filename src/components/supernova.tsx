"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// This is the component that renders the actual points
function SupernovaPoints({ isExploding }: { isExploding: boolean }) {
    const ref = useRef<THREE.Points>(null!);

    // useMemo will cache the star positions so they don't get recalculated on every render
    const positions = useMemo(() => {
        const sphere = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const i3 = i * 3;
            const r = 1.5 + Math.random() * 1.5;
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            sphere[i3] = r * Math.sin(theta) * Math.cos(phi);
            sphere[i3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            sphere[i3 + 2] = r * Math.cos(theta);
        }
        return sphere;
    }, []);

    // This hook handles the animation
    useFrame((state, delta) => {
        if (!ref.current) return;

        // Default rotation
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;

        // Explosion logic
        if (isExploding) {
            const points = ref.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < points.length; i += 3) {
                const x = points[i];
                const y = points[i + 1];
                const z = points[i + 2];
                const length = Math.sqrt(x * x + y * y + z * z);

                // Move points outwards
                if (length > 0) {
                    points[i] += (x / length) * delta * 5.0;
                    points[i + 1] += (y / length) * delta * 5.0;
                    points[i + 2] += (z / length) * delta * 5.0;
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffa0e0"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
}

// This is the main component we export
export default function SupernovaCanvas({ isInteractive = false }) {
    const [isExploding, setIsExploding] = useState(false);

    // We need a key to force React to re-create the component on reset
    const [key, setKey] = useState(0);

    const handleExplodeClick = () => {
        setIsExploding(true);
    };

    const handleResetClick = () => {
        setIsExploding(false);
        setKey(prevKey => prevKey + 1); // Change key to force re-render
    };

    return (
        <div className="relative w-full h-full">
            <Canvas key={key} camera={{ position: [0, 0, 10] }}>
                <SupernovaPoints isExploding={isExploding} />
            </Canvas>
            {isInteractive && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4">
                    <button
                        onClick={handleExplodeClick}
                        disabled={isExploding}
                        className="px-4 py-2 bg-purple-600/70 backdrop-blur-sm rounded-full text-white disabled:opacity-50"
                    >
                        Trigger Explosion
                    </button>
                    <button
                        onClick={handleResetClick}
                        className="px-4 py-2 bg-gray-600/70 backdrop-blur-sm rounded-full text-white"
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}