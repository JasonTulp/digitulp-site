"use client";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const images = [
    "/images/image_1.jpg",
    "/images/image_1.jpg",
    "/images/image_1.jpg",
    "/images/image_1.jpg",
    "/images/image_1.jpg",
    "/images/image_1.jpg",
    "/images/image_1.jpg",
    "/noise.png",
];

// Image component
interface ScrollerImageProps {
    src: string;
    index: number;
    setIsHovering: (isHovering: boolean) => void;
}

function ScrollerImage({ src, index, setIsHovering }: ScrollerImageProps) {
    return (
        <motion.div 
            className="relative w-[300px] h-[300px] rounded-lg overflow-hidden"
            whileHover={{ 
                scale: 1.2,
                zIndex: 20
            }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            transition={{
                scale: {
                    duration: 0.4
                }
            }}
        >
            <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="300px"
            />
        </motion.div>
    );
}

export default function ImageScroller() {
    const [isHovering, setIsHovering] = useState(false);
    const [scope, animate] = useAnimate();
    const animationRef = useRef<any>(null);

    // Start animation only once
    useEffect(() => {
        // Create and store the animation
        animationRef.current = animate(scope.current, { x: "-50%" }, { 
            duration: 15, 
            ease: "linear", 
            repeat: Infinity,
            repeatType: "loop"
        });

        // Cleanup on unmount
        return () => {
            if (animationRef.current) {
                animationRef.current.stop();
            }
        };
    }, [animate, scope]); // Only run once on mount

    // Handle hover state changes
    useEffect(() => {
        if (!animationRef.current) return;
        
        if (isHovering) {
            // Pause the animation
            animationRef.current.speed = 0.1;
        } else {
            // Resume the animation
            animationRef.current.speed = 1;
        }
    }, [isHovering]);

    return (
        <div className="w-full overflow-x-hidden bg-transparent py-24 relative">
            {/* Left side blur gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10"></div>
            
            {/* Right side blur gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10"></div>
            
            <motion.div 
                ref={scope}
                className="flex gap-4 w-max"
            >
                {/* First set of images */}
                {images.map((src, index) => (
                    <ScrollerImage 
                        key={`first-${index}`}
                        src={src}
                        index={index}
                        setIsHovering={setIsHovering}
                    />
                ))}
                {/* Duplicate set for seamless loop */}
                {images.map((src, index) => (
                    <ScrollerImage 
                        key={`second-${index}`}
                        src={src}
                        index={index + images.length}
                        setIsHovering={setIsHovering}
                    />
                ))}
            </motion.div>
        </div>
    );
} 