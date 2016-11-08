var importFile = function(file) {
	return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-calendars.js')));
eval(importFile(datafile('page-signup.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var browser = new BrowserController(driver);
var homePage = new HomePage(browser);
var calendarsPage = new CalendarsPage(browser);
var signUpPage = new SignUpPage(browser);

test.beginTransaction();
test.beginStep("Go to Calendar edit page and sign in.");

homePage.visit();
homePage.closeWelcomeDialog();
homePage.goToCalendars();
calendarsPage.pressGetStarted();
calendarsPage.pressSignIn();

assertTrue(signUpPage.isAt());

test.endStep();
test.endTransaction();