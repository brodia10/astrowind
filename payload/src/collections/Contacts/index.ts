// src/collections/Contacts.js

import { CollectionConfig } from "payload/types";

const Contacts: CollectionConfig = {
    slug: 'contacts',
    access: {
        // Define your access control logic here
        create: ({ req }) => !!req.user,
    },
    hooks: {
        beforeChange: [
            async ({ req, data }) => {
                // Check if the tenant field is already set, indicating an update operation or manual tenant assignment
                if (!data.tenant && req.user?.tenantId) {
                    // Automatically set the tenant field to the current user's tenant ID if not already set
                    data.tenant = req.user.tenantId;
                }

                return data;
            },
        ],
    },
    fields: [
        {
            name: 'email_address',
            label: 'Email Address',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'first_name',
            label: 'First Name',
            type: 'text',
        },
        {
            name: 'last_name',
            label: 'Last Name',
            type: 'text',
        },
        {
            name: 'email_status',
            label: 'Email Status',
            type: 'select',
            options: ['Active', 'Unsubscribed'],
        },
        {
            name: 'email_permission_status',
            label: 'Email Permission Status',
            type: 'select',
            options: ['Express', 'Implied'],
        },
        {
            name: 'tenant',
            label: 'Tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
        },
        {
            name: 'email_lists',
            label: 'Email Lists',
            type: 'relationship',
            relationTo: 'email-lists',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },

    ],
};

export default Contacts;
