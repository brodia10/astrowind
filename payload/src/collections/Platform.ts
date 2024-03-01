import type { CollectionConfig } from 'payload/types';

const Platforms: CollectionConfig = {
    slug: 'platforms',
    admin: {
        useAsTitle: 'name',
        hidden: true,
        description: 'Manage and define the platforms used for virtual events. This flexibility allows you to add new platforms as they become available or as your event needs evolve. Examples include "Zoom," "Google Meet," and "Microsoft Teams." This setup enables easy management of virtual event platforms, ensuring your event offerings stay current and accessible.',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'The name of the virtual event platform, such as Zoom or Google Meet.',
            },
        },
    ],
};

export default Platforms;
