import express from 'express';
import httpProxy from 'http-proxy'; // You might use a proxy for redirecting requests
import path from 'path';
import payload from 'payload';
import logRequest from './middleware/logger';
import { tenantMiddleware } from './middleware/tenant';

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

// Create a proxy server for forwarding requests
const proxy = httpProxy.createProxyServer({});


app.use((req, res, next) => {
  const subdomain = req.headers.host?.split('.')[0] || '';

  // Forwarding logic based on subdomain
  if (subdomain.endsWith('-site')) {
    // Forward to Netlify
    proxy.web(req, res, { target: process.env.FRONTEND_URL || 'http://localhost:4321' });
  } else if (subdomain.endsWith('-dashboard')) {
    // Forward to Railway
    proxy.web(req, res, { target: process.env.BACKEND_URL || 'http://localhost:3000' });
  } else {
    // Handle unknown subdomains or pass to next middleware
    next();
    payload.logger.warn(`Subdomain not recognized: ${subdomain}`);
  }
});

// Default route if no subdomains matched or if it's the root domain
// app.get('*', (req, res) => {
//   res.status(404).send('Subdomain not recognized or root domain!');
// });


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
      payload.logger.info(`Bloom Admin URL:  ${payload.getAdminURL()}`)
    },
  })

  // Use PORT provided in environment or default to 3000
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // Listen on `port` and 0.0.0.0
  app.listen(port, "0.0.0.0", function () {
    payload.logger.info(`Bloom is listening on ${port}`)
  });

}

start()