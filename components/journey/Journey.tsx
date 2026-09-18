"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { useRegionStore } from "@/stores/region";
import { journey } from "@/content/journey";
import { home } from "@/content/copy";
import { SceneCoast, SceneHarvest, SceneMill, SceneSoil, SceneSun } from "./scenes";
import { WorldMap } from "./WorldMap";
import { JourneyStoryboard } from "./JourneyStoryboard";

const ART = { soil: SceneSoil, harvest: SceneHarvest, sun: SceneSun, mill: SceneMill, coast: SceneCoast } as const;

/**
 * Signature interaction 2 — one pinned viewport, six scenes scrubbed by scroll:
 * crossfades, three-layer parallax per scene, and the world map whose arcs draw from
 * Rajkot as you reach the end. Reduced motion → the vertical storyboard.
 */
export function Journey() {
  const { reduced, touch } = useMotionPrefs();
  const region = useRegionStore((s) => s.region);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const el = root.current;
      const panels = gsap.utils.toArray<HTMLElement>("[data-scene-panel]", el);
      const copies = gsap.utils.toArray<HTMLElement>("[data-scene-copy]", el);
      const dots = gsap.utils.toArray<HTMLElement>("[data-scene-dot]", el);
      const n = panels.length;
      const arcs = gsap.utils.toArray<SVGPathElement>("[data-arc-path]", el);
      const ends = gsap.utils.toArray<SVGCircleElement>("[data-arc-end]", el);
      const pulse = el.querySelector<SVGCircleElement>("[data-rajkot-pulse]");

      gsap.set(panels, { autoAlpha: 0 });
      gsap.set(panels[0]!, { autoAlpha: 1 });
      gsap.set(copies, { autoAlpha: 0, y: 24 });
      gsap.set(copies[0]!, { autoAlpha: 1, y: 0 });
      gsap.set(arcs, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(ends, { scale: 0, transformOrigin: "center" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: touch ? "+=450%" : "+=600%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          once: false,
          onUpdate: (self) => {
            const i = Math.min(n - 1, Math.floor(self.progress * n + 0.0001));
            dots.forEach((d, k) => d.setAttribute("data-on", k === i ? "true" : "false"));
          },
        },
      });

      // each scene owns one unit of time; crossfade in the last 25% of the previous unit
      panels.forEach((p, i) => {
        const bg = p.querySelector<SVGGElement>("[data-layer='bg']");
        const mid = p.querySelector<SVGGElement>("[data-layer='mid']");
        const fg = p.querySelector<SVGGElement>("[data-layer='fg']");
        // parallax across the scene's own window
        if (bg) tl.fromTo(bg, { y: -14 }, { y: 14 }, i);
        if (mid) tl.fromTo(mid, { y: 22 }, { y: -22 }, i);
        if (fg) tl.fromTo(fg, { y: 40, x: -10 }, { y: -40, x: 10 }, i);
        if (i > 0) {
          tl.to(panels[i - 1]!, { autoAlpha: 0, duration: 0.3 }, i - 0.15);
          tl.to(p, { autoAlpha: 1, duration: 0.3 }, i - 0.15);
          tl.to(copies[i - 1]!, { autoAlpha: 0, y: -16, duration: 0.2 }, i - 0.2);
          tl.fromTo(copies[i]!, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.3 }, i - 0.05);
        }
      });
      // sun dial spins through scene 3
      const sun = el.querySelector("[data-sun]");
      if (sun) tl.fromTo(sun, { rotate: -20, transformOrigin: "center" }, { rotate: 20 }, 2);
      // ship sails through scene 5
      const ship = el.querySelector("[data-ship]");
      if (ship) tl.fromTo(ship, { x: -120 }, { x: 160 }, 4);
      // the map: arcs draw, endpoints pop, home pulses
      const last = n - 1;
      tl.to(arcs, { strokeDashoffset: 0, duration: 0.6, stagger: 0.05 }, last + 0.05);
      tl.to(ends, { scale: 1, duration: 0.15, stagger: 0.05, ease: "back.out(2)" }, last + 0.45);
      if (pulse) tl.fromTo(pulse, { scale: 0.4, transformOrigin: "center" }, { scale: 1.6, duration: 0.6 }, last + 0.1);
      // hold the finished map for the final stretch
      tl.to({}, { duration: 0.3 }, last + 0.7);
    },
    { scope: root, dependencies: [reduced, touch] },
  );

  if (reduced) return <JourneyStoryboard />;

  return (
    <section ref={root} data-theme="dark" data-journey className="relative h-dvh overflow-hidden bg-forest-950 text-cream-50">
      {/* scenes */}
      <div className="absolute inset-0">
        {journey.scenes.map((s) => {
          const Art = s.id === "world" ? null : ART[s.id as keyof typeof ART];
          return (
            <div key={s.id} data-scene-panel={s.id} className="absolute inset-0">
              {Art ? (
                <Art className="h-full w-full" />
              ) : (
                <div className="grid h-full w-full place-items-center bg-forest-950 p-6 pb-40 md:p-16 md:pb-16">
                  <WorldMap className="h-auto w-full max-w-5xl text-cream-50" highlight={region} />
                </div>
              )}
              {/* legibility scrim for the copy */}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent md:h-1/2" />
            </div>
          );
        })}
      </div>

      {/* copy stack */}
      <div className="container-x pointer-events-none absolute inset-x-0 bottom-0 pb-12 md:bottom-12 md:pb-0">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold-400">{home.journeyTitle}</p>
          <div className="relative mt-3 min-h-44 md:min-h-40">
            {journey.scenes.map((s) => (
              <div key={s.id} data-scene-copy={s.id} className="absolute inset-x-0 top-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-display-lg leading-none text-gold-400">{s.index}</span>
                  <h3 className="text-display-md">{s.title}</h3>
                </div>
                <p className="mt-3 max-w-xl text-body text-cream-100/85 md:text-lead">{s.caption}</p>
                {s.accent ? (
                  <p className="mt-3">
                    <span lang={s.accent.lang} className="font-deva text-display-md text-gold-300">
                      {s.accent.text}
                    </span>
                    <span className="eyebrow ml-3 opacity-70">{s.accent.roman}</span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* progress rail */}
      <ol className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex" aria-hidden>
        {journey.scenes.map((s) => (
          <li key={s.id} data-scene-dot className="size-2 rounded-full bg-cream-50/30 transition-colors data-[on=true]:bg-gold-400" />
        ))}
      </ol>
      <p className="sr-only">{home.journeySub}</p>
    </section>
  );
}
