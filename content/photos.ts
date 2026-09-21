import manifest from "./generated/photos.json";

/**
 * Real photography, discovered at build time by `npm run photos:prep` (scripts/prep-photos.mjs)
 * from assets-src/photos/** → public/photos/**. Everything here is optional: a product
 * with no photos yet renders its pre-rendered bowl and no chip, never a placeholder.
 *
 *   products/<slug>/bowl    — the product heaped in the house bowl, transparent PNG (square)
 *   products/<slug>/macro   — close-up of the actual product, square (the "exact product" chip)
 *   products/<slug>/source  — the raw ingredient / field it comes from (4:3)
 *   site/<id>               — editorial photography for pages (see docs/photo-brief.md)
 */
export interface Photo {
  src: string;
  width: number;
  height: number;
  /** owner-supplied caption; falls back to the role's default */
  caption?: string;
}

export type ProductPhotoRole = "bowl" | "macro" | "source";
export type ProductPhotos = Partial<Record<ProductPhotoRole, Photo>>;

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

/** how many products have at least one real photo (for the owner's checklist) */
export function photoCoverage(): { withBowl: number; withMacro: number } {
  const all = Object.values(data.products);
  return {
    withBowl: all.filter((p) => p.bowl).length,
    withMacro: all.filter((p) => p.macro).length,
  };
}

export const photoCaptions: Record<ProductPhotoRole, string> = {
  bowl: "The product as it ships",
  macro: "Close-up of the actual product",
  source: "The raw ingredient it comes from",
};
