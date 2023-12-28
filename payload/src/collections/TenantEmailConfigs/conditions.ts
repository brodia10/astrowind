import { Condition } from 'payload/types';

/**
 * Check if the email integration is via SMTP
 */
export const isSMTP: Condition = (_, siblingData) => {
    return siblingData.emailIntegrationMethod === 'smtp';
};

/**
 * Check if the email integration is via API Key
 */
export const isAPIKey: Condition = (_, siblingData) => {
    return siblingData.emailIntegrationMethod === 'apiKey';
};