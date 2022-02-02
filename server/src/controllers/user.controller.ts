import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import UserService from '../service/user.service'
import CustomErrors from '../errors/API.error'

const UserController = {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw CustomErrors.requestValidationError(errors.array())
      }

      const { email, password, username } = req.body
      const user = await UserService.registration(email, password, username)

      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await UserService.login(email, password)

      res.json(user)
    } catch (e) {
      next(e)
    }
  },

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers()

      res.json({ users, count: users.length })
    } catch (e) {
      next(e)
    }
  },
}

export default UserController
