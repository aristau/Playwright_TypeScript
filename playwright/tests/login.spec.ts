import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import loginScenarios from '../fixtures/loginScenarios.json';

test.describe('Login tests', () => {
  for (const scenario of loginScenarios) {
    test(scenario.name, async ({ page }) => {
      const loginPage = await LoginPage.build(page);

      if (scenario.shouldSucceed) {
        await loginPage.loginSuccess(scenario.username, scenario.password);
        await expect(page).toHaveURL(/inventory/);
       
      } else {
        const failedLoginPage = await loginPage.loginFailure(scenario.username, scenario.password);
        await expect(failedLoginPage.errorMessage).toBeVisible();
        await expect(failedLoginPage.errorMessage).toHaveText(scenario.expectedError);
      }
    });
  }
});
