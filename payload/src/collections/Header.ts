import type { CollectionConfig } from 'payload/types'

import link from '../fields/link'

export const Header: CollectionConfig = {
    access: {
        read: () => true,
    },
    labels: {
        singular: 'Header',
        plural: 'Header'
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
    slug: 'header',
}