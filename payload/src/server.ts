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

      // Initialize Tenant Services
      // app.use(async (req, res, next) => {
      //   try {
      //     const tenantResolutionService = new TenantResolutionService();
      //     const tenantConfigurationService = TenantConfigurationService.getInstance();

      //     const tenant = await tenantResolutionService.resolveTenant(req);
      //     if (tenant) {
      //       await tenantConfigurationService.configureTenantContext(tenant);
      //       next(); // Proceed to the next middleware
      //     } else {
      //       // Handle the case where no tenant could be resolved
      //       payload.logger.warn('No tenant found - considering seeding the database or redirecting to a default tenant.');
      //       // res.status(404).send('Tenant not found');
      //       // Optionally, you might redirect to a default tenant or a common error page
      //       payload.logger.warn('No tenant found - considering seeding the database.');
      //       // Seed Database with Tenants if in development or staging
      //       if (['development', 'staging'].includes(process.env.NODE_ENV)) {
      //         payload.logger.info('---- SEEDING DATABASE ----');
      //         // await seed(payload);
      //       } else {
      //         payload.logger.info('Running in production or other environment without tenants. Ensure manual configuration is done.');
      //         // You might have additional steps or logging here to handle the no-tenant scenario in production or other envs
      //       }
      //     }
      //     payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      //   } catch (error) {
      //     payload.logger.error('Error resolving or configuring tenant:', error);
      //     next(error); // Forward the error to your error handling middleware
      //   }
      // });
      console.log('Payload initialized')
    },
  })

  // Used to check the port set by heroku in prod or port 3000 for local
  app.listen(process.env.PORT || 3000)
}

start()
