import type { GlobalConfig } from 'payload/types'

export const SiteSettings: GlobalConfig = {
    access: {
        read: () => true,
    },
    admin: {
        group: 'Site',
    },
    fields: [
        {
            name: 'postsPage',
            label: 'Posts page',
            relationTo: 'pages',
            type: 'relationship',
        },
        {
            name: 'projectsPage',
            label: 'Projects page',
            relationTo: 'pages',
            type: 'relationship',
        },
    ],
    graphQL: {
        name: 'Settings',
    },
    slug: 'siteSettings',
    typescript: {
        interface: 'Settings',
    },
}