import payload from 'payload'; // Import Payload to perform operations on the collections
import { CollectionBeforeChangeHook } from 'payload/types';
import { Template } from 'postmark/dist/client/models';
import { EmailConfigService } from '../../../services/tenant/email';
import PostmarkTemplateService from '../../../services/tenant/email/PostmarkTemplateService';

const emailConfig = EmailConfigService.getInstance().getConfig();
const serverToken = emailConfig?.postmarkServerToken;
console.log('serverToken', serverToken)

const postmarkService = new PostmarkTemplateService(serverToken);

async function upsertTemplate(template: Template) {
  const templateIdStr = template.TemplateId.toString(); // Ensure ID is a string

  // Attempt to find an existing template
  const existingTemplates = await payload.find({
    collection: 'postmark-templates',
    where: { id: { equals: templateIdStr } },
    limit: 1,
  });

  // Prepare template data for insertion or update
  const templateData = { name: template.Name, id: templateIdStr };

  // Determine if we should update an existing template or create a new one
  if (existingTemplates.totalDocs > 0) {
    // Update existing template
    await payload.update({
      collection: 'postmark-templates',
      id: existingTemplates.docs[0].id, // Assumes first document is the match
      data: templateData,
    });
  } else {
    // Create a new template record
    await payload.create({
      collection: 'postmark-templates',
      data: templateData,
    });
  }
}

const getPostmarkTemplates: CollectionBeforeChangeHook = async ({ operation, data }) => {
  if (operation === 'create' || operation === 'update') {
    try {
      // Fetch templates from Postmark using the service
      const { Templates } = await postmarkService.listTemplates();
      // Process each template with upsert logic
      await Promise.all(Templates.map(upsertTemplate));
    } catch (error) {
      console.error('Error synchronizing templates with Bloom:', error);
      // Additional error handling or logging can be implemented here
    }
  }

  return data;
};

export default getPostmarkTemplates;
