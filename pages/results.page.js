const { test, expect } = require("@playwright/test");
exports.ResultsPage = class ResultsPage {

    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator("[data-ui-id='page-title-wrapper']");
        this.productGrid = page.locator("[class='products list items product-items']");
        this.firstProduct = page.locator("[class='item product product-item']").first()
      }


    async verifyPageTitle(term){
        await expect(this.pageTitle).toHaveText(`Search results for: '${term}'`);
    }

    async verifyProductGrid(){
        await expect(this.productGrid).toBeVisible();
    }

    async goToPDP(){
        await this.firstProduct.click();
    }


}