"use client";
import HorizontalRule from "@/components/horizontal-rule";
import {useEffect, useState} from "react";
import * as motion from "motion/react-client"

export default function Home() {
    const [circles, setCircles] = useState<{ id: number; x: number; y: number; size: number; animation_duration: number, opacity: number }[]>([]);
    const [pillars, setPillars] = useState<{ id: number; x: number; y: number; size: number; animation_duration: number, opacity: number }[]>([]);
    const [backPillars, setBackPillars] = useState<{ id: number; x: number; y: number; size: number; animation_duration: number, opacity: number }[]>([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        console.log("Spawning pillars");
        const numPillars = 50; // Number of circles
        const newPillars = Array.from({ length: numPillars }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth * 1.2,
            y: Math.random() * 300 - window.innerHeight / 4, // Adjust intersection area
            size: Math.random() * 400 + 10,
            animation_duration: Math.random() * 10 + 10,
            opacity: Math.random(),
        }));
        setPillars(newPillars);
    }, []);

    useEffect(() => {
        console.log("Spawning back pillars");
        const numPillars = 20; // Number of circles
        const newPillars = Array.from({ length: numPillars }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth * 1.2,
            y: Math.random() * 300 - window.innerHeight * 1/2, // Adjust intersection area
            size: Math.random() * 600 + 400,
            animation_duration: Math.random() * 10 + 10,
            opacity: Math.random() * 0.05,
        }));
        setBackPillars(newPillars);
    }, []);

    useEffect(() => {
        console.log("Spawning circles");
        const numCircles = 20; // Number of circles
        const newCircles = Array.from({ length: numCircles }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth * 1.2,
            y: Math.random() * 300 - window.innerHeight / 4, // Adjust intersection area
            size: Math.random() * 30 + 5,
            animation_duration: Math.random() * 10 + 10,
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
        // <div className="w-full min-h-[200vh] overflow-hidden bg-[url('/noise.png')] bg-repeat bg-[length:200px_200px] opacity-5 ">
        <div className="w-full min-h-[200vh] overflow-hidden">
            {/* Orange Section */}
            <div className="h-[100vh] bg-gradient-to-b to-primary from-yellow-300">
                <div className="flex flex-col items-center justify-center h-full ">
                    <h1 className="text-8xl font-bold text-white">DIGITULP Ltd</h1>
                    <hr className="border-t-2 border-white m-4 w-[600px]" />
                    <h2 className="text-3xl font-bold text-white text-opacity-70">Tech Solutions | Web Design | Digital Art</h2>
                </div>
            </div>


            {/* Intersection with Random Pillars */}
            <div className="relative h-0">
                {backPillars.map((pillar) => {
                    const parallaxOffset = scrollY * (1 - (pillar.size / 410)) * 0.5;

                    const randomSize = Math.random() * 800 + 400;
                    return (
                        <motion.div
                            key={pillar.id}
                            className="absolute rounded-full bg-dark"
                            style={{
                                width: pillar.size,
                                height: 1000,
                                left: pillar.x - pillar.size / 2,
                                top: pillar.y - parallaxOffset,
                                opacity: pillar.opacity,
                            }}
                            animate={{
                                // left: pillar.x - Math.random() * randomSize,
                                left: pillar.x - randomSize / 2,
                                width: randomSize,
                                height: 1000,
                            }}
                            transition={{
                                duration: pillar.animation_duration, // Time for size change
                                ease: "easeInOut",
                                repeat: Infinity, // Continuously animate
                                repeatType: "reverse",
                            }}
                        />
                    );
                })}
            </div>


            {/* Intersection with Random Pillars */}
            <div className="relative h-0">
                {pillars.map((pillar) => {
                    const parallaxOffset = scrollY * (1 - (pillar.size / 410)) * 0.5;

                    const randomSize = Math.random() * 400 + 10;
                    return (
                        <motion.div
                            key={pillar.id}
                            className="absolute rounded-full bg-dark"
                            style={{
                                width: pillar.size,
                                height: 1000,
                                left: pillar.x - pillar.size / 2,
                                top: pillar.y - parallaxOffset,
                                opacity: pillar.opacity,
                            }}
                            animate={{
                                // left: pillar.x - Math.random() * randomSize,
                                left: pillar.x - randomSize / 2,
                                width: randomSize,
                                height: 1000,
                            }}
                            transition={{
                                duration: pillar.animation_duration, // Time for size change
                                ease: "easeInOut",
                                repeat: Infinity, // Continuously animate
                                repeatType: "reverse",
                            }}
                        />
                    );
                })}
            </div>

            <div className="relative h-0">
                {circles.map((circle) => {
                    const parallaxOffset = scrollY * (1 - (circle.size / 30));

                    const randomSize = Math.random() * 20 + 10;
                    return (
                        <motion.div
                            key={circle.id}
                            className="absolute rounded-full bg-dark"
                            style={{
                                width: circle.size,
                                height: circle.size,
                                left: circle.x - circle.size / 2,
                                top: circle.y - parallaxOffset,
                                opacity: circle.opacity,
                            }}
                            animate={{
                                // left: circle.x - Math.random() * randomSize,
                                left: circle.x - randomSize / 2,
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
            <div className="h-[10vh] bg-gradient-to-t from-dark to-primary"></div>
            <div className="h-[100vh] bg-dark"></div>
        </div>
    );
}
