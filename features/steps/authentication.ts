import { Given, When, Then, Before, BeforeAll, After, AfterAll } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CustomWorld } from '../support/world';


let loginPage: LoginPage;
let inventoryPage: InventoryPage; 

BeforeAll(async function () {
  await CustomWorld.launchBrowser(); //open a new browser before running tests
});

Before(async function () {
  await this.createContext(); //open a new browser context before each Cucumber scenario
  await this.openLoginPage(); //start each test on the login page
});

After(async function () {
  await this.closeContext(); //close browser context after each Cucumber scenario
});

AfterAll(async function () {
  await CustomWorld.closeBrowser(); //close browser after running tests
});

// Given('a user lands on the website', async function () {
//     loginPage = await LoginPage.build(this.page);
//  });

When('user logs in with valid credentials', async function () {
    await this.loginAsStandardUser();
});

Then('user lands on the products page', async function () {
    await expect(this.page).toHaveURL(/inventory/);
});

Then('user sees the products list', async function () {
   await expect (this.inventoryPage.inventoryList).toBeVisible();
});

When('a locked out user attempts to login', async function() {
  this.loginPage.performLogin(process.env.LOCKED_OUT_USERNAME!, process.env.STANDARD_PASSWORD!);
});

Then('an error message appears saying {string}', async function(errorMsg){
  await expect (this.loginPage.errorMessage).toBeVisible();
  await expect (this.loginPage.errorMessage).toHaveText(errorMsg);
});

When('user attempts login with invalid {string} or {string}', async function(username, password) {
  await this.loginPage.performLogin(process.env[username]!, process.env[password]!);
});

Then('login page shows the correct title', async function(){
  await expect (await this.loginPage.getPageTitle()).toBe("Swag Labs");
});

Given('user is logged in with valid credentials', async function(){
  await this.loginAsStandardUser();
});

When('user logs out', async function(){
 await this.inventoryPage.header.logout();
});

Then ('user is redirected to the login page', async function(){
  await expect (this.loginPage.loginButton).toBeVisible();
});