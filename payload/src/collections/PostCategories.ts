import { CollectionConfig } from 'payload/types';


export const PostCategories: CollectionConfig = {
    slug: 'postCategories',
    admin: {
        group: 'Content',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
    ],
};
