import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Project } from "@/types/project";

interface ShowcaseItemProps {
    project: Project;
}

export default function ShowcaseItem({ project }: ShowcaseItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const elementRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: elementRef,
        offset: ["start end", "end start"]
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // md breakpoint is 768px
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (isExpanded && (latest > 0.6 || latest < 0.05)) {
                setIsExpanded(false);
            }
        });
        return () => unsubscribe();
    }, [isExpanded, scrollYProgress]);

    const imgAlign = isMobile ? "full" : (project.imgAlign ?? (project.id % 2 !== 0 ? "left" : "right")) as "left" | "right" | "full";
    let alignStr = "";
    if (project.imagePosition === "left") {
        alignStr = "object-left";
    } else if (project.imagePosition === "right") {
        alignStr = "object-right";
    }


    const smoothX = useSpring(
        useTransform(
            scrollYProgress,
            [0, 0.2, 0.5, 0.8, 1],
            project.id % 2 !== 0 
                ? ["-20%", "0%", "0%", "0%", "0%"]
                : ["20%", "0%", "0%", "0%", "0%"]
        ),
        {
            stiffness: 100,
            damping: 30,
            restDelta: 0.001
        }
    );

    const smoothOpacity = useSpring(
        useTransform(
            scrollYProgress,
            [0, 0.2, 0.5, 0.8, 1],
            [0, 1, 1, 1, 1]
        )
    );


    return (
        <div
            ref={elementRef}
            className="w-full text-white rounded-lg flex items-center  z-20 relative py-8 sm:py-12 lg:py-24"
        >
            <motion.div
                style={{ x: smoothX, opacity: smoothOpacity }}
                className={`mx-8 sm:mx-16 lg:mx-24 xl:mx-52 w-full`}>
                <div className={`flex ${isExpanded ? "flex-col" : imgAlign === "full" ? "flex-col" : "gap-4"} ${!isExpanded && imgAlign === "right" ? "flex-row-reverse" : "flex-row"}`}>
                    <div 
                        className={`${isExpanded || imgAlign === "full" ? "w-full" : "w-1/2"} relative`}
                    >
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            // onClick={() => setIsExpanded(!isExpanded)}
                            className={`w-full rounded-3xl cursor-pointer z-30 h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] 
                                ${
                                imgAlign === "full" 
                                    ? "max-h-[80vh] object-cover" 
                                    : `object-cover`
                                }
                                 ${alignStr}
                            `}
                            layoutId={`project-image-${project.id}`}
                            transition={{
                                layout: { duration: 0.3 }
                            }}
                            style={{
                                opacity: useTransform(scrollYProgress, [0, 0.5, 0.7, 1], [0.2, 1, 1, 0])
                            }}
                        />
                    </div>
                    {/* Border */}
                    {imgAlign !== "full"  && <div 
                        className={`
                            ${!isExpanded && (imgAlign === "right" ? "border-r-2" : "border-l-2")}
                            my-8 border-[#9e7790]
                        `}
                    />}
                    <motion.div 
                        className={`
                            ${imgAlign === "full" || isExpanded ? "w-full py-8" : "w-1/2 my-8 p-8"}
                             flex rounded-3xl backdrop-blur-sm z-20 flex-col justify-center
                        `}
                        style={{ 
                            y: useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [100, 0, 0, 0]),
                            opacity: useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [0, 1, 1, 0]),
                            scale: useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [0.9, 1, 1, 0.9])
                        }}
                    >
                        <motion.h3 
                            className="text-3xl font-semibold pb-4 text-[#9e7790]"
                            style={{
                                color: useTransform(scrollYProgress, [0, 1], ["#d45d1e", "#3f9de0"])
                            }}
                        >
                            {project.title}
                        </motion.h3>
                        <p className="mt-2 text-md pb-4">
                            {project.description}
                        </p>
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-blue-500 hover:text-blue-700">
                                View Project
                            </a>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
} 