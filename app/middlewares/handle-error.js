const { status } = require('http-status');
const {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} = require('@prisma/client/runtime/library');

const errorHandleMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || status.INTERNAL_SERVER_ERROR,
    msg: err.message || 'MESSAGE: Something went wrong try again later',
  };

  if (err.name === 'ValidationError') {
    customError.statusCode = status.BAD_REQUEST;
    customError.msg = 'Validation Error';
  }

  if (err.name === 'AppValidationError') {
    customError.statusCode = status.BAD_REQUEST;
    customError.msg - err.message;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        const target = err.meta?.target || 'field(s)';
        customError.statusCode = status.CONFLICT;
        customError.msg = `Duplicate entry: The ${target} already exists.`;
        break;
      case 'P2025':
        const cause = err.meta?.cause || 'Record not found';
        customError.statusCode = status.NOT_FOUND;
        customError.msg = cause;
        break;
      default:
        customError.statusCode = status.INTERNAL_SERVER_ERROR;
        customError.msg = 'Database error occured.';
    }
  }

  if (err instanceof PrismaClientValidationError) {
    customError.statusCode = status.BAD_REQUEST;
    customError.msg = err.msg;
  }

  if (err.statusCode) {
    customError.statusCode = err.statusCode;
    customError.msg = err.message;
  }

  return res.status(customError.statusCode).json({
    status: 'error',
    statusCode: customError.statusCode,
    msg: customError.msg,
  });
};

module.exports = errorHandleMiddleware;
