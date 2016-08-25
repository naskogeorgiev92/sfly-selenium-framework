function Prod() {

    var properties = {
        "hostname": "shutterfly.com",
        "env": null,
        "userName": "functional.test.default@shutterfly.com",
        "password": "insecure",
        "firstName": "Functional",
        "lastName": "Test",
        "address1": "2800 Bridge Parkway",
        "address2": "suite 30000",
        "city": "Redwood City",
        "state": "CA",
        "zip": "94065",
        "country": "USA",
        "cardNumber": "4444220000000000",
        "cardType": "Visa"
    };

    this.getHostName = function() {
        return properties.hostname;
    }

    this.getEnv = function() {
        return properties.env;
    }

    this.getUserName = function() {
        return properties.userName;
    }

    this.getPassword = function() {
        return properties.password;
    }

    this.getFirstName = function() {
        return properties.firstName;
    }

    this.getLastName = function() {
        return properties.lastName;
    }

    this.getAddress1 = function() {
        return properties.address1;
    }

    this.getAddress2 = function() {
        return properties.address2;
    }

    this.getCity = function() {
        return properties.city;
    }

    this.getState = function() {
        return properties.state;
    }

    this.getZip = function() {
        return properties.zip;
    }

    this.getCountry = function() {
        return properties.country;
    }

    this.getCardNumber = function() {
        return properties.cardNumber;
    }

    this.getCardType = function() {
        return properties.cardType;
    }

}
