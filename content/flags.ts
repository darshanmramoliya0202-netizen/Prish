import type { FlagId } from "./types";

/** Buyer-facing wording for the compliance flags (the CRM's own text is internal sales guidance). */
export const flagCopy: Record<FlagId, { label: string; text: string }> = {
  cres_required: {
    label: "Scheduled spice",
    text: "A scheduled spice under the Spices Board Act — ships under our Spices Board of India exporter registration (CRES), which appears on the paperwork.",
  },
  eto_scrutiny: {
    label: "ETO-free",
    text: "Ethylene oxide is never used as a treatment on our lots. Batch-level ETO-free declarations are available and are standard for EU shipments of Indian origin.",
  },
  novel_food_check: {
    label: "EU novel-food check",
    text: "For the EU, confirm this ingredient's novel-food status for your intended use before commercial import. We share the documentation we hold.",
  },
  organic_expected: {
    label: "Organic on request",
    text: "Conventional by default; organic-certified lots on request where available for the season.",
  },
  aflatoxin_mrl: {
    label: "Tested at entry",
    text: "Routinely tested for aflatoxin and pesticide residues (MRLs) at US and EU entry — the lab panel is available before shipment.",
  },
};
