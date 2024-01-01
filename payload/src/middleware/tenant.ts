import { NextFunction, Request, Response } from 'express';
import payload from 'payload';
import { seed } from '../seed';
import { TenantConfigurationService } from '../services/tenant/TenantConfigurationService';
import { TenantResolutionService } from '../services/tenant/TenantResolutionService';

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
        const tenant = await tenantResolutionService.resolveTenant(req);
        if (tenant) {
            payload.logger.info(`Tenant: ${tenant.name}`);
            await tenantConfigurationService.configureTenantContext(tenant);
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
async function tenantMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await resolveAndConfigureTenant(req, res, next);
    } catch (error) {
        payload.logger.error('Error in Tenant middleware:', error);
        next(error);
    }
}

export default tenantMiddleware;
