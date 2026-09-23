/**
 * Contact sheet — tiles a list of images (one path per line in <list.txt>) into one
 * labelled JPEG so a whole set can be judged at a glance.
 *   node scripts/qa/sheet.mjs <out.jpg> <list.txt> [--tile 380] [--cols 5] [--bg #hex]
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

const args = process.argv.slice(2);
const [out, listFile] = args;
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : Number(args[i + 1]);
};
if (!out || !listFile) {
  console.error("usage: sheet.mjs <out.jpg> <list.txt> [--tile 380] [--cols 5] [--bg #hex]");
  process.exit(2);
}
const files = readFileSync(listFile, "utf8").split(/\r?\n/).filter(Boolean);
const T = opt("tile", 380), COLS = opt("cols", 5), PAD = 8, LABEL = 22;
const bgArg = args.indexOf("--bg");
const BG = bgArg === -1 ? "#bfc7d0" : args[bgArg + 1];
const rows = Math.ceil(files.length / COLS);
const W = COLS * (T + PAD) + PAD, H = rows * (T + LABEL + PAD) + PAD;
const comps = [];
for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const x = PAD + (i % COLS) * (T + PAD);
  const y = PAD + Math.floor(i / COLS) * (T + LABEL + PAD);
  try {
    const buf = await sharp(f).rotate().resize(T, T, { fit: "inside" }).png().toBuffer();
    const m = await sharp(buf).metadata();
    comps.push({ input: buf, left: x + Math.floor((T - m.width) / 2), top: y + Math.floor((T - m.height) / 2) });
  } catch (e) {
    console.error("skip", f, e.message);
  }
  const name = basename(f).replace(/\.[a-z]+$/i, "").slice(0, 34).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const svg = `<svg width="${T}" height="${LABEL}"><text x="4" y="16" font-size="15" font-family="Arial" fill="${BG === "#bfc7d0" ? "#111" : "#eee"}">${i + 1}. ${name}</text></svg>`;
  comps.push({ input: Buffer.from(svg), left: x, top: y + T + 2 });
}
await sharp({ create: { width: W, height: H, channels: 4, background: BG } })
  .composite(comps)
  .jpeg({ quality: 80 })
  .toFile(out);
console.log(`sheet → ${out} (${W}×${H}, ${files.length} images)`);
