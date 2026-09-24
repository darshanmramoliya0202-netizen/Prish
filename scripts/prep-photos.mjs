/**
 * Photo pipeline — turns whatever sits in assets-src/photos/ into the web-ready files
 * under public/photos/ and writes content/generated/photos.json.
 *
 *   assets-src/photos/products/<slug>/bowl.*   → public/photos/products/<slug>/bowl.webp    (1600², alpha)
 *                                                public/photos/products/<slug>/bowl.png     (720², for OG images and PDFs)
 *                                                public/photos/products/<slug>/pieces.webp  (sprite atlas of the loose crop)
 *   assets-src/photos/products/<slug>/scene.*  → public/photos/products/<slug>/scene.jpg    (≤2000 wide — product hero backdrop)
 *   assets-src/photos/products/<slug>/macro.*  → public/photos/products/<slug>/macro.jpg    (1200², square crop — "actual product", real only)
 *   assets-src/photos/products/<slug>/source.* → public/photos/products/<slug>/source.jpg   (≤1600 wide — origin section)
 *   assets-src/photos/site/<id>.*              → public/photos/site/<id>.jpg                (≤2400 wide)
 *   assets-src/photos/products/<slug>/bowl-2.* → more pieces for the same atlas (the same bowl generated again)
 *   a sibling <name>.txt                       → caption;   <name>.json → options ({ "text": true })
 *
 * `bowl` — the product in its bowl with the raw crop / fruit beside it, on a plain sweep.
 * The background is removed by flood-filling from the border against a *position-aware*
 * estimate of the sweep (interpolated from the borders, so a gradient or a white bowl on
 * a pale sweep survives); a soft grey cast shadow on the ground is kept as real
 * transparency so the bowl sits on any page colour. With `{ "text": true }` a product
 * name baked into the bottom band is erased; the generator's corner mark always is.
 *
 * The loose parts of the composition (the fruit, the seeds, the leaves — everything that
 * is not the bowl) are found by connected components after a light erosion (so berries
 * touching at a point separate), packed into a sprite atlas and listed in the manifest
 * with their position in the bowl image. The burst flings exactly those pieces.
 */
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const PIPELINE = "v9"; // bump to reprocess every file
const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "assets-src", "photos");
const OUT = join(ROOT, "public", "photos");
const MANIFEST = join(ROOT, "content", "generated", "photos.json");
const STAMPS = join(SRC, ".stamps.json");
const IMG = /\.(png|jpe?g|webp|avif|tiff?)$/i;
const SLUG = /^[a-z0-9-]+$/;
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

const BOWL = 1600; // output canvas
const BOWL_FIT = 1480; // content box inside it
const WORK = 2200; // working resolution for the knock-out
const CELL = 192; // atlas cell (px)
const COLS = 6;
const MAX_PIECES = 36;

const manifest = { products: {}, site: {} };
const stamps = existsSync(STAMPS)
  ? JSON.parse(readFileSync(STAMPS, "utf8"))
  : {};
let written = 0;
let kept = 0;

const hashOf = (file, extra = "") =>
  createHash("sha1")
    .update(PIPELINE)
    .update(extra)
    .update(readFileSync(file))
    .digest("hex")
    .slice(0, 12);

/** buffer then write, with retry — Windows can EPERM while a watcher touches the file */
async function writeOut(pipelineOrBuffer, target) {
  const buf = Buffer.isBuffer(pipelineOrBuffer)
    ? pipelineOrBuffer
    : await pipelineOrBuffer.toBuffer();
  for (let i = 0; ; i++) {
    try {
      writeFileSync(target, buf);
      return;
    } catch (e) {
      if (i === 3) throw e;
      await new Promise((r) => setTimeout(r, 120));
    }
  }
}

/* ────────────────────────── raster helpers ────────────────────────────── */

const lumOf = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

/**
 * Background field: for every border pixel take the colour, throw away samples that
 * are clearly not the sweep (an object touching the edge), interpolate the gaps and
 * smooth. Returns four arrays (top, bottom, left, right) of [r,g,b].
 */
