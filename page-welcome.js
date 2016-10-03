function WelcomePage(browser) {
    
    this.url = "https://www.shutterfly.com/";
    this.loginLink = By.xpath("//span[@class='signupForm-note']/a");
    this.closeButton = By.className('modal-close');

    this.visit = function() {
        browser.navigateToUrl(this.url);
    };

    this.closeWelcomeDialog = function() {
        browser.clickElement(this.closeButton);
    };

    this.goToLogin = function() {
        browser.clickElement(this.loginLink);
    };
}
