import { test, expect } from '../fixtures/authFixtures';
import { InventoryPage } from '../../pages/InventoryPage';

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

    await test.step('Sort by low to high', async () => {
      await standardUserPage.sortBy('Price (low to high)');
    });

    await test.step('Verify ascending order', async () => {
      await standardUserPage.expectPricesAscending();
    });

  });

  // ============================================
  // Sort price high to low
  // ============================================

  test('User can sort products by price (high to low)', async ({ standardUserPage }) => {

    await test.step('Sort by high to low', async () => {
      await standardUserPage.sortBy('Price (high to low)');
    });

    await test.step('Verify descending order', async () => {
      await standardUserPage.expectPricesDescending();
    });

  });

  // ============================================
  // Sort alphabetical A-Z
  // ============================================

  test('User can sort products alphabetically (A to Z)', async ({ standardUserPage }) => {

    await test.step('Sort A-Z', async () => {
      await standardUserPage.sortBy('Name (A to Z)');
    });

    await test.step('Verify alphabetical order', async () => {
      await standardUserPage.expectTitlesAscending();
    });

  });

  // ============================================
  // Sort alphabetical Z-A
  // ============================================

  test('User can sort products alphabetically (Z to A)', async ({ standardUserPage }) => {

    await test.step('Sort Z-A', async () => {
      await standardUserPage.sortBy('Name (Z to A)');
    });

    await test.step('Verify reverse alphabetical order', async () => {
      await standardUserPage.expectTitlesDescending();
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

  // ============================================
  // Product detail navigation via title
  // ============================================
  test('User can view product detail from title', async ({ standardUserPage }) => {

  const detailPage = await test.step(
    'Click product title',
    async () => {
      return await standardUserPage.clickItemTitle(0);
    }
  );

  await test.step(
    'Verify product detail info',
    async () => {
      await detailPage.expectProductInfoVisible();
    }
  );

  await test.step(
    'Navigate back to inventory',
    async () => {
      const inventoryPage = await detailPage.goBackToInventory();

      await expect(
        inventoryPage.inventoryList
      ).toBeVisible();
    }
  );

});

  // ============================================
  // Product detail navigation via image
  // ============================================

  test('User can view product detail from image', async ({ standardUserPage }) => {

    const detailPage = await test.step(
      'Click product image',
      async () => {
        return await standardUserPage.clickItemImage(0);
      }
    );

    await test.step(
      'Verify product detail info',
      async () => {
        await detailPage.expectProductInfoVisible();
      }
    );

    await test.step(
      'Navigate back to inventory',
      async () => {
        const inventoryPage = await detailPage.goBackToInventory();

        await expect(
          inventoryPage.inventoryList
        ).toBeVisible();
      }
    );

  });


});
