import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import UserModel, { User } from './user.model'
import CustomErrors from '../errors/API.error'
import { LoginResponseDto } from './dto/login.response.dto'
import { LoginRequestDto } from './dto/login.request.dto'
import { RegistrationRequestDto } from './dto/registration.request.dto'
import { FollowServiceRequestDto } from './dto/follow.service.request.dto'
import { WordsResponseDto } from '../category/dto/words.response.dto'

class UserService {
  constructor(private model: Model<User>) {
    this.model = model
  }

  async registration({
    email,
    password,
    username,
  }: RegistrationRequestDto): Promise<User> {
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

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.model.findOne({ email })
    if (!user) {
      throw CustomErrors.badRequestError(`User with email: ${email} not exist`)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw CustomErrors.badRequestError(`Wrong password entered`)
    }

    return {
      token: jwt.sign({ user }, config.jwtSecretKey, {
        expiresIn: '30d',
      }),
    }
  }

  async follow({
    email,
    id,
    isFavorite,
  }: FollowServiceRequestDto): Promise<User> {
    const user = await this.model.findOne({ email })
    if (!user) {
      throw CustomErrors.badRequestError(`User with email: ${email} not exist`)
    }

    await this.model.updateOne(
      { email },
      isFavorite
        ? {
            $pull: { favoriteCategory: id },
          }
        : {
            $addToSet: {
              favoriteCategory: id,
            },
          }
    )

    return user
  }

  async getFavorite(email: string): Promise<Partial<User>[]> {
    return this.model.find({ email }, { favoriteCategory: 1 })
  }
}

export default new UserService(UserModel)
