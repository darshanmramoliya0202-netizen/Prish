import { z } from "zod";
import generated from "./generated/products.json";
import { overrides } from "./overrides/products";
import type { BuyerTypeId, ClusterId, FlagId, Product } from "./types";

/** Brochure p7 — the only packaging list we publish. */
export const BROCHURE_PACKAGING = [
  "HDPE export bag (outer food grade)",
  "BOPP / brown kraft paper bag",
  "Multi-layer laminated bulk box",
  "25 kg food-grade fibre drum",
  "Small pack sizes supported on request",
] as const;

const hex = z.string().regex(/^#[0-9a-f]{6}$/i);

const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  shortName: z.string().min(1),
  desiName: z
    .object({
      script: z.enum(["deva", "gujr"]),
      text: z.string().min(1),
      roman: z.string().min(1),
      lang: z.enum(["hi", "gu"]),
    })
    .optional(),
  cluster: z.enum(["fruit_powders", "veg_herbal_powders", "dehydrates", "raw_spices", "botanicals", "rice"]),
  form: z.enum(["powder", "flakes", "whole", "fried", "grain"]),
  variants: z.array(z.string()).optional(),
  originRegions: z.array(z.string()).min(1),
  hs: z.object({
    hs6: z.string().regex(/^\d{6}$/),
    itcHs: z.string().regex(/^\d{8}$/).optional(),
    verified: z.boolean(),
    altHs6: z.array(z.string()).optional(),
  }),
  flags: z.array(z.enum(["cres_required", "eto_scrutiny", "novel_food_check", "organic_expected", "aflatoxin_mrl"])),
  buyerTypes: z.array(z.string()).min(1),
  synonyms: z.array(z.string()),
  profile: z.object({
    source: z.enum(["docx", "authored"]),
    science: z.string().min(20),
    whyIndian: z.string().min(10),
    benefits: z.string().min(10),
  }),
  specs: z.array(z.object({ label: z.string(), value: z.string(), note: z.string().optional() })).min(3),
  gradeTable: z.array(z.object({ parameter: z.string(), range: z.string() })).optional(),
  applications: z.array(z.string()).min(1),
  packaging: z.array(z.string()).min(1),
  shelfLife: z.string().min(1),
  colourWorld: z.object({
    primary: hex,
    secondary: hex,
    ink: z.enum(["light", "dark"]),
    particles: z.tuple([hex, hex, hex, hex]),
  }),
  illustration: z.object({ id: z.string(), alt: z.string().startsWith("Illustration of") }),
  seo: z.object({ title: z.string().min(8), description: z.string().min(40).max(200), keywords: z.array(z.string()).min(1) }),
  crmNote: z.string().optional(),
});

type Generated = (typeof generated)[number];

function shelfLifeFrom(specs: { label: string; value: string }[], fallback = "12–24 months"): string {
  const row = specs.find((s) => s.label.toLowerCase().startsWith("shelf"));
  return row?.value ?? fallback;
}

function merge(g: Generated): Product {
  const o = overrides[g.id];
  if (!o) throw new Error(`content: missing override for product "${g.id}" (content/overrides/products.ts)`);
  const profile = g.profile ?? o.profile;
  if (!profile) throw new Error(`content: product "${g.id}" has neither a docx profile nor an authored one`);
  const specs = g.specs.length ? g.specs : (o.specs ?? []);
  const originRegions = o.originRegions?.length ? o.originRegions : g.originRegions;
  return {
    id: g.id,
    slug: o.slug,
    name: g.name,
    shortName: o.shortName,
    desiName: o.desiName,
    cluster: g.cluster as ClusterId,
    form: o.form,
    variants: g.variants ?? undefined,
    originRegions,
    hs: {
      hs6: g.hs.hs6,
      itcHs: g.hs.itcHs ?? undefined,
      verified: g.hs.verified,
      altHs6: g.hs.altHs6,
    },
    flags: g.flags as FlagId[],
    buyerTypes: g.buyerTypes as BuyerTypeId[],
    synonyms: g.synonyms,
    profile: { source: profile.source as "docx" | "authored", science: profile.science, whyIndian: profile.whyIndian, benefits: profile.benefits },
    specs,
    gradeTable: g.gradeTable ?? undefined,
    applications: g.applications.length ? g.applications : (o.applications ?? []),
    packaging: o.packaging ?? [...BROCHURE_PACKAGING],
    shelfLife: o.shelfLife ?? shelfLifeFrom(specs),
    colourWorld: o.colourWorld,
    illustration: { id: o.slug, alt: o.alt },
    seo: o.seo,
    crmNote: g.crmNote ?? undefined,
  };
}

const merged = generated.map(merge);

// Validate once at module load; verify-content re-runs this in CI with a full report.
const parsed = z.array(productSchema).safeParse(merged);
if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n");
  throw new Error(`content/products.ts failed validation:\n${issues}`);
}

export const products: Product[] = merged;
export { productSchema };
