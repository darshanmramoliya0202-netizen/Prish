/**
 * Burst frames — hover a bowl, click it, and grab a series of frames of the burst in
 * flight, tiled into one image. Forces the WebGL tier unless --2d is given.
 *   node scripts/qa/burst-frames.mjs <url> <selector> <out.jpg> [--2d] [--frames 6] [--every 90] [--width 1280] [--height 800] [--clip x,y,w,h]
 */
import { chromium } from "@playwright/test";
import sharp from "sharp";

const args = process.argv.slice(2);
const [url, selector, out] = args;
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : args[i + 1];
};
if (!url || !selector || !out) {
  console.error("usage: burst-frames.mjs <url> <selector> <out.jpg> [--2d] [--frames 6] [--every 90]");
  process.exit(2);
}
const frames = Number(opt("frames", 6));
const every = Number(opt("every", 90));
const width = Number(opt("width", 1280));
const height = Number(opt("height", 800));
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width, height } });
if (!args.includes("--2d")) await page.addInitScript(() => localStorage.setItem("prish.gpu", "3"));
else await page.addInitScript(() => localStorage.setItem("prish.gpu", "1"));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator(selector).first().scrollIntoViewIfNeeded();
await page.hover(selector);
await page.waitForTimeout(2500); // GL chunk + atlas warm-up on intent
const info = await page.evaluate(() => ({
  gl: [...document.querySelectorAll("canvas")].map((c) => c.getAttribute("data-engine") ?? "2d"),
  meta: Object.keys(window.__prishBurstMeta ?? {}).length,
}));
console.log("layers:", JSON.stringify(info));
await page.click(selector, { noWaitAfter: true });
const clipArg = opt("clip", null);
const clip = clipArg ? (([x, y, w, h]) => ({ x, y, width: w, height: h }))(clipArg.split(",").map(Number)) : null;
const shots = [];
for (let i = 0; i < frames; i++) {
  await page.waitForTimeout(every);
  shots.push(await page.screenshot({ type: "png", ...(clip ? { clip } : {}) }));
}
const stats = await page.evaluate(() => ({ ...window.__prishBurst, url: location.pathname }));
console.log("burst:", JSON.stringify(stats));
await browser.close();
const scale = clip ? 1 : 0.5;
const tw = Math.round((clip ? clip.width : width) * scale), th = Math.round((clip ? clip.height : height) * scale);
const cols = 3, rows = Math.ceil(frames / cols), PAD = 6;
const comps = [];
for (let i = 0; i < shots.length; i++) {
  comps.push({ input: await sharp(shots[i]).resize(tw, th).png().toBuffer(), left: PAD + (i % cols) * (tw + PAD), top: PAD + Math.floor(i / cols) * (th + PAD) });
}
await sharp({ create: { width: cols * (tw + PAD) + PAD, height: rows * (th + PAD) + PAD, channels: 3, background: "#888" } }).composite(comps).jpeg({ quality: 84 }).toFile(out);
console.log(`frames → ${out}`);
