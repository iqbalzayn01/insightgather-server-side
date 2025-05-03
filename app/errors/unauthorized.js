const { status } = require('http-status');
const CustomAPIError = require('./custom-api-error');

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = status.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
