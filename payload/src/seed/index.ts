import type { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {
    // create super admin
    await payload.create({
        collection: 'users',
        data: {
            firstName: 'Brook',
            lastName: 'Rodia',
            email: 'brook@builditwithbloom.com',
            password: 'Nirvana1987k!',
            roles: ['super-admin'],
        },
    })

    // create tenants, use `*.localhost.com` so that accidentally forgotten changes the hosts file are acceptable
    const [bloom, client] = await Promise.all([
        await payload.create({
            collection: 'tenants',
            data: {
                company: { name: 'Bloom' },
                domains: [{ domain: process.env.BLOOM_DOMAIN, autoGenerated: false }],
                // globalPlan: freePlanId,
            },
        }),
        await payload.create({
            collection: 'tenants',
            data: {
                company: { name: 'ICA' },
                domains: [{ domain: 'client.localhost.com', autoGenerated: false }],
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
        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@client.com',
                password: 'test',
                firstName: 'Admin Client',
                lastName: 'User',
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
                firstName: 'User Client',
                lastName: 'User',
                tenants: [
                    {
                        tenant: client.id,
                        roles: ['user'],
                    },
                ],
            },
        }),
    ])

    const bloomEmailConfig = await payload.create({
        collection: 'tenant-email-configs',
        data: {
            tenant: bloom.id,
            fromEmailAddress: process.env.BLOOM_EMAIL,
            fromName: process.env.BLOOM_FROM_NAME,
        },
    });

    await payload.update({
        collection: 'tenants',
        id: bloom.id,
        data: {
            emailConfig: bloomEmailConfig,
        },
    })
}

