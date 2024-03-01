import { CollectionConfig, FieldHook } from 'payload/types';

const getTotalPrice: FieldHook = async ({ data }) => {
    const { price, salesTaxPercentage, fees } = data.tickets;
    const totalPrice = Math.round(price * (1 + (salesTaxPercentage / 100))) + fees;

    return totalPrice;
};

const Events: CollectionConfig = {
    slug: 'events',
    admin: {
        defaultColumns: ['title', 'date', 'location'],
        useAsTitle: 'title',
        group: 'Team',
        description: 'Dive into the heart of event planning with unparalleled ease. This is where every detail comes to life, from setting dates and locations to calculating ticket prices with taxes and fees included. Perfect for crafting unforgettable experiences that bring your team and audience together.'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'date',
                    type: 'date',
                    required: true,
                },
                {
                    name: 'location',
                    type: 'relationship',
                    relationTo: 'locations',
                    maxDepth: 0,
                    hasMany: false,
                },
            ],
        },
        {
            name: 'tickets',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'price',
                            type: 'number',
                            admin: {
                                description: 'USD',
                            },
                        },
                        {
                            name: 'salesTaxPercentage',
                            type: 'number',
                            admin: {
                                description: '%',
                            },
                        },
                    ],
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'fees',
                            type: 'number',
                            admin: {
                                description: 'USD',
                            },
                        },
                        {
                            name: 'totalPrice',
                            type: 'number',
                            access: {
                                create: () => false,
                                update: () => false,
                            },
                            admin: {
                                description: 'USD',
                                readOnly: true,
                            },
                            hooks: {
                                beforeChange: [({ siblingData }) => {
                                    // Mutate the sibling data to prevent DB storage
                                    // eslint-disable-next-line no-param-reassign
                                    siblingData.totalPrice = undefined;
                                }],
                                afterRead: [getTotalPrice],
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

export default Events;