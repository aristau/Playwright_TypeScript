import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  // Factory method ensures page is fully loaded
  static async build(page: Page): Promise<InventoryPage> {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.inventoryContainer.waitFor();
    return inventoryPage;
  }

  // Locators (getter pattern)
  get inventoryContainer(): Locator {
    return this.page.locator('#inventory_container').first();
  }

  get inventoryItems(): Locator {
    return this.page.locator('.inventory_item');
  }  

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }
}
