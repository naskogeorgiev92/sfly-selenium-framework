function SignUpPage(browser) {
	eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(SignUpPage.name);

    this.usernameField = By.id('userName');
    this.passwordField = By.id('password');
    this.signUpButton = By.id('signUpButton');

    this.isAt = function() {
    	logger.info("Checkign if the Sign up page is visible.");
    	var result = browser.isElementVisible(this.signUpButton);
    	if(result) {
            logger.info("The Sign up page is visible.");
    		return true;
    	} else {
            logger.info("The Sign up page isn't visible.");
    		return false;
    	}
    };
}
