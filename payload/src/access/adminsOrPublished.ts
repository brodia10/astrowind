import type { Access } from 'payload/config'

import { checkRole } from '../collections/Users/utilities/checkRole'

export const adminsOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(['super-admin'], user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
