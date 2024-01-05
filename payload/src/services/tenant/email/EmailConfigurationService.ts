import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import payload from 'payload';
import { TenantEmailConfig } from 'payload/generated-types';

enum Provider {
    Resend = 'resend',
    Sendgrid = 'sendgrid',
    Gmail = 'gmail',
    Outlook365 = 'outlook365',
    CustomSMTP = 'customSMTP',
}

interface SMTPSettings {
    host: string | null,
    port: number | null,
    method: 'apiKey' | 'smtp' | null
}

const providerSMTPSettings: Record<Provider, SMTPSettings> = {
    [Provider.Resend]: { host: 'smtp.resend.com', port: 465, method: 'apiKey' },
    [Provider.Sendgrid]: { host: null, port: null, method: 'apiKey' },
    [Provider.Gmail]: { host: 'smtp.gmail.com', port: 587, method: 'smtp' },
    [Provider.Outlook365]: { host: 'smtp-mail.outlook.com', port: 587, method: 'smtp' },
    [Provider.CustomSMTP]: { host: null, port: null, method: 'smtp' }, // Defaults for others
};

const getDefaultSMTPSettings = (provider: Provider): SMTPSettings => {
    return providerSMTPSettings[provider];
};


/**
 * Service for configuring and getting the tenant email configuration
 *
 * @export
 * @class EmailConfigurationService
 * @example
 * const emailConfigService = EmailConfigurationService.getInstance();
 * const emailConfig = emailConfigService.getConfig();
 * const transport = emailConfigService.getTransport();
 */
export class EmailConfigurationService {
    private static instance: EmailConfigurationService;
    private emailConfig: TenantEmailConfig | null = null;

    private constructor() { }

    /**
     * Returns the singleton instance of the EmailConfigurationService
     * 
     * @static
     * @returns {EmailConfigurationService}
     * @memberof EmailConfigurationService
     */
    public static getInstance(): EmailConfigurationService {
        if (!this.instance) {
            this.instance = new EmailConfigurationService();
        }
        return this.instance;
    }

    /**
     * Sets the tenant email configuration
     *
     * @param {TenantEmailConfig} config
     * @memberof EmailConfigurationService
     */
    public setConfig(config: TenantEmailConfig) {
        this.emailConfig = config;
    }

    /**
     * Gets the tenant email configuration
     * 
     * @return {TenantEmailConfig} 
     * @memberof EmailConfigurationService
     */
    public getConfig() {
        return this.emailConfig;
    }

    /**
     * Configure the EmailConfigurationService with the tenant email configuration
     * This is called from the tenant middleware
     *
     * @param {TenantEmailConfig} config
     * @memberof EmailConfigurationService
     */
    public configureService(config: TenantEmailConfig): void {
        this.setConfig(config);
    }

    /**
     * Returns a nodemailer transporter based on the tenant email configuration
     *
     * @returns {(nodemailer.Transporter | null)}
     * @memberof EmailConfigurationService
     */
    public getTransport(): nodemailer.Transporter | null {
        const config = this.getConfig();
        if (!config) {
            payload.logger.warn('Email configuration not found');
            return null;
        }

        let transportOptions;

        switch (config?.provider) {
            case Provider.Resend:
                transportOptions = {
                    host: 'smtp.resend.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'resend',
                        pass: this.emailConfig.auth.apiKey,
                    },
                };
            case Provider.Sendgrid:
                transportOptions = nodemailerSendgrid({
                    apiKey: this.emailConfig.auth.apiKey,
                });
                break;
            case Provider.Outlook365, Provider.Gmail:
                transportOptions = {
                    service: config.provider,
                    auth: {
                        user: config.auth.smtpUsername,
                        pass: config.auth.smtpPassword,
                    },
                };
            case Provider.CustomSMTP:
                transportOptions = {
                    host: config.auth.smtpHost,
                    port: config.auth.smtpPort,
                    secure: config.auth.secure,
                    auth: {
                        user: config.auth.smtpUsername,
                        pass: config.auth.smtpPassword,
                    },
                };
                break;
            default:
                transportOptions = null;
                throw new Error(`Invalid email provider: ${config?.provider}`);
        }

        // Create transport with options
        const transport = nodemailer.createTransport(transportOptions);
        payload.logger.info(`Email Transport: ${transport}`);

        // Verify connection configuration
        transport.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email server is ready to take our messages");
            }
        });

        return transport;
    }
}
