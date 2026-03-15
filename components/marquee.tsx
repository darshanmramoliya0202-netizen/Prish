"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
};

export default function Marquee({
  children,
  speed = 30,
  reverse = false,
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`flex shrink-0 items-center gap-8 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
          aria-hidden={copy === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
