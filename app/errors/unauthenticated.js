const { status } = require('http-status');
const CustomAPIError = require('./custom-api-error');

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    supser(message);
    this.statusCode = status.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
