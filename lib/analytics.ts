"use client";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: Payload) => void };
  }
}

/** Fire an Umami event (no-op when analytics is not loaded). */
export function track(name: string, data?: Payload): void {
  try {
    window.umami?.track(name, data);
  } catch {
    /* analytics must never break the page */
  }
}
