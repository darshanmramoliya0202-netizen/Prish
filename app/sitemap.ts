import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { orderedClusters, products, productPath, clusterPath } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const statics = ["/", "/products", "/story", "/quality", "/inquiry", "/crop-calendar", "/privacy"].map((p, i) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: (i === 0 ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: i === 0 ? 1 : 0.7,
  }));
  const families = orderedClusters.map((c) => ({ url: `${base}${clusterPath(c)}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 }));
  const skus = products.map((p) => ({ url: `${base}${productPath(p)}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 }));
  return [...statics, ...families, ...skus];
}
