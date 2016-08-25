var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('helper.js')));
eval(importFile(datafile('page-welcome.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-christmas-cards.js')));

var driver = test.openBrowser();
var c = driver.getHttpClient();
c.blacklistCommonUrls();

var helper = new Helper(driver);
var welcomePage = new WelcomePage(helper);
var homePage = new HomePage(helper);
var christmasCardsPage = new ChristmasCardsPage(helper);

test.beginTransaction();
test.beginStep("Personalize Christmas Card Anonymous");

welcomePage.visit();
welcomePage.closeWelcomeDialog();
homePage.goToChristmasCards();
christmasCardsPage.closePreviewDialog();
christmasCardsPage.personalizeCard();
christmasCardsPage.uploadPhotoAnonymous();

test.endStep();
test.endTransaction();
