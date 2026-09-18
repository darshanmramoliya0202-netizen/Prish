"use client";

import { useSyncExternalStore } from "react";

/** Subscribe to a media query; server snapshot is `false` (hydration-safe). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const LS_EVENT = "prish:localstorage";

/** Read a localStorage key reactively (same-tab writes go through `writeLocal`). */
export function useLocalValue(key: string): string | null {
  return useSyncExternalStore(
    (cb) => {
      const onStorage = (e: StorageEvent) => {
        if (e.key === null || e.key === key) cb();
      };
      window.addEventListener("storage", onStorage);
      window.addEventListener(LS_EVENT, cb);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(LS_EVENT, cb);
      };
    },
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
}

export function writeLocal(key: string, value: string | null): void {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new Event(LS_EVENT));
}

let gpuCache: { webgl: boolean; tier: number } | null = null;

/**
 * Local GPU heuristic (no network, no third-party benchmark download):
 *   tier 0 — no WebGL2 or a software renderer (SwiftShader, llvmpipe, Mesa offscreen)
 *   tier 1 — WebGL2 on a constrained device (≤2 cores, ≤2 GB, or Save-Data on)
 *   tier 2 — everything else
 *   tier 3 — desktop-class (≥8 cores and ≥8 GB)
 */
function detectGpu(): { webgl: boolean; tier: number } {
  if (gpuCache) return gpuCache;
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") as WebGL2RenderingContext | null;
    if (!gl) return (gpuCache = { webgl: false, tier: 0 });
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    const software = /swiftshader|llvmpipe|softpipe|mesa offscreen|microsoft basic render/i.test(renderer);
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const cores = nav.hardwareConcurrency ?? 4;
    const mem = nav.deviceMemory ?? 4;
    const saveData = !!nav.connection?.saveData;
    let tier = 2;
    if (software) tier = 0;
    else if (cores <= 2 || mem <= 2 || saveData) tier = 1;
    else if (cores >= 8 && mem >= 8) tier = 3;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return (gpuCache = { webgl: true, tier });
  } catch {
    return (gpuCache = { webgl: false, tier: 0 });
  }
}

const SERVER_GPU = { webgl: false, tier: 0 };

/** WebGL2 availability + local GPU tier; computed once on the client, tier 0 on the server. */
export function useGpu(): { webgl: boolean; tier: number } {
  return useSyncExternalStore(
    () => () => {},
    detectGpu,
    () => SERVER_GPU,
  );
}

/** true after hydration on the client, false during SSR/hydration — for client-only UI bits. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
