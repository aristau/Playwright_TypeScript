import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { SortOption } from '../../pages/enums/SortOption';

Then('each product has a title, price, and image', async function (this: CustomWorld) {
    await this.inventoryPage!.verifyProductsHaveTitlePriceAndImage();
});

Given('user has added {int} product\\(s) to the cart', async function (this: CustomWorld, numProducts) {
    await this.inventoryPage!.addItemsToCart(numProducts);
    await this.inventoryPage!.expectCartCount(numProducts);
});

When('user adds {int} product\\(s) to the cart', async function (this: CustomWorld, numProducts) {
    await this.inventoryPage!.addItemsToCart(numProducts);
});

When('user removes {int} product\\(s) from the cart', async function (this: CustomWorld, numProducts) {
    await this.inventoryPage!.removeItemsFromCart(numProducts);
});

Then('the cart should contain {int} product\\(s)', async function (this: CustomWorld, numProducts) {
    await this.inventoryPage!.expectCartCount(numProducts);
});

Then('the cart should be empty', async function (this: CustomWorld) {
    await this.inventoryPage?.expectCartCount(0);
});

When('user sorts products by {string}', async function (this: CustomWorld, sortString: string) {
    const option = SortOption[sortString as keyof typeof SortOption];
    if (!option) throw new Error(`Sort option "${sortString}" is not defined`);
    await this.inventoryPage!.sortBy(option.value);
    this.selectedSortOption = option;
})

Then('products should be sorted correctly', async function (this: CustomWorld) {
    await this.inventoryPage!.validateSorting(this.selectedSortOption!);
});






