
import { CollectionConfig } from 'payload/types';

const Tenants: CollectionConfig = {
    slug: "tenants",
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            type: "text",
            name: "name",
            label: "Name",
            required: true,
        },
    ],
};

export default Tenants;