import payload from 'payload';
import { CollectionAfterChangeHook } from 'payload/types';
import { TenantResolutionService } from '../../../../services/tenant/TenantResolutionService';

const relateEmailConfigToTenant: CollectionAfterChangeHook = async ({
  doc, // Full document data of the email configuration
  req, // Full express request
  operation, // Implicitly 'create' or 'update', no need to check
}) => {
  try {
    const tenant = await new TenantResolutionService().getTenantFromRequest(req);

    // Ensure a tenant is found; otherwise, log and exit
    if (!tenant) {
      payload.logger.warn('Tenant not found for the provided request. Email config cannot be related.');
      return doc;
    }

    // Directly update the tenant document with the new or updated email configuration ID
    await payload.update({
      collection: 'tenants',
      id: tenant.id,
      data: { emailConfig: doc.id },
    });

    console.log("DOC", doc)

    payload.logger.info(`EmailConfig ID ${doc.id} successfully ${operation === 'create' ? 'associated with' : 'updated for'} Tenant ID ${tenant.id}.`);

  } catch (error) {
    payload.logger.error(`Failed to update email configuration for tenant: ${error instanceof Error ? error.message : error}`);
  }

  return doc;
};

export default relateEmailConfigToTenant;
