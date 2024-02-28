import { CollectionBeforeChangeHook } from 'payload/types';
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

const configurePostmark: CollectionBeforeChangeHook = async ({
    data, // incoming data to update or create with
    req, // full express request
    operation, // name of the operation ie. 'create', 'update'
    originalDoc, // original document
}) => {
    if (operation === 'create') {
        try {
            // console.log('DATA ', data)
            console.log('REQUEST', req.body)
            // console.log('ORIGINAL DOC', originalDoc)
            const postmarkAccountApiToken: string = process.env.POSTMARK_ACCOUNT_API_TOKEN;

            // Check for postmark Account token
            if (!postmarkAccountApiToken) {
                throw new Error('POSTMARK_ACCOUNT_API_TOKEN is not defined.');
            }

            // // Initialize Postmark services
            const serverService = new PostmarkAccountService(postmarkAccountApiToken);
            const senderService = new PostmarkSenderSignatureService(postmarkAccountApiToken)
            const randomString = generateRandomString(10)

            // Create a Postmark server 
            await serverService.createServer({
                Name: randomString,
                TrackLinks: LinkTrackingOptions.HtmlAndText,
                TrackOpens: true,
            })

            // Create Sender Signature
            await senderService.createSenderSignature({
                Name: randomString,
                FromEmail: randomString + '@bloomcms.io',
                ReturnPathDomain: 'pm-bounces.bloomcms.io',
            });
        }
        catch (error) {
            console.error('Failed to configure Postmark for the tenant:', error);
            throw new Error('Postmark configuration failed. Please check the logs for more details.');
        }

    }
}

export default configurePostmark;