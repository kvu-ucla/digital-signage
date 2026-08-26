import { test, expect, type Page } from "@playwright/test";

const BOARD_URL =
  "/dining/?location=covelepicuria&screen=vertical&station=alimenti&menu=dinner&mock=true";

const VERSION_POLL = 3 * 60 * 1000;
const RELOAD_DELAY = 30 * 1000;

/** Advance the fake clock past the version poll, give the (real) fetch a
 *  beat to resolve and schedule the reload timer, then advance past it. */
async function triggerRefreshCycle(page: Page): Promise<void> {
  await page.clock.fastForward(VERSION_POLL + 1000);
  await page.waitForTimeout(1000);
  await page.clock.fastForward(RELOAD_DELAY + 1000);
}

/** After a redirect, the reloaded page re-baselines on the currently served
 *  version via its mount-time check. Wait for that before serving the next
 *  version, or the new page adopts it as the baseline and never reloads. */
async function awaitBaseline(page: Page): Promise<void> {
  await expect(page.locator(".screen-vertical")).toBeVisible();
  await page.waitForTimeout(1000);
}

test.describe("auto refresh — version-stamped reload", () => {
  let servedVersion: string;

  test.beforeEach(async ({ page }) => {
    servedVersion = "aaa1111";
    await page.route("**/dining/version.json*", (route) =>
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({ version: servedVersion, timestamp: "e2e" }),
      }),
    );
    await page.clock.install();
    await page.goto(BOARD_URL);
    await expect(page.locator(".screen-vertical")).toBeVisible();
  });

  test("new version reloads to URL stamped with v=<version>", async ({
    page,
  }) => {
    servedVersion = "bbb2222";
    await triggerRefreshCycle(page);
    await page.waitForURL(/v=bbb2222/);

    const url = new URL(page.url());
    expect(url.searchParams.get("v")).toBe("bbb2222");
    // original screen params survive the redirect
    expect(url.searchParams.get("location")).toBe("covelepicuria");
    expect(url.searchParams.get("screen")).toBe("vertical");
    expect(url.searchParams.get("station")).toBe("alimenti");
    expect(url.searchParams.get("menu")).toBe("dinner");
  });

  test("board still renders with the v param present", async ({ page }) => {
    servedVersion = "bbb2222";
    await triggerRefreshCycle(page);
    await page.waitForURL(/v=bbb2222/);

    await expect(page.locator(".screen-vertical")).toBeVisible();
    await expect(page.locator(".screen-vertical__header-title")).toHaveText(
      "Alimenti",
    );
  });

  test("second deploy replaces v instead of appending another", async ({
    page,
  }) => {
    servedVersion = "bbb2222";
    await triggerRefreshCycle(page);
    await page.waitForURL(/v=bbb2222/);
    await awaitBaseline(page);

    servedVersion = "ccc3333";
    await triggerRefreshCycle(page);
    await page.waitForURL(/v=ccc3333/);

    const url = new URL(page.url());
    expect(url.searchParams.getAll("v")).toEqual(["ccc3333"]);
  });

  test("no reload while the version is unchanged", async ({ page }) => {
    await triggerRefreshCycle(page);
    await triggerRefreshCycle(page);

    const url = new URL(page.url());
    expect(url.searchParams.get("v")).toBeNull();
  });
});