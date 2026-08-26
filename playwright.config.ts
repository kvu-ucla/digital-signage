import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.E2E_PORT ?? "5173";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "horizontal",
      testMatch: /horizontal\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "vertical",
      testMatch: /vertical\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1080, height: 1920 },
      },
    },
    {
      name: "entrance",
      testMatch: /entrance\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "autorefresh",
      testMatch: /autorefresh\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1080, height: 1920 },
      },
    },
    {
      name: "upcomingbowls",
      testMatch: /upcomingbowls\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
