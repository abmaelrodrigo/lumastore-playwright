const { test, expect } = require("@playwright/test");
exports.HomePage = class HomePage {

    constructor(page) {
        this.page = page;
        this.searchInput = page.locator('id=search');
      }

    

    async searchForATerm(term) {
        await this.searchInput.click();
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');

    }


}