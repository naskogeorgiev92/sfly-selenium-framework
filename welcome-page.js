function WelcomePage(helper) {
    this.helper = helper;
    this.url = "https://www.shutterfly.com/";
    this.loginLink = By.xpath("//span[@class='signupForm-note']/a");
    this.closeButton = By.xpath("//button[@class='modal-close']");
}

WelcomePage.prototype.visit = function() {
    this.helper.navigateToUrl(this.url);
};

WelcomePage.prototype.closeWelcomeDialog = function() {
    this.helper.clickElement(this.closeButton);
};

WelcomePage.prototype.goToLogin = function() {
    this.helper.clickElement(this.loginLink);
};
