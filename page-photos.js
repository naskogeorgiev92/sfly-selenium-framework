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
    this.albumImage = By.cssSelector('div.framed_moment_media > div.img');
    this.photoToSelect = By.cssSelector('div#js_story div.framed_moment');
    this.organizeTab = [By.className('selection_actions'), By.className('edit')];
    this.moreMenu = By.className('more');
    this.date = By.xpath("//li[@class='date']");
    this.setTheDateButton = By.linkText("Set the date");
    this.selectedPhoto = By.cssSelector('div.framed_moment.selected');
    this.frameView = By.cssSelector('div.framed_moment.selected div.action_fmv');
    this.dateWrapper = By.className('date_wrap');

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
        pause(3000);
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

    this.changeDate = function(dateChange) {
        browser.clickElement(this.albumImage, 5000);
        pause(5000);
        browser.clickElement(this.photoToSelect, 5000);
        pause(5000);
        browser.clickDeepElement(this.organizeTab, 5000);
        browser.hover(this.moreMenu, 5000);
        browser.clickElement(this.date, 5000);
        browser.executeScript("$('.popover .select_wrap.year option[value="+dateChange+"]')[0].setAttribute('selected', 'selected');");
        browser.clickElement(this.setTheDateButton, 5000);
        browser.hover(this.selectedPhoto, 15000);
        pause(3000);
        browser.clickElement(this.frameView, 5000);
        assertTrue(browser.getElementText(this.dateWrapper, 5000).indexOf(dateChange) > -1);
    };
}
