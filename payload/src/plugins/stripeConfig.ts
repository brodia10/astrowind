
const stripeConfig = {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeAccountId: process.env.STRIPE_ACCOUNT_ID,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
    // webhooks: {
    //     'product.created': productUpdated,
    //     'product.updated': productUpdated,
    //     'price.updated': priceUpdated,
    // },
    sync: [
        {
            collection: 'customers',
            stripeResourceType: 'customers',
            stripeResourceTypeSingular: 'customer',
            fields: [
                {
                    fieldPath: 'id', // this is a field on your own Payload config
                    stripeProperty: 'metadata.bloomId', // use dot notation, if applicable
                },
                {
                    fieldPath: 'email', // this is a field on your own Payload config
                    stripeProperty: 'email', // use dot notation, if applicable
                },
                {
                    fieldPath: 'name', // this is a field on your own Payload config
                    stripeProperty: 'name', // use dot notation, if applicable
                },
            ],
        },
        {
            collection: 'plans',
            stripeResourceType: 'products',
            stripeResourceTypeSingular: 'product',
            fields: [
                {
                    fieldPath: 'name', // this is a field on your own Payload config
                    stripeProperty: 'name', // use dot notation, if applicable
                },
                {
                    fieldPath: 'description', // this is a field on your own Payload config
                    stripeProperty: 'description', // use dot notation, if applicable
                },
                {
                    fieldPath: 'features', // this is a field on your own Payload config
                    stripeProperty: 'features', // use dot notation, if applicable
                },
            ],
        },
    ],
}

export default stripeConfig;