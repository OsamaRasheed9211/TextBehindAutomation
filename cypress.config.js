const { defineConfig } = require("cypress");
const path = require("path");

/**
 * Cypress configuration file with advanced settings and dynamic environment handling.
 * This configuration is designed for scalability, maintainability, and professional use.
 */
module.exports = defineConfig({
  // Clean up old assets before each test run to avoid clutter
  trashAssetsBeforeRuns: true,

  // Define folder paths for Cypress artifacts
  downloadsFolder: "cypress/downloads",
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",

  // Enable screenshots and video capture for debugging and reporting
  screenshotOnRunFailure: true, // Capture screenshots on test failure
  video: true, // Record videos of test runs
  videoCompression: false, // Disable compression for higher video quality

  // Set default viewport dimensions for consistent testing
  viewportHeight: 800,
  viewportWidth: 1200,

  // Increase default command timeout for stability on slower networks
  defaultCommandTimeout: 10000, // 10 seconds

  // Configure test retries to handle flaky tests
  retries: {
    runMode: 2, // Retry failed tests twice in `cypress run` mode
    openMode: 1, // Retry failed tests once in `cypress open` mode
  },

  // Configure reporting for test results
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json", // Custom reporter configuration
  },

  // End-to-End (e2e) Test Configuration
  e2e: {
    // Base URL for all tests (can be overridden by environment settings)
    baseUrl: "https://txbqac.com",

    // Define the pattern for locating test files
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    // Specify the support file for reusable functions and commands
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",

    /**
     * Setup Node events for advanced configuration and dynamic environment handling.
     * This function allows you to customize Cypress behavior and load environment-specific settings.
     */
    setupNodeEvents(on, config) {
      // Load environment-specific configuration dynamically
      const environmentName = config.env.environmentName || "default";
      console.log(`🔧 Loading environment settings for: ${environmentName}`);

      // Resolve the path to the environment settings file
      const environmentFile = path.resolve(
        __dirname,
        `./settings/${environmentName}.settings.json`
      );

      try {
        // Load environment settings from the specified file
        const settings = require(environmentFile);

        // Merge environment settings into the Cypress config
        if (settings.baseUrl) {
          config.baseUrl = settings.baseUrl;
        }
        if (settings.env) {
          config.env = {
            ...config.env,
            ...settings.env,
          };
        }
      } catch (error) {
        console.warn(
          `⚠️ Could not load environment settings from ${environmentFile}:`,
          error.message
        );
      }

      // Ensure project ID is dynamically loaded (if applicable)
      if (config.env.projectId) {
        config.projectId = config.env.projectId;
      }

      // Integrate plugins for enhanced functionality
      require("cypress-mochawesome-reporter/plugin")(on); // Mochawesome reporter for detailed test reports
      require("@cypress/grep/src/plugin")(config); // Grep plugin for test tagging and filtering

      // Return the updated configuration
      return config;
    },

    // Define default environment variables (can be overridden dynamically)
    env: {
      URL: "https://txbqac.com", // Default base URL
    },
  },
});