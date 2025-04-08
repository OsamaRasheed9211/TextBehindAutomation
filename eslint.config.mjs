import globals from "globals";
import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";
import chaiFriendly from "eslint-plugin-chai-friendly";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"], // Target all JavaScript files
    languageOptions: {
      ecmaVersion: "latest", // Enable latest ECMAScript features
      sourceType: "module", // Use ES Modules
      globals: {
        ...globals.browser, // Enable browser globals
        ...globals.node, // Enable Node.js globals
        ...globals["cypress/globals"], // Enable Cypress globals
        ...globals.mocha, // Enable Mocha globals (e.g., describe, it, beforeEach, etc.)
        Cypress: "readonly", // Explicitly add 'Cypress' as a global
        cy: "readonly", // Explicitly add 'cy' as a global
      },
    },
    plugins: {
      cypress, // Register the Cypress plugin
      "chai-friendly": chaiFriendly, // Register the Chai-friendly plugin
    },
    rules: {
      // Recommended rules
      ...js.configs.recommended.rules,
      ...cypress.configs.recommended.rules,
      ...chaiFriendly.configs.recommended.rules,

      // Custom rules
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Ignore variables prefixed with '_'
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "warn",
      "cypress/assertion-before-screenshot": "warn",
      "cypress/no-force": "warn",
      "cypress/no-async-tests": "error",
      "cypress/no-pause": "error",
    },
  },
];