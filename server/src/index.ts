import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './config'
import userRouter from './user/user.router'
import categoryRouter from './category/category.router'
import { errorMiddleware } from './middlewares/error.middleware'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use(errorMiddleware)

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbUrl)

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
