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
  ],
});
