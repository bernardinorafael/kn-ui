import { ROUTES } from '@/src/constants/routes'
import { expect, test } from '@playwright/test'

test.describe('new product', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.product.new, { waitUntil: 'networkidle' })
  })

  test('the component title', async ({ page }) => {
    expect(
      page.getByRole('heading', { name: /informações do produto/i }),
    ).toBeDefined()
  })

  test('redirect to products page by clicking `cancelar`', async ({ page }) => {
    await page.getByRole('link', { name: /cancelar/i }).click()
    expect(page).toHaveURL(ROUTES.product.home)
  })
})