function borderModel(data, w, h) {
  const take = (i) => [data[i], data[i + 1], data[i + 2]];
  const rows = {
    top: Array.from({ length: w }, (_, x) => take((0 * w + x) * 4)),
    bottom: Array.from({ length: w }, (_, x) => take(((h - 1) * w + x) * 4)),
    left: Array.from({ length: h }, (_, y) => take((y * w + 0) * 4)),
    right: Array.from({ length: h }, (_, y) => take((y * w + w - 1) * 4)),
  };
  // robust global sweep colour: per-channel median of every border sample
  const all = [...rows.top, ...rows.bottom, ...rows.left, ...rows.right];
  const med = (c) => {
    const v = all.map((p) => p[c]).sort((a, b) => a - b);
    return v[v.length >> 1];
  };
  const G = [med(0), med(1), med(2)];
  const clean = (arr) => {
    const valid = arr.map(
      (p) =>
        Math.abs(p[0] - G[0]) < 44 &&
        Math.abs(p[1] - G[1]) < 44 &&
        Math.abs(p[2] - G[2]) < 44,
    );
    // fill invalid runs by linear interpolation between valid neighbours
    const out = arr.map((p) => p.slice());
    let i = 0;
    while (i < arr.length) {
      if (valid[i]) {
        i++;
        continue;
      }
      let j = i;
      while (j < arr.length && !valid[j]) j++;
      const a = i > 0 ? out[i - 1] : j < arr.length ? out[j] : G;
      const b = j < arr.length ? out[j] : a;
      for (let k = i; k < j; k++) {
        const t = (k - i + 1) / (j - i + 1);
        out[k] = [0, 1, 2].map((c) => a[c] + (b[c] - a[c]) * t);
      }
      i = j;
    }
    // box smooth
    const win = Math.max(8, Math.round(arr.length / 24));
    const sm = out.map((_, k) => {
      const lo = Math.max(0, k - win),
        hi = Math.min(arr.length - 1, k + win);
      const s = [0, 0, 0];
      for (let m = lo; m <= hi; m++) {
        s[0] += out[m][0];
        s[1] += out[m][1];
        s[2] += out[m][2];
      }
      const n = hi - lo + 1;
      return [s[0] / n, s[1] / n, s[2] / n];
    });
    return sm;
  };
  return {
    top: clean(rows.top),
    bottom: clean(rows.bottom),
    left: clean(rows.left),
    right: clean(rows.right),
    global: G,
  };
}

/** inverse-distance blend of the four border estimates at (x, y) */
function estimateAt(model, w, h, x, y, out) {
  const wt = 1 / ((y + 1) * (y + 1));
  const wb = 1 / ((h - y) * (h - y));
  const wl = 1 / ((x + 1) * (x + 1));
  const wr = 1 / ((w - x) * (w - x));
  const sum = wt + wb + wl + wr;
  const T = model.top[x],
    B = model.bottom[x],
    L = model.left[y],
    R = model.right[y];
  out[0] = (T[0] * wt + B[0] * wb + L[0] * wl + R[0] * wr) / sum;
  out[1] = (T[1] * wt + B[1] * wb + L[1] * wl + R[1] * wr) / sum;
  out[2] = (T[2] * wt + B[2] * wb + L[2] * wl + R[2] * wr) / sum;
}

/**
 * Border-connected knock-out → RGBA buffer with real alpha (0 background, soft cast
 * shadow, 255 subject, anti-aliased rim). Also erases the corner mark and, with
 * `text`, everything that starts in the bottom band (a baked-in label).
 */
