import { test, expect } from "@playwright/test";

test.describe("Cafe 1919 — Page4 (vertical, region 13)", () => {
  const BASE_URL = "/?location=cafe1919&screen=Page4&mock=true";

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("renders exactly one menu column for region 13", async ({ page }) => {
    await expect(async () => {
      const titles = page.locator("h2");
      await expect(titles).toHaveCount(1);
    }).toPass();
  });

  test("the column has a visible title and at least one item", async ({
    page,
  }) => {
    await expect(async () => {
      const title = page.locator("h2");
      await expect(title).toHaveCount(1);
      await expect(title).toBeVisible();

      const itemCount = await page.locator("h3").count();
      expect(itemCount).toBeGreaterThan(0);
    }).toPass();
  });
});
