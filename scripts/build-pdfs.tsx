/**
 * Build-time PDFs via @react-pdf/renderer (pure JS — no browser on the aarch64 VM).
 *   public/downloads/spec-sheets/<slug>.pdf   (27)
 *   public/downloads/prish-overseas-catalogue.pdf
 * Skips unchanged output using a content hash of the product model + templates.
 */
import React from "react";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToFile } from "@react-pdf/renderer";
import QRCode from "qrcode";
import {
  products,
  clusters,
  regions,
  certificates,
  flagText,
  buyerTypeLabel,
  getCluster,
  productsByCluster,
  productPath,
} from "../content";
import { registerFonts, png } from "../lib/pdf/theme";
import { SpecSheetDocument, type SpecSheetProps } from "../lib/pdf/SpecSheet";
import { CatalogueDocument } from "../lib/pdf/Catalogue";
import pkg from "../package.json";

const ROOT = join(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "downloads");
const SHEETS = join(OUT, "spec-sheets");
const ILLUS = join(ROOT, "public", "illustrations", "products");
const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.prishoverseas.com"
).replace(/\/+$/, "");
const date = new Date().toISOString().slice(0, 10);
const version = pkg.version;

mkdirSync(SHEETS, { recursive: true });
const manifestPath = join(OUT, ".manifest.json");
const manifest: Record<string, string> = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : {};

// hash of everything that influences output (model + templates + version)
const templateHash = createHash("sha1")
  .update(readFileSync(join(ROOT, "lib", "pdf", "SpecSheet.tsx")))
  .update(readFileSync(join(ROOT, "lib", "pdf", "Catalogue.tsx")))
  .update(readFileSync(join(ROOT, "lib", "pdf", "theme.ts")))
  .update(version)
  .digest("hex")
  .slice(0, 8);

const sealPngPath = join(ROOT, "public", "brand", "logo-seal-email.png");
const sealCreamPath = join(ROOT, "public", "brand", "logo-seal-cream.png");
const sealPng = png(sealPngPath);

async function qr(url: string) {
  const buf = await QRCode.toBuffer(url, {
    width: 320,
    margin: 1,
    color: { dark: "#0b3d2e", light: "#fbf8f1" },
  });
  return { data: buf, format: "png" as const };
}

async function sheetFor(p: (typeof products)[number]): Promise<SpecSheetProps> {
  const url = `${SITE}${productPath(p)}`;
  return {
    product: p,
    cluster: getCluster(p.cluster),
    regions,
    flagText,
    buyerTypeLabel,
    sealPng,
    bowlPng: png(join(ILLUS, `${p.slug}.png`)),
    qrPng: await qr(url),
    url,
    version,
    date,
  };
}

async function main() {
  registerFonts();
  const sealCreamPng = existsSync(sealCreamPath) ? png(sealCreamPath) : sealPng;
  let rendered = 0;
  const sheets = new Map<string, SpecSheetProps>();
  for (const p of products) {
    const props = await sheetFor(p);
    sheets.set(p.id, props);
    const hash = createHash("sha1")
      .update(JSON.stringify(p))
      .update(templateHash)
      .digest("hex")
      .slice(0, 12);
    const out = join(SHEETS, `${p.slug}.pdf`);
    if (manifest[p.slug] === hash && existsSync(out)) continue;
    await renderToFile(<SpecSheetDocument {...props} />, out);
    manifest[p.slug] = hash;
    rendered++;
  }
  const catHash = createHash("sha1")
    .update(JSON.stringify(products))
    .update(JSON.stringify(certificates))
    .update(templateHash)
    .digest("hex")
    .slice(0, 12);
  const catOut = join(OUT, "prish-overseas-catalogue.pdf");
  if (manifest.catalogue !== catHash || !existsSync(catOut)) {
    const coverBowls = clusters
      .slice(0, 4)
      .map((c) =>
        png(
          join(
            ILLUS,
            `${products.find((p) => p.id === c.heroProductId)!.slug}.png`,
          ),
        ),
      );
    await renderToFile(
      <CatalogueDocument
        clusters={clusters}
        productsByCluster={productsByCluster}
        sheetFor={(p) => sheets.get(p.id)!}
        certificates={certificates}
        regions={regions}
        sealPng={sealPng}
        sealCreamPng={sealCreamPng}
        coverBowls={coverBowls}
        qrPng={await qr(`${SITE}/inquiry`)}
        version={version}
        date={date}
      />,
      catOut,
    );
    manifest.catalogue = catHash;
    rendered++;
  }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(
    `build:pdfs — ${rendered} rendered, ${products.length + 1 - rendered} unchanged`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
