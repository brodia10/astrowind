// TenantConfigurationService.ts
import payload from 'payload';
import { Tenant } from '../../payload-types';
import { EmailConfigurationService } from './email/EmailConfigurationService';
import { StripeConfigurationService } from './stripe/StripeConfigurationService';

/**
 * 
 * Singleton class for Tenant configuration.
 *
 * @export
 * @class TenantConfigurationService
 */
export class TenantConfigurationService {
    private static instance: TenantConfigurationService;

    private constructor() { }

    /**
    * Returns the singleton instance of TenantConfigurationService.
    * If it doesn't exist yet, it's created.
    * @returns {TenantConfigurationService} The singleton instance.
    */
    public static getInstance(): TenantConfigurationService {
        if (!this.instance) {
            this.instance = new TenantConfigurationService();
        }
        return this.instance;
    }

    /**
     * Configures a service with the given configuration.
     * @param {any} service - The service to configure.
     * @param {any} config - The configuration to apply. If it's a string, the method does nothing.
     * @param {string} serviceName - The name of the service for error logging.
     */
    private async configureService(service: any, config: any, serviceName: string) {
        // config types can be strings or objects so make sure its not a string here
        if (config && typeof config !== 'string') {
            try {
                service.configureService(config);
            } catch (error) {
                console.error(`Error configuring ${serviceName} context:`, error);
            }
        }
    }

    /**
     * Configures the Tenant context with the given Tenant.
     * Configures the Stripe and Email services based on the Tenant's configuration.
     * @param {Tenant} tenant - The Tenant to configure.
     * @returns {Promise<void>}
     */
    public async configureTenantContext(tenant: Tenant): Promise<void> {
        payload.logger.info(`Current Tenant:  ${JSON.stringify(tenant.name)} (${tenant.domains.map(domain => domain?.domain).join(', ')})`);
        const stripeService = StripeConfigurationService.getInstance();
        const emailService = EmailConfigurationService.getInstance();

        try {
            // Start Services
            await this.configureService(stripeService, tenant.stripeConfig, 'stripe');
            await this.configureService(emailService, tenant.emailConfig, 'email');
        } catch (error) {
            console.error("Error configuring tenant context:", error);
        }
    }
}
