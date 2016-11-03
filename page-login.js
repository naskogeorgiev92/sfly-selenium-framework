function LoginPage(browser) {
	eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(LoginPage.name);

    this.usernameField = By.id('userName');
    this.passwordField = By.id('password');
    this.signInButton = By.id('signInButton');


    this.login = function(username, password) {
        browser.writeText(this.usernameField, username, 5000);
        browser.writeText(this.passwordField, password);
        browser.clickElement(this.signInButton);
    };

    this.isAt = function() {
    	logger.info("Checkign if the Login page is visible.");
    	var result = browser.isElementVisible(this.signInButton);
    	if(result) {
    		return true;
    	} else {
    		return false;
    	}
    };
}
