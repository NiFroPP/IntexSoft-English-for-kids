import { Schema, model, Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  email: string
  password: string
  username: string
  role: string
}

const schema = new Schema<User>(
  {
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    username: { type: String, required: true },
    role: { type: String, required: false, default: 'USER' },
  },
  {
    versionKey: false,
  }
)

const UserModel = model<User>('User', schema)

export default UserModel
