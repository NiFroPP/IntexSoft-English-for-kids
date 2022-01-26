import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import userRouter from './routers/user.router'
import { errorMiddleware } from './middlewares/error.middleware'

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(errorMiddleware)

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbUrl),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    console.log('Connected to mongodb')

    app.listen(config.port, () => {
      console.log(
        `⚡️[server]: Server is running at https://${config.host}:${config.port}`
      )
    })
  } catch (e) {
    console.log(e)
  }
}

start()
