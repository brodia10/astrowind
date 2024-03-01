import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'title',
        group: 'Content',
        description: 'Empower your content strategy by defining categories that reflect your brand and audience needs. Use categories like "News," "Tutorials," "Customer Stories," or "Product Updates" to organize your content effectively. This feature enables you to curate your site’s structure, guiding visitors to areas of interest and keeping your content neatly organized. Perfect for anyone looking to create a more engaging and navigable online experience.',
        hidden: true,
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
    ],
}

export default Categories