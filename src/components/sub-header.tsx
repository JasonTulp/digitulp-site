"use client";

import * as motion from "motion/react-client";

interface SubHeaderProps {
  title: string;
  description?: string;
}

export default function SubHeader({ title, description }: SubHeaderProps) {
  return (
    <header className="w-full py-12 text-center">
      <motion.div className="mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-text"
          style={{
            background: "linear-gradient(to right, #d45d1e, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {title}
        </h1>
      </motion.div>
      
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
  );
}
