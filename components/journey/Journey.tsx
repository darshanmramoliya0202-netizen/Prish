"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { useRegionStore } from "@/stores/region";
import { journey } from "@/content/journey";
import { home } from "@/content/copy";
import { SectionHeading } from "@/components/ui/primitives";
import { IconArrow } from "@/components/ui/icons";
import {
  SceneCoast,
  SceneHarvest,
  SceneMill,
  SceneSoil,
  SceneSun,
} from "./scenes";
import { WorldMap } from "./WorldMap";

const ART = {
  soil: SceneSoil,
  harvest: SceneHarvest,
  sun: SceneSun,
  mill: SceneMill,
  coast: SceneCoast,
} as const;

const panelsOf = (s: HTMLElement) =>
  Array.from(s.querySelectorAll<HTMLElement>("[data-scene]"));

/** left offset a panel snaps to (scroll-padding = the strip's own padding) */
const leftOf = (s: HTMLElement, el: HTMLElement) =>
  el.offsetLeft - parseFloat(getComputedStyle(s).paddingLeft || "0");

/** the panel whose snap position is nearest the current scroll */
const nearest = (s: HTMLElement) => {
  const list = panelsOf(s);
  let best = 0;
  let bd = Infinity;
  list.forEach((el, i) => {
    const d = Math.abs(leftOf(s, el) - s.scrollLeft);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  return { index: best, el: list[best] };
};

/**
 * Signature interaction 2 — Farm → Port → World as a horizontal strip of six scenes.
 * It is a native scroller (snap points, swipe, trackpad, drag, arrows, buttons), so the
 * page keeps scrolling vertically past it — nobody is forced through all six to get on.
 * With motion on, each scene's three layers parallax as it slides and the world map's
 * arcs draw from Rajkot the first time the last scene comes into view.
 */
export function Journey() {
  const { reduced } = useMotionPrefs();
  const region = useRegionStore((s) => s.region);
  const strip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = journey.scenes.length;

  // tweened with GSAP rather than `behavior: "smooth"` (consistent everywhere, and it
  // finishes at an exact snap point); snapping is paused while the tween runs
  const goTo = useCallback(
    (i: number) => {
      const s = strip.current;
      if (!s) return;
      const list = panelsOf(s);
      const el = list[Math.max(0, Math.min(list.length - 1, i))];
      if (!el) return;
      const left = leftOf(s, el);
      if (reduced) {
        s.scrollLeft = left;
        return;
      }
      s.classList.add("is-dragging");
      gsap.to(s, {
        scrollLeft: left,
        duration: 0.7,
        ease: "power3.out",
        overwrite: true,
        onComplete: () => s.classList.remove("is-dragging"),
      });
    },
    [reduced],
  );

  // which scene is in view → progress dots + buttons
  useEffect(() => {
    const s = strip.current;
    if (!s) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      setActive(nearest(s).index);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    s.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      s.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // mouse drag to scroll (touch already swipes natively)
  useEffect(() => {
    const s = strip.current;
    if (!s) return;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startLeft = s.scrollLeft;
      s.classList.add("is-dragging");
      s.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      s.scrollLeft = startLeft - (e.clientX - startX);
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      s.classList.remove("is-dragging");
      s.releasePointerCapture(e.pointerId);
      // settle on the nearest scene
      const { el } = nearest(s);
      if (el) {
        s.classList.add("is-dragging");
        gsap.to(s, {
          scrollLeft: leftOf(s, el),
          duration: 0.45,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => s.classList.remove("is-dragging"),
        });
      }
    };
    s.addEventListener("pointerdown", down);
    s.addEventListener("pointermove", move);
    s.addEventListener("pointerup", up);
    s.addEventListener("pointercancel", up);
    return () => {
      s.removeEventListener("pointerdown", down);
      s.removeEventListener("pointermove", move);
      s.removeEventListener("pointerup", up);
      s.removeEventListener("pointercancel", up);
    };
  }, []);

  // motion: per-scene parallax as it slides, arcs draw when the map arrives
  useEffect(() => {
    const s = strip.current;
    if (reduced || !s) return;
    let ctx: gsap.Context | undefined;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        for (const panel of panelsOf(s)) {
          const st = {
            scroller: s,
            horizontal: true,
            trigger: panel,
            start: "left right",
            end: "right left",
            scrub: true,
            once: false,
          };
          const bg = panel.querySelector("[data-layer='bg']");
          const mid = panel.querySelector("[data-layer='mid']");
          const fg = panel.querySelector("[data-layer='fg']");
          if (bg)
            gsap.fromTo(
              bg,
              { x: -24 },
              { x: 24, ease: "none", scrollTrigger: st },
            );
          if (mid)
            gsap.fromTo(
              mid,
              { x: 36 },
              { x: -36, ease: "none", scrollTrigger: st },
            );
          if (fg)
            gsap.fromTo(
              fg,
              { x: 70 },
              { x: -70, ease: "none", scrollTrigger: st },
            );
          const sun = panel.querySelector("[data-sun]");
          if (sun)
            gsap.fromTo(
              sun,
              { rotate: -24, transformOrigin: "center" },
              { rotate: 24, ease: "none", scrollTrigger: st },
            );
          const ship = panel.querySelector("[data-ship]");
          if (ship)
            gsap.fromTo(
              ship,
              { x: -140 },
              { x: 180, ease: "none", scrollTrigger: st },
            );
        }
        // the map: arcs draw, endpoints pop, home pulses — once, when it slides in
        const world = s.querySelector<HTMLElement>("[data-scene='world']");
        if (world) {
          const arcs = world.querySelectorAll("[data-arc-path]");
          const ends = world.querySelectorAll("[data-arc-end]");
          const pulse = world.querySelector("[data-rajkot-pulse]");
          gsap.set(arcs, { strokeDasharray: 1, strokeDashoffset: 1 });
          gsap.set(ends, { scale: 0, transformOrigin: "center" });
          ScrollTrigger.create({
            scroller: s,
            horizontal: true,
            trigger: world,
            start: "left 45%",
            once: true,
            onEnter: () => {
              const tl = gsap.timeline();
              tl.to(arcs, {
                strokeDashoffset: 0,
                duration: 1.4,
                stagger: 0.12,
                ease: "power2.inOut",
              });
              tl.to(
                ends,
                { scale: 1, duration: 0.4, stagger: 0.12, ease: "back.out(2)" },
                0.9,
              );
              if (pulse)
                tl.fromTo(
                  pulse,
                  { scale: 0.4, transformOrigin: "center" },
                  { scale: 1.6, duration: 1.4, ease: "power1.out" },
                  0.2,
                );
            },
          });
        }
      }, s);
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [reduced, region]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(n - 1);
    }
  };

  const btn =
    "grid size-12 place-items-center rounded-full border border-cream-50/25 text-cream-50 transition-colors hover:border-gold-400 hover:text-gold-400 disabled:opacity-30 disabled:hover:border-cream-50/25 disabled:hover:text-cream-50";

  return (
    <section
      data-theme="dark"
      data-journey
      className="relative overflow-hidden bg-forest-950 py-section text-cream-50"
    >
      <div className="container-x flex items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Traceability"
          title={home.journeyTitle}
          sub={home.journeySub}
        />
        <div className="hidden shrink-0 gap-3 md:flex" data-reveal>
          <button
            type="button"
            className={btn}
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous scene"
          >
            <IconArrow className="rotate-180" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => goTo(active + 1)}
            disabled={active === n - 1}
            aria-label="Next scene"
          >
            <IconArrow />
          </button>
        </div>
      </div>

      {/* the strip: native horizontal scroller, snap per scene, page scroll untouched */}
      <div
        ref={strip}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${home.journeyTitle} — ${n} scenes`}
        onKeyDown={onKey}
        data-journey-strip
        className="scrollbar-none mt-10 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--spacing-gutter)] pb-4 outline-none [scroll-padding-inline:var(--spacing-gutter)] focus-visible:ring-2 focus-visible:ring-gold-500 md:mt-14 md:gap-6 [&.is-dragging]:cursor-grabbing [&.is-dragging]:snap-none"
      >
        {journey.scenes.map((s, i) => {
          const Art = s.id === "world" ? null : ART[s.id as keyof typeof ART];
          return (
            <div
              key={s.id}
              data-scene={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${s.title}`}
              className="relative w-[86vw] max-w-[1100px] shrink-0 snap-start overflow-hidden rounded-2xl bg-forest-900 shadow-deep select-none md:aspect-[12/7] md:w-[72vw] lg:w-[62vw]"
            >
              {/* art: stacked above the copy on phones, full-bleed behind it from md */}
              <div className="relative aspect-[16/10] md:absolute md:inset-0 md:aspect-auto">
                {Art ? (
                  <Art className="h-full w-full" />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-forest-950 p-5 md:p-10 md:pb-44">
                    <WorldMap
                      className="h-full w-full max-w-4xl text-cream-50"
                      highlight={region}
                    />
                  </div>
                )}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 hidden h-3/5 bg-gradient-to-t from-forest-950/95 via-forest-950/50 to-transparent md:block"
                />
              </div>
              <div className="p-5 md:absolute md:inset-x-0 md:bottom-0 md:p-10">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-display-lg leading-none text-gold-400">
                    {s.index}
                  </span>
                  <h3 className="text-display-md">{s.title}</h3>
                </div>
                <p className="mt-3 max-w-xl text-body text-cream-100/85 md:text-lead">
                  {s.caption}
                </p>
                {s.accent ? (
                  <p className="mt-3">
                    <span
                      lang={s.accent.lang}
                      className="font-deva text-display-md text-gold-300"
                    >
                      {s.accent.text}
                    </span>
                    <span className="eyebrow ml-3 opacity-70">
                      {s.accent.roman}
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
        {/* trailing space so the last scene can snap to the start edge like the others */}
        <div
          aria-hidden
          className="w-[calc(14vw-var(--spacing-gutter))] shrink-0 md:w-[calc(28vw-var(--spacing-gutter))] lg:w-[calc(38vw-var(--spacing-gutter))]"
        />
      </div>

      {/* progress */}
      <ol
        className="container-x mt-6 flex items-center gap-3"
        aria-label="Scenes"
      >
        {journey.scenes.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Scene ${i + 1}: ${s.title}`}
              aria-current={i === active ? "true" : undefined}
              data-scene-dot
              data-on={i === active ? "true" : "false"}
              className="block h-6 w-8 py-2.5 md:w-12"
            >
              <span
                className={`block h-1 rounded-full transition-colors ${i === active ? "bg-gold-400" : "bg-cream-50/25"}`}
              />
            </button>
          </li>
        ))}
        <li className="ml-auto text-small tabular opacity-60" aria-hidden>
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </li>
      </ol>
    </section>
  );
}
