import { CollectionConfig } from 'payload/types';

export const Customers: CollectionConfig = {
    slug: 'customers',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        // Define your access control here
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            admin: {
                readOnly: true,
            }
        },
        {
            name: 'email',
            type: 'email',
            admin: {
                readOnly: true,
            }
        },
        {
            name: 'paymentMethod',
            type: 'text',
            admin: {
                description: 'The default payment method used by the customer.',
            },
        },
        {
            name: 'plan',
            label: 'Plan',
            type: 'relationship',
            relationTo: 'plans',
            hasMany: true,
        },
    ],
};
