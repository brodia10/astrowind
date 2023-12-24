import type { CollectionConfig } from 'payload/types';
import { loggedIn } from '../Pages/access/loggedIn';
import { tenants } from '../Pages/access/tenants';
import { tenantAdmins } from '../Tenants/access/tenantAdmins';
import { isAPIKey, isSMTP } from './conditions';


export const EmailProviders: CollectionConfig = {
    slug: 'email-providers',
    admin: {
        useAsTitle: 'fromName',
        defaultColumns: ['fromName', 'provider', 'configType', 'updatedAt'],
        description: "Configure the SMTP settings for your email service provider here. Ensure that you have the correct SMTP host, port, and credentials as provided by your email service.",
    },
    access: {
        read: tenants,
        create: loggedIn,
        update: tenantAdmins,
        delete: tenantAdmins,
    },
    fields: [
        {
            name: 'configType',
            type: 'select',
            required: true,
            options: [
                { value: 'smtp', label: 'SMTP' },
                { value: 'apiKey', label: 'API Key' },
            ],
            admin: {
                description: 'Choose the configuration type for your email provider',
            },
        },
        {
            name: 'provider',
            type: 'select',
            required: false,
            options: [
                { value: 'gmail', label: 'Gmail' },
                { value: 'outlook', label: 'Outlook' },
                { value: 'sendgrid', label: 'Sendgrid' },
                { value: 'hubspot', label: 'Hubspot' },
            ],
            admin: {
                description: 'Choose your email service provider.',
            },
        },
        {
            name: 'fromAddress',
            type: 'text',
            required: true,
            admin: {
                description: 'The email address that will be used to send emails from. ex: hello@mycompany.com',
            },
        },
        {
            name: 'fromName',
            type: 'text',
            required: true,
            admin: {
                description: 'The name that will be used to send emails from. ex: My Company',
            },
        },
        {
            name: 'apiKey',
            label: 'Provider API Key',
            required: isAPIKey ? true : false,
            type: 'text',
            admin: {
                description: 'Your email provider API key',
                condition: isAPIKey,
                position: 'sidebar',
            },
        },
        {
            name: 'smtpHost',
            label: 'SMTP Host',
            type: 'text',
            required: true,
            admin: {
                description: 'ex: smtp.gmail.com',
                position: 'sidebar',
                condition: isSMTP,
            },
        },
        {
            name: 'smtpPort',
            label: 'SMTP Port',
            type: 'number',
            required: true,
            admin: {
                description: 'ex: 587',
                position: 'sidebar',
                condition: isSMTP,
            },
        },
        {
            name: 'username',
            label: 'SMTP Username',
            type: 'text',
            required: true,
            admin: {
                description: 'ex: myusername',
                position: 'sidebar',
                condition: isSMTP,
            },
        },
        {
            name: 'password',
            label: 'SMTP Password',
            type: 'text',
            required: true,
            admin: {
                description: 'ex: mypassword',
                position: 'sidebar',
                condition: isSMTP,
            },
        },
        {
            name: 'secure',
            type: 'checkbox',
            admin: {
                description: 'Use TLS/SSL for a secure connection',
                position: 'sidebar',
                condition: isSMTP,
            },
        },
    ],
};
