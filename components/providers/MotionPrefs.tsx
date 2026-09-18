"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useGpu, useLocalValue, useMediaQuery, writeLocal } from "@/lib/browser-store";

export type MotionPrefs = {
  /** true when the OS or the footer toggle asks for reduced motion */
  reduced: boolean;
  /** user override stored in localStorage: null = follow the OS */
  override: boolean | null;
  setOverride: (v: boolean | null) => void;
  /** coarse pointer (touch) */
  touch: boolean;
  /** WebGL2 available in this browser */
  webgl: boolean;
  /** local GPU tier 0–3 (null before hydration) */
  gpuTier: number | null;
  /** convenience: allowed to mount the WebGL layer */
  canWebGL: boolean;
};

const STORAGE_KEY = "prish.motion";

const Ctx = createContext<MotionPrefs>({
  reduced: false,
  override: null,
  setOverride: () => {},
  touch: false,
  webgl: false,
  gpuTier: null,
  canWebGL: false,
});

export function MotionPrefsProvider({ children }: { children: ReactNode }) {
  const osReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const touch = useMediaQuery("(pointer: coarse)");
  const gpu = useGpu();
  const webgl = gpu.webgl;
  const gpuTier = gpu.tier;
  const stored = useLocalValue(STORAGE_KEY);
  const override = stored === "reduce" ? true : stored === "full" ? false : null;
  const reduced = override ?? osReduced;

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);

  const value = useMemo<MotionPrefs>(
    () => ({
      reduced,
      override,
      setOverride: (v) => writeLocal(STORAGE_KEY, v === null ? null : v ? "reduce" : "full"),
      touch,
      webgl,
      gpuTier,
      canWebGL: !reduced && webgl && gpuTier >= 2,
    }),
    [reduced, override, touch, webgl, gpuTier],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMotionPrefs(): MotionPrefs {
  return useContext(Ctx);
}
