import { CollectionConfig } from 'payload/types';

export const FormSubmissions: CollectionConfig = {
    slug: 'formSubmissions',
    fields: [
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            required: true,
        },
        {
            name: 'data',
            type: 'richText',
            required: true,
        },
    ],
    access: {
        // You may want to restrict access to form submissions for security reasons
    },
};
