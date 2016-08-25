var Helper = function(driver) {
    this.driver = driver;
    this.action = new Actions(this.driver);


    var isCurrentlyVisible = function(by) {
        var elements = driver.findElements(by);
        var numberOfElements = elements.size();
        if (elements.isEmpty()) {
            return false;
        } else {
            test.log("numberOfElements: " + numberOfElements);
            for (var i = 0; i < numberOfElements; i++) {
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

    this.waitForElement = function(by, timeOut) {
        explicitWait(by, timeOut);
    };

    this.hover = function(by, timeOut) {
        if (timeOut == null) {
            timeOut = 1000;
            log("Hovering without timeout.");
        }
        explicitWait(by, timeOut);
        this.action.moveToElement(this.driver.findElement(by)).build().perform();
    };

    this.writeText = function(by, text, timeOut) {
        if (timeOut == null) {
            timeOut = 1000;
            log("Writing text without timeout.");
        }
        explicitWait(by, timeOut);
        var element = this.driver.findElement(by);
        element.clear();
        element.sendKeys(text);
    };

    this.navigateToUrl = function(url) {
        this.driver.get(url);
    };

    this.clickElement = function(by, timeOut) {
        if (timeOut == null) {
            timeOut = 1000;
            log("Clicking on element without timeout.");
        }
        explicitWait(by, timeOut);
        this.driver.findElement(by).click();
    };

    this.executeScript = function(script) {
        this.driver.executeScript(script);
    };
}
