const { test, expect } = require("@playwright/test");
const accountCreatedMessage = "Thank you for registering with Main Website Store.";

exports.MyAccountPage = class MyAccountPage {

    constructor(page) {
        this.page = page;
        this.successMessage = page.locator('.message-success > div');
        this.contactInformation = page.locator('.box-content > p')
        
        
      }

    

    async verifyAccountIsCreated(name, lastName, email) {
        await expect(this.successMessage).toHaveText(accountCreatedMessage);
        await expect(this.contactInformation).toHaveText(` ${name} ${lastName} ${email} `);
       
    }

   
}