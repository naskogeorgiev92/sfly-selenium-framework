var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('controller-api.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-welcome.js')));
eval(importFile(datafile('page-login.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-photos.js')));

var driver = test.openBrowser('CHROME');
var c = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(c);

var browser = new BrowserController(driver);
var api = new ApiController(c);
var csv = test.getCSV("csv.csv");
var user = csv.get(0).get("user");
var pass = csv.get(0).get("pass");
var welcomePage = new WelcomePage(browser);
var loginPage = new LoginPage(browser);
var homePage = new HomePage(browser);
var photosPage = new PhotosPage(browser);

var fileName = "gag_5.jpg";
var file = datafile(fileName);

test.beginTransaction();
test.beginStep("Upload new photo to My Photos.");

api.cleanProfile(user, pass);
var loginResponse = api.getThisLifesUser(user, pass);
api.doSignedUpload(api.getUserId(loginResponse), "MyFolder", "MyAlbum", file, fileName );

welcomePage.visit();
welcomePage.goToLogin();
loginPage.login(user, pass);
photosPage.visit();
photosPage.goToUpload();
photosPage.uploadPhoto(fileName);
photosPage.waitForSuccess();

test.endStep();
test.endTransaction();
