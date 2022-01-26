import { Schema, model, Document } from 'mongoose'

export interface User extends Document {
  email: string
  password: string
}

const schema = new Schema<User>({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
})

const UserModel = model<User>('User', schema)

export default UserModel
