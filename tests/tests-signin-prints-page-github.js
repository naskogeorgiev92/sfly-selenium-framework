eval(datafile('controller-file.js').readContents() + "");

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var fileController = new FileController(client);


eval(fileController.getFile('controller-browser.js'));
eval(fileController.getFile('Beacons.js'));
eval(fileController.getFile('page-home.js'));
eval(fileController.getFile('page-prints.js'));


var beacons = new Beacons();
beacons.blacklist(client);

var browser = new BrowserController(driver);
var homePage = new HomePage(browser);
var printsPage = new PrintsPage(browser);

test.beginTransaction();
test.beginStep("Go to Prints page and sign in.");

homePage.visit();
homePage.closeWelcomeDialog();
homePage.goToPrints();
printsPage.pressGetStarted();
printsPage.pressGetPhotos();

assertTrue(printsPage.isAtSignUpScreen());

test.endStep();
test.endTransaction();