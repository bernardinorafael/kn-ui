import { defineConfig } from '@playwright/test'

export default defineConfig({
	testDir: 'test',
	testMatch: /.*\.e2e-spec\.ts$/,
	fullyParallel: true,
	timeout: 30 * 1000,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['html', { open: 'never' }]],
	use: {
		trace: 'on-first-retry',
		baseURL: 'http://localhost:3333/',
		launchOptions: {
			slowMo: 300,
		},
	},
	webServer: {
		command: 'npm run dev:test',
		url: 'http://localhost:3333/',
		reuseExistingServer: !process.env.CI,
	},
})
