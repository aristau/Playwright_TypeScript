import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('user navigates to the cart', async function (this: CustomWorld) {
    this.cartPage = await this.inventoryPage.goToCart();
});

Then('each product shows a title, price, and quantity', async function (this: CustomWorld) {
    await this.cartPage.expectEachItemHasTitlePriceQuantity();
});

When('user clicks the continue shopping button', async function (this: CustomWorld){
    await this.cartPage.clickContinueShopping();
});

When ('user returns to inventory and then back to cart', async function (this: CustomWorld){
    await this.cartPage.clickContinueShopping();
    await this.cartPage.header.shoppingCartLink.click();
});

When('user clicks the checkout button', async function (this: CustomWorld){
    this.checkoutInformationPage = await this.cartPage.clickCheckout();
});

Then('user is redirected to the checkout information page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
    await this.checkoutInformationPage.expectCheckoutFormVisible();
});


