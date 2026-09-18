import { join } from "node:path";
import { readFileSync } from "node:fs";
import { Font, StyleSheet } from "@react-pdf/renderer";

/** Brand palette + fonts for PDFs. Latin only (react-pdf has no Indic shaping). */
export const C = {
  forest: "#0b3d2e",
  forestDeep: "#06231a",
  cream: "#fbf8f1",
  cream2: "#f6f1e4",
  cream3: "#ede4cf",
  gold: "#d4a24c",
  gold2: "#eccf8a",
  ink: "#14110c",
  ink2: "#3d3629",
  ink3: "#6b6353",
  rule: "#dfd3b6",
} as const;

const fontDir = (pkg: string) =>
  join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

let registered = false;
export function registerFonts(): void {
  if (registered) return;
  registered = true;
  Font.register({
    family: "Fraunces",
    fonts: [
      {
        src: join(fontDir("fraunces"), "fraunces-latin-600-normal.woff"),
        fontWeight: 600,
      },
      {
        src: join(fontDir("fraunces"), "fraunces-latin-400-italic.woff"),
        fontWeight: 400,
        fontStyle: "italic",
      },
    ],
  });
  Font.register({
    family: "Figtree",
    fonts: [
      {
        src: join(fontDir("figtree"), "figtree-latin-400-normal.woff"),
        fontWeight: 400,
      },
      {
        src: join(fontDir("figtree"), "figtree-latin-600-normal.woff"),
        fontWeight: 600,
      },
      {
        src: join(fontDir("figtree"), "figtree-latin-700-normal.woff"),
        fontWeight: 700,
      },
    ],
  });
  // no hyphenation in headings
  Font.registerHyphenationCallback((w) => [w]);
}

export const s = StyleSheet.create({
  page: {
    fontFamily: "Figtree",
    fontSize: 9.5,
    color: C.ink,
    backgroundColor: C.cream,
    paddingTop: 0,
    paddingBottom: 54,
    paddingHorizontal: 0,
  },
  band: {
    backgroundColor: C.forest,
    color: C.cream,
    paddingVertical: 18,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bandTitle: { fontSize: 9, letterSpacing: 2.5, fontWeight: 700 },
  bandSub: { fontSize: 8, opacity: 0.8, marginTop: 2 },
  body: { paddingHorizontal: 40, paddingTop: 22 },
  h1: {
    fontFamily: "Fraunces",
    fontWeight: 600,
    fontSize: 26,
    lineHeight: 1.05,
    color: C.ink,
  },
  h2: {
    fontFamily: "Fraunces",
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 6,
    color: C.ink,
  },
  eyebrow: {
    fontSize: 7.5,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: C.ink3,
    fontWeight: 600,
  },
  p: { fontSize: 9.5, lineHeight: 1.5, color: C.ink2 },
  small: { fontSize: 7.8, color: C.ink3, lineHeight: 1.45 },
  chip: {
    borderWidth: 0.8,
    borderColor: C.rule,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    fontSize: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  row: { flexDirection: "row" },
  col: { flexDirection: "column" },
  table: { borderTopWidth: 0.8, borderTopColor: C.rule },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 0.6,
    borderBottomColor: C.rule,
    paddingVertical: 4.5,
  },
  th: { width: "40%", fontWeight: 600, color: C.ink2, fontSize: 9 },
  td: { width: "60%", fontSize: 9 },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: C.ink3,
    borderTopWidth: 0.6,
    borderTopColor: C.rule,
    paddingTop: 6,
  },
  rule: { height: 0.8, backgroundColor: C.rule, marginVertical: 10 },
  bullet: { flexDirection: "row", marginBottom: 3 },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.gold,
    marginTop: 4.5,
    marginRight: 6,
  },
});

/** react-pdf fetches string srcs; on Node we hand it bytes. */
export type ImageSrc = { data: Buffer; format: "png" | "jpg" };
export function png(path: string): ImageSrc {
  return { data: readFileSync(path), format: "png" };
}

/** Replace glyphs the Latin subsets lack with words. */
export function pdfText(v: string): string {
  return v
    .replace(/≤\s*/g, "max ")
    .replace(/≥\s*/g, "min ")
    .replace(/→/g, "->")
    .replace(/·/g, "·");
}
