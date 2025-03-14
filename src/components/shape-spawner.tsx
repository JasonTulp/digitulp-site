"use client";
import {useEffect, useState} from "react";
import * as motion from "motion/react-client";

interface ShapeProps {
    fixedHeight?: number;
    shapeCount: number;
    minSize: number;
    maxSize: number;
    extraClassName?: string;
    maxOpacity?: number;
    parallaxMultiplier?: number;
    ySpread?: number;
    yOffset?: number;
}

// Interface for an individual shape
interface Shape {
    id: number;
    x: number;
    y: number;
    size: number;
    animation_duration: number;
    opacity: number;
}

export default function ShapeSpawner({ fixedHeight, shapeCount, minSize, maxSize, maxOpacity, parallaxMultiplier, ySpread, yOffset, extraClassName }: ShapeProps) {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [scrollYPos, setScrollYPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollYPos(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const spread = ySpread ?? 300;
        const offset = yOffset ?? window.innerHeight / 4;
        const opacity = maxOpacity ?? 1;
        const width = Math.max(window.innerWidth, 3840);
        const newShapes = Array.from({ length: shapeCount }, (_, i) => ({
            id: i,
            x: Math.random() * width * 1.2,
            y: Math.random() * spread - offset,
            size: Math.random() * (maxSize - minSize) + minSize,
            animation_duration: Math.random() * 10 + 10,
            opacity: Math.random() * opacity + 0.001,
        }));
        setShapes(newShapes);
    }, []);

    return (
        <div className="relative h-0">
            {shapes.map((shape) => {
                // Offset based on parallax
                const multiplier = parallaxMultiplier ?? 1;
                const height = fixedHeight ?? shape.size;
                const parallaxOffset = scrollYPos * (1 - (shape.size / maxSize)) * multiplier;
                const randomWidth = Math.random() * (maxSize - minSize) + minSize;
                const randomHeight = fixedHeight ?? randomWidth;
                const extra = extraClassName ?? "";
                const cName = "absolute rounded-full bg-dark " + extra;
                return (
                    <motion.div
                        key={shape.id}
                        className={cName}
                        style={{
                            width: shape.size,
                            height: height,
                            left: shape.x - shape.size / 2,
                            top: shape.y - parallaxOffset,
                            opacity: shape.opacity,
                        }}
                        animate={{
                            // left: shape.x - Math.random() * randomSize,
                            left: shape.x - randomWidth / 2,
                            width: randomWidth,
                            height: randomHeight,
                        }}
                        transition={{
                            duration: shape.animation_duration, // Time for size change
                            ease: "easeInOut",
                            repeat: Infinity, // Continuously animate
                            repeatType: "reverse",
                        }}
                    />
                );
            })}
        </div>
    );
}