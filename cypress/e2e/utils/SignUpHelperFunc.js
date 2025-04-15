// Importing the faker library to generate fake test data
import { faker } from '@faker-js/faker';

// Helper class to handle sign-up related utilities
class SignUpHelperFunc {

    /**
     * Selects a random non-empty option from a dropdown element.
     */
    static selectRandomOption(selector) {
        // First, ensure the dropdown element exists and is visible
        selector.should('exist').and('be.visible').then(($select) => {
            // Check that the dropdown contains at least one option
            cy.wrap($select).find('option').should('have.length.greaterThan', 0).then((options) => {
                // Filter out empty or invalid options (e.g., placeholder like "Select...")
                const validOptions = [...options].filter(option => option.value.trim() !== '');

                // If there are no valid options, throw an error to indicate test issue
                if (validOptions.length === 0) {
                    throw new Error('No valid options found to select.');
                }

                // Use Cypress utility to pick a random valid option
                const randomOption = Cypress._.sample(validOptions);

                // If a valid option is found, select it
                if (randomOption && randomOption.value) {
                    cy.wrap($select).select(randomOption.value);
                } else {
                    // Fail the test explicitly if the selected option is invalid
                    throw new Error('Random option is undefined or invalid');
                }
            });
        });
    }

    /**
     * Generates a strong, pseudo-random password.
     * Ensures a mix of letters, numbers, and special characters.
     */
    static generateStrongPassword() {
        // Define a set of special characters for password strength
        const specialCharacters = '@$!%#&';

        // Pick one random special character from the list
        const randomSpecialChar = faker.helpers.arrayElement(specialCharacters.split(''));

        // Generate a random alphabet character (uppercase or lowercase)
        const randomLetter = faker.string.alpha({ length: 1 });

        // Generate a random single-digit number (0-9)
        const randomNumber = faker.number.int({ min: 0, max: 9 });

        // Create a base of 8 alphabetic characters
        let basePassword = faker.string.alpha({ length: 8 });

        // Combine all parts into one password string
        let password = basePassword + randomNumber + randomSpecialChar + randomLetter;

        // Shuffle the characters to make the password more random and unpredictable
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }
}

// Export the helper class to use in test files
export default SignUpHelperFunc;