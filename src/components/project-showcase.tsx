import { useRef } from "react";
import ShowcaseItem from "./showcase-item";
import type { Project } from "./showcase-item";

// Sample data (replace with actual data)
const projectData: Project[] = [
    {
        id: 1,
        title: "Pokemon City",
        description: "Designed and illustrated a digital banner for The Game Tree NZ to display on their Social Media and websites",
        image: "/pokemon-city.png",
        imgAlign: "full"
    },
    {
        id: 2,
        title: "Naylor Love Sign-in Monitor",
        description: "Description of Project 1 Lorem ipsum and stuff",
        image: "https://images.unsplash.com/photo-1737251043885-1fa62cb12933?q=80&w=3473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                {projectData.map((project) => (
                    <ShowcaseItem key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
