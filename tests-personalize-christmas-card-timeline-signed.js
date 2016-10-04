var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('controller-api.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-welcome.js')));
eval(importFile(datafile('page-login.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-christmas-cards.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var csv = test.getCSV("csv.csv");
var user = csv.get(0).get("user");
var pass = csv.get(0).get("pass");

var api = new ApiController(client);
var browser = new BrowserController(driver);
var welcomePage = new WelcomePage(browser);
var loginPage = new LoginPage(browser);
var homePage = new HomePage(browser);
var christmasCardsPage = new ChristmasCardsPage(browser);

var fileName = "gag_5.jpg";
var file = datafile("gag_5.jpg");

test.beginTransaction();
test.beginStep("Personalize Christmas Card Timeline Signed");

api.cleanProfile(user, pass);
var loginResponse = api.getThisLifesUser(user, pass);
api.doSignedUpload(api.getUserId(loginResponse), "MyFolder", "MyAlbum", file, fileName );

welcomePage.visit();
welcomePage.goToLogin();
loginPage.login(user, pass);
homePage.goToChristmasCards();
christmasCardsPage.closePreviewDialog();
christmasCardsPage.personalizeCard();
christmasCardsPage.uploadTimelinePhotoSigned();
christmasCardsPage.pressDoneButton();

test.endStep();
test.endTransaction();
