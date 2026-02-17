import { test, expect } from '../fixtures/authFixtures';
import { LoginPage } from '../../pages/LoginPage';
import loginScenarios from '../fixtures/loginScenarios.json';

test.describe('Authentication', () => {

  // ----------------------------
  // Data-driven login tests
  // ----------------------------
  test.describe('Login', () => {

    for (const scenario of loginScenarios) {

      test(scenario.name, async ({ page }) => {

        const loginPage = await test.step('Navigate to login page', async () => {
          return await LoginPage.build(page);
        });

        if (scenario.shouldSucceed) {
          await test.step(`Login with username: ${scenario.username}`, async () => {
            await loginPage.loginSuccess(scenario.username, scenario.password);
          });

          await test.step('Verify redirection to inventory page', async () => {
            await expect(page).toHaveURL(/inventory/);
          });

        } else {

          const failedLoginPage = await test.step(
            `Attempt invalid login with username: ${scenario.username}`,
            async () => {
              return await loginPage.loginFailure(scenario.username, scenario.password);
            }
          );

          await test.step('Verify error message is displayed', async () => {
            await expect(failedLoginPage.errorMessage).toBeVisible();
            await expect(failedLoginPage.errorMessage)
              .toHaveText(scenario.expectedError);
          });

        }

      });

    }

  });

  // ----------------------------
  // Logout tests using fixtures
  // ----------------------------
  test.describe('Logout', () => {

    test('Standard user can log out successfully', async ({ standardUserPage }) => {
      const loginPage = await test.step('Click logout from header', async () => {
        return await standardUserPage.header.logout();
      });

      await test.step('Verify login page is visible', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
      });
    });

    test('Problem user can log out successfully', async ({ problemUserPage }) => {
      const loginPage = await test.step('Click logout from header', async () => {
        return await problemUserPage.header.logout();
      });

      await test.step('Verify login page is visible', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
      });
    });

    test('Performance glitch user can log out successfully', async ({ performanceGlitchUserPage }) => {
      const loginPage = await test.step('Click logout from header', async () => {
        return await performanceGlitchUserPage.header.logout();
      });

      await test.step('Verify login page is visible', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
      });
    });

  });

});
