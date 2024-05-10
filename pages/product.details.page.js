const { test, expect } = require("@playwright/test");
exports.ProductDetailsPage = class ProductDetailsPage {

    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator("[data-ui-id='page-title-wrapper']");
        this.addToCart = page.locator("[id='product-addtocart-button']");
        this.cartCounter = page.locator('[class="counter-number"]');
        
      }


    async verifyPageTitle(term){
        await expect(this.pageTitle).toHaveText(term);
    }

    async selectSizeAndColorAndQty(size, color, qty){
        await this.page.locator(`[aria-label="${size}"]`).click();
        await this.page.locator(`[aria-label="${color}"]`).click();
        await this.page.locator(`[id="qty"]`).fill(""+ qty);
        

    }

    async addProdToCart(){
        await this.addToCart.click({force:true});
        
    }

    async verifyProductWasAdded(qty){
       await expect(this.cartCounter).toHaveText(qty)
    }


}