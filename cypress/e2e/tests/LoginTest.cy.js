
import { validationMessages } from "../config/errorMessages";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";

describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {

    let  basePage 
    before(() => {
         basePage = new BasePage();
    })

    //Mocha automatically shares contexts for us across all applicable hooks for each test. 
    //Additionally these aliases and properties are automatically cleaned up after each test.
    beforeEach(() => {

        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax. 
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users')
    })

    
    it("should login successfully with valid credentials", function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)
    })

    it("should fail to login with invalid credentials", function () {

        LoginPage
            .loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password)
        
            LoginPage.alertMsg
            .should('contains.text', 'Invalid username or password provided. Please try again.');
    })

    it("should perform login and logout", function () {

        cy.login(); //login via custom command
        basePage.header.performLogout();
    })

    it('should validate the error messages for missing input fields', () => {
        LoginPage.open();
        LoginPage.submitLogin();
        cy.validateFormField(LoginPage.loginInput, validationMessages.USERNAME);
        cy.validateFormField(LoginPage.passwordInput, validationMessages.PASSWORD);
     });

})