
const seoGenerator = {
    collections: [
        'pages',
        'posts',
        'events',
        'postCategories'
    ],
    uploadsCollection: 'media',
    // these should be updated.
    generateTitle: ({ doc, locale, ...docInfo }) => `Website.com — ${doc?.title?.value}`,
    generateDescription: ({ doc, locale, ...docInfo }) => doc?.description?.value,
    generateURL: ({ doc, collection, locale, ...docInfo }) => `http://localhost:3000/${collection?.slug}/${doc?.slug?.value}`,
    generateImage: ({ doc, locale }) => doc?.image?.value
}

export default seoGenerator;