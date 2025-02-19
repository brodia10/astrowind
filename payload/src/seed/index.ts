import type { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {
    console.log('Starting database seeding...')

    // create super admin
    await payload.create({
        collection: 'users',
        data: {
            firstName: 'Brook',
            lastName: 'Rodia',
            email: 'brook@bloomcms.io',
            password: 'Nirvana1987k!',
            roles: ['super-admin'],
        },
    })
    console.log('Super Admin User created...')

    // create tenants, use `*.localhost.com` so that accidentally forgotten changes the hosts file are acceptable
    const bloom = await payload.create({
        collection: 'tenants',
        data: {
            siteName: 'Bloom',
            domains: [{ domain: process.env.BLOOM_DOMAIN, autoGenerated: false }],
            status: 'ready_to_launch',
            subscription: 'pro',
        },
    })
    // await payload.create({
    //     collection: 'tenants',
    //     data: {
    //         company: { name: 'ICA' },
    //         domains: [{ domain: 'client.localhost.com', autoGenerated: false }],
    //     },
    // }),


    console.log("Tenant created...")

    // create tenant-scoped admins and users
    await Promise.all([
        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@bloom.com',
                password: 'test',
                firstName: 'Admin Bloom',
                lastName: 'User',
                roles: ['user'],
                tenants: [
                    {
                        tenant: bloom.id,
                        roles: ['admin'],
                    },
                ],
            },
        }),
        await payload.create({
            collection: 'users',
            data: {
                email: 'user@bloom.com',
                password: 'test',
                firstName: 'User Bloom',
                lastName: 'User',
                roles: ['user'],
                tenants: [
                    {
                        tenant: bloom.id,
                        roles: ['user'],
                    },
                ],
            },
        }),
        // await payload.create({
        //     collection: 'users',
        //     data: {
        //         email: 'admin@client.com',
        //         password: 'test',
        //         firstName: 'Admin Client',
        //         lastName: 'User',
        //         roles: ['user'],
        //         tenants: [
        //             {
        //                 tenant: client.id,
        //                 roles: ['admin'],
        //             },
        //         ],
        //     },
        // }),
        // await payload.create({
        //     collection: 'users',
        //     data: {
        //         email: 'user@client.com',
        //         password: 'test',
        //         roles: ['user'],
        //         firstName: 'User Client',
        //         lastName: 'User',
        //         tenants: [
        //             {
        //                 tenant: client.id,
        //                 roles: ['user'],
        //             },
        //         ],
        //     },
        // }),
    ])
    console.log('User assigned roles to Tenant... ')

    // Create email signup form
    await payload.create({
        collection: 'forms',
        data: {
            title: 'Email Signup',
            fields: [
                {
                    name: 'email',
                    label: 'Email Address',
                    required: true,
                    blockType: 'email',
                },
            ],
            submitButtonLabel: 'Subscribe',
            confirmationType: 'message',
            confirmationMessage: {
                root: {
                    children: [
                        {
                            type: 'paragraph',
                            version: 1,
                            children: [{ text: 'Thank you for subscribing!' }],
                        },
                    ],
                    direction: 'ltr',
                    format: 'center',
                    indent: 0,
                    type: 'root',
                    version: 1,
                },
            },
        },
    });
    console.log('Email Signup Form created successfully:');

    // await payload.create({
    //     collection: 'email-configs',
    //     data: {
    //         fromEmailAddress: process.env.BLOOM_EMAIL,
    //         fromName: process.env.BLOOM_FROM_NAME,
    //     },
    // });

    // console.log('Email config created...')

    // // await payload.update({
    // //     collection: 'tenants',
    // //     id: bloom.id,
    // //     data: {
    // //         emailConfig: bloomEmailConfig.id,
    // //     },
    // // })

    // console.log("Email config tied to Tenant...")


}

