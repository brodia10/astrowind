import { CollectionConfig } from 'payload/types';


export const PostCategories: CollectionConfig = {
    slug: 'postCategories',
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
