import { Project } from "@/types/project";

const gameProjects: Project[] = [
    {
        id: 1,
        title: "Kiwi Ingenuity",
        description: "Kiwi Ingenuity is an upcoming, open world 3D puzzle platformer game and is my most ambitious project to date. I am planning on a Steam release in 2026.",
        image: "/KiwiIngenuity.jpeg",
    },
    {
        id: 2,
        title: "Little Space Game",
        description: "Little Space Game is a game where the player explores an infinite procedural galaxy filled with mineable planets and resources. Build your rocket from unlockable parts and construct machinery on planets to expand your reach through the universe.",
        image: "/lsg-demo.gif",
    },
    {
        id: 3,
        title: "Hex Defence",
        description: "Hex Defense is a take on a tower defence game set on a procedurally generated hexagonal grid where you fight endless waves of alien enemies.",
        image: "/hex-defence.gif",
    },
    {
        id: 4,
        title: "Fuse Cube",
        description: "Fuse Cube is a small mobile game that I developed and released on the Google Play Store. It is a 3D take on the classic 2048 puzzle game.",
        image: "/FuseCube.gif",
    },
];

export default gameProjects; 