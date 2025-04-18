// Import the HeaderComponent to include shared header functionality across all pages
import HeaderComponent from "../components/HeaderComponent";

// BasePage class that serves as a parent class for all page objects
class BasePage {

    constructor() {
        // Instantiate the shared header component so all child pages have access to it
        this.header = new HeaderComponent();
    }

    /**
     * Navigates to a given path/URL.
     * This method can be called from child page classes to open specific routes.
     */
    open(path) {
        console.log(`The Path is:  ${path}`);  // Optional logging for debugging purposes
        return cy.visit(path);                 // Uses Cypress to navigate to the specified path
    }

}

// Export the BasePage class so it can be extended by other page classes
export default BasePage;