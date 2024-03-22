import payload from 'payload';
import { CollectionBeforeChangeHook } from 'payload/types';
import { LinkTrackingOptions, UnsubscribeHandlingTypes } from 'postmark/dist/client/models';
import { PostmarkAccountService, PostmarkMessageStreamService, PostmarkSenderSignatureService } from '../../../../services/tenant/email';
import { MessageStreamType } from '../../../../services/tenant/email/PostmarkMessageStreamService';

async function createPostmarkServer(companyName: string, apiToken: string) {
    const serverService = new PostmarkAccountService(apiToken);
    const serverResponse = await serverService.createServer({
        Name: companyName,
        TrackLinks: LinkTrackingOptions.HtmlAndText,
        TrackOpens: true,
    });
    return {
        serverId: serverResponse.ID,
        serverToken: serverResponse.ApiTokens[0],
    };
}

async function createSenderSignature(companyName: string, apiToken: string) {
    const senderService = new PostmarkSenderSignatureService(apiToken);
    await senderService.createSenderSignature({
        Name: companyName,
        FromEmail: `${companyName.toLowerCase()}@builditwithbloom.com`,
        ReturnPathDomain: 'pm-bounces.builditwithbloom.com',
    });
}

async function createMessageStreams(companyName: string, serverToken: string) {
    const service = new PostmarkMessageStreamService(serverToken);
    const types = Object.values(MessageStreamType);

    const streamPromises = types.map(async (type) => {
        const id = generateValidId(10);
        const name = `${companyName} ${type} Stream`;
        const unsubscribeHandling = type === MessageStreamType.Broadcasts ? UnsubscribeHandlingTypes.Postmark : UnsubscribeHandlingTypes.None;
        const response = await service.createMessageStream(id, name, type, unsubscribeHandling);
        return { type, ID: response.ID };
    });

    const streams = await Promise.all(streamPromises);
    return streams.reduce((acc, stream) => ({ ...acc, [stream.type.toLowerCase()]: stream.ID }), {});
}

async function setupEmailConfig(companyName: string, apiToken: string) {
    const { serverId, serverToken } = await createPostmarkServer(`${companyName}|${generateValidId(10)}`, apiToken);
    await createSenderSignature(`${companyName}|${generateValidId(10)}`, apiToken);
    const messageStreams = await createMessageStreams(companyName, serverToken);
    return { postmarkServerId: serverId, postmarkServerToken: serverToken, messageStreams };
}

const configurePostmark: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
    // Need to augment the Request and extend it to include the tenant so it's available everywhere.
    // Right now we get req.user which has the tenant id
    if (operation == 'create') {

        // Get tenant ID from request and convert it to an integer.
        const tenantId = parseInt(req.user.tenants[0].tenant.id, 10);

        // get the tenant by ID
        const tenant = await payload.findByID({
            collection: 'tenants',
            id: tenantId
        })

        if (!tenant || !process.env.POSTMARK_ACCOUNT_API_TOKEN) {
            console.error('Missing Tenant or Postmark API token.');
            throw new Error('Postmark configuration failed due to missing data.');
        }
        try {
            const { postmarkServerId, postmarkServerToken, messageStreams } = await setupEmailConfig(tenant.company.name, process.env.POSTMARK_ACCOUNT_API_TOKEN);
            data.postmarkServerId = postmarkServerId
            data.postmarkServerToken = postmarkServerToken
            data.messageStreams = messageStreams
            return data
        } catch (error) {
            console.error('Failed to configure Postmark for the tenant:', error);
            throw new Error('Postmark configuration failed.');
        }
    }
};

export default configurePostmark;

function generateValidId(length: number): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const alphanumeric = letters + '0123456789-_';
    let result = letters.charAt(Math.floor(Math.random() * letters.length));
    for (let i = 1; i < length; i++) {
        result += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
    return result;
}
