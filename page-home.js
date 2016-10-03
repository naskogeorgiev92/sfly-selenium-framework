function HomePage(browser) {
    
    this.cardsLink = By.id("catItemLink_1");
    this.christmasCardsLink = By.linkText("Christmas Cards");
    this.myPhotosLink = By.id("sfly3-my-pictures");

    this.goToChristmasCards = function() {
        browser.hover(this.cardsLink, 10000);
        browser.clickElement(this.christmasCardsLink, 10000);
    };

    this.goToMyPhotos = function() {
        browser.clickElement(this.myPhotosLink, 10000);
    };
}
