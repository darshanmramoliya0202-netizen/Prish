import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/seo";

const routes = ["/", "/products", "/about", "/quality", "/inquiry"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/inquiry" ? 0.9 : 0.8
  }));
}
