var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('page-welcome.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-christmas-cards.js')));

var driver = test.openBrowser('CHROME');
var c = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(c);

var browser = new BrowserController(driver);
var welcomePage = new WelcomePage(browser);
var homePage = new HomePage(browser);
var christmasCardsPage = new ChristmasCardsPage(browser);

var fileName = "gag_5.jpg";

test.beginTransaction();
test.beginStep("Personalize Christmas Card Anonymous");

welcomePage.visit();
welcomePage.closeWelcomeDialog();
homePage.goToChristmasCards();
christmasCardsPage.closePreviewDialog();
christmasCardsPage.personalizeCard();
christmasCardsPage.uploadPhotoAnonymous(fileName);
christmasCardsPage.pressDoneButton();

test.endStep();
test.endTransaction();
