function LoginPage(browser) {
	
    this.usernameField = By.id('userName');
    this.passwordField = By.id('password');
    this.signInButton = By.id('signInButton');


    this.login = function(username, password) {
        browser.writeText(this.usernameField, username, 5000);
        browser.writeText(this.passwordField, password);
        browser.clickElement(this.signInButton);
    };
}
