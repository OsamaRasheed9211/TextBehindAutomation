/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

// Page Class for Customer Registration
class CustomerRegistrationPage {
  constructor() {
    this.selectors = {
      fnfBtn: "input#personal-info-radio",
      firstName: "input#first-name",
      middleName: "input#middle-name",
      lastName: "input#last-name",
      country: "select#country-id",
      address: "input#street-address",
      city: "input#city",
      state: "select#state_dropdown",
      zipCode: "input#zip-code",
      email: "input#email",
      phoneNumber: "input#phone-number",
      password: "input#password",
      confirmPassword: "input#confirm-password",
      suggestion: "select#suggestion",
      proceedBtn: "button#customer-register-btn",
      termsConditions: "input#terms_and_conditions_cb",
      agreeAndSignUpBtn: "#agree_and_signup_btn1"
    };
  }

  visit(register, service, env) {
    cy.getBaseUrl(env, service).then((baseUrl) => {
      const fullUrl = `${baseUrl}${register}`;
      cy.visit(fullUrl);
      cy.url().should('include', fullUrl);
    });
  }
  clickFnFButton() {
    cy.get(this.selectors.fnfBtn).click({ force: true });
  }

  fillPersonalInfo() {
    cy.get(this.selectors.firstName).type(faker.name.firstName());
    cy.get(this.selectors.middleName).type(faker.name.middleName());
    cy.get(this.selectors.lastName).type(faker.name.lastName());
    cy.get(this.selectors.country).select('United States');
  }

  fillAddressDetails() {
    cy.get(this.selectors.address).type(faker.address.streetAddress());
    cy.get(this.selectors.city).type(faker.address.city());
    this.selectRandomOption(this.selectors.state);
    cy.get(this.selectors.zipCode).type(faker.address.zipCode());
  }

  fillContactDetails() {
    cy.get(this.selectors.email).type(faker.internet.email());
    const phoneNumber = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();
    cy.get(this.selectors.phoneNumber).type(phoneNumber);
  }

  setPassword() {
    const generatedPassword = this.generateStrongPassword();
    cy.get(this.selectors.password).type(generatedPassword);
    cy.get(this.selectors.confirmPassword).type(generatedPassword);
  }

  selectSuggestion() {
    this.selectRandomOption(this.selectors.suggestion);
  }

  acceptTermsAndConditions() {
    cy.get(this.selectors.proceedBtn).click();
    cy.contains('I have read and agree to the terms and conditions.')
      .scrollIntoView()
      .click();
  }

  clickAgreeAndSignUp() {
    cy.get(this.selectors.agreeAndSignUpBtn).click();
  }

selectRandomOption(selector) {
  cy.get(selector).find('option').then(options => {
    cy.log('Total Options Found:', options.length); // Log total options

    // Filter out options without a value
    const validOptions = [...options].filter(option => option.value.trim() !== '');
    cy.log('Valid Options Count:', validOptions.length); // Log valid options count

    if (validOptions.length === 0) {
      cy.log('No valid options available in the dropdown.');
      throw new Error('Random option selection failed because no valid options were found.');
    }

    // Select a random option from the valid ones
    const randomOption = Cypress._.sample(validOptions);
    cy.log('Random Option:', randomOption ? randomOption.outerHTML : 'No option selected');
    const randomOptionValue = randomOption.value;
    cy.log('Random Option Value:', randomOptionValue);

    cy.get(selector).select(randomOptionValue); // Select the value
  });
}

  generateStrongPassword() {
    const specialCharacters = '@$!%#&';
    const randomSpecialChar = faker.helpers.arrayElement(specialCharacters.split(''));
    const randomLetter = faker.string.alpha({ length: 1 });
    const randomNumber = faker.number.int({ min: 0, max: 9 });
    let basePassword = faker.string.alpha({ length: 8 });
    let password = basePassword + randomNumber + randomSpecialChar + randomLetter;
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }
}

export default CustomerRegistrationPage;