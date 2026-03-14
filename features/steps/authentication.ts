import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('user logs in with valid credentials', async function (this: CustomWorld) {
    await this.loginAsStandardUser();
});

Then('user lands on the products page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/inventory/);
});

Then('user sees the products list', async function (this: CustomWorld) {
   await expect (this.inventoryPage!.inventoryList).toBeVisible();
});

When('a locked out user attempts to login', async function(this: CustomWorld) {
  await this.loginPage.performLogin(process.env.LOCKED_OUT_USERNAME!, process.env.STANDARD_PASSWORD!);
});

Then('an error message appears saying {string}', async function(this: CustomWorld, errorMsg){
  await expect (this.loginPage.errorMessage).toBeVisible();
  await expect (this.loginPage.errorMessage).toHaveText(errorMsg);
});

When('user attempts login with invalid {string} or {string}', async function(this: CustomWorld, username, password) {
  await this.loginPage.performLogin(process.env[username]!, process.env[password]!);
});

Then('login page shows the correct title', async function(this: CustomWorld){
  await expect(this.page).toHaveTitle("Swag Labs");
});

Given('user is logged in with valid credentials', async function(this: CustomWorld){
  await this.loginAsStandardUser();
});

When('user logs out', async function(this: CustomWorld){
 await this.inventoryPage!.header.logout();
});

Then ('user is redirected to the login page', async function(this: CustomWorld){
  await expect (this.loginPage.loginButton).toBeVisible();
});