import { Given, When, Then, Before, After, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
//import loginScenarios from '../../playwright/fixtures/loginScenarios.json';
//import authFixtures from '../../playwright/fixtures/authFixtures.ts';


let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage; 

Before(async () => {
  if(!browser) {
    browser = await chromium.launch({ headless: false, slowMo: 900 }); // UI mode
    page = await browser.newPage();
  }

});

// AfterAll(async () => {
//   await browser.close();
// });

Given('a user lands on the website', async () => {
    loginPage = await LoginPage.build(page);
});

When('user logs in with valid credentials', async () => {
    loginPage.performLogin("standard_user", "secret_sauce");
    //loginPage.performLogin(loginScenarios.find()
    //authFixtures.getUser("test")
});

Then('user lands on the products page', async () => {
    inventoryPage = await InventoryPage.build(page);
    await expect(page).toHaveURL(/inventory/);
});

Then('user sees the products list', async () => {
   await expect (inventoryPage.inventoryList).toBeVisible();

});