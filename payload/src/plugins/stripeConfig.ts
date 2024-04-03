
const stripeConfig = {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeAccountId: process.env.STRIPE_ACCOUNT_ID,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
    sync: [
        {
            collection: 'customers',
            stripeResourceType: 'customers',
            stripeResourceTypeSingular: 'customer',
            fields: [
                {
                    fieldPath: 'stripeCustomerId', // this is a field on your own Payload config
                    stripeProperty: 'name', // use dot notation, if applicable
                },
            ],
        },
        {
            collection: 'plans',
            stripeResourceType: 'subscriptions',
            stripeResourceTypeSingular: 'subscription',
            fields: [
                {
                    fieldPath: 'stripePlanId', // this is a field on your own Payload config
                    stripeProperty: 'name', // use dot notation, if applicable
                },
            ],
        },
    ],
}

export default stripeConfig;