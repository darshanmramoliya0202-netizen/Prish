import type { Metadata } from "next";
import { contact } from "@/data/site";

const fallbackSiteUrl = "http://localhost:3000";

export const siteName = "Prish Overseas";
export const defaultTitle = "Prish Overseas | Indian-Origin Ingredients for Global Formulations";
export const defaultDescription =
  "Prish Overseas supplies traceable Indian botanical powders, dehydrated ingredients, rice, and spice-led export programs for global B2B buyers.";
export const defaultKeywords = [
  "Prish Overseas",
  "Indian-origin ingredients",
  "botanical powders exporter",
  "dehydrated onion powder exporter",
  "dehydrated garlic powder exporter",
  "jamun powder supplier",
  "turmeric powder exporter",
  "India export ingredients",
  "B2B food ingredients India",
  "Rajkot export company"
];

export function getSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl;
  const normalized = candidate.endsWith("/") ? candidate : `${candidate}/`;

  return new URL(normalized);
}

export function resolveUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, getSiteUrl());
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({ title, description, path, keywords = [] }: PageMetadataOptions): Metadata {
  const url = resolveUrl(path);

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: resolveUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteName} social preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolveUrl("/twitter-image")]
    }
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    description: defaultDescription,
    url: getSiteUrl().origin,
    email: contact.email,
    telephone: contact.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.address[0]}, ${contact.address[1]}`,
      addressLocality: "Rajkot",
      addressRegion: "Gujarat",
      postalCode: "360003",
      addressCountry: "IN"
    },
    areaServed: ["United States", "European Union", "GCC Region", "Southeast Asia"],
    sameAs: []
  };
}
