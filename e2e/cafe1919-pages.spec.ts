import { test, expect } from "@playwright/test";

type PageFixture = {
  screen: string;
  imageAlt: string;
  label: string;
};

const PAGES: PageFixture[] = [
  {
    screen: "Page1",
    imageAlt: "Lunch/Dinner Menu Info",
    label: "Page1 (regions 1-4)",
  },
  {
    screen: "Page2",
    imageAlt: "Lunch/Dinner Menu Info",
    label: "Page2 (regions 5-8)",
  },
  {
    screen: "Page3",
    imageAlt: "Late Night Menu Info",
    label: "Page3 (regions 9-12)",
  },
];

for (const pageFixture of PAGES) {
  test.describe(`Cafe 1919 — ${pageFixture.label}`, () => {
    const BASE_URL = `/?location=cafe1919&screen=${pageFixture.screen}&mock=true`;

    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_URL);
    });

    test("renders exactly one background image region", async ({ page }) => {
      await expect(async () => {
        const images = page.locator(`img[alt="${pageFixture.imageAlt}"]`);
        await expect(images).toHaveCount(1);
      }).toPass();
    });

    test("renders exactly three menu columns", async ({ page }) => {
      await expect(async () => {
        const columns = page.locator("main > div").filter({
          has: page.locator("h2"),
        });
        await expect(columns).toHaveCount(3);
      }).toPass();
    });

    test("menu columns render real items, not the empty-state message", async ({
      page,
    }) => {
      await expect(async () => {
        const emptyMessages = page.getByText("No items available");
        await expect(emptyMessages).toHaveCount(0);

        const items = page.locator("main h3");
        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);
      }).toPass();
    });

    test("each menu column has a visible title and at least one item", async ({
      page,
    }) => {
      await expect(async () => {
        const columns = page.locator("main > div").filter({
          has: page.locator("h2"),
        });
        const count = await columns.count();
        expect(count).toBe(3);

        for (let i = 0; i < count; i++) {
          const col = columns.nth(i);
          await expect(col.locator("h2")).toBeVisible();
          const itemCount = await col.locator("h3").count();
          expect(itemCount).toBeGreaterThan(0);
        }
      }).toPass();
    });
  });
}
