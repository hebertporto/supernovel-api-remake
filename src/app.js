import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'

import './v1/config/db'

import * as handlers from './v1/utils/handlers'

import { version } from '../package.json'
import { DEFAULT_FILE_UPLOAD_SIZE } from './v1/config/constants'

import { decodeJWT, hydrateUser } from './v1/config/jwt'

import apiApp from './v1/services/app'
// Admin //
import novelAdmin from './v1/services/admin/novel'
import chapterAdmin from './v1/services/admin/chapter'
import featureAdmin from './v1/services/admin/feature'
import userAdmin from './v1/services/admin/user'
import authAdmin from './v1/services/admin/authentication'

const port = process.env.PORT || 3000
const app = express()

const unless = {
  path: [
    { url: /^\/v1\/api\/admin\/auth\/register/ },
    { url: /^\/v1\/api\/admin\/auth\/login/ },
    { url: /^\/v1\/api\/app\// },
  ],
}

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

app.use(decodeJWT.unless(unless))
app.use(hydrateUser.unless(unless))

// APP
app.use('/v1/api/app', apiApp)
// ADMIN
app.use('/v1/api/admin/user', userAdmin)
app.use('/v1/api/admin/auth', authAdmin)
app.use('/v1/api/admin/novel', novelAdmin)
app.use('/v1/api/admin/chapter', chapterAdmin)
app.use('/v1/api/admin/featured', featureAdmin)

// Error Handlers
app.use(handlers.validationError)
app.use(handlers.internalError)

app.listen(port, () => {
  console.log(`API Server on port: ${port}`)
})

export default app
