function PhotosPage(helper) {
    this.url = "https://photos.shutterfly.com/";
    this.uploadButton = By.linkText("Upload");
    this.selectFilesButton = By.className("file-upload-btn");
    this.inputFileField = By.cssSelector('input[type=file]:not([directory])');
    this.failureMessage = By.className("failed-sofar");

    this.visit = function() {
        helper.navigateToUrl(this.url);
    };

    this.goToUpload = function() {
        helper.clickElement(this.uploadButton, 5000);
        helper.waitForElement(this.selectFilesButton, 5000);
    };

    this.uploadPhoto = function(fileName) {
        helper.executeScript('$("input[type=file]:not([directory])")[0].style="";');
        helper.writeText(this.inputFileField, filePath(fileName), 5000);
        helper.executeScript("var e = $.Event('drop'); e.originalEvent = {dataTransfer : { files : $('input[type=file]:not([directory])').get(0).files } }; $('.dropzone-content').trigger(e);");
    };

    this.waitForFailure = function() {
        helper.waitForElement(this.failureMessage, 15000);
    };
}
