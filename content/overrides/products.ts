/**
 * Hand-authored per-SKU fields that the generator cannot know:
 * slug, short name, desi name, form, colour world, illustration alt, SEO — and, for the
 * 16 SKUs the catalogue .docx does not profile, an authored profile marked
 * `source: "authored"` (owner reviews before launch; see docs/content-rules.md §9).
 *
 * Authored science/benefit lines are general food-science facts about the ingredient,
 * never claims about Prish lots. Spec values follow the catalogue's own "typical values"
 * pattern and always render with the COA disclaimer.
 */
import type { ColourWorld, DesiName, ProductForm, Profile, SpecRow } from "../types";

export interface ProductOverride {
  slug: string;
  shortName: string;
  desiName?: DesiName;
  form: ProductForm;
  colourWorld: ColourWorld;
  alt: string;
  seo: { title: string; description: string; keywords: string[] };
  /** only for SKUs without a docx profile */
  profile?: Profile;
  specs?: SpecRow[];
  applications?: string[];
  /** adds to / replaces generator origin list */
  originRegions?: string[];
  shelfLife?: string;
  packaging?: string[];
}

const hi = (text: string, roman: string): DesiName => ({ script: "deva", text, roman, lang: "hi" });

const world = (
  primary: string,
  secondary: string,
  ink: "light" | "dark",
  particles: [string, string, string, string],
): ColourWorld => ({ primary, secondary, ink, particles });

/** Shared "typical values" rows for fine powders (catalogue pattern). */
const powderSpecs = (color: string, odour: string, moisture = "≤5%", shelf = "Up to 24 months"): SpecRow[] => [
  { label: "Appearance", value: "Fine powder" },
  { label: "Color", value: color },
  { label: "Odor & Taste", value: odour },
  { label: "Mesh Size", value: "As per requirement" },
  { label: "Moisture", value: moisture },
  { label: "Shelf Life", value: shelf },
  { label: "Packaging", value: "Food-grade / customized" },
  { label: "Storage", value: "Cool & dry place" },
];

const authored = (science: string, whyIndian: string, benefits: string): Profile => ({
  source: "authored",
  science,
  whyIndian,
  benefits,
});

