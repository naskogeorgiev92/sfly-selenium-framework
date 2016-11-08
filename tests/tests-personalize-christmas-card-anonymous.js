var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-christmas-cards.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var browser = new BrowserController(driver);
var homePage = new HomePage(browser);
var christmasCardsPage = new ChristmasCardsPage(browser);

var fileName = "07.jpg";

test.beginTransaction();
test.beginStep("Personalize Christmas Card Anonymous");

driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);

homePage.visit();
homePage.closeWelcomeDialog();
homePage.goToChristmasCards();
christmasCardsPage.closePreviewDialog();
christmasCardsPage.pressPersonalize();
christmasCardsPage.pressGetPhotos();
christmasCardsPage.pressUpload();
christmasCardsPage.uploadPhoto(fileName);
christmasCardsPage.pressDoneButton();

assertTrue(christmasCardsPage.isPhotoUploaded());

test.endStep();
test.endTransaction();
