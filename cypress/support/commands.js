
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Import the LoginPage Page Object to access its methods and selectors
import LoginPage from "../e2e/pages/LoginPage";

/**
 * Custom Cypress command: `cy.login()`
 * 
 * Logs in using valid credentials from the `users.json` fixture file.
 * Internally calls the `loginWithUI` method from the LoginPage.
 */
Cypress.Commands.add('login', () => {
    // Load user data from fixture
    cy.fixture('users.json').then((users) => {
        // Use valid user credentials to perform UI-based login
        LoginPage.loginWithUI(users.validUser.email, users.validUser.password);
    });
});

/**
 * Custom Cypress command: `cy.validateFormField()`
 * 
 * Validates that a specific input field displays the expected validation message.
 * 
 * @param {Cypress.Chainable<JQuery<HTMLElement>>} inputField - The Cypress-wrapped input field
 * @param {string} message - The expected validation message to assert
 */
Cypress.Commands.add('validateFormField', (inputField, message) => {
    return inputField
      .then(($input) => LoginPage.inputValidationErr($input)) // Use Page Object method to find error message element
      .should('be.visible')                                   // Ensure error message is shown
      .and('have.text', message);                             // Check that message matches the expected text
});