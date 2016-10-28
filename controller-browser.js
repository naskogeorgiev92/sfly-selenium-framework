function BrowserController(driver) {

    eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(BrowserController.name);

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
            logger.info("Number of elements: " + elements.size());
            if (!elements.get(0).isDisplayed() || !elements.get(0).isEnabled()) {
                return false;
            }
            logger.info("Found: " + by);
            return true;
        }
    };

    this.isElementVisible = function(by) {
        var result = isCurrentlyVisible(by);
        return result;
    }

    this.waitForDeepElement = function(by, element, timeOut) {
        if (timeOut == null) {
            timeOut = 3000;
        }
        waitFor(function() {
            logger.info("Waiting for deep element: " + by);
            return isCurrentlyVisible(by, element);
        }, timeOut);
    };

    this.waitForElement = function(by, timeOut) {
        if (timeOut == null) {
            timeOut = 3000;
        }
        waitFor(function() {
            logger.info("Waiting for: " + by);
            return isCurrentlyVisible(by);
        }, timeOut);
    };

    this.hover = function(by, timeOut) {
        this.waitForElement(by, timeOut);
        this.action.moveToElement(driver.findElement(by)).build().perform();
        pause(1000);
    };

    this.writeText = function(by, text, timeOut) {
        this.waitForElement(by, timeOut);
        var element = driver.findElement(by);
        element.clear();
        element.sendKeys(text);
    };

    this.navigateToUrl = function(url) {
        driver.get(url);
    };

    this.clickElement = function(by, timeOut) {
        this.waitForElement(by, timeOut);
        driver.findElement(by).click();
    };

    this.executeScript = function(script) {
        logger.info('Executing script: ' + script);
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

    this.getElementText = function(by, timeOut) {
        this.waitForElement(by, timeOut);
        return driver.findElement(by).getText();
    };
}