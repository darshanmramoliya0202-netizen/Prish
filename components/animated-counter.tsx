"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

type AnimatedCounterProps = {
  value: string;
  className?: string;
};

export default function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);

  const numericMatch = value.match(/^([\d,]+)/);
  const numericPart = numericMatch ? parseInt(numericMatch[1].replace(/,/g, ""), 10) : null;
  const suffix = numericMatch ? value.slice(numericMatch[0].length) : value;

  useEffect(() => {
    if (!isInView || numericPart === null) return;

    let start = 0;
    const end = numericPart;
    const duration = 1600;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      start = Math.round(eased * end);

      const formatted = end >= 1000 ? start.toLocaleString() : String(start);
      setDisplay(formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, numericPart, suffix]);

  return (
    <span ref={ref} className={className}>
      {isInView ? display : "0" + suffix}
    </span>
  );
}
