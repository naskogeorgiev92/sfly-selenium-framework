function ChristmasCardsPage(browser) {
    
    this.closeDialogButton = By.className('x-button');
    this.firstCard = By.id("0");
    this.personalizeButton = By.linkText("Personalize");
    this.skipSuggestionButton = By.id("personalizeFormModalButton0");
    this.getPhotosButton = By.id("getPicturesBtnLarge");
    this.uploadButton = By.linkText('Upload');
    this.myComputerButton = By.className('shrUPMC');
    this.selectPhotosButton = By.linkText('Select photos from your computer');
    this.shutterflyPhotosButton = By.className('shrUPSFLY');
    this.timelineButton = By.className('shrTLTimelineFolder');
    this.timelinePhotos = By.className("shrUPAlbum");
    this.firstPhoto = [By.className('shrUPG'), By.tagName('img')];
    this.doneButton = [By.className('shrUPNB'), By.linkText('Done')];
    this.uploadedImage = By.id(("picturestripItem-0"));
    this.inputFileField = By.cssSelector('input[type=file]');

    this.closePreviewDialog = function () {
        browser.clickElement(this.closeDialogButton, 5000);
    };

    this.personalizeCard = function () {
        browser.hover(this.firstCard);
        browser.clickElement(this.personalizeButton, 5000);
        browser.clickElement(this.skipSuggestionButton, 10000);
        browser.clickElement(this.getPhotosButton);
    };

    this.uploadPhotoAnonymous = function (fileName) {
        browser.clickElement(this.uploadButton, 10000);
        browser.waitForElement(this.selectPhotosButton, 5000);
        this.uploadPhoto(fileName);
    };

    this.uploadPhotoSigned = function (fileName) {
        browser.clickElement(this.myComputerButton, 10000);
        browser.waitForElement(this.selectPhotosButton, 5000);
        this.uploadPhoto(fileName);
    };

    this.uploadTimelinePhotoSigned = function () {
        browser.clickElement(this.shutterflyPhotosButton, 10000);
        browser.clickElement(this.timelineButton, 5000);
        browser.clickDeepElement(this.firstPhoto, 5000);
    };

    this.uploadPhoto = function (fileName) {
        browser.executeScript('a = $("input[type=file]"); a.removeClass("shrMCITF");');
        var absolutePath = filePath(fileName);
        browser.writeText(this.inputFileField, absolutePath, 5000);
    };

    this.pressDoneButton = function() {
        browser.clickDeepElement(this.doneButton, 10000);
        browser.waitForElement(this.uploadedImage, 5000);
    };

}
