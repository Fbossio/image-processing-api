// As stated in dotenv documenatation: https://github.com/motdotla/dotenv
import 'dotenv/config'

// as stated in typedi documentation: https://github.com/typestack/typedi
import 'reflect-metadata'

import express from 'express'
import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './config/swagger-options'

// import middlewares
import { initializeLoaders } from './config/loaders'
import errorHandler from './middlewares/error-handler'

initializeLoaders() // This needs to be called before importing routes. Thats why eslint is disabled below

// import routes
// eslint-disable-next-line import/first
import imagesRoutes from './routes/images'

const app = express()

// Enable trust for headers set by proxies (e.g., when behind a load balancer).
app.set('trust proxy', true)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'assets')))

const PORT = process.env.PORT != null ? parseInt(process.env.PORT) : 3000
const API_VERSION = process.env.API_VERSION ?? 'v1'

// use routes
app.use(`/api/${API_VERSION}/images`, imagesRoutes)

// use middlewares
app.use(errorHandler)

// use swagger
const specs = swaggerJsdoc(swaggerOptions)
app.use(`/api/${API_VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(specs))

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`)
})

export default server
