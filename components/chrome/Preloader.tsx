"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { Seal } from "@/components/brand/Seal";
import { loaderLines } from "@/content/copy";

const KEY = "prish.intro";
const MAX_MS = 1200;

/** First visit per session only; never blocks LCP (overlay above the rendered hero). */
export function Preloader() {
  const { reduced } = useMotionPrefs();
  const [line] = useState(() => loaderLines[Math.floor(Math.random() * loaderLines.length)]);
  const [show, setShow] = useState<boolean | null>(null);
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      seen = true;
    }
    const raf = requestAnimationFrame(() => setShow(!seen && !reduced));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show || !el.current) return;
    const root = el.current;
    const tl = gsap.timeline({ onComplete: () => setShow(false) });
    tl.fromTo(root.querySelector("[data-seal]"), { scale: 0.7, rotate: -12, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.55, ease: "back.out(1.6)" })
      .fromTo(root.querySelector("[data-line]"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.2")
      .to(root, { yPercent: -100, duration: 0.5, ease: "power3.inOut" }, Math.max(0.9, MAX_MS / 1000 - 0.5));
    return () => {
      tl.kill();
    };
  }, [show]);

  if (!show) return null;
  return (
    <div ref={el} aria-hidden className="fixed inset-0 z-[90] grid place-items-center bg-forest-950 text-cream-50 grain">
      <div className="text-center">
        <Seal decorative data-seal className="mx-auto size-24" />
        <p data-line className="mt-6 font-display text-display-md italic text-gold-300">
          {line}
        </p>
      </div>
    </div>
  );
}
