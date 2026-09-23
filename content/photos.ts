import manifest from "./generated/photos.json";

/**
 * Photography, discovered at build time by `npm run photos:prep` (scripts/prep-photos.mjs)
 * from assets-src/photos/** → public/photos/**. Everything here is optional: a product
 * with no photos yet renders its pre-rendered bowl and nothing else, never a placeholder.
 *
 *   products/<slug>/bowl    — the product in its bowl with the raw crop beside it, knocked
 *                             out (square, alpha); `pieces` is the sprite atlas of the loose
 *                             crop / fruit / seeds and `anchor` the bowl's own box, both used
 *                             by the burst
 *   products/<slug>/scene   — the full photograph, for the product hero backdrop
 *   products/<slug>/macro   — close-up of the actual product (real photo only; the
 *                             "Actual product" chip)
 *   products/<slug>/source  — the raw ingredient / field it comes from (origin section)
 *   site/<id>               — editorial photography for pages (see docs/photo-brief.md)
 */
export interface Photo {
  src: string;
  width: number;
  height: number;
  /** owner-supplied caption; falls back to the role's default */
  caption?: string;
}

/** a box in normalised bowl-image coordinates (0..1) */
export interface NormBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** sprite atlas of the loose pieces of a bowl composition */
export interface Pieces {
  src: string;
  /** atlas cell size in px; sprites are centred and fitted in their cell */
  cell: number;
  cols: number;
  rows: number;
  /** where each piece sits in the bowl image (same order as the atlas cells) */
  items: NormBox[];
}

export type ProductPhotoRole = "bowl" | "macro" | "source" | "scene";
export type ProductPhotos = Partial<Record<ProductPhotoRole, Photo>> & {
  anchor?: NormBox;
  pieces?: Pieces;
};

type Manifest = {
  products: Record<string, ProductPhotos>;
  site: Record<string, Photo>;
};

const data = manifest as Manifest;

export function productPhotos(slug: string): ProductPhotos {
  return data.products[slug] ?? {};
}

export function sitePhoto(id: string): Photo | null {
  return data.site[id] ?? null;
}

/** coverage for the owner's checklist */
export function photoCoverage(): {
  withBowl: number;
  withPieces: number;
  withScene: number;
  withMacro: number;
} {
  const all = Object.values(data.products);
  return {
    withBowl: all.filter((p) => p.bowl).length,
    withPieces: all.filter((p) => p.pieces).length,
    withScene: all.filter((p) => p.scene).length,
    withMacro: all.filter((p) => p.macro).length,
  };
}

export const photoCaptions: Record<ProductPhotoRole, string> = {
  bowl: "The product, with what it is made from",
  scene: "The product as it ships",
  macro: "Close-up of the actual product",
  source: "The raw ingredient it comes from",
};
