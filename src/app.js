import express from 'express'
import bodyParser from 'body-parser'

import ApiV1Routes from './routes/apiV1'

const app = express()

// middlewares
app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET')
  res.header('Access-Control-Max-Age', '3600')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, ' +
      'Authorization, X-Requested-With, x-access-token'
  )
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', ApiV1Routes)

export default app
