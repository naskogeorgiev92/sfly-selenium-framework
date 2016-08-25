var WelcomePage = function(helper) {
    this.helper = helper;
    this.url = "https://www.shutterfly.com/";
    this.loginLink = By.xpath("//span[@class='signupForm-note']/a");
    this.closeButton = By.xpath("//button[@class='modal-close']");


    this.visit = function() {
        this.helper.navigateToUrl(this.url);
    };

    this.closeWelcomeDialog = function() {
        this.helper.clickElement(this.closeButton);
    };

    this.goToLogin = function() {
        this.helper.clickElement(this.loginLink);
    };
}