function knockOut(data, w, h, { text = false } = {}) {
  const N = w * h;
  // a source that already carries real transparency is trusted as-is
  let transparent = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 8) transparent++;
  if (transparent > N / 50) return { out: data, sweep: null };

  const model = borderModel(data, w, h);
  const est = [0, 0, 0];
  const TOL = 18 * 18 * 3;
  const cls = new Uint8Array(N); // 0 unknown, 1 bg, 2 shadow, 3 subject
  const shadowA = new Uint8Array(N);
  const stack = new Int32Array(N);
  let sp = 0;
  const push = (p) => {
    if (!cls[p]) {
      cls[p] = 255; // queued
      stack[sp++] = p;
    }
  };
  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }
  while (sp) {
    const p = stack[--sp];
    const i = p * 4;
    const x = p % w;
    const y = (p - x) / w;
    estimateAt(model, w, h, x, y, est);
    const dr = data[i] - est[0],
      dg = data[i + 1] - est[1],
      db = data[i + 2] - est[2];
    const d2 = dr * dr + dg * dg + db * db;
    let kind = 0;
    if (d2 <= TOL) kind = 1;
    else {
      const lum = lumOf(data[i], data[i + 1], data[i + 2]);
      const lumE = lumOf(est[0], est[1], est[2]);
      const chroma =
        Math.max(data[i], data[i + 1], data[i + 2]) -
        Math.min(data[i], data[i + 1], data[i + 2]);
      const chromaE = Math.max(est[0], est[1], est[2]) - Math.min(est[0], est[1], est[2]);
      // a soft cast shadow on the sweep: a little darker, no more colourful than the
      // sweep, on the ground. Kept light enough that a bowl's own shaded underside
      // (much darker) stays part of the bowl.
      if (
        lum < lumE - 4 &&
        lum > lumE * 0.68 &&
        chroma <= chromaE + 10 &&
        y > h * 0.3
      ) {
        kind = 2;
        shadowA[p] = Math.max(0, Math.min(200, Math.round((lumE - lum) * 1.7)));
      }
    }
    if (!kind) {
      cls[p] = 3;
      continue;
    }
    cls[p] = kind;
    if (x > 0) push(p - 1);
    if (x < w - 1) push(p + 1);
    if (y > 0) push(p - w);
    if (y < h - 1) push(p + w);
  }
  // everything never reached is subject
  for (let p = 0; p < N; p++) if (cls[p] === 0 || cls[p] === 255) cls[p] = 3;

  // enclosed pockets of sweep (between a fruit and the bowl) never touch the border:
  // small regions that match the local sweep *tightly* are background too
  {
    const TIGHT = 15 * 15 * 3;
    const pocket = new Uint8Array(N);
    for (let p = 0; p < N; p++) {
      if (cls[p] !== 3) continue;
      const i = p * 4;
      const x = p % w;
      const y = (p - x) / w;
      estimateAt(model, w, h, x, y, est);
      const dr = data[i] - est[0],
        dg = data[i + 1] - est[1],
        db = data[i + 2] - est[2];
      if (dr * dr + dg * dg + db * db <= TIGHT) pocket[p] = 1;
    }
    for (const c of components(data, w, h, 0, pocket))
      if (c.area >= 30 && c.area <= N * 0.04)
        for (const p of c.pixels) cls[p] = 1;
  }

  const out = Buffer.from(data); // copy
  const paint = () => {
    for (let p = 0; p < N; p++) {
      const i = p * 4;
      if (cls[p] === 1) {
        out[i + 3] = 0;
      } else if (cls[p] === 2) {
        out[i] = 22;
        out[i + 1] = 15;
        out[i + 2] = 10;
        out[i + 3] = shadowA[p];
      } else out[i + 3] = 255;
    }
    // anti-aliased rim: subject pixels bordering background take a partial alpha
    for (let p = 0; p < N; p++) {
      if (cls[p] !== 3) continue;
      const x = p % w;
      const y = (p - x) / w;
      let bgN = 0;
      if (x > 0 && cls[p - 1] === 1) bgN++;
      if (x < w - 1 && cls[p + 1] === 1) bgN++;
      if (y > 0 && cls[p - w] === 1) bgN++;
      if (y < h - 1 && cls[p + w] === 1) bgN++;
      if (bgN) out[p * 4 + 3] = bgN >= 2 ? 96 : 150;
    }
  };
  paint();

  // erase: the generator's corner mark, and a baked-in label in the bottom band —
  // the whole component including its soft rim, plus one pixel around it
  const comps = components(out, w, h, 40);
  const band = Math.round(h * 0.7);
  let erased = false;
  for (const c of comps) {
    const inCorner = c.x0 > w * 0.86 && c.y0 > h * 0.86;
    const inBand = text && c.y0 >= band;
    if (!(inCorner || inBand)) continue;
    erased = true;
    for (const p of c.pixels) {
      cls[p] = 1;
      const x = p % w;
      const y = (p - x) / w;
      if (x > 0) cls[p - 1] = 1;
      if (x < w - 1) cls[p + 1] = 1;
      if (y > 0) cls[p - w] = 1;
      if (y < h - 1) cls[p + w] = 1;
    }
  }
  if (erased) paint();
  return { out, sweep: model.global };
}

