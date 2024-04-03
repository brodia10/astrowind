// src/collections/EmailLists.js

import { CollectionConfig } from "payload/types";

const EmailLists: CollectionConfig = {
    slug: 'email-lists',
    access: {
        // Access control logic for email lists
        create: ({ req }) => !!req.user,
    },
    admin: {
        useAsTitle: 'name',
        description: 'Streamline your email campaigns and newsletter management by organizing your audience into specific lists. Create categories such as "Subscribers," "Prospects," "Customers," or "VIPs" to tailor your communication effectively. This tool is designed for marketers and businesses focused on engaging their audience through customized content and updates.',
        hidden: true,
        listSearchableFields: ['name',]
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
