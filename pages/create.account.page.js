const { test, expect } = require("@playwright/test");
const { MyAccountPage } = require("./my.account.page");
exports.CreateAccountPage = class CreateAccountPage {

    constructor(page) {
        this.page = page;
        this.firstName = page.locator('id=firstname');
        this.lastName = page.locator('id=lastname');
        this.emailAddress = page.locator('id=email_address');
        this.password = page.locator('id=password');
        this.passwordConfirmation = page.locator('id=password-confirmation');
        this.createAccountButton = page.locator("[class='action submit primary']");
        
      }

    

    async creatAnAccount() {
        const response = await this.page.request.get('https://randomuser.me/api/');
        const responseBody = await response.json();
        const myAccountPage = new MyAccountPage(this.page);

        var userFirstName = responseBody.results[0].name.first;
        var userLastName = responseBody.results[0].name.last;
        var userEmail= responseBody.results[0].email;



        await this.firstName.fill(userFirstName);
        await this.lastName.fill(userLastName);
        await this.emailAddress.fill(userEmail);
        await this.password.fill(responseBody.results[0].login.password + responseBody.results[0].name.first + '#');
        await this.passwordConfirmation.fill(responseBody.results[0].login.password + responseBody.results[0].name.first + '#');
        this.createAccountButton.click();

        await myAccountPage.verifyAccountIsCreated(userFirstName, userLastName, userEmail);



    }

   
}