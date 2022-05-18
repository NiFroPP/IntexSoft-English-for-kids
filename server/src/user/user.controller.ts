import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import UserService from './user.service'
import CustomErrors from '../errors/API.error'
import { wrapTryCatch } from '../utils/wrapTryCatch.utility'
import { RegistrationRequestDto } from './dto/registration.request.dto'
import { getUserFromToken } from '../utils/getUserFromToken'

const UserController = {
  registration: wrapTryCatch(async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw CustomErrors.requestValidationError(errors.array())
    }

    const { email, password, username }: RegistrationRequestDto = req.body
    const user = await UserService.registration({ email, password, username })

    res.status(201).json(user)
  }),

  login: wrapTryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await UserService.login({ email, password })

    res.json(user)
  }),

  follow: wrapTryCatch(async (req: Request, res: Response) => {
    const { id, isFavorite } = req.body
    const token = req.headers.authorization
    if (!token) {
      throw CustomErrors.unauthorizedError()
    }
    const { email } = getUserFromToken(token)
    const user = await UserService.follow({ email, id, isFavorite })

    res.json(user)
  }),

  getFavorite: wrapTryCatch(async (req: Request, res: Response) => {
    const token = req.headers.authorization
    if (!token) {
      throw CustomErrors.unauthorizedError()
    }
    const { email } = getUserFromToken(token)
    const users = await UserService.getFavorite(email)

    res.json(users[0].favoriteCategory)
  }),
}

export default UserController
