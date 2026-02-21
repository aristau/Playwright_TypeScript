import { test, expect } from '../fixtures/authFixtures'
import { CartPage } from '../../pages/CartPage'
import { CheckoutInformationPage } from '../../pages/CheckoutInformationPage'

// Local helpers
async function addItems(page: any, indices: number[]) {
  await test.step(`Add ${indices.length} item(s) to cart`, async () => {
    for (const i of indices) {
      await page.addItemToCart(i)
    }
  })
}

async function openCart(page: any): Promise<CartPage> {
  return await test.step('Navigate to cart page', async () => {
    return await page.goToCart()
  })
}

async function verifyCartCount(cartPage: CartPage, expectedCount: number) {
  await test.step(`Verify cart has ${expectedCount} item(s) and badge`, async () => {
    await cartPage.expectItemCount(expectedCount)
    await cartPage.expectCartBadgeCount(expectedCount)
  })
}

test.describe('Cart', () => {

  test('Cart page displays correct items', async ({ standardUserPage }) => {
    await addItems(standardUserPage, [0, 1])
    const cartPage = await openCart(standardUserPage)
    await verifyCartCount(cartPage, 2)
    await test.step('Verify each item has title, price, quantity', async () => {
      await cartPage.expectEachItemHasTitlePriceQuantity()
    })
  })

  test('User can proceed to checkout', async ({ standardUserPage }) => {
    await addItems(standardUserPage, [0, 1])
    const cartPage = await openCart(standardUserPage)

    const checkoutPage: CheckoutInformationPage = await test.step(
      'Click checkout button',
      async () => {
        return await cartPage.clickCheckout()
      }
    )

    await test.step('Verify checkout form is visible', async () => {
      await checkoutPage.expectCheckoutFormVisible()
    })
  })

  test('User can navigate back to product list', async ({ standardUserPage }) => {
    await addItems(standardUserPage, [0])
    const cartPage = await openCart(standardUserPage)

    const inventoryPage = await test.step('Click continue shopping', async () => {
      return await cartPage.clickContinueShopping()
    })

    await test.step('Verify inventory page is visible', async () => {
      await expect(inventoryPage.inventoryList).toBeVisible()
    })
  })

  test('Empty cart is displayed correctly', async ({ standardUserPage }) => {
    const cartPage = await openCart(standardUserPage)
    await verifyCartCount(cartPage, 0)
  })

  test('User can remove product from cart', async ({ standardUserPage }) => {
    await addItems(standardUserPage, [0, 1])
    const cartPage = await openCart(standardUserPage)

    await test.step('Remove one item from cart', async () => {
      await cartPage.removeItem(0)
    })

    await verifyCartCount(cartPage, 1)
  })

  test('Cart retains items when navigating away', async ({ standardUserPage }) => {
    await addItems(standardUserPage, [0, 1])
    const cartPage = await openCart(standardUserPage)

    const inventoryPage = await test.step('Return to inventory page', async () => {
      return await cartPage.clickContinueShopping()
    })

    const cartPageAgain = await openCart(inventoryPage)
    await verifyCartCount(cartPageAgain, 2)
  })

})