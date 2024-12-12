import { StatusCodes } from "http-status-codes"

export class NotFoundError extends Error {
  public statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export class BadRequestError extends Error {
  public statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export class UnauthorizedError extends Error {
  public statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export class UnAuthenticatedError extends Error {
  public statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
