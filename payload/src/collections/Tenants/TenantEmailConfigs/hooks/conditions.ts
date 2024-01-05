import { Condition } from 'payload/types';

/**
 * Check if the email integration is via SMTP
 */
export const isSMTPMethod: Condition = (_, siblingData) => {
    return siblingData.provider['method'] === 'smtp';
};

/**
 * Check if the email integration is via API Key
 */
export const isAPIKeyMethod: Condition = (_, siblingData) => {
    console.log('siblingData.provider: ', siblingData.provider);
    return siblingData.provider['method'] === 'apiKey';
};

