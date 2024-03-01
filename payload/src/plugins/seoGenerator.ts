
const seoGenerator = {
    collections: [
        'pages',
        'posts',
    ],
    uploadsCollection: 'media',
    tabbedUI: true,
    // these should be updated.
    generateTitle: ({ doc, locale, ...docInfo }) => `Website.com — ${doc?.title?.value}`,
    generateDescription: ({ doc, locale, ...docInfo }) => doc?.content?.value,
    generateURL: ({ doc, collection, locale, ...docInfo }) => `${process.env.BLOOM_BASE_API_URL}/${collection?.slug}/${doc?.slug?.value}`,
    generateImage: ({ doc, locale }) => doc?.image?.value
}

export default seoGenerator;