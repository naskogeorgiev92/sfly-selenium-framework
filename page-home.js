function HomePage(browser) {
    eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(HomePage.name);

    this.cardsCategory = By.id("catItemLink_1");
    this.printsCategory = By.id("catItemLink_2");
    this.calendarsCategory = By.id("catItemLink_3");

    this.christmasCardsLink = By.linkText("Christmas Cards");
    this.printsLink = By.name("&lid=Sub_PR_Prints");
    this.deskCalendarsLink = By.name("&lid=Sub_Cal_Shop Desk Calendars");
    this.myPhotosLink = By.id("sfly3-my-pictures");

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
    }

    this.goToMyPhotos = function() {
        logger.info("Going to My Photos.");
        browser.clickElement(this.myPhotosLink, 10000);
    };
}