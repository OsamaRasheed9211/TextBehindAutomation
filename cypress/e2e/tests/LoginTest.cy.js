// Import validation messages for form error checks
import { validationMessages } from "../config/errorMessages";

// Import base page to access shared UI components like header
import BasePage from "../pages/BasePage";

// Import login page actions
import LoginPage from "../pages/LoginPage";

// Test suite for login functionality (success and failure flows)
describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {

    // Declare basePage to be initialized before the tests run
    let basePage;

    // Runs once before all tests in the block
    before(() => {
        basePage = new BasePage(); // Create an instance of BasePage
    });

    /**
     * Runs before each test case.
     * Loads the test data from users.json fixture file and aliases it as 'users'.
     * Standard function syntax is used to access `this.users` correctly.
     */
    beforeEach(function () {
        cy.fixture('users.json').as('users');
    });

    /**
     * Test: Valid login scenario
     * Uses credentials from fixture (validUser) and performs login.
     */
    it("should login successfully with valid credentials", function () {
        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password);
    });

    /**
     * Test: Invalid login scenario
     * Enters incorrect credentials and verifies the error message.
     */
    it("should fail to login with invalid credentials", function () {
        LoginPage
            .loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password);

        // Verify alert message text for invalid login
        LoginPage.alertMsg
            .should('contains.text', 'Invalid username or password provided. Please try again.');
    });

    /**
     * Test: Login via custom command and logout through the header
     */
    it("should perform login and logout", function () {
        cy.login(); // Custom Cypress command for logging in
        basePage.header.performLogout(); // Use header component's logout method
    });

    /**
     * Test: Validate error messages when required fields are left empty
     */
    it('should validate the error messages for missing input fields', () => {
        LoginPage.open();              // Open login page
        LoginPage.submitLogin();      // Submit without entering any credentials

        // Validate error messages using a custom command
        cy.validateFormField(LoginPage.loginInput, validationMessages.USERNAME);
        cy.validateFormField(LoginPage.passwordInput, validationMessages.PASSWORD);
    });

});