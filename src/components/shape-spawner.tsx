"use client";
import {useEffect, useState} from "react";
import * as motion from "motion/react-client";

const isMobile = () => {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

// Color utility functions
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
};

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const interpolateColor = (startColor: string, endColor: string, ratio: number) => {
    const startRgb = hexToRgb(startColor);
    const endRgb = hexToRgb(endColor);
    
    const r = Math.round(startRgb.r + ratio * (endRgb.r - startRgb.r));
    const g = Math.round(startRgb.g + ratio * (endRgb.g - startRgb.g));
    const b = Math.round(startRgb.b + ratio * (endRgb.b - startRgb.b));
    
    return rgbToHex(r, g, b);
};

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
    colour?: string; // start colour
    colourAdjust?: string; // End colour, if specified will choose random from gradient
    zIndex?: number; // Control the stacking order
}

// Interface for an individual shape
interface Shape {
    id: number;
    x: number;
    y: number;
    size: number;
    animation_duration: number;
    opacity: number;
    colour: string;
}

export default function ShapeSpawner({ fixedHeight, shapeCount, minSize, maxSize, maxOpacity, parallaxMultiplier, ySpread, yOffset, extraClassName, colour, colourAdjust, zIndex = 0 }: ShapeProps) {
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
        const width = isMobile() ? window.innerWidth : Math.max(window.innerWidth, 3840);
        const count = isMobile() ? Math.floor((window.innerWidth / 3840) * shapeCount) : shapeCount;
        let shapeColour = colour ?? "#0b0d0f";

        const newShapes = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * width * 1.2,
            y: Math.random() * spread - offset,
            size: Math.random() * (maxSize - minSize) + minSize,
            animation_duration: Math.random() * 10 + 10,
            opacity: Math.random() * opacity + 0.001,
            colour: colourAdjust 
                ? interpolateColor(shapeColour, colourAdjust, Math.random()) 
                : shapeColour,
        }));
        setShapes(newShapes);
    }, []);

    return (
        <div className="relative h-0" style={{ zIndex }}>
            {shapes.map((shape) => {
                // Offset based on parallax
                const multiplier = parallaxMultiplier ?? 1;
                const height = fixedHeight ?? shape.size;
                const parallaxOffset = scrollYPos * (1 - (shape.size / maxSize)) * multiplier;
                const randomWidth = Math.random() * (maxSize - minSize) + minSize;
                const randomHeight = fixedHeight ?? randomWidth;
                const extra = extraClassName ?? "";
                const cName = "absolute rounded-full " + extra;

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
                            backgroundColor: shape.colour,
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