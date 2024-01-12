import type { AccessArgs } from 'payload/config'

import { checkRole } from '../collections/Users/utilities/checkRole'
import type { User } from '../payload-types'

type isAdmin = (args: AccessArgs<unknown, User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  // TODO Update this with actual roles for tenantAdmins and superadmins
  return checkRole(['super-admin'], user)
}
