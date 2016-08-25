function HomePage(helper) {
    this.cardsLink = By.ByLinkText("Cards & Stationery");
    this.christmasCardsLink = By.name("&lid=Sub_CS_ChristmasCards");
    this.myPhotosLink = By.id("sfly3-my-pictures");


    this.goToChristmasCards = function() {
        helper.hover(this.cardsLink, 10000);
        helper.clickElement(this.christmasCardsLink);
    };

    this.goToMyPhotos = function() {
        helper.clickElement(this.myPhotosLink, 10000);
    };
}
