import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MaskedImage from "@/components/masked-image";

// Sample data (replace with actual data)
const projectData = [
    {
        id: 2,
        title: "Pokemon City",
        description: "Designed and illustrated a digital banner for The Game Tree NZ to display on their Social Media and websites",
        image: "/pokemon-city.png"
    },
    {
        id: 1,
        title: "Naylor Love Sign-in Monitor",
        description: "Description of Project 1 Lorem ipsum and shit. Wagwan papi",
        image: "https://images.unsplash.com/photo-1737251043885-1fa62cb12933?q=80&w=3473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { id: 3, title: "Project 3", description: "Description of Project 3", image: "https://via.placeholder.com/200" },
    { id: 4, title: "Project 4", description: "Description of Project 4", image: "https://via.placeholder.com/200" },
    { id: 5, title: "Project 5", description: "Description of Project 5", image: "https://via.placeholder.com/200" },
    { id: 6, title: "Project 6", description: "Description of Project 6", image: "https://via.placeholder.com/200" },
];

export default function ProjectShowcase() {
    const containerRef = useRef(null);
    
    return (
        <div className="w-full pt-16" ref={containerRef}>
            <div className="flex flex-col items-center">
                {projectData.map((project, index) => {
                    const elementRef = useRef(null);
                    const { scrollYProgress } = useScroll({
                        target: elementRef,
                        offset: ["start end", "end start"]
                    });
                    
                    const smoothX = useSpring(
                        useTransform(
                            scrollYProgress,
                            [0, 0.2, 0.5, 0.8, 1],
                            ["95%", "0%", "0%", "0%", "-95%"]
                        ),
                        {
                            stiffness: 200,
                            damping: 30,
                            restDelta: 0.001
                        }
                    );

                    return (
                        <div
                            key={project.id}
                            ref={elementRef}
                            className="w-full text-white rounded-lg flex items-center bg-dark z-20 relative py-24"
                        >
                            <motion.div
                                style={{ x: smoothX }}
                                className={"mx-36 w-full border-border bg-gradient-to-t to-mid from-transparent"}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-96 object-cover rounded-lg mb-4"
                                />
                                <div className="border-l-2 border-white/20 pl-4">
                                    <motion.h3
                                        className="text-xl font-semibold"
                                        style={{ 
                                            y: useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [100, 0, 0, 0]),
                                            opacity: useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0])
                                        }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <motion.p
                                        className="mt-2 text-sm"
                                        style={{ 
                                            y: useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [100, 0, 0, 0]),
                                            opacity: useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0])
                                        }}
                                    >
                                        {project.description}
                                    </motion.p>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
