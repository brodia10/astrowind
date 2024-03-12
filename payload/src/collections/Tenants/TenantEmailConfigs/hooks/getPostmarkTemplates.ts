import payload from 'payload';
import { CollectionAfterChangeHook } from 'payload/types';
import { Template } from 'postmark/dist/client/models';
import { EmailConfigService } from '../../../../services/tenant/email';
import PostmarkTemplateService from '../../../../services/tenant/email/PostmarkTemplateService';

async function upsertTemplate(template: Template) {
  const templateIdStr = template.TemplateId.toString();

  const existingTemplates = await payload.find({
    collection: 'postmark-templates',
    where: { id: { equals: templateIdStr } },
    limit: 1,
  });

  const templateData = { name: template.Name, id: templateIdStr };
  console.log('templateData')
  if (existingTemplates.totalDocs > 0) {
    await payload.update({
      collection: 'postmark-templates',
      id: existingTemplates.docs[0].id,
      data: templateData,
    });
    console.log('templates updated!')
  } else {
    await payload.create({
      collection: 'postmark-templates',
      data: templateData,
    });
    console.log('templates created!')
  }
}

const getPostmarkTemplates: CollectionAfterChangeHook = async ({ doc, req }) => {
  // console.log("FIREDDDDDDD")
  // console.log('DOC ', doc)
  console.log('req', req.body)

  const emailConfig = EmailConfigService.getInstance().getConfig();
  const serverToken = doc?.postmarkServerToken

  if (!serverToken) {
    console.error('Server token is missing. Unable to synchronize Postmark templates.');
  }

  console.log('serverToken', doc?.postmarkServerToken)

  try {
    const postmarkService = new PostmarkTemplateService(serverToken);
    const { Templates } = await postmarkService.listTemplates();
    await Promise.all(Templates.map(upsertTemplate));
    console.log('templates', Templates)
  } catch (error) {
    console.error('Error synchronizing templates with Postmark:', error);
  }
};

export default getPostmarkTemplates;
