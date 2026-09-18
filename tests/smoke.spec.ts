import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/products",
  "/products/raw-whole-spices",
  "/products/raw-whole-spices/cumin-seeds",
  "/story",
  "/quality",
  "/crop-calendar",
  "/inquiry",
  "/privacy",
];

for (const r of routes) {
  test(`renders ${r}`, async ({ page }) => {
    const res = await page.goto(r);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).toHaveTitle(/Prish Overseas/);
  });
}

test("sitemap lists 27 product pages and 6 families", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = xml.match(/<loc>[^<]+<\/loc>/g) ?? [];
  const productLocs = locs.filter((l) =>
    /\/products\/[a-z0-9-]+\/[a-z0-9-]+<\/loc>/.test(l),
  );
  const familyLocs = locs.filter((l) =>
    /\/products\/[a-z0-9-]+<\/loc>/.test(l),
  );
  expect(productLocs.length).toBe(27);
  expect(familyLocs.length).toBe(6);
});

test("product page carries Product + BreadcrumbList JSON-LD and no offers", async ({
  page,
}) => {
  await page.goto("/products/fruit-powders/jamun-powder");
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const joined = blocks.join("\n");
  expect(joined).toContain('"@type":"Product"');
  expect(joined).toContain('"@type":"BreadcrumbList"');
  expect(joined).not.toContain('"offers"');
});

test("health endpoint reports products and never leaks secrets", async ({
  request,
}) => {
  const body = await (await request.get("/api/health")).json();
  expect(body.ok).toBe(true);
  expect(body.products).toBe(27);
  expect(JSON.stringify(body)).not.toMatch(/pass|secret|token/i);
});

test("old /about redirects to /story", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveURL(/\/story$/);
});

test("404 page uses the cheeky line", async ({ page }) => {
  const res = await page.goto("/this-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("wrong port")).toBeVisible();
});
