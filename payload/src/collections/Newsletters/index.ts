import { BlocksFeature, LinkFeature, UploadFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload/types';
import { CallToAction } from '../../blocks/CallToAction';
import { Content } from '../../blocks/Content';
import { FormBlock } from '../../blocks/Form';
import { MediaBlock } from '../../blocks/MediaBlock';

const Newsletters: CollectionConfig = {
    slug: 'newsletters',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'scheduledSendDate'],
        hidden: true,
    },

    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'content',
            label: 'Content',
            type: 'richText',
            required: true,
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    LinkFeature({
                        // Example showing how to customize the built-in fields of the Link feature
                        fields: [
                            {
                                name: 'rel',
                                label: 'Rel Attribute',
                                type: 'select',
                                hasMany: true,
                                options: ['noopener', 'noreferrer', 'nofollow'],
                                admin: {
                                    description:
                                        'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                                },
                            },
                        ],
                    }),
                    UploadFeature({
                        collections: {
                            uploads: {
                                // Example showing how to customize the built-in fields of the Upload feature
                                fields: [
                                    {
                                        name: 'caption',
                                        type: 'richText',
                                        editor: lexicalEditor({}),
                                    },
                                ],
                            },
                        },
                    }),
                    BlocksFeature({
                        blocks: [
                            CallToAction,
                            MediaBlock,
                            FormBlock,
                            Content,
                        ],
                    }),
                ]
            }),
        },
        {
            name: 'emailLists',
            label: 'Email Lists',
            type: 'relationship',
            relationTo: 'email-lists',
            hasMany: true,
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Sent', value: 'sent' },
            ],
            defaultValue: 'draft',
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'scheduledSendDate',
            label: 'Scheduled Send Date',
            type: 'date',
            admin: {
                condition: (data) => data.status === 'scheduled',
                date: {
                    pickerAppearance: 'dayAndTime', // Allows selection of both date and time
                    displayFormat: 'PPPp', // Example format: Jan 1, 2024, 12:00 PM
                },
                position: 'sidebar'
            },
        },
    ],
};

export default Newsletters;
