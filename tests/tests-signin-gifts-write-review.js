var importFile = function(file) {
	return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-photo-gifts.js')));
eval(importFile(datafile('page-signin.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var browser = new BrowserController(driver);
var homePage = new HomePage(browser);
var photoGiftsPage = new PhotoGiftsPage(browser);
var signInPage = new SignInPage(browser);

test.beginTransaction();
test.beginStep("Go to Photo Gifts page, write review and sign in.");

homePage.visit();
homePage.closeWelcomeDialog();
homePage.goToPhotoGifts();
photoGiftsPage.pressFirstSlot();
photoGiftsPage.pressFirstThumbImage();
photoGiftsPage.pressWriteReview();
		
pause(3000);
assertTrue(signInPage.isAt());

test.endStep();
test.endTransaction();