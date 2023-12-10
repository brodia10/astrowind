import { CollectionConfig } from 'payload/types';

const SEO: CollectionConfig = {
    slug: 'seo',
    labels: {
        singular: 'SEO',
        plural: 'SEO',
    },
    fields: [
        {
            name: 'metaTitle',
            type: 'text',
            label: 'Meta Title',
        },
        {
            name: 'metaDescription',
            type: 'textarea',
            label: 'Meta Description',
        },
        {
            name: 'keywords',
            type: 'text',
            label: 'Keywords',
        },
        {
            name: 'ogTitle',
            type: 'text',
            label: 'Open Graph Title',
        },
        {
            name: 'ogDescription',
            type: 'textarea',
            label: 'Open Graph Description',
        },
        {
            name: 'ogImage',
            type: 'text',
            label: 'Open Graph Image URL',
        },
    ],
};

export default SEO;
