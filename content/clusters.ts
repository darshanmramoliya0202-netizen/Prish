import type { Cluster } from "./types";

/**
 * Six product families ("one family in one screen" — owner note).
 * Gujarati accents on family names: the company is from Saurashtra, so the family
 * words are in Gujarati script; product names use Hindi trade names.
 */
export const clusters: Cluster[] = [
  {
    id: "fruit_powders",
    slug: "fruit-powders",
    name: "Fruit Powders",
    shortName: "Fruit",
    accent: { script: "gujr", text: "ફળ", roman: "Phal", lang: "gu" },
    promise: "Indian fruit, dried to keep its colour and character.",
    description:
      "Jamun, apple, pineapple, raw mango, guava, mulberry, orange and lemon — sourced from the belts that grow them best and dried at low temperature so colour, acidity and phytonutrients survive.",
    heroProductId: "jamun_powder",
    colourWorld: { primary: "#3f1a36", secondary: "#6b2f5b", ink: "light", particles: ["#3f1a36", "#a5133f", "#f28c28", "#f6f1e4"] },
    order: 1,
  },
  {
    id: "veg_herbal_powders",
    slug: "vegetable-herbal-powders",
    name: "Vegetable & Herbal Powders",
    shortName: "Veg & Herbal",
    accent: { script: "gujr", text: "શાક", roman: "Shaak", lang: "gu" },
    promise: "Colour, nutrients and function from vegetables and herbs.",
    description:
      "Beetroot, spinach, tomato, ginger, turmeric and Himalayan sea buckthorn — the natural-colour and nutraceutical workhorses, milled to your mesh.",
    heroProductId: "turmeric_powder",
    colourWorld: { primary: "#e0a106", secondary: "#a5133f", ink: "dark", particles: ["#e0a106", "#a5133f", "#2f6b3a", "#f28a1c"] },
    order: 2,
  },
  {
    id: "dehydrates",
    slug: "dehydrated-onion-garlic",
    name: "Dehydrated Onion & Garlic",
    shortName: "Dehydrates",
    accent: { script: "gujr", text: "ડુંગળી · લસણ", roman: "Dungli · Lasan", lang: "gu" },
    promise: "From Mahuva, the belt the world’s dehydrated onion comes from.",
    description:
      "Onion and garlic as powder, flakes, kibbled and granules, plus crispy fried onion — the strongest credibility-to-volume line in Gujarat’s own backyard.",
    heroProductId: "dehydrated_onion_powder",
    colourWorld: { primary: "#efe3c8", secondary: "#c9862b", ink: "dark", particles: ["#efe3c8", "#c9862b", "#8a6a3a", "#f6f1e4"] },
    order: 3,
  },
  {
    id: "raw_spices",
    slug: "raw-whole-spices",
    name: "Raw Whole Spices",
    shortName: "Spices",
    accent: { script: "gujr", text: "મસાલા", roman: "Masala", lang: "gu" },
    promise: "Whole spices quoted by variety, grade and the numbers buyers open with.",
    description:
      "Dry red chilli by variety, chilli powder to your ASTA/SHU, turmeric fingers by curcumin grade, cumin and coriander on purity and oil — from Gujarat, Rajasthan, Andhra and Tamil Nadu.",
    heroProductId: "cumin_seed",
    colourWorld: { primary: "#b72a1b", secondary: "#c98a12", ink: "light", particles: ["#b72a1b", "#c98a12", "#8b6b3a", "#f6f1e4"] },
    order: 4,
  },
  {
    id: "botanicals",
    slug: "botanicals",
    name: "Medicinal & Aromatic Botanicals",
    shortName: "Botanicals",
    accent: { script: "gujr", text: "વનસ્પતિ", roman: "Vanaspati", lang: "gu" },
    promise: "Leaves the subcontinent has used for centuries, dried for modern formulations.",
    description: "Moringa leaf powder today; the line grows with what buyers ask for and what we can source with a straight face.",
    heroProductId: "moringa_leaf_powder",
    colourWorld: { primary: "#476f28", secondary: "#325018", ink: "light", particles: ["#476f28", "#74a94a", "#a9d48a", "#f6f1e4"] },
    order: 5,
  },
  {
    id: "rice",
    slug: "basmati-rice",
    name: "Basmati Rice",
    shortName: "Rice",
    accent: { script: "gujr", text: "ચોખા", roman: "Chokha", lang: "gu" },
    promise: "1121 and 1509 basmati in sella and steam, quoted per grade.",
    description: "Extra-long 1121 and value 1509 basmati from the GI belt of Punjab, Haryana and western UP — white sella, golden sella and steam.",
    heroProductId: "basmati_1121",
    colourWorld: { primary: "#e9dfc4", secondary: "#c9bd9a", ink: "dark", particles: ["#e9dfc4", "#f5efdc", "#b8862f", "#8a6a3a"] },
    order: 6,
  },
];
