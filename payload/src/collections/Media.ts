import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        group: 'Content',
        description: 'The Media collection is your central hub for storing, categorizing, and optimizing images for your website. Automatically generate optimized versions for thumbnails, cards, and responsive layouts to ensure your images look perfect on any device. Categorize your media to keep it organized and easily accessible for future content creation. Add categories to easily sort through media. This collection supports all image types, making it a versatile tool for your digital asset management needs.'
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                // By specifying `undefined` or leaving a height undefined,
                // the image will be sized to a certain width,
                // but it will retain its original aspect ratio
                // and calculate a height automatically.
                height: undefined,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
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
    ],
}