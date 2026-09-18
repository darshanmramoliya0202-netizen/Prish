"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { Seal } from "@/components/brand/Seal";

/** Set by the burst interaction so it can navigate without the curtain. */
export const transitionFlags = { skipNext: false };

/** slide the sheet up and park it below the viewport — with a plain-CSS fallback */
function lift(el: HTMLDivElement) {
  try {
    gsap.to(el, {
      yPercent: -100,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => gsap.set(el, { yPercent: 100 }),
    });
  } catch {
    el.style.transform = "translateY(100%)";
  }
}

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
    lift(el);
  }, [pathname]);

  useEffect(() => {
    if (reduced) return;
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (
        !a ||
        a.target === "_blank" ||
        a.hasAttribute("download") ||
        a.dataset.noTransition !== undefined
      )
        return;
      // bowls burst instead of curtaining (BurstLinks owns those clicks)
      if (
        a.dataset.burst !== undefined &&
        a.querySelector("svg[data-bowl], img[data-bowl-img]") &&
        window.__prishPalettes?.[a.dataset.burst]
      )
        return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return; // in-page anchor
      if (url.pathname === window.location.pathname) return;
      if (transitionFlags.skipNext) {
        transitionFlags.skipNext = false;
        return;
      }
      e.preventDefault();
      const href = url.pathname + url.search;
      const el = curtain.current;
      if (!el) {
        router.push(href);
        return;
      }
      // The animation is decoration: whatever happens to it, the click must navigate.
      let navigated = false;
      const go = () => {
        if (navigated) return;
        navigated = true;
        window.clearTimeout(watchdog);
        try {
          router.push(href);
        } catch {
          window.location.assign(href);
        }
      };
      const watchdog = window.setTimeout(go, 1200);
      pending.current = true;
      // and if the route never changes (failed push, offline), lift the sheet again
      window.setTimeout(() => {
        if (pending.current && curtain.current) {
          pending.current = false;
          lift(curtain.current);
        }
      }, 4000);
      try {
        gsap.set(el, { yPercent: 100 });
        gsap.to(el, {
          yPercent: 0,
          duration: 0.42,
          ease: "power3.inOut",
          onComplete: go,
        });
        gsap.fromTo(
          el.querySelector("[data-stamp]"),
          { scale: 1.3, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.5,
            ease: "back.out(1.6)",
            delay: 0.2,
          },
        );
      } catch {
        go();
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduced, router]);

  if (reduced) return null;
  return (
    <div
      ref={curtain}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-forest-950 grain"
      style={{ transform: "translateY(100%)" }}
    >
      <Seal decorative data-stamp className="size-24 text-cream-50 opacity-0" />
    </div>
  );
}
