function FileController(client) {

    eval(datafile('logger.js').readContents() + "");
    var logger = new Logger(FileController.name);

    var baseUrl = "https://raw.githubusercontent.com/naskogeorgiev92/sfly-selenium-framework/master/";

    this.getFile = function(fileName) {
    	var file = client.get(baseUrl + fileName);
    	return file.getBody() + "" ;
    };

    this.getPage = function(pageName) {
    	var file = client.get(baseUrl + "pages/" + pageName);
    	return file.getBody() + "" ;
    }

}
