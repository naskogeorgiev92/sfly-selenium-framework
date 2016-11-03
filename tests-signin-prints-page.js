var importFile = function(file) {
	return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-welcome.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-prints.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var browser = new BrowserController(driver);
var welcomePage = new WelcomePage(browser);
var homePage = new HomePage(browser);
var printsPage = new PrintsPage(browser);

test.beginTransaction();
test.beginStep("Go to Prints page and sign in.");

welcomePage.visit();
welcomePage.closeWelcomeDialog();
homePage.goToPrints();
printsPage.pressGetStarted();
printsPage.pressGetPhotos();

assertTrue(printsPage.isAtSignUpScreen());

test.endStep();
test.endTransaction();