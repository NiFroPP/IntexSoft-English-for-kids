import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import UserModel, { User } from './user.model'
import CustomErrors from '../errors/API.error'
import { LoginResponseDto } from './dto/login.response.dto'
import { RegistrationResponseDto } from './dto/registration.response.dto'

class UserService {
  constructor(private model: Model<User>) {
    this.model = model
  }

  async registration(
    email: string,
    password: string,
    username: string
  ): Promise<RegistrationResponseDto> {
    const candidate = await this.model.findOne({ email })
    if (candidate) {
      throw CustomErrors.badRequestError(
        `User with email: ${email} already exist`
      )
    }

    const salt = await bcrypt.genSalt(+config.salt)
    const hashPassword = await bcrypt.hash(password, salt)

    return this.model.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashPassword,
      username,
    })
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.model.findOne({ email })
    if (!user) {
      throw CustomErrors.badRequestError(`User with email: ${email} not exist`)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw CustomErrors.badRequestError(`Wrong password entered`)
    }

    return {
      token: jwt.sign({ id: user._id }, config.jwtSecretKey, {
        expiresIn: '1m',
      }),
      username: user.username,
    }
  }
}

export default new UserService(UserModel)
