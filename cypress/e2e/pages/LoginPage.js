import BasePage from "./BasePage";
const routes = require('../config/routes');

class LoginPage extends BasePage{

    get loginInput() { return cy.get('#username'); }
    get passwordInput() { return cy.get('#password'); }
    get loginBtn() { return cy.get('button[type="submit"].btn.btn-primary.gutter-b'); }
    get alertMsg() { return cy.get('.alert-text'); }

  get inputValidationErr() { 
        return (inputField) => cy.wrap(inputField).closest('.col-xl-6').find('.fv-plugins-message-container .fv-help-block'); }
  
      open() {
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(routes.LOGIN_ENDPOINT);
    }

    loginWithUI(email, password) {
        this.open();
        this.loginInput.type(email);
        this.passwordInput.type(password);
        this.submitLogin();
    }

    submitLogin() {
        this.loginBtn.click();
    }

}
export default new LoginPage();

