"use client";

import * as motion from "motion/react-client";

interface SubHeaderProps {
  title: string;
  description?: string;
  id?: string;
}

export default function SubHeader({ title, description, id }: SubHeaderProps) {
  return (
    <div id={id} className="flex flex-col gap-2 pb-12 items-center">
      <header className="w-full pb-8 px-4 md:px-16 pt-12 md:pt-32 lg:pt-48 xl:pt-52 text-center">
        <motion.div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-text font-chango"
            style={{
              background: "linear-gradient(to right, #d45d1e, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {title}
          </h1>
        </motion.div>
        {/*<motion.hr*/}
        {/*  className="border-t-2 border-white z-20 -mt-6 sm:-mt-2 md:mt-2 lg:mt-2 w-full px-26" //w-[280px] sm:w-[420px] md:w-[560px] lg:w-[700px]"*/}
        {/*  initial={{scaleX: 0, opacity: 0}}*/}
        {/*  whileInView={{scaleX: 1, opacity: 1}}*/}
        {/*  transition={{duration: 0.5, delay: 0.3}}*/}
        {/*  viewport={{ once: true }}*/}
        {/*/>*/}
        {description && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-text/80 max-w-2xl mx-auto px-4">
              {description}
            </p>
          </motion.div>
        )}
      </header>
    </div>
  );
}
