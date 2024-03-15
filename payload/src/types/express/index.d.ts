// types/express/index.d.ts
import 'express';
import { Tenant } from 'payload/generated-types';

declare module 'express-serve-static-core' {
    interface Request {
        tenant?: Tenant;
    }
}
