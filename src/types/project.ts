export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    link?: string;
    // Position of image relative to text
    imgAlign?: "left" | "right" | "full";
    // Position of image in the immediate div
    imagePosition?: "left" | "right" | "center";
} 