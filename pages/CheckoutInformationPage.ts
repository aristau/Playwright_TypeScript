import { Page, Locator, expect } from '@playwright/test';
import { CartPage } from './CartPage';

export class CheckoutInformationPage {

  constructor(private page: Page) {}

  // ============================
  // Locators (getter pattern)
  // ============================

  get firstNameInput(): Locator {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput(): Locator {
    return this.page.locator('[data-test="lastName"]');
  }

  get postalCodeInput(): Locator {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton(): Locator {
    return this.page.locator('[data-test="continue"]');
  }

  get cancelButton(): Locator {
    return this.page.locator('[data-test="cancel"');
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  get checkoutForm(): Locator {
    return this.page.locator('.checkout_info');
  }

  // ============================
  // Assertions
  // ============================

  async expectCheckoutFormVisible(): Promise<void> {
    await expect(this.checkoutForm).toBeVisible();
  }

  async expectErrorVisible(message?: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();

    if (message) {
      await expect(this.errorMessage).toContainText(message);
    }
  }

  // ============================
  // Actions
  // ============================

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);

  }

  // async continueToOverview(): Promise<CheckoutOverviewPage> {

  //   await this.continueButton.click();

  //   return new CheckoutOverviewPage(this.page);

  // }

  async cancel(): Promise<CartPage> {

    await this.cancelButton.click();

    return new CartPage(this.page);

  }

  // ============================
  // High-level workflow method
  // ============================

  // async completeCheckoutInformation(
  //   firstName: string,
  //   lastName: string,
  //   postalCode: string
  // ): Promise<CheckoutOverviewPage> {

  //   await this.fillCheckoutInformation(
  //     firstName,
  //     lastName,
  //     postalCode
  //   );

  //   return await this.continueToOverview();

  // }

}