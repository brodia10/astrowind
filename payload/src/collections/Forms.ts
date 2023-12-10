import { CollectionConfig } from 'payload/types';

export const Forms: CollectionConfig = {
    slug: 'forms',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'fields',
            type: 'array',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                },
                {
                    name: 'fieldType',
                    type: 'select',
                    options: [
                        'text', 'textarea', 'number', 'date', 'checkbox'
                    ],
                },
            ],
        },
    ],
};
