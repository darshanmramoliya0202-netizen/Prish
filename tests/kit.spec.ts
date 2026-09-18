import { test, expect } from "@playwright/test";

test("add to kit from a product page, count shows in header, builder pre-fills", async ({
  page,
}) => {
  await page.goto("/products/raw-whole-spices/cumin-seeds");
  await page.getByRole("button", { name: "Add to kit" }).first().click();
  await expect(
    page.getByRole("button", { name: "In your kit" }).first(),
  ).toBeVisible();
  await page.goto("/inquiry");
  await expect(
    page.getByRole("heading", { name: /Your kit · 1/ }),
  ).toBeVisible();
  await expect(
    page
      .locator("section[aria-labelledby='kit-details']")
      .getByText("Cumin Seeds"),
  ).toBeVisible();
});

test("search palette finds by trade name (jeera → cumin)", async ({ page }) => {
  await page.goto("/products");
  await page.getByRole("button", { name: /Find a product/ }).click();
  await page.getByRole("textbox", { name: "Search products" }).fill("jeera");
  await expect(page.getByRole("dialog").getByText("Cumin Seeds")).toBeVisible();
});
