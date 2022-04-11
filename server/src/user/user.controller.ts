import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import UserService from './user.service'
import CustomErrors from '../errors/API.error'
import { wrapTryCatch } from '../utils/wrapTryCatch.utility'

const UserController = {
  registration: wrapTryCatch(async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw CustomErrors.requestValidationError(errors.array())
    }

    const { email, password, username } = req.body
    const user = await UserService.registration(email, password, username)

    res.status(201).json(user)
  }),

  login: wrapTryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await UserService.login(email, password)

    res.json(user)
  }),

  getAllUsers: wrapTryCatch(async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers()

    res.json({ users, count: users.length })
  }),
}

export default UserController
