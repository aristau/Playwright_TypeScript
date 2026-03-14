Feature: Inventory

Background:
  Given user is logged in with valid credentials

Scenario: Products list is visible
  Then user sees the products list
  And each product has a title, price, and image

Scenario: User can add a product to the cart
  When user adds 1 product(s) to the cart
  Then the cart should contain 1 product(s)

Scenario: User can remove a product from the cart
  Given user has added 1 product(s) to the cart
  When user removes 1 product(s) from the cart
  Then the cart should be empty

Scenario: User can add multiple products to the cart
  When user adds 3 product(s) to the cart
  Then the cart should contain 3 product(s)

Scenario: User can remove multiple products from the cart
  Given user has added 3 product(s) to the cart
  When user removes 2 product(s) from the cart
  Then the cart should contain 1 product(s)

Scenario Outline: User can sort products
  When user sorts products by "<sortOption>"
  Then products should be sorted correctly

Examples:
  | sortOption         |
  | PRICE_LOW_TO_HIGH  |
  | PRICE_HIGH_TO_LOW  |
  | NAME_A_TO_Z        |
  | NAME_Z_TO_A        |


# Scenario: Cart retains items while browsing inventory
#   Given user has added 1 product to the cart
#   When user navigates through the inventory
#   Then the cart should contain 1 product

# Scenario Outline: User can view product detail page by clicking an element
#   When user clicks the "<element>" of a product
#   Then the product detail page shows a title, description, price, and image
#   And user can navigate back to inventory

# Examples:
#   | element       |
#   | title         |
#   | image         |