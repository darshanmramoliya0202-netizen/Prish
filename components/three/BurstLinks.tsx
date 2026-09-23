"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  burstBus,
  burstMeta,
  loadPieces,
  sampleSilhouette,
  FORM_PROFILES,
  type Rect,
} from "@/lib/burst";
import type { ProductForm } from "@/content/types";
import { transitionFlags } from "@/components/chrome/PageTransition";
import { useMotionPrefs } from "@/components/providers/MotionPrefs";
import { gsap } from "@/lib/gsap";
import { track } from "@/lib/analytics";

const NAV_AT_MS = 520;
const BOWL_SEL = "svg[data-bowl], img[data-bowl-img]";

/**
 * Signature interaction 1 — hit a bowl (any <a data-burst>) and it bursts: the real fruit
 * and seeds beside it lift off and tumble away, the bowl's contents leave as dust made of
 * the photograph, the route changes mid-flight, and the lot settles into the destination
 * hero. Keyboard (Enter/Space) triggers the same path. The piece atlas is warmed on hover.
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
    const hero = document.querySelector<HTMLElement>(
      `[data-product-hero="${p.slug}"] :is([data-burst-target], ${BOWL_SEL})`,
    );
    if (!hero) return;
    const r = hero.getBoundingClientRect();
    const fade = hero.matches(BOWL_SEL) ? hero : null;
    if (fade) gsap.set(fade, { autoAlpha: 0 });
    burstBus.settle({
      slug: p.slug,
      rect: { x: r.left, y: r.top, w: r.width, h: r.height },
    });
    if (fade)
      gsap.to(fade, {
        autoAlpha: 1,
        duration: 0.5,
        delay: 0.55,
        ease: "power2.out",
      });
  }, [pathname]);

  useEffect(() => {
    if (reduced) return;
    // warm the piece atlas on intent so the click has it ready
    const onIntent = (e: Event) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "a[data-burst]",
      );
      if (a?.dataset.burst) void loadPieces(a.dataset.burst);
    };
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);

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
      const bowl = a.querySelector<SVGSVGElement | HTMLImageElement>(BOWL_SEL);
      const slug = a.dataset.burst!;
      const meta = burstMeta(slug);
      if (!bowl || !meta) return; // fall back to the normal curtain navigation
      e.preventDefault();
      e.stopPropagation();
      busy = true;
      const href = a.getAttribute("href")!;
      // The burst is decoration: whatever happens to it, the click must navigate,
      // and `busy` must never stay stuck.
      let navigated = false;
      const go = () => {
        if (navigated) return;
        navigated = true;
        busy = false;
        window.clearTimeout(watchdog);
        transitionFlags.skipNext = true;
        try {
          router.push(href);
        } catch {
          window.location.assign(href);
        }
      };
      const watchdog = window.setTimeout(go, 1500);
      try {
        const r = bowl.getBoundingClientRect();
        const form = (bowl.dataset.form as ProductForm | undefined) ?? "powder";
        const profile = FORM_PROFILES[form] ?? FORM_PROFILES.powder;
        const anchor: Rect | null = meta.anchor
          ? { x: meta.anchor[0], y: meta.anchor[1], w: meta.anchor[2], h: meta.anchor[3] }
          : null;
        const exclude: Rect[] = (meta.pieces?.items ?? []).map(([x, y, w, h]) => ({
          x,
          y,
          w,
          h,
        }));
        const [{ samples, texture }, pieces] = await Promise.all([
          sampleSilhouette(bowl, slug, profile.count, { anchor, exclude }),
          loadPieces(slug),
        ]);
        burstBus.pending = { slug, palette: meta.palette };
        burstBus.start({
          slug,
          form,
          rect: { x: r.left, y: r.top, w: r.width, h: r.height },
          anchor,
          samples,
          texture,
          pieces,
          palette: meta.palette,
        });
        // the bowl (and its real-product chip) leave together
        gsap.to([bowl, ...a.querySelectorAll("[data-product-chip]")], {
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.28,
          ease: "power2.in",
        });
        track("burst", { product: slug });
        const live = document.getElementById("burst-live");
        if (live)
          live.textContent = `Opening ${a.textContent?.trim().split("\n")[0] ?? slug}`;
        window.setTimeout(go, NAV_AT_MS);
      } catch {
        burstBus.pending = null;
        go();
      }
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
    };
  }, [reduced, router]);

  return <div id="burst-live" aria-live="polite" className="sr-only" />;
}
