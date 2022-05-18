import { Schema, model, Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  email: string
  password: string
  username: string
  favoriteCategory: Array<string>
  role?: string
}

const schema = new Schema<User>(
  {
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    username: { type: String, required: true },
    favoriteCategory: { type: [String], required: true, default: [] },
    role: { type: String, required: false, default: 'USER' },
  },
  {
    versionKey: false,
  }
)

const UserModel = model<User>('User', schema)

export default UserModel
