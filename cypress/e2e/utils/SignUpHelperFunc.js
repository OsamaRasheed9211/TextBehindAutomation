import { faker } from '@faker-js/faker';

class SignUpHelperFunc{

    static selectRandomOption(selector) {
        // Ensure the dropdown is present and visible
        selector.should('exist').and('be.visible').then(($select) => {
          // Ensure the dropdown has options
          cy.wrap($select).find('option').should('have.length.greaterThan', 0).then((options) => {
            const validOptions = [...options].filter(option => option.value.trim() !== '');
      
            if (validOptions.length === 0) {
              throw new Error('No valid options found to select.');
            }
            // Select a random option from valid options
            const randomOption = Cypress._.sample(validOptions);
            if (randomOption && randomOption.value) {
              cy.wrap($select).select(randomOption.value);
            } else {
              throw new Error('Random option is undefined or invalid');
            }
          });
        });
      }
      static generateStrongPassword() {
        const specialCharacters = '@$!%#&';
        const randomSpecialChar = faker.helpers.arrayElement(specialCharacters.split(''));
        const randomLetter = faker.string.alpha({ length: 1 });
        const randomNumber = faker.number.int({ min: 0, max: 9 });
        let basePassword = faker.string.alpha({ length: 8 });
        let password = basePassword + randomNumber + randomSpecialChar + randomLetter;
        return password.split('').sort(() => 0.5 - Math.random()).join('');
      }

      
    
}

export default SignUpHelperFunc;