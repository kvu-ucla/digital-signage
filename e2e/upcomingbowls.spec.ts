import { test, expect, type Page } from "@playwright/test";

const BOARD_URL = "/dining/?location=rendezvous&screen=upcomingbowls";

// One bowl recipe per day, same shape as the live Jamix feed.
const bowlXml = (serveDate: string, bowlName: string): string => `<?xml version="1.0"?>
<forecastedrecipes>
  <recipe>
    <Serve_Date>${serveDate}</Serve_Date>
    <Menu_Type>All Day</Menu_Type>
    <Location_Number>13</Location_Number>
    <Menu_Meal_Option>ASIAN DAILY SPECIAL</Menu_Meal_Option>
    <Recipe_Number>5898</Recipe_Number>
    <Recipe_Print_As>${bowlName}</Recipe_Print_As>
    <Sales_Price />
    <Description>test bowl</Description>
    <Allergen>Soy</Allergen>
  </recipe>
</forecastedrecipes>`;

// offset -> [serveDate, bowlName, expected formatted date]
const DAYS: ReadonlyArray<[string, string, string]> = [
  ["09/15/2025", "Korean Freestyle Bowl", "Monday, September 15, 2025"],
  ["09/16/2025", "Japanese Freestyle Bowl", "Tuesday, September 16, 2025"],
  ["09/17/2025", "Indian Freestyle Bowl", "Wednesday, September 17, 2025"],
  ["09/18/2025", "Chinese Freestyle Bowl", "Thursday, September 18, 2025"],
  ["09/19/2025", "Korean Freestyle Bowl", "Friday, September 19, 2025"],
  ["09/20/2025", "Japanese Freestyle Bowl", "Saturday, September 20, 2025"],
  ["09/21/2025", "Chinese Freestyle Bowl", "Sunday, September 21, 2025"],
];

/** Intercept the Jamix feed; failOffsets are aborted to simulate outages. */
async function routeFeeds(page: Page, failOffsets: ReadonlyArray<number> = []) {
  await page.route("**/BoardInterface/Rendezvous**", (route) => {
    const url = new URL(route.request().url());
    const match = url.pathname.match(/\/Rendezvous(?:\/(\d))?$/);
    const offset = match?.[1] ? Number(match[1]) : 0;
    const day = DAYS[offset];
    if (failOffsets.includes(offset) || !day) {
      if (offset === 0) {
        return route.fulfill({
          contentType: "application/xml",
          body: `<?xml version="1.0"?><forecastedrecipes></forecastedrecipes>`,
        });
      }
      return route.abort();
    }
    return route.fulfill({
      contentType: "application/xml",
      body: bowlXml(day[0], day[1]),
    });
  });
  // Keep external sheet fetches deterministic (timetable + region sheets).
  await page.route("**/docs.google.com/**", (route) =>
    route.fulfill({ contentType: "text/csv", body: "Location\n" }),
  );
}

test.describe("rendezvous — upcoming weekly freestyle bowls", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
  });

  test("renders 7 bowls with formatted dates in a 4/3 column split", async ({
    page,
  }) => {
    await routeFeeds(page);
    await page.goto(BOARD_URL);

    const names = page.locator("[data-testid='bowl-column'] h2");
    await expect(names).toHaveText(DAYS.map(([, name]) => name));

    const dates = page.locator("[data-testid='bowl-column'] p");
    await expect(dates).toHaveText(DAYS.map(([, , formatted]) => formatted));

    const columns = page.locator("[data-testid='bowl-column']");
    await expect(columns).toHaveCount(2);
    await expect(columns.nth(0).locator("h2")).toHaveCount(4);
    await expect(columns.nth(1).locator("h2")).toHaveCount(3);

    // Header + legend from the shared shell; no per-bowl dietary icons.
    await expect(
      page.getByRole("heading", { name: /upcoming weekly freestyle bowls/i }),
    ).toBeVisible();
    await expect(page.locator("[data-testid='bowl-column'] img")).toHaveCount(0);
    await expect(page.getByText("Vegetarian", { exact: false })).toBeVisible();
  });

  test("a failed day is omitted and the rest re-balance", async ({ page }) => {
    await routeFeeds(page, [2]);
    await page.goto(BOARD_URL);

    const names = page.locator("[data-testid='bowl-column'] h2");
    await expect(names).toHaveCount(6);
    await expect(names).not.toContainText(["Indian Freestyle Bowl"]);

    const columns = page.locator("[data-testid='bowl-column']");
    await expect(columns.nth(0).locator("h2")).toHaveCount(3);
    await expect(columns.nth(1).locator("h2")).toHaveCount(3);
  });

  test("all days failing shows the fallback notice with header intact", async ({
    page,
  }) => {
    await routeFeeds(page, [0, 1, 2, 3, 4, 5, 6]);
    await page.goto(BOARD_URL);

    await expect(page.locator("[data-testid='bowls-empty']")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /upcoming weekly freestyle bowls/i }),
    ).toBeVisible();
  });
});
