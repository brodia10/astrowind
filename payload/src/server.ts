import express from 'express';
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

app.use(express.static('public'));

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware to parse JSON bodies
app.use(express.json());

// Create Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;  // Extracting priceId from the request body

  if (!priceId) {
    return res.status(400).json({ error: 'priceId is required' });
  }

  const baseUrl = process.env.NODE_ENV == 'development' ? `http://${process.env.BLOOM_DOMAIN}:3000` : `https://${process.env.BLOOM_DOMAIN}`;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      return_url: `${baseUrl}/admin/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});


// Get Session Status
app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});



const start = async () => {

  let emailConfig;

  if (process.env.NODE_ENV === 'development') {
    emailConfig = {
      fromName: process.env.BLOOM_FROM_NAME,
      fromAddress: process.env.BLOOM_EMAIL,
      logMockEmails: true,
    };
  } else {
    emailConfig = {
      transport: app.locals.emailTransport,
      fromName: process.env.BLOOM_FROM_NAME,
      fromAddress: process.env.BLOOM_EMAIL,
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