var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('controller-api.js')));
eval(importFile(datafile('controller-user.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-welcome.js')));
eval(importFile(datafile('page-login.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-christmas-cards.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var browser = new BrowserController(driver);
var api = new ApiController(client);
var userController = new UserController(api);
var welcomePage = new WelcomePage(browser);
var loginPage = new LoginPage(browser);
var homePage = new HomePage(browser);
var christmasCardsPage = new ChristmasCardsPage(browser);

var fileName = "07.jpg";

test.beginTransaction();
test.beginStep("Personalize Christmas Card Signed");

var user = userController.new();

welcomePage.visit();
welcomePage.goToLogin();
loginPage.login(user.username, user.password);
homePage.goToChristmasCards();
christmasCardsPage.closePreviewDialog();
christmasCardsPage.personalizeCard();
christmasCardsPage.uploadPhotoSigned(fileName);
christmasCardsPage.pressDoneButton();

test.endStep();
test.endTransaction();
