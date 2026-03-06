import {Before, BeforeAll, After, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

BeforeAll(async function () {
  await CustomWorld.launchBrowser(); //open a new browser before running tests
});

Before(async function () {
  await this.createContext(); //open a new browser context before each Cucumber scenario
  await this.openLoginPage(); //start each scenario on the login page
});

After(async function () {
  await this.closeContext(); //close browser context after each Cucumber scenario
});

AfterAll(async function () {
  await CustomWorld.closeBrowser(); //close browser after running tests
});