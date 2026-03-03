import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import * as dotenv from 'dotenv';

dotenv.config(); //Load dotenv file so that tests can use environment variables defined there

export class CustomWorld extends CucumberWorld {
  browser!: Browser;
  page!: Page;

  async openBrowser() {
    this.browser = await chromium.launch({ headless: false, slowMo: 900 });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);