import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import config from './config'
import userRouter from './user/user.router'
import categoryRouter from './category/category.router'
import { errorMiddleware } from './middlewares/error.middleware'
import { authMiddleware } from './middlewares/auth.middleware'
import * as swaggerDocument from './swagger.json'

const app = express()

app.use(
  express.json({
    limit: '3mb',
  })
)
app.use(cors())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users', userRouter)
app.use('/categories', authMiddleware, categoryRouter)
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
