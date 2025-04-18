/// <reference types="cypress" />

// Import faker for generating dynamic test data
import { faker } from '@faker-js/faker';

// Import base page class for shared navigation or utility functions
import BasePage from "./BasePage";

// Import helper functions for signup form logic
import SignUpHelperFunc from "../utils/SignUpHelperFunc";

// Import predefined route paths (like registration endpoint)
const routes = require('../config/routes');

// Page Object Model (POM) class for Customer Registration Page
class CustomerRegistrationPage extends BasePage {

  // Getters for form elements on the registration page

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

  /**
   * Navigates to the registration page using route from config.
   */
  open() {
    return super.open(routes.REGISTER_ENDPOINT);
  }

  /**
   * Clicks on the "Friends and Family" radio button.
   * Uses force to bypass hidden or covered state issues.
   */
  clickFnFButton() {
    this.fnfBtn.click({ force: true });
  }

  /**
   * Fills out personal information fields with randomly generated names.
   * Country is hardcoded to "United States".
   */
  fillPersonalInfo() {
    this.firstName.type(faker.name.firstName());
    this.middleName.type(faker.name.middleName());
    this.lastName.type(faker.name.lastName());
    this.country.select('United States');
  }

  /**
   * Fills address details with faker-generated data.
   * State is selected randomly using the helper function.
   */
  fillAddressDetails() {
    this.address.type(faker.address.streetAddress());
    this.city.type(faker.address.city());
    SignUpHelperFunc.selectRandomOption(this.state);
    this.zipCode.type(faker.address.zipCode());
  }

  /**
   * Fills contact fields including a unique email and a 10-digit phone number.
   */
  fillContactDetails() {
    this.email.type(faker.internet.email());
    const phoneNumber = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();
    this.phoneNumber.type(phoneNumber);
  }

  /**
   * Generates a secure password using the helper and fills both password fields.
   */
  setPassword() {
    const generatedPassword = SignUpHelperFunc.generateStrongPassword();
    this.password.type(generatedPassword);
    this.confirmPassword.type(generatedPassword);
  }

  /**
   * Selects a random suggestion option from the dropdown.
   */
  selectSuggestion() {
    SignUpHelperFunc.selectRandomOption(this.suggestion);
  }

  /**
   * Clicks the Proceed button and then accepts terms.
   * Waits briefly to allow UI transitions.
   */
  proceedButtonClick(){
    this.proceedBtn.should('be.visible').click().then(() => {
      // Wait to ensure the next part of the form is loaded
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);
      this.acceptTermsAndConditions();
    });
  }

  /**
   * Scrolls to and clicks the terms and conditions agreement.
   * Then calls the signup button click.
   */
  acceptTermsAndConditions() {
    cy.scrollTo('bottom'); // Ensure full page scroll for visibility
    cy.contains('I have read and agree to the terms and conditions.').then(($el) => {
      cy.wrap($el).scrollIntoView();
      cy.wrap($el).click();
    });

    // Waits for previous actions before proceeding
    cy.wrap(null).then(() => {
      this.clickAgreeAndSignUp();
    }); 
  }

  /**
   * Final submission: Clicks the "Agree and Sign Up" button.
   * Uses force to avoid issues if hidden or disabled initially.
   */
  clickAgreeAndSignUp() {
    this.agreeAndSignUpBtn.click({ force: true });
  }
}

export default CustomerRegistrationPage;

