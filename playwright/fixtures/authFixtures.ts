import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import loginScenarios from './loginScenarios.json';

import * as dotenv from 'dotenv';
dotenv.config(); //Load dotenv file so that tests can use environment variables defined there

// Helper to get user from JSON
function getUser(username: string) {
  const user = loginScenarios.find(u => u.username === username);
  if (!user) throw new Error(`User ${username} not found in loginScenarios.json`);
  return user;
}

// Generic fixture factory
function makeAuthenticatedFixture(username: string) {
  return async ({ page }: { page: Page }, use: (inv: InventoryPage) => Promise<void>) => {
    const user = getUser(username);
    const loginPage = await LoginPage.build(page);
    const inventoryPage = await loginPage.loginSuccess(user.username, process.env[user.password]!);
    await use(inventoryPage);
  };
}

// Extend Playwright test with multiple authenticated pages
export const test = base.extend<{
  standardUserPage: InventoryPage,
  problemUserPage: InventoryPage,
  performanceGlitchUserPage: InventoryPage
}>({
  standardUserPage: makeAuthenticatedFixture('standard_user'),
  problemUserPage: makeAuthenticatedFixture('problem_user'),
  performanceGlitchUserPage: makeAuthenticatedFixture('performance_glitch_user'),
});

export const expect = test.expect;
