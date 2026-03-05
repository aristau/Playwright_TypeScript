import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage'
import * as dotenv from 'dotenv';

dotenv.config(); //Load dotenv file so that tests can use environment variables defined there

export class CustomWorld extends CucumberWorld {
 static browser: Browser; 

  context!: BrowserContext;
  page!: Page;
  inventoryPage?: InventoryPage;

  static async launchBrowser() {
    if (!CustomWorld.browser) {
      CustomWorld.browser = await chromium.launch({
        headless: false,
        slowMo: 500,
      });
    }
  }

  async createContext() {
    this.context = await CustomWorld.browser.newContext(); 
    this.page = await this.context.newPage();
  }

  async closeContext() {
    await this.context.close();
  }

  static async closeBrowser() {
    await CustomWorld.browser.close();
  }

  
  // -------------------
  // Login helpers
  // -------------------

  private async login(username: string, password: string): Promise<void> {
    const loginPage = await LoginPage.build(this.page);
    this.inventoryPage = await loginPage.loginSuccess(username, password);
  }

  // Multi-user helpers
  async loginAsStandardUser() {
    await this.login(process.env.STANDARD_USERNAME!, process.env.STANDARD_PASSWORD!);
  }

  async loginAsProblemUser() {
    await this.login(process.env.PROBLEM_USERNAME!, process.env.STANDARD_PASSWORD!);
  }

  async loginAsPerformanceUser() {
    await this.login(process.env.PERFORMANCE_GLITCH_USERNAME!, process.env.STANDARD_PASSWORD!);
  }
}


setWorldConstructor(CustomWorld);