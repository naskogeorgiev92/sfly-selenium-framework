function LoginPage(helper) {
    this.usernameField = By.id('userName');
    this.passwordField = By.id('password');
    this.signInButton = By.id('signInButton');


    this.login = function(username, password) {
        helper.writeText(this.usernameField, username, 5000);
        helper.writeText(this.passwordField, password);
        helper.clickElement(this.signInButton);
    };
}
