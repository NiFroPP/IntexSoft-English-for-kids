import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'

import UserModel, { User } from '../models/user.model'
import { BadRequestError } from '../errors/bad-request.error'

class UserService {
  async registration(email: string, password: string): Promise<User> {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new BadRequestError(`User with email: ${email} already exist`)
    }

    const hashPassword = await bcrypt.hash(password, config.salt)

    return await UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashPassword,
    })
  }

  async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new BadRequestError(`User with email: ${email} not exist`)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new BadRequestError(`Wrong password entered`)
    }

    return jwt.sign({ id: user._id }, config.jwtSecretKey, {
      expiresIn: '1h',
    })
  }

  async getAllUsers() {
    return UserModel.find()
  }
}

export default new UserService()
