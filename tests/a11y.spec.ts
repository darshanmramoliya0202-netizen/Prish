import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/products",
  "/products/dehydrated-onion-garlic",
  "/products/dehydrated-onion-garlic/fried-onion",
  "/story",
  "/quality",
  "/crop-calendar",
  "/inquiry",
  "/privacy",
];

for (const r of routes) {
  test(`axe: ${r} has no serious/critical violations`, async ({ page }) => {
    await page.goto(r);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const bad = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    const report = JSON.stringify(
      bad.map((v) => ({
        id: v.id,
        help: v.help,
        nodes: v.nodes.slice(0, 3).map((n) => n.target),
      })),
      null,
      2,
    );
    expect(bad, report).toEqual([]);
  });
}

test("desi accents carry a lang attribute", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("[lang='hi']").count()).toBeGreaterThan(0);
});
