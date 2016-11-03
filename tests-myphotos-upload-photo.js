var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('controller-browser.js')));
eval(importFile(datafile('controller-api.js')));
eval(importFile(datafile('controller-user.js')));
eval(importFile(datafile('Beacons.js')));
eval(importFile(datafile('page-photos.js')));

var driver = test.openBrowser('CHROME');
var client = driver.getHttpClient();
var beacons = new Beacons();
beacons.blacklist(client);

var browser = new BrowserController(driver);
var api = new ApiController(client);
var userController = new UserController(api);
var photosPage = new PhotosPage(browser);

var fileName = "gag_5.jpg";

test.beginTransaction();
test.beginStep("Upload new photo to My Photos.");

var user = userController.new();

photosPage.visit();
photosPage.login(user.username, user.password);
photosPage.goToAlbums();
photosPage.createAlbum("2016-12-15");
photosPage.uploadPhoto(fileName);
photosPage.waitForSuccess();

test.endStep();
test.endTransaction();
