import { Request } from 'express';
import payload from 'payload';
import { Tenant } from '../../payload-types';
export class TenantResolutionService {
    // This service is instantiated per request to resolve the tenant based on the domain
    async resolveTenantByDomain(req: Request): Promise<Tenant | null> {
        try {
            let domain: string;
            if (process.env.NODE_ENV == 'development') {
                domain = req.hostname;
            } else {
                domain = req.headers.origin ?? req.hostname;
            }

            payload.logger.info(`Origin: ${req.headers.origin}`);
            payload.logger.info(`Hostname: ${req.hostname}`);
            payload.logger.info(`Resolving tenant for domain: ${domain}`);

            const tenants = await payload.find({
                collection: 'tenants',
                where: {
                    'domains.domain': {
                        equals: domain,
                    },
                },
            });

            if (tenants.docs.length > 0) {
                return tenants.docs[0];
            } else {
                payload.logger.warn(`No tenant found for domain: ${domain}`);
                return null;
            }

        } catch (error) {
            payload.logger.error(`Error resolving tenant by domain: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return null;
        }
    }

    async getTenantFromRequest(req: Request): Promise<Tenant | null> {
        try {
            if (!req.tenant) {
                throw new Error('Tenant not found on the request.');
            }
            return req.tenant;
        } catch (error) {
            payload.logger.error(`Error getting tenant from request: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return null;
        }
    }
}