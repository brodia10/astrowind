import { TenantEmailConfig } from 'payload/generated-types';

export class EmailConfigurationService {
    private static instance: EmailConfigurationService;
    private emailConfig: TenantEmailConfig | null = null;

    private constructor() { }

    public static getInstance(): EmailConfigurationService {
        if (!this.instance) {
            this.instance = new EmailConfigurationService();
        }
        return this.instance;
    }

    public setConfig(config: TenantEmailConfig) {
        this.emailConfig = config;
    }

    public getConfig() {
        return this.emailConfig;
    }

    public configureService(config: TenantEmailConfig): void {
        this.setConfig(config);
    }
}
