function SignInPage(browser) {
	eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(SignInPage.name);

    this.usernameField = By.id('userName');
    this.passwordField = By.id('password');
    this.signInButton = By.id('signInButton');


    this.login = function(username, password) {
        browser.writeText(this.usernameField, username, 5000);
        browser.writeText(this.passwordField, password);
        browser.clickElement(this.signInButton);
    };

    this.isAt = function() {
    	logger.info("Checking if the Sign in page is visible.");
    	var result = browser.isElementVisible(this.signInButton);
    	if(result) {
            logger.info("The Sign in page is visible.");
    		return true;
    	} else {
            logger.info("The Sign in page isn't visible.");
    		return false;
    	}
    };
}
