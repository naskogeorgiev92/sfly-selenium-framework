function ChristmasCardsPage(helper) {
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
    this.inputFileField = By.cssSelector('input[type=file]:not([directory])');

    this.closePreviewDialog = function () {
        helper.clickElement(this.closeDialogButton, 5000);
    };

    this.personalizeCard = function () {
        helper.hover(this.firstCard);
        helper.clickElement(this.personalizeButton, 2000);
        helper.clickElement(this.skipSuggestionButton, 10000);
        helper.clickElement(this.getPhotosButton);
    };

    this.uploadPhotoAnonymous = function (fileName) {
        helper.clickElement(this.uploadButton, 5000);
        helper.waitForElement(this.selectPhotosButton, 2000);
        this.uploadPhoto(fileName);
    };

    this.uploadPhotoSigned = function (fileName) {
        helper.clickElement(this.myComputerButton, 10000);
        helper.waitForElement(this.selectPhotosButton, 2000);
        this.uploadPhoto(fileName);
    };

    this.uploadTimelinePhotoSigned = function () {
        helper.clickElement(this.shutterflyPhotosButton, 5000);
        helper.clickElement(this.timelineButton, 2000);
        helper.clickElement(this.timelinePhotos, 2000);
        helper.clickDeepElement(this.firstPhoto, 5000);
        helper.clickDeepElement(this.doneButton, 2000);
        helper.waitForElement(this.uploadedImage, 5000);
    };

    this.uploadPhoto = function (fileName) {
        helper.executeScript('a = $("input[type=file]"); a.removeClass("shrMCITF");');
        helper.writeText(this.inputFileField, filePath(fileName), 5000);
        helper.executeScript("var e = $.Event('change'); e.originalEvent = {dataTransfer : { files : $('input[type=file]').get(0).files } }; $('input[type=file]').get(0).trigger(e);");
    }
}
