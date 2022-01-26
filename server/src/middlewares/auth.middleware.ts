import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { UnauthorizedError } from '../errors/unauthorized.error'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      new UnauthorizedError()
    }

    jwt.verify(token!, config.jwtSecretKey)

    next()
  } catch (e) {
    throw new UnauthorizedError()
  }
}
