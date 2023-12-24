import { Condition } from 'payload/types';

/**
 * Check if the configuration type is SMTP
 */
export const isSMTP: Condition = (_, siblingData) => {
    return siblingData.configType === 'smtp';
};

/**
 * Check if the configuration type is API Key
 */
export const isAPIKey: Condition = (_, siblingData) => {
    return siblingData.configType === 'apiKey';
};