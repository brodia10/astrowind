import type { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {
    // create super admin
    await payload.create({
        collection: 'users',
        data: {
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@bloomcms.io',
            password: 'demo',
            roles: ['super-admin'],
        },
    })
    // Step 1: Create Global Plans concurrently and capture their IDs
    const [freePlan, miniPlan] = await Promise.all([
        payload.create({
            collection: 'global-plans',
            data: {
                // Data for 'free' plan
                planGroup: {
                    globalPlan: 'free',
                },
                paymentGroup: {
                    paymentMethod: 'someMethod',
                },
            },
        }),
        payload.create({
            collection: 'global-plans',
            data: {
                planGroup: {
                    globalPlan: 'mini',
                },
                paymentGroup: {
                    paymentMethod: 'otherMethod',
                },
            },
        }),
    ]);

    // Extract IDs from created plans
    const freePlanId = freePlan.id; // Adjust according to the actual structure returned
    const miniPlanId = miniPlan.id;


    // create tenants, use `*.localhost.com` so that accidentally forgotten changes the hosts file are acceptable
    const [bloom, client] = await Promise.all([
        await payload.create({
            collection: 'tenants',
            data: {
                name: 'bloom',
                domains: [{ domain: 'localhost' },],
                globalPlan: freePlanId,
            },
        }),
        await payload.create({
            collection: 'tenants',
            data: {
                name: 'client',
                domains: [{ domain: 'client.localhost.com' },],
                globalPlan: miniPlanId,
            },
        }),
    ])

    // create tenant-scoped admins and users
    await Promise.all([
        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@bloom.com',
                password: 'test',
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
                roles: ['user'],
                tenants: [
                    {
                        tenant: bloom.id,
                        roles: ['user'],
                    },
                ],
            },
        }),
        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@client.com',
                password: 'test',
                roles: ['user'],
                tenants: [
                    {
                        tenant: client.id,
                        roles: ['admin'],
                    },
                ],
            },
        }),
        await payload.create({
            collection: 'users',
            data: {
                email: 'user@client.com',
                password: 'test',
                roles: ['user'],
                tenants: [
                    {
                        tenant: client.id,
                        roles: ['user'],
                    },
                ],
            },
        }),
    ])

    // create tenant-scoped pages
    // await Promise.all([
    //     await payload.create({
    //         collection: 'pages',
    //         data: {
    //             tenant: bloom.id,
    //             title: 'bloom Home',
    //             richText: [
    //                 {
    //                     text: 'Hello, bloom!',
    //                 },
    //             ],
    //         },
    //     }),
    //     await payload.create({
    //         collection: 'pages',
    //         data: {
    //             title: 'client Home',
    //             tenant: client.id,
    //             richText: [
    //                 {
    //                     text: 'Hello, client!',
    //                 },
    //             ],
    //         },
    //     }),
    // ])
}