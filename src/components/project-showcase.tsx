import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    const [scrollPosition, setScrollPosition] = useState(0);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="w-full pt-16">
            <div className="flex flex-col items-center">
                {projectData.map((project, index) => {
                    // const offset = scrollPosition - 200 * index;  // Adjust to control the scroll distance to start animation
                    // const startPosition = Math.max(100 + offset, 100); // Ensure it doesn't go out of bounds
                    const initialPos = index % 2 === 0 ? "95%" : "-95%";
                    return (
                        // Outer div which spans entire screen
                        <div
                            key={project.id}
                            className="w-full text-white rounded-lg flex items-center bg-dark z-20 relative py-24"
                        >
                            <motion.div
                                initial={{x: initialPos}}
                                whileInView={{x: 0}}
                                transition={{duration: 0.3}}
                                viewport={{ once: true }}
                                className={"mx-36 w-full border-border bg-gradient-to-t to-mid from-transparent"}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-96 object-cover rounded-lg mb-4"
                                />
                                {/*<MaskedImage src={project.image} alt={project.title} className="w-full h-96 object-cover rounded-lg mb-4"/>*/}
                                <motion.h3
                                    className="text-xl font-semibold"
                                    initial={{y: 100, opacity: 0}}
                                    whileInView={{y: 0, opacity: 1}}
                                    transition={{duration: 0.5}}
                                    viewport={{ once: true }}
                                >
                                    {project.title}
                                </motion.h3>
                                <motion.p
                                    className="mt-2 text-sm"
                                    initial={{y: 100, opacity: 0}}
                                    whileInView={{y: 0, opacity: 1}}
                                    transition={{duration: 0.5}}
                                    viewport={{ once: true }}
                                >
                                    {project.description}
                                </motion.p>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
