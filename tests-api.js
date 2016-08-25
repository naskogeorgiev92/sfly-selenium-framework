var importFile = function(file) {
    return file.readContents() + "";
};

eval(importFile(datafile('ServiceAPI.js')));

var client = test.openHttpClient();

//var csv = test.getCSV("csv.csv");
var user = 'nasko.georgiev92@gmail.com'; //csv.get(0).get("user");
var pass = '9578437'; //csv.get(0).get("pass");

var api = new ServiceAPI(client);
var baseUrl = 'shutterfly.com';

test.beginTransaction();
test.beginStep("Starting API tests");

var user_resp_json = api.getThisLifesUser(client, user, pass);
var user_json = JSON.parse(user_resp_json.getBody());

var session_token = user_json.result.payload.sessionToken;
var life_uid = user_json.result.payload.person.life_permissions[0].life_uid;

log("Session Token: " + session_token);
log("Life UID: " + life_uid);

var moments = api.getMomentIds(client, session_token, life_uid);
api.deleteMoments(client, session_token, moments);
api.deleteAllAlbums(client, session_token, life_uid);

test.endStep();
test.endTransaction();
