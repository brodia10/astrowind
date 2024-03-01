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
        description: 'Track and manage the subscription history of your contacts, including both opt-ins and opt-outs. This collection provides a detailed record of each contact’s preferences over time, including the type of action (Opt-In or Opt-Out), the date it occurred, the source of the action, and the reason provided. Essential for maintaining compliance with email marketing regulations and for understanding the changing preferences of your audience.'
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