/** connected components (4-neighbour) of pixels with alpha > threshold */
function components(rgba, w, h, threshold, mask = null) {
  const N = w * h;
  const seen = new Uint8Array(N);
  const stack = new Int32Array(N);
  const out = [];
  const fg = mask
    ? (p) => mask[p] === 1
    : (p) => rgba[p * 4 + 3] > threshold;
  for (let s = 0; s < N; s++) {
    if (seen[s] || !fg(s)) continue;
    let sp = 0;
    stack[sp++] = s;
    seen[s] = 1;
    const pixels = [];
    let x0 = w,
      y0 = h,
      x1 = 0,
      y1 = 0;
    while (sp) {
      const p = stack[--sp];
      pixels.push(p);
      const x = p % w;
      const y = (p - x) / w;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
      if (x > 0 && !seen[p - 1] && fg(p - 1)) {
        seen[p - 1] = 1;
        stack[sp++] = p - 1;
      }
      if (x < w - 1 && !seen[p + 1] && fg(p + 1)) {
        seen[p + 1] = 1;
        stack[sp++] = p + 1;
      }
      if (y > 0 && !seen[p - w] && fg(p - w)) {
        seen[p - w] = 1;
        stack[sp++] = p - w;
      }
      if (y < h - 1 && !seen[p + w] && fg(p + w)) {
        seen[p + w] = 1;
        stack[sp++] = p + w;
      }
    }
    out.push({ pixels, x0, y0, x1, y1, area: pixels.length });
  }
  return out;
}

/** erode a binary mask k times (4-neighbour) */
function erode(mask, w, h, k) {
  const N = w * h;
  let cur = mask;
  for (let it = 0; it < k; it++) {
    const next = new Uint8Array(N);
    for (let p = 0; p < N; p++) {
      if (!cur[p]) continue;
      const x = p % w;
      const y = (p - x) / w;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) continue;
      if (cur[p - 1] && cur[p + 1] && cur[p - w] && cur[p + w]) next[p] = 1;
    }
    cur = next;
  }
  return cur;
}

/**
 * Split a mask into parts: erode k px so parts touching at a point separate, label the
 * seeds, then grow the labels back inside the mask. Returns the label map (0 = none)
 * and per-label stats.
 */
function split(mask, w, h, k, minSeed) {
  const N = w * h;
  const seeds = components(null, w, h, 0, erode(mask, w, h, k)).filter(
    (c) => c.area >= minSeed,
  );
  const label = new Int32Array(N);
  seeds.forEach((c, i) => {
    for (const p of c.pixels) label[p] = i + 1;
  });
  for (let it = 0; it < k + 3; it++) {
    const next = Int32Array.from(label);
    let changed = false;
    for (let p = 0; p < N; p++) {
      if (label[p] || !mask[p]) continue;
      const x = p % w;
      const y = (p - x) / w;
      const l =
        (x > 0 && label[p - 1]) ||
        (x < w - 1 && label[p + 1]) ||
        (y > 0 && label[p - w]) ||
        (y < h - 1 && label[p + w]) ||
        0;
      if (l) {
        next[p] = l;
        changed = true;
      }
    }
    label.set(next);
    if (!changed) break;
  }
  const stats = seeds.map((_, i) => ({
    id: i + 1,
    area: 0,
    x0: w,
    y0: h,
    x1: 0,
    y1: 0,
    cx: 0,
    cy: 0,
  }));
  for (let p = 0; p < N; p++) {
    const l = label[p];
    if (!l) continue;
    const s = stats[l - 1];
    const x = p % w;
    const y = (p - x) / w;
    s.area++;
    s.cx += x;
    s.cy += y;
    if (x < s.x0) s.x0 = x;
    if (x > s.x1) s.x1 = x;
    if (y < s.y0) s.y0 = y;
    if (y > s.y1) s.y1 = y;
  }
  for (const s of stats) {
    s.cx /= s.area || 1;
    s.cy /= s.area || 1;
  }
  return { label, stats: stats.sort((a, b) => b.area - a.area) };
}

const bboxArea = (s) => (s.x1 - s.x0 + 1) * (s.y1 - s.y0 + 1);

/**
 * Loose pieces of the composition — the fruit, the seeds, the leaves; everything that is
 * not the bowl. Two passes: a light erosion separates parts touching at a point, then
 * a heavier one on the biggest part peels off fruit leaning against the bowl. The bowl
 * is the largest part plus anything big that sits inside its box.
 */
