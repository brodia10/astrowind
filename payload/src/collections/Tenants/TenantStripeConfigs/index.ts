import { CollectionConfig } from 'payload/types';
import { superAdmins } from '../../../access/superAdmins';
import { tenantAdmins } from '../Tenants/access/tenantAdmins';

export const TenantStripeConfigs: CollectionConfig = {
    slug: 'tenant-stripe-configs',
    labels: {
        singular: 'Stripe',
        plural: 'Stripe',
    },
    admin: {
        useAsTitle: 'tenant',
        // TODO: unhide when we get to ecommerce
        hidden: true,
    },
    access: {
        create: superAdmins,
        read: tenantAdmins,
        update: tenantAdmins,
        delete: superAdmins,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'General',
                    description: 'General tenant information and relationship.',
                    fields: [
                        {
                            name: 'tenant',
                            type: 'relationship',
                            relationTo: 'tenants',
                            required: true,
                            unique: true,
                            index: true,
                            admin: {
                                description: 'Reference to the tenant this Stripe configuration belongs to. Each tenant can have only one Stripe configuration.',
                            },
                        },
                    ],
                },
                {
                    label: 'Stripe Keys',
                    description: 'Stripe API keys for secure transactions.',
                    fields: [
                        {
                            name: 'stripeSecretKey',
                            type: 'text',
                            required: true,
                            defaultValue: 'sk_test_51J0W7Y2eZvKYlo2C',
                            admin: {
                                description: 'Your secret key from the Stripe Dashboard. Keep this secure and do not share it publicly. [Manage keys](https://dashboard.stripe.com/apikeys)',
                                readOnly: true,
                            },
                        },
                        {
                            name: 'stripePublishableKey',
                            type: 'text',
                            required: true,
                            defaultValue: 'pk_test_51J0W7Y2eZvKYlo2C',
                            admin: {
                                description: 'Your publishable key from Stripe. This key is used in the frontend for Stripe operations. [Find your publishable key](https://dashboard.stripe.com/apikeys)',
                                readOnly: true,
                            },
                        },

                        {
                            name: 'stripeAccountId',
                            type: 'text',
                            required: true,
                            defaultValue: 'acct_1J0W7Y2eZvKYlo2C',
                            admin: {
                                description: 'The Stripe account ID specific to the tenant, used in conjunction with Stripe Connect. [Stripe Connect documentation](https://stripe.com/docs/connect)',
                                readOnly: true,
                            },
                        },
                        {
                            name: 'stripeWebhookSecret',
                            type: 'text',
                            required: true,
                            defaultValue: '2IUHJ-2asdgSDGDSG-DSG',
                            admin: {
                                description: 'The signing secret for securing webhooks. This is used to validate received events from Stripe. [Webhook signing secrets](https://stripe.com/docs/webhooks/signatures)',
                                readOnly: true,
                            },
                        },

                    ],
                },
                {
                    label: 'Payment & Currency',
                    description: 'Configure default currency and payment methods.',
                    fields: [
                        {
                            name: 'defaultCurrency',
                            type: 'select',
                            options: [
                                "US",
                                "EU",
                                "GB",
                                "CA",
                                "AF",
                                "AX",
                                "AL",
                                "DZ",
                                "AS",
                                "AD",
                                "AO",
                            ],
                            required: true,
                            defaultValue: 'US',
                            admin: {
                                description: 'The default currency used for transactions, e.g., "USD", "EUR". This should match the primary currency used in the tenant’s Stripe account.',
                            },
                        },
                        {
                            name: 'paymentMethods',
                            type: 'radio',
                            admin: {
                                position: 'sidebar',
                                description: 'Select the payment method types you want to accept. These are the top 15 payment processors supported by Stripe.',
                            },
                            options: [
                                { label: 'American Express', value: 'american_express' },
                                { label: 'Diners Club', value: 'diners_club' },
                                { label: 'Mastercard', value: 'mastercard' },
                                { label: 'Visa', value: 'visa' },
                                { label: 'Apple Pay', value: 'apple_pay' },
                                { label: 'Google Pay', value: 'google_pay' },
                                { label: 'Microsoft Pay', value: 'microsoft_pay' },
                                { label: 'PayPal', value: 'paypal' },
                                { label: 'Alipay', value: 'alipay' },
                                { label: 'WeChat Pay', value: 'wechat_pay' },
                                { label: 'UnionPay', value: 'unionpay' },
                                { label: 'JCB', value: 'jcb' },
                                { label: 'Klarna', value: 'klarna' },
                                { label: 'Afterpay', value: 'afterpay' },
                                { label: 'iDEAL', value: 'ideal' },
                            ],
                            defaultValue: 'visa',
                            required: true,
                            index: true,
                        },

                    ],
                },
                {
                    label: 'Redirect URLs',
                    description: 'URLs for redirecting customers during payment flows.',
                    fields: [
                        {
                            name: 'successUrl',
                            type: 'text',
                            required: true,
                            defaultValue: 'https://example.com/success',
                            admin: {
                                description: 'URL to redirect customers to after a successful payment. Make sure this is a URL where the customer can view their purchase or confirmation.',
                            },
                        },
                        {
                            name: 'cancelUrl',
                            type: 'text',
                            required: true,
                            defaultValue: 'https://example.com/shop',
                            admin: {
                                description: 'URL to redirect customers to if they cancel the checkout process. This should be a URL where they can resume the purchase or receive further instructions.',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

