HomePage = function HomePage(helper) {
	this.helper = helper;
	this.cardsLink = By.ByLinkText("Cards & Stationery");
	this.christmasCardsLink = By.name("&lid=Sub_CS_ChristmasCards");
};

HomePage.prototype.goToChristmasCards = function() {
	this.helper.waitForElement(this.cardsLink, 10000);
	this.helper.hover(this.cardsLink);
	this.helper.clickElement(this.christmasCardsLink);
};

module.exports = HomePage;