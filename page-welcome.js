function WelcomePage(browser) {
    eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(WelcomePage.name);


    this.url = "https://www.shutterfly.com/";
    this.loginLink = By.xpath("//span[@class='signupForm-note']/a");
    this.closeButton = By.className('modal-close');
    this.welcomePopup = By.id('IPEinvL');

    this.visit = function() {
        browser.navigateToUrl(this.url);
        if (browser.isElementVisible(this.welcomePopup)) {
            logger.info("Welcome Popup is visible. Refreshing the page.");
            browser.navigateToUrl(this.url);
        } else {
            logger.info("Welcome Popup isn't visible. Continuing with the test.");
        }
    };

    this.closeWelcomeDialog = function() {
        browser.clickElement(this.closeButton);
    };

    this.goToLogin = function() {
        browser.clickElement(this.loginLink);
    };
}