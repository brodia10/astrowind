// TenantResolutionService.ts
import { Request } from 'express';
import payload from 'payload';
import { Tenant } from '../../payload-types';

export class TenantResolutionService {
    // This service is instantiated per request to resolve the tenant based on the domain
    async resolveTenant(req: Request): Promise<Tenant | null> {
        const domain = req.hostname;
        payload.logger.info("incoming request from", domain)

        const tenants = await payload.find({
            collection: 'tenants',
            where: {
                domain: {
                    equals: domain,
                },
            },
        });

        // Return the first matching tenant or null if no match is found
        return tenants.docs.length > 0 ? tenants.docs[0] : null;
    }
}
