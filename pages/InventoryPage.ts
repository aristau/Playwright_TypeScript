import { Page, Locator, expect } from '@playwright/test';
import { HeaderPage } from './HeaderPage';


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

  get header(): HeaderPage {
    return new HeaderPage(this.page);
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }
}
