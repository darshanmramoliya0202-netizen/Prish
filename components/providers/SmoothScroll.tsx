"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionPrefs } from "./MotionPrefs";

let lenis: Lenis | null = null;
export function getLenis(): Lenis | null {
  return lenis;
}

/** Lenis driven by the GSAP ticker so ScrollTrigger and smooth scroll share one clock. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const { reduced, touch } = useMotionPrefs();
  useEffect(() => {
    if (reduced) return;
    const l = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true, syncTouch: false, touchMultiplier: touch ? 1.4 : 1 });
    lenis = l;
    l.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      l.destroy();
      lenis = null;
    };
  }, [reduced, touch]);
  return <>{children}</>;
}
