function HomePage(browser) {
    eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(HomePage.name);

    this.url = "https://www.shutterfly.com/";
    this.loginLink = By.xpath("//span[@class='signupForm-note']/a");
    this.closeButton = By.className('modal-close');
    this.welcomePopup = By.id('IPEinvL');

    this.cardsCategory = By.id("catItemLink_1");
    this.printsCategory = By.id("catItemLink_2");
    this.calendarsCategory = By.id("catItemLink_3");
    this.giftsCategory = By.id("catItemLink_4");

    this.christmasCardsLink = By.name("&lid=Sub_CS_Christmas Cards");
    this.printsLink = By.name("&lid=Sub_PR_Prints");
    this.deskCalendarsLink = By.name("&lid=Sub_Cal_Shop Desk Calendars");
    this.photoGiftsLink = By.name("&lid=Sub_PZG_See All Photo Gifts_Photo Gifts");
    this.myPhotosLink = By.id("sfly3-my-pictures");

    this.visit = function() {
        browser.navigateToUrl(this.url);
        if (browser.isElementVisible(this.welcomePopup)) {
            logger.info("Welcome Popup is visible. Refreshing the page.");
            browser.navigateToUrl(this.url);
        } else {
            logger.info("Welcome Popup isn't visible. Continuing with the test.");
        }
    };

    this.closeWelcomeDialog = function() {
        browser.clickElement(this.closeButton);
    };

    this.goToLogin = function() {
        browser.clickElement(this.loginLink);
    };

    this.goToChristmasCards = function() {
        logger.info("Going to Christmas cards.");
        browser.hover(this.cardsCategory, 10000);
        browser.clickElement(this.christmasCardsLink, 10000);
    };

    this.goToPrints = function() {
        logger.info("Going to Prints.");
        browser.hover(this.printsCategory, 10000);
        browser.clickElement(this.printsLink, 100000);
    };

    this.goToCalendars = function() {
      logger.info("Going to Calendars.");
        browser.hover(this.calendarsCategory, 10000);
        browser.clickElement(this.deskCalendarsLink, 100000);  
    };

    this.goToPhotoGifts = function() {
      logger.info("Going to Photo Gifts.");
        browser.hover(this.giftsCategory, 10000);
        browser.clickElement(this.photoGiftsLink, 100000);  
    };

    this.goToMyPhotos = function() {
        logger.info("Going to My Photos.");
        browser.clickElement(this.myPhotosLink, 10000);
    };
}