const { defineConfig } = require("cypress");
const path = require("path");

/**
 * Cypress configuration file with advanced settings and dynamic environment handling.
 * This configuration is designed for scalability, maintainability, and professional use.
 */
module.exports = defineConfig({
  // Clean up old assets (screenshots, videos, etc.) before each test run to avoid clutter
  trashAssetsBeforeRuns: true,

  // Define folder paths for Cypress artifacts (downloads, fixtures, screenshots, and videos)
  downloadsFolder: "cypress/downloads", // Folder for downloaded files
  fixturesFolder: "cypress/fixtures",   // Folder for fixture files (mock data)
  screenshotsFolder: "cypress/screenshots", // Folder for screenshots on test failure
  videosFolder: "cypress/videos",       // Folder for videos of test runs

  // Enable screenshot and video capture for debugging and reporting
  screenshotOnRunFailure: true, // Capture screenshots when a test fails
  video: true, // Record videos of test runs for debugging purposes
  videoCompression: false, // Disable compression for better quality in video recordings

  // Set default viewport dimensions for consistent test execution
  viewportHeight: 800, // Height of the viewport in pixels
  viewportWidth: 1200,  // Width of the viewport in pixels

  // Increase default command timeout to ensure stability, especially on slower networks
  defaultCommandTimeout: 10000, // Set default command timeout to 10 seconds

  // Configure test retries to handle flaky tests (tests that might fail intermittently)
  retries: {
    runMode: 2, // Retry failed tests twice when running in `cypress run` mode
    openMode: 1, // Retry failed tests once when running in `cypress open` mode
  },

  // Configure reporting for test results using a multi-reporter plugin
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json", // Path to custom reporter configuration
  },

  // End-to-End (e2e) test configuration section
  e2e: {
    // Base URL for all tests, can be overridden by environment settings dynamically
    baseUrl: "https://txbqac.com",

    // Define the pattern for locating test files (all .cy.js, .cy.jsx, .cy.ts, .cy.tsx files)
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    // Specify the support file for reusable functions and commands (custom commands, hooks, etc.)
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",

    /**
     * Setup Node events for advanced configuration and dynamic environment handling.
     * This function allows you to customize Cypress behavior and load environment-specific settings.
     */
    setupNodeEvents(on, config) {
      // Load environment-specific configuration dynamically based on the environment name
      const environmentName = config.env.environmentName || "default"; // Default to "default" if not provided
      console.log(`🔧 Loading environment settings for: ${environmentName}`);

      // Resolve the path to the environment settings file (e.g., settings/qa.settings.json)
      const environmentFile = path.resolve(
        __dirname,
        `./settings/${environmentName}.settings.json`
      );

      try {
        // Load environment settings from the specified file
        const settings = require(environmentFile);

        // Merge environment settings into the Cypress config
        if (settings.baseUrl) {
          config.baseUrl = settings.baseUrl; // Override the baseUrl if specified in the environment settings
        }
        if (settings.env) {
          config.env = {
            ...config.env,
            ...settings.env, // Merge environment-specific variables
          };
        }
      } catch (error) {
        console.warn(
          `⚠️ Could not load environment settings from ${environmentFile}:`,
          error.message // Warn if the environment settings file cannot be loaded
        );
      }

      // Ensure project ID is dynamically loaded (if applicable)
      if (config.env.projectId) {
        config.projectId = config.env.projectId;
      }

      // Integrate plugins for enhanced functionality (e.g., Mochawesome for reporting)
      require("cypress-mochawesome-reporter/plugin")(on); // Mochawesome reporter for detailed test reports
      require("@cypress/grep/src/plugin")(config); // Grep plugin for test tagging and filtering

      // Return the updated configuration object
      return config;
    },

    // Define default environment variables (can be overridden dynamically)
    env: {
      URL: "https://txbqac.com", // Default base URL
    },
  },
});