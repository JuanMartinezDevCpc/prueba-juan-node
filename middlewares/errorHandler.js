import boom from "@hapi/boom";
import debug from "debug"

function logErrors(err, req, res, next) {
    debug('app:error')(err)
    next(err)
}

function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err))
    }
    next(err)
}

function errorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload },
    } = err;
    res.status(statusCode).json(payload);
}

export { logErrors, wrapErrors, errorHandler }