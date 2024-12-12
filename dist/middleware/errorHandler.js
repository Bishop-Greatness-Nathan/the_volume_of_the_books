"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
// Custom Error Handler Middleware
const errorHandler = (err, // Use `any` because errors can have varying structures
req, res, next) => {
    // Default custom error structure
    const customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, please try again later",
    };
    // Handle Mongoose Duplicate Key Error
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value.`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // Handle Mongoose Validation Errors
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // Send error response
    res.status(customError.statusCode).json({ msg: customError.msg });
    // Call `next` in case other middlewares are chained after
    next();
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map