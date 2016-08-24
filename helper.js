Helper = function Helper(driver) {
    this.driver = driver;
    this.action = new Actions(this.driver);
};

var isElementPresent = function(by) {
    try {
        this.driver.findElement(by);
        return true;
    } catch (e) {
        return false;
    }
};

var explicitWait = function(by, timeOut) {
    test.waitFor(function() {
        test.log("Explicit wait for: " + by);
        return isElementPresent(by);
    }, timeOut);
};

Helper.prototype.waitForElement = function(by, timeOut) {
    explicitWait(by, timeOut);
};

Helper.prototype.hover = function(by) {
    this.action.moveToElement(this.driver.findElement(by)).build().perform();
};

Helper.prototype.writeText = function(by, text) {
    var element = this.driver.findElement(by);
    element.clear();
    element.click();
    element.sendKeys(text);
};

Helper.prototype.navigateToUrl = function(url) {
    this.driver.get(url);
};

Helper.prototype.clickElement = function(by) {
    this.driver.findElement(by).click();
};

Helper.prototype.waitAndClick = function(by, timeOut) {
    explicitWait(by, timeOut);
    this.driver.findElement(by).click();
};

module.exports = Helper;
