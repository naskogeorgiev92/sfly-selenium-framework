var driver = test.openBrowser();
var c = driver.getHttpClient();
c.blacklistCommonUrls();

var Helper = require('./helper.js');
var helper = new Helper(driver);

var csv = test.getCSV("csv.csv");
var user = csv.get(0).get("user");
var pass = csv.get(0).get("pass");

var WelcomePage = require('./welcome-page.js');
var LoginPage = require('./login-page.js');
var HomePage = require('./home-page.js');
var ChristmasCardsPage = require('./christmas-cards-page.js');

var welcomePage = new WelcomePage(helper);
var loginPage = new LoginPage(helper);
var homePage = new HomePage(helper);
var christmasCardsPage = new ChristmasCardsPage(helper);

test.beginTransaction();
test.beginStep("Personalize Christmas Card Signed");

welcomePage.visit();
welcomePage.goToLogin();
loginPage.login(user, pass);
homePage.goToChristmasCards();
christmasCardsPage.closePreviewDialog();
christmasCardsPage.personalizeCard();
christmasCardsPage.uploadPhotoSigned();

test.endStep();
test.endTransaction();
