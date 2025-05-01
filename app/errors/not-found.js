const CustomAPIError = require('./custom-api-error');
const { status } = require('http-status');

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = status.NOT_FOUND;
    }
}

module.exports = NotFound;