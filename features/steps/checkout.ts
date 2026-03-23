import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import checkoutData from '../../playwright/fixtures/checkoutData.json';

Given('user navigates to the checkout information page', async function (this: CustomWorld) {
    this.cartPage = await this.inventoryPage.goToCart();
    this.checkoutInformationPage = await this.cartPage.clickCheckout();
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
});

Then('user sees first name, last name, and postal code fields', async function (this: CustomWorld) {
    await this.checkoutInformationPage.expectCheckoutFormFieldsVisible();
});

When('user enters valid checkout information', async function (this: CustomWorld) {
    await this.checkoutInformationPage.fillCheckoutForm(checkoutData["validUser"]);
});

When('user continues checkout', async function (this: CustomWorld) {
   this.checkoutOverviewPage = await this.checkoutInformationPage.continueToOverview();
});

Then('user lands on the checkout overview page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect (this.checkoutOverviewPage.finishBtn).toBeVisible();
});

When('user enters checkout information {string}', async function (this: CustomWorld, fixtureKey: string) {
     const data = checkoutData[fixtureKey as keyof typeof checkoutData];

    if (!data) {
      throw new Error(`Checkout fixture "${fixtureKey}" not found`);
    }
    await this.checkoutInformationPage.fillCheckoutForm(data);
});

Then('an error message {string} is displayed', async function (this: CustomWorld, errorMsg: string) {
    await this.checkoutInformationPage.expectErrorVisible(errorMsg);
});

When('user cancels checkout', async function (this: CustomWorld) {
   this.cartPage = await this.checkoutInformationPage.clickCancel();
});

Then('user is returned to the cart page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect (this.cartPage.checkoutBtn).toBeVisible();
});

When('user is on the checkout overview page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect (this.checkoutOverviewPage.summaryInfo).toBeVisible();
});

When('user navigates back', async function (this: CustomWorld) {
    this.checkoutInformationPage = await this.checkoutOverviewPage.goBackToCheckoutInformation();
});

Then("the checkout overview shows {int} product\\(s)", async function(this: CustomWorld, count: number){
    await expect (this.checkoutOverviewPage.products).toHaveCount(count);
});

Then('the checkout totals should be correct', async function (this: CustomWorld) {
    await this.checkoutOverviewPage.assertCheckoutTotals();
});

When('user completes checkout', async function (this: CustomWorld) {
    this.checkoutCompletePage = await this.checkoutOverviewPage.clickFinishBtn();
});

Then("the checkout is successful", async function (this: CustomWorld) {
  await expect (this.page).toHaveURL(/checkout-complete.html/);
});

Then("a confirmation message is displayed", async function (this: CustomWorld) {
  await this.checkoutCompletePage.expectPageLoaded();
});

When('user navigates back to products', async function (this: CustomWorld) {
    await this.checkoutCompletePage.clickBackHome();
});





