import { Schema, model, Document } from 'mongoose'

export interface User extends Document {
  email: string
  password: string
  username: string
}

const schema = new Schema<User>(
  {
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    username: { type: String, required: true },
  },
  {
    versionKey: false,
  }
)

const UserModel = model<User>('User', schema)

export default UserModel
