import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload/types';

const PostmarkTemplates: CollectionConfig = {
    slug: 'postmark-templates',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'templateId',
            type: 'number',
            required: true,
        },
        {
            name: 'subject',
            type: 'text',
            required: true,
        },
        {
            name: 'htmlBody',
            type: 'richText',
            editor: lexicalEditor(),
            required: true,
        },
        {
            name: 'textBody',
            type: 'textarea',
            required: true,
        },
        {
            name: 'associatedServerId',
            type: 'number',
            required: true,
        },
        {
            name: 'active',
            type: 'checkbox',
        },
        {
            name: 'alias',
            type: 'text',
        },
        {
            name: 'templateType',
            type: 'select',
            options: [
                { label: 'Standard', value: 'Standard' },
                { label: 'Layout', value: 'Layout' },
            ],
            required: true,
        },
        {
            name: 'layoutTemplate',
            type: 'text',
        },
    ],
};

export default PostmarkTemplates;
