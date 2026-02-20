import { test, expect } from '../fixtures/authFixtures';
import { InventoryPage } from '../../pages/InventoryPage';
import { SortOption } from '../../pages/enums/SortOption';


test.describe('Inventory', () => {

  // ============================================
  // Products list is visible
  // ============================================

  test('Products list is visible', async ({ standardUserPage }) => {

    await test.step('Verify inventory container is visible', async () => {
      await expect(standardUserPage.inventoryList).toBeVisible();
    });

    await test.step('Verify each product has title, price, and image', async () => {

      const count = await standardUserPage.getItemCount();

      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {

        await expect(
          standardUserPage.getItemTitle(i)
        ).toBeVisible();

        await expect(
          standardUserPage.getItemPrice(i)
        ).toBeVisible();

        await expect(
          standardUserPage.getItemImage(i)
        ).toBeVisible();

      }

    });

  });

  // ============================================
  // Add single product
  // ============================================

  test('User can add a product to the cart', async ({ standardUserPage }) => {

    await test.step('Add 1 product to cart', async () => {
      await standardUserPage.addItemToCart(0);
    });

    await test.step('Verify cart contains 1 product', async () => {
      await standardUserPage.expectCartCount(1);
    });

  });

  // ============================================
  // Remove single product
  // ============================================

  test('User can remove a product from the cart', async ({ standardUserPage }) => {

    await test.step('Add product to cart', async () => {
      await standardUserPage.addItemToCart(0);
    });

    await test.step('Remove product from cart', async () => {
      await standardUserPage.removeItemFromCart(0);
    });

    await test.step('Verify cart is empty', async () => {
      await standardUserPage.expectCartCount(0);
    });

  });

  // ============================================
  // Add multiple products
  // ============================================

  test('User can add multiple products', async ({ standardUserPage }) => {

    await test.step('Add 3 products', async () => {
      await standardUserPage.addItemsToCart(3);
    });

    await test.step('Verify cart contains 3 products', async () => {
      await standardUserPage.expectCartCount(3);
    });

  });

  // ============================================
  // Remove multiple products
  // ============================================

  test('User can remove multiple products', async ({ standardUserPage }) => {

    await test.step('Add 3 products', async () => {
      await standardUserPage.addItemsToCart(3);
    });

    await test.step('Remove 2 products', async () => {
      await standardUserPage.removeItemsFromCart(2);
    });

    await test.step('Verify cart contains 1 product', async () => {
      await standardUserPage.expectCartCount(1);
    });

  });

  // ============================================
  // Sort price low to high
  // ============================================

  test('User can sort products by price (low to high)', async ({ standardUserPage }) => {
    await test.step('Sort by low to high and verify order', async() => {
      await standardUserPage.sortAndValidate(SortOption.PRICE_LOW_TO_HIGH);
    });
  });

  // ============================================
  // Sort price high to low
  // ============================================

   test('User can sort products by price (high to low)', async ({ standardUserPage }) => {
    await test.step('Sort by high to low and verify order', async() => {
      await standardUserPage.sortAndValidate(SortOption.PRICE_HIGH_TO_LOW);
    });

  });

  // ============================================
  // Sort alphabetical A-Z
  // ============================================

  test('User can sort products alphabetically (A to Z)', async ({ standardUserPage }) => {
    await test.step('Sort A-Z and verify order', async() => {
      await standardUserPage.sortAndValidate(SortOption.NAME_A_TO_Z);
    });

  });

  // ============================================
  // Sort alphabetical Z-A
  // ============================================

   test('User can sort products alphabetically (Z to A)', async ({ standardUserPage }) => {
    await test.step('Sort Z-A and verify order', async() => {
      await standardUserPage.sortAndValidate(SortOption.NAME_Z_TO_A);
    });

   });

  // ============================================
  // Cart retains items
  // ============================================

  test('Cart retains items while browsing inventory', async ({ standardUserPage, page }) => {

    await test.step('Add item to cart', async () => {
      await standardUserPage.addItemToCart(0);
    });

    await test.step('Refresh page', async () => {

      await page.reload();

      await InventoryPage.build(page);

    });

    await test.step('Verify cart still contains item', async () => {
      await standardUserPage.expectCartCount(1);
    });

  });

  // =============================================
  // Product detail navigation via title / image
  // =============================================
  const productClickScenarios = [
  {
    name: 'from title',
    clickFn: async (page: InventoryPage) => page.clickItemTitle(0),
  },
  {
    name: 'from image',
    clickFn: async (page: InventoryPage) => page.clickItemImage(0),
  },
];

for (const scenario of productClickScenarios) {

    test(`User can view product detail ${scenario.name}`, async ({ standardUserPage, page }) => {
    await testProductDetailNavigation(standardUserPage, scenario.clickFn);
  });
}

//Helper function to open a product and confirm its details
 async function testProductDetailNavigation(
  inventoryPage: InventoryPage,
  clickFn: (page: InventoryPage) => Promise<any>
) {
  const detailPage = await test.step('Click product', async () => {
    return await clickFn(inventoryPage);
  });

  await test.step('Verify product detail info', async () => {
    await detailPage.expectProductInfoVisible();
  });

  await test.step('Navigate back to inventory', async () => {
    const returnedInventoryPage = await detailPage.goBackToInventory();
    await expect(returnedInventoryPage.inventoryList).toBeVisible();
  });
}

});
