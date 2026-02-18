import { Page, Locator, expect } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import { InventoryPage } from './InventoryPage';

export class ProductDetailPage {

  constructor(private readonly page: Page) {}

  // --------------------------------
  // Composition
  // --------------------------------

  get header(): HeaderPage {
    return new HeaderPage(this.page);
  }

  // --------------------------------
  // Locators
  // --------------------------------

  get container(): Locator {
    return this.page.locator('#inventory_item_container');
  }

  get title(): Locator {
    return this.page.locator('.inventory_details_name');
  }

  get description(): Locator {
    return this.page.locator('.inventory_details_desc');
  }

  get price(): Locator {
    return this.page.locator('.inventory_details_price');
  }

  get image(): Locator {
    return this.page.locator('.inventory_details_img');
  }

  get addToCartButton(): Locator {
    return this.page.locator('button', {
      hasText: 'Add to cart'
    });
  }

  get removeButton(): Locator {
    return this.page.locator('button', {
      hasText: 'Remove'
    });
  }

  get backButton(): Locator {
    return this.page.locator('#back-to-products');
  }

  // --------------------------------
  // Build method
  // --------------------------------

  static async build(page: Page): Promise<ProductDetailPage> {

    const detailPage = new ProductDetailPage(page);

    await detailPage.container.waitFor({
      state: 'visible'
    });

    return detailPage;
  }

  // --------------------------------
  // Actions
  // --------------------------------

  async addToCart(): Promise<void> {

    await expect(this.addToCartButton).toBeVisible();

    await this.addToCartButton.click();

  }

  async removeFromCart(): Promise<void> {

    await expect(this.removeButton).toBeVisible();

    await this.removeButton.click();

  }

  async goBackToInventory(): Promise<InventoryPage> {

    await this.backButton.click();

    return await InventoryPage.build(this.page);

  }

  // --------------------------------
  // Assertions / Queries
  // --------------------------------

  async expectProductInfoVisible(): Promise<void> {

    await expect(this.title).toBeVisible();

    await expect(this.description).toBeVisible();

    await expect(this.price).toBeVisible();

    await expect(this.image).toBeVisible();

  }

}
