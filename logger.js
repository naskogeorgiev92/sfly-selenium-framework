function Logger(tag) {

	this.tag = tag

	this.info = function(message) {
		if(tag == null || tag == undefined) {
			tag = "LOGGER";
		}

		log(tag + " INFO: " + message);
	}

	this.debug = function(message) {
		if(tag == null || tag == undefined) {
			tag = "LOGGER";
		}

		log(tag + " DEBUG: " + message);
	}

	this.error = function(message) {
		if(tag == null || tag == undefined) {
			tag = "LOGGER";
		}

		throw (tag + " ERROR: " + message);
	}
}