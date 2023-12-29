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
app.use(async (req, res, next) => {
  payload.logger.info(`Request URL: ${req.url}`)
  try {
    // Instantiate services
    const tenantResolutionService = new TenantResolutionService();
    const tenantConfigurationService = TenantConfigurationService.getInstance();

    // Resolve the tenant from the request
    const tenant = await tenantResolutionService.resolveTenant(req);

    if (tenant) {
      payload.logger.info(`Tenant: ${tenant?.name}`)
      await tenantConfigurationService.configureTenantContext(tenant);
      next(); // Proceed to the next middleware
    } else {
      // No tenant could be resolved
      // res.status(404).send('Tenant not found. Is this a fresh install?');
      payload.logger.warn('No tenant found.');
      // Seed Database with Tenants if in development or staging
      if (['development', 'staging'].includes(process.env.NODE_ENV)) {
        payload.logger.info(`Env is ${process.env.NODE_ENV}.`);
        try {
          payload.logger.info('---- SEEDING DATABASE ----');
          await seed(payload);
          // redirect to admin
          payload.logger.info('---- SEEDING SUCCESS ----');
        } catch (error) {
          payload.logger.error('Error seeding database:', error);
          next(error); // Forward the error to your error handling middleware
        }
      } else {
        payload.logger.error('Running in production or other environment without tenants. Ensure manual configuration is done. Is this a fresh install?');
        // You might have additional steps or logging here to handle the no-tenant scenario in production or other envs
      }
    }
  } catch (error) {
    payload.logger.error('Error resolving or configuring tenant:', error);
    next(error); // Forward the error to your error handling middleware
  }
});