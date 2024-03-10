import { CollectionBeforeChangeHook } from 'payload/types';
import { LinkTrackingOptions, UnsubscribeHandlingTypes } from 'postmark/dist/client/models';
import { TenantConfigurationService } from '../../../../services/tenant/TenantConfigurationService';
import { PostmarkAccountService, PostmarkMessageStreamService, PostmarkSenderSignatureService } from '../../../../services/tenant/email';
import { MessageStreamType, PostmarkServiceError } from '../../../../services/tenant/email/PostmarkMessageStreamService';

function generateValidId(length: number): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const alphanumeric = letters + '0123456789-_';
    let result = letters.charAt(Math.floor(Math.random() * letters.length));
    for (let i = 1; i < length; i++) {
        result += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
    return result;
}

const tenantService = TenantConfigurationService.getInstance();

async function setupPostmarkForTenant(companyName: string, apiToken: string, data: any) {
    const serverService = new PostmarkAccountService(apiToken);
    const senderService = new PostmarkSenderSignatureService(apiToken);
    const serverResponse = await serverService.createServer({
        Name: companyName,
        TrackLinks: LinkTrackingOptions.HtmlAndText,
        TrackOpens: true,
    });

    const serverToken = serverResponse.ApiTokens[0];

    await senderService.createSenderSignature({
        Name: companyName,
        FromEmail: `${companyName.toLowerCase()}@builditwithbloom.com`,
        ReturnPathDomain: 'pm-bounces.builditwithbloom.com',
    });

    const messageStreamService = new PostmarkMessageStreamService(serverToken);
    const messageStreamTypes: MessageStreamType[] = ['Transactional', 'Broadcasts'];
    const streams = await createMessageStreams(companyName, messageStreamService, messageStreamTypes);

    data.postmarkServerId = serverResponse.ID;
    data.postmarkServerToken = serverToken;
    data.messageStreams = streams.map(s => ({ type: s.type, ID: s.ID }));
}

async function createMessageStreams(companyName: string, service: PostmarkMessageStreamService, types: MessageStreamType[]) {
    const results = await Promise.allSettled(
        types.map(type =>
            service.createMessageStream(
                generateValidId(10),
                `${companyName} ${type} Stream`,
                type,
                type === 'Broadcasts' ? UnsubscribeHandlingTypes.Postmark : UnsubscribeHandlingTypes.None
            ).then(response => ({ type, ID: response.ID }))
                .catch(error => { throw error; })
        )
    );

    const successfulStreams = results.filter(result => result.status === 'fulfilled') as PromiseFulfilledResult<any>[];
    if (results.some(result => result.status === 'rejected')) {
        const errorDetails = results.filter(result => result.status === 'rejected');
        errorDetails.forEach(error => {
            console.error('Stream creation error:', error);
        });
        throw new Error('Failed to create one or more Postmark message streams.');
    }

    return successfulStreams.map(result => result.value);
}

const configurePostmark: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
    if (operation !== 'create') return;

    const postmarkAccountApiToken = process.env.POSTMARK_ACCOUNT_API_TOKEN;
    if (!postmarkAccountApiToken) {
        throw new PostmarkServiceError('POSTMARK_ACCOUNT_API_TOKEN is not defined.', 'InitialSetup');
    }

    try {
        const tenantId = req.body.tenant;
        const tenant = await tenantService.getTenantById(tenantId);
        if (!tenant) {
            throw new Error('Tenant is invalid on configuring Postmark.');
        }

        await setupPostmarkForTenant(tenant.company.name, postmarkAccountApiToken, data);
    } catch (error) {
        throw new PostmarkServiceError('Failed to configure Postmark for the tenant.', 'configurePostmark', error);
    }
};

export default configurePostmark;
