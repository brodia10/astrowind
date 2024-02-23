import { CollectionConfig } from 'payload/types';

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        group: 'Content',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'postCategories',
        },
    ],
};
