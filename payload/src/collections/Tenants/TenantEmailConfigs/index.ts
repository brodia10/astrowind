import type { CollectionConfig } from 'payload/types';
import { superAdmins } from '../../../access/superAdmins';
import { tenantAdmins } from '../Tenants/access/tenantAdmins';
import { isAPIKey, isSMTP } from './conditions';


export const TenantEmailConfigs: CollectionConfig = {
    slug: 'tenant-email-configs',
    admin: {
        useAsTitle: 'fromEmailAddress',
        defaultColumns: ['fromName', 'fromEmailAddress', 'provider', 'emailIntegrationMethod', 'updatedAt'],
        description: "Configure the Email Integration for your email service provider here. Ensure that you have the correct SMTP host, port, and credentials or API key as provided by your email service.",
    },
    access: {
        read: tenantAdmins,
        create: superAdmins,
        update: tenantAdmins,
        delete: superAdmins,
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
                description: 'Reference to the tenant this Email configuration belongs to. Each tenant can have only one Email configuration.',
            },
        },
        {
            name: 'provider',
            type: 'radio',
            required: false,
            defaultValue: 'resend',
            label: 'Email Provider',
            options: [
                { value: 'resend', label: 'Resend (default)' },
                { value: 'mailgun', label: 'Mailgun' },
                { value: 'sendgrid', label: 'Sendgrid' },
                { value: 'gmail', label: 'Gmail' },
                { value: 'outlook', label: 'Outlook' },
                { value: 'hubspot', label: 'Hubspot' },
            ],
            admin: {
                description: 'By default, Bloom creates a free account for you on Resend.io which offers 1000. You can also choose to integrate with your own email service provider.',
            },
        },
        {
            name: 'emailIntegrationMethod',
            type: 'radio',
            required: true,
            defaultValue: 'apiKey',
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
