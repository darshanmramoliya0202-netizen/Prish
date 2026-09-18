import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_SIZE, renderOg } from "@/lib/og";
import {
  allProductParams,
  getProductBySlug,
  getClusterBySlug,
} from "@/content";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return allProductParams();
}

export default async function Image({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}) {
  const { cluster, slug } = await params;
  const p = getProductBySlug(slug);
  const c = getClusterBySlug(cluster);
  if (!p || !c) return renderOg({ title: "Prish Overseas" });
  // pre-rendered by scripts/render-bowls.tsx (prebuild)
  const png = await readFile(
    join(process.cwd(), "public", "illustrations", "products", `${p.slug}.png`),
  ).catch(() => null);
  const image = png
    ? `data:image/png;base64,${png.toString("base64")}`
    : undefined;
  const ink = p.colourWorld.ink === "light" ? "#fbf8f1" : "#14110c";
  return renderOg({
    eyebrow: `${c.name} · Indian origin`,
    title: p.name,
    sub: p.seo.description,
    bg: p.colourWorld.primary,
    bg2: p.colourWorld.secondary,
    ink,
    accent: p.colourWorld.ink === "light" ? "#eccf8a" : "#0b3d2e",
    image,
  });
}
