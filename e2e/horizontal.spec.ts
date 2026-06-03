import { test, expect } from '@playwright/test'

test.describe('horizontal screen', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/?location=bruinplate&screen=horizontal&menu=lunch&station=simply+grilled&mock=true')
  })

  test('renders the station title', async ({ page }) => {
    await expect(page.locator('.screen-horizontal__header-title')).toBeVisible()
    await expect(page.locator('.screen-horizontal__header-title')).toContainText('Simply Grilled')
  })

})
