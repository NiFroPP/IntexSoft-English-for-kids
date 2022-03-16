import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import UserService from './user.service'
import CustomErrors from '../errors/API.error'
import { wrapTryCatch } from '../utils/wrapTryCatch.utility'
import { RegistrationRequestDto } from './dto/registration.request.dto'
import { LoginRequestDto } from './dto/login.request.dto'

const UserController = {
  registration: wrapTryCatch(async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw CustomErrors.requestValidationError(errors.array())
    }

    const { email, password, username }: RegistrationRequestDto = req.body
    const user = await UserService.registration(email, password, username)

    res.status(201).json(user)
  }),

  login: wrapTryCatch(async (req: Request, res: Response) => {
    const { email, password }: LoginRequestDto = req.body
    const user = await UserService.login(email, password)

    res.json(user)
  }),
}

export default UserController
