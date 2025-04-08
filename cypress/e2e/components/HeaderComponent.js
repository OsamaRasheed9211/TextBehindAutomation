export default class HeaderComponent {

    get myAccountIcon() { return cy.get('img.w-40px.h-40px.h-lg-50px.w-lg-50px[alt="user-img"]'); }
    get logoutLink() { return cy.get('a.btn').contains('Sign Out'); }

    performLogout() {
        this.myAccountIcon.click();
        this.logoutLink.click();
    }

}