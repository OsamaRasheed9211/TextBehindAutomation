const { defineConfig } = require("cypress");
const path = require("path");
const fs = require("fs");
const addContext = require("mochawesome/addContext");

module.exports = defineConfig({
  e2e: {
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true, // Includes CSS and JS inline in the HTML report for portability
      charts: true,
    },

    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000, // Extend command timeout for complex actions
    requestTimeout: 10000, // Timeout for API requests
    pageLoadTimeout: 60000, // Timeout for page loads
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true, // Record videos for all tests
    screenshotOnRunFailure: true, // Automatically capture screenshots on test failure
    trashAssetsBeforeRuns: true, // Clean up screenshots and videos before each run

    env: {
      staging: {
        customer: "https://customer.txbconnect.com",
        cammp: "https://cammp.txbconnect.com",
        simms: "https://simms.txbconnect.com",
        corporate: "https://corporate.txbconnect.com",
      },
      qa: {
        customer: "https://txbqac.com",
        cammp: "https://cammp.txbqac.com",
        simms: "https://simms.txbqac.com",
        corporate: "https://corporate.txbqac.com",
      },
    },

    setupNodeEvents(on, config) {

      on("after:screenshot", (details) => {
        // Log the original path
        console.log("Original path:", details.path);
      
        // Extract the directory and file name
        const directory = path.dirname(details.path); // Get the directory path
        const fileName = path.basename(details.path); // Extract the file name
      
        // Remove spaces specifically from the file name (without altering the directory structure)
        const sanitizedFileName = fileName.replace(/\s+/g, ""); // Remove spaces from the file name only
        const newFilePath = path.join(directory, sanitizedFileName); // Construct the new path
      
        // Check if the original file exists
        if (fs.existsSync(details.path)) {
          try {
            // Rename the file to remove spaces
            fs.renameSync(details.path, newFilePath);
            console.log("Renamed screenshot:", newFilePath);
      
            // Return the updated path to Cypress
            return { path: newFilePath };
          } catch (err) {
            console.error("Error renaming file:", err);
          }
        } else {
          console.error("File does not exist:", details.path);
        }
      });

      // Enhance reporting by attaching screenshots for failed tests
      on("after:spec", (spec, results) => {
        
        console.log("Results object:", JSON.stringify(results, null, 2));
        if (!results.screenshots || results.screenshots.length === 0) {
          console.error("No screenshots found in results.screenshots.");
          return;
        }
        if (results && results.tests) {
          results.tests.forEach((test) => {
            if (test.state === "failed") {
              const testTitle = Array.isArray(test.title)
                ? test.title.join("--")
                : test.title;

              console.log("Processing test:", testTitle);
              // Match screenshots to the failed test
              results.screenshots.forEach((screenshot) => {
                const absolutePath = screenshot.path.replace(/\s+/g, "");
                console.log("Screenshot taken (absolute):", absolutePath);
                addContext(
                  { test },
                  {
                    title: "Screenshot on Failure",
                    value: absolutePath,
                  }
                );
   
              });
            }
          });
        }
      });

      // Custom task for logging in tests or saving debug data
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },

        saveDebug(data) {
          const debugPath = path.join(config.projectRoot, "cypress/logs/debug.log");
          fs.appendFileSync(debugPath, `${JSON.stringify(data)}\n`);
          return null;
        },
      });

      // Clean up old reports and screenshots before running tests
      on("before:run", () => {
        const reportsDir = path.join(config.projectRoot, "cypress/reports");
        if (fs.existsSync(reportsDir)) {
          fs.rmSync(reportsDir, { recursive: true, force: true });
        }
      });

      // Clean up after tests
      on("after:run", () => {
        console.log("Tests complete. Reports and artifacts are ready.");
        const debugPath = path.join(config.projectRoot, "cypress/logs/debug.log");
        if (fs.existsSync(debugPath)) {
          fs.rmSync(debugPath);
        }
      });

      // Browser-specific configurations
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--incognito");
          launchOptions.args.push("--disable-web-security");
          launchOptions.args.push("--window-size=1280,720");
        }

        if (browser.name === "firefox") {
          launchOptions.args.push("--private");
        }

        return launchOptions;
      });
      return config;
    },
  },
});

