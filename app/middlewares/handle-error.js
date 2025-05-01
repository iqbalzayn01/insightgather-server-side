const { status } = require('http-status');

const errorHandleMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || status.INTERNAL_SERVER_ERROR,
        msg: err.message || 'MESSAGE: Something went wrong try again later',
    };

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) > item.message)
            .join(', ')
        customError.statusCode = 400
    }
}