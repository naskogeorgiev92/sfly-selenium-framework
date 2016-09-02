var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('helper.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-welcome.js')));
eval(importFile(datafile('page-login.js')));
eval(importFile(datafile('page-home.js')));
eval(importFile(datafile('page-photos.js')));

var driver = test.openBrowser('CHROME');
var c = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(c);

var helper = new Helper(driver);
var csv = test.getCSV("csv.csv");
var user = csv.get(0).get("user");
var pass = csv.get(0).get("pass");
var fileName = "C://pic.jpg";
var welcomePage = new WelcomePage(helper);
var loginPage = new LoginPage(helper);
var homePage = new HomePage(helper);
var photosPage = new PhotosPage(helper);

test.beginTransaction();
test.beginStep("Upload of a repeating photo should be skipped");

welcomePage.visit();
welcomePage.goToLogin();
loginPage.login(user, pass);
//homePage.goToMyPhotos();
photosPage.visit();
photosPage.goToUpload();
photosPage.uploadPhoto(fileName);
photosPage.waitForFailure();

test.endStep();
test.endTransaction();
