"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { Seal } from "@/components/brand/Seal";

/** Set by the burst interaction so it can navigate without the curtain. */
export const transitionFlags = { skipNext: false };

/**
 * Curtain page transition. Intercepts internal link clicks (no modifier keys, same
 * origin, not download/target), plays the curtain in, then navigates; the curtain
 * lifts when the pathname changes. Back/forward navigations get no curtain.
 */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const { reduced } = useMotionPrefs();
  const curtain = useRef<HTMLDivElement>(null);
  const pending = useRef(false);

  // lift when the route actually changed
  useEffect(() => {
    const el = curtain.current;
    if (!el || !pending.current) return;
    pending.current = false;
    gsap.to(el, { yPercent: -100, duration: 0.45, ease: "power3.inOut", onComplete: () => gsap.set(el, { yPercent: 100 }) });
  }, [pathname]);

  useEffect(() => {
    if (reduced) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      // bowls burst instead of curtaining (BurstLinks owns those clicks)
      if (a.dataset.burst !== undefined && a.querySelector("svg[data-bowl]") && window.__prishPalettes?.[a.dataset.burst]) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return; // in-page anchor
      if (url.pathname === window.location.pathname) return;
      if (transitionFlags.skipNext) {
        transitionFlags.skipNext = false;
        return;
      }
      e.preventDefault();
      const el = curtain.current;
      if (!el) {
        router.push(url.pathname + url.search);
        return;
      }
      pending.current = true;
      gsap.set(el, { yPercent: 100 });
      gsap.to(el, {
        yPercent: 0,
        duration: 0.42,
        ease: "power3.inOut",
        onComplete: () => router.push(url.pathname + url.search),
      });
      gsap.fromTo(el.querySelector("[data-stamp]"), { scale: 1.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.6)", delay: 0.2 });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduced, router]);

  if (reduced) return null;
  return (
    <div ref={curtain} aria-hidden className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-forest-950 grain" style={{ transform: "translateY(100%)" }}>
      <Seal decorative data-stamp className="size-24 text-cream-50 opacity-0" />
    </div>
  );
}
