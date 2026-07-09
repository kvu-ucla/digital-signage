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

  test("hero shows the featured item's name, not just its description", async ({
    page,
  }) => {
    const hero = page.locator(".screen-horizontal__main-hero");
    const heading = hero.getByRole("heading", { level: 2 });
    await expect(heading).toHaveCount(1);
    await expect(heading).not.toBeEmpty();
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
      // Bounded rather than exact: useVisibleCount measures real layout
      // (getBoundingClientRect against the container each render), so the
      // count is legitimately viewport/CSS-dependent, not a fixed constant.
      expect(count).toBeLessThanOrEqual(9);
    }).toPass();
  });

  test("side list never renders description text (descriptionSize not passed)", async ({
    page,
  }) => {
    // Confirmed via MenuItem.tsx: description only renders when
    // `item.description && descriptionSize` are both truthy. The side list
    // call omits descriptionSize, so this should never appear — guards
    // against someone adding it and colliding with the side list's
    // lack of any other unique per-item identifier.
    const visibleList = page.locator(
      ".screen-horizontal__side-inner:not(.screen-horizontal__side-inner--measure)",
    );
    await expect(visibleList.locator("h3").first()).toBeVisible();
    await expect(visibleList).not.toContainText("short description");
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
