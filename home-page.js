function HomePage(helper) {
	this.helper = helper;
	this.cardsLink = By.ByLinkText("Cards & Stationery");
	this.christmasCardsLink = By.name("&lid=Sub_CS_ChristmasCards");
	this.myPhotosLink = By.id("sfly3-my-pictures");
}

HomePage.prototype.goToChristmasCards = function() {
	this.helper.waitForElement(this.cardsLink, 10000);
	this.helper.hover(this.cardsLink);
	this.helper.clickElement(this.christmasCardsLink);
};

HomePage.prototype.goToMyPhotos = function() {
	this.helper.waitAndClick(this.myPhotosLink, 10000);	
};