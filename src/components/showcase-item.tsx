import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// An individual project item
export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    imgAlign?: "left" | "right" | "full";
}

interface ShowcaseItemProps {
    project: Project;
}

export default function ShowcaseItem({ project }: ShowcaseItemProps) {
    const elementRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: elementRef,
        offset: ["start end", "end start"]
    });

    const imgAlign = (project.imgAlign ?? (project.id % 2 === 0 ? "left" : "right")) as "left" | "right" | "full";

    const smoothX = useSpring(
        useTransform(
            scrollYProgress,
            [0, 0.2, 0.5, 0.8, 1],
            project.id % 2 === 0 
                ? ["15%", "0%", "0%", "0%", "0%"]
                : ["-15%", "0%", "0%", "0%", "0%"]
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
            className="w-full text-white rounded-lg flex items-center bg-dark z-20 relative py-24"
        >
            <motion.div
                style={{ x: smoothX, opacity: smoothOpacity }}
                className="mx-36 w-full">
                <div className={`flex ${imgAlign === "full" ? "flex-col" : "gap-4"} ${imgAlign === "right" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`${imgAlign === "full" ? "w-full" : "w-2/3"}`}>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    </div>
                    <motion.div 
                        className={`
                            ${imgAlign === "full" ? "mt-4" : ""}
                            ${imgAlign === "right" ? "border-r-2 pr-4" : "border-l-2 pl-4"}
                            ${imgAlign === "full" ? "w-full" : "w-1/3"}
                            border-border flex flex-col justify-center
                        `}
                        style={{ 
                            y: useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [100, 0, 0, 0]),
                            opacity: useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 1])
                        }}
                    >
                        <h3 className="text-xl font-semibold">
                            {project.title}
                        </h3>
                        <p className="mt-2 text-sm">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
} 