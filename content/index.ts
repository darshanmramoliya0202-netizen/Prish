import { products } from "./products";
import { clusters } from "./clusters";
import { cropCalendar } from "./crop-calendar";
import buyerTypesJson from "./generated/buyer-types.json";
import { flagCopy } from "./flags";
import type {
  BuyerTypeId,
  Cluster,
  ClusterId,
  CropCalendarRow,
  FlagId,
  Product,
} from "./types";

export { products, clusters, cropCalendar };
export { regions, regionById } from "./regions";
export { certificates, visibleCertificates } from "./certificates";
export { story } from "./story";
export { journey } from "./journey";
export {
  productPhotos,
  sitePhoto,
  photoCoverage,
  photoCaptions,
} from "./photos";
export type { Photo, ProductPhotos, ProductPhotoRole } from "./photos";
export { site } from "./site";
export * from "./copy";
export type * from "./types";

const byId = new Map(products.map((p) => [p.id, p]));
const bySlug = new Map(products.map((p) => [p.slug, p]));
const clusterById = new Map(clusters.map((c) => [c.id, c]));
const clusterBySlug = new Map(clusters.map((c) => [c.slug, c]));

export const buyerTypeLabel: Record<BuyerTypeId, string> = Object.fromEntries(
  buyerTypesJson.map((b) => [b.id, b.label]),
) as Record<BuyerTypeId, string>;

export const flagText: Record<FlagId, string> = Object.fromEntries(
  (Object.keys(flagCopy) as FlagId[]).map((k) => [k, flagCopy[k].text]),
) as Record<FlagId, string>;
export { flagCopy };

export function getProduct(id: string): Product | undefined {
  return byId.get(id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getCluster(id: ClusterId): Cluster {
  const c = clusterById.get(id);
  if (!c) throw new Error(`unknown cluster ${id}`);
  return c;
}

export function getClusterBySlug(slug: string): Cluster | undefined {
  return clusterBySlug.get(slug);
}

export function productsByCluster(id: ClusterId): Product[] {
  return products.filter((p) => p.cluster === id);
}

export function clusterOf(p: Product): Cluster {
  return getCluster(p.cluster);
}

export function productPath(p: Product): string {
  return `/products/${clusterOf(p).slug}/${p.slug}`;
}

export function clusterPath(c: Cluster): string {
  return `/products/${c.slug}`;
}

export function allProductParams(): { cluster: string; slug: string }[] {
  return products.map((p) => ({ cluster: clusterOf(p).slug, slug: p.slug }));
}

export function calendarFor(productId: string): CropCalendarRow | undefined {
  return cropCalendar.find((r) => r.productId === productId);
}

export const orderedClusters: Cluster[] = [...clusters].sort(
  (a, b) => a.order - b.order,
);
