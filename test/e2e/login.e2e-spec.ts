import { test } from '@playwright/test'

test.describe('login page flow', async () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/auth/login', { waitUntil: 'networkidle' })
	})

	test('if is able to login successfully', async ({ page }) => {
		await page.route('**/auth/login', async (route) => {
			return route.fulfill({
				status: 200,
			})
		})

		await page.getByLabel('E-mail').fill('john_doe@example.com')
		await page.getByLabel('Senha').fill('123456')
		await page.getByRole('button', { name: /entrar/i }).click()

		expect(page.url()).toContain('/products')
	})
})
