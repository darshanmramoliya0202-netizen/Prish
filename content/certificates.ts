import type { Certificate } from "./types";

/**
 * Certifications the owner confirmed on 2026-09-18. A certificate renders ONLY when
 * `number` is set (owner supplies numbers/scans during the build). APEDA RCMC is
 * under approval and shows as "in process" without a number.
 */
export const certificates: Certificate[] = [
  {
    id: "fssai",
    name: "FSSAI Licence",
    issuer: "Food Safety and Standards Authority of India",
    status: "held",
    number: null,
    scope: "Food business operator — export",
    showOn: ["quality", "footer", "pdf"],
    verifyUrl: "https://foscos.fssai.gov.in/",
  },
  {
    id: "iec",
    name: "Importer-Exporter Code (IEC)",
    issuer: "DGFT, Ministry of Commerce & Industry, Government of India",
    status: "held",
    number: null,
    showOn: ["quality", "footer", "pdf"],
    verifyUrl: "https://www.dgft.gov.in/",
  },
  {
    id: "gst",
    name: "GST Registration",
    issuer: "Goods and Services Tax Network, Government of India",
    status: "held",
    number: null,
    showOn: ["footer", "pdf"],
    verifyUrl: "https://services.gst.gov.in/services/searchtp",
  },
  {
    id: "spices_board",
    name: "Spices Board Registration (CRES)",
    issuer: "Spices Board of India, Ministry of Commerce & Industry",
    status: "held",
    number: null,
    scope: "Certificate of Registration as Exporter of Spices",
    showOn: ["quality", "pdf"],
    verifyUrl: "https://www.indianspices.com/",
  },
  {
    id: "iso",
    name: "ISO Certification",
    issuer: "Accredited certification body",
    status: "held",
    number: null,
    scope: "ISO 22000 / 9001 — scope as per certificate",
    showOn: ["quality", "pdf"],
  },
  {
    id: "haccp",
    name: "HACCP Certification",
    issuer: "Accredited certification body",
    status: "held",
    number: null,
    scope: "Hazard analysis and critical control points — processing",
    showOn: ["quality", "pdf"],
  },
  {
    id: "apeda_rcmc",
    name: "APEDA RCMC",
    issuer:
      "Agricultural and Processed Food Products Export Development Authority",
    status: "in_process",
    number: null,
    scope: "Registration-cum-Membership Certificate — under approval",
    showOn: ["quality"],
  },
];

/** Certificates that may be rendered: held with a number, or explicitly in process. */
export function visibleCertificates(
  where: Certificate["showOn"][number],
): Certificate[] {
  return certificates.filter(
    (c) =>
      c.showOn.includes(where) &&
      (c.number !== null || c.status === "in_process"),
  );
}
