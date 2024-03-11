import { Payload } from 'payload';
import { superAdmin } from './data/userData';

export const createSuperAdmin = async (payload: Payload): Promise<void> => {
    await payload.create({
        collection: 'users',
        data: superAdmin,
    });
};
