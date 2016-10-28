function UserController(api) {

	this.new = function() {
		var username = Math.random().toString(36).substr(2, 10) + "@shutterfly.com";
		var password = Math.random().toString(36).substr(2, 10);
		api.signUp(username, password);

		var userJson = api.login(username, password);
		var token = api.getSessionToken(userJson);
		api.setOnboarding(token);

		var user = {
			username: username,
			password: password
		};

		return user;
	};
}