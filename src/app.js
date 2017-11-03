import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'

import './v1/config/db'

import { version } from '../package.json'
import { DEFAULT_FILE_UPLOAD_SIZE } from './v1/config/constants'

// import category from './v1/services/category/'

const port = process.env.PORT || 3000
const app = express()

const dateOfBirth = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')

app.use(bodyParser.urlencoded({
  extended: true,
  limit: DEFAULT_FILE_UPLOAD_SIZE,
}))

app.use(bodyParser.json({ limit: DEFAULT_FILE_UPLOAD_SIZE }))
app.use(cors())
app.use(morgan('dev'))

// Routes //
app.use('/health', (req, res) => res.status(200).json({ version, dateOfBirth }))

// app.use('/v1/api/categories', category)

app.listen(port, () => {
  console.log(`API Server on port: ${port}`)
})

export default app
