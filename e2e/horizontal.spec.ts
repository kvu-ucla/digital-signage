import { test, expect } from "@playwright/test";

test.describe("horizontal screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "/?location=bruinplate&screen=horizontal&menu=lunch&station=simply+grilled&mock=true",
    );
  });

  test("renders the station title", async ({ page }) => {
    await expect(
      page.locator(".screen-horizontal__header-title"),
    ).toBeVisible();
    await expect(
      page.locator(".screen-horizontal__header-title"),
    ).toContainText("Simply Grilled");
  });

  test("hides the station title in minimal mode", async ({ page }) => {
    await page.goto(
      "/?location=bruinplate&screen=horizontal&menu=lunch&station=simply+grilled&mock=true&minimal=true",
    );

    await expect(page.locator(".screen-horizontal__main-hero")).toContainText(
      "Mock item 000 short description",
    );

    await expect(page.locator(".screen-horizontal__header-title")).toHaveCount(
      0,
    );
  });

  test("renders the featured item in the hero", async ({ page }) => {
    const hero = page.locator(".screen-horizontal__main-hero");
    await expect(hero).toBeVisible();
    await expect(hero).toContainText("Mock item 000 short description");
  });

  test("renders the remaining items in the side list, excluding the featured one", async ({
    page,
  }) => {
    const visibleList = page.locator(
      ".screen-horizontal__side-inner:not(.screen-horizontal__side-inner--measure)",
    );
    const headings = visibleList.locator("h3");

    await expect(headings.first()).toBeVisible();
    await expect(async () => {
      const count = await headings.count();
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThanOrEqual(9);
    }).toPass();
  });

  test("renders the dietary legend in the footer", async ({ page }) => {
    const footer = page.locator(".screen-horizontal__footer");
    await expect(footer).toBeVisible();

    const icons = footer.locator("img");
    await expect(icons).toHaveCount(16);
    await expect(footer.locator('img[alt="Vegetarian"]')).toBeVisible();
    await expect(footer.locator('img[alt="Peanut"]')).toBeVisible();
  });

  test("renders dietary icons for the featured item", async ({ page }) => {
    const hero = page.locator(".screen-horizontal__main-hero");
    const icons = hero.locator("img");
    await expect(icons).toHaveCount(11);
  });
});
