import payload from 'payload';
import { CollectionAfterChangeHook } from 'payload/types';
import { LinkTrackingOptions } from 'postmark/dist/client/models';
import { PostmarkAccountService, PostmarkSenderSignatureService } from '../../../../services/tenant/email';

function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Example usage: generate a random string of 10 characters
const randomString = generateRandomString(10);

const configurePostmark: CollectionAfterChangeHook = async ({
    doc,
    operation,
}) => {
    if (operation === 'create') {
        try {
            const postmarkAccountApiToken: string = process.env.POSTMARK_ACCOUNT_API_TOKEN;
            if (!postmarkAccountApiToken) {
                throw new Error('POSTMARK_ACCOUNT_API_TOKEN is not defined.');
            }

            // Initialize Postmark services
            const serverService = new PostmarkAccountService(postmarkAccountApiToken);
            const senderService = new PostmarkSenderSignatureService(postmarkAccountApiToken);

            const randomString = generateRandomString(10);

            // Create a Postmark server and sender signature for the email config
            const serverDetails = await serverService.createServer({
                Name: `Server for ${doc.name}`,
                TrackLinks: LinkTrackingOptions.HtmlAndText,
                TrackOpens: true,
            });

            await senderService.createSenderSignature({
                Name: randomString,
                FromEmail: randomString + '@bloomcms.io',
                ReturnPathDomain: 'pm-bounces.bloomcms.io',
            });

            // Create the tenantEmailConfig with necessary details
            const emailConfig = await payload.create({
                collection: 'tenant-email-configs',
                data: {
                    tenant: doc.id,
                    fromEmailAddress: fromEmailAddress,
                    fromName: fromName,
                    postmarkServerId: serverDetails.ID,
                    postmarkServerToken: serverDetails.ApiTokens[0],
                },
            });

            console.log("Created Email Config: ", emailConfig);

        } catch (error) {
            console.error('Failed to configure Postmark for the tenant:', error);
            throw new Error('Postmark configuration failed. Please check the logs for more details.');
        }
    }
};

export default configurePostmark;