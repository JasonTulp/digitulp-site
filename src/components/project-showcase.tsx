import { useRef } from "react";
import ShowcaseItem from "./showcase-item";
import { Project } from "@/types/project";

// Import default projects (for backward compatibility)
import codeProjects from "@/data/codeProjects";

interface ProjectShowcaseProps {
    projects?: Project[];
    title?: string;
}

export default function ProjectShowcase({ projects = codeProjects, title }: ProjectShowcaseProps) {
    const containerRef = useRef(null);
    
    return (
        <div className="w-full pt-16" ref={containerRef}>
            {title && (
                <h2 className="text-3xl font-bold text-center mb-8 text-text z-10">{title}</h2>
            )}
            <div className="flex flex-col items-center">
                {projects.map((project) => (
                    <ShowcaseItem key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
