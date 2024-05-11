// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { ResultsPage } = require('../pages/results.page');
const { ProductDetailsPage } = require('../pages/product.details.page');
const { CreateAccountPage } = require('../pages/create.account.page');
const { LoginPage } = require('../pages/login.page');

test.beforeEach(async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/')
});

test('Verify the searching functionaly', async ({ page }) => {

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

  // User selects a product size, color and quantity

  await pdp.selectSizeAndColorAndQty('M','Blue', 2);

  // User adds product to the cart

  await pdp.addProdToCart();

  // Asertion to know if the right quantity was added to cart

  await pdp.verifyProductWasAdded(""+2);
  

});

test('Verify user can create an account', async ({ page }) => {

  const homepage = new HomePage(page);
  const creatAnAccount = new CreateAccountPage(page);

  // On Homepage, user click on Create an account link

  await homepage.clickOnCreateAccount();

  // On Create an account link, user creates his account
  // The assertion id done by checking the success message and te user information on my account page

  await creatAnAccount.creatAnAccount();

 
});

test('Verify user can not login in with invalid credentials', async ({ page }) => {

  const homepage = new HomePage(page);
  const creatAnAccount = new CreateAccountPage(page);
  const loginpage = new LoginPage(page);

  // On Homepage, user click on Sign  link

  await homepage.clickOnSignIn();

  // On Sign in page, user enter invalid credentials

  await loginpage.enterUserCredentials();

  // The assertion id done by checking the success message and te user information on my account page
  
  await loginpage.verifyAlertMessage();

 
});