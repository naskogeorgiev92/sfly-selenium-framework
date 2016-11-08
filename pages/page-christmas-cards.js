function ChristmasCardsPage(browser) {
    eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(ChristmasCardsPage.name);
    
    this.closeDialogButton = By.className('x-button');
    this.firstCard = By.id("0");
    this.personalizeButton = By.linkText("Personalize");
    this.skipSuggestionButton = By.id("personalizeFormModalButton0");
    this.getPhotosButton = By.id("getPicturesBtnLarge");
    this.uploadButton = By.linkText('Upload');
    this.myComputerButton = By.className('shrUPMC');
    this.shutterflyPhotosButton = By.className('shrUPSFLY');
    this.albumsButton = By.className('shrTLAlbumsFolder');
    this.timelineButton = By.className('shrTLTimelineFolder');
    this.timelinePhotos = By.className("shrUPAlbum");
    this.firstPhoto = [By.className('shrUPG'), By.tagName('img')];
    this.doneButton = [By.className('shrUPNB'), By.linkText('Done')];
    this.newDoneButton = By.id("shrUPBinDone");
    this.uploadedImage = By.id(("picturestripItem-0"));
    this.inputFileField = By.cssSelector('input[type=file]');
    this.uploadDialogTitle = By.className("shrUPSnapSrc");
    this.progressBar = By.className("shrPB");

    this.closePreviewDialog = function () {
        logger.info("Closing the Preview dialog.");
        browser.clickElement(this.closeDialogButton, 5000);
    };

    this.pressPersonalize = function() {
        logger.info("Pressing Personalize on the first product.");
        browser.hover(this.firstCard);
        browser.clickElement(this.personalizeButton, 5000);
        browser.clickElement(this.skipSuggestionButton, 10000);
    };

    this.pressGetPhotos = function () {
        logger.info("Pressing Get photos.");
        browser.clickElement(this.getPhotosButton, 3000);
    };

    this.pressUpload = function () {
        logger.info("Pressing Upload button.");
        browser.clickElement(this.uploadButton, 10000);
        pause(2000);
    };    

    this.uploadPhotoSigned = function (fileName) {
        browser.clickElement(this.myComputerButton, 10000);
        browser.waitForElement(this.selectPhotosButton, 5000);
        this.uploadPhoto(fileName);
    };

    this.uploadTimelinePhotoSigned = function () {
        browser.clickElement(this.shutterflyPhotosButton, 10000);
        browser.clickElement(this.timelineButton, 5000);
        pause(5000);
        browser.clickDeepElement(this.firstPhoto, 5000);
    };

    this.uploadAlbumsPhotoSigned = function () {
        browser.clickElement(this.shutterflyPhotosButton, 10000);
        browser.clickElement(this.albumsButton, 5000);
        browser.clickDeepElement(this.firstPhoto, 5000);
    };

    this.uploadPhoto = function (fileName) {
        browser.executeScript('a = $("input[type=file]"); a.removeClass("shrMCITF");');
        browser.writeText(this.inputFileField, filePath(fileName), 5000);
    };

    this.pressDoneButton = function() {
        logger.info("Pressing the Done button.");

        //Location of the photo thumbnail -> class="shrUPBin " li[1]
        pause(3000);
        if(this.checkForNewUI()) {
            browser.clickElement(this.newDoneButton);
        } else {
            browser.clickDeepElement(this.doneButton, 10000);
        }
        this.waitUntilUploaded();
        //pause(30000);
        //browser.waitForElement(this.uploadedImage, 5000);
        //pause(3000);
    };

    this.checkForNewUI = function() {
        logger.info("Checking for the new upload UI.");
        var result = browser.isElementVisible(this.newDoneButton);
        if(result) {
            logger.info("The new UI is loaded.");
        } else {
            logger.info("The old UI is loaded.");
        }
        return result;
    };

    this.waitUntilUploaded = function() {
        logger.info("Checking if the upload progress bar is visible.");
        var isVisible = browser.isElementVisible(this.progressBar);
        if(isVisible) {
            pause(1000);
            this.waitUntilUploaded();
        }
    };

    this.isPhotoUploaded = function() {
        logger.info("Checking if the photo has been uploaded.");
        return browser.isElementVisible(this.uploadedImage);
    };
}
