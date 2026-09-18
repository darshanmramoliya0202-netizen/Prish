/**
 * Pre-render every product bowl to public/illustrations/products/<slug>.svg
 * and a 1000px PNG for PDFs/OG. Runs in `prebuild`; skips files whose content hash matches.
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { products } from "../content/products";
import { ProductBowl } from "../components/products/ProductBowl";

const OUT = join(
  import.meta.dirname,
  "..",
  "public",
  "illustrations",
  "products",
);
mkdirSync(OUT, { recursive: true });
const manifestPath = join(OUT, ".manifest.json");
const manifest: Record<string, string> = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : {};

async function main() {
  let rendered = 0;
  for (const p of products) {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n${renderToStaticMarkup(<ProductBowl product={p} id={`b-${p.slug}`} />).replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"')}`;
    const hash = createHash("sha1").update(svg).digest("hex").slice(0, 12);
    const svgPath = join(OUT, `${p.slug}.svg`);
    const pngPath = join(OUT, `${p.slug}.png`);
    if (manifest[p.slug] === hash && existsSync(svgPath) && existsSync(pngPath))
      continue;
    writeFileSync(svgPath, svg);
    const png = await sharp(Buffer.from(svg), { density: 200 })
      .resize(1000, 1000)
      .png({ compressionLevel: 9 })
      .toBuffer();
    // the manifest is only updated after a successful write, so a rerun picks up any miss
    writeFileSync(pngPath, png);
    manifest[p.slug] = hash;
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    rendered++;
  }
  console.log(
    `render:bowls — ${rendered} rendered, ${products.length - rendered} unchanged`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
