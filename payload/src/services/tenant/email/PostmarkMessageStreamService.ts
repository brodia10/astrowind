// src/services/PostmarkMessageStreamService.ts
import { ServerClient } from 'postmark';
import { MessageStream, UnsubscribeHandlingTypes } from 'postmark/dist/client/models';

export class PostmarkMessageStreamService {
    private client: ServerClient;

    constructor(serverToken: string) {
        this.client = new ServerClient(serverToken);
    }

    async getMessageStreams(includeArchivedStreams: boolean = false, messageStreamType?: string): Promise<MessageStream[]> {
        try {
            const result = await this.client.getMessageStreams({ includeArchivedStreams, messageStreamType });
            console.log(`Total Message Streams: ${result.TotalCount}`);
            return result.MessageStreams;
        } catch (error) {
            console.error('Error getting message streams:', error);
            throw error;
        }
    }

    async getMessageStream(streamId: string): Promise<MessageStream> {
        try {
            const result = await this.client.getMessageStream(streamId);
            console.log(`Stream Name: ${result.Name}`);
            return result;
        } catch (error) {
            console.error('Error getting message stream:', error);
            throw error;
        }
    }

    async updateMessageStream(streamId: string, name: string, description: string, unsubscribeHandlingType: UnsubscribeHandlingTypes): Promise<MessageStream> {
        try {
            const result = await this.client.editMessageStream(streamId, {
                Name: name,
                Description: description,
                SubscriptionManagementConfiguration: { UnsubscribeHandlingType: unsubscribeHandlingType },
            });
            console.log('Message Stream updated:', result);
            return result;
        } catch (error) {
            console.error('Error updating message stream:', error);
            throw error;
        }
    }

    async createMessageStream(id: string, name: string, messageStreamType: 'transactional' | 'broadcast' | 'inbound', unsubscribeHandlingType: UnsubscribeHandlingTypes = UnsubscribeHandlingTypes.None): Promise<MessageStream> {
        try {
            const result = await this.client.createMessageStream({
                ID: id,
                Name: name,
                MessageStreamType: messageStreamType,
                SubscriptionManagementConfiguration: { UnsubscribeHandlingType: unsubscribeHandlingType },
            });
            console.log('Message Stream created:', result);
            return result;
        } catch (error) {
            console.error('Error creating message stream:', error);
            throw error;
        }
    }

    async archiveMessageStream(streamId: string): Promise<void> {
        try {
            const result = await this.client.archiveMessageStream(streamId);
            console.log(`Message Stream expected purge date: ${result.ExpectedPurgeDate}`);
        } catch (error) {
            console.error('Error archiving message stream:', error);
            throw error;
        }
    }

    async unarchiveMessageStream(streamId: string): Promise<MessageStream> {
        try {
            const result = await this.client.unarchiveMessageStream(streamId);
            console.log(`Message Stream unarchived: ${result.Name}`);
            return result;
        } catch (error) {
            console.error('Error unarchiving message stream:', error);
            throw error;
        }
    }
}
