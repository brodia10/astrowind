// src/services/PostmarkMessageStreamService.ts
import { ServerClient } from 'postmark';
import { MessageStream, UnsubscribeHandlingTypes } from 'postmark/dist/client/models';

export type MessageStreamType = 'Transactional' | 'Broadcasts';
type UnsubscribeHandlingType = 'None' | 'Postmark' | 'Custom';

// Custom error class for Postmark service errors
export class PostmarkServiceError extends Error {
    constructor(public message: string, public operation: string, public originalError?: Error) {
        super(`[${operation}] ${message}`);
        this.name = 'PostmarkServiceError';
        // Log or handle the original error if needed
        if (originalError) console.error(originalError);
    }
}

export interface StreamSuccessResponse {
    ID: string; // Assuming 'ID' is the property you get from a successful response
    type: MessageStreamType;
}

export interface StreamErrorResponse {
    error: any; // Consider using a more specific error type if possible
    type: MessageStreamType;
}

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
            throw new PostmarkServiceError('Error getting message streams', 'getMessageStreams', error);
        }
    }

    async getMessageStream(streamId: string): Promise<MessageStream> {
        try {
            const result = await this.client.getMessageStream(streamId);
            console.log(`Stream Name: ${result.Name}`);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error getting message stream', 'getMessageStream', error);
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
            throw new PostmarkServiceError('Error updating message stream', 'updateMessageStream', error);
        }
    }

    async createMessageStream(id: string, name: string, messageStreamType: MessageStreamType, unsubscribeHandlingType: UnsubscribeHandlingTypes = UnsubscribeHandlingTypes.None): Promise<MessageStream> {
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
            throw new PostmarkServiceError('Error creating message stream', 'createMessageStream', error);
        }
    }

    async archiveMessageStream(streamId: string): Promise<void> {
        try {
            const result = await this.client.archiveMessageStream(streamId);
            console.log(`Message Stream expected purge date: ${result.ExpectedPurgeDate}`);
        } catch (error) {
            throw new PostmarkServiceError('Error archiving message stream', 'archiveMessageStream', error);
        }
    }

    async unarchiveMessageStream(streamId: string): Promise<MessageStream> {
        try {
            const result = await this.client.unarchiveMessageStream(streamId);
            console.log(`Message Stream unarchived: ${result.Name}`);
            return result;
        } catch (error) {
            throw new PostmarkServiceError('Error unarchiving message stream', 'unarchiveMessageStream', error);
        }
    }
}
