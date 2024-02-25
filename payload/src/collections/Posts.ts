import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload/types';
import { ArchiveBlock } from '../blocks/ArchiveBlock';
import { Content } from '../blocks/Content';
import { FormBlock } from '../blocks/Form';
import { MediaBlock } from '../blocks/MediaBlock';

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        group: 'Content',
        useAsTitle: 'title'
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            required: true,
                            blocks: [
                                Content,
                                FormBlock,
                                MediaBlock,
                                ArchiveBlock,

                            ],
                        },
                        {
                            name: 'content',
                            type: 'richText',
                            // Pass the Lexical editor here and override base settings as necessary
                            editor: lexicalEditor({})
                        },
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            admin: {
                                position: 'sidebar'
                            }
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        },
                        {
                            name: 'category',
                            type: 'relationship',
                            relationTo: 'categories',
                            hasMany: true,
                        },
                    ],
                },
            ],
        },
    ],
};
