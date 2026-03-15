"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
};

export default function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className={`sticky top-0 flex h-screen items-center overflow-hidden ${className}`}>
        <motion.div style={{ x }} className="flex gap-8 px-6 sm:px-8 lg:px-10">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
