import { Project } from "@/types/project";

const codeProjects: Project[] = [
    {
        id: 1,
        title: "Naylor Love Sign-in Monitor",
        description: "This sign in monitor was created to help Naylor Love keep track of their employee sign in times using Gallagher turnstiles. The turnstils would automatically send data to the monitor which would then let the site managers filter and easily see who was on site at what time.",
        image: "/naylor-love-sign-in.jpeg",
        link: "https://github.com/JasonTulp/naylor-love-sign-in-monitor"
    },
    {
        id: 2,
        title: "Interpreted Programming Language",
        description: "I developed an Abstract Syntax Tree Interpreted language in Rust to further solidify my programming knowledge.",
        link: "https://github.com/JasonTulp/AST-interpreter",
        image: "/JASN_AST_3.png",
        imagePosition: "left" 
    },
    { 
        id: 3, 
        title: "Resonate", 
        description: "I led the development of an experimental generative art project that would create abstract pieces of art based on a user selected word.", 
        link: "https://www.resonate.gallery/",
        image: "/ResonateRedGif.gif" 
    },
    { 
        id: 4, 
        title: "FLUF Character Generator", 
        description: "During the development of the FLUF NFT collection, I created the generation algorithm that was used to generate the 10,000 unique characters. We were one of the first to achieve such high quality assets in the NFT space due to a combination of manual curation and complex algorithms.", 
        link: "https://www.fluf.world/",
        image: "/fluf_blender.png" 
    },
    // { 
    //     id: 5, 
    //     title: "AIFA Character Generator", 
    //     description: "Description of Project 5", 
    //     link: "https://aifa.football/",
    //     image: "/aifa.webp",
    //     imgAlign: "full"
    // },
];

export default codeProjects; 