import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import authRouter from './modules/auth/application/router'
import userRouter from './modules/user/application/router'
import customerRouter from './modules/customer/application/router'
import blockingRouter from './modules/blocking/application/router'
import container from './IoC/container'

const API_PREFIX = '/api'
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(API_PREFIX, authRouter(container.cradle))
app.use(API_PREFIX, userRouter(container.cradle))
app.use(API_PREFIX, customerRouter(container.cradle))
app.use(API_PREFIX, blockingRouter(container.cradle))
app.use(container.cradle.commonMiddleware.errorHandler)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Application started at port ${port}`)
})
