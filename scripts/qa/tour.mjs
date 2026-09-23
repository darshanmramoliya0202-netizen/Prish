/**
 * Site tour — full-page screenshots of every route at desktop and phone widths, written
 * to <outDir>/<name>-<desktop|mobile>.png, plus a contact sheet of the desktop set.
 *   node scripts/qa/tour.mjs <outDir> [--base http://localhost:3000] [--only home,products]
 * Motion is reduced so reveals render in their final state (this is for layout/copy QA;
 * use shot.mjs for animation frames).
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const outDir = args[0];
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : args[i + 1];
};
if (!outDir) {
  console.error("usage: tour.mjs <outDir> [--base url] [--only a,b]");
  process.exit(2);
}
const base = opt("base", process.env.PW_BASE ?? "http://localhost:3000");
const ROUTES = {
  home: "/",
  products: "/products",
  family: "/products/raw-whole-spices",
  product: "/products/raw-whole-spices/dry-red-chilli",
  "product-powder": "/products/fruit-powders/jamun-powder",
  story: "/story",
  quality: "/quality",
  calendar: "/crop-calendar",
  inquiry: "/inquiry",
  "not-found": "/does-not-exist",
};
const only = opt("only", null)?.split(",");
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const shots = [];
for (const [device, vp] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const ctx = await browser.newContext({
    viewport: vp,
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
    isMobile: device === "mobile",
    hasTouch: device === "mobile",
  });
  const page = await ctx.newPage();
  for (const [name, path] of Object.entries(ROUTES)) {
    if (only && !only.includes(name)) continue;
    const t0 = Date.now();
    const res = await page.goto(base + path, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForTimeout(800);
    // lazy images: scroll through once, then back to top
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += vp.height) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const file = join(outDir, `${name}-${device}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`${device.padEnd(7)} ${name.padEnd(15)} ${res?.status()}  ${H}px  ${Date.now() - t0}ms`);
    if (device === "desktop") shots.push(file);
  }
  await ctx.close();
}
await browser.close();
writeFileSync(join(outDir, "desktop.txt"), shots.join("\n") + "\n");
console.log("done");
