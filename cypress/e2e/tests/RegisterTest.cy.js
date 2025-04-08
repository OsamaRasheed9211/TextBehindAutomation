import CustomerRegistrationPage from "../pages/RegisterPage";

describe('Customer FNF SignUp', () => {
  
  const customerRegistrationPage = new CustomerRegistrationPage();

  it('Complete Sign-Up Process for FnF User', () => {
    
    customerRegistrationPage.open();

    customerRegistrationPage.clickFnFButton();

    customerRegistrationPage.fillPersonalInfo();
    customerRegistrationPage.fillAddressDetails();
    customerRegistrationPage.fillContactDetails();

    customerRegistrationPage.setPassword();
    customerRegistrationPage.selectSuggestion();
    customerRegistrationPage.proceedButtonClick();

  });
});