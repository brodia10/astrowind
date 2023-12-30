import express from 'express'
import path from 'path'
import payload from 'payload'
import tenantMiddleware from './collections/middleware/tenantMiddleware'

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
      payload.logger.info(`Payload Admin URL:  ${payload.getAdminURL()}`)
    },
  })
  // Used to check the port set by heroku in prod or port 3000 for local
  app.listen(process.env.PORT || 3000)
}

start()

app.use((req, res, next) => {
  // Tenant Resolution and Configuration Middleware
  // This middleware is run after every request to resolve the tenant and configure the tenant context
  tenantMiddleware(req, res, next)
})
