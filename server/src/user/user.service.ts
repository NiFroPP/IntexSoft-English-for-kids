import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import UserModel, { User } from './user.model'
import CustomErrors from '../errors/API.error'

class UserService {
  constructor(private model: Model<User>) {
    this.model = model
  }

  async registration(
    email: string,
    password: string,
    username: string
  ): Promise<User> {
    const candidate = await this.model.findOne({ email })
    if (candidate) {
      throw CustomErrors.badRequestError(
        `User with email: ${email} already exist`
      )
    }

    const salt = await bcrypt.genSalt(+config.salt)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await this.model.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashPassword,
      username,
    })

    return user
  }

  async login(email: string, password: string) {
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

  async getAllUsers() {
    return this.model.find()
  }
}

export default new UserService(UserModel)
