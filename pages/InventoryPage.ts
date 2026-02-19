import { Page, Locator, expect } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import { ProductDetailPage } from './ProductDetailPage';
import { SortOptionDefinition } from './enums/SortOption';



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

  async sortBy(optionValue: string) {
    await this.sortDropdown.selectOption(optionValue);
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

  //Selects a sort option in the UI and confirms products are sorted accordingly.
  async sortAndValidate<T>(option: SortOptionDefinition<T>): Promise<void> {

    await this.sortBy(option.value);

    const values: T[] =
      option.type === 'price'
        ? await this.getAllPrices() as T[]
        : await this.getAllTitles() as T[];

    await this.expectSorted(values, option.comparator);
  }


 
    /*Sorts a copy of an array using a specified rule. 
    Compares the original array to the sorted copy to 
    verify the original is already sorted.*/
    private async expectSorted<T>(
    values: T[],
    comparator: (a: T, b: T) => number
  ): Promise<void> {

      const sorted = [...values].sort(comparator);

      expect(values).toEqual(sorted);

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