function findPieces(rgba, w, h, sweep = null) {
  const N = w * h;
  const solid = new Uint8Array(N);
  for (let p = 0; p < N; p++) solid[p] = rgba[p * 4 + 3] > 160 ? 1 : 0;

  // pass 1 — light
  let { label, stats } = split(solid, w, h, Math.max(2, Math.round(w / 400)), 40);
  if (!stats.length) return { label, bowl: { x0: 0, y0: 0, x1: w - 1, y1: h - 1, id: 0 }, pieces: [] };

  // pass 2 — heavy, on the biggest part only: fruit leaning on the bowl comes away.
  // A chunk whose centre still lies well inside the bowl's box (a heap of powder, the
  // far rim) is the bowl itself and goes back; everything else is a piece.
  {
    const big = stats[0];
    const mask = new Uint8Array(N);
    for (let p = 0; p < N; p++) if (label[p] === big.id) mask[p] = 1;
    const k2 = Math.max(10, Math.round(w / 60));
    const sub = split(mask, w, h, k2, N * 0.003);
    if (sub.stats.length >= 2) {
      const main = sub.stats[0];
      // inside the bowl = within an ellipse fitted to the main part's box
      const rx = ((main.x1 - main.x0) / 2) * 0.8;
      const ry = ((main.y1 - main.y0) / 2) * 0.8;
      const inside = (s) =>
        ((s.cx - main.cx) / rx) ** 2 + ((s.cy - main.cy) / ry) ** 2 < 1;
      const base = stats.length; // new ids after the existing ones
      const idMap = new Int32Array(sub.stats.length + 1);
      const extra = [];
      const merged = { ...main, id: base + 1 };
      idMap[main.id] = merged.id;
      sub.stats.slice(1).forEach((s) => {
        if (inside(s)) {
          idMap[s.id] = merged.id;
          merged.area += s.area;
          merged.x0 = Math.min(merged.x0, s.x0);
          merged.y0 = Math.min(merged.y0, s.y0);
          merged.x1 = Math.max(merged.x1, s.x1);
          merged.y1 = Math.max(merged.y1, s.y1);
        } else {
          const id = base + 2 + extra.length;
          idMap[s.id] = id;
          extra.push({ ...s, id });
        }
      });
      for (let p = 0; p < N; p++) {
        if (!mask[p]) continue;
        const l = sub.label[p];
        // eroded-away slivers (the thin rim) stay with the bowl
        label[p] = l ? idMap[l] : merged.id;
      }
      stats = [...stats.filter((s) => s.id !== big.id), merged, ...extra].sort(
        (a, b) => b.area - a.area,
      );
    }
  }

  const bowl = { ...stats[0] };
  const bowlIds = new Set([bowl.id]);

  // pieces: solid enough (no thin arcs of rim), not a pale sliver of sweep, not huge
  const mean = (s) => {
    let r = 0,
      g = 0,
      b = 0,
      n = 0;
    for (let y = s.y0; y <= s.y1; y += 2)
      for (let x = s.x0; x <= s.x1; x += 2) {
        const p = y * w + x;
        if (label[p] !== s.id) continue;
        r += rgba[p * 4];
        g += rgba[p * 4 + 1];
        b += rgba[p * 4 + 2];
        n++;
      }
    return n ? [r / n, g / n, b / n] : [0, 0, 0];
  };
  // safety first: a piece that flies must read as a thing — never a sliver of the
  // sweep, never a chunk of the white bowl, never a huge blob. Coloured sprigs may be
  // thin; grey/white things (onion, garlic, rice) count only when they clearly differ
  // from the sweep (shoot those on the grey sweep).
  const sweepLum = sweep ? lumOf(sweep[0], sweep[1], sweep[2]) : null;
  const pieces = stats
    .filter((s) => !bowlIds.has(s.id))
    .filter((s) => s.area >= N * 0.0005 && s.area <= N * 0.08)
    .filter((s) => s.x1 - s.x0 < w * 0.55 && s.y1 - s.y0 < h * 0.55)
    .filter((s) => {
      const [r, g, b] = mean(s);
      const chroma = Math.max(r, g, b) - Math.min(r, g, b);
      const lum = lumOf(r, g, b);
      const fill = s.area / bboxArea(s);
      const pw = s.x1 - s.x0 + 1;
      const ph = s.y1 - s.y0 + 1;
      const aspect = Math.max(pw, ph) / Math.min(pw, ph);
      if (fill < (chroma >= 30 ? 0.2 : 0.35)) return false; // arcs, hairlines
      if (aspect > 5 && s.area < N * 0.004) return false; // a sliver
      if (
        sweep &&
        Math.abs(r - sweep[0]) < 30 &&
        Math.abs(g - sweep[1]) < 30 &&
        Math.abs(b - sweep[2]) < 30
      )
        return false; // a remnant of the sweep
      const lightSweep = sweepLum === null || sweepLum > 200;
      if (chroma < 16) {
        if (lum > 200 && s.area > N * 0.02) return false; // a chunk of the bowl
        // grey/white things count only on the grey sweep, where they stand apart
        return lum < 120 || (!lightSweep && Math.abs(lum - sweepLum) >= 30);
      }
      // pale low-chroma bits on a white sweep are rim or sweep, never a piece
      return !(lightSweep && lum > 190 && chroma < 28);
    })
    .slice(0, MAX_PIECES);
  return { label, bowl, pieces };
}

