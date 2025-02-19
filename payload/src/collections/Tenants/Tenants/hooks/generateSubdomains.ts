import { CollectionBeforeChangeHook } from 'payload/types';

function generateSubdomain(tenantName: string, type: 'site' | 'dashboard'): string {
    try {
        const sanitizedTenantName = tenantName.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
        return `${sanitizedTenantName}-${type}.bloomcms.io`;
    } catch (error) {
        throw new Error(`Subdomain generation failed: ${error}`);
    }
}

function generateSubdomains(tenantName: string): { domain: string, autoGenerated: boolean, type: string }[] {
    try {
        return [
            { domain: generateSubdomain(tenantName, 'site'), autoGenerated: true, type: 'site' },
            { domain: generateSubdomain(tenantName, 'dashboard'), autoGenerated: true, type: 'dashboard' },
        ];
    } catch (error) {
        throw new Error(`Subdomain generation failed: ${error}`);
    }
}

// Payload CMS beforeCreate hook to generate subdomains when a tenant is created
const generateTenantSubdomains: CollectionBeforeChangeHook = async ({ data }) => {
    try {
        // Ensure there's a name provided for the tenant
        if (typeof data.siteName !== 'string' || data.siteName.trim() === '') {
            throw new Error('Tenant name is required and cannot be empty.');
        }

        // Only generate subdomains if they haven't been set yet
        if (!data.domains || data.domains.length === 0) {
            const subdomains = generateSubdomains(data.siteName);
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
