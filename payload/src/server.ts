import express from 'express'
import path from 'path'
import payload from 'payload'
import logRequest from './middleware/logger'
import tenantMiddleware from './middleware/tenant'

require('dotenv').config()
const app = express()

// Logging middleware
app.use(logRequest);

// Tenant resolution and configuration middleware
app.use(tenantMiddleware);

// Serve static assets - white label admin
app.use('/assets', express.static(path.resolve(__dirname, './assets')));

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {

  let emailConfig;

  if (process.env.NODE_ENV === 'development') {
    emailConfig = {
      fromName: 'Admin',
      fromAddress: 'admin@example.com',
      logMockEmails: true,
    };
  } else {
    emailConfig = {
      transport: app.locals.emailTransport,
      fromAddress: app.locals.tenantEmailConfig?.fromEmailAddress,
      fromName: app.locals.tenantEmailConfig?.fromName,
    };
  }

  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    email: emailConfig,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL:  ${payload.getAdminURL()}`)
    },
  })

  // Used to check the port set by heroku in prod or port 3000 for local
  app.listen(process.env.PORT || 3000)
}

start()