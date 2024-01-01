// StripeConfigurationService.ts
import { TenantStripeConfig } from 'payload/generated-types';

export class StripeConfigurationService {
    private static instance: StripeConfigurationService;
    private stripeConfig: TenantStripeConfig | null = null;

    private constructor() { }

    public static getInstance(): StripeConfigurationService {
        if (!this.instance) {
            this.instance = new StripeConfigurationService();
        }
        return this.instance;
    }

    public setConfig(config: TenantStripeConfig) {
        this.stripeConfig = config;
    }

    public getConfig() {
        if (!this.stripeConfig) {
            throw new Error("Stripe configuration not set or invalid.");
        }
        return this.stripeConfig;
    }

    public configureService(config: TenantStripeConfig): void {
        this.setConfig(config);
    }
}
