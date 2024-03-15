import { NextFunction, Request, Response } from 'express';
import payload from 'payload';
import { seed } from '../seed';
import { TenantConfigurationService } from '../services/tenant/TenantConfigurationService';
import { TenantResolutionService } from '../services/tenant/TenantResolutionService';
import { EmailConfigService } from '../services/tenant/email';

export function safeStringify(obj: any) {
    const cache = new Set();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                // Duplicate reference found, discard key
                return;
            }
            // Store value in our set
            cache.add(value);
        }
        return value;
    });
}
/**
 * Handle no tenant found
 * This function is called when no tenant is found for the request.
 * In this example, we seed the database if the environment is set to seed.
 * Otherwise, we log an error.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function handleNoTenantFound(req: Request, res: Response, next: NextFunction): Promise<void> {
    payload.logger.warn('No tenant found.');
    if (process.env.SEED_DB === 'true') {
        try {
            payload.logger.info(`Seeding database...`);
            await seed(payload);
            payload.logger.info('Database seeding successful.');
            next(); // Proceed or redirect as needed after seeding
        } catch (error) {
            payload.logger.error('Error seeding database:', error);
            console.log(error)
            next(error); // Ensure errors are passed to error handling middleware
        }
    } else {
        payload.logger.error('No Tenants in non-seed mode. Ensure manual configuration.');
        res.status(404).send('Tenant not found and database seeding is not enabled.'); // Send a response or consider redirecting
    }
}

/** 
 * Resolve and configure tenant
 * This function is called after the request is logged.
 * It resolves the tenant and configures the tenant context.
 * If no tenant is found, it calls handleNoTenantFound.
 *  
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
async function resolveAndConfigureTenant(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tenantResolutionService = new TenantResolutionService();
    const tenantConfigurationService = TenantConfigurationService.getInstance();

    try {
        // Try to resolve the tenant
        const tenant = await tenantResolutionService.resolveTenant(req);
        console.log('do we have the tenant', tenant)

        if (tenant) {
            payload.logger.info(`Tenant Email Config: ${safeStringify(tenant.emailConfig)}`);

            // Update the tenant config service's context with this tenant's data
            await tenantConfigurationService.configureTenantContext(tenant);

            // Email Singleton Service
            const emailService = EmailConfigService.getInstance()

            // Create transport
            const transport = emailService.createTransport()

            // Store Postmark Email Transport for use in other middleware
            res.locals.emailTransport = transport;

            // Store Tenant Email Config for use in other  middleware
            res.locals.emailConfig = emailService.getConfig()

            // Store Tenant for use in other middleware
            res.locals.tenant = tenant

            // Use safeStringify instead of JSON.stringify
            payload.logger.info(`TenantConfigService: Tenant Email Transport: ${safeStringify(transport)}`);
            payload.logger.info(`Tenant Email Transport in Middleware Locals: ${safeStringify(res.locals.emailTransport)}`);
            payload.logger.info(`tenant: ${safeStringify(res.locals.tenant)}`);
            next();
        } else {
            await handleNoTenantFound(req, res, next); // Ensure response is handled in all paths
        }
    } catch (error) {
        payload.logger.error('Error resolving or configuring tenant:', error);
        next(error); // Pass the error to error handling middleware
    }
}

/**
 * Tenant middleware
 * This middleware is run after every request to resolve the tenant and configure the tenant context.
 *  
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function tenantMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await resolveAndConfigureTenant(req, res, next);
    } catch (error) {
        payload.logger.error('Error in Tenant middleware:', error);
        next(error);
    }
}


