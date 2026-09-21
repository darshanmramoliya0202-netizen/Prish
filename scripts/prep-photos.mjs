/**
 * Photo pipeline — turns whatever the owner drops into assets-src/photos/ into the
 * web-ready files under public/photos/ and writes content/generated/photos.json.
 *
 *   assets-src/photos/products/<slug>/bowl.(png|jpg|webp)  → public/photos/products/<slug>/bowl.png   (1600², alpha)
 *   assets-src/photos/products/<slug>/macro.*              → public/photos/products/<slug>/macro.jpg  (1200², square crop)
 *   assets-src/photos/products/<slug>/source.*             → public/photos/products/<slug>/source.jpg (max 1600 wide)
 *   assets-src/photos/site/<id>.*                          → public/photos/site/<id>.jpg              (max 2400 wide)
 *   a sibling <name>.txt                                   → caption for <name>
 *
 * `bowl` images may arrive with a flat studio background instead of transparency: the
 * background is removed by flood-filling from the border (only pixels *connected to the
 * edge* and close to the corner colour go), so a white heap of onion powder inside a dark
 * bowl is never eaten. A soft grey cast shadow on the ground (low chroma, lower half of
 * the frame) is kept as a real semi-transparent shadow so it sits on any page colour.
 * Edges get a 1 px feather. Outputs whose source is unchanged are skipped.
 */
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { extname, join } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "assets-src", "photos");
const OUT = join(ROOT, "public", "photos");
const MANIFEST = join(ROOT, "content", "generated", "photos.json");
const STAMPS = join(SRC, ".stamps.json");
const IMG = /\.(png|jpe?g|webp|avif|tiff?)$/i;
const SLUG = /^[a-z0-9-]+$/;
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

const manifest = { products: {}, site: {} };
const stamps = existsSync(STAMPS)
  ? JSON.parse(readFileSync(STAMPS, "utf8"))
  : {};
let written = 0;
let kept = 0;

const hashOf = (file) =>
  createHash("sha1").update(readFileSync(file)).digest("hex").slice(0, 12);

/** buffer then write, with retry — Windows can EPERM while a watcher touches the file */
async function writeOut(pipeline, target) {
  const buf = await pipeline.toBuffer();
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

/**
 * border-connected flood fill against the corner colour → alpha channel.
 * Returns a PNG buffer (sharp orders channel ops after resize, so the alpha is baked
 * into the pixels here and the geometry pipeline starts fresh on the result).
 */
async function knockOutBackground(input) {
  const { data, info } = await sharp(input)
    .rotate()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  // a source that already carries real transparency is trusted as-is
  let transparent = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 8) transparent++;
  if (transparent > (w * h) / 50)
    return sharp(input).rotate().ensureAlpha().png().toBuffer();

  const px = (x, y) => (y * w + x) * 4;
  const corners = [px(0, 0), px(w - 1, 0), px(0, h - 1), px(w - 1, h - 1)];
  const bg = [0, 1, 2].map(
    (c) => corners.reduce((s, i) => s + data[i + c], 0) / 4,
  );
  const TOL = 26 * 26 * 3;
  const near = (i) =>
    (data[i] - bg[0]) ** 2 +
      (data[i + 1] - bg[1]) ** 2 +
      (data[i + 2] - bg[2]) ** 2 <=
    TOL;
  const lum = (i) =>
    0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  const chroma = (i) =>
    Math.max(data[i], data[i + 1], data[i + 2]) -
    Math.min(data[i], data[i + 1], data[i + 2]);
  // a soft cast shadow on a light sweep: greyish, still fairly light, on the "ground"
  const shadowish = (i, y) =>
    y > h * 0.55 &&
    chroma(i) < 34 &&
    lum(i) > 100 &&
    bg[0] + bg[1] + bg[2] > 600;
  const bgLum = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2];
  const mask = new Uint8Array(w * h); // 1 = background, 2 = shadow
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (mask[p]) continue;
    const i = p * 4;
    const x = p % w;
    const y = (p - x) / w;
    if (near(i)) mask[p] = 1;
    else if (shadowish(i, y)) mask[p] = 2;
    else continue;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }
  for (let p = 0; p < w * h; p++) {
    const i = p * 4;
    if (!mask[p]) {
      data[i + 3] = 255;
      continue;
    }
    if (mask[p] === 2) {
      // shadow: warm-dark pixel whose opacity is how much darker than the sweep it was
      const a = Math.max(0, Math.min(255, Math.round((bgLum - lum(i)) * 1.5)));
      data[i] = 24;
      data[i + 1] = 16;
      data[i + 2] = 10;
      data[i + 3] = a;
      continue;
    }
    const x = p % w;
    const y = (p - x) / w;
    const edge =
      (x > 0 && !mask[p - 1]) ||
      (x < w - 1 && !mask[p + 1]) ||
      (y > 0 && !mask[p - w]) ||
      (y < h - 1 && !mask[p + w]);
    data[i + 3] = edge ? 110 : 0;
  }
  return sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toBuffer();
}

