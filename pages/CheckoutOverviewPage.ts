import { expect, Page, Locator } from '@playwright/test';
import { CheckoutInformationPage } from './CheckoutInformationPage';


export class CheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  // ---------------------------
  // Locators using getter pattern
  // ---------------------------
  get finishBtn(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  get cancelBtn(): Locator {
    return this.page.locator('[data-test="cancel"]');
  }

  get products(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  productPrice(product: Locator): Locator {
    return product.locator('[data-test="inventory-item-price"]');
  }

  get summaryInfo(): Locator {
    return this.page.locator('.summary_info');
  }

  get itemTotalLabel(): Locator {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  get taxLabel(): Locator {
    return this.page.locator('[data-test="tax-label"]');
  }

  get totalLabel(): Locator {
    return this.page.locator('[data-test="total-label"]');
  }

  // ---------------------------
  // Actions
  // ---------------------------
  async clickFinishBtn() {
    await this.finishBtn.click();
  }

  async clickCancelBtn() {
    await this.cancelBtn.click();
  }

  // ---------------------------
  // Get product prices as numbers
  // ---------------------------
  async getProductPrices(): Promise<number[]> {
    const prices: number[] = [];
    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      const product = this.products.nth(i);
      const priceText = await this.productPrice(product).textContent();
      if (priceText) {
        const price = parseFloat(priceText.replace('$', ''));
        prices.push(price);
      }
    }

    return prices;
  }

  // ---------------------------
  // Get displayed totals
  // ---------------------------
  async getDisplayedItemTotal(): Promise<number> {
    const text = await this.itemTotalLabel.textContent();
    return text ? parseFloat(text.replace('Item total: $', '')) : 0;
  }

  async getDisplayedTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    return text ? parseFloat(text.replace('Tax: $', '')) : 0;
  }

  async getDisplayedTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    return text ? parseFloat(text.replace('Total: $', '')) : 0;
  }

  // ---------------------------
  // Assertions
  // ---------------------------
  async assertCheckoutTotals() {
    const prices = await this.getProductPrices();
    const itemTotal = prices.reduce((sum, price) => sum + price, 0);
    const tax = parseFloat((itemTotal * 0.08).toFixed(2));
    const total = parseFloat((itemTotal + tax).toFixed(2));

    await expect(await this.getDisplayedItemTotal()).toBe(itemTotal);
    await expect(await this.getDisplayedTax()).toBe(tax);
    await expect(await this.getDisplayedTotal()).toBe(total);
  }

  async expectEachProductHasTitlePriceQuantity() {
    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      const item = this.products.nth(i);

      await expect(item.locator('[data-test="inventory-item-name"]')).toBeVisible();
      await expect(item.locator('[data-test="inventory-item-price"]')).toBeVisible();
      await expect(item.locator('[data-test="item-quantity"]')).toBeVisible();
    }
  }

  // ---------------------------
  // Navigations
  // ---------------------------

   async goBackToCheckoutInformation(): Promise<CheckoutInformationPage> {

    await this.page.goBack();

    return await CheckoutInformationPage.build(this.page);

  }


}