"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type TextRevealProps = {
  text: string;
  className?: string;
};

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [2, 0]);

  return (
    <span className="relative mr-[0.3em] mt-1">
      <span className="absolute opacity-10">{children}</span>
      <motion.span
        style={{ opacity, filter: blur as unknown as string }}
        className="relative"
      >
        {children}
      </motion.span>
    </span>
  );
}
