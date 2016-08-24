var importFile = function (file) { 
	return file.readContents() + ""; 
};

eval(importFile(datafile('helper.js')));
eval(importFile(datafile('welcome-page.js')));
eval(importFile(datafile('login-page.js')));
eval(importFile(datafile('home-page.js')));
eval(importFile(datafile('christmas-cards-page.js')));

var driver = test.openBrowser();
var c = driver.getHttpClient();
c.blacklistCommonUrls();

var helper = new Helper(driver);
var csv = test.getCSV("csv.csv");
var user = csv.get(0).get("user");
var pass = csv.get(0).get("pass");
var welcomePage = new WelcomePage(helper);
var loginPage = new LoginPage(helper);
var homePage = new HomePage(helper);
var christmasCardsPage = new ChristmasCardsPage(helper);

test.beginTransaction();
test.beginStep("Personalize Christmas Card Timeline Signed");

welcomePage.visit();
welcomePage.goToLogin();
loginPage.login(user, pass);
homePage.goToChristmasCards();
christmasCardsPage.closePreviewDialog();
christmasCardsPage.personalizeCard();
christmasCardsPage.uploadTimelinePhotoSigned();

test.endStep();
test.endTransaction();