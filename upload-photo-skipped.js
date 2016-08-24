var driver = test.openBrowser();
var c = driver.getHttpClient();
c.blacklistCommonUrls();

var Helper = require('./helper.js');
var helper = new Helper(driver);

var csv = test.getCSV("csv.csv");
var user = csv.get(0).get("user");
var pass = csv.get(0).get("pass");
var fileName = "C://pic.jpg";

var WelcomePage = require('./welcome-page.js');
var LoginPage = require('./login-page.js');
var HomePage = require('./home-page.js');
var PhotosPage = require('./photos-page.js');

var welcomePage = new WelcomePage(helper);
var loginPage = new LoginPage(helper);
var homePage = new HomePage(helper);
var photosPage = new PhotosPage(helper);

test.beginTransaction();
test.beginStep("Upload of repeating photo will be skipped");

welcomePage.visit();
welcomePage.goToLogin();
loginPage.login(user, pass);
homePage.goToMyPhotos();
photosPage.goToUpload();
photosPage.uploadPhoto(fileName);
photosPage.waitForFailure();

test.endStep();
test.endTransaction();