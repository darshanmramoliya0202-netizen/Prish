"use client";

/**
 * Burst event bus + silhouette sampler shared by the WebGL and Canvas-2D renderers.
 * A burst is: particles seeded from the clicked bowl's alpha silhouette, flung outwards
 * in the product's colour world, then (after navigation) drawn back into the new hero.
 */

export type Rect = { x: number; y: number; w: number; h: number };
export type Sample = { x: number; y: number; c: number }; // x,y in [0,1] of the rect; c = palette index

export interface BurstStart {
  slug: string;
  rect: Rect;
  samples: Sample[];
  palette: [string, string, string, string];
}
export interface BurstSettle {
  slug: string;
  rect: Rect;
}

type Handler<T> = (e: T) => void;
/** debug counters (exposed as window.__prishBurst in the browser) */
export const stats = { starts: 0, settles: 0, lastSamples: 0, listeners: 0 };
if (typeof window !== "undefined")
  (window as unknown as { __prishBurst: typeof stats }).__prishBurst = stats;
const starts = new Set<Handler<BurstStart>>();
const settles = new Set<Handler<BurstSettle>>();

export const burstBus = {
  onStart: (h: Handler<BurstStart>) => (starts.add(h), () => starts.delete(h)),
  onSettle: (h: Handler<BurstSettle>) => (
    settles.add(h),
    () => settles.delete(h)
  ),
  start: (e: BurstStart) => {
    stats.starts += 1;
    stats.lastSamples = e.samples.length;
    stats.listeners = starts.size;
    starts.forEach((h) => h(e));
  },
  settle: (e: BurstSettle) => {
    stats.settles += 1;
    settles.forEach((h) => h(e));
  },
  count: () => ({ starts: starts.size, settles: settles.size }),
  /** the burst in flight, so the destination page can settle it */
  pending: null as null | {
    slug: string;
    palette: [string, string, string, string];
  },
};

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production")
  (window as unknown as { __prishBurstBus: typeof burstBus }).__prishBurstBus =
    burstBus;

const cache = new Map<string, Sample[]>();

/**
 * Sample the opaque pixels of a bowl (cached per slug). Accepts the inline <ProductBowl>
 * SVG (rasterised through a blob URL) or the pre-rendered <BowlImage> (drawn directly —
 * same-origin, so the canvas stays readable).
 */
export async function sampleSilhouette(
  el: SVGSVGElement | HTMLImageElement,
  slug: string,
  palette: string[],
  max = 1400,
): Promise<Sample[]> {
  const hit = cache.get(slug);
  if (hit) return hit;
  let url: string | null = null;
  const size = 96;
  const samples: Sample[] = [];
  try {
    let img: HTMLImageElement;
    if (el instanceof HTMLImageElement) {
      img = el;
      if (!(img.complete && img.naturalWidth > 0)) await img.decode();
    } else {
      const clone = el.cloneNode(true) as SVGSVGElement;
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      // external pattern images can't load inside an <img>-rendered SVG; drop them
      clone.querySelectorAll("image").forEach((n) => n.remove());
      const xml = new XMLSerializer().serializeToString(clone);
      url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml" }));
      img = new Image();
      img.decoding = "async";
      const src = url;
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("svg raster failed"));
        img.src = src;
      });
    }
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return fallbackSamples(max);
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    const pal = palette.map(hexToRgb);
    const all: Sample[] = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        if (data[i + 3]! < 90) continue;
        const r = data[i]!,
          g = data[i + 1]!,
          b = data[i + 2]!;
        // skip the stone bowl (dark, low-chroma greys) so the *product* bursts, not the dish
        const chroma = Math.max(r, g, b) - Math.min(r, g, b);
        if (chroma < 22 && r + g + b < 420) continue;
        all.push({
          x: (x + 0.5) / size,
          y: (y + 0.5) / size,
          c: nearest(pal, r, g, b),
        });
      }
    }
    // thin to `max` evenly
    const step = Math.max(1, all.length / max);
    for (let i = 0; i < all.length; i += step)
      samples.push(all[Math.floor(i)]!);
  } catch {
    return fallbackSamples(max);
  } finally {
    if (url) URL.revokeObjectURL(url);
  }
  const out = samples.length > 60 ? samples : fallbackSamples(max);
  cache.set(slug, out);
  return out;
}

function fallbackSamples(n: number): Sample[] {
  const out: Sample[] = [];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 0.32;
    out.push({
      x: 0.5 + Math.cos(a) * r,
      y: 0.5 + Math.sin(a) * r * 0.55,
      c: Math.floor(Math.random() * 3),
    });
  }
  return out;
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function nearest(
  pal: [number, number, number][],
  r: number,
  g: number,
  b: number,
): number {
  let best = 0;
  let bd = Infinity;
  for (let i = 0; i < pal.length; i++) {
    const [pr, pg, pb] = pal[i]!;
    const d = (pr - r) ** 2 + (pg - g) ** 2 + (pb - b) ** 2;
    if (d < bd) {
      bd = d;
      best = i;
    }
  }
  return best;
}

/** cubic ease-out */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
