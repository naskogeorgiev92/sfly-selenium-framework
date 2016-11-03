function PrintsPage(browser) {
    eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(PrintsPage.name);

    this.getStartedButton = By.linkText("Get started");
    this.getPhotosButton = By.className("empty-photos");
    this.signInButton = By.className("signup-signin");
    this.signUpButton = By.className("signup-btn-join");


    this.pressGetStarted = function() {
        logger.info("Clicking on Get Started.");
        browser.clickElement(this.getStartedButton, 5000);
    };

    this.pressGetPhotos = function() {
    	logger.info("Clicking on Get Photos.");
    	browser.clickElement(this.getPhotosButton, 5000);
    	pause(3000);
    };

    this.isAtSignUpScreen = function() {
    	logger.info("Checking if the sign up dialog is visible.");
    	var isSignInVisible = browser.isElementVisible(this.signInButton);
    	var isSignUpVisible = browser.isElementVisible(this.signUpButton);
    	
    	if(isSignInVisible && isSignUpVisible) {
    		logger.info("The sign up dialog is visible.");
    		return true;
    	} else {
    		logger.info("The sign up dialog isn't visible.");
    		return false;
    	}
    };
}