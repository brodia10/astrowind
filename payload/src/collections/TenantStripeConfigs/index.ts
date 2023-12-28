import { CollectionConfig } from "payload/types";
import { superAdmins } from "../../access/superAdmins";
import { tenantAdmins } from "../Tenants/access/tenantAdmins";

export const TenantStripeConfigs: CollectionConfig = {
    slug: 'tenant-stripe-configs',
    labels: {
        singular: 'Tenant Stripe Configuration',
        plural: 'Tenant Stripe Configurations',
    },
    admin: {
        useAsTitle: 'tenant',
    },
    access: {
        create: superAdmins,
        read: tenantAdmins,
        update: tenantAdmins,
        delete: superAdmins,
    },
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
        {
            name: 'stripeKeys',
            type: 'group',
            admin: {
                description: 'Group of Stripe API keys required for transactions and operations.',
            },
            fields: [
                {
                    name: 'stripeSecretKey',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Your secret key from the Stripe Dashboard. Keep this secure and do not share it publicly. [Manage keys](https://dashboard.stripe.com/apikeys)',
                    },
                },
                {
                    name: 'stripePublishableKey',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Your publishable key from Stripe. This key is used in the frontend for Stripe operations. [Find your publishable key](https://dashboard.stripe.com/apikeys)',
                    },
                },
            ],
        },
        {
            name: 'additionalStripeSettings',
            type: 'group',
            admin: {
                description: 'Additional settings for Stripe integration, including account ID and webhook secret.',
            },
            fields: [
                {
                    name: 'stripeAccountId',
                    type: 'text',
                    admin: {
                        description: 'If using Stripe Connect, provide the connected account ID. This is typically used for platforms managing payments on behalf of other users. [Stripe Connect documentation](https://stripe.com/docs/connect)',
                    },
                },
                {
                    name: 'stripeWebhookSecret',
                    type: 'text',
                    admin: {
                        description: 'The signing secret for securing webhooks. This is used to validate received events from Stripe. [Webhook signing secrets](https://stripe.com/docs/webhooks/signatures)',
                    },
                },
            ],
        },
        {
            name: 'paymentSettings',
            type: 'group',
            admin: {
                description: 'Configure payment and currency settings for the tenant.',
            },
            fields: [
                {
                    name: 'defaultCurrency',
                    type: 'text',
                    admin: {
                        description: 'The default currency used for transactions, e.g., "USD", "EUR". This should match the primary currency used in your Stripe account.',
                    },
                },
                {
                    name: 'paymentMethods',
                    type: 'array',
                    admin: {
                        position: "sidebar",
                        description: 'List the payment method types you want to accept, such as "card", "bank_transfer", etc. Each method should be added separately. Refer to Stripe documentation for valid options and instructions on how to set up each method. [Payment methods](https://stripe.com/docs/payments/payment-methods/introduction)',
                    },
                    fields: [
                        {
                            name: 'method',
                            type: 'text',
                            required: true,
                            admin: {
                                placeholder: 'e.g., card, bank_transfer',
                                description: "Enter the type of payment method you want to accept. Make sure it's supported by Stripe and correctly configured in your Stripe Dashboard.",
                            },
                        },
                    ],
                    index: true, // assuming you want to index the payment methods for quicker searches
                },
            ],
        },
        {
            name: 'redirectUrls',
            type: 'group',
            admin: {
                description: 'URLs to redirect customers during and after the checkout process.',
            },
            fields: [
                {
                    name: 'successUrl',
                    type: 'text',
                    admin: {
                        description: 'URL to redirect customers to after a successful payment. Make sure this is a URL where the customer can view their purchase or confirmation.',
                    },
                },
                {
                    name: 'cancelUrl',
                    type: 'text',
                    admin: {
                        description: 'URL to redirect customers to if they cancel the checkout process. This should be a URL where they can resume the purchase or receive further instructions.',
                    },
                },
            ],
        },
    ],
};
