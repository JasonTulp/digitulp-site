"use client";
import {useCallback, useEffect, useState} from "react";
import * as motion from "motion/react-client";

interface ParticleProps {
    particleCount: number;
    minSize: number;
    maxSize: number;
    maxOpacity?: number;
    parallaxMultiplier?: number;
    ySpawn: number;
    maxYHeight: number;
    minLifetime: number;
    maxLifetime: number;
}

// Interface for an individual particle
interface Particle {
    x: number;
    y: number;
    endY: number;
    size: number;
    lifetime: number;
    opacity: number;
}

export default function ParticleSpawner({ particleCount, minSize, maxSize, maxOpacity, parallaxMultiplier, ySpawn, maxYHeight, minLifetime, maxLifetime }: ParticleProps) {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const opacity = maxOpacity ?? 1;
        const width = Math.max(window.innerWidth, 3840);
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            x: Math.random() * width * 1.2,
            y: ySpawn,
            endY: Math.random() * (maxYHeight - ySpawn) + ySpawn,
            size: Math.random() * (maxSize - minSize) + minSize,
            lifetime: Math.random() * maxLifetime + minLifetime,
            opacity: Math.random() * (opacity - 0.001) + 0.001,
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div className="relative h-0">
            {particles.map((particle, i) => {
                // Offset based on parallax
                const multiplier = parallaxMultiplier ?? 1;
                // const parallaxOffset = scrollY * (1 - (particle.size / maxSize)) * multiplier;

                return (
                    <motion.div
                        key={"particle" + i}
                        className={"absolute rounded-full bg-dark"}
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: particle.x - particle.size / 2,
                            top: particle.y,
                            opacity: particle.opacity + 0.01,
                        }}
                        animate={{
                            // left: particle.x - Math.random() * randomSize,
                            opacity: [0.01, particle.opacity, particle.opacity, 0.01],
                            top: particle.y - particle.endY,
                        }}
                        transition={{
                            duration: particle.lifetime, // Time for size change
                            // ease: "easeInOut",
                            repeat: Infinity, // Continuously animate
                            repeatType: "loop",
                        }}
                    />
                );
            })}
        </div>
    );
}