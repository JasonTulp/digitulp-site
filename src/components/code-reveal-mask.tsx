import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { backgroundCode } from '@/data/codeBackground';

interface CodeRevealMaskProps {
    codeText: string;
    maskSize?: number; // diameter of the reveal circle in pixels
    className?: string;
    children?: React.ReactNode;
}

export const CodeRevealMask = ({ 
    className = "",
    children
}: CodeRevealMaskProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [containerBounds, setContainerBounds] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateBounds = () => {
            if (containerRef.current) {
                const bounds = containerRef.current.getBoundingClientRect();
                setContainerBounds({ x: bounds.left, y: bounds.top });
            }
        };

        updateBounds();
        window.addEventListener('resize', updateBounds);
        window.addEventListener('scroll', updateBounds);

        return () => {
            window.removeEventListener('resize', updateBounds);
            window.removeEventListener('scroll', updateBounds);
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const newPos = {
            x: e.clientX - containerBounds.x,
            y: e.clientY - containerBounds.y
        };
        setMousePos(newPos);
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -10000, y: 0 });
    };

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden min-h-[500px] ${className}`}
        >
            {/* Base layer - visible content */}
            <div className="w-full h-full">
                {children}
            </div>

            {/* Code layer with mask */}
            <div 
                className="absolute inset-0"
                style={{
                    clipPath: `circle(180px at ${mousePos.x}px ${mousePos.y}px)`
                }}
            >
                <pre className="text-primary text-opacity-20 whitespace-pre-wrap font-mono text-sm lg:text-xl xl:text-2xl px-2 lg:px-36 xl:px-56 overflow-hidden h-full p-4">
                    {backgroundCode}
                </pre>
            </div>
        </div>
    );
}; 