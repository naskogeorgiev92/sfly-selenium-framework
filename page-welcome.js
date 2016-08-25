function WelcomePage(helper) {
    this.url = "https://www.shutterfly.com/";
    this.loginLink = By.xpath("//span[@class='signupForm-note']/a");
    this.closeButton = By.className('modal-close');

    this.visit = function() {
        helper.navigateToUrl(this.url);
    };

    this.closeWelcomeDialog = function() {
        helper.clickElement(this.closeButton);
    };

    this.goToLogin = function() {
        helper.clickElement(this.loginLink);
    };
}
