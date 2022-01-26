import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import UserService from '../service/user.service'
import { RequestValidationError } from '../errors/request-validation.error'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
      }

      const { email, password } = req.body
      const user = await UserService.registration(email, password)

      return res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const token = await UserService.login(email, password)

      return res.json({ token, email })
    } catch (e) {
      next(e)
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers()

      res.json({ users, count: users.length })
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
