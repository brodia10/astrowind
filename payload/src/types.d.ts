import { Tenant } from './payload-types';

// Extend Express Request to include 'tenant'
declare module 'express-serve-static-core' {
  interface Request {
    tenant?: Tenant;
  }
}

declare module '*.png' {
  const value: any;
  export = value;
}