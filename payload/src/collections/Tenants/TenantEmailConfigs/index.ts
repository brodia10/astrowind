import type { CollectionConfig } from 'payload/types';
import { superAdmins } from '../../../access/superAdmins';
import { isSuperOrTenantAdmin } from '../../Users/utilities/isSuperOrTenantAdmin';
import { tenantAdmins } from '../Tenants/access/tenantAdmins';
import configurePostmark from './hooks/configurePostmark';

export const TenantEmailConfigs: CollectionConfig = {
    slug: 'tenant-email-configs',
    admin: {
        useAsTitle: 'fromEmailAddress',
        defaultColumns: ['fromEmailAddress', 'updatedAt'],
        description: "Configure the Email Integration for your email service provider here. Ensure that you have the correct SMTP host, port, and credentials or API key as provided by your email service.",
        group: 'CRM',
        hidden: true,
    },
    access: {
        read: tenantAdmins,
        create: superAdmins,
        update: tenantAdmins,
        delete: superAdmins,
    },
    hooks: {
        beforeChange: [configurePostmark],
    },
    fields: [
        {
            name: 'tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
            unique: true,
            index: true,
            admin: {
                readOnly: !isSuperOrTenantAdmin,
                description: 'Reference to the tenant this Email configuration belongs to. Each tenant can have only one Email configuration.',
            },
        },
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
                    label: 'Postmark Configuration',
                    description: 'Configure the Postmark settings for email service.',
                    fields: [
                        {
                            name: 'postmarkServerId',
                            type: 'number',
                            admin: {
                                // readOnly: true,
                                width: '100%',
                                description: 'The ID of the Postmark server used for this tenant.',
                            },
                        },
                        {
                            name: 'postmarkServerToken',
                            type: 'text',
                            admin: {
                                // readOnly: true,
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
                                        readOnly: true,
                                        description: 'Stream ID for transactional emails.',
                                    },
                                },
                                {
                                    name: 'broadcast',
                                    type: 'text',
                                    admin: {
                                        readOnly: true,
                                        description: 'Stream ID for broadcast emails.',
                                    },
                                },
                                {
                                    name: 'inbound',
                                    type: 'text',
                                    admin: {
                                        readOnly: true,
                                        description: 'Stream ID for inbound emails.',
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
