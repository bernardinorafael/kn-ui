/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, test, type Page } from '@playwright/test'

import { authErrors } from '@/src/modules/auth/constants/auth-errors.ts'

const email = 'john_doe@email.com'
const password = 'my_testing_password'

/**
 * yes, any... I swear it's for type safe
 */
async function httpLoginMockFn(page: Page, status: number, response?: any) {
	await page.route('**/login', async (route) => {
		return route.fulfill({
			status: status || 200,
			json: { code: status, ...response },
		})
	})
}

test.describe('login page flow', async () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/login', { waitUntil: 'networkidle' })
	})

	test('if is able to log in successfully', async ({ page }) => {
		await httpLoginMockFn(page, 200)

		await page.getByLabel('E-mail').fill(email)
		await page.getByLabel('Senha').fill(password)
		await page.getByRole('button', { name: /entrar/i }).click()

		expect(page.url()).toContain('/')
	})

	test('attempt to log in with invalid credentials', async ({ page }) => {
		await httpLoginMockFn(page, 401)

		await page.getByLabel('E-mail').fill(email)
		await page.getByLabel('Senha').fill(password)
		await page.getByRole('button', { name: /entrar/i }).click()

		const toast = page.getByRole('status')
		await expect(toast).toContainText(authErrors.unauthorized.title)

		expect(page.url()).toContain('/login')
	})

	test('redirection to register page', async ({ page }) => {
		await page.getByRole('link', { name: /cadastre-se/i }).click()
		expect(page.url()).toContain('/register')
	})
})
