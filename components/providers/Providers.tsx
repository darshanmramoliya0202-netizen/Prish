"use client";

import type { ReactNode } from "react";
import { MotionPrefsProvider } from "@/components/providers/MotionPrefs";

/**
 * Client provider stack. Smooth-scroll, page-transition and WebGL providers
 * are added here in the motion phase; keeping the stack in one place lets
 * app/layout.tsx stay a server component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionPrefsProvider>{children}</MotionPrefsProvider>;
}
