"use client";
import HorizontalRule from "@/components/horizontal-rule";
import { motion } from "framer-motion";
import {useEffect, useState} from "react";

export default function Home() {
    const [circles, setCircles] = useState<{ id: number; x: number; y: number; z: number, size: number; animation_duration: number, opacity: number }[]>([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        console.log("Spawning circles");
        const numCircles = 100; // Number of circles
        const newCircles = Array.from({ length: numCircles }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * 300 - window.innerHeight / 4, // Adjust intersection area
            z: Math.random() * 100,
            size: Math.random() * 400 + 10,
            animation_duration: Math.random() * 10 + 5,
            opacity: Math.random(),
        }));
        setCircles(newCircles);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full min-h-[200vh] overflow-hidden bg-[url('/noise.png')] bg-repeat bg-cover">
            {/* Orange Section */}
            <div className="h-[100vh] bg-orange-500"></div>

            {/* Intersection with Random Circles */}
            <div className="relative h-0">
                {circles.map((circle) => {
                    const parallaxOffset = scrollY * (1 - (circle.size / 410)) * 0.3;
                    // return (
                    //     <div
                    //         key={circle.id}
                    //         className="absolute rounded-full bg-black"
                    //         style={{
                    //             width: circle.size,
                    //             height: circle.size,
                    //             left: circle.x,
                    //             top: circle.y - parallaxOffset,
                    //             opacity: circle.opacity, // Static opacity
                    //         }}
                    //     />
                    // );
                    const randomSize = Math.random() * 400 + 10;
                    return (
                        <motion.div
                            key={circle.id}
                            className="absolute rounded-full bg-black"
                            style={{
                                width: circle.size,
                                height: circle.size,
                                left: circle.x,
                                top: circle.y - parallaxOffset,
                                opacity: circle.opacity,
                                transformOrigin: "center",
                            }}
                            animate={{
                                // left: circle.x - Math.random() * randomSize,
                                width: randomSize,
                                height: randomSize,
                            }}
                            transition={{
                                duration: circle.animation_duration, // Time for size change
                                ease: "easeInOut",
                                repeat: Infinity, // Continuously animate
                                repeatType: "reverse",
                            }}
                        />
                    );
                })}
            </div>

            {/* Black Section */}
            <div className="h-[100vh] bg-black"></div>
        </div>
    );
}
