import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

// Custom Error Handler Middleware
const errorHandler: ErrorRequestHandler = (
  err: any, // Use `any` because errors can have varying structures
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default custom error structure
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value.`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((error: any) => error.message)
      .join(", ")
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  // Send error response
  res.status(customError.statusCode).json({ msg: customError.msg })

  // Call `next` in case other middlewares are chained after
  next()
}

export default errorHandler
