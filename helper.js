function Helper(driver) {
    this.action = new Actions(driver);

    var isCurrentlyVisible = function (by) {
        var elements = driver.findElements(by);
        var numberOfElements = elements.size();
        if (elements.isEmpty()) {
            return false;
        } else {
            log("numberOfElements: " + numberOfElements);
            for (var i = 0; i < numberOfElements; i++) {
                if (!elements.get(i).isDisplayed() || !elements.get(i).isEnabled()) {
                    return false;
                }
            }
            log("Found: " + by);
            return true;
        }
    };

    var explicitWait = function (by, timeOut) {
        if (timeOut == null) {
            timeOut = 3000;
        }
        test.waitFor(function () {
            log("Explicit wait for: " + by);
            return isCurrentlyVisible(by);
        }, timeOut);
    };

    this.waitForElement = function (by, timeOut) {
        explicitWait(by, timeOut);
    };

    this.hover = function (by, timeOut) {
        explicitWait(by, timeOut);
        this.action.moveToElement(driver.findElement(by)).build().perform();
    };

    this.writeText = function (by, text, timeOut) {
        explicitWait(by, timeOut);
        var element = driver.findElement(by);
        element.clear();
        element.sendKeys(text);
    };

    this.navigateToUrl = function (url) {
        driver.get(url);
    };

    this.clickElement = function (by, timeOut) {
        explicitWait(by, timeOut);
        driver.findElement(by).click();
    };

    this.executeScript = function (script) {
        log('Executing script: ' + script);
        driver.executeScript(script);
    };

    this.clickDeepElement = function (bys, timeOut) {
        var element = driver.findElement(By.tagName('body'));
        explicitWait(bys[0], timeOut);
        for (var i = 0; i < bys.length; i++) {
            element = element.findElement(bys[i]);
        }
        element.click();
    };

    this.getSize = function () {
        var size = driver.Window.getSize();
        log(size);
    }
}
