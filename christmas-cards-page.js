ChristmasCardsPage = function ChristmasCardsPage(helper) {
  this.helper = helper;
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
};

ChristmasCardsPage.prototype.closePreviewDialog = function() {
  this.helper.clickElement(this.closeDialogButton);
};

ChristmasCardsPage.prototype.personalizeCard = function() {
  this.helper.hover(this.firstCard);
  this.helper.clickElement(this.personalizeButton);
  this.helper.waitAndClick(this.skipSuggestionButton, 10000);
  this.helper.clickElement(this.getPhotosButton);
};

ChristmasCardsPage.prototype.uploadPhotoAnonymous = function() {
  this.helper.clickElement(this.uploadButton);
  this.helper.waitForElement(this.selectPhotosButton, 2000);
};

ChristmasCardsPage.prototype.uploadPhotoSigned = function() {
  this.helper.waitAndClick(this.myComputerButton, 10000);
  this.helper.waitForElement(this.selectPhotosButton, 2000);
};

ChristmasCardsPage.prototype.uploadTimelinePhotoSigned = function() {
  this.helper.waitAndClick(this.shutterflyPhotosButton, 5000);
  this.helper.waitAndClick(this.timelineButton, 2000);
  this.helper.waitAndClick(this.timelinePhotos, 2000);
  this.helper.waitAndClick(this.firstPhoto, 2000);
  this.helper.waitAndClick(this.doneButton, 2000);
  this.helper.waitForElement(this.uploadedImage, 5000);
};

module.exports = ChristmasCardsPage;