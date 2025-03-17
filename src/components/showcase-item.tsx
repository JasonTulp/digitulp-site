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

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (isExpanded && (latest > 0.6 || latest < 0.05)) {
                setIsExpanded(false);
            }
        });
        return () => unsubscribe();
    }, [isExpanded, scrollYProgress]);

    const imgAlign = (project.imgAlign ?? (project.id % 2 !== 0 ? "left" : "right")) as "left" | "right" | "full";

    const smoothX = useSpring(
        useTransform(
            scrollYProgress,
            [0, 0.2, 0.5, 0.8, 1],
            project.id % 2 !== 0 
                ? ["-15%", "0%", "0%", "0%", "0%"]
                : ["15%", "0%", "0%", "0%", "0%"]
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
            className="w-full text-white rounded-lg flex items-center  z-20 relative py-24"
        >
            <motion.div
                style={{ x: smoothX, opacity: smoothOpacity }}
                className={`${isExpanded ? "mx-4" : "mx-36"} w-full`}>
                <div className={`flex ${isExpanded ? "flex-col" : imgAlign === "full" ? "flex-col" : "gap-4"} ${!isExpanded && imgAlign === "right" ? "flex-row-reverse" : "flex-row"}`}>
                    <div 
                        className={`${isExpanded || imgAlign === "full" ? "w-full" : "w-1/2"} relative`}
                    >
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            // onClick={() => setIsExpanded(!isExpanded)}
                            className={`w-full rounded-lg cursor-pointer 
                                ${
                                isExpanded || imgAlign === "full" 
                                    ? "max-h-[80vh] object-contain" 
                                    : "h-[500px] object-cover"
                                }
                                ${project.imageClassName}
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
                    <div className={
                        `
                            ${!isExpanded && (imgAlign === "right" ? "border-r-4" : "border-l-4")}
                            border-border 
                        `
                    }></div>
                    <motion.div 
                        className={`
                            ${imgAlign === "full" || isExpanded ? "mt-4" : ""}
                            ${imgAlign === "full" || isExpanded ? "w-full" : "w-1/3"}
                             flex p-8 backdrop-blur-sm flex-col justify-center ${isExpanded ? "mx-36" : "mx-0"}
                        `}
                        style={{ 
                            y: useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [100, 0, 0, -100]),
                            opacity: useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [0, 1, 1, 0]),
                            scale: useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [0.9, 1, 1, 0.9])
                        }}
                    >
                        <h3 className="text-3xl font-semibold text-[#9e7790]">
                            {project.title}
                        </h3>
                        <p className="mt-2 text-sm">
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