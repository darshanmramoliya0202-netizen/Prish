import type { Product } from "@/content/types";

export type SearchEntry = { id: string; name: string; shortName: string; path: string; cluster: string; synonyms: string[]; desi?: string };

/** Server-safe: build the palette's entries from the product model. */
export function toSearchEntries(products: Product[], path: (p: Product) => string, clusterName: (p: Product) => string): SearchEntry[] {
  return products.map((p) => ({ id: p.id, name: p.name, shortName: p.shortName, path: path(p), cluster: clusterName(p), synonyms: p.synonyms, desi: p.desiName?.roman }));
}
