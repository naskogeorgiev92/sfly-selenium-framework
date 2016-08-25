var PhotosPage = function(helper) {
    this.helper = helper;
    this.uploadButton = By.linkText("Upload");
    this.selectFilesButton = By.className("file-upload-btn");
    this.inputFileField = By.cssSelector('input[type=file]:not([directory])');
    this.failureMessage = By.className("failed-sofar");


    this.goToUpload = function() {
        this.helper.clickElement(this.uploadButton, 5000);
        this.helper.waitForElement(this.selectFilesButton, 5000);
    };

    this.uploadPhoto = function(fileName) {
        this.helper.executeScript('$("input[type=file]:not([directory])")[0].style="";');
        this.helper.writeText(this.inputFileField, filePath(fileName), 5000);
        this.helper.executeScript("var e = $.Event('drop'); e.originalEvent = {dataTransfer : { files : $('input[type=file]:not([directory])').get(0).files } }; $('.dropzone-content').trigger(e);");
    };

    this.waitForFailure = function() {
        this.helper.waitForElement(this.failureMessage, 15000);
    };
}
