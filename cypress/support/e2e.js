// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
//import 'cypress-mochawesome-reporter/register';

//Cypress.on('uncaught:exception', (err, runnable) => {
  //  if (err.message.includes('TypeError: The module loaded from /customer/js/intl-tel-input-utils.js did not set utils as its default export.')) {
      // Prevent the error from failing the test
    //  return false;
    //}e2e.js
    //return true;
  //});

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})