/*import CustomerRegistrationPage from "../../pages/CustomerRegistration.cy";


describe('Customer FNF SignUp', () => {
  const customerRegistrationPage = new CustomerRegistrationPage();

  it('Happy flow of customer fnf signup', () => {
    
    //cy.intercept('POST', 'https://www.google.com/recaptcha/api/siteverify', {
    //  statusCode: 200,
   //   body: { success: true, score: 0.9 },
   // }).as('googleRecaptcha');
   
    customerRegistrationPage.visit('/register', 'customer', 'staging');

    customerRegistrationPage.clickFnFButton();

    customerRegistrationPage.fillPersonalInfo();
    customerRegistrationPage.fillAddressDetails();
    customerRegistrationPage.fillContactDetails();

    customerRegistrationPage.setPassword();
    customerRegistrationPage.selectSuggestion();

    customerRegistrationPage.acceptTermsAndConditions();
    customerRegistrationPage.clickAgreeAndSignUp();

   // cy.wait('@googleRecaptcha');

  });
});

*/

import CustomerRegistrationPage from "../../pages/CustomerRegistration.cy";

describe('CustomerFNFSignUp', () => {
  let customerRegistrationPage;
  customerRegistrationPage = new CustomerRegistrationPage();
/*
  before(() => {
    // Intercept and mock reCAPTCHA API response
    cy.intercept('POST', 'https://www.google.com/recaptcha/api/siteverify', (req) => {
      console.log('Intercepted reCAPTCHA request:', req);
      req.reply({ success: true, score: 0.9 });
    }).as('recaptchaVerify');
  });

  beforeEach(() => {
    // Mock `grecaptcha.execute` function
    cy.window().then((win) => {
      win.grecaptcha = {
        execute: () => {
          console.log('Mock reCAPTCHA execute called');
          return Promise.resolve('mock-recaptcha-token');
        },
      };
    });

    // Initialize the page object
    customerRegistrationPage = new CustomerRegistrationPage();
  });*/

  it('HappyflowofcustomerFNFsignup', () => {
    // Visit the registration page
    customerRegistrationPage.visit('/register', 'customer', 'qa');

    // Simulate form interactions
    customerRegistrationPage.clickFnFButton();
    customerRegistrationPage.fillPersonalInfo();
    customerRegistrationPage.fillAddressDetails();
    customerRegistrationPage.fillContactDetails();
    customerRegistrationPage.setPassword();
    customerRegistrationPage.selectSuggestion();
    customerRegistrationPage.acceptTermsAndConditions();
    customerRegistrationPage.clickAgreeAndSignUp();
    /*
   // Wait for the reCAPTCHA request and verify the response
    cy.wait('@recaptchaVerify', { timeout: 10000 }).then((interception) => {
      expect(interception.response.body.success).to.be.true;
    });*/
  });
});







