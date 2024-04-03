import { CollectionConfig } from 'payload/types';
import { superAdmins } from '../../access/superAdmins';

// Plans offered by Bloom CMS. These are global plans that are available to all tenants. One active plan per tenant.
const GlobalPlans: CollectionConfig = {
    slug: 'global-plans',
    admin: {
        useAsTitle: 'planGroup.globalPlan',
        hidden: true,
    },
    access: {
        create: superAdmins,
        read: superAdmins,
        update: superAdmins,
        delete: superAdmins,
    },
    fields: [
        // Plan group
        {
            name: 'planGroup',
            label: 'Plan',
            type: 'group',
            fields: [
                {
                    name: 'globalPlan',
                    label: 'Bloom Plan',
                    type: 'radio',
                    options: [
                        { label: 'Free', value: 'free' },
                        { label: 'Mini', value: 'mini' },
                        { label: 'Pro', value: 'pro' },
                        { label: 'Enterprise', value: 'enterprise' }
                    ],
                    defaultValue: 'free',
                    required: true,
                },
            ],
        },
        // Payment group
        {
            name: 'paymentGroup',
            label: 'Payment',
            type: 'group',
            fields: [
                {
                    name: 'paymentMethod',
                    label: 'Payment Method',
                    type: 'text', // Modify as needed based on how you're handling payments
                    required: true,
                },
            ],
        },
    ],
};

export default GlobalPlans;
