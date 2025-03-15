"use client";
import HorizontalRule from "@/components/horizontal-rule";
import {useEffect, useState} from "react";
import * as motion from "motion/react-client"
import ShapeSpawner from "@/components/shape-spawner";
import Title from "@/components/title";
import ParticleSpawner from "@/components/particle-spawner";
import ProjectShowcase from "@/components/project-showcase";

export default function Home() {
    const [gradientAngle, setGradientAngle] = useState<number>(0);
    const [windowHeight, setWindowHeight] = useState(1000); // Default value for SSR

    useEffect(() => {
        setWindowHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        // Function to handle mouse movement
        const handleMouseMove = (event: any) => {
            const xPosition = event.clientX;
            const percent = (xPosition / window.innerWidth) * 2 - 1;
            const maxAngle = 10;

            setGradientAngle(maxAngle * percent);
        };

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        // <div className="w-full min-h-[200vh] overflow-hidden bg-[url('/noise.png')] bg-repeat bg-[length:200px_200px] opacity-5 ">
        <div className="w-full min-h-[200vh] overflow-hidden">
            {/* Orange Section */}

            {/*<div className="h-[100vh] bg-gradient-to-b to-primary from-yellow-300">*/}
            <div
                className={`h-[100vh]`}
                style={{background: `linear-gradient(${gradientAngle}deg, #d45d1e, #3b82f6)`}}
            >
                <Title />
            </div>

            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.3}}
                viewport={{ once: true }}
            >
                {/*Clouds*/}
                <ShapeSpawner extraClassName={"!bg-white"} maxOpacity={0.1} shapeCount={30} minSize={400} maxSize={700} parallaxMultiplier={0.5} fixedHeight={1000} yOffset={windowHeight + 1000}/>

                {/*Back Pillars*/}
                <ShapeSpawner  maxOpacity={0.06} shapeCount={20} minSize={400} maxSize={600} parallaxMultiplier={0.5} fixedHeight={1000} yOffset={windowHeight * 0.5}/>
                {/*Normal Pillars*/}
                <ShapeSpawner maxOpacity={1} shapeCount={100} minSize={10} maxSize={410} parallaxMultiplier={0.5} fixedHeight={1000}/>
                {/*Little circles*/}
                <ParticleSpawner maxOpacity={1} particleCount={60} minSize={1} maxSize={20} ySpawn={0} maxYHeight={windowHeight * 0.4} maxLifetime={10} minLifetime={5}/>

            </motion.div>

            {/* Black Section */}
            <div className="h-28 -mt-28 w-full bg-gradient-to-t from-dark to-transparent"></div>
            <ProjectShowcase />
            {/* <div className="flex items-center h-[100vh] bg-dark z-20 relative"></div> */}


        </div>
    );
}
