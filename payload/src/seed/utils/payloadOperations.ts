import type { Payload } from 'payload';
import {
    Category,
    EmailList,
    Event,
    Form,
    FormSubmission,
    Location,
    Media,
    Newsletter,
    OptInOptOutHistory,
    Page,
    PayloadMigration,
    PayloadPreference,
    Platform,
    Post,
    PostmarkTemplate,
    Search,
    Subscriber,
    Tenant,
    TenantEmailConfig,
    User,
} from '../../payload-types';

// Define a type for mapping collection names to their corresponding types
type CollectionTypes = {
    users: User,
    tenants: Tenant,
    'tenant-email-configs': TenantEmailConfig,
    subscribers: Subscriber,
    'email-lists': EmailList,
    'opt-in-opt-out-history': OptInOptOutHistory,
    media: Media,
    categories: Category,
    posts: Post,
    pages: Page,
    events: Event,
    locations: Location,
    platforms: Platform,
    newsletters: Newsletter,
    'postmark-templates': PostmarkTemplate,
    forms: Form,
    'form-submissions': FormSubmission,
    search: Search,
    'payload-preferences': PayloadPreference,
    'payload-migrations': PayloadMigration,
};

// A type for the query conditions based on Payload's querying capabilities
type QueryCondition = {
    equals?: any;
    not_equals?: any;
    greater_than?: number | Date;
    greater_than_equal?: number | Date;
    less_than?: number | Date;
    less_than_equal?: number | Date;
    like?: string;
    contains?: string;
    in?: any[];
    not_in?: any[];
    all?: any[];
    exists?: boolean;
    near?: string;
};

// type Query = {
//     [key: string]: QueryCondition | QueryCondition[] | Query;
//     or?: Query[];
//     and?: Query[];
// };

// export async function createEntity<T extends keyof CollectionTypes>(
//     payload: Payload,
//     collection: T,
//     data: Omit<CollectionTypes[T], 'id' | 'createdAt' | 'updatedAt'>
// ): Promise<CollectionTypes[T]> {
//     return await payload.create({
//         collection,
//         data,
//         overrideAccess: true,
//     });
// }

// export async function updateEntity<T extends keyof CollectionTypes>(
//     payload: Payload,
//     collection: T,
//     id: string | number,
//     data: Partial<Omit<CollectionTypes[T], 'createdAt' | 'updatedAt'>>
// ): Promise<CollectionTypes[T]> {
//     return await payload.update({
//         collection,
//         id,
//         data,
//         overrideAccess: true,
//     });
// }

// export async function findDocumentsWithQuery<T extends keyof CollectionTypes>(
//     payload: Payload,
//     collection: T,
//     query: Query,
//     sort?: string,
// ): Promise<CollectionTypes[T][]> {
//     return await payload.find({
//         collection,
//         where: query,
//         sort,
//     });
// }

export async function findDocumentByID<T extends keyof CollectionTypes>(
    payload: Payload,
    collection: T,
    id: string,
    options: { overrideAccess?: boolean; depth?: number } = {}
): Promise<CollectionTypes[T]> {
    return await payload.findByID({
        collection,
        id,
        ...options,
    });
}

export async function deleteDocumentByID<T extends keyof CollectionTypes>(
    payload: Payload,
    collection: T,
    id: string,
    options: { overrideAccess?: boolean } = {}
): Promise<CollectionTypes[T]> {
    return await payload.delete({
        collection,
        id,
        ...options,
    });
}
