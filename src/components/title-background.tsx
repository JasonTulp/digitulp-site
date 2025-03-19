import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { backgroundCode } from '@/data/codeBackground';

interface TitleBackgroundProps {
    children?: React.ReactNode;
}

export const TitleBackground = ({ 
    children
}: TitleBackgroundProps) => {
    const [gradientAngle, setGradientAngle] = useState<number>(0);

    useEffect(() => {
        // Function to handle mouse movement
        const handleMouseMove = (event: any) => {
            const xPosition = event.clientX;
            const percent = (xPosition / window.innerWidth) * 2 - 1;
            const maxAngle = 10;
            setGradientAngle(maxAngle * percent);
        };

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
   
    return (
        <div
            className="h-[80vh] sm:h-[90vh] md:h-[100vh] relative z-0 flex items-center justify-center overflow-hidden"
            style={{background: `linear-gradient(${gradientAngle}deg, #d45d1e, #3b82f6)`}}
        >
            <div
                className="h-[90vw] w-[90vw] mt-[50vw] rounded-full relative z-1 items-center justify-center flex"
                style={{background: `linear-gradient(${-gradientAngle}deg, #d45d1e, #3b82f6)`}}
            >
                <div
                    className="h-[80vw] w-[80vw] mt-[25vw] rounded-full relative z-1"
                    style={{background: `linear-gradient(${-gradientAngle}deg, #d45d1e, #3b82f6)`}}
                >       
                    <div className=" mt-[25vw]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}; 