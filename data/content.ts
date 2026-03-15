export const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/quality", label: "Quality" },
  { href: "/inquiry", label: "Inquiry" }
];

export const productCategories = [
  {
    slug: "botanical-powders",
    title: "Botanical Powders",
    eyebrow: "Fruit, herbal, and vegetable expressions",
    overview:
      "A formulation-led range of Indian-origin powders designed for buyers seeking vivid natural character, dependable processing behavior, and export-grade consistency.",
    sourcing:
      "Selected across Indian fruit belts and botanical zones with attention to pigment depth, active compound retention, and seasonal integrity.",
    applications: ["Functional beverages", "Supplements", "Bakery", "Blends", "Wellness products"],
    formats: ["Custom mesh size", "Moisture-aligned lots", "Private specification alignment", "Bulk and sample quantities"],
    products: [
      {
        name: "Jamun Powder",
        profile: "Deep-color fruit powder with polyphenol-rich character for premium beverage and wellness formulations.",
        useCases: ["Functional drinks", "Nutraceutical blends", "Fruit-forward premixes"]
      },
      {
        name: "Beetroot Powder",
        profile: "Natural color and nitrate-rich ingredient suited to beverages, bakery, and health-focused applications.",
        useCases: ["Sports nutrition", "Natural coloring", "Bakery mixes"]
      },
      {
        name: "Turmeric Powder",
        profile: "Curcumin-led Indian turmeric profile for spice, wellness, and functional ingredient programs.",
        useCases: ["Supplement blends", "Golden beverage mixes", "Savory applications"]
      },
      {
        name: "Sea Buckthorn Powder",
        profile: "Distinctive tart and nutrient-rich botanical option for advanced wellness and cosmetic formulations.",
        useCases: ["Beauty-from-within blends", "Functional sachets", "Cosmetic ingredient systems"]
      }
    ]
  },
  {
    slug: "dehydrated-ingredients",
    title: "Dehydrated Ingredients",
    eyebrow: "Process-friendly savory systems",
    overview:
      "A clean and scalable dehydrated portfolio made for food manufacturers who need stable supply, efficient handling, and export-oriented packing discipline.",
    sourcing:
      "Produced from selected raw materials and refined through controlled drying, milling, and hygienic handling systems.",
    applications: ["Ready-to-cook foods", "Seasoning systems", "Savory snacks", "QSR supply", "Dry blends"],
    formats: ["Powder", "Granule-ready handling", "Fried formats", "Fiber drum and bulk packaging"],
    products: [
      {
        name: "Dehydrated Onion Powder",
        profile: "Reliable savory base ingredient with export-grade batch consistency for food processing environments.",
        useCases: ["Seasoning bases", "Instant foods", "Sauce systems"]
      },
      {
        name: "Dehydrated Garlic Powder",
        profile: "Strong aromatic profile shaped for convenient formulation and commercial food manufacturing.",
        useCases: ["Savory premixes", "Snack seasoning", "Ready meal systems"]
      },
      {
        name: "Fried Onion",
        profile: "Texture-led dehydrated ingredient for premium culinary and industrial applications.",
        useCases: ["Biryani kits", "Meal toppings", "Retail-ready blends"]
      }
    ]
  },
  {
    slug: "export-staples",
    title: "Export Staples",
    eyebrow: "Rice and spice-oriented dependable supply",
    overview:
      "A commercially disciplined export stream built for container movement, buyer-specific packaging expectations, and documentation-heavy trade relationships.",
    sourcing:
      "Structured around India’s established agricultural supply zones and aligned with consistent export execution across destination markets.",
    applications: ["Bulk import programs", "Distributor sourcing", "Retail packing", "Foodservice channels", "Regional trade supply"],
    formats: ["FCL", "LCL", "Buyer-specific documents", "Multiple packaging formats"],
    products: [
      {
        name: "1121 White Sella Rice",
        profile: "Export-grade basmati-style rice with strong relevance for premium trade buyers.",
        useCases: ["Bulk rice import", "Distributor programs", "Private label sourcing"]
      },
      {
        name: "1509 Golden Sella Rice",
        profile: "Commercially efficient rice option supported by container-scale export readiness.",
        useCases: ["Regional markets", "Foodservice channels", "Wholesale trade"]
      },
      {
        name: "Indian Raw Spices",
        profile: "Foundational spice supply with India-origin depth and documentation support.",
        useCases: ["Grinding programs", "Trading houses", "Ingredient sourcing"]
      }
    ]
  }
] as const;

