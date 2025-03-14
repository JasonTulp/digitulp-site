"use client";

import {useEffect, MouseEvent, useRef, useState, useCallback} from "react";
import * as motion from "motion/react-client";

export default function Title() {
    const [relativeMousePos, setRelativeMousePos] = useState<number[] | null>(null);
    const titleText = "DIGITULP";
    const [windowWidth, setWindowWidth] = useState(1000); // Default value for SSR

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isMobile = () => {
        return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    };

    const onHover = (event: MouseEvent<HTMLHeadingElement>) => {
        if (isMobile()) {
            setRelativeMousePos(null);
            return;
        }
        const target = event.currentTarget;
        const position = target.getBoundingClientRect();
        const x = position.left + position.width / 2
        const y = position.top + position.height / 2
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const relativeMouseY = (mouseY - position.top) / (position.bottom - position.top);
        const relativeMouseX = (mouseX - position.left) / (position.right - position.left);
        setRelativeMousePos([relativeMouseX, relativeMouseY]);
    }

    const calculateParameter = useCallback((min: number, max: number, index: number): number => {
        const maxXDistance = 0.2;
        if (relativeMousePos === null) return min;
        const indexPercent = index / titleText.length;
        const distance = Math.abs(indexPercent - relativeMousePos[0]);
        // const distance = Math.abs(Math.sqrt((indexPercent - relativeMousePos[0])^2 + (0 -relativeMousePos[1])^2));
        if (distance < maxXDistance) {
            const percentOfMax = (maxXDistance - distance) / maxXDistance;
            const yPercent = 1 - Math.abs((relativeMousePos[1] - 0.5));
            return percentOfMax * yPercent * (max - min) + min;
        }
        return min;
    }, [relativeMousePos])


    const calculateCharSize = useCallback((min: number, max: number, index: number): number => {
        const width = windowWidth;
        // Adjust text size based on screen size
        let multiplier = getTextMultiplier(windowWidth);

        return calculateParameter(min * multiplier, max * multiplier, index);
    }, [calculateParameter, windowWidth])

    const getTextMultiplier = (width: number) => {
        let multiplier = 1;
        if (width < 640) multiplier = 0.6; // sm
        else if (width < 768) multiplier = 0.8; // md
        else if (width < 1024) multiplier = 0.9; // lg
        return multiplier
    }

    return (
        <div className="flex flex-col items-center justify-center h-full ">
            <div
                className={"flex relative items-center h-28 cursor-default"}
                onMouseMove={(event) => onHover(event)}
                onMouseLeave={() => setRelativeMousePos(null)}
            >
                {titleText.split("").map((l, i) => (
                    <div key={i}>
                        <motion.h1
                            className={`font-bold text-white font-chango z-20 relative`}
                            // style={{ fontSize: `${calculateLetterSize(i)}rem` }}
                            style={{ fontSize: `${getTextMultiplier(windowWidth) * 7}rem` }}
                            animate={{
                                fontSize: `${calculateCharSize(7, 9, i)}rem`,
                            }}
                            transition={{
                                duration: 0.1,
                            }}
                        >
                            {l}
                        </motion.h1>
                        <motion.h1
                            className={`font-bold text-black font-chango -mt-24 sm:-mt-32 md:-mt-36 lg:-mt-40 z-10 relative`}
                            // style={{ fontSize: `${calculateLetterSize(i)}rem` }}
                            style={{
                                fontSize: `${getTextMultiplier(windowWidth) * 7}rem`,
                                filter: `blur(0px)`,
                                opacity: 0,
                            }}
                            animate={{
                                fontSize: `${calculateCharSize(7, 9, i)}rem`,
                                opacity: `${calculateParameter(0.3, 0.1, i)}`,
                                filter: `blur(${calculateParameter(0, 10, i)}px)`
                            }}
                            transition={{
                                duration: 1,
                            }}
                        >
                            {l}
                        </motion.h1>
                    </div>
                ))}
            </div>
            <hr className="border-t-2 border-white z-20 -mt-2 sm:mt-1 md:mt-2 lg:mt-4 w-[420px] sm:w-[560px] md:w-[630px] lg:w-[700px]" />
            <div className={"flex relative items-center font-bold text-white text-opacity-70 mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl z-50"}>
                <motion.h2
                    className="text-white cursor-pointer"
                    initial={{color: "#FFFFFF", scale: 1}}
                    whileHover={{ color: "#f97316", scale: 1.2, margin: "0 1rem" }}
                    transition={{ duration: 0.2 }}
                    layout
                >
                    Tech Solutions
                </motion.h2>
                <h2 className={"mx-2"}>|</h2>
                <motion.h2
                    className="text-white cursor-pointer"
                    initial={{color: "#FFFFFF", scale: 1}}
                    whileHover={{ color: "#f97316", scale: 1.2, margin: "0 1rem" }}
                    transition={{ duration: 0.2 }}
                    layout
                >
                    Web Design
                </motion.h2>
                <h2 className={"mx-2"}>|</h2>
                <motion.h2
                    className="text-white cursor-pointer"
                    initial={{color: "#FFFFFF", scale: 1}}
                    whileHover={{ color: "#f97316", scale: 1.2, margin: "0 1rem" }}
                    transition={{ duration: 0.2 }}
                    layout
                >
                    Digital Art
                </motion.h2>
            </div>
        </div>
    );
}