import { CollectionBeforeChangeHook } from 'payload/types';
import { LinkTrackingOptions, UnsubscribeHandlingTypes } from 'postmark/dist/client/models';
import { PostmarkAccountService, PostmarkMessageStreamService, PostmarkSenderSignatureService, } from '../../../../services/tenant/email';
import { MessageStreamType, PostmarkServiceError, StreamErrorResponse, StreamSuccessResponse } from '../../../../services/tenant/email/PostmarkMessageStreamService';

// Assuming MessageStreamType is accurately defined according to your needs
// Ensure your MessageStreamType reflects the exact string values expected by Postmark

function generateValidId(length: number): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const alphanumeric = letters + '0123456789-_';
    let result = letters.charAt(Math.floor(Math.random() * letters.length));
    for (let i = 1; i < length; i++) {
        result += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
    return result;
}

const configurePostmark: CollectionBeforeChangeHook = async ({
    data,
    operation,
    req,
}) => {
    if (operation === 'create') {
        const tenantId = req.body.tenant;
        if (!tenantId) {
            throw new Error('Tenant ID is missing from the request.');
        }

        const postmarkAccountApiToken: string = process.env.POSTMARK_ACCOUNT_API_TOKEN ?? '';
        if (!postmarkAccountApiToken) {
            throw new PostmarkServiceError('POSTMARK_ACCOUNT_API_TOKEN is not defined.', 'InitialSetup');
        }

        try {
            const randomString = generateValidId(10);
            const serverService = new PostmarkAccountService(postmarkAccountApiToken);
            const senderService = new PostmarkSenderSignatureService(postmarkAccountApiToken);

            const serverResponse = await serverService.createServer({
                Name: randomString,
                TrackLinks: LinkTrackingOptions.HtmlAndText,
                TrackOpens: true,
            });

            const serverToken = serverResponse.ApiTokens[0];
            const serverId = serverResponse.ID;

            await senderService.createSenderSignature({
                Name: randomString,
                FromEmail: `${randomString}@bloomcms.io`,
                ReturnPathDomain: 'pm-bounces.bloomcms.io',
            });

            const messageStreamService = new PostmarkMessageStreamService(serverToken);

            // Correct MessageStreamType values to match Postmark's expectations
            const messageStreamTypes: MessageStreamType[] = ['Transactional', 'Broadcasts']; // Adjust if necessary

            const streamResponses: (StreamSuccessResponse | StreamErrorResponse)[] = [];

            for (const type of messageStreamTypes) {
                try {
                    const response = await messageStreamService.createMessageStream(
                        generateValidId(10),
                        `${randomString}-${type.toLowerCase()}`,
                        type,
                        type === 'Broadcasts' ? UnsubscribeHandlingTypes.Postmark : UnsubscribeHandlingTypes.None
                    );
                    // Assuming the response has an 'ID' field for success responses
                    streamResponses.push({ ID: response.ID, type });
                } catch (error) {
                    console.error(`Error creating ${type} stream:`, error);
                    streamResponses.push({ error, type });
                }
            }

            const successfulStreams = streamResponses.filter((resp): resp is StreamSuccessResponse => !('error' in resp));
            const errorStreams = streamResponses.filter((resp): resp is StreamErrorResponse => 'error' in resp);

            if (errorStreams.length > 0) {
                // Handle or log errors accordingly
                // For example, you might log a summary of failed stream creations
                throw new PostmarkServiceError('One or more message streams failed to create.', 'CreateMessageStream');
            }

            // Save Postmark Data data to tenant's email config
            data.postmarkServerId = serverId;
            data.postmarkServerToken = serverToken;
            data.messageStreams = successfulStreams.map(s => ({ type: s.type, ID: s.ID }));
            console.log('Tenant Email Config Data', data)

        } catch (error) {
            throw new PostmarkServiceError('Failed to configure Postmark for the tenant.', 'configurePostmark', error);
        }
    }
};

export default configurePostmark;
