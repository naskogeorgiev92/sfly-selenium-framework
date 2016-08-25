var LoginPage = function(helper) {
    this.helper = helper;
    this.usernameField = By.id('userName');
    this.passwordField = By.id('password');
    this.signInButton = By.id('signInButton');


    this.login = function(username, password) {
        this.helper.writeText(this.usernameField, username, 5000);
        this.helper.writeText(this.passwordField, password);
        this.helper.clickElement(this.signInButton);
    };
}
