import { ServerClient } from "postmark";
import {
    CreateTemplateRequest,
    Template as TemplateModel,
    TemplateTypes,
    TemplateValidationOptions,
    TemplatedMessage,
    Templates,
    UpdateTemplateRequest
} from 'postmark/dist/client/models';
import { PostmarkServiceError } from "./PostmarkMessageStreamService";

class PostmarkTemplateService {
    private client: ServerClient;

    constructor(serverToken: string) {
        this.client = new ServerClient(serverToken);
    }

    async listTemplates(count: number = 100, offset: number = 0, templateType: TemplateTypes = TemplateTypes.Standard): Promise<Templates> {
        try {
            const result = await this.client.getTemplates({ count, offset, templateType });
            console.log(result);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error listing templates', 'listTemplates', error);
        }
    }

    async getTemplateById(templateId: number): Promise<TemplateModel> {
        try {
            const result = await this.client.getTemplate(templateId);
            console.log(result);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error getting template by ID', 'getTemplateById', error);
        }
    }

    async getTemplateByAlias(alias: string): Promise<TemplateModel> {
        try {
            const result = await this.client.getTemplate(alias);
            console.log(result);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error getting template by alias', 'getTemplateByAlias', error);
        }
    }

    async createTemplate(template: CreateTemplateRequest): Promise<TemplateModel> {
        try {
            const result = await this.client.createTemplate(template);
            console.log(result);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error creating template', 'createTemplate', error);
        }
    }

    async updateTemplate(templateIdOrAlias: number | string, template: UpdateTemplateRequest): Promise<TemplateModel> {
        try {
            const result = await this.client.editTemplate(templateIdOrAlias, template);
            console.log(result);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error updating template', 'updateTemplate', error);
        }
    }

    async deleteTemplate(templateIdOrAlias: number | string): Promise<{ Message: string }> {
        try {
            const result = await this.client.deleteTemplate(templateIdOrAlias);
            console.log(result.Message);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error deleting template', 'deleteTemplate', error);
        }
    }

    async validateTemplate(validationOptions: TemplateValidationOptions): Promise<any> {
        try {
            const result = await this.client.validateTemplate(validationOptions);
            console.log(result);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error validating template', 'validateTemplate', error);
        }
    }

    async sendEmailWithTemplate(sendOptions: TemplatedMessage): Promise<any> {
        try {
            const result = await this.client.sendEmailWithTemplate(sendOptions);
            console.log(result);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error sending email with template', 'sendEmailWithTemplate', error);
        }
    }

    async sendEmailBatchWithTemplates(sendOptionsArray: TemplatedMessage[]): Promise<any[]> {
        try {
            const result = await this.client.sendEmailBatchWithTemplates(sendOptionsArray);
            console.log(result);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error sending batch email with templates', 'sendEmailBatchWithTemplates', error);
        }
    }
}
