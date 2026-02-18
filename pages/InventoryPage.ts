import { Page, Locator, expect } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import { ProductDetailPage } from './ProductDetailPage';


export class InventoryPage {

  constructor(private readonly page: Page) {}

  // --------------------------------
  // Composed page objects
  // --------------------------------

  get header(): HeaderPage {
    return new HeaderPage(this.page);
  }

  // --------------------------------
  // Core containers
  // --------------------------------

  get inventoryList(): Locator {
    return this.page.locator('[data-test="inventory-list"]');
  }

  get inventoryItems(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  get sortDropdown(): Locator {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  // --------------------------------
  // Static build method
  // --------------------------------

  static async build(page: Page): Promise<InventoryPage> {

    const inventoryPage = new InventoryPage(page);

    await inventoryPage.inventoryList.waitFor({
      state: 'visible'
    });

    return inventoryPage;
  }

  // ============================================
  // Item accessors
  // ============================================

  getItem(index: number): Locator {
    return this.inventoryItems.nth(index);
  }

  getItemTitle(index: number): Locator {
    return this.getItem(index).locator('[data-test="inventory-item-name"]');
  }

  getItemPrice(index: number): Locator {
    return this.getItem(index).locator('[data-test="inventory-item-price"]');
  }

  getItemImage(index: number): Locator {
    return this.getItem(index).locator('.inventory_item_img img');
  }

  getItemButton(index: number): Locator {
    return this.getItem(index).locator('button');
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  // ============================================
  // Cart actions
  // ============================================

  async addItemToCart(index: number): Promise<void> {

    const button = this.getItemButton(index);

    await expect(button).toHaveText(/Add to cart/i);

    await button.click();
  }

  async removeItemFromCart(index: number): Promise<void> {

    const button = this.getItemButton(index);

    await expect(button).toHaveText(/Remove/i);

    await button.click();
  }

  async addItemsToCart(count: number): Promise<void> {

    for (let i = 0; i < count; i++) {
      await this.addItemToCart(i);
    }

  }

  async removeItemsFromCart(count: number): Promise<void> {

    for (let i = 0; i < count; i++) {
      await this.removeItemFromCart(i);
    }

  }

  async expectCartCount(expected: number): Promise<void> {

    if (expected === 0) {

      await expect(this.header.shoppingCartBadge).toHaveCount(0);

    } else {

      await expect(this.header.shoppingCartBadge)
        .toHaveText(expected.toString());

    }

  }

  // ============================================
  // Sorting
  // ============================================

  async sortBy(option: string): Promise<void> {

    await this.sortDropdown.selectOption({
      label: option
    });

  }

  async getAllPrices(): Promise<number[]> {

    const prices =
      await this.page.locator('[data-test="inventory-item-price"]')
        .allTextContents();

    return prices.map(p =>
      Number(p.replace('$', ''))
    );

  }

   async getAllTitles(): Promise<string[]> {

    return await this.page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();

  }

  async expectPricesAscending(): Promise<void> {

    const prices = await this.getAllPrices();

    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);

  }

   async expectPricesDescending(): Promise<void> {

    const prices = await this.getAllPrices();

    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  }

  async expectTitlesAscending(): Promise<void> {

    const titles = await this.getAllTitles();

    const sorted = [...titles].sort();

    expect(titles).toEqual(sorted);
  }

  async expectTitlesDescending(): Promise<void> {

    const titles = await this.getAllTitles();

    const sorted = [...titles].sort().reverse();

    expect(titles).toEqual(sorted);
  }

  // ============================================
  // PRODUCT NAVIGATION
  // ============================================

  async clickItemTitle(index: number): Promise<ProductDetailPage> {

    await this.getItemTitle(index).click();
    return await ProductDetailPage.build(this.page);
  }

  async clickItemImage(index: number): Promise<ProductDetailPage> {

    await this.getItemImage(index).click();
    return await ProductDetailPage.build(this.page);

  }

  async goBackToInventory(): Promise<InventoryPage> {

    await this.page.locator('#back-to-products').click();

    return await InventoryPage.build(this.page);

  }


}
