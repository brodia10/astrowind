// src/collections/Contacts.js

import { CollectionConfig } from "payload/types";

interface SelectOption {
    value: string;
    label: string;
}

const emailStatusOptions: SelectOption[] = [
    { value: 'Active', label: 'Active' },
    { value: 'Unsubscribed', label: 'Unsubscribed' },
];

enum EmailStatus {
    Active = 'Active',
    Unsubscribed = 'Unsubscribed',
}

enum PermissionStatus {
    Express = 'Express',
    Implied = 'Implied',
}

const Subscribers: CollectionConfig = {
    slug: 'subscribers',
    access: {
        create: ({ req }) => !!req.user,
    },
    admin: {
        useAsTitle: 'email.email_address',
        group: 'Audience',
        description: 'Welcome to the Subscriber Hub, where managing your subscribers\' information becomes intuitive and efficient. Perfect for organizing newsletters, sending out event announcements, or sharing important updates, this hub allows you to connect with your audience effectively. Utilize it to segment your contacts for targeted campaigns, keep your community informed, and enhance engagement with timely and relevant communications.'
    },
    hooks: {
        beforeChange: [
            async ({ req, data }) => {
                if (!data.tenant && req.user?.tenantId) {
                    data.tenant = req.user.tenantId;
                }
                return data;
            },
        ],
    },
    fields: [
        {
            name: 'email',
            type: 'group',
            label: 'Newsletters and Email Campaigns',
            admin: {
                description: 'Newsletters and Email Campaigns this user has subscribed to.',
                position: 'sidebar'
            },
            fields: [
                {
                    name: 'email_address',
                    label: 'Email Address',
                    type: 'text',
                    required: true,
                    unique: true,
                    // hidden: true,
                },
                {
                    name: 'email_lists',
                    label: 'Newsletters and Email Campaigns',
                    type: 'relationship',
                    relationTo: 'email-lists',
                    required: true,
                    hasMany: true,
                },
            ],
        },
        {
            name: 'subscription_management',
            label: 'Subscription Management',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [

                        {
                            name: 'email_status',
                            label: 'Email Status',
                            required: true,
                            type: 'select',
                            options: emailStatusOptions,
                            admin: {
                                width: '50%',
                            },
                        },
                        {
                            name: 'email_permission_status',
                            label: 'Email Permission Status',
                            type: 'select',
                            defaultValue: EmailStatus.Active,
                            required: true,
                            options: [
                                { value: PermissionStatus.Express, label: 'Express' },
                                { value: PermissionStatus.Implied, label: 'Implied' },
                            ],
                            admin: {
                                width: '50%',
                            },
                        },
                        {
                            name: 'confirmed_opt_in_date',
                            label: 'Confirmed Opt-In Date',
                            type: 'date',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            name: 'confirmed_opt_in_source',
                            label: 'Confirmed Opt-In Source',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            name: 'confirmed_opt_out_date',
                            label: 'Confirmed Opt-Out Date',
                            type: 'date',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            name: 'confirmed_opt_out_source',
                            label: 'Confirmed Opt-Out Source',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            name: 'confirmed_opt_out_reason',
                            label: 'Confirmed Opt-Out Reason',
                            type: 'textarea',
                            required: true,
                        },
                    ],
                },
            ],
            admin: {
                description: 'Manage subscription preferences and communication settings.',
            },
        },
        {
            name: 'tenant',
            label: 'Tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
            admin: {
                position: 'sidebar',
                width: '100%', // Assuming you might still want this in the sidebar for now, with a plan to hide it eventually.
            },
        },
    ],
};

export default Subscribers;
