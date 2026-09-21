"use client";

/**
 * Burst event bus + silhouette sampler shared by the WebGL and Canvas-2D renderers.
 * A burst is: particles seeded from the clicked bowl's opaque pixels — each one a real
 * fragment of the bowl image (the product photo when one exists, the render otherwise) —
 * flung outwards, then (after navigation) drawn back into the new hero. The product's
 * form decides how the pieces behave: powders leave as dust, seeds / flakes / grains
 * tumble as pieces.
 */

import type { ProductForm } from "@/content/types";

export type Rect = { x: number; y: number; w: number; h: number };
/** x,y in [0,1] of the rect (also the texture coordinate); r,g,b the pixel's own colour */
export type Sample = { x: number; y: number; r: number; g: number; b: number };

export interface BurstStart {
  slug: string;
  form: ProductForm;
  rect: Rect;
  samples: Sample[];
  /** the bowl image, square, for texture fragments (null → flat colour particles) */
  texture: HTMLCanvasElement | null;
  palette: [string, string, string, string];
}
export interface BurstSettle {
  slug: string;
  rect: Rect;
}

/** particle behaviour per product form */
export interface FormProfile {
  /** particles for the GL renderer (2D uses ~1/6 of this) */
  count: number;
  /** base point size (css px) and random spread */
  size: [number, number];
  /** soft-edged dust (true) or hard-edged pieces (false) */
  soft: boolean;
  /** piece aspect ratio (1 = round; 2.6 = a grain of rice) */
  aspect: [number, number];
  /** gravity multiplier */
  gravity: number;
  /** curl/drift multiplier */
  drift: number;
  /** spin speed (rad/s) for pieces */
  spin: number;
  /** how much of the image one fragment shows (uv span) */
  patch: number;
}

export const FORM_PROFILES: Record<ProductForm, FormProfile> = {
  powder: {
    count: 3200,
    size: [2.2, 3.4],
    soft: true,
    aspect: [1, 1.15],
    gravity: 0.7,
    drift: 1.6,
    spin: 0,
    patch: 0.028,
  },
  flakes: {
    count: 1100,
    size: [5, 7],
    soft: false,
    aspect: [1, 1.5],
    gravity: 1.15,
    drift: 0.9,
    spin: 5,
    patch: 0.06,
  },
  whole: {
    count: 900,
    size: [4.5, 6],
    soft: false,
    aspect: [1.6, 2.4],
    gravity: 1.35,
    drift: 0.6,
    spin: 6,
    patch: 0.055,
  },
  fried: {
    count: 1000,
    size: [5, 7],
    soft: false,
    aspect: [1.1, 1.8],
    gravity: 1.2,
    drift: 0.8,
    spin: 5,
    patch: 0.06,
  },
  grain: {
    count: 900,
    size: [4, 5.5],
    soft: false,
    aspect: [2.2, 3],
    gravity: 1.45,
    drift: 0.5,
    spin: 6.5,
    patch: 0.05,
  },
};

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

export interface Silhouette {
  samples: Sample[];
  texture: HTMLCanvasElement | null;
}

const cache = new Map<string, Silhouette>();
const TEX = 512;

/**
 * Sample the opaque *product* pixels of a bowl image (cached per slug) and keep a
 * 512² copy of the image as the fragment texture. Accepts the inline <ProductBowl> SVG
 * (rasterised through a blob URL) or any same-origin <img> (photo or pre-rendered SVG).
 */
export async function sampleSilhouette(
  el: SVGSVGElement | HTMLImageElement,
  slug: string,
  max = 1400,
): Promise<Silhouette> {
  const hit = cache.get(slug);
  if (hit) return hit;
  let url: string | null = null;
  const size = 112;
  const samples: Sample[] = [];
  let texture: HTMLCanvasElement | null = null;
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
    // fragment texture (the whole bowl image, square)
    texture = document.createElement("canvas");
    texture.width = texture.height = TEX;
    const tctx = texture.getContext("2d");
    if (!tctx) texture = null;
    else tctx.drawImage(img, 0, 0, TEX, TEX);

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return { samples: fallbackSamples(max), texture: null };
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
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
        all.push({ x: (x + 0.5) / size, y: (y + 0.5) / size, r, g, b });
      }
    }
    // thin to `max` evenly
    const step = Math.max(1, all.length / max);
    for (let i = 0; i < all.length; i += step)
      samples.push(all[Math.floor(i)]!);
  } catch {
    return { samples: fallbackSamples(max), texture: null };
  } finally {
    if (url) URL.revokeObjectURL(url);
  }
  const out: Silhouette = {
    samples: samples.length > 60 ? samples : fallbackSamples(max),
    texture,
  };
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
      r: 212,
      g: 162,
      b: 76,
    });
  }
  return out;
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** cubic ease-out */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** [min,max] → random in range */
export const rand = ([a, b]: [number, number]) => a + Math.random() * (b - a);
