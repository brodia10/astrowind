
const stripeConfig = {
    stripeSecretKey: 'sk_test_51KrDzFGcfEQQlDX8Fvrxh2oNChaqfmmiRNeSd4lu9b6DdRF4xjOmfyr1rkwyGgvBoXoBOJKIw684aMSnQ04N0fd600OwvB61YU',
    stripePublishableKey: 'pk_test_51KrDzFGcfEQQlDX8XwBds4zmbG5zfjY6JdSQlPqLyMgv9JOEJyqXit5tft2N7IGyoIvZAx4sikw3OmKqBbou9gSw00LDSynn5o',
    stripeAccountId: process.env.STRIPE_ACCOUNT_ID,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}

export default stripeConfig;