var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('controller-api.js')));
eval(importFile(datafile('controller-user.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-signin.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-christmas-cards.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var api = new ApiController(client);
var userController = new UserController(api);
var browser = new BrowserController(driver);
var signInPage = new SignInPage(browser);
var homePage = new HomePage(browser);
var christmasCardsPage = new ChristmasCardsPage(browser);

var fileName = "gag_5.jpg";
var file = datafile("gag_5.jpg");

test.beginTransaction();
test.beginStep("Personalize Christmas Card Timeline Signed");

var user = userController.new();
api.doSignedUpload(user.username, user.password, "My Albums", "MyAlbum", file);

homePage.visit();
homePage.goToLogin();
signInPage.login(user.username, user.password);
homePage.goToChristmasCards();
christmasCardsPage.closePreviewDialog();
christmasCardsPage.personalizeCard();
christmasCardsPage.uploadAlbumsPhotoSigned();
christmasCardsPage.pressDoneButton();

test.endStep();
test.endTransaction();
