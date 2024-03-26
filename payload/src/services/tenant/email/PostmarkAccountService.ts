// src/services/PostmarkAccountService.ts
import { AccountClient } from 'postmark';
import { CreateServerRequest, Server, Servers, TemplatesPush, TemplatesPushRequest } from 'postmark/dist/client/models';

export class PostmarkAccountService {
    private client: AccountClient;

    constructor(accountToken: string) {
        this.client = new AccountClient(accountToken);
    }

    public async getServers(): Promise<Servers> {
        try {
            const result = await this.client.getServers();
            console.log(`Total Servers: ${result.Servers.length}`);
            return result;
        } catch (error) {
            console.error('Error listing servers:', error);
            throw error;
        }
    }

    public async getServer(serverId: number): Promise<Server> {
        try {
            const result = await this.client.getServer(serverId);
            console.log(`Server ID: ${result.ID}, Name: ${result.Name}`);
            return result;
        } catch (error) {
            console.error('Error getting server:', error);
            throw error;
        }
    }

    public async createServer(request: CreateServerRequest): Promise<Server> {
        try {
            const result = await this.client.createServer(request);
            console.log(`Server created: ${result.ID}, Name: ${result.Name}`);
            return result;
        } catch (error) {
            console.error('Error creating server:', error);
            throw error;
        }
    }

    public async updateServer(serverId: number, name: string): Promise<Server> {
        try {
            const result = await this.client.editServer(serverId, { Name: name });
            console.log(`Updated Server ID: ${result.ID}, New Name: ${result.Name}`);
            return result;
        } catch (error) {
            console.error('Error updating server:', error);
            throw error;
        }
    }

    public async deleteServer(serverId: number): Promise<void> {
        try {
            const result = await this.client.deleteServer(serverId);
            console.log(`Deleted Server Message: ${result.Message}, ErrorCode: ${result.ErrorCode}`);
            // The actual return type for deleteServer might not provide useful information for the caller,
            // so this method is set to return void. Adjust as necessary based on actual use case.
        } catch (error) {
            console.error('Error deleting server:', error);
            throw error;
        }
    }

    public async pushTemplates(req: TemplatesPushRequest): Promise<TemplatesPush> {
        try {
            const result = await this.client.pushTemplates(req);
            console.log(`Total Templates Pushed: ${result.TotalCount}`);
            return result;
        } catch (error) {
            console.error('Error pushing templates:', error);
            throw error; // Maintain consistent error handling across your service methods
        }
    }
}
