// Import the BasePage class for shared navigation and page actions
import BasePage from "./BasePage";

// Import route configuration (e.g., LOGIN_ENDPOINT)
const routes = require('../config/routes');

// Page Object Model (POM) class for the Login Page
class LoginPage extends BasePage {

  /**
   * Getter for the username/email input field.
   */
  get loginInput() { 
    return cy.get('#username'); 
  }

  /**
   * Getter for the password input field.
   */
  get passwordInput() { 
    return cy.get('#password'); 
  }

  /**
   * Getter for the login button.
   * It selects a styled button used for submitting login credentials.
   */
  get loginBtn() { 
    return cy.get('button[type="submit"].btn.btn-primary.gutter-b'); 
  }

  /**
   * Getter for the alert message displayed on failed login.
   * Typically used to validate incorrect login attempts.
   */
  get alertMsg() { 
    return cy.get('.alert-text'); 
  }

  /**
   * Function to retrieve input field validation error message.
   * Wraps the provided field, finds the closest container, and targets the validation error element.
   */
  get inputValidationErr() { 
    return (inputField) => 
      cy.wrap(inputField)
        .closest('.col-xl-6')
        .find('.fv-plugins-message-container .fv-help-block'); 
  }

  /**
   * Opens the login page using the configured LOGIN_ENDPOINT.
   * Uses BasePage’s `open()` method for consistency and reusability.
   */
  open() {
    // Alternative method (commented): cy.visit(Cypress.env('URL'))
    return super.open(routes.LOGIN_ENDPOINT);
  }

  /**
   * Logs in using the UI by entering credentials and submitting the form.
   */
  loginWithUI(email, password) {
    this.open();
    this.loginInput.type(email);
    this.passwordInput.type(password);
    this.submitLogin();
  }

  /**
   * Clicks the login button to submit the form.
   */
  submitLogin() {
    this.loginBtn.click();
  }

}

// Exporting a new instance of LoginPage so it can be directly imported and used in tests
export default new LoginPage();