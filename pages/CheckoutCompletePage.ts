// CheckoutCompletePage.ts

import { Page, Locator, expect } from '@playwright/test'
import { InventoryPage } from './InventoryPage'

export class CheckoutCompletePage {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // -------------------------
  // Locators
  // -------------------------

  get confirmationHeader(): Locator {
    return this.page.locator('[data-test="complete-header"]')
  }

  get confirmationText(): Locator {
    return this.page.locator('[data-test="complete-text"]')
  }

  get confirmationImage(): Locator {
    return this.page.locator('[data-test="pony-express"]')
  }

  get backHomeButton(): Locator {
    return this.page.locator('[data-test="back-to-products"]')
  }

  // -------------------------
  // Assertions
  // -------------------------

  async expectConfirmationHeader(): Promise<void> {
    await expect(this.confirmationHeader).toHaveText(
      'Thank you for your order!'
    )
  }

  async expectConfirmationText(): Promise<void> {
    await expect(this.confirmationText).toContainText(
      'Your order has been dispatched'
    )
  }

  async expectConfirmationImageVisible(): Promise<void> {
    await expect(this.confirmationImage).toBeVisible()
  }

  async expectBackHomeButtonVisible(): Promise<void> {
    await expect(this.backHomeButton).toBeVisible()
  }

  async expectPageLoaded(): Promise<void> {
    await this.expectConfirmationHeader()
    await this.expectConfirmationImageVisible()
    await this.expectBackHomeButtonVisible()
  }

  // -------------------------
  // Actions
  // -------------------------

  async clickBackHome(): Promise<InventoryPage> {
    await this.backHomeButton.click()
    return new InventoryPage(this.page)
  }
}