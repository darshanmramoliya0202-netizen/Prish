/**
 * Headless screenshot helper for visual QA (the desktop-app browser pane stalls
 * requestAnimationFrame when hidden, so animation states are checked here).
 *
 *   node scripts/qa/shot.mjs <path> <out.png> [--selector css] [--width 1280] [--height 800]
 *                            [--wait ms] [--full] [--gpu] [--click css] [--after ms]
 *
 * --gpu forces the WebGL tier override (prish.gpu=3) so BurstGL mounts on SwiftShader.
 * --click clicks a selector after --wait, then screenshots --after ms later (burst frames).
 */
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const [path, out] = args;
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? def : args[i + 1];
};
const flag = (name) => args.includes(`--${name}`);
if (!path || !out) {
  console.error("usage: shot.mjs <path> <out.png> [options]");
  process.exit(2);
}
const base = process.env.PW_BASE ?? "http://localhost:3000";
const width = Number(opt("width", 1280));
const height = Number(opt("height", 800));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
if (flag("gpu"))
  await page.addInitScript(() => localStorage.setItem("prish.gpu", "3"));
// accept a full URL or a path (Git Bash on Windows rewrites a leading "/" — pass the URL)
await page.goto(/^https?:/.test(path) ? path : base + path, {
  waitUntil: "networkidle",
});
await page.waitForTimeout(Number(opt("wait", 1500)));
const click = opt("click", null);
if (click) {
  await page.hover(click);
  await page.waitForTimeout(600);
  await page.click(click, { noWaitAfter: true });
  await page.waitForTimeout(Number(opt("after", 350)));
}
const selector = opt("selector", null);
if (selector) await page.locator(selector).first().screenshot({ path: out });
else await page.screenshot({ path: out, fullPage: flag("full") });
await browser.close();
console.log(`shot → ${out}`);
