import type { Tenant, User } from '../../../payload-types';

// Type guard to check if a variable is a Tenant object
function isTenant(variable: any): variable is Tenant {
  return typeof variable === 'object' && 'id' in variable;
}

export const checkTenantRoles = (
  allRoles: User['tenants'][0]['roles'] = [],
  user: User | undefined = undefined,
  tenant: User['tenants'][0]['tenant'] | undefined = undefined,
): boolean => {
  if (!user || !tenant) return false;

  const tenantId = isTenant(tenant) ? tenant.id : tenant;

  return allRoles.some(role =>
    user.tenants?.some(({ tenant: userTenant, roles }) => {
      const userTenantId = isTenant(userTenant) ? userTenant.id : userTenant;
      return userTenantId === tenantId && roles?.includes(role);
    })
  );
};
