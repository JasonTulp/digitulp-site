"use client";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import HorizontalRule from "./horizontal-rule";
import defaultImages from "@/data/images";

// Image component
interface ScrollerImageProps {
    src: string;
    index: number;
    setIsHovering: (isHovering: boolean) => void;
}

function ScrollerImage({ src, index, setIsHovering }: ScrollerImageProps) {
    return (
        <motion.div 
            className="relative w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-lg overflow-hidden"
            style={{ zIndex: 40 }}
            whileHover={{ 
                scale: 1.2,
                zIndex: 50
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

interface ImageScrollerProps {
    direction?: 'left' | 'right';
    images?: string[];
    baseDuration?: number;
}

export default function ImageScroller({ direction = 'left', images = defaultImages, baseDuration = 2 }: ImageScrollerProps) {
    const [isHovering, setIsHovering] = useState(false);
    const [scope, animate] = useAnimate();
    const animationRef = useRef<any>(null);

    const duration = images.length * baseDuration * 2;

    // Start animation only once
    useEffect(() => {
        // Create and store the animation
        const xValue = direction === 'left' ? "-50%" : "50%";
        
        animationRef.current = animate(scope.current, { x: xValue }, { 
            duration: duration, 
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
    }, [animate, scope, direction]); // Run when direction changes

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
        <div className="w-full overflow-x-hidden bg-transparent relative">
            {/* Left side blur gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-16 md:w-24 lg:w-48 bg-gradient-to-r from-dark to-transparent" style={{ zIndex: 60 }}></div>
            
            {/* Right side blur gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-16 md:w-24 lg:w-48 bg-gradient-to-l from-dark to-transparent" style={{ zIndex: 60 }}></div>
            <HorizontalRule/>
             
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
            <HorizontalRule/>
        </div>
    );
} 