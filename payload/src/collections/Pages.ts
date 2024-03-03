import { CollectionConfig } from 'payload/types';
import { ArchiveBlock } from '../blocks/ArchiveBlock';
import { Content } from '../blocks/Content';
import { FormBlock } from '../blocks/Form/';
import { MediaBlock } from '../blocks/MediaBlock';

const Pages: CollectionConfig = {
    slug: 'pages',
    versions: {
        drafts: {
            autosave: true,
        }
    },
    admin: {
        useAsTitle: 'title',
        group: 'Content',
        description: 'Bloom empowers you to focus on your content, not on learning complex design tools. With our intuitive Live Preview and a Notion-like lexical editor, crafting and editing your pages becomes a seamless, real-time experience. Leverage the versatility of Bloom Blocks—Content, Form, Media, and Archive—to effortlessly create compelling web experiences. Designed for creators of all skill levels, our platform simplifies the design process, allowing you to bring your ideas to life with ease and precision.'
    },
    labels: {
        singular: 'Page',
        plural: 'Pages',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            admin: {
                                position: 'sidebar'
                            }
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
                    ],
                },
            ],
        },
    ],
};

export default Pages;