/** one piece cut from its canvas by label, fitted into an atlas cell */
async function spriteOf(rgba, w, label, s) {
  const pw = s.x1 - s.x0 + 1;
  const ph = s.y1 - s.y0 + 1;
  const buf = Buffer.alloc(pw * ph * 4);
  for (let y = 0; y < ph; y++)
    for (let x = 0; x < pw; x++) {
      const p = (s.y0 + y) * w + (s.x0 + x);
      if (label[p] !== s.id) continue;
      const o = (y * pw + x) * 4;
      const q = p * 4;
      buf[o] = rgba[q];
      buf[o + 1] = rgba[q + 1];
      buf[o + 2] = rgba[q + 2];
      buf[o + 3] = rgba[q + 3];
    }
  const inner = CELL - 8;
  const scale = Math.min(inner / pw, inner / ph, 1);
  const tw = Math.max(1, Math.round(pw * scale));
  const th = Math.max(1, Math.round(ph * scale));
  const png = await sharp(buf, { raw: { width: pw, height: ph, channels: 4 } })
    .resize(tw, th, { fit: "fill" })
    .png()
    .toBuffer();
  return { png, tw, th };
}

/**
 * The sprite atlas. `entries` = [{ sprite, box }] where `box` is the piece's place in
 * the main bowl image (normalised). Sprites from extra sheets (bowl-2.*, …) are mapped
 * into the main image's space by the ratio of the two bowls' widths.
 */
async function packAtlas(entries) {
  const rows = Math.ceil(entries.length / COLS);
  const comps = [];
  const items = [];
  entries.forEach((e, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    comps.push({
      input: e.sprite.png,
      left: col * CELL + Math.floor((CELL - e.sprite.tw) / 2),
      top: row * CELL + Math.floor((CELL - e.sprite.th) / 2),
    });
    items.push({
      x: +e.box.x.toFixed(4),
      y: +e.box.y.toFixed(4),
      w: +e.box.w.toFixed(4),
      h: +e.box.h.toFixed(4),
    });
  });
  const atlas = await sharp({
    create: {
      width: COLS * CELL,
      height: Math.max(1, rows) * CELL,
      channels: 4,
      background: TRANSPARENT,
    },
  })
    .composite(comps)
    .webp({ quality: 86, alphaQuality: 92, effort: 5 })
    .toBuffer();
  return { atlas, items, rows };
}

