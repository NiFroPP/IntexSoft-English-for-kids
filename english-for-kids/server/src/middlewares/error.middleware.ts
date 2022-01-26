import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom.error'

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.returnErrors() })
  }
  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  })
}
