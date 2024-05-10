// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { ResultsPage } = require('../pages/results.page');
const { ProductDetailsPage } = require('../pages/product.details.page');

test.beforeEach(async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/')
});

test.skip('Verify the searching functionaly', async ({ page }) => {

  const homepage = new HomePage(page);
  const resultspage = new ResultsPage(page);

  // Search for a term

  await homepage.searchForATerm('shirt');

  // Assertions to know user is on Results Page
  await resultspage.verifyPageTitle('shirt');
  await resultspage.verifyProductGrid();
  
});


test('Verify user can add a product to cart', async ({ page }) => {

  const homepage = new HomePage(page);
  const resultspage = new ResultsPage(page);
  const pdp = new ProductDetailsPage(page);

  // Search for a term

  await homepage.searchForATerm('Radiant Tee');

  // Go to Product Details Page
  await resultspage.goToPDP();

  // Assertions to know user is on Product Details Page
  await pdp.verifyPageTitle('Radiant Tee');

  await pdp.selectSizeAndColorAndQty('M','Blue', 2);

  await pdp.addProdToCart();

  await pdp.verifyProductWasAdded(""+2);
  

  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Playwright/);
});