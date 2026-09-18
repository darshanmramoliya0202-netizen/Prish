/** Content model — see docs/content-rules.md. Product `id` equals the CRM key in products.py. */

export type ClusterId =
  | "fruit_powders"
  | "veg_herbal_powders"
  | "dehydrates"
  | "raw_spices"
  | "botanicals"
  | "rice";

export type RegionId = "us" | "eu" | "gcc" | "sea";

export type FlagId =
  | "cres_required"
  | "eto_scrutiny"
  | "novel_food_check"
  | "organic_expected"
  | "aflatoxin_mrl";

export type BuyerTypeId =
  | "nutraceutical"
  | "functional_bev"
  | "bakery_ingredient"
  | "baby_food"
  | "flavour_house"
  | "seasoning_blender"
  | "sauce_readymeal"
  | "snack_manufacturer"
  | "meat_processor"
  | "spice_processor"
  | "importer_distributor"
  | "ethnic_wholesaler"
  | "retail_private_label"
  | "horeca"
  | "pet_food"
  | "cosmetic"
  | "rice_importer";

export type ProductForm = "powder" | "flakes" | "whole" | "fried" | "grain";

export type Script = "deva" | "gujr";

export interface DesiName {
  script: Script;
  text: string;
  roman: string;
  lang: "hi" | "gu";
}

export interface SpecRow {
  label: string;
  value: string;
  note?: string;
}

export interface GradeRow {
  parameter: string;
  range: string;
}

export interface ColourWorld {
  /** the "world" background */
  primary: string;
  /** complementary tone for gradients */
  secondary: string;
  /** which ink colour reads on `primary` */
  ink: "light" | "dark";
  /** burst palette */
  particles: [string, string, string, string];
}

export interface Profile {
  source: "docx" | "authored";
  science: string;
  whyIndian: string;
  benefits: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  desiName?: DesiName;
  cluster: ClusterId;
  form: ProductForm;
  variants?: string[];
  originRegions: string[];
  hs: { hs6: string; itcHs?: string; verified: boolean; altHs6?: string[] };
  flags: FlagId[];
  buyerTypes: BuyerTypeId[];
  synonyms: string[];
  profile: Profile;
  specs: SpecRow[];
  gradeTable?: GradeRow[];
  applications: string[];
  packaging: string[];
  shelfLife: string;
  colourWorld: ColourWorld;
  illustration: { id: string; alt: string };
  seo: { title: string; description: string; keywords: string[] };
  /** internal, never rendered */
  crmNote?: string;
}

export interface Cluster {
  id: ClusterId;
  slug: string;
  name: string;
  shortName: string;
  accent: DesiName;
  promise: string;
  description: string;
  heroProductId: string;
  colourWorld: ColourWorld;
  order: number;
}

export interface Region {
  id: RegionId;
  name: string;
  short: string;
  countriesHint: string[];
  timezones: string[];
  languages: string[];
  incotermDefault: "FOB" | "CIF";
  /** [lng, lat] arc target for the journey map */
  arcTarget: [number, number];
  compliance: {
    general: string[];
    byFlag: Partial<Record<FlagId, string>>;
    docsUsuallyAsked: string[];
  };
}

export type CertificateId =
  "fssai" | "iec" | "gst" | "spices_board" | "iso" | "haccp" | "apeda_rcmc";

export interface Certificate {
  id: CertificateId;
  name: string;
  issuer: string;
  status: "held" | "in_process";
  /** null → never rendered */
  number: string | null;
  scope?: string;
  validUntil?: string;
  /** owner-supplied scan, e.g. /images/certificates/fssai.webp */
  preview?: string;
  showOn: ("quality" | "footer" | "pdf")[];
  verifyUrl?: string;
}

export type MonthStatus = "harvest" | "processing" | "stock" | "lean";

export interface CropCalendarRow {
  productId: string;
  months: MonthStatus[]; // length 12, Jan..Dec
  note: string;
}

export interface Person {
  name: string;
  role: string;
  photo: string | null;
  note: string[];
}

export interface BuyerStory {
  product: string;
  region: RegionId;
  text: string;
}

export interface AncientRoot {
  title: string;
  text: string;
  source: string;
  coords?: [number, number];
}
