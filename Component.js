/* global log, beginStep, waitFor, pause, By */

function ComponentClass(driver) {

    var pauseTime = 2000;
    var waitTime = 60000;

    var hasElement = function(by) {
        try {
            driver.findElement(by);
            return true;
        } catch (e) {
            return false;
        }
    }

    this.isDisplayed = function(by) {
        try {
            return driver.findElement(by).isDisplayed();
        } catch (e) {
            return false;
        }
    }

    this.isCurrentlyVisible = function(by) {
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
            return true;
        }
    }

    this.urlContains = function(pattern) {
        try {
            return driver.getCurrentUrl().contains(pattern);
        } catch (e) {
            return false;
        }
    }

    this.isEnabled = function(by) {
        try {
            return driver.findElement(by).isEnabled();
        } catch (e) {
            return false;
        }
    }

    this.hasAlert = function() {
        try {
            driver.switchTo().alert();
            return true;
        } catch (e) {
            return false;
        }
    }

    this.acceptAlert = function() {
        var alert = driver.switchTo().alert();
        alert.accept();
    }

    this.dismissAlert = function() {
        var alert = driver.switchTo().alert();
        alert.dismiss();
    }

    this.doStep = function(label, fn) {
        log('Beginning step: ' + label);
        beginStep(label, function() {
            try {
                fn();
            } catch (e) {
                log('Error occurred during step: ' + label + '; ' + e);
                log(e.stack);
                throw e;
            }
        });
        log('Ending step: ' + label);
    }

    this.waitForElement = function(timeout, cssSelector, failIfMissing) {
        log('Looking up element (timeout: ' + timeout + 'ms) : ' + cssSelector);
        var check = false;
        waitFor(function() {
            return check = hasElement(By.cssSelector(cssSelector));
        }, timeout);

        if (check) {
            log('Found element: ' + cssSelector);
            return driver.findElement(By.cssSelector(cssSelector));
        } else if (!check && failIfMissing) {
            throw ('Failed to find ' + cssSelector + ' after ' + timeout + 'ms');
        } else {
            log('No element found by cssSelector ' + cssSelector + ' after ' + timeout + 'ms');
        }
    }

    this.waitForElementBy = function(timeout, by, failIfMissing) {
        log('Looking up element by (timeout: ' + timeout + 'ms) : ' + by);
        var check = false;
        waitFor(function() {
            return check = hasElement(by);
        }, timeout);

        if (check) {
            log('Found element by: ' + by);
            return driver.findElement(by);
        } else if (!check && failIfMissing) {
            throw ('Failed to find element by ' + by + ' after ' + timeout + 'ms');
        } else {
            log('No element found by ' + by + ' after ' + timeout + 'ms');
        }
    }

    this.switchToFrame = function(index) {
        driver.switchTo().frame(index);
    }

    this.switchToFrameBy = function(by) {
        driver.switchTo().frame(driver.findElement(by));
    }

    this.switchToDefault = function() {
        driver.switchTo().defaultContent();
    }

    this.switchToActiveElement = function() {
        driver.switchTo().activeElement();
    }

    this.switchToParentFrame = function() {
        driver.switchTo().parentFrame();
    }

    this.getParentWindow = function() {
        return driver.getWindowHandle();
    }

    this.switchToWindowHavingTitle = function(title) {
        log("switching to another window");
        // handlers by Neustar Tanvi

        var handlers = driver.getWindowHandles();
        var handlersArr = handlers.toArray();
        var handles_num = handlers.size();
        log("Total number of handles is :" + handles_num);
        log("handlers: " + handlers);

        var found = false;
        for (var seconds = 0;; seconds++) {
            if (seconds >= 60) {
                fail("problem loading new browser tab/window")
            }

            for (var i = 0; i < handles_num; i++) {
                var newtitle = driver.switchTo().window(handlersArr[i]).getTitle();
                log("i=" + i + " handler=" + handlersArr[i] + " title=" + newtitle);

                if (newtitle.equals(title)) {
                    log("window is focused on title: " + title);
                    found = true;
                    break;
                }
            }
            pause(1 * 1000);

            if (found) {
                break;
            }
        }
    }

    this.sleep = function(waitTimeInMS, reason) {
        if (reason == null) {
            throw ("a reason for sleeping must be specified");
        }

        log("Sleeping for " + waitTimeInMS + "ms because: " + reason);

        try {
            pause(waitTimeInMS);
        } catch (e) {
            log("Caught Exception while sleeping: " + e.message(), e.name);
        }
    }

    this.getCurrentTime = function() {
        var d = new Date();
        return d.getTime();
    }

    this.generateUsername = function() {
        return "functional.test." + this.getCurrentTime() + "@shutterfly.com";
    }

    this.getPhotosURL = function(properties) {
        if (properties.getEnv() != null) {
            return 'https://photos.' + properties.getEnv() + '.' + properties.getHostName();
        } else {
            return 'https://photos.' + properties.getHostName();
        }
    }

    this.getSiteURL = function(properties) {
        if (properties.getEnv() != null) {
            return 'https://' + properties.getEnv() + '.' + properties.getHostName();
        } else {
            return 'https://' + properties.getHostName();
        }
    }

    this.executeScript = function(javascript) {
        driver.executeScript(javascript);
    }

    this.refresh = function(cssSelector) {
        driver.navigate().refresh();

        waitFor(function() {
            return check = hasElement(By.cssSelector(cssSelector));
        }, waitTime);

        if (!check) {
            throw ("problem refreshing page, after change");
        }
    }

    this.fireEventMouseOver = function(element) {
        //      var mouseOverScript = "if(document.createEvent){var evObj = document.createEvent('MouseEvents');evObj.initEvent('mouseover', true, false); arguments[0].dispatchEvent(evObj);} else if(document.createEventObject) { arguments[0].fireEvent('onmouseover');}";
        var mouseOverScript = "if(document.createEventObject) { arguments[0].fireEvent('onmouseover');}";

        this.executeScript(mouseOverScript, element);
    }

    this.mouseClick = function(element) {
        var clickScript = "if(document.createEvent){var evObj = document.createEvent('MouseEvents');evObj.initEvent('click', true, false); arguments[0].dispatchEvent(evObj);} else if(document.createEventObject) { arguments[0].fireEvent('onclick');}";
        this.executeScript(clickScript, element);
    }


    this.mouseOver = function(elm) {
        var action = new Actions(driver);
        action.moveToElement(elm).build().perform();
        this.sleep(pauseTime, "waiting for mouse over event to happen");
    }

    var getPage = function() {
        return driver.findElement(By.tagName("body"));
    }

    this.clickOnPage = function(reason) {
        if (reason == null) {
            throw ("a reason must be specified for clicking on the page");
        }

        log("Clicking: " + reason);
        getPage().click();
    }

    this.pageContains = function(pattern) {
        return getPage().getText().contains(pattern);
    }

    this.sourceContains = function(pattern) {
        return driver.getPageSource().contains(pattern);
    }

    this.randomString = function(len) {
        var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var pos = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(pos, pos + 1);
        }
        return randomString;
    }

    var hasProspectDialog = function() {
        return hasElement(By.className("modal-wrapper"));
    }

    var rootWidgetElement = function() {
        return driver.findElement(By.id("sfly_wgt_container"));
    }

    var widgetcontainerVisible = function() {
        try {
            return rootWidgetElement().isDisplayed();
        } catch (e) {
            return false;
        }
    }

    this.openHomePage = function(url) {
        driver.get(url);

        this.sleep(pauseTime, "adding sleep for prospect dialog");
        if (hasProspectDialog()) {
            var root = driver.findElement(By.className("modal-wrapper"));
            var closeButton = root.findElement(By.className("modal-close"));
            closeButton.click();
        }

        if (widgetcontainerVisible()) {
            var elm = rootWidgetElement().findElement(By.className("sfly-wgt-qst-mark"));
            elm.click();
        }

        waitFor(function() {
            return check = hasElement(By.id("banner-marquee"));
        }, pauseTime);

        //      if (!check) {
        //      throw ("Home Page validation failed");
        //      }
    }

    this.openThumbnailPage = function(url) {
        driver.get(url);
        var check;

        waitFor(function() {
            return check = hasElement(By.className("thumbImageDiv"));
        }, pauseTime);

        if (!check) {
            throw ("Thumbnail Page validation failed");
        }
    }

    this.openSubCategoryPage = function(url) {
        driver.get(url);
        var check;

        waitFor(function() {
            return check = hasElement(By.className("subcatMarquee"));
        }, pauseTime);

        if (!check) {
            throw ("Sub Category Page validation failed");
        }
    }

    this.signIn = function(user, pwd) {
        log("signing in with crenditials: " + user + "/" + pwd);

        var userName = driver.findElement(By.id("userName"));
        userName.sendKeys(user);

        var password = driver.findElement(By.id("password"));
        password.sendKeys(pwd);

        var signInButton = driver.findElement(By.id("signInButton"));
        signInButton.click();
    }

    this.openMyShutterflyPage = function(user, password) {
        this.signIn(user, password);

        log("opening My Shutterfly after signing in");

        var check;
        waitFor(function() {
            return check = hasElement(By.id("mysfly-main"));
        }, waitTime);

        if (!check) {
            throw ("My Shutterfly Page validation failed");
        }
    }

    this.openMyShutterflyPageWithMagicShop = function(user, password) {
        this.signIn(user, password);

        log("opening My Shutterfly after signing in");

        var check;
        waitFor(function() {
            return check = hasElement(By.cssSelector('#MagicShopFull > div.sfly_wgt_listview_container.sfly_wgt_listview.sfly_wgt canvas'));
        }, waitTime);

        if (!check) {
            throw ("My Shutterfly / Magic shop validation failed");
        }
    }

    this.openPrintsPageWithWidgets = function(user, password) {
        this.signIn(user, password);

        log("opening prints page after signing in");

        var check;
        waitFor(function() {
            return check = hasElement(By.cssSelector('div#cluster_cat_marquee_well'));
        }, waitTime);

        if (!check) {
            throw ("My Shutterfly / Magic shop validation failed");
        }
    }

    var getCrossIconElementOnPageHelpOverlay = function() {
        return driver.findElement(By.cssSelector("div.page_help_overlay > div.close_btn > div"));
    }

    this.clickOnCrossIconToCloseHelpOverLay = function() {
        if (hasElement(By.className("page_help_overlay"))) {
            getCrossIconElementOnPageHelpOverlay().click();
            log("Clicked On Cross Icon_on Page Help Overlay in empty library");
        }
    }

    var getCrossButtonElementOnSeeCreateProductPopUp = function() {
        return driver.findElement(By.cssSelector("span.close-btn.js_close_popup"));
    }

    var isRootElementDisplayed = function() {
        try {
            return driver.findElement(By.cssSelector("div.slideshow.popover_wrap")).isDisplayed();
        } catch (e) {
            return false
        }
    }

    var getRightArrowElementOnOnboardingPopUp = function() {
        return driver.findElement(By.cssSelector("div.arrow.right_arrow"));
    }

    var getSeeItWithYourPhotosButtonElement = function() {
        return driver.findElement(By.cssSelector("div > div > a.orange-btn.timeline"));
    }

    var clickOnSeeItWithYourPhotosButton = function() {
        var action = new Actions(driver);
        action.moveToElement(getSeeItWithYourPhotosButtonElement()).click().build().perform();
    }

    this.closeSocialImportPopIfVisible = function() {
        if (isRootElementDisplayed()) {
            try {
                while (hasElement(By.cssSelector("div.arrow.right_arrow"))) {
                    getRightArrowElementOnOnboardingPopUp().click();
                }
                clickOnSeeItWithYourPhotosButton();
            } catch (e) {
                log("please verify window is large enough to display entire dialog; currently: " + driver.manage().window().getSize());
                throw e;
            }
        }
    }

    this.openPhotosPage = function() {
        var getPhotos = driver.findElement(By.id("sfly3-my-pictures"));
        getPhotos.click();

        this.closeSocialImportPopIfVisible();
        if (hasElement(By.cssSelector("span.close-btn.js_close_popup"))) {
            getCrossButtonElementOnSeeCreateProductPopUp().click();
        }

        this.clickOnCrossIconToCloseHelpOverLay();
        log("Clicked on cross icon to close help");
        var check;

        waitFor(function() {
            return check = hasElement(By.cssSelector('.framed_moment_media'));
        }, waitTime);

        if (!check) {
            throw ("problem occured uploading file, timeline not displayed");
        }
    }

    var signUp = function(fname, lname, email, pwd) {
        log("signup with crenditials: " + email + "/" + pwd);

        var first = driver.findElement(By.id("firstName"));
        first.sendKeys(fname);

        var last = driver.findElement(By.id("lastName"));
        last.sendKeys(lname);

        var uname1 = driver.findElement(By.id("userName"));
        uname1.sendKeys(email);

        var uname2 = driver.findElement(By.id("userName2"));
        uname2.sendKeys(email);

        var pw1 = driver.findElement(By.id("password"));
        pw1.sendKeys(pwd);

        var pw2 = driver.findElement(By.id("password2"));
        pw2.sendKeys(pwd)

        var signUpButton = driver.findElement(By.id("signUpButton"));
        signUpButton.click();
    }

    this.openWelcomePage = function(fname, lname, email, pwd) {
        signUp(fname, lname, email, pwd);

        var check;
        waitFor(function() {
            return check = hasElement(By.id("welcome_container"));
        }, pauseTime);

        if (!check) {
            throw ("Welcome Page validation failed");
        }
    }

    var onCrossSellPage = function() {
        return hasElement(By.className("recommendationTitle"));
    }

    this.openCrossSellPage = function() {
        log("Opening cross sell page");
        var elm = driver.findElement(By.cssSelector("img[alt='Next']"));
        elm.click();

        var check;
        waitFor(function() {
            return check = onCrossSellPage();
        }, pauseTime);

        if (!check) {
            throw ("Crosssell Page validation failed");
        }
    }

    this.openCartPage = function() {
        log("Opening cart page through app flow...");
        var elm = driver.findElement(By.className("primaryButton"));
        elm.click();

        var check;
        waitFor(function() {
            return check = hasElement(By.id("continueShoppingDropdown"));
        }, pauseTime);

        if (!check) {
            throw ("Cart Page validation failed");
        }
    }

    var currentPageURL = function() {
        var url = driver.getCurrentUrl();
        var arr = url.split(".com")
        return arr[0] + ".com"
    }

    this.addProjectToCart = function(projectGuid) {
        driver.get(currentPageURL() + "/order/start.sfly?projectGuid=" + projectGuid);

        if (onCrossSellPage()) {
            var elm = driver.findElement(By.className("primaryButton"));
            elm.click();

            var check;
            waitFor(function() {
                return check = hasElement(By.id("continueShoppingDropdown"));
            }, pauseTime);

            if (!check) {
                throw ("Cart Page validation failed");
            }
        }
    }

    this.addProjectExpectSignIn = function(projectGuid) {
        var url = currentPageURL() + "/order/start.sfly?projectGuid=" + projectGuid;
        log("addProjectToCart: " + url);
        driver.get(url);

        var check;
        waitFor(function() {
            return check = hasElement(By.id("signinInfo"));
        }, pauseTime);

        if (!check) {
            throw ("SignIn Page validation failed");
        }
    }

    this.signInExpectCartPage = function(user, pwd) {
        this.signIn(user, pwd);

        if (onCrossSellPage()) {
            var elm = driver.findElement(By.className("primaryButton"));
            elm.click();

            var check;
            waitFor(function() {
                return check = hasElement(By.id("continueShoppingDropdown"));
            }, pauseTime);

            if (!check) {
                throw ("Cart Page validation failed");
            }
        }
    }

    this.openSignInPage = function(forwardToURL) {
        driver.get(forwardToURL);

        var check;
        waitFor(function() {
            return check = hasElement(By.id("signinInfo"));
        }, pauseTime);

        if (!check) {
            throw ("SignIn Page validation failed");
        }
    }

    this.openSignUpPage = function(forwardToURL) {
        driver.get(forwardToURL);

        var check;
        waitFor(function() {
            return check = hasElement(By.id("signupInfo"));
        }, pauseTime);

        if (!check) {
            throw ("SignUp Page validation failed");
        }
    }

}
