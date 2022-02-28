import { NextFunction, Request, Response } from 'express'

export const wrapTryCatch =
  (fn: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res)
    } catch (error) {
      next()
    }
  }
