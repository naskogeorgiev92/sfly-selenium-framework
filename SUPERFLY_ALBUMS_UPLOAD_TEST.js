function
import (file) {
    return file.readContents() + "";
};

eval(
    import (datafile('Sfly_Prod_Properties.js')));
var prop = new Prod();

var driver = openBrowser('CHROME');
var c = driver.getHttpClient();

eval(
    import (datafile('ServicesAPI.js')));
var api = new ServicesAPI(prop);

eval(
    import (datafile('Beacons.js')));
var beacons = new Beacons();

eval(
    import (datafile('Component.js')));
var component = new ComponentClass(driver);

eval(
    import (datafile('PhotosHeader.js')));
var tlheader = new PhotosHeader(driver, component);

eval(
    import (datafile('UserPhotoUtils.js')));
var userPhotoUtils = new UserPhotoUtils();

eval(
    import (datafile('PhotosPage.js')));
var photosPage = new PhotosPage(driver, component);

eval(
    import (datafile('_b1UserSet.js')));
var userSet = new _1UserSet();

eval(
    import (datafile('AlbumsPage.js')));
var albumsPage = new AlbumsPage(driver, component);

var userDetails = userSet.getRandomUser();
var currentUserShard = userDetails.shard;
var currentUserEmail = userDetails.user;

// Blacklist requests made to sites like Google Analytics and DoubleClick.  See the
// HttpClient.blacklistCommonUrls() documentation for a list of URLs currently blocked by
// this function.
beacons.blacklist(c);
//c.blacklistRequests('https://sockjs\\.pusher\\.com/.*', 200);
c.blacklistRequests('https://rank\\.thislife\\.com/.*', 200);
//https://rank.thislife.com

//set the vars
var currentUser = userPhotoUtils.getRandomUserDetails();

var getError = function(str) {
    return (str + " shard:" + currentUserShard + " user:" + currentUserEmail);
}

var imageDetails = userPhotoUtils.getRandomImageDetails();
var imageName = imageDetails[0];
var imageSize = imageDetails[1];

var currentImageFile = datafile(imageName);
var metaData_json;
var mediaId;
var sToken;
var life_uid;
var owner_person_uid;
var startTime = Date.now() + '';
var albumName = '04-15-2016';
var waitTime = 2000;

//Start logging HTTP traffic and timings
beginTransaction(function() {
    component.doStep('setting onboarding process via API call', function() {
        c.get("https://cdn.staticsfly.com/i/home/member/1152972_homepage_panel1_pb_MARQ_full_width_0624.jpg?user=" + currentUserEmail + "/shard=" + currentUserShard, 200);
        c.prepareForEmulatedBrowser("CHROME");

        var user_resp_json = api.getThisLifesUser(c, currentUserEmail, prop.getPassword());
        var user_json = JSON.parse(user_resp_json.getBody());
        if (!user_json["result"]["success"]) {
            throw (getError("API Login Issue "));
        }

        var session_token = user_json["result"]["payload"]["sessionToken"];
        var onboarding_status = user_json["result"]["payload"]["person"]["onboarding_status"];
        var life_uid = user_json["result"]["payload"]["person"]["life_permissions"][0]["life_uid"];
        if (onboarding_status == 0) {
            api.setOnboarding(c, session_token);
        }

        var moments = api.getMomentIds(c, session_token, life_uid);
        api.deleteMoments(c, session_token, moments);
        api.deleteAllAlbums(c, session_token, life_uid);
    });

    component.doStep('Login', function() {
        c.prepareForBrowser('CHROME');
        driver.get(component.getPhotosURL(prop));
        photosPage.signIntoPhotosUpload(currentUserEmail, prop.getPassword());
    });

    component.doStep('Create new album', function() {
        //component.sleep(5000, 'Waiting for client to be happy');
        tlheader.navigateToCreateAlbumsPage();
        albumsPage.createNewAlbum(albumName);
        component.waitForElement(10000, '.album_name', true);
    });

    component.doStep('Upload photo to album', function() {
        //component.sleep(5000, 'Waiting for client to be happy');
        albumsPage.uploadPhoto(imageName);
        //component.sleep(10000, 'Waiting for UI to load all data');
    });
});
