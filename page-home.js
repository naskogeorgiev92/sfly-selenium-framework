function HomePage(helper) {
    this.cardsLink = By.linkText("Cards & Stationery");
    this.christmasCardsLink = By.name("&lid=Sub_CS_ChristmasCards");
    this.myPhotosLink = By.id("sfly3-my-pictures");

    this.goToChristmasCards = function() {
        helper.hover(this.cardsLink, 10000);
        helper.clickElement(this.christmasCardsLink, 10000);
    };

    this.goToMyPhotos = function() {
        helper.clickElement(this.myPhotosLink, 10000);
    };
}
