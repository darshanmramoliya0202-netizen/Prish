"use client";

import type { ReactNode } from "react";
import { MotionPrefsProvider } from "@/components/providers/MotionPrefs";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionDirector } from "@/components/providers/MotionDirector";
import { PageTransition } from "@/components/chrome/PageTransition";
import { Preloader } from "@/components/chrome/Preloader";
import { BurstLayer } from "@/components/three/BurstLayer";

/**
 * Client provider stack. Order matters: prefs → smooth scroll → page motion.
 * The WebGL layer mounts lazily from <BurstLayer/> (see components/three).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionPrefsProvider>
      <SmoothScroll>
        <MotionDirector />
        <PageTransition />
        <Preloader />
        <BurstLayer />
        {children}
      </SmoothScroll>
    </MotionPrefsProvider>
  );
}