async function dims(file) {
  const m = await sharp(file).metadata();
  return { width: m.width, height: m.height };
}

function captionFor(dir, name) {
  const txt = join(dir, `${name}.txt`);
  if (!existsSync(txt)) return {};
  const caption = readFileSync(txt, "utf8").trim();
  return caption ? { caption } : {};
}

async function processProduct(slug, dir) {
  const files = readdirSync(dir).filter((f) => IMG.test(f));
  const entry = {};
  for (const role of ["bowl", "macro", "source"]) {
    const src = files.find(
      (f) => f.slice(0, -extname(f).length).toLowerCase() === role,
    );
    if (!src) continue;
    const from = join(dir, src);
    const outDir = join(OUT, "products", slug);
    mkdirSync(outDir, { recursive: true });
    const ext = role === "bowl" ? "png" : "jpg";
    const target = join(outDir, `${role}.${ext}`);
    const key = `products/${slug}/${role}`;
    const h = hashOf(from);
    if (stamps[key] !== h || !existsSync(target)) {
      let pipe;
      if (role === "bowl") {
        pipe = sharp(await knockOutBackground(from))
          .trim({ threshold: 4 })
          .resize(1500, 1500, { fit: "contain", background: TRANSPARENT })
          .extend({
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
            background: TRANSPARENT,
          })
          .png({ compressionLevel: 9 });
      } else if (role === "macro") {
        pipe = sharp(from)
          .rotate()
          .resize(1200, 1200, { fit: "cover", position: "attention" })
          .jpeg({ quality: 84, mozjpeg: true });
      } else {
        pipe = sharp(from)
          .rotate()
          .resize({ width: 1600, withoutEnlargement: true })
          .jpeg({ quality: 84, mozjpeg: true });
      }
      await writeOut(pipe, target);
      stamps[key] = h;
      written++;
    } else kept++;
    entry[role] = {
      src: `/photos/products/${slug}/${role}.${ext}`,
      ...(await dims(target)),
      ...captionFor(dir, role),
    };
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
    manifest.site[id] = {
      src: `/photos/site/${id}.jpg`,
      ...(await dims(target)),
      ...captionFor(dir, id),
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
      await processProduct(slug, dir);
    }
  const siteDir = join(SRC, "site");
  if (existsSync(siteDir)) await processSite(siteDir);

  mkdirSync(join(ROOT, "content", "generated"), { recursive: true });
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  mkdirSync(OUT, { recursive: true });
  writeFileSync(STAMPS, JSON.stringify(stamps, null, 2) + "\n");
  const all = Object.values(manifest.products);
  console.log(
    `photos:prep — ${written} written, ${kept} unchanged · ${all.length} products with photos (${all.filter((p) => p.bowl).length} bowls, ${all.filter((p) => p.macro).length} macros) · ${Object.keys(manifest.site).length} site photos`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
