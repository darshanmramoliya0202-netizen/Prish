import type { AncientRoot, BuyerStory, Person } from "./types";

/**
 * Story content. Heritage is told in seasons and generations — never a founding year
 * (owner decision). Ancient-roots facts carry a source. People render only when
 * present; the PM portrait renders only when `worldview.pm.image` is set with credit.
 */
export const story = {
  heritage: {
    accent: { script: "deva" as const, text: "खेत से", roman: "Khet se", lang: "hi" as const, translation: "From the field" },
    headline: "Our family has worked this land for generations.",
    lines: [
      "Prish Overseas is new. The farming behind it is not.",
      "We grew up around sowing calendars, mandi mornings and the smell of cumin drying in the sun. Exporting is how we bring that to your formulation — with the paperwork a buyer in Rotterdam or Dubai needs to trust it.",
      "We are farm-rooted, with our own and partner processing across the growing belts. We would rather show you a certificate than tell you a story.",
    ],
    seasons: [
      { key: "sowing", title: "Sowing", text: "Choosing the seed, the belt and the season — the decisions that fix quality months before harvest." },
      { key: "tending", title: "Tending", text: "Field visits, moisture checks, and knowing which grower’s lot to book before the mandi does." },
      { key: "harvest", title: "Harvest", text: "Sun, patience and sorting. India’s 280+ sunshine days do the first half of the drying." },
      { key: "trade", title: "Trade", text: "Low-temperature drying, fine milling, hygienic packing, third-party testing, and documents ready before the vessel is." },
    ],
  },

  ancientRoots: [
    {
      title: "Lothal, Gujarat — a dockyard at the dawn of trade",
      text: "The Harappan settlement at Lothal, near Ahmedabad, held one of the world’s earliest known dockyards, connecting Gujarat’s hinterland to sea trade more than four thousand years ago.",
      source: "Archaeological Survey of India; S. R. Rao, Lothal: A Harappan Port Town (1979)",
      coords: [72.25, 22.52],
    },
    {
      title: "Barygaza — Bharuch in the Periplus",
      text: "A first-century Greek merchant’s guide, the Periplus of the Erythraean Sea, describes Barygaza — today’s Bharuch on Gujarat’s coast — as a great emporium exporting spices, cotton and ivory to the Roman world.",
      source: "Periplus Maris Erythraei, §§41–49 (c. 1st century CE), trans. L. Casson (1989)",
      coords: [72.99, 21.7],
    },
    {
      title: "Pepper that emptied Rome’s treasury",
      text: "Pliny the Elder complained that India drained Rome of gold every year — much of it for Malabar pepper carried on the monsoon winds.",
      source: "Pliny the Elder, Naturalis Historia, Book 12",
      coords: [76.2, 10.1],
    },
    {
      title: "Haridra — turmeric in the classical texts",
      text: "Turmeric appears as haridra in the foundational Ayurvedic compendia, used in food and medicine long before curcumin had a name.",
      source: "Charaka Saṃhitā and Suśruta Saṃhitā (classical Sanskrit medical texts)",
      coords: [77.2, 28.6],
    },
  ] satisfies AncientRoot[],

  people: [
    {
      name: "Yash Talaviya",
      role: "Director",
      photo: null, // owner supplies /images/people/yash-talaviya.jpg
      note: [
        "Namaste. I read every enquiry that comes through this site.",
        "If you want a price, a sample or a lab report, message me on WhatsApp and you will get a person, not a form.",
        "We would rather lose an order than ship a lot we are not sure of.",
      ],
    },
  ] satisfies Person[],

  /** Anonymised, real. Owner supplies 2–3; section renders only when non-empty. */
  stories: [] as BuyerStory[],

  worldview: {
    sanskrit: "वसुधैव कुटुम्बकम्",
    roman: "Vasudhaiva Kutumbakam",
    translation: "The world is one family",
    origin: "A Sanskrit phrase from the Mahā Upaniṣad, long part of India’s public philosophy.",
    lines: [
      "One Earth: sourcing with respect for land, season and the people who farm it.",
      "One Family: growers, processors, formulators, importers and forwarders as one connected chain.",
      "One Future: relationships built on documents, consistency and fair dealing across borders.",
    ],
    g20: {
      theme: "One Earth · One Family · One Future",
      year: 2023,
      attribution: "Theme of India’s 2023 G20 Presidency, drawn from Vasudhaiva Kutumbakam.",
    },
    pm: {
      /** set only with a confirmed licence — e.g. a PIB/PMO image on Wikimedia Commons (GODL-India) */
      image: null as string | null,
      caption: "Narendra Modi, Prime Minister of India.",
      credit: "Photo: Prime Minister’s Office, Government of India (GODL-India), via Wikimedia Commons",
      licence: "GODL-India",
    },
  },
} as const;
