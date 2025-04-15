// Page Object Model class for handling the header section functionalities like user account and logout
export default class HeaderComponent {

    /**
     * Getter for the "My Account" icon in the header.
     * This is usually a user avatar image that opens a dropdown or account menu when clicked.
     */
    get myAccountIcon() { 
        return cy.get('img.w-40px.h-40px.h-lg-50px.w-lg-50px[alt="user-img"]'); 
    }

    /**
     * Getter for the "Sign Out" link/button that appears in the account dropdown.
     * Uses contains to match the button text dynamically.
     */
    get logoutLink() { 
        return cy.get('a.btn').contains('Sign Out'); 
    }

    /**
     * Performs logout by clicking on the account icon and then the sign-out link.
     * Can be reused in multiple test cases wherever user logout is needed.
     */
    performLogout() {
        this.myAccountIcon.click();
        this.logoutLink.click();
    }
}