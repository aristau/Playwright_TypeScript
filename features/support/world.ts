import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';

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