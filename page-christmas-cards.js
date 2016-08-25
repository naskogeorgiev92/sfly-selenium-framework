function ChristmasCardsPage(helper) {
    this.closeDialogButton = By.xpath("//img[@class='x-button']");
    this.firstCard = By.id("0");
    this.personalizeButton = By.id("Cta_1155367");
    this.skipSuggestionButton = By.id("personalizeFormModalButton0");
    this.getPhotosButton = By.id("getPicturesBtnLarge");
    this.uploadButton = By.xpath("//a[contains(.,'Upload')]");
    this.myComputerButton = By.xpath("//li[contains(.,'My Computer')]");
    this.selectPhotosButton = By.xpath("//a[contains(.,'Select photos from your computer')]");
    this.shutterflyPhotosButton = By.xpath("//li[contains(.,'Shutterfly Photos')]");
    this.timelineButton = By.xpath("//li[contains(.,'Timeline')]");
    this.timelinePhotos = By.className("shrUPAlbum");
    this.firstPhoto = By.xpath("//ol/li[2]");
    this.doneButton = By.xpath(("//a[@tabindex='101']"));
    this.uploadedImage = By.id(("picturestripItem-0"));


    this.closePreviewDialog = function() {
        helper.clickElement(this.closeDialogButton, 5000);
    };

    this.personalizeCard = function() {
        helper.hover(this.firstCard);
        helper.clickElement(this.personalizeButton);
        helper.clickElement(this.skipSuggestionButton, 10000);
        helper.clickElement(this.getPhotosButton);
    };

    this.uploadPhotoAnonymous = function() {
        helper.clickElement(this.uploadButton, 5000);
        helper.waitForElement(this.selectPhotosButton, 2000);
    };

    this.uploadPhotoSigned = function() {
        helper.clickElement(this.myComputerButton, 10000);
        helper.waitForElement(this.selectPhotosButton, 2000);
    };

    this.uploadTimelinePhotoSigned = function() {
        helper.clickElement(this.shutterflyPhotosButton, 5000);
        helper.clickElement(this.timelineButton, 2000);
        helper.clickElement(this.timelinePhotos, 2000);
        helper.clickElement(this.firstPhoto, 2000);
        helper.clickElement(this.doneButton, 2000);
        helper.waitForElement(this.uploadedImage, 5000);
    };
}
