import express from 'express'
import path from 'path'
import payload from 'payload'

require('dotenv').config()
const app = express()

// Serve static assets - white label admin
app.use('/assets', express.static(path.resolve(__dirname, './assets')));

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })


  // used to check the port set by heroku in prod or port 3000 for local
  app.listen(process.env.PORT || 3000)
}

start()