/** knock-out → trim → fit 1600² → pieces + atlas */
async function processBowl(from, opts) {
  const { data, info } = await sharp(from)
    .rotate()
    .resize({ width: WORK, height: WORK, fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { out: cut, sweep } = knockOut(data, info.width, info.height, opts);
  const fitted = await sharp(cut, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 24, background: TRANSPARENT })
    .resize(BOWL_FIT, BOWL_FIT, { fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();
  const fm = await sharp(fitted).metadata();
  const left = Math.floor((BOWL - fm.width) / 2);
  const top = Math.floor((BOWL - fm.height) / 2);
  const canvasRaw = await sharp({
    create: { width: BOWL, height: BOWL, channels: 4, background: TRANSPARENT },
  })
    .composite([{ input: fitted, left, top }])
    .raw()
    .toBuffer();
  const { label, bowl, pieces } = findPieces(canvasRaw, BOWL, BOWL, sweep);
  const bowlImg = await sharp(canvasRaw, {
    raw: { width: BOWL, height: BOWL, channels: 4 },
  })
    .webp({ quality: 88, alphaQuality: 94, effort: 5 })
    .toBuffer();
  // a PNG copy for the OG image and the PDF spec sheet (neither reads WebP)
  const bowlPng = await sharp(canvasRaw, {
    raw: { width: BOWL, height: BOWL, channels: 4 },
  })
    .resize(720, 720)
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 8 })
    .toBuffer();
  const anchor = {
    x: bowl.x0 / BOWL,
    y: bowl.y0 / BOWL,
    w: (bowl.x1 - bowl.x0 + 1) / BOWL,
    h: (bowl.y1 - bowl.y0 + 1) / BOWL,
  };
  const entries = [];
  for (const s of pieces)
    entries.push({
      sprite: await spriteOf(canvasRaw, BOWL, label, s),
      box: {
        x: s.x0 / BOWL,
        y: s.y0 / BOWL,
        w: (s.x1 - s.x0 + 1) / BOWL,
        h: (s.y1 - s.y0 + 1) / BOWL,
      },
    });
  return { bowlImg, bowlPng, anchor, entries };
}

/**
 * Extra sheets (bowl-2.*, bowl-3.* — the same bowl generated again with other pieces
 * around it) only contribute pieces. Their boxes are mapped into the main image by the
 * ratio of bowl widths and re-centred on the main bowl.
 */
function remapEntries(extra, mainAnchor) {
  const k = mainAnchor.w / Math.max(0.05, extra.anchor.w);
  const mcx = mainAnchor.x + mainAnchor.w / 2;
  const mcy = mainAnchor.y + mainAnchor.h / 2;
  const ecx = extra.anchor.x + extra.anchor.w / 2;
  const ecy = extra.anchor.y + extra.anchor.h / 2;
  return extra.entries.map((e) => {
    const w = e.box.w * k;
    const h = e.box.h * k;
    let cx = mcx + (e.box.x + e.box.w / 2 - ecx) * k;
    let cy = mcy + (e.box.y + e.box.h / 2 - ecy) * k;
    cx = Math.max(w / 2 + 0.02, Math.min(0.98 - w / 2, cx));
    cy = Math.max(h / 2 + 0.02, Math.min(0.98 - h / 2, cy));
    return { sprite: e.sprite, box: { x: cx - w / 2, y: cy - h / 2, w, h } };
  });
}

/* ────────────────────────────── driver ────────────────────────────────── */

async function dims(file) {
  const m = await sharp(file).metadata();
  return { width: m.width, height: m.height };
}

function sidecar(dir, name) {
  const txt = join(dir, `${name}.txt`);
  const jsn = join(dir, `${name}.json`);
  const caption = existsSync(txt) ? readFileSync(txt, "utf8").trim() : "";
  const opts = existsSync(jsn) ? JSON.parse(readFileSync(jsn, "utf8")) : {};
  return { caption, opts };
}

async function processProduct(slug, dir) {
  const files = readdirSync(dir).filter((f) => IMG.test(f));
  const entry = {};
  const outDir = join(OUT, "products", slug);
  // extra sheets contribute more pieces to the same atlas
  const extraSheets = files
    .filter((f) => /^bowl-\d+\./i.test(f))
    .sort()
    .map((f) => join(dir, f));
  for (const role of ["bowl", "macro", "source", "scene"]) {
    const src = files.find(
      (f) => f.slice(0, -extname(f).length).toLowerCase() === role,
    );
    if (!src) continue;
    const from = join(dir, src);
    mkdirSync(outDir, { recursive: true });
    const { caption, opts } = sidecar(dir, role);
    const ext = role === "bowl" ? "webp" : "jpg";
    const target = join(outDir, `${role}.${ext}`);
    const key = `products/${slug}/${role}`;
    const extraHash = extraSheets
      .map((f) => hashOf(f, JSON.stringify(sidecar(dir, basename(f, extname(f))).opts)))
      .join("+");
    const h = hashOf(from, JSON.stringify(opts) + extraHash);
    const metaPath = join(outDir, `${role}.json`);
    if (stamps[key] !== h || !existsSync(target) || (role === "bowl" && !existsSync(metaPath))) {
      if (role === "bowl") {
        const r = await processBowl(from, opts);
        await writeOut(r.bowlImg, target);
        await writeOut(r.bowlPng, join(outDir, "bowl.png"));
        let entries = r.entries;
        for (const f of extraSheets) {
          const x = await processBowl(f, sidecar(dir, basename(f, extname(f))).opts);
          entries = entries.concat(remapEntries(x, r.anchor));
        }
        entries = entries.slice(0, MAX_PIECES);
        const atlasPath = join(outDir, "pieces.webp");
        const packed = entries.length
          ? await packAtlas(entries)
          : { atlas: null, items: [], rows: 0 };
        if (packed.atlas) await writeOut(packed.atlas, atlasPath);
        else if (existsSync(atlasPath)) unlinkSync(atlasPath); // no loose pieces any more
        const anchor = Object.fromEntries(
          Object.entries(r.anchor).map(([k, v]) => [k, +v.toFixed(4)]),
        );
        writeFileSync(
          metaPath,
          JSON.stringify(
            {
              anchor,
              pieces: { cell: CELL, cols: COLS, rows: packed.rows, items: packed.items },
            },
            null,
            2,
          ) + "\n",
        );
      } else if (role === "macro") {
        await writeOut(
          sharp(from)
            .rotate()
            .resize(1200, 1200, { fit: "cover", position: "attention" })
            .jpeg({ quality: 84, mozjpeg: true }),
          target,
        );
      } else {
        await writeOut(
          sharp(from)
            .rotate()
            .resize({ width: role === "scene" ? 2000 : 1600, withoutEnlargement: true })
            .jpeg({ quality: 82, mozjpeg: true }),
          target,
        );
      }
      stamps[key] = h;
      written++;
    } else kept++;
    entry[role] = {
      src: `/photos/products/${slug}/${role}.${ext}`,
      ...(await dims(target)),
      ...(caption ? { caption } : {}),
    };
    if (role === "bowl") {
      const meta = JSON.parse(readFileSync(metaPath, "utf8"));
      entry.anchor = meta.anchor;
      if (meta.pieces.items.length)
        entry.pieces = {
          src: `/photos/products/${slug}/pieces.webp`,
          ...meta.pieces,
        };
    }
  }
  if (Object.keys(entry).length) manifest.products[slug] = entry;
}

async function processSite(dir) {
  const outDir = join(OUT, "site");
  mkdirSync(outDir, { recursive: true });
  for (const f of readdirSync(dir).filter((f) => IMG.test(f))) {
    const id = f.slice(0, -extname(f).length);
    if (!SLUG.test(id)) {
      console.warn(`  ! site/${f}: use kebab-case file names (skipped)`);
      continue;
    }
    const from = join(dir, f);
    const target = join(outDir, `${id}.jpg`);
    const key = `site/${id}`;
    const h = hashOf(from);
    if (stamps[key] !== h || !existsSync(target)) {
      await writeOut(
        sharp(from)
          .rotate()
          .resize({ width: 2400, withoutEnlargement: true })
          .jpeg({ quality: 82, mozjpeg: true }),
        target,
      );
      stamps[key] = h;
      written++;
    } else kept++;
    const { caption } = sidecar(dir, id);
    manifest.site[id] = {
      src: `/photos/site/${id}.jpg`,
      ...(await dims(target)),
      ...(caption ? { caption } : {}),
    };
  }
}

async function main() {
  // No originals on this machine (the VM builds from git): keep the committed
  // public/photos + manifest exactly as they are.
  if (!existsSync(SRC)) {
    console.log(
      "photos:prep — no assets-src/photos here; keeping the committed manifest",
    );
    return;
  }
  const only = process.argv.includes("--only")
    ? process.argv[process.argv.indexOf("--only") + 1]?.split(",")
    : null;
  const prodDir = join(SRC, "products");
  if (existsSync(prodDir))
    for (const slug of readdirSync(prodDir)) {
      const dir = join(prodDir, slug);
      if (!statSync(dir).isDirectory()) continue;
      if (!SLUG.test(slug)) {
        console.warn(
          `  ! products/${slug}: folder must be the product slug (skipped)`,
        );
        continue;
      }
      if (only && !only.includes(slug)) continue;
      const t0 = Date.now();
      await processProduct(slug, dir);
      const e = manifest.products[slug];
      if (e)
        console.log(
          `  ${slug}: ${Object.keys(e).filter((k) => k !== "anchor" && k !== "pieces").join(", ")}${e.pieces ? ` · ${e.pieces.items.length} pieces` : ""} (${Date.now() - t0} ms)`,
        );
    }
  const siteDir = join(SRC, "site");
  if (existsSync(siteDir) && !only) await processSite(siteDir);
  if (only) {
    // partial run: merge into the committed manifest
    const prev = existsSync(MANIFEST)
      ? JSON.parse(readFileSync(MANIFEST, "utf8"))
      : { products: {}, site: {} };
    manifest.products = { ...prev.products, ...manifest.products };
    manifest.site = prev.site;
  }

  mkdirSync(join(ROOT, "content", "generated"), { recursive: true });
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  mkdirSync(OUT, { recursive: true });
  writeFileSync(STAMPS, JSON.stringify(stamps, null, 2) + "\n");
  const all = Object.values(manifest.products);
  console.log(
    `photos:prep — ${written} written, ${kept} unchanged · ${all.length} products with photos (${all.filter((p) => p.bowl).length} bowls, ${all.filter((p) => p.pieces).length} with pieces, ${all.filter((p) => p.scene).length} scenes, ${all.filter((p) => p.macro).length} macros) · ${Object.keys(manifest.site).length} site photos`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
