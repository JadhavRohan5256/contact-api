const { constants } = require("./../constants.js");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    switch(statusCode) {
        case constants.VALIDATION_ERROR :
            res.json({
                title: "Validation Failed",
                message: err.message, 
                stackTrace: err.stack
            })
        break;
        case constants.NOT_FOUND: 
            res.json({
                title: "Not Found",
                message: err.message, 
                stackTrace: err.stack
            })
        break;
        case constants.UN_AUTHORIZED: 
            res.json({
                title: "UnAuthorized",
                message: err.message, 
                stackTrace: err.stack
            })
        break;
        case constants.SERVER_ERROR: 
            res.json({
                title: "Server Error",
                message: err.message, 
                stackTrace: err.stack
            })
        break;
        case constants.FORBIDEN_ERROR: 
            res.json({
                title: "Forbideen",
                message: err.message, 
                stackTrace: err.stack
            })
        break;
        default: 
            console.log("No Errors")
        break;
    }
}

module.exports = errorHandler;