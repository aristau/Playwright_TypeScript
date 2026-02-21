import { test, expect } from '../fixtures/authFixtures'
import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutInformationPage } from '../../pages/CheckoutInformationPage'
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage'
import checkoutData from '../fixtures/checkoutData.json'

// Data for negative checkout scenarios
const invalidKeys: (keyof typeof checkoutData)[] = [
  'missingFirstName',
  'missingLastName',
  'missingPostalCode'
]

test.describe('Checkout', () => {

  test('Checkout information page shows required fields', async ({ standardUserPage }) => {
    const inventoryPage: InventoryPage = standardUserPage

    await test.step('Add 1 product to cart', async () => {
      await inventoryPage.addItemToCart(0)
    })

    const cartPage: CartPage = await test.step('Navigate to cart', async () => {
      return await inventoryPage.goToCart()
    })

    const checkoutInfoPage: CheckoutInformationPage = await test.step('Go to checkout information page', async () => {
      return await cartPage.clickCheckout()
    })

    await test.step('Verify required fields are visible', async () => {
      await checkoutInfoPage.expectCheckoutFormFieldsVisible();
    })
  })

  test('User can continue checkout with valid information', async ({ standardUserPage }) => {
    const inventoryPage: InventoryPage = standardUserPage

    const checkoutInfoPage = await addSingleItemAndGoToCheckout(inventoryPage)

    await test.step('Fill in valid checkout information', async () => {
      await checkoutInfoPage.fillCheckoutForm(checkoutData["validUser"]);
    })

    const overviewPage: CheckoutOverviewPage = await test.step('Continue to checkout overview', async () => {
      return await checkoutInfoPage.continueToOverview();
    })

    await test.step('Verify checkout overview page is displayed', async () => {
      await overviewPage.products.first().waitFor()
    })
  })

  test.describe('Checkout requires all required fields', () => {
    for (const key of invalidKeys) {
    const errorMessageMap: Record<string, string> = {
        missingFirstName: 'Error: First Name is required',
        missingLastName: 'Error: Last Name is required',
        missingPostalCode: 'Error: Postal Code is required'
    }

    test(`Displays error when ${key}`, async ({ standardUserPage }) => {
        const inventoryPage = standardUserPage
        const checkoutInfoPage = await addSingleItemAndGoToCheckout(inventoryPage);

        await test.step('Fill in invalid checkout information', async () => {
            await checkoutInfoPage.fillCheckoutForm(checkoutData[key]);
        })

        await test.step('Attempt to continue checkout', async () => {
        await checkoutInfoPage.continueToOverview();
        })

        await test.step('Verify error message', async () => {
        await checkoutInfoPage.expectErrorVisible(errorMessageMap[key])
        })
    })
    }
  })

  test('User can cancel checkout', async ({ standardUserPage }) => {
    const inventoryPage: InventoryPage = standardUserPage
    const checkoutInfoPage = await addSingleItemAndGoToCheckout(inventoryPage)

    const cartPage: CartPage = await test.step('Cancel checkout', async () => {
      return await checkoutInfoPage.clickCancel()
    })

    await test.step('Verify returned to cart page', async () => {
      await cartPage.expectItemCount(1)
    })
  })

//   test('User can navigate back from checkout overview', async ({ standardUserPage }) => {
//     const overviewPage = await addSingleItemAndGoToOverview(standardUserPage)

//     const checkoutInfoPage: CheckoutInformationPage = await test.step('Navigate back from overview', async () => {
//       return await overviewPage.goBackToCheckoutInformation()
//     })

//     await test.step('Verify on checkout information page', async () => {
//       await checkoutInfoPage.expectCheckoutFormVisible();
//     })
//   })

//   test('Checkout overview displays selected products', async ({ standardUserPage }) => {
//     const overviewPage = await addMultipleItemsAndGoToOverview(standardUserPage, [0,1])

//     await test.step('Verify product count', async () => {
//       expect(await overviewPage.products.count()).toBe(2)
//     })

//     await test.step('Verify each product shows title, price, quantity', async () => {
//       await overviewPage.expectEachProductHasTitlePriceQuantity()
//     })
//   })

  test('Checkout overview shows correct totals', async ({ standardUserPage }) => {
    const overviewPage = await addMultipleItemsAndGoToOverview(standardUserPage, [0,1])

    await test.step('Verify checkout totals', async () => {
      await overviewPage.assertCheckoutTotals()
    })
  })

  test('User can complete checkout', async ({ standardUserPage }) => {
    const overviewPage = await addSingleItemAndGoToOverview(standardUserPage)

    await test.step('Finish checkout', async () => {
      await overviewPage.clickFinishBtn()
    })

    await test.step('Verify success confirmation', async () => {
      await expect(overviewPage.page.locator('.complete-header')).toHaveText('Thank you for your order!')
    })
  })

  test('User can return to inventory after checkout', async ({ standardUserPage }) => {
    const overviewPage = await addSingleItemAndGoToOverview(standardUserPage)

    await test.step('Finish checkout', async () => {
      await overviewPage.clickFinishBtn()
    })

    const inventoryPage: InventoryPage = await test.step('Navigate back to inventory', async () => {
      await overviewPage.page.locator('[data-test="back-to-products"]').click()
      return new InventoryPage(overviewPage.page)
    })

    await test.step('Verify inventory page is visible and cart empty', async () => {
      await expect(inventoryPage.inventoryList).toBeVisible()
      const cartPage = await inventoryPage.goToCart()
      await cartPage.expectItemCount(0)
    })
  })

})

// ---------------------------
// Helper functions
// ---------------------------
async function addSingleItemAndGoToCheckout(inventoryPage: InventoryPage): Promise<CheckoutInformationPage> {
  await inventoryPage.addItemToCart(0)
  const cartPage = await inventoryPage.goToCart()
  return await cartPage.clickCheckout()
}

async function addSingleItemAndGoToOverview(inventoryPage: InventoryPage): Promise<CheckoutOverviewPage> {
  const checkoutInfoPage = await addSingleItemAndGoToCheckout(inventoryPage)
  await checkoutInfoPage.fillCheckoutForm(checkoutData["validUser"])
  return await checkoutInfoPage.continueToOverview();
}

async function addMultipleItemsAndGoToOverview(inventoryPage: InventoryPage, indices: number[]): Promise<CheckoutOverviewPage> {
  for (const i of indices) await inventoryPage.addItemToCart(i)
  const cartPage = await inventoryPage.goToCart()
  const checkoutInfoPage = await cartPage.clickCheckout()
  await checkoutInfoPage.fillCheckoutForm(checkoutData["validUser"])
  return await checkoutInfoPage.continueToOverview();
}