import { Given, When, Then, Before, After, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CustomWorld } from '../support/world';
//import loginScenarios from '../../playwright/fixtures/loginScenarios.json';
//import authFixtures from '../../playwright/fixtures/authFixtures.ts';

let loginPage: LoginPage;
let inventoryPage: InventoryPage; 

Before(async function () {
  await this.openBrowser();
});

After(async function() {
  await this.closeBrowser();
});

Given('a user lands on the website', async function () {
    loginPage = await LoginPage.build(this.page);
 });

When('user logs in with valid credentials', async function () {
    loginPage.performLogin(process.env.STANDARD_USERNAME!, process.env.STANDARD_PASSWORD!);
    //loginPage.performLogin("standard_user", "secret_sauce");
    //loginPage.performLogin(loginScenarios.find()
    //authFixtures.getUser("test")
});

Then('user lands on the products page', async function () {
    inventoryPage = await InventoryPage.build(this.page);
    await expect(this.page).toHaveURL(/inventory/);
});

Then('user sees the products list', async function () {
   await expect (inventoryPage.inventoryList).toBeVisible();

});