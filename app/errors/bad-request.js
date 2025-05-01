const CustomAPIError = require('./custom-api-error')
const { status } = require('http-status')

class BadRequst extends CustomAPIError{
    constructor(message) {
        super(message);
        // statusCode bad request
        this.statusCode = status.BAD_REQUEST
    }
}

module.exports = BadRequst;