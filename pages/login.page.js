const { expect } = require("@playwright/test");
const alertMessage = "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.";

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailAddress = page.locator('id=email');
        this.password = page.locator('[title="Password"]');
        this.signInButton = page.locator('id=send2').first();
        this.alertMessage = page.locator('[data-bind="html: $parent.prepareMessageForHtml(message.text)"]');
        
        
      }

    
    async enterUserCredentials() {
        const response = await this.page.request.get('https://randomuser.me/api/');
        const responseBody = await response.json();
        
        var userEmail= responseBody.results[0].email;
        var userPassword = responseBody.results[0].login.password 


        await this.emailAddress.fill(userEmail);
        await this.password.fill(userPassword);
        
        await this.signInButton.click();
       
    }

    async verifyAlertMessage() {
        expect(await this.alertMessage).toHaveText(alertMessage);
    }

   
}