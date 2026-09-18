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

let webglCache: boolean | null = null;
function detectWebGL2(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const c = document.createElement("canvas");
    webglCache = !!c.getContext("webgl2");
  } catch {
    webglCache = false;
  }
  return webglCache;
}

/** WebGL2 availability; computed once on the client, `false` on the server. */
export function useWebGL2(): boolean {
  return useSyncExternalStore(
    () => () => {},
    detectWebGL2,
    () => false,
  );
}
