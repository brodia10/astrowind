// TenantResolutionService.ts
import { Request } from 'express';
import payload from 'payload';
import { Tenant } from '../../payload-types';

export class TenantResolutionService {
    // This service is instantiated per request to resolve the tenant based on the domain
    async resolveTenant(req: Request): Promise<Tenant | null> {
        try {
            const domain = req.hostname;
            payload.logger.info(`Request: ${req}`);
            payload.logger.info(`Domain: ${domain}`);

            const tenants = await payload.find({
                collection: 'tenants',
                where: {
                    'domains.domain': {
                        equals: domain,
                    },
                },
            });

            return tenants.docs.length > 0 ? tenants.docs[0] : null;

        } catch (error) {
            payload.logger.error(error);
        }
    }
}
