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

    const user = await UserService.registration(req.body)

    res.status(201).json(user)
  }),

  login: wrapTryCatch(async (req: Request, res: Response) => {
    const user = await UserService.login(req.body)

    res.json(user)
  }),
}

export default UserController
