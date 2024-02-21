'use strict'
import nodemailerPostmarkTransport, { PostmarkTransport } from "nodemailer-postmark-transport";
import { TenantEmailConfig } from "payload/generated-types";

/**
 * Manages email configurations for a multi-tenant application using Postmark. Designed to ensure operational
 * simplicity and cost efficiency while providing each tenant with their own dedicated Postmark server for
 * email traffic. This class follows the singleton pattern to maintain a single instance across the application,
 * promoting consistent configuration management.
 * 
 * Benefits include:
 * - **Isolation**: Enhances privacy and security by isolating each tenant's email traffic to their own server.
 * - **Scalability**: Supports easy scaling with the addition of new tenants.
 * - **Flexibility and Control**: Offers customized email settings for each tenant.
 * 
 */
export class EmailConfigService {
    /**
     * The singleton instance of the EmailConfigService.
     * @private
     * @type {EmailConfigService | null}
     */
    private static instance: EmailConfigService | null = null;
    private emailConfig: TenantEmailConfig | null = null;

    /**
     * Private constructor to prevent instantiation from outside and ensure the class follows
     * the singleton pattern. Use EmailConfigService.getInstance() to access the instance.
     * @private
     */
    private constructor() { }

    /**
     * Retrieves or creates the singleton instance of the EmailConfigService.
     * This method ensures a single instance is created and reused throughout the application.
     * 
     * @returns {EmailConfigService} The singleton instance of the EmailConfigService.
     */
    public static getInstance(): EmailConfigService {
        if (this.instance === null) {
            this.instance = new EmailConfigService();
        }
        return this.instance;
    }

    /**
     * Gets the tenant email configuration
     * 
     * @return {TenantEmailConfig} 
     * @memberof EmailConfigurationService
     */
    public getConfig(): TenantEmailConfig {
        return this.emailConfig;
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
    * Creates and configures a nodemailer transport for sending emails via Postmark using
    * the application-wide Postmark account token. This centralized approach is suitable
    * for applications preferring to manage email operations under a single Postmark account.
    * 
    * configured for sending emails via Postmark using the account token.
    * @throws {Error} If the Postmark account token is not available.
    */
    public createTransport(): PostmarkTransport {
        const accountApiKey = process.env.POSTMARK_ACCOUNT_API_TOKEN;
        if (!accountApiKey) {
            throw new Error('Invalid or missing Postmark account API token');
        }

        try {
            const transport = nodemailerPostmarkTransport({
                auth: {
                    apiKey: accountApiKey
                },
            });

            return transport;
        } catch (error) {
            console.error('Failed to create transport:', error);
            throw new Error('Transport creation failed');
        }
    }

    // /**
    //  * Sends an email using the configured Postmark transport.
    //  * @async
    //  * @param {Mail.Options} mailOptions - The email options including the recipient, subject, and body.
    //  * @returns {Promise<void>} A promise that resolves when the email is sent.
    //  * @throws {Error} If sending the email fails.
    //  */
    // async sendEmail(mailOptions) {
    //     try {
    //         const transport = this.createTransport();
    //         await transport.sendMail(mailOptions);
    //         console.log('Email sent successfully');
    //     } catch (error) {
    //         console.error('Failed to send email:', error);
    //         throw new Error('Email sending failed');
    //     }
    // }

    // public async testTransport(transport: nodemailer.Transporter): Promise<void> {
    //     // Replace 'from' and 'to' with valid email addresses
    //     const testEmailOptions = {
    //         from: 'your-email@example.com', // Sender address
    //         to: 'recipient-email@example.com', // List of receivers
    //         subject: 'Test Email', // Subject line
    //         text: 'Hello world?', // Plain text body
    //         html: '<b>Hello world?</b>' // HTML body content
    //     };

    //     try {
    //         let info = await transport.sendMail(testEmailOptions);
    //         console.log('Test email sent successfully:', info.messageId);
    //     } catch (error) {
    //         console.error('Failed to send test email:', error);
    //         throw new Error('Test email sending failed');
    //     }
    // }
}
