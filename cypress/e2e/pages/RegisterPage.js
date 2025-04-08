/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import BasePage from "./BasePage";
import SignUpHelperFunc from "../utils/SignUpHelperFunc";
const routes = require('../config/routes');

// Page Class for Customer Registration
class CustomerRegistrationPage extends BasePage {

  get fnfBtn() { return cy.get('input#personal-info-radio'); }
  get firstName() { return cy.get('input#first-name'); }
  get middleName() { return cy.get('input#middle-name'); }
  get lastName() { return cy.get('input#last-name'); }
  get country() { return cy.get('select#country-id'); }
  get address() { return cy.get('input#street-address'); }
  get city() { return cy.get('input#city'); }
  get state() { return cy.get('select#state_dropdown'); }
  get zipCode() { return cy.get('input#zip-code'); }
  get email() { return cy.get('input#email'); }
  get phoneNumber() { return cy.get('input#phone-number'); }
  get password() { return cy.get('input#password'); }
  get confirmPassword() { return cy.get('input#confirm-password'); }
  get suggestion() { return cy.get('select#suggestion'); }
  get proceedBtn() { return cy.get('button#customer-register-btn'); }
  get termsConditions() { return cy.get('input#terms_and_conditions_cb'); }
  get agreeAndSignUpBtn() { return cy.get('#agree_and_signup_btn'); }

  open() {
    return super.open(routes.REGISTER_ENDPOINT);
  }

  clickFnFButton() {
    this.fnfBtn.click({ force: true }); // Force the click action
  }

  fillPersonalInfo() {
    this.firstName.type(faker.name.firstName());
    this.middleName.type(faker.name.middleName());
    this.lastName.type(faker.name.lastName());
    this.country.select('United States');
  }

  fillAddressDetails() {
    this.address.type(faker.address.streetAddress());
    this.city.type(faker.address.city());
    SignUpHelperFunc.selectRandomOption(this.state);
    this.zipCode.type(faker.address.zipCode());
  }

  fillContactDetails() {
    this.email.type(faker.internet.email());
    const phoneNumber = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();
    this.phoneNumber.type(phoneNumber);
  }

  setPassword() {
    const generatedPassword = SignUpHelperFunc.generateStrongPassword();
    this.password.type(generatedPassword);
    this.confirmPassword.type(generatedPassword);
  }

  selectSuggestion() {
    SignUpHelperFunc.selectRandomOption(this.suggestion);
  }

  proceedButtonClick(){
    this.proceedBtn.should('be.visible').click().then(() => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);
      this.acceptTermsAndConditions()
    });
  }

  acceptTermsAndConditions() {
    cy.scrollTo('bottom'); // Scroll the whole page down first
    cy.contains('I have read and agree to the terms and conditions.').then(($el) => {
      cy.wrap($el).scrollIntoView();
      cy.wrap($el).click();
    });
  cy.wrap(null).then(() => {
    this.clickAgreeAndSignUp(); // Ensures Cypress waits before calling
  }); 
}

  clickAgreeAndSignUp() {
    this.agreeAndSignUpBtn.click({force: true});
  }
}

export default CustomerRegistrationPage;
