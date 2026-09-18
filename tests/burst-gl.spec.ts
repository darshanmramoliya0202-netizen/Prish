import { test, expect } from "@playwright/test";

/**
 * The WebGL burst layer must never sit between the pointer and the page. Headless
 * Chromium reports a software renderer (tier 0), so the GL layer would not load; the
 * `prish.gpu` localStorage override forces tier 3 so BurstGL mounts (on SwiftShader).
 */
test("full-viewport burst canvas does not intercept clicks", async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "GL layer is Chromium-only in CI");
  await page.addInitScript(() => localStorage.setItem("prish.gpu", "3"));
  await page.goto("/products");
  // load the GL layer on intent, then verify hit-testing at the bowl's centre resolves to the page
  await page.hover("a[data-burst='cumin-seeds'] img");
  await page.waitForTimeout(2500);
  const hit = await page.evaluate(() => {
    const img = document.querySelector("a[data-burst='cumin-seeds'] img")!;
    const r = img.getBoundingClientRect();
    const el = document.elementFromPoint(
      r.left + r.width / 2,
      r.top + r.height / 2,
    );
    const layers = [...document.querySelectorAll("canvas")].map((c) => ({
      tag: c.tagName,
      engine: c.getAttribute("data-engine"),
      pe: getComputedStyle(c).pointerEvents,
      parentPe: c.parentElement
        ? getComputedStyle(c.parentElement).pointerEvents
        : null,
    }));
    return { hitTag: el?.tagName, isCanvas: el?.tagName === "CANVAS", layers };
  });
  // the GL layer really mounted (otherwise this test proves nothing)
  expect(
    hit.layers.some((l) => l.engine?.startsWith("three.js")),
    JSON.stringify(hit),
  ).toBe(true);
  expect(hit.isCanvas, JSON.stringify(hit)).toBe(false);
  for (const l of hit.layers) expect(l.pe, JSON.stringify(hit)).toBe("none");
  // a real (hit-tested) click must reach the link and navigate
  await page.click("a[data-burst='cumin-seeds'] img", { timeout: 5000 });
  await expect(page).toHaveURL(/cumin-seeds$/, { timeout: 8000 });
  await page.click("a[data-burst='coriander-seeds'] img", { timeout: 5000 });
  await expect(page).toHaveURL(/coriander-seeds$/, { timeout: 8000 });
});
