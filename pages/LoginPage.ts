import { Page, Locator, expect } from '@playwright/test';
import { InventoryPage } from './InventoryPage';
import { playwrightConfig }  from '../playwright.config'

export class LoginPage {
  constructor(private readonly page: Page) {}

  // Factory method ensures page is loaded before use
  static async build(page: Page): Promise<LoginPage> {
    const loginPage = new LoginPage(page);
    const baseURL = playwrightConfig.use!.baseURL;
    await page.goto(`${baseURL}`);
    await loginPage.usernameInput.waitFor();
    return loginPage;
  }

  // Locators (getter pattern)
  get usernameInput(): Locator {
    return this.page.locator('#user-name');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get loginButton(): Locator {
    return this.page.locator('#login-button');
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  // Shared login action (DRY)
  public async performLogin(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Successful login → returns InventoryPage
  async loginSuccess(username: string, password: string): Promise<InventoryPage> {
    await this.performLogin(username, password);
    return await InventoryPage.build(this.page);
  }

  // Failed login → stays on LoginPage
  async loginFailure(username: string, password: string): Promise<LoginPage> {
    await this.performLogin(username, password);
    await expect(this.errorMessage).toBeVisible();
    return this;
  }
}
