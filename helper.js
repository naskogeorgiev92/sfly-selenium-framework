function Helper(driver) {
    this.driver = driver;
    this.action = new Actions(this.driver);
}

var isCurrentlyVisible = function(by) {
        var elements = driver.findElements(by);
        var numberOfElements = elements.size();
        if (elements.isEmpty()) {
            return false;
        } else {
            test.log("numberOfElements: "+numberOfElements);
            for (var i=0; i<numberOfElements; i++) {
                if (!elements.get(i).isDisplayed()) {
                    return false;
                }
            }
            test.log("Found: " + by);
            return true;
        }
    };

var explicitWait = function(by, timeOut) {
    test.waitFor(function() {  
        test.log("Explicit wait for: " + by);      
        return isCurrentlyVisible(by);
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
   // element.click();
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

Helper.prototype.executeScript = function(script) {
    this.driver.executeScript(script);
};
