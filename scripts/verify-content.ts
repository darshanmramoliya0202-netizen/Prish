/**
 * Content gate — runs in `prebuild` and CI. Fails the build when:
 *  - the product model does not validate (zod, in content/products.ts)
 *  - counts / slugs / cross-references are wrong
 *  - a colour world fails WCAG AA for body text
 *  - a forbidden claim from the v2 audit reappears anywhere in shipped source
 *  - an illustration referenced by content is missing (strict when VERIFY_ASSETS=strict)
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { products } from "../content/products";
import { clusters } from "../content/clusters";
import { cropCalendar } from "../content/crop-calendar";
import { certificates } from "../content/certificates";
import { regions } from "../content/regions";

const ROOT = join(import.meta.dirname, "..");
const errors: string[] = [];
const warnings: string[] = [];

// ─── 1. counts & references ────────────────────────────────────────────────
if (products.length !== 27)
  errors.push(`expected 27 products, got ${products.length}`);

const slugs = new Set<string>();
for (const p of products) {
  if (slugs.has(p.slug)) errors.push(`duplicate slug ${p.slug}`);
  slugs.add(p.slug);
  if (!clusters.some((c) => c.id === p.cluster))
    errors.push(`${p.id}: unknown cluster ${p.cluster}`);
  if (!cropCalendar.some((r) => r.productId === p.id))
    errors.push(`${p.id}: no crop-calendar row`);
}
for (const c of clusters) {
  if (!products.some((p) => p.id === c.heroProductId))
    errors.push(`cluster ${c.id}: heroProductId ${c.heroProductId} not found`);
  if (!products.some((p) => p.cluster === c.id))
    errors.push(`cluster ${c.id}: has no products`);
}
for (const r of cropCalendar) {
  if (!products.some((p) => p.id === r.productId))
    errors.push(`crop-calendar: unknown product ${r.productId}`);
}
for (const c of certificates) {
  if (c.number !== null && /x{3,}/i.test(c.number))
    errors.push(`certificate ${c.id}: placeholder number`);
}
if (regions.length !== 4)
  errors.push(`expected 4 regions, got ${regions.length}`);

// ─── 2. colour-world contrast (WCAG AA 4.5:1 for body text) ────────────────
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (l1 + 0.05) / (l2 + 0.05);
}
const INK_LIGHT = "#fbf8f1";
const INK_DARK = "#14110c";
for (const p of products) {
  const ink = p.colourWorld.ink === "light" ? INK_LIGHT : INK_DARK;
  const ratio = contrast(p.colourWorld.primary, ink);
  if (ratio < 4.5)
    errors.push(
      `${p.id}: colourWorld ${p.colourWorld.primary} with ${p.colourWorld.ink} ink is ${ratio.toFixed(2)}:1 (< 4.5)`,
    );
  const other = p.colourWorld.ink === "light" ? INK_DARK : INK_LIGHT;
  if (contrast(p.colourWorld.primary, other) > ratio + 2)
    warnings.push(
      `${p.id}: the other ink colour would contrast better on ${p.colourWorld.primary}`,
    );
}
for (const c of clusters) {
  const ink = c.colourWorld.ink === "light" ? INK_LIGHT : INK_DARK;
  const ratio = contrast(c.colourWorld.primary, ink);
  if (ratio < 4.5)
    errors.push(
      `cluster ${c.id}: colourWorld contrast ${ratio.toFixed(2)}:1 (< 4.5)`,
    );
}

// ─── 3. forbidden claims (from the v2 audit) ───────────────────────────────
const FORBIDDEN: [RegExp, string][] = [
  [/\b\d+\s*\+?\s*countries\b/i, "country counts (only 4 regions)"],
  [/APEDA (Registered|Export Excellence)/i, "APEDA claim (under approval)"],
  [/\b(Established|Since|Est\.?)\s*(19|20)\d\d\b/i, "founding year"],
  [/X{4,}/, "placeholder Xs"],
  [/10825999000228/, "unverified FSSAI number"],
  [/\bHalal\b/i, "Halal (not held)"],
  [/\bGMP\b/, "GMP (not held)"],
  [
    /Laser Sorting|multi-spectrum|Vision-Based Inspection/i,
    "invented technology",
  ],
  [/99\.2%|±0\.5%|<\s*0\.1%/, "invented QC numbers"],
  [/Best Seller|High Demand|\bTrending\b/i, "fake sales badges"],
  [/Live export network/i, "fake live data"],
  [/Prish Patel/, "invented founder"],
  [/\bSurat\b/, "wrong HQ city"],
  [
    /\b24 ?hrs\b|24[–-]48|within 7 days|no minimum order/i,
    "response/sample promises",
  ],
  [/pesticide-free/i, "unsubstantiated claim"],
  [/\bcardamom\b|\bfennel\b/i, "products we do not sell"],
  [/\$450B|NITI Aayog/i, "unverified macro figure"],
  [
    /\b(Japan|Australia|Canada|East Africa|South America|Brazil|Kenya)\b/,
    "markets not served",
  ],
  [/Traceble|Multi-Orifin|INGRIDENTS|standarized|POWEDER/i, "brochure typo"],
  [
    /our (own )?factory|REAL FACTORY|REAL MACHINERY|REAL WAREHOUSE/i,
    "facility claim",
  ],
  [
    /\bunfiltered\b|NO STOCK PHOTOS|No corporate polish/i,
    "removed lines (owner note)",
  ],
  [
    /(FSSAI|ISO|HACCP) Certified|Spices Board Registered/i,
    "cert claim phrasing — render from certificates.ts",
  ],
  [
    /\bMOQ\b|lead[- ]time|payment terms|\bT\/T\b|\bL\/C\b|\bLC at sight\b/i,
    "commercial terms not published",
  ],
  [
    /\bMundra\b|Nhava Sheva|\bPipavav\b|\bKandla\b|\bJNPT\b/,
    "ports not published",
  ],
  [/\bUSD\b|\$\s?\d/, "prices not published"],
  [
    /\b(Strawberry|Blueberry|Blackberry|Raspberry|Cranberry)\b/i,
    "excluded berries",
  ],
  [/testimonial/i, "no testimonials"],
  [
    /inquiry-first buyer conversion|abstract planets|narrative is built on method/i,
    "internal notes leaked as copy (v2)",
  ],
];

const SCAN_DIRS = ["app", "components", "content", "emails", "lib", "stores"];
const SCAN_EXT = new Set([".ts", ".tsx", ".json", ".md", ".mdx", ".css"]);
const SKIP = new Set(["node_modules", ".next", "generated"]); // generated JSON is checked via products.ts fields below

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (SCAN_EXT.has(p.slice(p.lastIndexOf(".")))) out.push(p);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = relative(ROOT, file).split(sep).join("/");
  for (const [re, why] of FORBIDDEN) {
    const m = re.exec(text);
    if (m) {
      const line = text.slice(0, m.index).split("\n").length;
      errors.push(`${rel}:${line} — "${m[0]}" (${why})`);
    }
  }
}

// rendered product fields (from the generated JSON, via the merged model)
for (const p of products) {
  const rendered = [
    p.name,
    p.shortName,
    p.profile.science,
    p.profile.whyIndian,
    p.profile.benefits,
    ...p.applications,
    ...p.originRegions,
    ...p.specs.map((s) => `${s.label}: ${s.value}`),
    p.seo.title,
    p.seo.description,
  ].join("\n");
  for (const [re, why] of FORBIDDEN) {
    const m = re.exec(rendered);
    if (m) errors.push(`product ${p.id} — "${m[0]}" (${why})`);
  }
}

// ─── 4. assets ─────────────────────────────────────────────────────────────
// pre-rendered by scripts/render-bowls.tsx (runs first in prebuild)
for (const p of products) {
  const base = join(
    ROOT,
    "public",
    "illustrations",
    "products",
    p.illustration.id,
  );
  const missing = [".svg", ".png"].filter((ext) => !existsSync(base + ext));
  if (missing.length)
    errors.push(
      `${p.id}: missing pre-rendered illustration ${missing.join(", ")} — run npm run render:bowls`,
    );
}

// ─── 5. India outline ──────────────────────────────────────────────────────
// The map must follow the Survey of India boundary: Gilgit-Baltistan, the whole of
// J&K/Ladakh and Aksai Chin inside the outline. Point-in-polygon on the projected path.
{
  const map = JSON.parse(
    readFileSync(join(ROOT, "content", "generated", "india-map.json"), "utf8"),
  ) as { path: string; scale: number; translate: [number, number] };
  const project = ([lng, lat]: [number, number]): [number, number] => {
    const y = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
    return [
      map.scale * ((lng * Math.PI) / 180) + map.translate[0],
      -map.scale * y + map.translate[1],
    ];
  };
  const rings = map.path
    .split("M")
    .filter(Boolean)
    .map((r) =>
      r
        .replace(/Z$/, "")
        .split("L")
        .map((pt) => pt.split(",").map(Number) as [number, number]),
    );
  const inside = ([x, y]: [number, number]) => {
    let hit = false;
    for (const ring of rings) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i]!;
        const [xj, yj] = ring[j]!;
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
          hit = !hit;
      }
    }
    return hit;
  };
  const mustBeInside: [string, [number, number]][] = [
    ["Skardu (Gilgit-Baltistan)", [75.6, 35.3]],
    ["Muzaffarabad", [73.5, 34.4]],
    ["Aksai Chin", [79.2, 35.2]],
    ["Leh", [77.6, 34.2]],
    ["Srinagar", [74.8, 34.1]],
    ["Rajkot", [70.8, 22.3]],
  ];
  for (const [name, coords] of mustBeInside)
    if (!inside(project(coords)))
      errors.push(
        `india-map.json: ${name} falls outside the outline — regenerate with npm run build:india-map (Survey of India boundary)`,
      );
}

// ─── report ────────────────────────────────────────────────────────────────
const authored = products
  .filter((p) => p.profile.source === "authored")
  .map((p) => p.id);
console.log(
  `verify:content — ${products.length} products · ${clusters.length} families · ${cropCalendar.length} calendar rows · ${certificates.filter((c) => c.number).length} certificates with numbers`,
);
console.log(
  `authored profiles awaiting owner review (${authored.length}): ${authored.join(", ")}`,
);
if (warnings.length) {
  console.log(`\nwarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (errors.length) {
  console.error(`\nERRORS (${errors.length}):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("\ncontent OK");
