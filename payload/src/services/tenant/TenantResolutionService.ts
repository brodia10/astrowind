import { Request } from 'express';
import payload from 'payload';
import { Tenant } from '../../payload-types';

export class TenantResolutionService {
    // This service is instantiated per request to resolve the tenant based on the domain
    async resolveTenantByDomain(req: Request): Promise<Tenant | null> {
        try {
            const domain = req.hostname;
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

    async getTenantFromRequest(req: Request): Promise<Tenant | null> {
        try {
            return req?.tenant
        } catch (error) {
            console.log('Could not find Tenant on the Request.')
            return null
        }
    }
}
