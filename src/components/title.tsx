"use client";

import {useEffect, MouseEvent, useRef, useState, useCallback} from "react";
import * as motion from "motion/react-client";

export default function Title() {
    const [relativeMousePos, setRelativeMousePos] = useState<number[] | null>(null);
    const titleText = "DIGITULP";

    const onHover = (event: MouseEvent<HTMLHeadingElement>) => {
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
                            style={{ fontSize: `7rem` }}
                            animate={{
                                fontSize: `${calculateParameter(7, 9, i)}rem`,
                            }}
                            transition={{
                                duration: 0.1,
                            }}
                        >
                            {l}
                        </motion.h1>
                        <motion.h1
                            className={`font-bold text-black font-chango -mt-40  z-10 relative`}
                            // style={{ fontSize: `${calculateLetterSize(i)}rem` }}
                            style={{
                                fontSize: `7rem`,
                                filter: `blur(${calculateParameter(0, 10, i)}px)`,
                                opacity: 0,
                            }}
                            animate={{
                                fontSize: `${calculateParameter(7, 9, i)}rem`,
                                opacity: `${calculateParameter(0.2, 0.02, i)}`
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
            <hr className="border-t-2 border-white m-4 w-[600px] z-20" />
            <h2 className="text-3xl font-bold text-white text-opacity-70">Tech Solutions | Web Design | Digital Art</h2>
        </div>
    );
}