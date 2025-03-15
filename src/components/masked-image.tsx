import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MaskedImageProps {
    src: string;
    alt: string;
    gridSize?: number; // Controls square density (default: 80px)
}

export default function MaskedImage({ src, alt, gridSize = 100 }: MaskedImageProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [size, setSize] = useState<{width: number, height: number}>({width: 0, height: 0});

    // Get image dimensions after it loads
    useEffect(() => {
        const updateSize = () => {
            if (imgRef.current) {
                setSize({
                    width: imgRef.current.clientWidth,
                    height: imgRef.current.clientHeight,
                });
                console.log("New size: " + imgRef.current.clientWidth + " ' " + imgRef.current.clientHeight);
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Calculate number of squares dynamically
    const cols = Math.ceil(size.width / gridSize);
    const rows = Math.ceil(size.height / gridSize);
    const totalSquares = cols * rows;

    return (
        <div className="relative w-full">
            {/* Background Image */}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="w-full h-auto object-cover rounded-lg"
                onLoad={() => setSize({
                    width: imgRef.current?.clientWidth || 0,
                    height: imgRef.current?.clientHeight || 0
                })}
            />

            {/* Overlay Grid of Squares */}
            <div className="absolute inset-0 grid" style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}>
                {Array.from({ length: totalSquares }).map((_, index) => {
                    const delay = Math.random() * 0.5; // Random fade-out delay
                    const duration = Math.random() * 0.3;

                    return (
                        <motion.div
                            key={index}
                            className="bg-dark w-auto h-auto "
                            initial={{ opacity: 1 }}
                            whileInView={{ opacity: 0 }}
                            transition={{ duration, delay }}
                            viewport={{ once: true }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
