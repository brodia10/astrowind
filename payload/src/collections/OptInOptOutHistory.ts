// src/collections/OptInOptOutHistory.js

import { CollectionConfig } from "payload/types";

const OptInOptOutHistory: CollectionConfig = {
    slug: 'opt-in-opt-out-history',
    access: {
        // Similar access control logic as Contacts
        create: ({ req }) => !!req.user,
    },
    admin: {
        hidden: true,
    },
    fields: [
        {
            name: 'contact',
            label: 'Contact',
            type: 'relationship',
            relationTo: 'contacts',
            required: true,
        },
        {
            name: 'opt_type',
            label: 'Type',
            type: 'select',
            options: ['Opt-In', 'Opt-Out'],
            required: true,
        },
        {
            name: 'date',
            label: 'Date',
            type: 'date',
            required: true,
        },
        {
            name: 'source',
            label: 'Source',
            type: 'text',
        },
        {
            name: 'reason',
            label: 'Reason',
            type: 'textarea',
        },
        {
            name: 'tenant',
            label: 'Tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
        },
    ],
};

export default OptInOptOutHistory;
