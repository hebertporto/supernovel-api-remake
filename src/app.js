import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'

import './v1/config/db'

import * as handlers from './v1/utils/handlers'

import { version } from '../package.json'
import { DEFAULT_FILE_UPLOAD_SIZE } from './v1/config/constants'

import apiApp from './v1/services/api/app'
import novelAdmin from './v1/services/admin/novel'


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
// APP
app.use('/v1/api/app', apiApp)
// ADMIN
app.use('/v1/admin/novel', novelAdmin)

// Error Handlers
app.use(handlers.validationError)
app.use(handlers.internalError)

app.listen(port, () => {
  console.log(`API Server on port: ${port}`)
})

export default app
