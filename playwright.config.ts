import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PW_PORT ?? 3000);
const baseURL = process.env.PW_BASE_URL ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL, trace: "retain-on-failure", viewport: { width: 1280, height: 800 } },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] }, testIgnore: /reduced-motion/ },
    { name: "mobile", use: { ...devices["Pixel 7"] }, testIgnore: /reduced-motion|kit|inquiry-api|burst-gl/ },
    { name: "reduced-motion", use: { ...devices["Desktop Chrome"], reducedMotion: "reduce" }, testMatch: /reduced-motion/ },
  ],
  // locally: reuse the running dev server; in CI: production server after `npm run build`
  webServer: process.env.CI ? { command: "npm run start", url: baseURL, timeout: 120_000, reuseExistingServer: false } : undefined,
});
