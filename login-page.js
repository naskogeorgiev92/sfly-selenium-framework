function LoginPage(helper) {
	this.helper = helper;
	this.usernameField = By.id('userName');
	this.passwordField = By.id('password');
	this.signInButton = By.id('signInButton');
}

LoginPage.prototype.login = function(username, password) {
	this.helper.waitForElement(this.usernameField, 5000);
	this.helper.writeText(this.usernameField, username);
	this.helper.writeText(this.passwordField, password);
	this.helper.clickElement(this.signInButton);
};