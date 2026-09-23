/**
 * Slice a tall full-page screenshot into viewport-height tiles laid out left→right so
 * the whole page reads at a glance in one image.
 *   node scripts/qa/slice.mjs <in.png> <out.jpg> [--tileH 900] [--cols 4] [--scale 0.5]
 */
import sharp from "sharp";
const args = process.argv.slice(2);
const [inp, out] = args;
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : Number(args[i + 1]);
};
const tileH = opt("tileH", 900), COLS = opt("cols", 4), scale = opt("scale", 0.5), PAD = 6;
const meta = await sharp(inp).metadata();
const W = meta.width, H = meta.height;
const n = Math.ceil(H / tileH);
const tw = Math.round(W * scale), th = Math.round(tileH * scale);
const rows = Math.ceil(n / COLS);
const comps = [];
for (let i = 0; i < n; i++) {
  const top = i * tileH;
  const h = Math.min(tileH, H - top);
  const buf = await sharp(inp).extract({ left: 0, top, width: W, height: h }).resize(tw, Math.round(h * scale)).png().toBuffer();
  comps.push({ input: buf, left: PAD + (i % COLS) * (tw + PAD), top: PAD + Math.floor(i / COLS) * (th + PAD) });
}
await sharp({ create: { width: COLS * (tw + PAD) + PAD, height: rows * (th + PAD) + PAD, channels: 3, background: "#888" } })
  .composite(comps).jpeg({ quality: 82 }).toFile(out);
console.log(`slice → ${out} (${n} tiles)`);
