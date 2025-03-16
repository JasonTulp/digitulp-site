export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    link?: string;
    imgAlign?: "left" | "right" | "full";
} 