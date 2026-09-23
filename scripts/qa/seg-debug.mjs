/**
 * Debug view of the photo pipeline segmentation: knocks out the pale sweep of a product
 * photo and colour-codes the connected components (the largest — the bowl — is dimmed;
 * everything else becomes a burst piece).
 *   node scripts/qa/seg-debug.mjs <in> <out.png> [maxWidth]
 */
// Prototype: knock out a pale sweep, label connected components, colour-code them.
import sharp from "sharp";
const [,, inp, out, maxW = "900"] = process.argv;
const W0 = Number(maxW);
const { data, info } = await sharp(inp).resize({ width: W0 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width, h = info.height;
const px = (x, y) => (y * w + x) * 4;
// background = median of border pixels
const border = [];
for (let x = 0; x < w; x++) { border.push(px(x, 0), px(x, h - 1)); }
for (let y = 0; y < h; y++) { border.push(px(0, y), px(w - 1, y)); }
const med = (c) => { const v = border.map(i => data[i + c]).sort((a, b) => a - b); return v[v.length >> 1]; };
const bg = [med(0), med(1), med(2)];
const dist2 = (i) => (data[i]-bg[0])**2 + (data[i+1]-bg[1])**2 + (data[i+2]-bg[2])**2;
const TOL = 34 * 34 * 3;
const mask = new Uint8Array(w * h); // 1 = bg
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
while (stack.length) {
  const p = stack.pop(); if (mask[p]) continue;
  if (dist2(p * 4) > TOL) continue;
  mask[p] = 1;
  const x = p % w, y = (p - x) / w;
  if (x > 0) stack.push(p - 1); if (x < w - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - w); if (y < h - 1) stack.push(p + w);
}
// label foreground components (4-connected)
const label = new Int32Array(w * h); let n = 0; const sizes = [], boxes = [];
for (let p0 = 0; p0 < w * h; p0++) {
  if (mask[p0] || label[p0]) continue;
  n++; let size = 0; let x0 = w, y0 = h, x1 = 0, y1 = 0;
  const st = [p0]; label[p0] = n;
  while (st.length) {
    const p = st.pop(); size++;
    const x = p % w, y = (p - x) / w;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    const nb = [p - 1, p + 1, p - w, p + w];
    for (const q of nb) { if (q < 0 || q >= w * h) continue; const qx = q % w; if (Math.abs(qx - x) > 1) continue; if (mask[q] || label[q]) continue; label[q] = n; st.push(q); }
  }
  sizes.push(size); boxes.push([x0, y0, x1, y1]);
}
const order = sizes.map((s, i) => [s, i]).sort((a, b) => b[0] - a[0]);
console.log(`bg=${bg} components=${n}`);
order.slice(0, 20).forEach(([s, i]) => console.log(`  #${i + 1} size=${s} (${(100 * s / (w * h)).toFixed(2)}%) box=${boxes[i]}`));
// colour-code
const outBuf = Buffer.alloc(w * h * 3);
const pal = [[230,40,40],[40,200,60],[40,90,240],[240,200,30],[200,50,220],[30,210,210],[250,130,30],[130,90,40],[90,180,120],[180,180,255]];
const rank = new Map(order.map(([, i], r) => [i + 1, r]));
for (let p = 0; p < w * h; p++) {
  const i = p * 4, o = p * 3;
  if (mask[p]) { outBuf[o] = 245; outBuf[o+1] = 245; outBuf[o+2] = 245; continue; }
  const r = rank.get(label[p]) ?? 99;
  if (r === 0) { outBuf[o] = data[i] * 0.6; outBuf[o+1] = data[i+1] * 0.6; outBuf[o+2] = data[i+2] * 0.6; continue; }
  const c = pal[r % pal.length] ?? [0,0,0];
  outBuf[o] = c[0]; outBuf[o+1] = c[1]; outBuf[o+2] = c[2];
}
await sharp(outBuf, { raw: { width: w, height: h, channels: 3 } }).png().toFile(out);
console.log("wrote", out);
