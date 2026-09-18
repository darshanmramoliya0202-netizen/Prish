"use client";

import dynamic from "next/dynamic";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { BurstLinks } from "./BurstLinks";
import { Burst2D } from "./Burst2D";

// three + R3F only ever load on capable devices, on idle
const BurstGL = dynamic(() => import("./BurstGL"), { ssr: false });

/** Picks the renderer for the burst interaction; nothing renders under reduced motion. */
export function BurstLayer() {
  const { reduced, canWebGL } = useMotionPrefs();
  if (reduced) return null;
  return (
    <>
      <BurstLinks />
      {canWebGL ? <BurstGL /> : <Burst2D />}
    </>
  );
}
