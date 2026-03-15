"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down" | "circle";
  delay?: number;
};

const clipVariants = {
  left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
  up: { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" },
  down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
  circle: { hidden: "circle(0% at 50% 50%)", visible: "circle(75% at 50% 50%)" },
};

export default function ClipReveal({
  children,
  className = "",
  direction = "left",
  delay = 0,
}: ClipRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const variant = clipVariants[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: variant.hidden }}
      animate={isInView ? { clipPath: variant.visible } : { clipPath: variant.hidden }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
