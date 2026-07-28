import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5173",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
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
      name: "cafe1919",
      testMatch: /cafe1919-pages\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "cafe1919-vertical",
      testMatch: /cafe1919-page4\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1080, height: 1920 },
      },
    },
  ],
});
