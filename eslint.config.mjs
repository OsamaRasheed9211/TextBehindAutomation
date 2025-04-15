import globals from "globals"; // Import global variables for different environments
import js from "@eslint/js"; // Import ESLint rules for JavaScript
import cypress from "eslint-plugin-cypress"; // Import Cypress-specific ESLint plugin
import chaiFriendly from "eslint-plugin-chai-friendly"; // Import Chai-friendly ESLint plugin

/** 
 * ESLint configuration array with customized settings for Cypress, JavaScript, and Chai.
 */
export default [
  {
    files: ["**/*.js"], // Apply the rules to all JavaScript files in the project
    languageOptions: {
      ecmaVersion: "latest", // Enable the latest ECMAScript features (e.g., async/await, import/export)
      sourceType: "module", // Set source type as ES Module (for `import` and `export` statements)
      globals: {
        ...globals.browser, // Enable global variables for browser environments (e.g., window, document)
        ...globals.node, // Enable global variables for Node.js (e.g., process, module)
        ...globals["cypress/globals"], // Enable global variables for Cypress testing (e.g., cy, Cypress)
        ...globals.mocha, // Enable global variables for Mocha (e.g., describe, it, beforeEach, etc.)
        Cypress: "readonly", // Explicitly mark `Cypress` as a read-only global variable (used in Cypress tests)
        cy: "readonly", // Explicitly mark `cy` as a read-only global variable (used to interact with Cypress commands)
      },
    },
    plugins: {
      cypress, // Register the Cypress plugin to provide Cypress-specific linting rules
      "chai-friendly": chaiFriendly, // Register the Chai-friendly plugin to support Chai assertions in ESLint
    },
    rules: {
      // Apply the recommended rules from JavaScript, Cypress, and Chai plugins
      ...js.configs.recommended.rules, // Include recommended JavaScript rules
      ...cypress.configs.recommended.rules, // Include recommended Cypress-specific rules
      ...chaiFriendly.configs.recommended.rules, // Include Chai-friendly recommended rules

      // Custom Rules
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Disallow unused variables, except those with an underscore prefix (common for unused function arguments)
      "cypress/no-assigning-return-values": "error", // Prevent assigning return values from Cypress commands (which are asynchronous)
      "cypress/no-unnecessary-waiting": "warn", // Warn against using unnecessary `cy.wait()` commands
      "cypress/assertion-before-screenshot": "warn", // Warn if assertions are not made before taking a screenshot in Cypress
      "cypress/no-force": "warn", // Warn against using `cy.click({ force: true })`, which bypasses checks (use cautiously)
      "cypress/no-async-tests": "error", // Disallow async tests in Cypress, as they may cause issues with test execution
      "cypress/no-pause": "error", // Disallow `cy.pause()` in tests (can interrupt test flow)
    },
  },
];