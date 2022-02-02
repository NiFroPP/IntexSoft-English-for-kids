import { ValidationError } from 'express-validator'

class CustomErrors extends Error {
  statusCode: number

  errors: string[] | ValidationError[]

  constructor(
    statusCode: number,
    message: string,
    errors: string[] | ValidationError[] = []
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
  }

  static unauthorizedError() {
    return new CustomErrors(401, 'User unauthorized')
  }

  static badRequestError(message: string) {
    return new CustomErrors(400, message)
  }

  static requestValidationError(errors: ValidationError[]) {
    return new CustomErrors(400, 'Invalid Request Parameters', errors)
  }
}

export default CustomErrors
