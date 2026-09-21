/**
 * Microcopy, desi accents and the only places cheeky lines are allowed
 * (loader, 404, empty states). Voice: founder-first, warm, direct, short.
 */
export const accents = {
  namaste: {
    script: "deva",
    text: "नमस्ते",
    /**
     * Orthographic syllables (akshara) — the only safe animation unit for Devanagari.
     * Splitting by code point tears the halant and the े matra off their consonants and
     * the word shatters mid-animation; स्ते must stay one cluster. Must join to `text`.
     */
    aksharas: ["न", "म", "स्ते"],
    roman: "Namaste",
    lang: "hi",
    translation: "I bow to the divine in you",
  },
  apnapan: {
    script: "deva",
    text: "अपनापन",
    roman: "Apnapan",
    lang: "hi",
    translation: "A sense of belonging",
  },
  khetSe: {
    script: "deva",
    text: "खेत से",
    roman: "Khet se",
    lang: "hi",
    translation: "From the field",
  },
  vasudhaiva: {
    script: "deva",
    text: "वसुधैव कुटुम्बकम्",
    roman: "Vasudhaiva Kutumbakam",
    lang: "hi",
    translation: "The world is one family",
  },
  dhanyavaad: {
    script: "deva",
    text: "धन्यवाद",
    roman: "Dhanyavaad",
    lang: "hi",
    translation: "Thank you",
  },
} as const;

export const loaderLines = [
  "Grinding turmeric. Not literally.",
  "Warming up the sun — 280+ days a year helps.",
  "Counting bags. Lost count around 2500 MT.",
  "Teaching the airplane to say namaste.",
  "Checking moisture. Again.",
  "Asking the cumin to hold still.",
] as const;

export const cta = {
  price: "Get today’s price",
  priceWhatsApp: "Get today’s price on WhatsApp",
  kit: "Build your sample kit",
  addToKit: "Add to kit",
  inKit: "In your kit",
  specSheet: "Download spec sheet",
  catalogue: "Download catalogue",
  askUs: "Ask us",
  samples: "Samples available — ask us.",
  talk: "Talk to a person",
} as const;

export const home = {
  heroEyebrow: "Rajkot, Gujarat · 22.30° N 70.80° E",
  heroTitle: "From Indian farms to global formulations.",
  heroSub:
    "Fruit, vegetable and herbal powders, dehydrated onion and garlic, whole spices, moringa and basmati — farm-rooted in Gujarat, documented for your market.",
  worldTitle: "Pick one. Go on.",
  worldSub:
    "Every product here has a colour, a field and a paper trail. Tap a bowl.",
  journeyTitle: "Farm → Port → World",
  journeySub:
    "What actually happens between a seed in Saurashtra and a drum at your dock.",
  proofTitle: "The numbers we will put our name on.",
  proofSub:
    "Everything else — prices, timelines, availability — moves with the season. Ask, and you get today’s answer.",
  whyIndiaTitle: "Why Indian origin",
  familiesTitle: "Six families. One paper trail.",
  auditTitle: "Audit us before you buy.",
  auditSub:
    "Every real exporter can show you these. If a supplier can’t, don’t work with them.",
  apnapanTitle: "A note from Yash",
  kitTitle: "Tell us what you’re sourcing.",
  kitSub:
    "Pick products, tell us your market, and we quote against today’s crop — by email and WhatsApp.",
} as const;

export const specsDisclaimer =
  "Typical values — lot-specific Certificate of Analysis on request.";
export const calendarDisclaimer =
  "Indicative windows from public Indian crop data. Ask us for the current season.";
export const hsDisclaimer =
  "HS classification is indicative; confirm with your customs broker for the destination tariff line.";

export const notFound = {
  title: "This page went to the wrong port.",
  sub: "Happens to the best consignments. Let’s get you back on the right route.",
  home: "Back to the field",
  products: "See products",
} as const;

export const emptyKit = {
  title: "Your kit is empty.",
  sub: "Add a product from any page — or start with what buyers usually try first.",
} as const;
