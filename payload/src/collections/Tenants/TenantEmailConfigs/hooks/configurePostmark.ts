import { CollectionBeforeChangeHook } from 'payload/types';
import { LinkTrackingOptions, UnsubscribeHandlingTypes } from 'postmark/dist/client/models';
import { TenantResolutionService } from '../../../../services/tenant/TenantResolutionService';
import { PostmarkAccountService, PostmarkMessageStreamService, PostmarkSenderSignatureService } from '../../../../services/tenant/email';
import { MessageStreamType } from '../../../../services/tenant/email/PostmarkMessageStreamService';
import PostmarkTemplateService from '../../../../services/tenant/email/PostmarkTemplateService';

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

    const streamsToCreate = [
        { type: MessageStreamType.Transactional, id: 'transactional' },
        { type: MessageStreamType.Broadcasts, id: 'broadcast' },
    ];

    const streams = {};
    for (const { type, id } of streamsToCreate) {
        const streamId = generateValidId(10);
        const name = `${companyName} ${type} Stream`;
        const unsubscribeHandling = type === MessageStreamType.Broadcasts ?
            UnsubscribeHandlingTypes.Postmark :
            UnsubscribeHandlingTypes.None;

        const response = await service.createMessageStream(streamId, name, type, unsubscribeHandling);
        streams[id] = response.ID;
    }

    return streams;
}

async function setupEmailConfig(companyName: string, accountToken: string) {
    // Create Server
    const { serverId, serverToken } = await createPostmarkServer(`${companyName}|${generateValidId(10)}`, accountToken);

    const accountService = new PostmarkAccountService(accountToken);
    const templateService = new PostmarkTemplateService(serverToken)

    // Create Sender Signature
    await createSenderSignature(`${companyName}|${generateValidId(10)}`, accountToken);

    // Create Message Streams
    const messageStreams = await createMessageStreams(companyName, serverToken);

    // // Call pushTemplates to push templates from the source server to the new server
    // await accountService.pushTemplates({
    //     SourceServerID: 12853267,
    //     DestinationServerID: serverId,
    //     PerformChanges: true,
    // });

    // // Fetch Templates from Server and Save to DB
    // await templateService.fetchAndSavePostmarkTemplates(serverToken);

    return { postmarkServerId: serverId, postmarkServerToken: serverToken, messageStreams };
}

const configurePostmark: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
    // Need to augment the Request and extend it to include the tenant so it's available everywhere.
    // Right now we get req.user which has the tenant id
    if (operation == 'create') {

        const tenant = await new TenantResolutionService().getTenantFromRequest(req)
        console.log('CONFIGURE POSTMARK TENANT FROM RESOLUTION SERVICE', tenant)

        if (!tenant || !process.env.POSTMARK_ACCOUNT_API_TOKEN) {
            console.error('Missing Tenant or Postmark API token.');
            throw new Error('Postmark configuration failed due to missing data.');
        }

        try {
            const { postmarkServerId, postmarkServerToken, messageStreams } = await setupEmailConfig(tenant.siteName, process.env.POSTMARK_ACCOUNT_API_TOKEN);
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
