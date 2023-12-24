import { CollectionConfig } from 'payload/types';
import { FormBlock } from '../blocks/FormBlock';

const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    labels: {
        singular: 'Page',
        plural: 'Pages',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
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
                                FormBlock,
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export default Pages;
