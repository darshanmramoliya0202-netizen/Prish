"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
  // owner complaint from v2: reveals fired before the content was on screen
  ScrollTrigger.defaults({ start: "top 78%", once: true });
  gsap.defaults({ ease: "expo.out", duration: 0.9 });
  registered = true;
  // dev-only handle for QA (slow the clock, inspect triggers)
  if (process.env.NODE_ENV !== "production")
    (window as unknown as { __gsap: typeof gsap }).__gsap = gsap;
}

export { gsap, ScrollTrigger, DrawSVGPlugin };
export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  back: "back.out(1.4)",
} as const;
