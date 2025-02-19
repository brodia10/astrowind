import { Config, Plugin } from 'payload/config'

const addLastModified: Plugin = (incomingConfig: Config): Config => {
    // Find all incoming collections
    // so we can create a lastModifiedBy relationship field
    // to all collections
    const collections = incomingConfig.collections

    // Spread the existing config
    const config: Config = {
        ...incomingConfig,
        collections: incomingConfig.collections.map((collection) => {
            // Spread each item that we are modifying,
            // and add our new field - complete with
            // hooks and proper admin UI config
            return {
                ...collection,
                fields: [
                    ...collection.fields,
                    {
                        name: 'lastModifiedBy',
                        type: 'relationship',
                        relationTo: collections.map(({ slug }) => slug),
                        hooks: {
                            beforeChange: [
                                ({ req }) => ({
                                    value: req?.user?.id,
                                    relationTo: req?.user?.collection,
                                }),
                            ],
                        },
                        admin: {
                            position: 'sidebar',
                            readOnly: true,
                        },
                    },
                ],
            }
        }),
    }

    return config
}

export default addLastModified