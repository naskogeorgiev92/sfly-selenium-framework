function CalendarsPage(browser) {
    eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(CalendarsPage.name);

    this.getStartedButton = By.linkText("Get started");
    this.signInButton = By.id("noImageMsg");

    this.pressGetStarted = function() {
        logger.info("Clicking on Get Started.");
        browser.clickElement(this.getStartedButton, 5000);
    };

    this.pressSignIn = function() {
    	logger.info("Clicking on Sign In.");
    	browser.clickElement(this.signInButton, 5000);
    };
}