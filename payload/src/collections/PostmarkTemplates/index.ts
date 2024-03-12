import { CollectionConfig } from 'payload/types';

export const PostmarkTemplates: CollectionConfig = {
    slug: 'postmark-templates',
    access: {
        // Adjust access controls as necessary for your setup
        read: () => true,
        update: () => true, // Restrict this to admin roles
    },
    admin: {
        // hidden: true,
        useAsTitle: 'name'
    },
    fields: [
        {
            name: 'name',
            label: 'Template Name',
            type: 'text',
        },
        {
            name: 'id',
            label: 'Template ID',
            type: 'text',
        },
    ],
};
