import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage'
import { ProductDetailPage } from '../../pages/ProductDetailPage'
import { SortOptionDefinition } from '../../pages/enums/SortOption';

import * as dotenv from 'dotenv';

dotenv.config(); //Load dotenv file so that tests can use environment variables defined there

export class CustomWorld extends CucumberWorld {
 static browser: Browser; 

  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  productDetailPage!: ProductDetailPage;
  selectedSortOption!: SortOptionDefinition<any>;

  static async launchBrowser() {
    if (!CustomWorld.browser) {
      CustomWorld.browser = await chromium.launch({
        headless: false,
        slowMo: 300,
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
  async openLoginPage() {
    this.loginPage = await LoginPage.build(this.page);
  }

  private async login(username: string, password: string): Promise<void> {
    if (!this.loginPage) {
      this.loginPage = await LoginPage.build(this.page);
    }

    this.inventoryPage = await this.loginPage.loginSuccess(username, password);
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