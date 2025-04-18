// Import the CustomerRegistrationPage POM (Page Object Model)
import CustomerRegistrationPage from "../pages/RegisterPage";

// Define the test suite for Customer Friends and Family (FnF) Sign-Up
describe('Customer FNF SignUp', () => {

  // Instantiate the registration page object to use its methods throughout the test
  const customerRegistrationPage = new CustomerRegistrationPage();

  /**
   * Test: Complete registration flow for a FnF (Friends and Family) user
   */
  it('Complete Sign-Up Process for FnF User', () => {

    // Step 1: Open the registration page
    customerRegistrationPage.open();

    // Step 2: Click on the FnF radio button to start FnF-specific signup
    customerRegistrationPage.clickFnFButton();

    // Step 3: Fill out personal information (first name, middle name, last name, etc.)
    customerRegistrationPage.fillPersonalInfo();

    // Step 4: Fill out address details (address, city, state, zip)
    customerRegistrationPage.fillAddressDetails();

    // Step 5: Fill out contact information (email and phone number)
    customerRegistrationPage.fillContactDetails();

    // Step 6: Generate and set a strong password, and confirm it
    customerRegistrationPage.setPassword();

    // Step 7: Select how the user heard about the service (random suggestion)
    customerRegistrationPage.selectSuggestion();

    // Step 8: Click the proceed button, accept terms, and complete signup
    customerRegistrationPage.proceedButtonClick();

  });

});