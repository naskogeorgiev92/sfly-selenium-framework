eval(datafile('controller-file.js').readContents() + "");

var client = openHttpClient();
var fileController = new FileController(client);

eval(fileController.getFile("Beacons.js"));

var beacons = new Beacons();
beacons.blacklist(client);

test.beginTransaction();
test.beginStep("Personalize Christmas Card Anonymous");

	


test.endStep();
test.endTransaction();