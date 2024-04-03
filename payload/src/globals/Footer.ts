import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Footer: GlobalConfig = {
    access: {
        read: () => true,
    },
    admin: {
    },
    fields: [
        {
            name: 'navItems',
            fields: [
                link({
                    appearances: false,
                }),
            ],
            maxRows: 6,
            type: 'array',
        },
    ],
    slug: 'footer',
}