import { CollectionConfig } from 'payload/types';

export const Plans: CollectionConfig = {
    slug: 'plans',
    labels: {
        singular: 'Plan',
        plural: 'Plans',
    },
    access: {
        // Access control configurations
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            admin: {
                description: 'The name of the plan, as it will appear in Stripe and your application.',
            },
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            admin: {
                description: 'Price of the plan in cents to avoid floating point errors. For example, $50 should be entered as 5000.',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            admin: {
                description: 'A short description of the plan, suitable for display to customers.',
            },
        },
        {
            name: 'isFree',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                description: 'Check this box if the plan is offered for free.',
            },
        },
        {
            name: 'features',
            type: 'array',
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'A specific feature included in this plan.',
                    },
                },
            ],
        },
        // New Field for Stripe Product ID
        {
            name: 'stripeProductId',
            type: 'text',
            admin: {
                description: 'The Stripe Product ID associated with this plan. Filled out after creating the product in Stripe.',
                readOnly: true, // Set to true if you want to prevent manual editing in the PayloadCMS admin
            },
        },
        // Optional: Field for Stripe Price ID if you decide to manually manage and reference prices
        {
            name: 'stripePriceId',
            type: 'text',
            admin: {
                description: 'The Stripe Price ID associated with this plan. Filled out after creating the price in Stripe.',
                readOnly: true, // Set to true if you prefer to keep this field managed outside of the admin interface
            },
        },
    ],
};

export default Plans;
