import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './test',
  testMatch: /.*\.e2e.spec\.ts$/,
  fullyParallel: true,
  timeout: 30 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3333',
    launchOptions: {
      slowMo: 1000,
    },
  },
  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:3333',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
