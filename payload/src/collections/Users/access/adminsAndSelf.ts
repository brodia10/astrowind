import type { Access } from 'payload/config';

import { Tenant, User } from '../../../payload-types';
import { isSuperAdmin } from '../../../utils/isSuperAdmin';

// Assuming the Tenant interface is correctly defined in '../../../payload-types'
// with at least an 'id' property of type string

// Type guard to check if a variable is a Tenant
function isTenant(variable: any): variable is Tenant {
  return typeof variable === 'object' && 'id' in variable;
}

export const adminsAndSelf: Access<any, User> = async ({ req: { user } }) => {
  if (user) {
    const isSuper = isSuperAdmin(user);

    // Allow super-admins through only if they have not scoped their user via `lastLoggedInTenant`
    if (isSuper && !user?.lastLoggedInTenant) {
      return true;
    }

    // Allow users to read themselves and any users within the tenants they are admins of
    return {
      or: [
        {
          id: {
            equals: user.id,
          },
        },
        ...(isSuper
          ? [
            {
              'tenants.tenant': {
                in: [
                  // Use the type guard to safely access the `id` property
                  isTenant(user.lastLoggedInTenant) ? user.lastLoggedInTenant.id : user.lastLoggedInTenant,
                ].filter(Boolean),
              },
            },
          ]
          : [
            {
              'tenants.tenant': {
                in: user?.tenants
                  ?.map(({ tenant, roles }) =>
                    roles.includes('admin')
                      ? // Use the type guard to safely determine if tenant is an object and access its `id`
                      isTenant(tenant) ? tenant.id : tenant
                      : null,
                  )
                  .filter(Boolean) || [],
              },
            },
          ]),
      ],
    };
  }
};
