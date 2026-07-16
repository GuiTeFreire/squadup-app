import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "capture-tcc-screenshots.ts",
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  use: {
    ...devices["Pixel 7"],
    viewport: { width: 393, height: 852 },
  },
});
