import { CustomError } from './custom.error'
import { ValidationError } from 'express-validator'

export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('Invalid Request Parameters')
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  returnErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param }
    })
  }
}
