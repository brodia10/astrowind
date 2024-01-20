
// These will be tenants stripe secrets that are created for them. We'll use the strip config service to get and set the stripe config for each tenant.
const stripeConfig = {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeAccountId: process.env.STRIPE_ACCOUNT_ID,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    rest: true, // proxy to the Stripe REST API
    logs: true, // log information to console
}

export default stripeConfig;    