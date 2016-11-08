function PhotoGiftsPage(browser) {
	eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(PhotoGiftsPage.name);

	this.firstSlot = By.id("slot_1");
	this.firstThumbImage = [By.id("0"), By.className("thumbImageDiv")];
	this.writeReviewButton = By.name("BV_TrackingTag_Review_Display_WriteReview");

	this.pressFirstSlot = function() {
		logger.info("Clicking on First Slot.");
		browser.clickElement(this.firstSlot, 5000);
	};

	this.pressFirstThumbImage = function() {
		logger.info("Clicking on First Thumb Image.");		
		browser.clickDeepElement(this.firstThumbImage, 5000);		
	};

	this.pressWriteReview = function() {
		logger.info("Clicking on Write Review.");
		browser.clickElement(this.writeReviewButton, 10000);
	};
}