import { CollectionConfig } from 'payload/types';
import { tenants } from '../../Pages/access/tenants';
import { tenantAdmins } from '../Tenants/access/tenantAdmins';

const TenantPlans: CollectionConfig = {
    slug: 'tenant-plans',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        create: tenantAdmins,
        read: tenants,
        update: tenantAdmins,
        delete: tenantAdmins,
    },
    fields: [
        {
            name: 'tenant',
            type: 'relationship',
            relationTo: 'tenants',
        },
        // ... define fields like title, price, features, isActive, etc.
        // ... similar to global plans but specific to each tenant's offerings
    ],
};

export default TenantPlans;
