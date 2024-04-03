import { CollectionConfig } from 'payload/types';

export const Plans: CollectionConfig = {
    slug: 'plans',
    access: {
        // Define your access control here
    },
    fields: [
        {
            name: 'stripePlanId',
            type: 'text',
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'price',
            type: 'number',
            admin: {
                description: 'Price of the plan.',
            },
        },
    ],
};
