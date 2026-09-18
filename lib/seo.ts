import type { Metadata } from "next";
import { site } from "@/content/site";

const FALLBACK = "http://localhost:3000";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK;
  return raw.replace(/\/+$/, "");
}

export function resolveUrl(path = "/"): string {
  const base = getSiteUrl();
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultTitle = `${site.company} | Indian-origin ingredients for global formulations`;
export const defaultDescription =
  "Prish Overseas, Rajkot: fruit, vegetable and herbal powders, dehydrated onion and garlic, whole spices, moringa and basmati rice — farm-rooted, export-documented, shipped to the US, EU, GCC and Southeast Asia.";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createPageMetadata(meta: PageMeta): Metadata {
  const url = resolveUrl(meta.path);
  const image = meta.image ?? "/opengraph-image";
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: site.company,
      locale: "en_IN",
      type: meta.type ?? "website",
      images: [{ url: image, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [image] },
    robots: meta.noIndex ? { index: false, follow: false } : undefined,
  };
}
