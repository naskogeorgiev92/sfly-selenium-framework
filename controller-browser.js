function BrowserController(driver) {
    
    this.action = new Actions(driver);

    var isCurrentlyVisible = function(by, element) {
        var elements;

        if (element != null) {
            elements = element.findElements(by);
        } else {
            elements = driver.findElements(by);
        }

        if (elements.isEmpty()) {
            return false;
        } else {
            log("numberOfElements: " + elements.size());
            if (!elements.get(0).isDisplayed() || !elements.get(0).isEnabled()) {
                     return false;
                 }
            log("Found: " + by);
            return true;
        }
    };

    var explicitWait = function(by, timeOut) {
        if (timeOut == null) {
            timeOut = 3000;
        }
        waitFor(function() {
            log("Explicit wait for: " + by);
            return isCurrentlyVisible(by);
        }, timeOut);
    };

    this.waitForDeepElement = function(by, element, timeOut) {
        if (timeOut == null) {
            timeOut = 3000;
        }
        waitFor(function() {
            log("Explicit wait for deep element: " + by);
            return isCurrentlyVisible(by, element);
        }, timeOut);
    };

    this.waitForElement = function(by, timeOut) {
        explicitWait(by, timeOut);
    };

    this.hover = function(by, timeOut) {
        explicitWait(by, timeOut);
        this.action.moveToElement(driver.findElement(by)).build().perform();
        pause(1000);
    };

    this.writeText = function(by, text, timeOut) {
        explicitWait(by, timeOut);
        var element = driver.findElement(by);
        element.clear();
        element.sendKeys(text);
    };

    this.navigateToUrl = function(url) {
        driver.get(url);
    };

    this.clickElement = function(by, timeOut) {
        explicitWait(by, timeOut);
        driver.findElement(by).click();
    };

    this.executeScript = function(script) {
        log('Executing script: ' + script);
        driver.executeScript(script);
    };

    this.clickDeepElement = function(bys, timeOut) {
        var element = driver.findElement(By.tagName('body'));

        for (var i = 0; i < bys.length; i++) {
            this.waitForDeepElement(bys[i], element, timeOut);
            element = element.findElement(bys[i]);
        }
        element.click();
    };
}
