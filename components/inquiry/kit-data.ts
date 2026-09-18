import type { Product } from "@/content/types";
import { clusterOf } from "@/content";

/** Compact, client-safe product data for the kit builder. */
export interface KitProduct {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  cluster: string;
  clusterName: string;
  primary: string;
  ink: "light" | "dark";
  variants?: string[];
  gradeHint?: string;
  desi?: string;
}

export function toKitProducts(products: Product[]): KitProduct[] {
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortName: p.shortName,
    cluster: p.cluster,
    clusterName: clusterOf(p).shortName,
    primary: p.colourWorld.primary,
    ink: p.colourWorld.ink,
    variants: p.variants,
    gradeHint: p.gradeTable ? p.gradeTable.map((g) => g.parameter).join(", ") : undefined,
    desi: p.desiName?.roman,
  }));
}
