import type { CollectionConfig, } from 'payload/types'

import link from '../fields/link'

export const Footer: CollectionConfig = {
    access: {
        read: () => true,
    },
    labels: {
        singular: 'Footer',
        plural: 'Footer',
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