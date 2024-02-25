// src/collections/Contacts.js

import { CollectionConfig } from "payload/types";

const Contacts: CollectionConfig = {
    slug: 'contacts',
    access: {
        // Define your access control logic here
        create: ({ req }) => !!req.user,
    },
    admin: {
        useAsTitle: 'email_address',
        group: 'Audience',
        description: 'Welcome to your Contact Management Hub! Here, you can easily manage your contacts, keeping their information up-to-date and organized. This section lets you tailor how you reach out to your contacts, whether it’s for sending newsletters, announcements, or other important updates. It"s all about making sure you connect with your contacts the right way, at the right time. Perfect for keeping your community engaged and informed!'
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
        // Personal Information Group
        {
            name: 'personal_info',
            label: 'Personal Information',
            type: 'group',
            fields: [
                {
                    name: 'email_address',
                    label: 'Email Address',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        description: 'Primary email for login and communications. Must be unique.',
                    },
                },
                {
                    name: 'first_name',
                    label: 'First Name',
                    type: 'text',
                    admin: {
                        description: 'The user\'s given name for personalization.',
                    },
                },
                {
                    name: 'last_name',
                    label: 'Last Name',
                    type: 'text',
                    admin: {
                        description: 'The user\'s family name.',
                    },
                },
            ],
        },

        // Subscription Management Group (Sidebar)
        {
            name: 'subscription_management',
            label: 'Subscription Management',
            type: 'group',
            admin: {
                position: 'sidebar',
                description: 'Subscription preferences and email communication settings.',
            },
            fields: [
                {
                    name: 'email_lists',
                    label: 'Email Lists',
                    type: 'relationship',
                    relationTo: 'email-lists',
                    hasMany: true,
                    admin: {
                        position: 'sidebar',
                        description: 'Select multiple email lists to subscribe the user.',
                    },
                },
                {
                    name: 'email_status',
                    label: 'Email Status',
                    type: 'select',
                    options: ['Active', 'Unsubscribed'],
                    admin: {
                        position: 'sidebar',
                        description: 'Current email subscription status.',
                    },
                },
                {
                    name: 'email_permission_status',
                    label: 'Email Permission Status',
                    type: 'select',
                    options: ['Express', 'Implied'],
                    admin: {
                        position: 'sidebar',
                        description: 'Type of permission granted for email communications.',
                    },
                },
            ],
        },
        // Tenant Relationship
        {
            name: 'tenant',
            label: 'Tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
            admin: {
                description: 'Associate the user with a specific tenant entity.',
            },
        },
    ],
};

export default Contacts;
