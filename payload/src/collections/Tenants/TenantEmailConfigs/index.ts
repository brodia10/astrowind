import type { CollectionConfig, FieldHook, FieldHookArgs } from 'payload/types';
import { superAdmins } from '../../../access/superAdmins';
import { isSuperOrTenantAdmin } from '../../Users/utilities/isSuperOrTenantAdmin';
import { tenantAdmins } from '../Tenants/access/tenantAdmins';

interface SMTPSettings {
    host: string | null,
    port: number | null,
    method: 'apiKey' | 'smtp' | null
}

enum Provider {
    Resend = 'resend',
    Sendgrid = 'sendgrid',
    Gmail = 'gmail',
    Outlook = 'outlook',
    CustomSMTP = 'customSMTP',
}

const providerSMTPSettings: Record<Provider, SMTPSettings> = {
    [Provider.Resend]: { host: 'smtp.resend.com', port: 465, method: 'smtp' },
    [Provider.Sendgrid]: { host: null, port: null, method: 'apiKey' },
    [Provider.Gmail]: { host: 'smtp.gmail.com', port: 587, method: 'smtp' },
    [Provider.Outlook]: { host: 'smtp-mail.outlook.com', port: 587, method: 'smtp' },
    [Provider.CustomSMTP]: { host: null, port: null, method: 'smtp' }, // Defaults for others
};

const getDefaultSMTPSettings = (provider: Provider): SMTPSettings => {
    return providerSMTPSettings[provider];
};

const setDefaultSMTPHost: FieldHook = ({ value, data, operation }: FieldHookArgs) => {
    if ((operation === 'create' || operation === 'update') && data?.provider && Object.values(Provider).includes(data.provider as Provider)) {
        const settings = getDefaultSMTPSettings(data.provider as Provider);
        return settings && settings.method === 'smtp' ? settings.host : value;
    }
    return value;
};

const setDefaultSMTPPort: FieldHook = ({ value, data, operation }: FieldHookArgs) => {
    if ((operation === 'create' || operation === 'update') && data?.provider && Object.values(Provider).includes(data.provider as Provider)) {
        const settings = getDefaultSMTPSettings(data.provider as Provider);
        return settings && settings.method === 'smtp' ? settings.port : value;
    }
    return value;
};

// Utility function to determine if the provider uses SMTP
const isSMTPMethod = (siblingData: any): boolean => {
    const smtpProviders = [Provider.Gmail, Provider.Outlook, Provider.CustomSMTP];
    return smtpProviders.includes(siblingData.provider);
};

// Utility function to determine if the provider uses an API Key
const isAPIKeyMethod = (siblingData: any): boolean => {
    const apiKeyProviders = [Provider.Sendgrid, Provider.Resend,];
    return apiKeyProviders.includes(siblingData.provider);
};


export const TenantEmailConfigs: CollectionConfig = {
    slug: 'tenant-email-configs',
    admin: {
        useAsTitle: 'fromEmailAddress',
        defaultColumns: ['fromName', 'fromEmailAddress', 'provider', 'updatedAt'],
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
                readOnly: !isSuperOrTenantAdmin,
                description: 'Reference to the tenant this Email configuration belongs to. Each tenant can have only one Email configuration.',
            },
        },
        {
            name: 'senderInfo',
            type: 'group',
            label: 'Sender Info',
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
            name: 'provider',
            type: 'radio',
            required: true,
            defaultValue: 'gmail',
            label: 'Email Provider',
            options: Object.values(Provider).map((provider) => ({ label: provider, value: provider })),
            // hooks: {
            //     beforeChange: [providerBeforeChange],
            // },
            admin: {
                description: 'Out of the box you get free, fast, and secure email with Bloom powered by Resend.io.\n\n$0 / month\nup to 3,000 emails/month or \n100 emails/day. You can also choose to integrate with your own email service provider at anytime for free.',
                position: 'sidebar',
            },
        },
        {
            name: 'auth',
            label: "Auth Method",
            type: 'group',
            admin: {
                description: 'Configure the authentication method for your email service provider here.',
                position: 'sidebar',
            },
            fields: [
                {
                    name: 'apiKey',
                    type: 'text',
                    admin: {
                        description: 'Your email provider API key',
                        condition: isAPIKeyMethod,
                    },
                    required: isAPIKeyMethod ? true : false,
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'smtpHost',
                            type: 'text',
                            defaultValue: setDefaultSMTPHost,
                            admin: {
                                placeholder: 'smtp.gmail.com',
                                condition: isSMTPMethod,
                                width: '69%',

                            },
                            required: isSMTPMethod ? true : false,
                            hooks: {
                                beforeValidate: [setDefaultSMTPHost],
                            },
                        },
                        {
                            name: 'smtpPort',
                            type: 'number',
                            defaultValue: setDefaultSMTPPort,
                            admin: {
                                placeholder: '587',
                                condition: isSMTPMethod,
                                width: '30%',

                            },
                            required: isSMTPMethod ? true : false,
                            hooks: {
                                beforeValidate: [setDefaultSMTPPort],
                            },
                        },
                    ],
                },
                {
                    name: 'smtpUsername',
                    type: 'text',
                    admin: {
                        placeholder: 'myusername',
                        condition: isSMTPMethod,
                    },
                    required: isSMTPMethod ? true : false,
                },
                {
                    name: 'smtpPassword',
                    type: 'text',
                    admin: {
                        placeholder: 'mypassword',
                        condition: isSMTPMethod,
                    },
                    required: isSMTPMethod ? true : false,
                },
                {
                    name: 'secure',
                    type: 'checkbox',
                    defaultValue: true,
                    admin: {
                        description: 'Use TLS/SSL for a secure connection',
                        condition: isSMTPMethod,
                    },
                    required: isSMTPMethod ? true : false,
                },
            ],
        },
    ],
};
