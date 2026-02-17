import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class HeaderPage {
  constructor(private readonly page: Page) {}

  // Locators (getter pattern)
  get menuBtn(): Locator {
    return this.page.locator('#react-burger-menu-btn');
  }

  get closeMenuBtn(): Locator {
    return this.page.locator('#react-burger-cross-btn');
  }

  get allItemsLink(): Locator {
    return this.page.locator('[data-test="inventory-sidebar-link"]');
  }

  get logoutLink(): Locator {
    return this.page.locator('[data-test="logout-sidebar-link"]');
  }

  get resetAppLink(): Locator {
    return this.page.locator('[data-test="reset-sidebar-link"]');
  }

  get shoppingCartLink(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get shoppingCartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async logout(): Promise<LoginPage> {
    await this.menuBtn.click();
    await this.logoutLink.click();
    return await LoginPage.build(this.page);
  }

 

  
}