export const overrides: Record<string, ProductOverride> = {
  // ───────────────────────────── fruit powders ─────────────────────────────
  jamun_powder: {
    slug: "jamun-powder",
    shortName: "Jamun",
    desiName: hi("जामुन", "Jamun"),
    form: "powder",
    colourWorld: world("#3f1a36", "#6b2f5b", "light", ["#3f1a36", "#7a3b6e", "#b06aa3", "#f6f1e4"]),
    alt: "Illustration of deep purple jamun powder heaped in a black stone bowl",
    originRegions: ["Gujarat", "Maharashtra", "Tamil Nadu", "Andhra Pradesh"],
    seo: {
      title: "Jamun (Java Plum) Powder from India",
      description:
        "Deep-purple jamun powder, naturally rich in anthocyanins and polyphenols. Indian origin, export-documented, typical specs and lot-specific COA on request.",
      keywords: ["jamun powder", "java plum powder", "syzygium cumini powder", "jamun powder exporter india"],
    },
  },
  apple_powder: {
    slug: "apple-powder",
    shortName: "Apple",
    desiName: hi("सेब", "Seb"),
    form: "powder",
    colourWorld: world("#e9d9a6", "#c9b877", "dark", ["#e9d9a6", "#d4b35a", "#b8862f", "#f6f1e4"]),
    alt: "Illustration of pale yellow apple powder in a black stone bowl",
    originRegions: ["Himachal Pradesh", "Jammu & Kashmir", "Uttarakhand"],
    seo: {
      title: "Apple Powder from India",
      description:
        "Spray/drum-dried apple powder with pectin fibre and polyphenols for bakery, beverages and baby food. Indian origin, export-documented.",
      keywords: ["apple powder", "apple fruit powder", "apple powder supplier india"],
    },
  },
  pineapple_powder: {
    slug: "pineapple-powder",
    shortName: "Pineapple",
    desiName: hi("अनानास", "Ananas"),
    form: "powder",
    colourWorld: world("#f1c40f", "#c99a06", "dark", ["#f1c40f", "#f5d64a", "#b8862f", "#f6f1e4"]),
    alt: "Illustration of golden pineapple powder in a black stone bowl",
    originRegions: ["Tripura", "Assam", "Meghalaya", "Kerala", "Karnataka"],
    profile: authored(
      "Pineapple carries bromelain enzymes, vitamin C and manganese, with a sugar–acid balance that survives drying well.",
      "India’s north-eastern belt and Kerala grow sweet, high-acid varieties (Queen, Kew) with strong aroma.",
      "Natural tropical flavour and colour for beverages, confectionery and dairy; supports digestion.",
    ),
    specs: powderSpecs("Pale yellow", "Sweet, tangy, characteristic"),
    applications: ["Beverages", "Confectionery", "Dairy & desserts", "Bakery"],
    seo: {
      title: "Pineapple Powder from India",
      description: "Bright pineapple fruit powder for beverages, confectionery and dairy. Indian origin, export-documented, COA on request.",
      keywords: ["pineapple powder", "pineapple fruit powder", "pineapple powder exporter india"],
    },
  },
  raw_mango_powder: {
    slug: "raw-mango-powder-amchur",
    shortName: "Raw Mango (Amchur)",
    desiName: hi("आमचूर", "Amchur"),
    form: "powder",
    colourWorld: world("#b9c85a", "#8ea03a", "dark", ["#b9c85a", "#d6e07c", "#6f8a2a", "#f6f1e4"]),
    alt: "Illustration of khaki-green raw mango powder in a black stone bowl",
    originRegions: ["Uttar Pradesh", "Andhra Pradesh", "Gujarat (Saurashtra)"],
    profile: authored(
      "Sun-dried unripe mango retains citric and malic acids and a share of its vitamin C, which is why amchur works as a natural souring agent.",
      "India is the world’s largest mango grower; green mangoes for amchur are a long-standing trade in UP, Andhra Pradesh and Gujarat.",
      "Clean sour note without liquid, for spice blends, chutneys, chaat masala and snack seasonings.",
    ),
    specs: powderSpecs("Khaki to light brown", "Sour, fruity", "≤8%", "12–18 months"),
    applications: ["Spice blends", "Chaat masala", "Snack seasonings", "Chutneys & sauces"],
    seo: {
      title: "Raw Mango Powder (Amchur) from India",
      description: "Amchur — sun-dried green mango powder — the natural souring agent for spice blends and seasonings. Indian origin, export-documented.",
      keywords: ["amchur", "raw mango powder", "dried mango powder", "amchur exporter india"],
    },
  },
  guava_powder: {
    slug: "guava-powder",
    shortName: "Guava",
    desiName: hi("अमरूद", "Amrood"),
    form: "powder",
    colourWorld: world("#f2b6a0", "#d98d74", "dark", ["#f2b6a0", "#e8927a", "#c9634a", "#f6f1e4"]),
    alt: "Illustration of blush-pink guava powder in a black stone bowl",
    originRegions: ["Uttar Pradesh (Prayagraj)", "Maharashtra", "Bihar", "Gujarat"],
    profile: authored(
      "Guava is among the richest common fruits in vitamin C and contains lycopene (pink varieties), pectin fibre and quercetin.",
      "India is the world’s largest guava producer; Prayagraj and Maharashtra belts grow pink-fleshed fruit with strong aroma.",
      "Fruit-forward flavour and fibre for beverages, nutraceutical blends and confectionery.",
    ),
    specs: powderSpecs("Pale pink to cream", "Sweet, musky, characteristic"),
    applications: ["Functional beverages", "Nutraceutical blends", "Confectionery", "Dairy"],
    seo: {
      title: "Guava Powder from India",
      description: "Pink guava powder rich in vitamin C and pectin fibre for beverages and nutraceuticals. Indian origin, export-documented.",
      keywords: ["guava powder", "guava fruit powder", "pink guava powder india"],
    },
  },
  mulberry_powder: {
    slug: "mulberry-powder",
    shortName: "Mulberry",
    desiName: hi("शहतूत", "Shahtoot"),
    form: "powder",
    colourWorld: world("#5b2a6f", "#7e4494", "light", ["#5b2a6f", "#8f57a6", "#c58ad6", "#f6f1e4"]),
    alt: "Illustration of violet mulberry powder in a black stone bowl",
    originRegions: ["Karnataka", "Tamil Nadu", "West Bengal"],
    profile: authored(
      "Mulberry fruit contains anthocyanins, resveratrol and iron; the plant is also studied for 1-deoxynojirimycin (DNJ).",
      "Karnataka and Tamil Nadu grow mulberry at scale for sericulture, so fruit and leaf supply is established.",
      "Colour and antioxidant story for functional beverages and wellness blends.",
    ),
    specs: powderSpecs("Deep purple", "Sweet, mildly tart"),
    applications: ["Functional beverages", "Wellness blends", "Confectionery"],
    seo: {
      title: "Mulberry Powder from India",
      description: "Deep-purple mulberry fruit powder with anthocyanins for functional beverages and wellness blends. Indian origin, export-documented.",
      keywords: ["mulberry powder", "mulberry fruit powder", "mulberry powder exporter india"],
    },
  },
  orange_powder: {
    slug: "orange-powder",
    shortName: "Orange",
    desiName: hi("संतरा", "Santra"),
    form: "powder",
    colourWorld: world("#f28c28", "#c96d12", "dark", ["#f28c28", "#ffb25a", "#b8862f", "#f6f1e4"]),
    alt: "Illustration of bright orange powder in a black stone bowl",
    originRegions: ["Nagpur (Maharashtra)", "Punjab", "Rajasthan (Jhalawar)"],
    profile: authored(
      "Orange contributes vitamin C, hesperidin and other citrus flavonoids, plus natural pectin.",
      "Nagpur mandarins are a GI-tagged Indian citrus with strong colour and aroma; Punjab kinnow adds volume.",
      "Citrus flavour and colour for beverages, bakery and confectionery.",
    ),
    specs: powderSpecs("Orange", "Citrus, sweet-tart"),
    applications: ["Beverages", "Bakery", "Confectionery", "Dairy & desserts"],
    seo: {
      title: "Orange Powder from India",
      description: "Orange fruit powder with citrus flavonoids for beverages and bakery. Indian origin, export-documented.",
      keywords: ["orange powder", "orange fruit powder", "orange powder supplier india"],
    },
  },
  lemon_powder: {
    slug: "lemon-powder",
    shortName: "Lemon",
    desiName: hi("नींबू", "Nimbu"),
    form: "powder",
    colourWorld: world("#f4e04d", "#d1bd23", "dark", ["#f4e04d", "#f9ec8a", "#b8a51f", "#f6f1e4"]),
    alt: "Illustration of pale yellow lemon powder in a black stone bowl",
    originRegions: ["Andhra Pradesh", "Gujarat", "Maharashtra"],
    profile: authored(
      "Lemon is defined by citric acid and vitamin C, with limonene-driven aroma from the peel.",
      "India is among the world’s largest lime and lemon producers; Andhra Pradesh and Gujarat grow year-round.",
      "Sharp citrus acidity for beverages, seasonings and confectionery.",
    ),
    specs: powderSpecs("Pale yellow", "Sour, citrus"),
    applications: ["Beverages", "Seasonings", "Confectionery", "Bakery"],
    seo: {
      title: "Lemon Powder from India",
      description: "Lemon fruit powder for beverages, seasonings and confectionery. Indian origin, export-documented.",
      keywords: ["lemon powder", "lemon fruit powder", "lemon powder exporter india"],
    },
  },

  // ───────────────────────────── vegetable & herbal ─────────────────────────
  beetroot_powder: {
    slug: "beetroot-powder",
    shortName: "Beetroot",
    desiName: hi("चुकंदर", "Chukandar"),
    form: "powder",
    colourWorld: world("#a5133f", "#7b0d2e", "light", ["#a5133f", "#d1275b", "#f06b8a", "#f6f1e4"]),
    alt: "Illustration of crimson beetroot powder in a black stone bowl",
    originRegions: ["Maharashtra", "Karnataka", "Gujarat"],
    seo: {
      title: "Beetroot Powder from India",
      description: "Deep-red beetroot powder with dietary nitrates and betalains for health drinks, supplements and natural colour. Indian origin, export-documented.",
      keywords: ["beetroot powder", "beet root powder", "beetroot powder exporter india"],
    },
  },
  spinach_powder: {
    slug: "spinach-powder",
    shortName: "Spinach",
    desiName: hi("पालक", "Palak"),
    form: "powder",
    colourWorld: world("#2f6b3a", "#1f4a28", "light", ["#2f6b3a", "#4f9a55", "#8fd08a", "#f6f1e4"]),
    alt: "Illustration of green spinach powder in a black stone bowl",
    originRegions: ["Gujarat", "Maharashtra", "Punjab", "Uttar Pradesh"],
    profile: authored(
      "Spinach supplies iron, folate, vitamin K and the carotenoids lutein and zeaxanthin; its chlorophyll gives a natural green.",
      "Cool-season cultivation across Gujarat, Maharashtra and the north keeps leaf supply steady through winter.",
      "Green colour and micronutrients for pasta, snacks, soups and nutraceutical blends.",
    ),
    specs: powderSpecs("Dark green", "Mild, vegetal"),
    applications: ["Pasta & noodles", "Snacks", "Soups & seasonings", "Nutraceutical blends"],
    seo: {
      title: "Spinach Powder from India",
      description: "Dark-green spinach powder for pasta, snacks and nutraceutical blends. Indian origin, export-documented.",
      keywords: ["spinach powder", "dehydrated spinach powder", "spinach powder exporter india"],
    },
  },
  tomato_powder: {
    slug: "tomato-powder",
    shortName: "Tomato",
    desiName: hi("टमाटर", "Tamatar"),
    form: "powder",
    colourWorld: world("#c4341f", "#9a2717", "light", ["#d33f2b", "#f0664f", "#ffa07a", "#f6f1e4"]),
    alt: "Illustration of red tomato powder in a black stone bowl",
    originRegions: ["Maharashtra (Nashik)", "Karnataka", "Andhra Pradesh", "Gujarat"],
    profile: authored(
      "Tomato is the main dietary source of lycopene, with glutamate-driven umami that concentrates on drying.",
      "India is the second-largest tomato producer; Nashik, Karnataka and Andhra belts supply deep-red hybrids.",
      "Umami, colour and body for soups, sauces, seasonings and snacks.",
    ),
    specs: powderSpecs("Red to deep red", "Savory, tomato"),
    applications: ["Soups & sauces", "Seasonings", "Snacks", "Ready meals"],
    seo: {
      title: "Tomato Powder from India",
      description: "Deep-red tomato powder with lycopene and umami for soups, sauces and seasonings. Indian origin, export-documented.",
      keywords: ["tomato powder", "dehydrated tomato powder", "tomato powder exporter india"],
    },
  },
  ginger_powder: {
    slug: "ginger-powder",
    shortName: "Ginger",
    desiName: hi("सोंठ", "Sonth"),
    form: "powder",
    colourWorld: world("#d9b98c", "#b8945f", "dark", ["#d9b98c", "#e8d2ad", "#b8862f", "#f6f1e4"]),
    alt: "Illustration of pale tan ginger powder in a black stone bowl",
    originRegions: ["Kerala", "Meghalaya", "Karnataka", "Assam"],
    profile: authored(
      "Dry ginger concentrates gingerols and shogaols, the compounds behind its pungency and warmth.",
      "India is the world’s largest ginger producer; Kerala (Cochin ginger) and the north-east are long-standing origins.",
      "Warm pungency for spice blends, beverages, bakery and traditional formulations.",
    ),
    specs: powderSpecs("Light yellow-brown", "Pungent, warm, aromatic", "≤10%", "18–24 months"),
    applications: ["Spice blends", "Beverages", "Bakery", "Nutraceuticals"],
    seo: {
      title: "Ginger Powder from India",
      description: "Ground dry ginger (sonth) with gingerol-driven warmth for spice blends, beverages and bakery. Indian origin, export-documented.",
      keywords: ["ginger powder", "dry ginger powder", "sonth powder", "ginger powder exporter india"],
    },
  },
  turmeric_powder: {
    slug: "turmeric-powder",
    shortName: "Turmeric",
    desiName: hi("हल्दी", "Haldi"),
    form: "powder",
    colourWorld: world("#e0a106", "#b47f04", "dark", ["#e0a106", "#f5c542", "#c4740a", "#f6f1e4"]),
    alt: "Illustration of golden turmeric powder heaped in a black stone bowl",
    originRegions: ["Erode (Tamil Nadu)", "Sangli (Maharashtra)", "Nizamabad (Telangana)", "Lakadong (Meghalaya)"],
    seo: {
      title: "Turmeric Powder from India",
      description: "Golden turmeric powder from established Indian curcumin belts — Erode, Sangli, Nizamabad, Lakadong. Export-documented, COA on request.",
      keywords: ["turmeric powder", "haldi powder", "curcumin turmeric powder", "turmeric powder exporter india"],
    },
  },
  sea_buckthorn_powder: {
    slug: "sea-buckthorn-powder",
    shortName: "Sea Buckthorn",
    desiName: hi("लेह बेरी", "Leh Berry"),
    form: "powder",
    colourWorld: world("#f28a1c", "#c46a0e", "dark", ["#f28a1c", "#ffb04a", "#b8862f", "#f6f1e4"]),
    alt: "Illustration of orange sea buckthorn powder in a black stone bowl",
    originRegions: ["Ladakh", "Himachal Pradesh (Lahaul-Spiti)"],
    seo: {
      title: "Sea Buckthorn Powder from India (Ladakh)",
      description: "Himalayan sea buckthorn powder rich in omega fatty acids, flavonoids and vitamin C for nutraceuticals and cosmetics. Indian origin, export-documented.",
      keywords: ["sea buckthorn powder", "seabuckthorn powder", "leh berry powder", "sea buckthorn india"],
    },
  },

  // ───────────────────────────── dehydrates ────────────────────────────────
  dehydrated_onion_powder: {
    slug: "dehydrated-onion-powder",
    shortName: "Onion Powder",
    desiName: hi("प्याज़", "Pyaaz"),
    form: "powder",
    colourWorld: world("#efe3c8", "#cdbf9c", "dark", ["#efe3c8", "#d9c79b", "#b8862f", "#8a6a3a"]),
    alt: "Illustration of creamy-white dehydrated onion powder in a black stone bowl",
    originRegions: ["Mahuva (Bhavnagar, Gujarat)"],
    seo: {
      title: "Dehydrated Onion Powder from India (Mahuva)",
      description: "Creamy-white dehydrated onion powder from the Mahuva belt of Gujarat — a world-scale dehydration origin. Export-documented, COA on request.",
      keywords: ["dehydrated onion powder", "onion powder exporter india", "mahuva onion powder"],
    },
  },
  dehydrated_onion_flakes: {
    slug: "dehydrated-onion-flakes",
    shortName: "Onion Flakes",
    desiName: hi("प्याज़ के फ्लेक्स", "Pyaaz flakes"),
    form: "flakes",
    colourWorld: world("#e6cfa4", "#c4aa78", "dark", ["#e6cfa4", "#f0dcb8", "#b8862f", "#8a6a3a"]),
    alt: "Illustration of dehydrated onion flakes piled in a black stone bowl",
    originRegions: ["Mahuva (Bhavnagar, Gujarat)"],
    profile: authored(
      "Dehydration removes water while keeping the onion’s sulfur compounds and quercetin, so flavour concentrates and stays stable.",
      "The Mahuva belt in Saurashtra is one of the world’s largest onion-dehydration clusters, with white and red onion varieties grown for drying.",
      "Visible onion pieces with long shelf life for seasonings, soups, ready meals and snack coatings.",
    ),
    specs: [
      { label: "Appearance", value: "Flakes / kibbled (chopped, minced, granules on request)" },
      { label: "Color", value: "Creamish white (white onion) / pink (red onion)" },
      { label: "Odor & Taste", value: "Strong, pungent, characteristic" },
      { label: "Moisture", value: "≤6%" },
      { label: "Shelf Life", value: "Up to 24 months" },
      { label: "Packaging", value: "Food-grade / customized" },
      { label: "Storage", value: "Cool & dry place" },
    ],
    applications: ["Seasonings", "Soups & sauces", "Ready meals", "Snack coatings"],
    seo: {
      title: "Dehydrated Onion Flakes & Kibbled from India",
      description: "Dehydrated onion flakes, kibbled, chopped and granules from the Mahuva belt, Gujarat. Export-documented, COA on request.",
      keywords: ["dehydrated onion flakes", "kibbled onion", "onion flakes exporter india"],
    },
  },
  garlic_powder: {
    slug: "dehydrated-garlic-powder",
    shortName: "Garlic Powder",
    desiName: hi("लहसुन", "Lahsun"),
    form: "powder",
    colourWorld: world("#efe8d6", "#d0c7ad", "dark", ["#efe8d6", "#e0d6bd", "#b8862f", "#8a6a3a"]),
    alt: "Illustration of off-white dehydrated garlic powder in a black stone bowl",
    originRegions: ["Madhya Pradesh (Mandsaur)", "Gujarat", "Rajasthan"],
    seo: {
      title: "Dehydrated Garlic Powder from India",
      description: "Off-white dehydrated garlic powder with stable sulfur compounds for food processing and seasonings. Indian origin, export-documented.",
      keywords: ["dehydrated garlic powder", "garlic powder exporter india"],
    },
  },
  dehydrated_garlic_flakes: {
    slug: "dehydrated-garlic-flakes",
    shortName: "Garlic Flakes",
    desiName: hi("लहसुन के फ्लेक्स", "Lahsun flakes"),
    form: "flakes",
    colourWorld: world("#e8dfc6", "#c7bc9c", "dark", ["#e8dfc6", "#f3ecd8", "#b8862f", "#8a6a3a"]),
    alt: "Illustration of dehydrated garlic flakes piled in a black stone bowl",
    originRegions: ["Madhya Pradesh (Mandsaur)", "Gujarat", "Rajasthan"],
    profile: authored(
      "Dried garlic keeps its allicin-derived sulfur compounds in a stable form, giving strong flavour without moisture.",
      "Madhya Pradesh, Gujarat and Rajasthan grow high-oil garlic varieties suited to dehydration.",
      "Visible garlic pieces for seasonings, sauces, pickles and ready meals.",
    ),
    specs: [
      { label: "Appearance", value: "Flakes (chopped, minced, granules on request)" },
      { label: "Color", value: "Off-white to cream" },
      { label: "Odor & Taste", value: "Strong, characteristic" },
      { label: "Moisture", value: "≤6%" },
      { label: "Shelf Life", value: "Up to 24 months" },
      { label: "Packaging", value: "Food-grade / customized" },
      { label: "Storage", value: "Cool & dry place" },
    ],
    applications: ["Seasonings", "Sauces & dips", "Pickles", "Ready meals"],
    seo: {
      title: "Dehydrated Garlic Flakes from India",
      description: "Dehydrated garlic flakes, chopped and granules for seasonings and sauces. Indian origin, export-documented.",
      keywords: ["dehydrated garlic flakes", "garlic flakes exporter india"],
    },
  },
  fried_onion: {
    slug: "fried-onion",
    shortName: "Fried Onion",
    desiName: hi("बिरिस्ता", "Birista"),
    form: "fried",
    colourWorld: world("#c9862b", "#9c6318", "dark", ["#c9862b", "#e2a24a", "#7a4a10", "#f6f1e4"]),
    alt: "Illustration of golden crispy fried onion in a black stone bowl",
    originRegions: ["Mahuva (Bhavnagar, Gujarat)"],
    profile: authored(
      "Sliced onion fried in vegetable oil develops Maillard browning — the caramel, savoury notes that raw or dehydrated onion cannot give.",
      "Made in the same Mahuva belt that supplies dehydrated onion, from onions grown for processing.",
      "Ready-to-use crispy topping and base for biryani, salads, burgers and meal kits.",
    ),
    specs: [
      { label: "Appearance", value: "Crispy fried slices" },
      { label: "Color", value: "Golden brown" },
      { label: "Odor & Taste", value: "Sweet, roasted, savory" },
      { label: "Moisture", value: "≤4%" },
      { label: "Frying medium", value: "Refined vegetable oil (declared per lot)" },
      { label: "Shelf Life", value: "Up to 12 months" },
      { label: "Packaging", value: "Food-grade / customized" },
      { label: "Storage", value: "Cool & dry place" },
    ],
    applications: ["Biryani & rice kits", "Salad & burger toppings", "Ready meals", "Retail packs"],
    shelfLife: "Up to 12 months",
    seo: {
      title: "Crispy Fried Onion (Birista) from India",
      description: "Golden crispy fried onion — birista — for biryani kits, toppings and ready meals. Indian origin, export-documented.",
      keywords: ["fried onion", "crispy onion", "birista", "fried onion exporter india"],
    },
  },

  // ───────────────────────────── raw whole spices ──────────────────────────
  dry_red_chilli: {
    slug: "dry-red-chilli",
    shortName: "Dry Red Chilli",
    desiName: hi("लाल मिर्च", "Lal Mirch"),
    form: "whole",
    colourWorld: world("#b72a1b", "#8a1d12", "light", ["#b72a1b", "#e0452f", "#ff8a6a", "#f6f1e4"]),
    alt: "Illustration of whole dried red chillies piled in a black stone bowl",
    seo: {
      title: "Dry Red Chilli (Whole) from India — Guntur, Byadgi, Teja",
      description: "Whole dried red chillies quoted by variety, ASTA colour and SHU: Guntur, Byadgi, Teja, Kashmiri. Export-documented, COA on request.",
      keywords: ["dry red chilli", "dried red chilli whole", "guntur chilli", "byadgi chilli", "teja chilli"],
    },
  },
  chilli_powder: {
    slug: "chilli-powder",
    shortName: "Chilli Powder",
    desiName: hi("मिर्च पाउडर", "Mirch powder"),
    form: "powder",
    colourWorld: world("#d1391f", "#a22a15", "light", ["#d1391f", "#ef5a3c", "#ff9b7a", "#f6f1e4"]),
    alt: "Illustration of red chilli powder heaped in a black stone bowl",
    originRegions: ["Guntur (Andhra Pradesh)", "Byadgi (Karnataka)", "Warangal (Telangana)"],
    profile: authored(
      "Ground chilli is specified on two numbers: ASTA colour value (carotenoid pigments) and pungency in Scoville heat units (capsaicinoids).",
      "India is the world’s largest chilli producer; Guntur supplies heat, Byadgi supplies colour, and blends are milled to a buyer’s ASTA/SHU brief.",
      "Heat and colour in one ingredient for spice blends, sauces, snacks and meat processing.",
    ),
    specs: [
      { label: "Appearance", value: "Fine powder" },
      { label: "Color", value: "Bright to deep red" },
      { label: "ASTA Color", value: "As per requirement" },
      { label: "Pungency (SHU)", value: "As per requirement" },
      { label: "Mesh Size", value: "As per requirement" },
      { label: "Moisture", value: "≤10%" },
      { label: "Shelf Life", value: "12–18 months" },
      { label: "Packaging", value: "Food-grade / customized" },
      { label: "Storage", value: "Cool & dry place" },
    ],
    applications: ["Spice blends", "Sauces", "Snack seasonings", "Meat processing"],
    shelfLife: "12–18 months",
    seo: {
      title: "Red Chilli Powder from India",
      description: "Ground red chilli milled to your ASTA colour and SHU brief from Guntur and Byadgi chillies. Export-documented, COA on request.",
      keywords: ["red chilli powder", "chilli powder exporter india", "asta chilli powder"],
    },
  },
  turmeric_finger: {
    slug: "turmeric-finger",
    shortName: "Turmeric Finger",
    desiName: hi("हल्दी गाँठ", "Haldi gaanth"),
    form: "whole",
    colourWorld: world("#c98a12", "#9c690a", "dark", ["#c98a12", "#e8ad2e", "#f5d67a", "#f6f1e4"]),
    alt: "Illustration of dried turmeric fingers and bulbs in a black stone bowl",
    seo: {
      title: "Turmeric Finger & Bulb (Dried) from India",
      description: "Dried turmeric fingers and bulbs from Erode, Sangli, Nizamabad and Lakadong, quoted on curcumin grade. Export-documented, COA on request.",
      keywords: ["turmeric finger", "dried turmeric bulb", "lakadong turmeric", "turmeric finger exporter india"],
    },
  },
  cumin_seed: {
    slug: "cumin-seeds",
    shortName: "Cumin",
    desiName: hi("जीरा", "Jeera"),
    form: "whole",
    colourWorld: world("#8b6b3a", "#6a4f28", "light", ["#8b6b3a", "#b08d55", "#d9bd8a", "#f6f1e4"]),
    alt: "Illustration of cumin seeds piled in a black stone bowl",
    seo: {
      title: "Cumin Seeds from India — Gujarat & Rajasthan",
      description: "Whole cumin seeds from Gujarat and Rajasthan, the world’s dominant origin, quoted on purity and volatile oil. Export-documented, COA on request.",
      keywords: ["cumin seeds", "jeera", "cumin seed exporter india", "gujarat cumin"],
    },
  },
  coriander_seed: {
    slug: "coriander-seeds",
    shortName: "Coriander",
    desiName: hi("धनिया", "Dhania"),
    form: "whole",
    colourWorld: world("#a8923f", "#7f6d2b", "dark", ["#a8923f", "#c9b45f", "#e6d894", "#f6f1e4"]),
    alt: "Illustration of coriander seeds piled in a black stone bowl",
    seo: {
      title: "Coriander Seeds from India — Rajasthan, MP, Gujarat",
      description: "Whole coriander seeds with linalool-rich aroma from Rajasthan, Madhya Pradesh and Gujarat. Export-documented, COA on request.",
      keywords: ["coriander seeds", "dhania", "coriander seed exporter india"],
    },
  },

  // ───────────────────────────── botanicals ────────────────────────────────
  moringa_leaf_powder: {
    slug: "moringa-leaf-powder",
    shortName: "Moringa",
    desiName: hi("सहजन", "Sahjan"),
    form: "powder",
    colourWorld: world("#476f28", "#325018", "light", ["#476f28", "#74a94a", "#a9d48a", "#f6f1e4"]),
    alt: "Illustration of green moringa leaf powder heaped in a black stone bowl",
    originRegions: ["Tamil Nadu", "Andhra Pradesh", "Gujarat", "Maharashtra"],
    profile: authored(
      "Moringa oleifera leaf is unusually dense in protein for a leaf, with vitamin A precursors, vitamin C, calcium, iron and polyphenols.",
      "Moringa is native to the Indian subcontinent; Tamil Nadu and Andhra Pradesh are the world’s main cultivation belts.",
      "Green superfood ingredient for nutraceutical blends, functional beverages, capsules and bakery.",
    ),
    specs: powderSpecs("Green", "Grassy, mildly bitter", "≤8%", "12–24 months"),
    applications: ["Nutraceutical blends", "Functional beverages", "Capsules & tablets", "Bakery"],
    shelfLife: "12–24 months",
    seo: {
      title: "Moringa Leaf Powder from India",
      description: "Green moringa leaf powder — protein, vitamins, iron and calcium in one leaf. Indian origin, export-documented, COA on request.",
      keywords: ["moringa leaf powder", "moringa powder exporter india", "moringa oleifera powder"],
    },
  },

  // ───────────────────────────── rice ──────────────────────────────────────
  basmati_1121: {
    slug: "basmati-rice-1121",
    shortName: "1121 Basmati",
    desiName: hi("बासमती", "Basmati"),
    form: "grain",
    colourWorld: world("#e9dfc4", "#c9bd9a", "dark", ["#e9dfc4", "#f5efdc", "#b8862f", "#8a6a3a"]),
    alt: "Illustration of long 1121 basmati grains in a black stone bowl",
    originRegions: ["Punjab", "Haryana", "Uttarakhand", "Western Uttar Pradesh"],
    profile: authored(
      "1121 is the extra-long basmati variety, known for the longest grain in the trade and strong elongation on cooking with a distinct aroma.",
      "Basmati is a GI-protected crop of the Indo-Gangetic plain; 1121 is grown across Punjab, Haryana and western UP.",
      "Sella (parboiled) for biryani and catering, steam for retail: separate, non-sticky grains.",
    ),
    specs: [
      { label: "Grain", value: "Extra-long, slender" },
      { label: "Variants", value: "White Sella · Golden Sella · Steam" },
      { label: "Moisture", value: "≤13%" },
      { label: "Broken", value: "As per grade" },
      { label: "Shelf Life", value: "Up to 24 months" },
      { label: "Packaging", value: "PP / jute / BOPP bags, customized" },
      { label: "Storage", value: "Cool & dry place" },
    ],
    applications: ["Biryani & pulao", "HoReCa & catering", "Retail packs", "Repacking"],
    seo: {
      title: "1121 Basmati Rice from India — White Sella, Golden Sella, Steam",
      description: "Extra-long 1121 basmati in white sella, golden sella and steam variants. Export-documented, quoted per grade.",
      keywords: ["1121 basmati rice", "1121 sella rice", "1121 golden sella", "basmati rice exporter india"],
    },
  },
  basmati_1509: {
    slug: "basmati-rice-1509",
    shortName: "1509 Basmati",
    desiName: hi("बासमती", "Basmati"),
    form: "grain",
    colourWorld: world("#e3d6b5", "#c2b48f", "dark", ["#e3d6b5", "#efe6cf", "#b8862f", "#8a6a3a"]),
    alt: "Illustration of long 1509 basmati grains in a black stone bowl",
    originRegions: ["Punjab", "Haryana", "Western Uttar Pradesh"],
    profile: authored(
      "1509 is an early-maturing, high-yield basmati with long grain and good elongation, positioned as a value alternative to 1121.",
      "Grown in the same GI basmati belt of Punjab, Haryana and western UP.",
      "Sella and steam variants for catering, retail and repacking where price-to-length matters.",
    ),
    specs: [
      { label: "Grain", value: "Long, slender" },
      { label: "Variants", value: "White Sella · Golden Sella · Steam" },
      { label: "Moisture", value: "≤13%" },
      { label: "Broken", value: "As per grade" },
      { label: "Shelf Life", value: "Up to 24 months" },
      { label: "Packaging", value: "PP / jute / BOPP bags, customized" },
      { label: "Storage", value: "Cool & dry place" },
    ],
    applications: ["Catering & HoReCa", "Retail packs", "Repacking", "Everyday biryani"],
    seo: {
      title: "1509 Basmati Rice from India — White Sella, Golden Sella, Steam",
      description: "Long-grain 1509 basmati in white sella, golden sella and steam variants. Export-documented, quoted per grade.",
      keywords: ["1509 basmati rice", "1509 sella rice", "basmati rice exporter india"],
    },
  },
};
