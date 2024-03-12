import { CollectionConfig } from 'payload/types';

const Newsletters: CollectionConfig = {
    slug: 'newsletters',
    admin: {
        group: 'Content',
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'scheduledSendDate'],
    },
    versions: {
        drafts: {
            autosave: true,
        },
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    description: 'Manage newsletter content here.',
                    fields: [
                        {
                            name: 'title',
                            label: 'Title',
                            type: 'text',
                        },
                        {
                            name: 'templates',
                            label: 'Template',
                            type: 'relationship',
                            relationTo: 'postmark-templates',
                            hasMany: false,
                        },
                        {
                            name: 'content',
                            label: 'Content',
                            type: 'blocks',
                            blocks: [
                                {
                                    slug: 'text',
                                    labels: {
                                        singular: 'Text Block',
                                        plural: 'Text Blocks',
                                    },
                                    fields: [
                                        {
                                            name: 'text',
                                            label: 'Text',
                                            type: 'textarea',
                                            required: true,
                                        },
                                    ],
                                },
                                // Add other blocks as necessary
                            ],
                        },
                    ],
                },
                {
                    label: 'Publish',
                    description: 'Set newsletter details such as email lists, status, and scheduled send date here.',
                    fields: [
                        {
                            name: 'emailLists',
                            label: 'Email Lists',
                            type: 'relationship',
                            relationTo: 'email-lists',
                            hasMany: true,
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
                        },
                        {
                            name: 'scheduledSendDate',
                            label: 'Scheduled Send Date',
                            type: 'date',
                            admin: {
                                condition: (data) => data.status === 'scheduled',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

export default Newsletters;
