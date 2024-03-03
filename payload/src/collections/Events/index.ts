import { CollectionConfig, FieldHook } from 'payload/types';

// Calculate total ticket price including sales tax and fees
const getTotalPrice: FieldHook = async ({ data }) => {
    const { price, salesTaxPercentage, fees } = data.tickets;
    const totalPrice = Math.round(price * (1 + salesTaxPercentage / 100)) + fees;
    return { value: totalPrice };
};

// Validate linkUrl to ensure it starts with https://
const validateLinkUrl: FieldHook = ({ data }) => {
    const linkUrl = data.virtualDetails?.linkUrl;
    if (linkUrl && !linkUrl.startsWith('https://')) {
        throw new Error('The link URL must start with "https://".');
    }
};

const Events: CollectionConfig = {
    slug: 'events',
    admin: {
        defaultColumns: ['eventDetails.row.title', 'eventDetails.dateTime', 'eventDetails.eventType', 'virtualDetails.platform'],
        useAsTitle: 'eventDetails.title',
        group: 'Team',
        description: 'Manage your events, customizing details for either virtual or in-person experiences. Utilize this platform to streamline the planning process, ensuring every event detail is captured with precision.',
    },
    fields: [
        {
            name: 'eventDetails',
            label: 'Event Details',
            type: 'group',
            admin: {
                width: '100%',
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            admin: {
                                position: 'sidebar',
                                width: '60%',
                            },
                        },
                        {
                            name: 'category',
                            type: 'relationship',
                            relationTo: 'categories',
                            required: true,
                            hasMany: true,
                            admin: {
                                position: 'sidebar',
                                width: '40%'
                            }
                        },
                    ],
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                    maxLength: 128,
                    admin: {
                        description: 'Describe your event. Max length of 128 characters.'
                    }
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    type: 'row',
                    fields: [

                        {
                            name: 'eventType',
                            type: 'radio',
                            required: true,
                            options: [
                                { label: 'In Person', value: 'inPerson' },
                                { label: 'Virtual', value: 'virtual' },
                            ],
                            admin: {
                                width: '10%',
                                layout: 'horizontal',
                                description: 'Select whether the event will be held in person or virtually. This choice determines additional details to be provided.',
                            },
                        },
                        {
                            name: 'dateTime',
                            type: 'date',
                            required: true,
                            admin: {
                                width: '20%',
                                description: 'Select the date and time of the event. If the event spans multiple days, select the starting date and time. Ensure to consider the time zone when planning virtual events.',
                                date: {
                                    pickerAppearance: 'dayAndTime', // Allows selection of both date and time
                                    displayFormat: 'PPPp', // Example format: Jan 1, 2024, 12:00 PM
                                },
                            },
                        },
                        {
                            name: 'timeZone',
                            label: 'Time Zone',
                            type: 'select',
                            options: [
                                { label: 'UTC-12:00', value: 'UTC-12' },
                                { label: 'UTC-11:00', value: 'UTC-11' },
                                // Include all necessary time zones
                                { label: 'UTC+14:00', value: 'UTC+14' },
                            ],
                            admin: {
                                width: '15%',
                                description: 'Select the time zone for the event. This is especially important for virtual events to coordinate with attendees in different regions.',
                            },
                        },
                    ],
                },
            ],
        },
        // Physical Location Details
        {
            name: 'locationDetails',
            label: 'Location',
            type: 'group',
            admin: {
                condition: (_, siblingData) => siblingData.eventDetails?.eventType === 'inPerson',
            },
            fields: [
                {
                    name: 'location',
                    type: 'relationship',
                    relationTo: 'locations',
                    required: false,
                    admin: {
                        width: '100%',
                        description: 'Select the location from existing venues. Required for in-person events. If the location is not listed, add it to the Locations collection first.',
                    },
                },
            ],
        },
        {
            name: 'virtualDetails',
            label: 'Virtual Event Details',
            type: 'group',
            admin: {
                condition: (_, siblingData) => siblingData.eventDetails?.eventType === 'virtual',
            },
            fields: [
                {
                    name: 'platform',
                    type: 'relationship',
                    relationTo: 'platforms',
                    required: false,
                    admin: {
                        width: '50%',
                        description: 'Select the platform where you will be hosting this event. Add options as needed. Required for virtual events.',
                    },
                },
                {
                    name: 'linkUrl',
                    type: 'text',
                    label: 'Event Link',
                    required: false,
                    admin: {
                        width: '50%',
                        description: 'Provide the URL for the virtual event platform (e.g., Zoom, Google Meet). Ensure the link is correct and accessible. Required for virtual events.',
                        // Ensure this condition accurately reflects your data structure
                        placeholder: 'https://example.com/meeting',
                    },
                    hooks: {
                        beforeChange: [validateLinkUrl],
                    },
                },
            ],
        },
        {
            name: 'tickets',
            type: 'group',
            admin: { position: 'sidebar' },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'price',
                            type: 'number',
                            admin: {
                                description: 'Enter the ticket price in USD. This will be the base price before taxes and fees.',
                            },
                        },
                        {
                            name: 'salesTaxPercentage',
                            type: 'number',
                            admin: {
                                description: 'Specify the sales tax rate as a percentage. This will be applied to the ticket price.',
                            },
                        },
                        {
                            name: 'fees',
                            type: 'number',
                            admin: {
                                description: 'Enter any additional fees in USD that will be applied to the ticket price.',
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
                                description: 'This field displays the total ticket price, including taxes and fees, calculated automatically. Note: This field is read-only and updated based on the price, sales tax, and fees entered.',
                                readOnly: true,
                            },
                            hooks: {
                                beforeChange: [({ siblingData }) => {
                                    siblingData.totalPrice = undefined; // Ensures the field is not stored in the DB
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
