import type { CollectionConfig } from 'payload/types';
import { superAdmins } from '../../../access/superAdmins';
import { tenantAdmins } from '../Tenants/access/tenantAdmins';
import configurePostmark from './hooks/configurePostmark';

export const TenantEmailConfigs: CollectionConfig = {
    slug: 'email-configs',
    admin: {
        useAsTitle: 'fromEmailAddress',
        defaultColumns: ['fromEmailAddress', 'updatedAt'],
        description: "Configure the Email Integration for your email service provider here. Ensure that you have the correct SMTP host, port, and credentials or API key as provided by your email service.",
        group: 'Team',
        hidden: true,
    },
    access: {
        read: tenantAdmins,
        create: superAdmins,
        update: tenantAdmins,
        delete: superAdmins,
    },
    hooks: {
        beforeChange: [configurePostmark]
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Sender Info',
                    description: 'Configure the sender information for outgoing emails.',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'fromEmailAddress',
                                    type: 'email',
                                    required: true,
                                    admin: {
                                        description: 'The email address that will be used to send emails from.',
                                        placeholder: 'hello@mycompany.com',
                                        width: '50%',
                                    },
                                },
                                {
                                    name: 'fromName',
                                    type: 'text',
                                    required: true,
                                    admin: {
                                        description: 'The name that will be used to send emails from.',
                                        placeholder: 'My Company',
                                        width: '50%',
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Postmark',
                    name: 'postmark',
                    description: 'Configure the Postmark settings for email service.',
                    admin: {
                        position: 'sidebar'
                    },
                    fields: [
                        {
                            name: 'postmarkServerId',
                            type: 'number',
                            admin: {
                                readOnly: true,
                                width: '100%',
                                description: 'The ID of the Postmark server used for this tenant.',
                            },
                        },
                        {
                            name: 'postmarkServerToken',
                            type: 'text',
                            admin: {
                                readOnly: true,
                                width: '100%',
                                description: 'The server API token for the Postmark server.',
                            },
                        },
                        {
                            name: 'messageStreams',
                            type: 'group',
                            admin: {
                                description: 'Message streams configured for this tenant.',
                            },
                            fields: [
                                {
                                    name: 'transactional',
                                    type: 'text',
                                    admin: {
                                        description: 'Stream ID for transactional emails.',
                                        readOnly: true,
                                    },
                                },
                                {
                                    name: 'broadcast',
                                    type: 'text',
                                    admin: {
                                        description: 'Stream ID for broadcast emails.',
                                        readOnly: true,
                                    },
                                },

                            ],
                        },
                    ],
                },

            ],
        },
    ],
};
