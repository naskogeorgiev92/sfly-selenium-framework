var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('controller-api.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-photos.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var browser = new BrowserController(driver);
var api = new ApiController(client);
var csv = test.getCSV("csv.csv");
var user = csv.get(0).get("user");
var pass = csv.get(0).get("pass");
var photosPage = new PhotosPage(browser);

var fileName = "gag_5.jpg";
var file = datafile("gag_5.jpg");

test.beginTransaction();
test.beginStep("Change date of image in My Photos.");

api.cleanProfile(user, pass);
api.doSignedUpload(user, pass, "MyFolder", "MyAlbum", file);

photosPage.visit();
photosPage.login(user, pass);
photosPage.goToAlbums();
photosPage.changeDate("2000");

test.endStep();
test.endTransaction();
