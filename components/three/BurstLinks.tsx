"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { burstBus, sampleSilhouette } from "@/lib/burst";
import { transitionFlags } from "@/components/chrome/PageTransition";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { gsap } from "@/lib/gsap";
import { track } from "@/lib/analytics";

/** Palette lookup injected by the page (product colour worlds), keyed by slug. */
declare global {
  interface Window {
    __prishPalettes?: Record<string, [string, string, string, string]>;
  }
}

const NAV_AT_MS = 520;

/**
 * Signature interaction 1 — click a bowl (any <a data-burst>) and it bursts into its
 * product's colours, the route changes mid-flight, and the particles settle into the
 * destination hero. Keyboard (Enter/Space) triggers the same path.
 */
export function BurstLinks() {
  const router = useRouter();
  const pathname = usePathname();
  const { reduced } = useMotionPrefs();

  // destination: settle into the hero bowl, fade the bowl in
  useEffect(() => {
    const p = burstBus.pending;
    if (!p) return;
    burstBus.pending = null;
    const hero = document.querySelector<SVGSVGElement>(
      `[data-product-hero="${p.slug}"] svg[data-bowl]`,
    );
    if (!hero) return;
    const r = hero.getBoundingClientRect();
    gsap.set(hero, { autoAlpha: 0 });
    burstBus.settle({
      slug: p.slug,
      rect: { x: r.left, y: r.top, w: r.width, h: r.height },
    });
    gsap.to(hero, {
      autoAlpha: 1,
      duration: 0.5,
      delay: 0.55,
      ease: "power2.out",
    });
  }, [pathname]);

  useEffect(() => {
    if (reduced) return;
    let busy = false;
    const onClick = async (e: MouseEvent) => {
      if (
        busy ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "a[data-burst]",
      );
      if (!a) return;
      const svg = a.querySelector<SVGSVGElement | HTMLImageElement>(
        "svg[data-bowl], img[data-bowl-img]",
      );
      const slug = a.dataset.burst!;
      const palette = window.__prishPalettes?.[slug];
      if (!svg || !palette) return; // fall back to the normal curtain navigation
      e.preventDefault();
      e.stopPropagation();
      busy = true;
      const r = svg.getBoundingClientRect();
      const samples = await sampleSilhouette(svg, slug, palette);
      burstBus.pending = { slug, palette };
      burstBus.start({
        slug,
        rect: { x: r.left, y: r.top, w: r.width, h: r.height },
        samples,
        palette,
      });
      gsap.to(svg, {
        autoAlpha: 0,
        scale: 0.9,
        duration: 0.25,
        ease: "power2.in",
      });
      track("burst", { product: slug });
      const live = document.getElementById("burst-live");
      if (live)
        live.textContent = `Opening ${a.textContent?.trim().split("\n")[0] ?? slug}`;
      transitionFlags.skipNext = true;
      const href = a.getAttribute("href")!;
      window.setTimeout(() => {
        router.push(href);
        busy = false;
      }, NAV_AT_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduced, router]);

  return <div id="burst-live" aria-live="polite" className="sr-only" />;
}