export const applicationMatrix = [
  {
    sector: "Food & Beverage",
    requirement: "Natural color, flavor layering, process-friendly performance, and supply consistency.",
    solutions: ["Jamun Powder", "Beetroot Powder", "Turmeric Powder", "Dehydrated Onion Powder"]
  },
  {
    sector: "Nutraceutical",
    requirement: "Active-rich botanical identity with traceable origin and controlled processing.",
    solutions: ["Jamun Powder", "Turmeric Powder", "Sea Buckthorn Powder", "Beetroot Powder"]
  },
  {
    sector: "Pharmaceutical",
    requirement: "Specification-sensitive raw material programs supported by documentation discipline.",
    solutions: ["Turmeric Powder", "Selected botanical powders", "Custom documentation support"]
  },
  {
    sector: "Functional Foods",
    requirement: "Ingredients that carry formulation value and consumer-friendly natural positioning.",
    solutions: ["Jamun Powder", "Beetroot Powder", "Spinach-led botanical lines", "Dehydrated Garlic Powder"]
  },
  {
    sector: "Wellness & Cosmetic Applications",
    requirement: "Botanical ingredients with origin story, active appeal, and premium natural perception.",
    solutions: ["Sea Buckthorn Powder", "Turmeric Powder", "Jamun Powder"]
  }
] as const;

export const aboutStory = [
  "Prish Overseas is built around a simple belief: Indian agricultural richness becomes more valuable when it is presented with traceability, commercial discipline, and global formulation awareness.",
  "Rather than operating like a generic trading desk, the company positions itself as an origin-to-export partner for buyers who need ingredient clarity, operational confidence, and dependable specification alignment.",
  "Its strength lies in connecting Indian farm potential, controlled processing, packaging flexibility, and export execution into one composed supply experience."
] as const;

export const aboutPrinciples = [
  {
    title: "Origin with intent",
    text: "India is treated as a strategic ingredient landscape, not just a commodity source."
  },
  {
    title: "Process with control",
    text: "Drying, milling, and handling decisions are shaped around quality retention and buyer expectations."
  },
  {
    title: "Trade with clarity",
    text: "Documentation, timelines, packaging, and responsiveness are part of the value proposition."
  },
  {
    title: "Scale with trust",
    text: "Capacity matters only when it stays traceable, consistent, and commercially reliable."
  }
] as const;

export const originRegions = [
  {
    region: "Gujarat",
    focus: "Trade coordination, western supply access, and processing-linked export movement."
  },
  {
    region: "Rajasthan & Maharashtra",
    focus: "Supporting spice, grain, and broader ingredient sourcing depth."
  },
  {
    region: "West Bengal & North-East",
    focus: "Botanical diversity and region-specific agricultural potential."
  },
  {
    region: "Tamil Nadu & Andhra Pradesh",
    focus: "Southern growing belts contributing ingredient continuity and sourcing range."
  }
] as const;

export const qualitySignals = [
  {
    title: "Processing excellence",
    items: [
      "Selection of premium-grade raw materials",
      "Low-temperature drying to preserve active compounds",
      "Fine milling for uniform particle size",
      "Hygienic processing under controlled conditions"
    ]
  },
  {
    title: "Quality commitment",
    items: [
      "No artificial colors or flavors",
      "No adulteration",
      "Batch-wise consistency",
      "Export-ready documentation"
    ]
  },
  {
    title: "Compliance readiness",
    items: [
      "FSSAI compliant",
      "ISO and HACCP aligned processing",
      "Third-party laboratory testing on request",
      "Destination-country specification flexibility"
    ]
  }
] as const;

export const processJourney = [
  {
    title: "Selection",
    text: "Raw material choice begins with ingredient behavior, not just market availability."
  },
  {
    title: "Drying",
    text: "Controlled drying supports stability, retention, and cleaner formulation outcomes."
  },
  {
    title: "Milling",
    text: "Particle consistency is managed for commercial usability across product programs."
  },
  {
    title: "Validation",
    text: "Specification support and testing readiness help buyers align to market requirements."
  },
  {
    title: "Packaging",
    text: "Food-grade formats are matched to logistics, handling, and buyer format expectations."
  },
  {
    title: "Export release",
    text: "Documentation and shipment coordination keep the transition from production to dispatch smooth."
  }
] as const;

export const packagingMatrix = [
  "HDPE export bag (outer food grade)",
  "BOPP / brown kraft paper bag",
  "Multi-layer laminated bulk box",
  "25 kg food-grade fiber drum",
  "Small pack sizes supported on MOQ basis"
] as const;

export const documentationSupport = [
  "IEC and exporter-oriented documentation support",
  "Timely freight quotation and proforma invoice assistance",
  "Release-of-consignment readiness",
  "Specification and certification customization based on buyer and destination country"
] as const;

export const inquiryTopics = [
  "Bulk ingredient sourcing",
  "Private specification request",
  "Packaging options",
  "Market-specific documentation",
  "Sampling and validation",
  "Long-term supply partnership"
] as const;

export const responsePromises = [
  "Structured intake for product interest, target market, and commercial volume",
  "Clear routing for importers, distributors, brand owners, and formulation teams",
  "Fast next-step guidance based on packaging, documentation, and application needs"
] as const;
