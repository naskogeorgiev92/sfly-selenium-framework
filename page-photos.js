function PhotosPage(browser) {
    
    this.url = "https://photos.shutterfly.com/";
    this.uploadButton = By.linkText("Upload");
    this.selectFilesButton = By.className("file-upload-btn");
    this.inputFileField = By.cssSelector('input[type=file]:not([directory])');
    this.failureMessage = By.className("failed-sofar");
    this.successMessage = By.className("upload-success-message");

    this.visit = function() {
        browser.navigateToUrl(this.url);
    };

    this.goToUpload = function() {
        browser.clickElement(this.uploadButton, 5000);
        browser.waitForElement(this.selectFilesButton, 5000);
    };

    this.uploadPhoto = function(fileName) {
        browser.executeScript('$("input[type=file]:not([directory])")[0].style="";');
        var absolutePath = filePath(fileName);
        test.log('path: ' + absolutePath);
        test.log('name: ' + fileName);
        browser.writeText(this.inputFileField, absolutePath, 5000);
        browser.executeScript("var e = $.Event('drop'); e.originalEvent = {dataTransfer : { files : $('input[type=file]:not([directory])').get(0).files } }; $('.dropzone-content').trigger(e);");
    };

    this.waitForFailure = function() {
        browser.waitForElement(this.failureMessage, 15000);
    };

    this.waitForSuccess = function() {
        browser.waitForElement(this.successMessage, 15000);
    };
}
