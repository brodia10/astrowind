import { CollectionBeforeChangeHook } from 'payload/types';
import { v4 as uuidv4 } from 'uuid';

// Function to generate a UUID for the subdomain
function generateUniqueId(): string {
    // Generate a UUID, remove all non-numeric characters, take the first 6 characters
    return uuidv4().split('-').join('') // Remove '-' from UUID
        .replace(/\D/g, '') // Remove all non-numeric characters
        .slice(0, 6); // Take the first 6 characters
}

// Function to generate the subdomain string
function generateSubdomain(tenantName: string, uniqueId: string, type: 'site' | 'dashboard'): string {
    try {
        const sanitizedTenantName = tenantName.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
        return `${sanitizedTenantName}-${uniqueId}-${type}.bloomcms.io`;
    } catch (error) {
        throw new Error(`Subdomain generation failed: ${error}`);
    }
}

// Function to generate both site and dashboard subdomains
function generateSubdomains(tenantName: string): { domain: string, autoGenerated: boolean, type: string }[] {
    try {
        const uniqueId = generateUniqueId();
        return [
            { domain: generateSubdomain(tenantName, uniqueId, 'site'), autoGenerated: true, type: 'site' },
            { domain: generateSubdomain(tenantName, uniqueId, 'dashboard'), autoGenerated: true, type: 'dashboard' },
        ];
    } catch (error) {
        throw new Error(`Subdomain generation failed: ${error}`);
    }
}

// Payload CMS beforeCreate hook to generate subdomains when a tenant is created
const generateTenantSubdomains: CollectionBeforeChangeHook = async ({ data }) => {
    try {
        // Ensure there's a name provided for the tenant
        if (typeof data.name !== 'string' || data.name.trim() === '') {
            throw new Error('Tenant name is required and cannot be empty.');
        }

        // Only generate subdomains if they haven't been set yet
        if (!data.domains || data.domains.length === 0) {
            const subdomains = generateSubdomains(data.name);
            data.domains = subdomains;
        }
    } catch (error) {
        // Log the error or handle it according to your application's needs
        console.error(`Error in beforeCreate hook for tenants: ${error}`);
        throw error; // Re-throwing the error is important to stop the operation if there's an issue
    }
    return data;
};

export default generateTenantSubdomains;