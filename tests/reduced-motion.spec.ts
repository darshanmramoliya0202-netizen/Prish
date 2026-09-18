import { test, expect } from "@playwright/test";

test("reduced motion: no burst canvas, storyboard journey, hero visible", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  expect(await page.locator("canvas").count()).toBe(0);
  // storyboard rows render instead of the pinned scrub
  expect(await page.locator("[data-scene]").count()).toBe(6);
  await expect(page.locator("[data-namaste]")).toBeVisible();
});
