var HomePage = function(helper) {
    this.helper = helper;
    this.cardsLink = By.ByLinkText("Cards & Stationery");
    this.christmasCardsLink = By.name("&lid=Sub_CS_ChristmasCards");
    this.myPhotosLink = By.id("sfly3-my-pictures");


    this.goToChristmasCards = function() {
        this.helper.waitForElement(this.cardsLink, 10000);
        this.helper.hover(this.cardsLink);
        this.helper.clickElement(this.christmasCardsLink);
    };

    this.goToMyPhotos = function() {
        this.helper.waitAndClick(this.myPhotosLink, 10000);
    };
}
