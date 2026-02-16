import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;

  private constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('#inventory_container').first();
  }

  // Static factory method — waits for the page to load
  static async build(page: Page) {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.inventoryContainer.waitFor({ state: 'visible', timeout: 10000 });
    return inventoryPage;
  }

  // Example action: click an item
  async clickItem(itemName: string) {
    const itemButton = this.page.locator(`text=${itemName}`);
    await itemButton.click();
  }

  // Example action: get number of items
  async getItemCount() {
    return await this.page.locator('.inventory_item').count();
  }
}
