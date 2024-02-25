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
