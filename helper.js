function Helper(driver) {
    this.action = new Actions(driver);

    var isCurrentlyVisible = function(by) {
        var elements = driver.findElements(by);
        var numberOfElements = elements.size();
        if (elements.isEmpty()) {
            return false;
        } else {
            log("numberOfElements: " + numberOfElements);
            for (var i = 0; i < numberOfElements; i++) {
                if (!elements.get(i).isDisplayed()) {
                    return false;
                }
            }
            log("Found: " + by);
            return true;
        }
    };

    var explicitWait = function(by, timeOut) {
        test.waitFor(function() {
            log("Explicit wait for: " + by);
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
        this.action.moveToElement(driver.findElement(by)).build().perform();
    };

    this.writeText = function(by, text, timeOut) {
        if (timeOut == null) {
            timeOut = 1000;
            log("Writing text without timeout.");
        }
        explicitWait(by, timeOut);
        var element = driver.findElement(by);
        element.clear();
        element.sendKeys(text);
    };

    this.navigateToUrl = function(url) {
        driver.get(url);
    };

    this.clickElement = function(by, timeOut) {
        if (timeOut == null) {
            timeOut = 1000;
            log("Clicking on element without timeout.");
        }
        explicitWait(by, timeOut);
        driver.findElement(by).click();
    };

    this.executeScript = function(script) {
        driver.executeScript(script);
    };
}
