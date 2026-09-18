"use client";

import { useEffect } from "react";

/** Marks the current month column across every seasonality strip on the page (client-only). */
export function CurrentMonth() {
  useEffect(() => {
    const m = new Date().getMonth();
    document.documentElement.style.setProperty("--current-month", String(m));
    document.querySelectorAll<HTMLElement>(`[data-month="${m}"]`).forEach((el) => el.setAttribute("data-now", "true"));
  }, []);
  return null;
}
