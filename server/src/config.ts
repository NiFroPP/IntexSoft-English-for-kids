import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.SERVER_PORT || 4000,
  host: process.env.SERVER_HOSTNAME || 'localhost',
  dbUrl: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'secret-key',
  salt: process.env.SALT_ROUNDS || 10,
}
