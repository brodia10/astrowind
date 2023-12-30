import express from 'express'
import path from 'path'
import payload from 'payload'
import { seed } from './seed'
import { TenantConfigurationService } from './services/tenant/TenantConfigurationService'
import { TenantResolutionService } from './services/tenant/TenantResolutionService'

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

// Tenant Resolution and Configuration Middleware
// This middleware is run before every request to resolve the tenant and configure the tenant context
// It is important that this middleware is run before the Payload middleware
// Middleware to log the request URL
const logRequest = (req, res, next) => {
  payload.logger.info(`Request URL: ${req.url}`);
  next();
};

// Middleware to resolve and configure tenant
const resolveAndConfigureTenant = async (req, res, next) => {
  const tenantResolutionService = new TenantResolutionService();
  const tenantConfigurationService = TenantConfigurationService.getInstance();

  try {
    const tenant = await tenantResolutionService.resolveTenant(req);
    if (tenant) {
      payload.logger.info(`Tenant: ${tenant.name}`);
      await tenantConfigurationService.configureTenantContext(tenant);
      next();
    } else {
      handleNoTenantFound(req, res, next);
    }
  } catch (error) {
    payload.logger.error('Error resolving or configuring tenant:', error);
    next(error);
  }
};

// Function to handle scenarios where no tenant is found
const handleNoTenantFound = async (req, res, next) => {
  payload.logger.warn('No tenant found.');
  if (process.env.SEED === 'true') {
    try {
      payload.logger.info(`Env is ${process.env.NODE_ENV}. Seeding database...`);
      await seed(payload);
      payload.logger.info('Database seeding successful.');
      next(); // Proceed or redirect as needed after seeding
    } catch (error) {
      payload.logger.error('Error seeding database:', error);
      next(error); // Forward the error
    }
  } else {
    payload.logger.error('No tenants in non-seed mode. Ensure manual configuration.');
    // Optionally, you could send a 404 or redirect here
    // res.status(404).send('Tenant not found. Is this a fresh install?');
    next(); // Or forward to a custom error handler
  }
};

// Using the middleware in your application
app.use(logRequest);
app.use(resolveAndConfigureTenant);
