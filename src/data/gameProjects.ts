import { Project } from "@/types/project";

const gameProjects: Project[] = [
    {
        id: 1,
        title: "Kiwi Ingenuity",
        description: "Kiwi Ingenuity is an upcoming 3D puzzle platformer game that I am developing solo in Unity.",
        image: "/KiwiIngenuity.jpeg",
    },
    {
        id: 2,
        title: "Little Space Game",
        description: "Little Space Game is a solo game project I developed in Unity. The player explores an infinite procedural galaxy filled with mineable planets and resources. Build your rocket from unlockable parts and construct machinery on planets to expand your reach through the universe.",
        image: "/lsg-demo.gif",
    },
    {
        id: 3,
        title: "Hex Defence",
        description: "Hex defense was a prototype I developed in Unity. It's a take on a tower defence game set on a procedurally generated hexagonal grid.",
        image: "/hex-defence.gif",
    },
    {
        id: 4,
        title: "Fuse Cube",
        description: "Fuse Cube was a small mobile game that I developed and released on the Google Play Store.",
        image: "/FuseCube.gif",
    },
];

export default gameProjects; 