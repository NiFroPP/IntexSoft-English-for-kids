import { Request, Response, NextFunction } from 'express'
import CustomErrors from '../errors/API.error'

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  if (err instanceof CustomErrors) {
    if (err.errors.length > 0) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, errors: err.errors })
    }
    return res.status(err.statusCode).json({ message: err.message })
  }
  return res.status(500).json({
    errors: [{ message: 'Something went wrong' }],
  })
}
