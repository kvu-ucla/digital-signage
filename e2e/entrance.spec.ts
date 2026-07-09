import { test, expect } from "@playwright/test";

const BASE_URL = "/?location=bruinplate&screen=entrance&menu=lunch&mock=true";

test.describe("entrance screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator(".screen-entrance")).toBeVisible();
  });

  test("root renders", async ({ page }) => {
    await expect(page.locator(".screen-entrance")).toBeVisible();
  });

  test("footer dietary legend renders all 16 icons", async ({ page }) => {
    const legend = page.locator(".screen-entrance__footer-legend img");
    await expect(legend).toHaveCount(16);
  });

  test("bar cells: dividers on all but the last cell", async ({ page }) => {
    const cells = page.locator(".screen-entrance__bar-cell");
    const count = await cells.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const cell = cells.nth(i);
      const hasDivider = await cell.evaluate((el) =>
        el.classList.contains("screen-entrance__bar-cell--divider"),
      );
      if (i === count - 1) {
        expect(hasDivider).toBe(false);
      } else {
        expect(hasDivider).toBe(true);
      }
    }
  });

  test("bar cell count matches region count", async ({ page }) => {
    const cellCount = await page.locator(".screen-entrance__bar-cell").count();
    const regionCount = await page.locator(".screen-entrance__region").count();
    expect(cellCount).toBeGreaterThan(0);
    expect(cellCount).toBe(regionCount);
  });

  test("minimal mode: bar is visually hidden, not removed from DOM", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}&minimal=true`);
    const bar = page.locator(".screen-entrance__bar");
    await expect(bar).toBeHidden();
    await expect(bar).toHaveClass(/invisible/);
  });

  test("minimal mode: bar cells and titles stay mounted, just hidden", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}&minimal=true`);
    await expect(
      page.locator(".screen-entrance__footer-legend img").first(),
    ).toBeVisible();

    const cellCount = await page.locator(".screen-entrance__bar-cell").count();
    expect(cellCount).toBeGreaterThan(0);
    await expect(
      page.locator(".screen-entrance__bar-title").first(),
    ).toBeAttached();
  });

  test("region items: visible list renders, excluding hidden measure duplicate", async ({
    page,
  }) => {
    const regions = page.locator(".screen-entrance__region");
    const regionCount = await regions.count();
    expect(regionCount).toBeGreaterThan(0);

    for (let i = 0; i < regionCount; i++) {
      const region = regions.nth(i);
      const visibleList = region.locator(
        ".screen-entrance__items > div > div:not([aria-hidden])",
      );
      await expect(async () => {
        const h3Count = await visibleList.locator("h3").count();
        expect(h3Count).toBeGreaterThan(0);
        expect(h3Count).toBeLessThanOrEqual(10);
      }).toPass();
    }
  });

  test("region items: description text never renders (no descriptionSize passed)", async ({
    page,
  }) => {
    const region = page.locator(".screen-entrance__region").first();
    const visibleList = region.locator(
      ".screen-entrance__items > div > div:not([aria-hidden])",
    );
    await expect(visibleList).not.toContainText("short description");
  });

  test("region items: dietary icon count scales with visible item count (mock-specific)", async ({
    page,
  }) => {
    const region = page.locator(".screen-entrance__region").first();
    const visibleList = region.locator(
      ".screen-entrance__items > div > div:not([aria-hidden])",
    );

    await expect(async () => {
      const h3Count = await visibleList.locator("h3").count();
      const iconCount = await visibleList.locator("img").count();
      expect(h3Count).toBeGreaterThan(0);
      expect(iconCount).toBe(h3Count * 11);
    }).toPass();
  });

  test("empty state: invalid menu type renders fallback message, not MenuTypeNotice", async ({
    page,
  }) => {
    await page.goto(
      "/?location=bruinplate&screen=entrance&menu=not-a-real-menu-type&mock=true",
    );

    await expect(
      page.getByText("No station region data available."),
    ).toBeVisible();
    await expect(page.locator(".screen-entrance")).toHaveCount(0);
    await expect(page.locator(".screen-entrance__bar-cell")).toHaveCount(0);
  });
});
