function PhotosPage(browser) {
    
    this.url = "https://photos.shutterfly.com/";
    this.usernameField = By.id('login_username');
    this.passwordField = By.id('login_password');
    this.signInButton = By.linkText('Sign in');
    this.headerText = By.className("header-text");
    this.albumsButton = By.cssSelector('div.primary_btns_left > div.primary_btn.albums');
    this.albumNameInput = By.id('album-name');
    this.createButton = By.xpath("//a[contains(.,'Create')]");
    this.uploadButton = By.linkText("Upload");
    this.selectFilesButton = By.className("file-upload-btn");
    this.inputFileField = By.cssSelector('input[type=file]:not([directory])');
    this.failureMessage = By.className("failed-sofar");
    this.successMessage = By.className("upload-success-message");

    this.visit = function() {
        browser.navigateToUrl(this.url);
    };

    this.login = function(username, password) {
        browser.writeText(this.usernameField, username, 5000);
        browser.writeText(this.passwordField, password);
        browser.clickElement(this.signInButton);
    };

    this.goToAlbums = function() {
        browser.waitForElement(this.headerText, 15000);
        browser.clickElement(this.albumsButton, 5000);        
    };

    this.createAlbum = function(albumName) {
        browser.writeText(this.albumNameInput, albumName, 15000);
        browser.clickElement(this.createButton, 5000);
    };

    this.goToUpload = function() {
        browser.clickElement(this.uploadButton, 15000);
        browser.waitForElement(this.selectFilesButton, 5000);
    };

    this.uploadPhoto = function(fileName) {
        browser.executeScript('$("input[type=file]:not([directory])")[0].style="";');
        browser.writeText(this.inputFileField, filePath(fileName), 5000);
        browser.executeScript("var e = $.Event('drop'); e.originalEvent = {dataTransfer : { files : $('input[type=file]:not([directory])').get(0).files } }; $('.dropzone-content').trigger(e);");
    };

    this.waitForFailure = function() {
        browser.waitForElement(this.failureMessage, 15000);
    };

    this.waitForSuccess = function() {
        browser.waitForElement(this.successMessage, 15000);
    };
}
