import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload/types';
import { ArchiveBlock } from '../blocks/ArchiveBlock';
import { Content } from '../blocks/Content';
import { FormBlock } from '../blocks/Form';
import { MediaBlock } from '../blocks/MediaBlock';

export const Posts: CollectionConfig = {
    slug: 'posts',
    versions: {
        drafts: {
            autosave: true,
        }
    },
    admin: {
        group: 'Content',
        useAsTitle: 'title',
        description: 'The Posts collection is designed for crafting engaging and versatile blog posts or articles. Utilize the power of the Lexical editor for sophisticated text editing and enrich your posts with custom blocks—ranging from embedded content and forms to media galleries and archives. Each post can be further categorized for organized content discovery and enhanced with images for visual appeal. This setup ensures each post is not only content-rich but also visually engaging and well-structured.'
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
                            admin: {
                                position: 'sidebar'
                            },
                            type: 'text',
                            required: true,
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
                            required: true,
                            admin: {
                                position: 'sidebar'
                            }
                        },
                    ],
                },
            ],
        },
    ],
};
