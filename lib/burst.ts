"use client";

/**
 * Burst event bus + samplers shared by the WebGL and Canvas-2D renderers.
 *
 * A burst is what happens when a bowl is hit: the loose crop beside it — the real fruit,
 * seeds and leaves cut from the photograph (`pieces`, a sprite atlas built by
 * scripts/prep-photos.mjs) — lifts off and tumbles away, and the contents of the bowl
 * leave as dust made of fragments of the image itself. After navigation the lot is drawn
 * back into the destination hero. The product's form decides how the dust behaves:
 * powders drift, seeds / flakes / grain tumble.
 */

import type { ProductForm } from "@/content/types";

export type Rect = { x: number; y: number; w: number; h: number };
/** x,y in [0,1] of the rect (also the texture coordinate); r,g,b the pixel's own colour */
export type Sample = { x: number; y: number; r: number; g: number; b: number };

/** one loose piece of the composition: where it sits in the bowl image, and its atlas cell */
export interface Piece {
  /** position and size in the bowl image, normalised 0..1 */
  x: number;
  y: number;
  w: number;
  h: number;
  /** its rectangle in the atlas, normalised 0..1 (top-left origin) */
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

export interface PiecesInfo {
  atlas: HTMLImageElement;
  items: Piece[];
}

export interface BurstStart {
  slug: string;
  form: ProductForm;
  rect: Rect;
  /** the bowl's own box inside the image, normalised (null → the whole image) */
  anchor: Rect | null;
  samples: Sample[];
  /** the bowl image, square, for dust fragments (null → flat colour particles) */
  texture: HTMLCanvasElement | null;
  /** the loose pieces to fling (null → dust only) */
  pieces: PiecesInfo | null;
  palette: [string, string, string, string];
}
export interface BurstSettle {
  slug: string;
  rect: Rect;
}

/** particle behaviour per product form */
export interface FormProfile {
  /** dust particles for the GL renderer (2D uses ~1/6 of this) */
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

/** the flung pieces: heavier and livelier than dust */
export const PIECE_PHYSICS = {
  /** total flying pieces (the real ones once each, then copies from inside the bowl) */
  min: 14,
  max: 44,
  perPiece: 3,
  gravity: 1.9,
  spin: [2.5, 6.5] as [number, number],
  /** scale of the copies relative to the real piece */
  copyScale: [0.45, 0.85] as [number, number],
  /** launch speed multiplier vs dust */
  speed: 1.25,
};

type Handler<T> = (e: T) => void;
/** debug counters (exposed as window.__prishBurst in the browser) */
export const stats = {
  starts: 0,
  settles: 0,
  lastSamples: 0,
  lastPieces: 0,
  listeners: 0,
};
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
    stats.lastPieces = e.pieces?.items.length ?? 0;
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

/* ────────────────────────── per-product photo metadata ─────────────────── */

/**
 * one piece: [x, y, w, h] normalised to the bowl image, then — when the manifest has it —
 * the sprite's real size in its atlas cell, [.., tw, th] in px
 */
export type PieceTuple =
  | [number, number, number, number]
  | [number, number, number, number, number, number];

/** compact per-slug data injected by <PaletteScript/> (see components/products/PaletteScript.tsx) */
export interface BurstMeta {
  palette: [string, string, string, string];
  /** bowl box, normalised [x, y, w, h] */
  anchor?: [number, number, number, number];
  pieces?: {
    src: string;
    cell: number;
    cols: number;
    rows: number;
    items: PieceTuple[];
  };
}
declare global {
  interface Window {
    __prishPalettes?: Record<string, [string, string, string, string]>;
    __prishBurstMeta?: Record<string, BurstMeta>;
  }
}

export function burstMeta(slug: string): BurstMeta | null {
  if (typeof window === "undefined") return null;
  const m = window.__prishBurstMeta?.[slug];
  if (m) return m;
  const palette = window.__prishPalettes?.[slug];
  return palette ? { palette } : null;
}

const piecesCache = new Map<string, Promise<PiecesInfo | null>>();

/**
 * Older manifests: rebuild a sprite's size in its cell from its box, the way
 * scripts/prep-photos.mjs fits it (downscale only, into cell − 8). Only right for pieces
 * cut from the main bowl — an extra sheet's box was rescaled, so the manifest now
 * carries the real size.
 */
function spriteSize(w: number, h: number, cell: number): [number, number] {
  const inner = cell - 8;
  // the piece's pixel size in the 1600² bowl image
  const pw = w * 1600;
  const ph = h * 1600;
  const scale = Math.min(inner / pw, inner / ph, 1);
  return [Math.max(1, Math.round(pw * scale)), Math.max(1, Math.round(ph * scale))];
}

/**
 * Load a product's piece atlas (once per slug). Resolves null when the product has no
 * pieces — the burst is then dust only. Safe to call early (on hover) to warm the cache.
 */
export function loadPieces(slug: string): Promise<PiecesInfo | null> {
  const hit = piecesCache.get(slug);
  if (hit) return hit;
  const meta = burstMeta(slug);
  const p = meta?.pieces;
  if (!p || !p.items.length) {
    const none = Promise.resolve(null);
    piecesCache.set(slug, none);
    return none;
  }
  const job = (async () => {
    try {
      const img = new Image();
      img.decoding = "async";
      img.src = p.src;
      await img.decode();
      const aw = p.cols * p.cell;
      const ah = p.rows * p.cell;
      const items: Piece[] = p.items.map((item, i) => {
        const [x, y, w, h] = item;
        // the sprite is centred and fitted in its cell (scripts/prep-photos.mjs)
        const col = i % p.cols;
        const row = Math.floor(i / p.cols);
        const [tw, th] = item.length === 6 ? [item[4], item[5]] : spriteSize(w, h, p.cell);
        const left = col * p.cell + Math.floor((p.cell - tw) / 2);
        const top = row * p.cell + Math.floor((p.cell - th) / 2);
        return {
          x,
          y,
          w,
          h,
          sx: left / aw,
          sy: top / ah,
          sw: tw / aw,
          sh: th / ah,
        };
      });
      return { atlas: img, items };
    } catch {
      return null;
    }
  })();
  piecesCache.set(slug, job);
  return job;
}

/* ────────────────────────────── dust sampler ───────────────────────────── */

export interface Silhouette {
  samples: Sample[];
  texture: HTMLCanvasElement | null;
}

const cache = new Map<string, Silhouette>();
const TEX = 512;

/**
 * Sample the pixels of a bowl image that should leave as dust — the contents of the
 * bowl, not the dish and not the loose pieces (those fly whole). Cached per slug. Keeps a
 * 512² copy of the image as the fragment texture. Accepts the inline <ProductBowl> SVG
 * (rasterised through a blob URL) or any same-origin <img> (photo or pre-rendered SVG).
 */
export async function sampleSilhouette(
  el: SVGSVGElement | HTMLImageElement,
  slug: string,
  max = 1400,
  opts: { anchor?: Rect | null; exclude?: Rect[] } = {},
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
    // where the contents sit: the upper part of the bowl's box (a heap seen from the
    // front or from above) — low-chroma pixels outside it are the dish and are skipped
    const a = opts.anchor ?? { x: 0, y: 0, w: 1, h: 1 };
    const heap = {
      x0: a.x + a.w * 0.12,
      x1: a.x + a.w * 0.88,
      y0: a.y,
      y1: a.y + a.h * 0.6,
    };
    const excl = opts.exclude ?? [];
    const all: Sample[] = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        if (data[i + 3]! < 90) continue;
        const nx = (x + 0.5) / size;
        const ny = (y + 0.5) / size;
        if (excl.some((e) => nx >= e.x && nx <= e.x + e.w && ny >= e.y && ny <= e.y + e.h))
          continue;
        const r = data[i]!,
          g = data[i + 1]!,
          b = data[i + 2]!;
        const chroma = Math.max(r, g, b) - Math.min(r, g, b);
        const inHeap = nx >= heap.x0 && nx <= heap.x1 && ny >= heap.y0 && ny <= heap.y1;
        // the dish: greys (dark stone or white ceramic) outside the heap area
        if (chroma < 22 && !inHeap) continue;
        all.push({ x: nx, y: ny, r, g, b });
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

/**
 * Lay out the flying pieces for a burst: every real piece once, from where it sits, then
 * copies launched from inside the bowl at a smaller scale. Positions are css px.
 */
export interface FlyingPiece {
  /** start centre (css px) */
  x: number;
  y: number;
  /** size (css px) */
  w: number;
  h: number;
  /** launch vector (css px, y down) */
  dx: number;
  dy: number;
  seed: number;
  spin: number;
  piece: Piece;
}

export function layoutPieces(
  pieces: PiecesInfo,
  rect: Rect,
  anchor: Rect | null,
  reach: number,
): FlyingPiece[] {
  const items = pieces.items;
  if (!items.length) return [];
  const total = Math.min(
    PIECE_PHYSICS.max,
    Math.max(PIECE_PHYSICS.min, items.length * PIECE_PHYSICS.perPiece),
  );
  const a = anchor ?? { x: 0.2, y: 0.2, w: 0.6, h: 0.6 };
  // the bowl's centre in css px — what everything flies away from
  const cx = rect.x + (a.x + a.w / 2) * rect.w;
  const cy = rect.y + (a.y + a.h * 0.55) * rect.h;
  const out: FlyingPiece[] = [];
  const launch = (x: number, y: number, scale: number, p: Piece) => {
    const ang = Math.atan2(y - cy, x - cx) + (Math.random() - 0.5) * 1.1;
    const dist = (120 + Math.random() * reach) * PIECE_PHYSICS.speed;
    out.push({
      x,
      y,
      w: p.w * rect.w * scale,
      h: p.h * rect.h * scale,
      dx: Math.cos(ang) * dist,
      dy: Math.sin(ang) * dist - 160 * Math.random(),
      seed: Math.random(),
      spin: rand(PIECE_PHYSICS.spin) * (Math.random() < 0.5 ? -1 : 1),
      piece: p,
    });
  };
  for (const p of items)
    launch(rect.x + (p.x + p.w / 2) * rect.w, rect.y + (p.y + p.h / 2) * rect.h, 1, p);
  for (let i = items.length; i < total; i++) {
    const p = items[Math.floor(Math.random() * items.length)]!;
    // from inside the heap
    const x = rect.x + (a.x + a.w * (0.25 + Math.random() * 0.5)) * rect.w;
    const y = rect.y + (a.y + a.h * (0.15 + Math.random() * 0.4)) * rect.h;
    launch(x, y, rand(PIECE_PHYSICS.copyScale), p);
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
