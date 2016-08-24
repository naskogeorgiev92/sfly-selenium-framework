var driver = test.openBrowser();
var c = driver.getHttpClient();
c.blacklistCommonUrls();

var Helper = require('./helper.js');
var helper = new Helper(driver);

var WelcomePage = require('./welcome-page.js');
var HomePage = require('./home-page.js');
var ChristmasCardsPage = require('./christmas-cards-page.js');

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