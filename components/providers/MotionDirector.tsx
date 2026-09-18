"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, DrawSVGPlugin } from "@/lib/gsap";
import { useMotionPrefs } from "./MotionPrefs";
import { getLenis } from "./SmoothScroll";

/**
 * Page-level motion, attached by data attributes so server components stay plain:
 *   [data-reveal]        fade/rise in when 78% into view (once)
 *   [data-reveal-group]  children stagger
 *   [data-count]         count-up numbers ("2500+", "12–24")
 *   [data-namaste]       hero word resolves char-by-char; [data-namaste-hands] draws on
 *   [data-rangoli]       slow rotation + scroll parallax
 *   [data-scene]         storyboard rows: art slides in
 * Reduced motion: everything renders in its final state.
 */
export function MotionDirector() {
  const pathname = usePathname();
  const { reduced } = useMotionPrefs();

  useEffect(() => {
    // new page: top, then refresh triggers after fonts/layout settle
    getLenis()?.scrollTo(0, { immediate: true });
    if (reduced) return;

    const ctx = gsap.context(() => {
      // ── generic reveals ────────────────────────────────────────────
      const singles = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal-group] [data-reveal])");
      for (const el of singles) {
        gsap.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1, scrollTrigger: { trigger: el } });
      }
      for (const group of gsap.utils.toArray<HTMLElement>("[data-reveal-group]")) {
        const kids = group.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!kids.length) continue;
        gsap.fromTo(kids, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, scrollTrigger: { trigger: group } });
      }

      // ── count-ups ──────────────────────────────────────────────────
      for (const el of gsap.utils.toArray<HTMLElement>("[data-count]")) {
        const final = el.dataset.count ?? el.textContent ?? "";
        const m = final.match(/^(\d+)(.*)$/);
        if (!m) continue;
        const target = Number(m[1]);
        const suffix = m[2] ?? "";
        const obj = { v: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { v: 1 },
          scrollTrigger: { trigger: el, start: "top 75%" },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      }

      // ── hero: नमस्ते resolves, hands draw on ────────────────────────
      const word = document.querySelector<HTMLElement>("[data-namaste]");
      if (word) {
        const split = new SplitText(word, { type: "chars" });
        gsap.from(split.chars, { yPercent: 40, autoAlpha: 0, filter: "blur(8px)", duration: 1.1, stagger: 0.06, ease: "expo.out", delay: 0.15 });
        const hands = document.querySelectorAll<SVGPathElement>("[data-namaste-hands] path");
        if (hands.length) gsap.from(hands, { drawSVG: "0%", duration: 1.6, stagger: 0.05, ease: "power2.inOut", delay: 0.1 });
        const heroBits = document.querySelectorAll<HTMLElement>("[data-hero] h1, [data-hero] h1 + p, [data-hero] h1 + p + div, [data-hero] .eyebrow");
        gsap.from(heroBits, { autoAlpha: 0, y: 24, duration: 1, stagger: 0.1, delay: 0.6 });
      }

      // ── rangoli: rotate with scroll ────────────────────────────────
      for (const r of gsap.utils.toArray<SVGElement>("[data-rangoli]")) {
        gsap.to(r, { rotate: 40, ease: "none", scrollTrigger: { trigger: r, start: "top bottom", end: "bottom top", scrub: 1.2, once: false } });
      }

      // ── storyboard rows ────────────────────────────────────────────
      for (const row of gsap.utils.toArray<HTMLElement>("[data-scene]")) {
        const art = row.querySelector<HTMLElement>(":scope > div:last-child");
        const copy = row.querySelector<HTMLElement>(":scope > div:first-child");
        if (art) gsap.from(art, { autoAlpha: 0, x: 40, scale: 0.98, duration: 1.1, scrollTrigger: { trigger: row } });
        if (copy) gsap.from(copy.children, { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.07, scrollTrigger: { trigger: row } });
      }

      // ── kit CTA gradient follows the pointer ───────────────────────
      const cta = document.querySelector<HTMLElement>("[data-kit-cta]");
      if (cta) {
        const move = (e: PointerEvent) => {
          const r = cta.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          gsap.to(cta, { "--mx": `${x}%`, duration: 0.6, overwrite: true } as gsap.TweenVars);
        };
        cta.addEventListener("pointermove", move);
        return () => cta.removeEventListener("pointermove", move);
      }
    });

    // refresh once fonts are in, and again after images settle
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [pathname, reduced]);

  return null;
}

// keep the import used for tree-shaking safety
void DrawSVGPlugin;
