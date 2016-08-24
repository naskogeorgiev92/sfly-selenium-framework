PhotosPage = function PhotosPage(helper) {
    this.helper = helper;
    this.uploadButton = By.linkText("Upload");
    this.selectFilesButton = By.className("file-upload-btn");
    this.inputFileField = By.cssSelector('input[type=file]:not([directory])');
    this.failureMessage = By.className("failed-sofar");
};

PhotosPage.prototype.goToUpload = function() {
    this.helper.waitAndClick(this.uploadButton, 5000);
    this.helper.waitForElement(this.selectFilesButton, 5000);
};

PhotosPage.prototype.uploadPhoto = function(fileName) {
    this.helper.executeScript('$("input[type=file]:not([directory])")[0].style="";');
    this.helper.waitForElement(this.inputFileField, 5000);
    this.helper.writeText(this.inputFileField, filePath(fileName));
    this.helper.executeScript("var e = $.Event('drop'); e.originalEvent = {dataTransfer : { files : $('input[type=file]:not([directory])').get(0).files } }; $('.dropzone-content').trigger(e);");
};

PhotosPage.prototype.waitForFailure = function() {
    this.helper.waitForElement(this.failureMessage, 15000);
};

module.exports = PhotosPage;
