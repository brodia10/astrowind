// import { CollectionAfterChangeHook, } from 'payload/types';

// import { EmailConfig } from 'payload/generated-types';

// const afterChangeUpdateEmailConfig: CollectionAfterChangeHook = async ({
//     doc,
//     operation,
//     previousDoc,
// }) => {
//     // Only proceed if the operation is an update and the email config might have changed
//     if (operation === 'update' && doc.emailConfig && previousDoc) {
//         const previousEmailConfig: EmailConfig = previousDoc.emailConfig;
//         const currentEmailConfig: EmailConfig = doc.emailConfig;

//         // Example condition to check if an update is needed
//         if (currentEmailConfig.postmarkServerId !== previousEmailConfig.postmarkServerId) {
//             await updateEmailConfigWithPostmarkData(currentEmailConfig);
//         }
//     }

//     return doc; // Returning the document is important for afterChange hooks
// };

// export default afterChangeUpdateEmailConfig;
