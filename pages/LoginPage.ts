import { Page, Locator, expect } from '@playwright/test';
import { InventoryPage } from './InventoryPage';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  private constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Static factory method — returns a fully ready LoginPage
  static async build(page: Page) {
    const loginPage = new LoginPage(page);
    await loginPage.page.goto('/'); // baseURL from playwright.config.ts
    await loginPage.usernameInput.waitFor({ state: 'visible', timeout: 10000 }); //wait for username input to be visible
    return loginPage;
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

   // Success login → returns InventoryPage
  async loginSuccess(username: string, password: string) {
    await this.login(username, password);
    return await InventoryPage.build(this.page);
  }

  // Failure login → returns LoginPage itself
  async loginFailure(username: string, password: string) {
    await this.login(username, password);
    await this.errorMessage.waitFor({ state: 'visible', timeout: 3000 });
    return this;
  }

   async getErrorMessageText(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
