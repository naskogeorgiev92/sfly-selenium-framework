function ApiController(client) {

    this.client = client;
    this.photosUrl = 'https://cmd.thislife.com/json';

    var validateResponse = function(response) {
        if (response == null) {
            throw ("ApiController ERROR: Failed to get response from server!");
        }
        if (response.getStatusCode() != 200) {
            throw ("ApiController ERROR: Server returned status code <" + response.getStatusCode() + ">");
        }
    };

    this.getMomentIds = function(authKey, lifeuid) {
        log("ApiController INFO: getting saved moment ids...");

        var postRequest = this.client.newPost(this.photosUrl);
        postRequest.setRequestBody(JSON.stringify({
            "method": "getChangesSince",
            "params": [
                '' + authKey,
                '' + lifeuid
            ],
            "id": null
        }));

        var response = postRequest.execute();
        validateResponse(response);

        var ids = [];
        var jsonResponse = JSON.parse(response.getBody());
        for (var i = 0; i < jsonResponse.result.payload.table_items.length; i++) {
            ids.push(jsonResponse.result.payload.table_items[i].uid);
        }
        log("ApiController INFO: Successfully got the Moment UIDs");
        return ids;
    };

    this.getThisLifesUser = function(user, pass) {
        log("ApiController INFO: getting thisLife user details for credentials: " + user + " / " + pass);

        var postRequest = this.client.newPost(this.photosUrl);
        postRequest.setRequestBody(JSON.stringify({
            "id": null,
            "method": "loginWithCredentials",
            "params": [{
                "email": '' + user,
                "password": '' + pass
            }]
        }));

        var response = postRequest.execute();
        validateResponse(response);

        log("ApiController INFO: Login successfull");
        return response;
    };

    this.deleteMoments = function(authKey, momentIds) {
        log("ApiController INFO: Deleting saved Moments...");

        var postRequest = this.client.newPost(this.photosUrl);
        postRequest.setRequestBody(JSON.stringify({
            "method": "deleteMoments",
            "params": [
                '' + authKey,
                momentIds
            ],
            "id": null
        }));

        var response = postRequest.execute();
        validateResponse(response);
        log("ApiController INFO: Deleted all moments.");
        return response;
    };

    this.deleteAllAlbums = function(authKey, lifeUid) {
        log("ApiController INFO: Deleting saved albums...");

        var postRequest = this.client.newPost(this.photosUrl);
        postRequest.setRequestBody(JSON.stringify({
            "id": null,
            "method": "album.getAlbums",
            "params": ['' + authKey,
                '' + lifeUid
            ]
        }));

        var response = postRequest.execute();

        validateResponse(response);

        var jsonResponse = JSON.parse(response.getBody());
        for (var i = 0; i < jsonResponse.result.payload.length; i++) {
            var sub_group = jsonResponse.result.payload[i];

            for (var j = i; j < sub_group.length; j++) {
                var story_uid = sub_group[j].story_uid;
                log("ApiController INFO: Found story_uid: " + story_uid);
                if ((story_uid != null) || (story_uid != undefined)) {
                    postRequest = this.client.newPost(this.photosUrl);
                    postRequest.setRequestBody(JSON.stringify({
                        "id": null,
                        "method": "album.deleteAlbum",
                        "params": ['' + authKey,
                            '' + story_uid
                        ]
                    }));

                    response = postRequest.execute();
                    validateResponse(response);
                }
            }
        }

        log("ApiController INFO: Deleted all albums.");

        return response;
    };

    this.doSignedUpload = function(uid, folder, album, file, filename) {
        var url = "https://uniup.shutterfly.com/services/shutterfly-upload/" + uid + "/images?folderTitle=" + folder + "&albumName=" + album;
        log("ApiController INFO: Performing signed upload.");

        var postRequest = client.newPost(url);
        postRequest.addFileUpload("Image.Data", file, " image/jpeg");
        postRequest.addRequestParameters({
            'Content-Type': "multipart/form-data",
            'filename': filename
        });

        var response = postRequest.execute();
        validateResponse(response);
        log("ApiController INFO: Upload was successfull.");

        return response;
    };

    this.cleanProfile = function(username, password) {
        log("ApiController INFO: Cleaning profile " + username);
        var response = this.getThisLifesUser(username, password);
        var userJson = JSON.parse(response.getBody());

        var sessionToken = userJson.result.payload.sessionToken;
        var lifeUid = userJson.result.payload.person.life_permissions[0].life_uid;
        var personUid = userJson.result.payload.person.life_permissions[0].person_uid;
        var moments = this.getMomentIds(sessionToken, lifeUid);
        this.deleteMoments(sessionToken, moments);
        this.deleteAllAlbums(sessionToken, lifeUid);
        log("ApiController INFO: Profile was cleaned successfully.");
    };

    this.getUserId = function(resp) {
        var body = JSON.parse(resp.getBody());
        return body.result.payload.person.uid;
    };
}
