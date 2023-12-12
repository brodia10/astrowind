import { CollectionConfig } from 'payload/types';

const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    labels: {
        singular: 'Page',
        plural: 'Pages',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug',
            required: true,
            unique: true,
        },
        {
            name: 'content',
            type: 'richText',
            label: 'Content',
        },
    ],
};

export default Pages;
