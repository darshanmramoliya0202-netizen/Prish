import type { Region } from "./types";

/**
 * The four export regions from the brochure (p8). Compliance notes are general
 * market knowledge to help a buyer prepare — never per-shipment promises.
 */
export const regions: Region[] = [
  {
    id: "us",
    name: "United States",
    short: "US",
    countriesHint: ["United States"],
    timezones: ["America/"],
    languages: ["en-US"],
    incotermDefault: "FOB",
    arcTarget: [-98, 39],
    compliance: {
      general: [
        "FDA Food Facility Registration and Prior Notice apply to the importer’s entry; we support with documentation.",
        "FSVP: your importer will ask for supplier verification records — we share specs, process summaries and lab reports.",
        "Labelling in English with net weight, lot, origin “Product of India”.",
      ],
      byFlag: {
        aflatoxin_mrl:
          "Expect aflatoxin and pesticide residue testing at entry for spices; ask us for the lab panel before shipment.",
        cres_required:
          "Spice consignments carry Spices Board registration on the paperwork.",
        eto_scrutiny:
          "Ethylene-oxide is not permitted as a treatment on our lots; ETO-free declarations available.",
      },
      docsUsuallyAsked: [
        "Commercial invoice",
        "Packing list",
        "Certificate of origin",
        "Phytosanitary certificate (where applicable)",
        "Certificate of analysis",
      ],
    },
  },
  {
    id: "eu",
    name: "European Union",
    short: "EU",
    countriesHint: [
      "Germany",
      "Netherlands",
      "France",
      "Italy",
      "Spain",
      "Poland",
      "Belgium",
      "United Kingdom",
    ],
    timezones: ["Europe/"],
    languages: [
      "de",
      "fr",
      "nl",
      "it",
      "es",
      "pt",
      "pl",
      "sv",
      "da",
      "fi",
      "cs",
      "el",
      "en-GB",
    ],
    incotermDefault: "FOB",
    arcTarget: [10, 50],
    compliance: {
      general: [
        "EU MRL panel (pesticides) and heavy metals per Regulation (EC) 396/2005 and 2023/915 — ask for the lab panel before shipment.",
        "Indian spices and some dried vegetables are under increased official controls at EU borders; documentation must be complete and consistent.",
        "Labelling per Regulation (EU) 1169/2011; allergen statements available per product.",
      ],
      byFlag: {
        eto_scrutiny:
          "Ethylene-oxide history for Indian origin means buyers ask for batch-level ETO-free certificates; available on request.",
        novel_food_check:
          "Novel-food status for this ingredient should be confirmed against the EU Novel Food Catalogue for your intended use before commercial import.",
        aflatoxin_mrl:
          "Aflatoxin and pesticide MRL testing is routine at EU entry for this product.",
        cres_required:
          "Spice consignments carry Spices Board registration on the paperwork.",
      },
      docsUsuallyAsked: [
        "Commercial invoice",
        "Packing list",
        "Certificate of origin",
        "Health/phytosanitary certificate",
        "Certificate of analysis",
        "ETO-free declaration (spices)",
      ],
    },
  },
  {
    id: "gcc",
    name: "Gulf Cooperation Council",
    short: "GCC",
    countriesHint: [
      "United Arab Emirates",
      "Saudi Arabia",
      "Qatar",
      "Kuwait",
      "Oman",
      "Bahrain",
    ],
    timezones: [
      "Asia/Dubai",
      "Asia/Riyadh",
      "Asia/Qatar",
      "Asia/Kuwait",
      "Asia/Muscat",
      "Asia/Bahrain",
    ],
    languages: ["ar"],
    incotermDefault: "CIF",
    arcTarget: [46, 24],
    compliance: {
      general: [
        "GSO labelling: Arabic labelling requirements apply at retail; bulk industrial packs carry English labels with lot and origin.",
        "Importer registration on the destination food-import portal (e.g. UAE, SFDA) is handled by your side; we supply matching documents.",
        "Shelf-life declaration and production date on every pack.",
      ],
      byFlag: {
        aflatoxin_mrl:
          "Aflatoxin testing on spices is commonly requested; lab panel available.",
        cres_required:
          "Spice consignments carry Spices Board registration on the paperwork.",
      },
      docsUsuallyAsked: [
        "Commercial invoice",
        "Packing list",
        "Certificate of origin (attested where required)",
        "Certificate of analysis",
        "Health certificate",
      ],
    },
  },
  {
    id: "sea",
    name: "Southeast Asia",
    short: "SE Asia",
    countriesHint: [
      "Singapore",
      "Malaysia",
      "Indonesia",
      "Thailand",
      "Vietnam",
      "Philippines",
    ],
    timezones: [
      "Asia/Singapore",
      "Asia/Kuala_Lumpur",
      "Asia/Jakarta",
      "Asia/Bangkok",
      "Asia/Ho_Chi_Minh",
      "Asia/Manila",
    ],
    languages: ["ms", "id", "th", "vi", "tl"],
    incotermDefault: "CIF",
    arcTarget: [106, 8],
    compliance: {
      general: [
        "Import permits and product registration vary by country; your importer applies, we supply matching specs and certificates.",
        "Phytosanitary certificates are commonly required for whole spices and grains.",
        "Labelling in the destination language where required for retail; bulk packs in English.",
      ],
      byFlag: {
        aflatoxin_mrl:
          "Aflatoxin and pesticide testing may be requested at entry; lab panel available.",
        cres_required:
          "Spice consignments carry Spices Board registration on the paperwork.",
      },
      docsUsuallyAsked: [
        "Commercial invoice",
        "Packing list",
        "Certificate of origin",
        "Phytosanitary certificate",
        "Certificate of analysis",
      ],
    },
  },
];

export const regionById = Object.fromEntries(
  regions.map((r) => [r.id, r]),
) as Record<Region["id"], Region>;
