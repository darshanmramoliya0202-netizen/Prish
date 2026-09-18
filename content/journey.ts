/**
 * The Farm → Port → World scroll journey — six scenes.
 * Copy sticks to brochure facts; no port is named (no commercial terms published).
 */
export const journey = {
  title: "Farm → Port → World",
  scenes: [
    {
      id: "soil",
      index: "01",
      title: "Soil & seed",
      caption:
        "Saurashtra at dawn. Black cotton soil, a rabi calendar, and the decision that fixes quality months before harvest: which belt, which seed, which grower.",
      accent: null,
    },
    {
      id: "harvest",
      index: "02",
      title: "Harvest",
      caption:
        "Hands, not slogans. Lots are booked in the field, checked for moisture and colour, and sorted before they ever see a mill.",
      accent: { script: "deva", text: "खेत से", roman: "Khet se", lang: "hi" },
    },
    {
      id: "sun",
      index: "03",
      title: "Sun & drying",
      caption:
        "280+ sunshine days do the first half. Low-temperature drying does the second — so colour, aroma and active compounds survive.",
      accent: null,
    },
    {
      id: "mill",
      index: "04",
      title: "Milling & packing",
      caption:
        "Fine milling to your mesh, hygienic packing in food-grade HDPE, kraft, bulk box or 25 kg fibre drums. Batch-wise consistency, third-party testing on request.",
      accent: null,
    },
    {
      id: "coast",
      index: "05",
      title: "The Gujarat coast",
      caption:
        "Container-ready. FCL or LCL. Documents — invoice, packing list, origin, phytosanitary, COA — ready before the vessel is.",
      accent: null,
    },
    {
      id: "world",
      index: "06",
      title: "Your dock",
      caption:
        "United States · European Union · GCC · Southeast Asia. Four regions, one paper trail from Rajkot.",
      accent: {
        script: "deva",
        text: "वसुधैव कुटुम्बकम्",
        roman: "Vasudhaiva Kutumbakam",
        lang: "hi",
      },
    },
  ],
} as const;

export type JourneyScene = (typeof journey.scenes)[number];
