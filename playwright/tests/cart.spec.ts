import { test, expect } from '../fixtures/authFixtures'
import { CartPage } from '../../pages/CartPage'
import { CheckoutInformationPage } from '../../pages/CheckoutInformationPage'

test.describe('Cart', () => {

  test('Cart page displays correct items', async ({ standardUserPage }) => {

    await test.step('Add two items to cart', async () => {
      await standardUserPage.addItemToCart(0)
      await standardUserPage.addItemToCart(1)
    })

    const cartPage = await test.step('Navigate to cart page', async () => {
      return await standardUserPage.goToCart()
    })

    await test.step('Verify cart displays correct items and badge count', async () => {
      await cartPage.expectItemCount(2)
      await cartPage.expectCartBadgeCount(2)
      await cartPage.expectEachItemHasTitlePriceQuantity()
    })

  })


  test('User can proceed to checkout', async ({ standardUserPage }) => {

    await test.step('Add items to cart', async () => {
      await standardUserPage.addItemToCart(0)
      await standardUserPage.addItemToCart(1)
    })

    const cartPage = await test.step('Navigate to cart page', async () => {
      return await standardUserPage.goToCart()
    })

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

    await test.step('Add item to cart', async () => {
      await standardUserPage.addItemToCart(0)
    })

    const cartPage = await test.step('Navigate to cart page', async () => {
      return await standardUserPage.goToCart()
    })

    const inventoryPage = await test.step(
      'Click continue shopping',
      async () => {
        return await cartPage.clickContinueShopping()
      }
    )

    await test.step('Verify inventory page is visible', async () => {
      await expect(inventoryPage.inventoryList).toBeVisible()
    })

  })


  test('Empty cart is displayed correctly', async ({ standardUserPage }) => {

    const cartPage = await test.step('Navigate to cart page', async () => {
      return await standardUserPage.goToCart()
    })

    await test.step('Verify cart is empty and badge is not visible', async () => {
      await cartPage.expectItemCount(0)
      await cartPage.expectCartBadgeCount(0)
    })

  })


  test('User can remove product from cart', async ({ standardUserPage }) => {

    await test.step('Add two items to cart', async () => {
      await standardUserPage.addItemToCart(0)
      await standardUserPage.addItemToCart(1)
    })

    const cartPage = await test.step('Navigate to cart page', async () => {
      return await standardUserPage.goToCart()
    })

    await test.step('Remove one item from cart', async () => {
      await cartPage.removeItem(0)
    })

    await test.step('Verify cart updates correctly', async () => {
      await cartPage.expectItemCount(1)
      await cartPage.expectCartBadgeCount(1)
    })

  })


  test('Cart retains items when navigating away', async ({ standardUserPage }) => {

    await test.step('Add two items to cart', async () => {
      await standardUserPage.addItemToCart(0)
      await standardUserPage.addItemToCart(1)
    })

    const cartPage = await test.step('Navigate to cart page', async () => {
      return await standardUserPage.goToCart()
    })

    const inventoryPage = await test.step(
      'Return to inventory page',
      async () => {
        return await cartPage.clickContinueShopping()
      }
    )

    const cartPageAgain = await test.step(
      'Navigate back to cart',
      async () => {
        return await inventoryPage.goToCart()
      }
    )

    await test.step('Verify items are still in cart', async () => {
      await cartPageAgain.expectItemCount(2)
      await cartPageAgain.expectCartBadgeCount(2)
    })

  })

})