import { User } from "payload/generated-types";

export const superAdmin: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'salt' | 'hash'> = {
    email: 'brook@bloomcms.io',
    password: 'Nirvana1987k!',
    firstName: 'Brook',
    lastName: 'Rodia',
    roles: ['super-admin'],
};

export const tenantUsers: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'salt' | 'hash'>[] = [
    {
        email: 'admin@bloom.com',
        password: 'test',
        firstName: 'Admin Bloom',
        lastName: 'User',
        roles: ['user'],
        tenants: [],
    },
];
