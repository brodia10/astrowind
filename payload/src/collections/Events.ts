import { CollectionConfig } from 'payload/types';

export const Events: CollectionConfig = {
    slug: 'events',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'date',
            type: 'date',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'seo',
            type: 'relationship',
            relationTo: 'seo',
            label: 'SEO',
        },
    ],
};
