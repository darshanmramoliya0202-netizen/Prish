/**
 * Company facts. Every value here traces to the brochure
 * (F:\Prish Overseas\catalogues\prish-overseas\Prish_Overseas_Brochure_email.pdf)
 * or to an explicit owner decision recorded in the plan. Nothing else.
 */
export const site = {
  company: "Prish Overseas",
  tagline: "From Indian farms to global formulations",
  positioning: "Export-focused ingredient supplier",
  altTagline: "Nature powered. Science perfected.",
  city: "Rajkot",
  state: "Gujarat",
  country: "India",
  countryCode: "IN",
  postalCode: "360003",
  address: [
    "Street No. 6, Arya Nagar Main Road",
    "Ranchod Nagar, Arya Nagar Society",
    "Rajkot – 360003, Gujarat, India",
  ],
  /** [lng, lat] — Rajkot */
  coords: [70.8022, 22.3039] as [number, number],
  email: "exports@prishoverseas.com",
  emailLegacy: "prishoverseas9@gmail.com",
  phones: ["+91 95866 16746", "+91 98248 76775", "+91 70467 79406"],
  /** E.164 digits for wa.me — owner decision: the first brochure number */
  whatsapp: "919586616746",
  sectors: [
    "Food & Beverage",
    "Nutraceutical",
    "Pharmaceutical",
    "Functional Foods",
    "Wellness & Cosmetic",
  ],
  /** Brochure p2/p7/p8 — the only numbers we publish */
  stats: [
    { value: "2500+", unit: "MT", label: "monthly production capacity" },
    { value: "100+", unit: "", label: "specification profiles supported" },
    { value: "12–24", unit: "months", label: "validated shelf life" },
    { value: "4", unit: "", label: "export regions served" },
  ],
  sunshineDays: "280+",
  incoterms: ["FOB", "CIF"] as const,
  social: {} as { linkedin?: string },
  people: [
    { name: "Yash Talaviya", role: "Director", photo: null as string | null },
  ],
} as const;

export type Site = typeof site;
