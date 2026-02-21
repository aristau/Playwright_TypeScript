import { Page, Locator, expect } from '@playwright/test';
import { InventoryPage } from './InventoryPage';
import { HeaderPage } from './HeaderPage';
import { CheckoutInformationPage } from './CheckoutInformationPage';



export class CartPage {
  constructor(private page: Page) {}

  // --------------------------------
  // Composed page objects
  // --------------------------------

  get header(): HeaderPage {
    return new HeaderPage(this.page);
  }

  // --------------------------------
  // Item accessors
  // --------------------------------
  get cartItems() {
    return this.page.locator('[data-test="inventory-item"]');
  }

  getCartItems() {
    return this.cartItems;
  }

  // --------------------------------
  // Actions
  // --------------------------------
  async expectItemCount(expectedCount: number): Promise<void> {

  await expect(
    this.page.locator('[data-test="inventory-item"]')
  ).toHaveCount(expectedCount)

}

async expectCartBadgeCount(expectedCount: number): Promise<void> {

  if (expectedCount === 0) {
    await expect(this.header.shoppingCartBadge).toHaveCount(0);
  } else {
    await expect(this.header.shoppingCartBadge).toHaveText(expectedCount.toString());
  }

}

  async expectEachItemHasTitlePriceQuantity() {
    const count = await this.cartItems.count();

    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);

      await expect(item.locator('[data-test="inventory-item-name"]')).toBeVisible();
      await expect(item.locator('[data-test="inventory-item-price"]')).toBeVisible();
      await expect(item.locator('[data-test="item-quantity"]')).toBeVisible();
    }
  }

  async removeItem(index: number) {
    await this.cartItems.nth(index)
      .locator('button')
      .click();
  }

  async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
    return new CheckoutInformationPage(this.page);
  }

  async clickContinueShopping() {
    await this.page.locator('[data-test="continue-shopping"]').click();
    return new InventoryPage(this.page);
  }
}