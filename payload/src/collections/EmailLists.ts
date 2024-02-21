// src/collections/EmailLists.js

import { CollectionConfig } from "payload/types";

const EmailLists: CollectionConfig = {
    slug: 'email-lists',
    access: {
        // Access control logic for email lists
        create: ({ req }) => !!req.user,
    },
    fields: [
        {
            name: 'name',
            label: 'List Name',
            type: 'text',
            required: true,
            unique: true,
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

export default EmailLists;
