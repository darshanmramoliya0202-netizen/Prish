"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, DrawSVGPlugin } from "@/lib/gsap";
import { useMotionPrefs } from "./MotionPrefs";
import { getLenis } from "./SmoothScroll";

/**
 * Page-level motion, attached by data attributes so server components stay plain:
 *   [data-reveal]        fade/rise in when 78% into view (once)
 *   [data-reveal-group]  children stagger
 *   [data-count]         count-up numbers ("2500+", "12–24")
 *   [data-namaste]       hero word written akshara by akshara; [data-namaste-hands] join + draw on;
 *   [data-hero-fade]     the bits around the h1 rise in (all three start hidden via CSS)
 *   [data-rangoli]       slow rotation + scroll parallax
 * (the Farm → Port → World strip animates itself — see components/journey/Journey.tsx)
 * Reduced motion: everything renders in its final state.
 */
export function MotionDirector() {
  const pathname = usePathname();
  const { reduced } = useMotionPrefs();

  useEffect(() => {
    // new page: top, then refresh triggers after fonts/layout settle
    getLenis()?.scrollTo(0, { immediate: true });
    if (reduced) return;

    let ctx: gsap.Context | undefined;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // ── generic reveals ────────────────────────────────────────────
        const singles = gsap.utils.toArray<HTMLElement>(
          "[data-reveal]:not([data-reveal-group] [data-reveal])",
        );
        // opacity rather than autoAlpha: revealed-later content stays in the accessibility
        // tree (visibility:hidden would drop headings and break heading order for AT)
        for (const el of singles) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el } },
          );
        }
        for (const group of gsap.utils.toArray<HTMLElement>(
          "[data-reveal-group]",
        )) {
          const kids = group.querySelectorAll<HTMLElement>("[data-reveal]");
          if (!kids.length) continue;
          gsap.fromTo(
            kids,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.08,
              scrollTrigger: { trigger: group },
            },
          );
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

        // ── hero: the Namaste gesture ───────────────────────────────────
        // (word, hands and [data-hero-fade] sit at opacity 0 via CSS until here — no flash)
        // Two hands slide in from either side and meet at the seam while their lines draw
        // on; the joined hands dip in a slight bow; नमस्ते is then written one akshara at a
        // time (न · म · स्ते) — never per code point, which tears matras off consonants.
        const word = document.querySelector<HTMLElement>("[data-namaste]");
        const hands = document.querySelector<SVGSVGElement>(
          "[data-namaste-hands]",
        );
        if (word) {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          if (hands) {
            tl.set(hands, { autoAlpha: 1 }, 0)
              .from(
                hands.querySelectorAll("[data-hand='l']"),
                { x: -26, autoAlpha: 0, duration: 1.1 },
                0.1,
              )
              .from(
                hands.querySelectorAll("[data-hand='r']"),
                { x: 26, autoAlpha: 0, duration: 1.1 },
                0.1,
              )
              .from(
                hands.querySelectorAll("[data-hand] path"),
                {
                  drawSVG: "0%",
                  duration: 1.3,
                  stagger: 0.03,
                  ease: "power2.inOut",
                },
                0.1,
              )
              .from(
                hands.querySelectorAll("[data-seam]"),
                { drawSVG: "50% 50%", duration: 0.5, ease: "power2.out" },
                1.05,
              )
              // the bow: a small dip once the palms have met
              .to(hands, { y: 7, duration: 0.45, ease: "power2.inOut" }, 1.2)
              .to(hands, { y: 0, duration: 0.7, ease: "power2.out" }, 1.65);
          }
          tl.set(word, { autoAlpha: 1 }, 0).from(
            word.querySelectorAll("[data-akshara]"),
            {
              yPercent: 24,
              autoAlpha: 0,
              filter: "blur(6px)",
              duration: 0.9,
              stagger: 0.17,
            },
            hands ? 1.25 : 0.15,
          );
          // the h1 is the LCP and stays visible from first paint; only the bits around it fade in
          tl.fromTo(
            "[data-hero-fade]",
            { y: 24 },
            { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 },
            hands ? 1.9 : 0.6,
          );
        }

        // ── rangoli: rotate with scroll ────────────────────────────────
        for (const r of gsap.utils.toArray<SVGElement>("[data-rangoli]")) {
          gsap.to(r, {
            rotate: 40,
            ease: "none",
            scrollTrigger: {
              trigger: r,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              once: false,
            },
          });
        }

        // ── kit CTA gradient follows the pointer ───────────────────────
        const cta = document.querySelector<HTMLElement>("[data-kit-cta]");
        if (cta) {
          const move = (e: PointerEvent) => {
            const r = cta.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            gsap.to(cta, {
              "--mx": `${x}%`,
              duration: 0.6,
              overwrite: true,
            } as gsap.TweenVars);
          };
          cta.addEventListener("pointermove", move);
          return () => cta.removeEventListener("pointermove", move);
        }
      });
    });

    // refresh once fonts are in (ScrollTrigger refreshes itself on `load`)
    let live = true;
    document.fonts?.ready.then(() => {
      if (live) ScrollTrigger.refresh();
    });
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [pathname, reduced]);

  return null;
}

// keep the import used for tree-shaking safety
void DrawSVGPlugin;
