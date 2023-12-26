import type { CollectionConfig } from 'payload/types';
import { loggedIn } from '../Pages/access/loggedIn';
import { tenants } from '../Pages/access/tenants';
import { tenantAdmins } from '../Tenants/access/tenantAdmins';
import { isAPIKey, isSMTP } from './conditions';


export const EmailProviders: CollectionConfig = {
    slug: 'email-providers',
    admin: {
        useAsTitle: 'fromEmailAddress',
        defaultColumns: ['fromName', 'fromEmailAddress', 'provider', 'emailIntegrationMethod', 'updatedAt'],
        description: "Configure the Email Integration for your email service provider here. Ensure that you have the correct SMTP host, port, and credentials or API key as provided by your email service.",
    },
    access: {
        read: tenants,
        create: loggedIn,
        update: tenantAdmins,
        delete: tenantAdmins,
    },
    fields: [
        {
            name: 'provider',
            type: 'radio',
            required: false,
            options: [
                { value: 'gmail', label: 'Gmail' },
                { value: 'outlook', label: 'Outlook' },
                { value: 'sendgrid', label: 'Sendgrid' },
                { value: 'hubspot', label: 'Hubspot' },
                { value: 'other', label: 'Other' },
            ],
            admin: {
                description: 'Choose your email service provider.',
            },
        },
        {
            name: 'emailIntegrationMethod',
            type: 'radio',
            required: true,
            options: [
                { value: 'smtp', label: 'SMTP - Standard email sending protocol' },
                { value: 'apiKey', label: 'API Key - For providers with an API for sending emails' },
            ],
            admin: {
                description: 'Select how you want to integrate with your email service provider. Choose SMTP for traditional email servers or API Key for providers that offer an API to send emails.',
            },
        },
        {
            name: 'fromEmailAddress',
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
            required: isSMTP ? true : false,
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
            required: isSMTP ? true : false,
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
            required: isSMTP ? true : false,
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
            required: isSMTP ? true : false,
            admin: {
                description: 'ex: mypassword',
                position: 'sidebar',
                condition: isSMTP,
            },
        },
        {
            name: 'secure',
            type: 'checkbox',
            defaultValue: true,
            required: isSMTP ? true : false,
            admin: {
                description: 'Use TLS/SSL for a secure connection',
                position: 'sidebar',
                condition: isSMTP,
                readOnly: true,
            },
        },
    ],
};
