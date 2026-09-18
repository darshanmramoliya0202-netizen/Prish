"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { BurstLinks } from "./BurstLinks";
import { Burst2D } from "./Burst2D";

type GL = ComponentType;

/**
 * Picks the burst renderer. The three.js/R3F chunk (~190 KB gz) is loaded only on
 * *intent* — first hover/focus on a bowl link — or on a late idle callback, so it never
 * competes with first paint. Until it is ready, Canvas-2D handles any early click.
 */
export function BurstLayer() {
  const { reduced, canWebGL } = useMotionPrefs();
  const [GLComp, setGLComp] = useState<GL | null>(null);

  useEffect(() => {
    if (reduced || !canWebGL || GLComp) return;
    let cancelled = false;
    const load = () => {
      if (cancelled) return;
      cancelled = true; // only once
      import("./BurstGL").then((m) => setGLComp(() => m.default)).catch(() => {});
    };
    const onIntent = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.("a[data-burst]")) load();
    };
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);
    // late idle fallback so keyboard/touch users without hover still get WebGL eventually
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let timer = 0;
    const idle = w.requestIdleCallback ? w.requestIdleCallback(() => (timer = window.setTimeout(load, 4000)), { timeout: 8000 }) : (timer = window.setTimeout(load, 8000));
    return () => {
      cancelled = true;
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
      w.cancelIdleCallback?.(idle);
      window.clearTimeout(timer);
    };
  }, [reduced, canWebGL, GLComp]);

  if (reduced) return null;
  return (
    <>
      <BurstLinks />
      {GLComp ? <GLComp /> : <Burst2D />}
    </>
  );
}
