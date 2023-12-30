import { NextFunction, Request, Response } from 'express';
import payload from 'payload';
import { seed } from '../../seed';
import { TenantConfigurationService } from '../../services/tenant/TenantConfigurationService';
import { TenantResolutionService } from '../../services/tenant/TenantResolutionService';

/**
 * Logs the request URL
 *
 * @param {Request} req
 * @param {Response} _res
 * @param {NextFunction} next
 */
async function logRequest(req: Request, _res: Response, next: NextFunction): Promise<void> {
    payload.logger.info(`Request URL: ${req.url}`);
    next();
}

/**
 * Handle no tenant found
 * This function is called when no tenant is found for the request.
 * In this example, we seed the database if the environment is set to seed.
 * Otherwise, we log an error.
 *
 * @param {Request} _req
 * @param {Response} _res
 * @param {NextFunction} next
 */
async function handleNoTenantFound(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    payload.logger.warn('No tenant found.');
    if (process.env.SEED === 'true') {
        try {
            payload.logger.info(`Environment is ${process.env.NODE_ENV}. Seeding database...`);
            await seed(payload);
            payload.logger.info('Database seeding successful.');
            next(); // Proceed or redirect as needed after seeding
        } catch (error) {
            payload.logger.error('Error seeding database:', error);
            next(error);
        }
    } else {
        payload.logger.error('No Tenants in non-seed mode. Ensure manual configuration.');
        // You might want to call next() or send a response here depending on your application's needs
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
        const tenant = await tenantResolutionService.resolveTenant(req);
        if (tenant) {
            payload.logger.info(`Tenant: ${tenant.name}`);
            await tenantConfigurationService.configureTenantContext(tenant);
            next();
        } else {
            await handleNoTenantFound(req, res, next);
        }
    } catch (error) {
        payload.logger.error('Error resolving or configuring tenant:', error);
        next(error);
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
async function tenantMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await logRequest(req, res, next);
        await resolveAndConfigureTenant(req, res, next);
    } catch (error) {
        payload.logger.error('Error in Tenant middleware:', error);
        next(error);
    }
}

export default tenantMiddleware;
