/**
 * 
 */

var ServiceAPI = function(client) {

    this.client = client;

    /**
     * Split a string into chunks of the given size
     * @param  {String} string is the String to split
     * @param  {Number} size is the size you of the cuts
     * @return {Array} an Array with the strings
     */
    var splitString = function(string, size) {
        var re = new RegExp('.{1,' + size + '}', 'g');
        return string.match(re);
    }

    var getMomentsFromHex = function(hexString) {
        var ids = [];
        var arr = splitString(hexString, 79);
        log("arr: " + arr);
        for (var i = 0; i < arr.length; i++) {
            var arr1 = splitString(arr[i], 9);
            var arr1a = arr1.shift(); // remove 1st element
            var str1 = arr1.join('');
            var arr2 = splitString(str1, 16);
            ids.push(arr2[0].replace(/^[0]+/g, ""));
        }

        return ids;
    }

    //return an array of objects according to key, value, or key and value matching
    this.getObjects = function(JSONText, key, val) {
        var obj = JSON.parse(JSONText);
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
            } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
                //only add if the object is not already in the array
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
        }
        return objects;
    }

    //return an array of values that match on a certain key
    this.getValues = function(JSONText, key) {
        var obj = JSON.parse(JSONText);
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getValues(obj[i], key));
            } else if (i == key) {
                objects.push(obj[i]);
            }
        }
        return objects;
    }

    //return an array of keys that match on a certain value
    this.getKeys = function(JSONText, val) {
        var obj = JSON.parse(JSONText);
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getKeys(obj[i], val));
            } else if (obj[i] == val) {
                objects.push(i);
            }
        }
        return objects;
    }

    //return an array of values that match on a certain key
    this.getValue = function(JSONText, key) {
        var obj = JSON.parse(JSONText);
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (i == key) {
                return obj[i];
            }
        }
        return null;
    }

    this.login = function(client, appServerHost, uname, pwd) {
        var url = "http://" + appServerHost + "/nonVisualSignin/start.sfly";
        log("new url:" + url);
        log("signing with credentials: " + uname + "/" + pwd);

        var postRequest = client.newPost(url);
        postRequest.addRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        postRequest.addRequestParameters({
            userName: uname,
            password: pwd
        });

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't login with existing user, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while login with existing user, see log.");
            throw (e);
        }
        return response;
    }

    this.signInWith = function(client, appServerHost, uname, pwd) {
        var url = "https://" + appServerHost + "/forwardingSignin/start.sfly";
        log("new url:" + url);
        log("signing with credentials: " + uname + "/" + pwd);

        var postRequest = client.newPost(url);
        postRequest.addRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        postRequest.addRequestParameters({
            userName: uname,
            _rememberUserName: "on",
            rememberUserName: "true",
            password: pwd
        });

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't signIn with existing user, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while signing in with existing user, see log.");
            throw (e);
        }
        return response;
    }

    this.signUpWith = function(client, appServerHost, uname, pwd, fname, lname) {
        var url = "https://" + appServerHost + "/signup/doSignup.sfly";
        log("new url:" + url);
        log("sigining up with new credentials: " + uname + "/" + pwd);

        var postRequest = client.newPost(url);
        postRequest.addRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        postRequest.addRequestParameters({
            userName: uname,
            userName2: uname,
            password: pwd,
            password2: pwd,
            firstName: fname,
            lastName: lname,
            _receivePromos: "on",
            receivePromos: true,
            _terms: "on",
            terms: "true"
        });

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't signUp with new user, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while signing Up with new user, see log.");
            throw (e);
        }
        return response;
    }

    this.getThisLifesUser = function(client, elm, pwd) {
        log("getting thisLife user details for credentials: " + elm + " / " + pwd);
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        var body = JSON.stringify({
            "id": null,
            "method": "loginWithCredentials",
            "params": [{
                "email": elm,
                "password": pwd
            }]
        });

        postRequest.setRequestBody(body, "application/json", "UTF-8");
        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't getting thisLife user details, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting thisLife user details, see log.");
            throw (e);
        }
        return response;
    }

    //"ProcessBulkJob"
    this.checkWorkersHealth = function(client, authKey, workerType) {
        log("checking workers health...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
                "method": "worker.workerHealth",
                "params": [
                    '' + authKey,
                    '' + workerType
                ]
            }),
            "application/json",
            "UTF-8")

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't check workers health, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while checking workers health, see log.");
            throw (e);
        }
        log("...workers health checked.");

        return response;
    }

    //momentuids = an array of ids
    this.checkMomentStatus = function(client, authKey, lifeuid, momentuids) {
        log("checking Moment status, saved...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "moment.checkMomentStatus",
            "params": [
                '' + authKey,
                '' + lifeuid,
                momentuids
            ],
            "id": null
        }))

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't check Moment Status, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while checking  Moment Status:, see log.");
            throw (e);
        }

        log("Moment status checked.")

        return response;
    }

    //momentuids = returns array of ids
    this.getMomentIds = function(client, authKey, lifeuid) {
        log("getting saved moment ids...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "getChangesSince",
            "params": [
                '' + authKey,
                '' + lifeuid
            ],
            "id": null
        }))

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get moment uids, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting moment uids:, see log.");
            throw (e);
        }

        var ids = [];

        var resp_json = JSON.parse(response.getBody());
        for (var i = 0; i < resp_json.result.payload.table_items.length; i++) {
            ids.push(resp_json.result.payload.table_items[i].uid)
        }

        return ids;
    }


    //momentuids = an array of ids
    this.deleteMoments = function(client, authKey, momentuids) {
        log("delete saved Moments/photos...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "deleteMoments",
            "params": [
                '' + authKey,
                momentuids
            ],
            "id": null
        }));

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't delete saved moments, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while deleting moments:, see log.");
            throw (e);
        }

        log("Moments deleted.")

        return response;
    }

    //getPersonTagUids = returns array of ids
    this.getPersonTagUids = function(client, authKey, momentUid) {
        log("getting Person Tag Uids...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "getTags",
            "params": [
                '' + authKey,
                '' + momentUid
            ],
            "id": null
        }))

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get person tag uids, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting person tag uids:, see log.");
            throw (e);
        }

        var taguids = [];

        var resp_json = JSON.parse(response.getBody());
        for (var i = 0; i < resp_json.result.payload[momentUid].faces.length; i++) {
            taguids.push(resp_json.result.payload[momentUid].faces[i].person_tag_uid)
        }

        return taguids;
    }

    //getLocationTagUids = returns array of ids
    this.getLocationTagUids = function(client, authKey, momentUid) {
        log("getting location Tag Uids...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "getTags",
            "params": [
                '' + authKey,
                '' + momentUid
            ],
            "id": null
        }))

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get location tag uids, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting location tag uids:, see log.");
            throw (e);
        }

        var taguids = [];

        var resp_json = JSON.parse(response.getBody());
        for (var i = 0; i < resp_json.result.payload[momentUid].location_taggings.length; i++) {
            taguids.push(resp_json.result.payload[momentUid].location_taggings[i].location_tag_uid)
        }

        return taguids;
    }

    //getMomentTagIds = returns array of ids
    this.getMomentTagIds = function(client, authKey, momentUid) {
        log("getting moment tagged ids...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "getTags",
            "params": [
                '' + authKey,
                '' + momentUid
            ],
            "id": null
        }))

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get moment tag uids, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting moment tag uids:, see log.");
            throw (e);
        }

        var taguids = [];

        var resp_json = JSON.parse(response.getBody());
        for (var i = 0; i < resp_json.result.payload[momentUid].moment_taggings.length; i++) {
            taguids.push(resp_json.result.payload[momentUid].moment_taggings[i].moment_tag_uid)
        }

        return taguids;
    }

    //taggedMomentuids = an array of ids
    this.deleteTaggedMoments = function(client, authKey, taggedMomentuids) {
        log("delete delete Tagged Moments...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "deleteMomentTags",
            "params": [
                '' + authKey,
                taggedMomentuids
            ],
            "id": null
        }));

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't delete moment tagged, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while delet moment tagged:, see log.");
            throw (e);
        }

        log("moment tagged deleted.")

        return response;
    }

    this.hasAlbum = function(client, authKey, lifeuid, album) {
        log("getting saved albums...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "album.getAlbums",
            "params": [
                '' + authKey,
                '' + lifeuid
            ],
            "headers": { "X-SFLY-SubSource": "library" },
            "id": null
        }))

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get saved albums, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting saved albums:, see log.");
            throw (e);
        }

        var resp_json = JSON.parse(response.getBody());
        for (var i = 0; i < resp_json.result.payload.length; i++) {
            var sub_group = resp_json.result.payload[i];
            for (var j = i; j < sub_group.length; j++) {
                var story_name = sub_group[j]['story']['name'];
                log("story_name:" + story_name);
                if (story_name == album) {
                    return true;
                }
            }
        }

        return false;
    }

    this.deleteAllAlbums = function(client, authKey, life_uid) {
        log("delete saved albums...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "id": null,
            "method": "album.getAlbums",
            "params": ['' + authKey,
                '' + life_uid
            ]
        }));

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get saved albums, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting saved albums:, see log.");
            throw (e);
        }

        var resp_json = JSON.parse(response.getBody());
        for (var i = 0; i < resp_json.result.payload.length; i++) {
            var sub_group = resp_json.result.payload[i];

            for (var j = i; j < sub_group.length; j++) {
                var story_uid = sub_group[j]['story_uid'];
                log("story_uid: " + story_uid);
                if ((story_uid != null) || (story_uid != undefined)) {
                    var postRequest = client.newPost(url);
                    postRequest.setRequestBody(JSON.stringify({
                        "id": null,
                        "method": "album.deleteAlbum",
                        "params": ['' + authKey,
                            '' + story_uid
                        ]
                    }));

                    var response = postRequest.execute();

                    try {
                        if (response.getStatusCode() != 200) {
                            throw ("couldn't delete saved album, current status code <" + response.getStatusCode() + ">");
                        }
                    } catch (e) {
                        log("Caught NullPointer Exception while deleting saved album:, see log.");
                        throw (e);
                    }
                }
            }
        }

        log("deleted all saves albums.")

        return response;
    }


    this.deleteAlbum = function(client, authKey, life_uid, album) {
        log("delete saved albums...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "id": null,
            "method": "album.getAlbums",
            "params": ['' + authKey,
                '' + life_uid
            ]
        }));

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get saved albums, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting saved albums:, see log.");
            throw (e);
        }

        var resp_json = JSON.parse(response.getBody());
        for (var i = 0; i < resp_json.result.payload.length; i++) {
            var sub_group = resp_json.result.payload[i];

            for (var j = i; j < sub_group.length; j++) {
                var story_name = sub_group[j]['story']['name'];
                log("story_name:" + story_name);
                if (story_name == album) {
                    var story_uid = sub_group[j]['story_uid'];
                    log("story_id:" + story_uid);
                    var postRequest = client.newPost(url);
                    postRequest.setRequestBody(JSON.stringify({
                        "id": null,
                        "method": "album.deleteAlbum",
                        "params": ['' + authKey,
                            '' + story_uid
                        ]
                    }));

                    var response = postRequest.execute();

                    try {
                        if (response.getStatusCode() != 200) {
                            throw ("couldn't delete saved album, current status code <" + response.getStatusCode() + ">");
                        }
                    } catch (e) {
                        log("Caught NullPointer Exception while deleting saved album:, see log.");
                        throw (e);
                    }
                    break;
                }
            }
        }

        log("album deleted: " + album + "!")

    }

    this.getStoryId = function(client, authKey, life_uid, album) {
        log("getting story Id...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "id": null,
            "method": "album.getAlbums",
            "params": ['' + authKey,
                '' + life_uid
            ]
        }));

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get albums, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting albums:, see log.");
            throw (e);
        }

        var resp_json = JSON.parse(response.getBody());
        for (var i = 0; i < resp_json.result.payload.length; i++) {
            var sub_group = resp_json.result.payload[i];

            for (var j = i; j < sub_group.length; j++) {
                var story_name = sub_group[j]['story']['name'];
                log("story_name:" + story_name);
                if (story_name == album) {
                    return sub_group[j]['story_uid'];
                }
            }
        }
    }

    this.getStoryMoments = function(client, authKey, storyId) {
        log("getting album moments...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "id": null,
            "method": "album.getAlbum",
            "params": ['' + authKey,
                '' + storyId,
                'startupItem',
                null
            ]
        }));

        var response1 = postRequest.execute();

        try {
            if (response1.getStatusCode() != 200) {
                throw ("couldn't get Album Moments, current status code <" + response1.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while getting Album Moments:, see log.");
            throw (e);
        }

        var resp_json1 = JSON.parse(response1.getBody());
        var storyMoments = resp_json1.result.payload['moments'];
        try {
            return getMomentsFromHex(storyMoments);
        } catch (e) {
            log(storyId + " : has no moments/pictures saved.")
        }
    }

    this.deleteStoryMoments = function(client, authKey, storyId, moments) {
        log("deleting story mements...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "id": null,
            "method": "deleteStoryMoments",
            "params": ['' + authKey,
                '' + storyId,
                moments
            ]
        }));

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't delete story moments, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while deleting story moments:, see log.");
            throw (e);
        }

        return response;
    }

    this.setOnboarding = function(client, authKey) {
        log("set onboarding process...");
        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.setRequestBody(JSON.stringify({
            "method": "migration.setOnboardingDone",
            "params": [
                '' + authKey
            ],
            "headers": { "X-SFLY-SubSource": "library" },
            "id": null
        }));

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't update onboarding process, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while updating onboarding process:, see log.");
            throw (e);
        }

        log("onboarding updated.")

        return response;
    }

    //missing from testplan + in V3Image
    this.uploadOpenfly = function(client, authid, folder, album, file, filename) {
        var url = "https://up3.shutterfly.com/images-v3?X-OPENFLY-Version=1.0%3Bsflymedia%3D2.0&web33740=true";

        log("new url:" + url);

        var postRequest = client.newPost(url);
        postRequest.addFileUpload("Image.Data", file, " image/jpeg");
        postRequest.addRequestParameters({
            'Content-Type': "multipart/form-data",
            'AuthenticationID': '' + authid,
            'Image.FolderName': '' + folder,
            'Image.AlbumName': '' + album,
            'filename': '' + filename,
            'Filename': '' + filename,
            'Image.Title': '' + filename,
            'Upload': "Submit Query"
        });

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't uploading file via OpenFfly, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while uploading file via OpenFfly, see log.");
            throw (e);
        }
        return response;
    }

    this.superflyPhotosUpload = function(client, file, filename, fileSize, life_uid, owner_person_uid) {
        log("uploading photo for superfly user...")
        var url = "https://uniup.shutterfly.com/services/archive/binaries?execCallback=false&group=RAW&type=IMAGE" +
            "&extractExif=true&computePHash=false&origin=neustar_monitor_upload&name=" + filename + "&size=" + fileSize + "&channel=THISLIFE" +
            "&state=ACTIVE&collectionId=" + life_uid + "&ownerId=" + owner_person_uid + "&seedId=" + owner_person_uid;

        log("new url:" + url);

        var postRequest = client.newPost(url);
        postRequest.addFileUpload("Image", file, " image/jpeg");
        postRequest.addRequestParameters({
            'Content-Type': "multipart/form-data",
            'filename': filename,
            'Filename': filename,
            'Upload': "Submit Query"
        });

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't uploading file via photos, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while uploading, see log.");
            throw (e);
        }
        return response;
    }

    var buildPayload = function(endpoint, params) {
        log("building payload...");
        var payload = {};
        payload.method = endpoint;
        payload.params = params;

        log("Request payload" + JSON.stringify(payload));

        log("\npayload built.")
        return payload;
    }

    var buildSaveMomentPayload = function(sessionToken, lifeUId, mediaId, metaData) {
        log("building save moment payload...");
        var params = [];
        params.push(sessionToken);
        var moment = {};
        moment.moment_type = "image";
        moment.source = "html5app";
        moment.uid = mediaId;
        moment.life_uid = lifeUId;

        params.push(moment);
        params.push(metaData);

        log("save moment payload is built.")
        return buildPayload("saveMoment", params);
    }

    this.saveMoment = function(client, sessionToken, lifeUId, mediaId, metaData) {
        log("saving Moment details: " + sessionToken + " / " + lifeUId + " / " + mediaId);

        var url = "https://cmd.thislife.com/json";

        var postRequest = client.newPost(url);
        postRequest.addRequestHeader("Content-Type", "application/json");
        postRequest.setRequestBody(JSON.stringify(buildSaveMomentPayload(sessionToken, lifeUId, mediaId, metaData)));

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't save Moment details for uploaded picture, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught NullPointer Exception while save Moment details for uploaded picture, see log.");
            throw (e);
        }

        log("Moment is saved.");
        return response;
    }

    this.signOut = function(client, appServerHost) {
        var url = "https://" + appServerHost + "/signout/start.sfly";
        log("new url:" + url);

        var response = client.post(url);

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't sign out, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while signing out, see log.");
            throw (e);
        }
        return response;
    }

    this.addProductToCart = function(client, appServerHost, guid) {
        var url = "https://" + appServerHost + "/order/start.sfly";
        log("new url:" + url + " with projectGuid=" + guid);

        var response = client.post(url, {
            params: {
                projectGuid: guid
            }
        });

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't add product, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while adding product, see log.");
            throw (e);
        }
        return response;
    }

    this.viewCart = function(client, appServerHost) {
        var url = "https://" + appServerHost + "/checkout/start.sfly";
        log("new url:" + url);

        var response = client.get(url);

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't view cart, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while viewing cart, see log.");
            throw (e);
        }
        return response;
    }

    this.placeOrder = function(client, appServerHost) {
        var url = "https://" + appServerHost + "/maincart/start.sfly?cartCommand=gotoCheckOut&command=order";
        log("new url:" + url);

        var response = client.post(url);

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't place order, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while placing order, see log.");
            throw (e);
        }
        return response;
    }

    this.emptyCart = function(client, appServerHost, uid) {
        var url = "https://" + appServerHost + "/rest/ecom/cart/" + uid;
        log("new url:" + url);

        var response = client.del(url);

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't empty cart, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while emptying cart, see log.");
            throw (e);
        }
        return response;
    }

    this.cancelOrder = function(client, appServerHost, orderId) {
        var url = "https://" + appServerHost + "/account/orderdetails.jsp?oid=" + orderId + "&cancelOrder=1";
        log("new url:" + url);

        var response = client.del(url);

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't cancel order, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while cancelling order, see log.");
            throw (e);
        }

        return response;
    }

    this.getUserId = function(resp) {
        var arr = ("" + resp.getBody()).split("uid: \"");
        var res = arr[1].split("\"");
        return res[0];
    }

    this.getoauthToken = function(resp) {
        var arr = ("" + resp.getBody()).split("oauthToken: \"");
        var res = arr[1].split("\"");
        return res[0];
    }

    this.getOrderId = function(resp) {
        var arr = ("" + resp.getBody()).split("sfly?oid=");
        var res = arr[1].split("\"");
        return res[0];
    }

    this.getoflyToken = function(resp) {
        var arr = ("" + resp.getBody()).split("oflyToken: \"");
        //		log("arr.length = " + arr.length);
        //		for (i in arr) {
        //			log("arr[" + i + "] = " + arr[i]);
        //		}
        var res = arr[1].split("\"");
        return res[0];
    }

    this.getTransactionId = function(resp) {
        var arr = ("" + resp.getBody()).split("DTMC_TRANSACTION_ID");
        var res = arr[1].split("\"");
        return res[2];
    }

    this.getOrderNumber = function(resp) {
        var arr = ("" + resp.getBody()).split("orderId=");
        var res = arr[1].split("\"");
        return res[0];
    }

    this.realTimeAuth = function(client, appServerHost, uid, ccNum, tokenStr) {
        var url = "https://" + appServerHost + "/rest/ecom/cart/" + uid + "/creditCardAuth"
        log("new url:" + url);

        var response = client.post(url, {
            params: {
                last4Digits: ccNum.substring(12),
                tokenId: tokenStr
            }
        });

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get realtime auth, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while checking realTimeAuth, see log.");
            throw (e);
        }
        return response;
    }

    this.getSauceLabsStatus = function(client) {
        var url = "https://saucelabs.com/rest/v1/info/status"
        log("new url:" + url);

        var response = client.get(url);

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't get sauceLabs Status, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while getting sauceLabs Status, see log.");
            throw (e);
        }

        return response;
    }

    this.authSauceLabsUser = function(client, user, key) {
        var url = "https://" + user + ":" + key + "@saucelabs.com/rest/v1/users/" + user
        log("new url:" + url);

        var response = client.get(url);

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't auth sauceLabs user, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while authencating sauceLabs user, see log.");
            throw (e);
        }
        return response;
    }

    //covered, uncertain of endpoint
    this.doAnonymousUpload = function(client, file, filename) {
        var url = "https://uniup.shutterfly.com/UploadImage";

        log("new url:" + url);

        var postRequest = client.newPost(url);
        postRequest.addFileUpload("Image.Data", file, "image/jpg");
        postRequest.addRequestParameters({
            'Content-Type': "multipart/form-data",
            'filename': filename,
            'IsAnonymousUpload': true,
            'IncludeIID': true,
            'PartnerID': "SFLY",
            'PartnerSubID': "WEB"
        });

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't do Anonymous Upload, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while doing Anonymous Upload, see log.");
            throw (e);
        }
        return response;

    }

    this.doSignedUpload = function(client, uid, folder, album, file, filename) {
        var url = "https://uniup.shutterfly.com/services/shutterfly-upload/" + uid + "/images?folderTitle=" + folder + "&albumName=" + album;

        log("new url:" + url);

        var postRequest = client.newPost(url);
        postRequest.addFileUpload("Image.Data", file, " image/jpeg");
        postRequest.addRequestParameters({
            'Content-Type': "multipart/form-data",
            'filename': filename
        });

        var response = postRequest.execute();

        try {
            if (response.getStatusCode() != 200) {
                throw ("couldn't do signed Upload, current status code <" + response.getStatusCode() + ">");
            }
        } catch (e) {
            log("Caught Exception while doing signed Upload, see log.");
            throw (e);
        }
        return response;
    }

}
