import { test, expect } from "@playwright/test";

type LocationFixture = {
  key: string;
  displayName: string;
  station: string;
  stationTitle: string;
};

const LOCATIONS: LocationFixture[] = [
  {
    key: "bruinplate",
    displayName: "Bruin Plate",
    station: "simply grilled",
    stationTitle: "Simply Grilled",
  },
  {
    key: "covelepicuria",
    displayName: "Epicuria at Covel",
    station: "capri",
    stationTitle: "Capri",
  },
];

for (const loc of LOCATIONS) {
  test.describe(`vertical screen — ${loc.displayName}`, () => {
    const BASE_URL = `/?location=${loc.key}&screen=vertical&menu=lunch&station=${encodeURIComponent(loc.station)}&mock=true`;

    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_URL);
    });

    test("renders the station title", async ({ page }) => {
      await expect(
        page.locator(".screen-vertical__header-title"),
      ).toBeVisible();
      await expect(
        page.locator(".screen-vertical__header-title"),
      ).toContainText(loc.stationTitle);
    });

    test("hides the station title in minimal mode", async ({ page }) => {
      await page.goto(`${BASE_URL}&minimal=true`);

      await expect(page.locator(".screen-vertical__main-hero")).toContainText(
        "Mock item 000 short description",
      );

      await expect(page.locator(".screen-vertical__header-title")).toBeHidden();
    });

    test("renders mock items in the main list", async ({ page }) => {
      const visibleList = page.locator(
        ".screen-vertical__main-list:not(.screen-vertical__main-list--measure)",
      );
      const headings = visibleList.locator("h3");

      await expect(headings.first()).toBeVisible();
      await expect(async () => {
        const count = await headings.count();
        expect(count).toBeGreaterThan(0);
        expect(count).toBeLessThanOrEqual(10);
      }).toPass();
    });

    test("renders unique descriptions for each visible item", async ({
      page,
    }) => {
      const visibleList = page.locator(
        ".screen-vertical__main-list:not(.screen-vertical__main-list--measure)",
      );
      await expect(visibleList.locator("h3").first()).toBeVisible();

      const descriptions = await visibleList
        .locator("text=/Mock item \\d{3} short description/")
        .allTextContents();

      expect(descriptions.length).toBeGreaterThan(0);
      expect(new Set(descriptions).size).toBe(descriptions.length);
    });

    test("each visible item renders both a name and a description", async ({
      page,
    }) => {
      const visibleList = page.locator(
        ".screen-vertical__main-list:not(.screen-vertical__main-list--measure)",
      );
      const headings = visibleList.locator("h3");
      await expect(headings.first()).toBeVisible();

      await expect(async () => {
        const nameCount = await headings.count();
        const descCount = await visibleList
          .locator("text=/Mock item \\d{3} short description/")
          .count();
        expect(nameCount).toBeGreaterThan(0);
        expect(nameCount).toBe(descCount);
      }).toPass();
    });

    test("renders the dietary legend in the footer", async ({ page }) => {
      const footer = page.locator(".screen-vertical__footer");
      await expect(footer).toBeVisible();

      const icons = footer.locator("img");
      await expect(icons).toHaveCount(16);
      await expect(footer.locator('img[alt="Vegetarian"]')).toBeVisible();
      await expect(footer.locator('img[alt="Peanut"]')).toBeVisible();
    });

    test("renders dietary icons for each visible item", async ({ page }) => {
      const visibleList = page.locator(
        ".screen-vertical__main-list:not(.screen-vertical__main-list--measure)",
      );
      const headings = visibleList.locator("h3");
      await expect(headings.first()).toBeVisible();

      await expect(async () => {
        const itemCount = await headings.count();
        const iconCount = await visibleList.locator("img").count();
        expect(itemCount).toBeGreaterThan(0);
        expect(iconCount).toBe(itemCount * 11);
      }).toPass();
    });
  });
}
