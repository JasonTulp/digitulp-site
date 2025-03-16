"use client";
import HorizontalRule from "@/components/horizontal-rule";
import {useEffect, useState} from "react";
import * as motion from "motion/react-client"
import ShapeSpawner from "@/components/shape-spawner";
import Title from "@/components/title";
import ParticleSpawner from "@/components/particle-spawner";
import ProjectShowcase from "@/components/project-showcase";
import ImageScroller from "@/components/image-scroller";
import SubHeader from "@/components/sub-header";

// Import project data
import codeProjects from "@/data/codeProjects";
import webProjects from "@/data/webProjects";
import artProjects from "@/data/artProjects";
import { imageSet1, imageSet2 } from "@/data/images";
import gameProjects from "@/data/gameProjects";

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
        <div className="w-full min-h-[200vh] overflow-hidden bg-dark">
            {/* Orange Section - Gradient Background (z-index: 0 - at the very back) */}
            <div
                className="h-[100vh] relative z-0"
                style={{background: `linear-gradient(${gradientAngle}deg, #d45d1e, #3b82f6)`}}
            >
                <Title />
            </div>

            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.3}}
                viewport={{ once: true }}
                className="relative"
            >
                {/*Clouds (z-index: 1)*/}
                <ShapeSpawner zIndex={1} colour={"#FFFFFF"} maxOpacity={0.1} shapeCount={30} minSize={400} maxSize={700} parallaxMultiplier={0.5} fixedHeight={1000} yOffset={windowHeight + 1000}/>

                {/*Back Pillars (z-index: 2)*/}
                <ShapeSpawner zIndex={2} maxOpacity={0.06} shapeCount={20} minSize={400} maxSize={600} parallaxMultiplier={0.5} fixedHeight={1000} yOffset={windowHeight * 0.5}/>
                
                {/*Normal Pillars (z-index: 3)*/}
                <ShapeSpawner zIndex={3} maxOpacity={1} shapeCount={100} minSize={10} maxSize={410} parallaxMultiplier={0.5} fixedHeight={1000}/>
                
                {/*Little circles (z-index: 4)*/}
                <ParticleSpawner maxOpacity={1} particleCount={60} minSize={1} maxSize={20} ySpawn={0} maxYHeight={windowHeight * 0.4} maxLifetime={10} minLifetime={5}/>
            </motion.div>

            {/* Background colourful ones */}
            <ShapeSpawner colour={"#d45d1e"} zIndex={25}colourAdjust={"#3b82f6"} shapeCount={100} maxOpacity={0.2} minSize={10} maxSize={110} parallaxMultiplier={0.5} ySpread={windowHeight * 10}  yOffset={-windowHeight}fixedHeight={500} />
          
            {/* Black Section */}
            <div className="h-28 -mt-28 w-full bg-gradient-to-t from-dark to-transparent z-10 relative"></div>
            
            {/* Sticky gradient blur */}
            <div className="fixed top-0 z-25 w-full h-16 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
            <div className="h-32"></div>
            <div className="relative z-30">
                <SubHeader 
                    title="SOFTWARE" 
                    description="Check out some of my past freelance work"
                />
                <ProjectShowcase projects={codeProjects}/>
            </div>
            <div className="relative z-30">
                <SubHeader 
                    title="GAME DEV" 
                    description="Below are some of my Game Development projects"
                />
                <ProjectShowcase projects={gameProjects} />
            </div>
            <div className="relative z-30">
                <SubHeader 
                    title="DIGITAL ART" 
                    description="Explore my visual work and creative experiments"
                />
                <ImageScroller direction="left" images={imageSet1.concat(imageSet2)} baseDuration={1} />
                {/* <ImageScroller direction="left" images={imageSet2} baseDuration={2.3} /> */}
                <ProjectShowcase projects={artProjects} />
            </div>
            {/* <div className="flex items-center h-[100vh] bg-dark z-20 relative"></div> */}

        </div>
    );
}
