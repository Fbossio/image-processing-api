import 'dotenv/config'
import 'reflect-metadata'

import express from 'express'

// import routes
import imagesRoutes from './routes/images'

const app = express()

app.use(express.json())

const PORT = process.env.PORT != null ? parseInt(process.env.PORT) : 3000
const API_VERSION = process.env.API_VERSION ?? 'v1'

// use routes
app.use(`/api/${API_VERSION}/images`, imagesRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`)
})
