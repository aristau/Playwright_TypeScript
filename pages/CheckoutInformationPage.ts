import { Page, Locator, expect } from '@playwright/test';
import { CartPage } from './CartPage';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';

export class CheckoutInformationPage {

  constructor(private page: Page) {}

  // --------------------------------
  // Static build method
  // --------------------------------

  static async build(page: Page): Promise<CheckoutInformationPage> {

    const checkoutInfoPage = new CheckoutInformationPage(page);

    await checkoutInfoPage.checkoutForm.waitFor({
      state: 'visible'
    });

    return checkoutInfoPage;
  }

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
    return this.page.locator('[data-test="cancel"]');
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

  async expectCheckoutFormFieldsVisible(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    await expect(this.continueButton).toBeVisible();
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

  async fillCheckoutForm(data: {
    firstName?: string
    lastName?: string
    postalCode?: string
  }): Promise<void> {
    if (data.firstName !== undefined) {
      await this.firstNameInput.fill(data.firstName)
    }
    if (data.lastName !== undefined) {
      await this.lastNameInput.fill(data.lastName)
    }
    if (data.postalCode !== undefined) {
      await this.postalCodeInput.fill(data.postalCode)
    }
  }

  async continueToOverview(): Promise<CheckoutOverviewPage> {

    await this.continueButton.click();

    return new CheckoutOverviewPage(this.page);

  }

  async clickCancel(): Promise<CartPage> {

    await this.cancelButton.click();

    return new CartPage(this.page);

  }
}