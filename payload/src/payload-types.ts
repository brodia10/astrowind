/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    'tenant-stripe-configs': TenantStripeConfig;
    'email-configs': EmailConfig;
    subscribers: Subscriber;
    'email-lists': EmailList;
    'opt-in-opt-out-history': OptInOptOutHistory;
    tenants: Tenant;
    media: Media;
    categories: Category;
    posts: Post;
    pages: Page;
    events: Event;
    locations: Location;
    platforms: Platform;
    newsletters: Newsletter;
    'postmark-templates': PostmarkTemplate;
    forms: Form;
    'form-submissions': FormSubmission;
    search: Search;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    header: Header;
    footer: Footer;
    siteSettings: Settings;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  roles: ('super-admin' | 'user')[];
  tenants?:
    | {
        tenant: number | Tenant;
        roles: ('admin' | 'user')[];
        id?: string | null;
      }[]
    | null;
  lastLoggedInTenant?: (number | null) | Tenant;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tenants".
 */
export interface Tenant {
  id: number;
  brandAssets?: {
    logo?: number | Media | null;
    icon?: number | Media | null;
  };
  themeColors?: {
    primaryColor?: string | null;
    secondaryColor?: string | null;
  };
  company: {
    name: string;
    telephone?: {
      telephone?: string | null;
      businessHours?: string | null;
    };
    streetAddress?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    country?: string | null;
  };
  domains?:
    | {
        domain: string;
        autoGenerated: boolean;
        id?: string | null;
      }[]
    | null;
  emailConfig?: (number | null) | EmailConfig;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  category: (number | Category)[];
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "email-configs".
 */
export interface EmailConfig {
  id: number;
  fromEmailAddress: string;
  fromName: string;
  postmarkServerId?: number | null;
  postmarkServerToken?: string | null;
  messageStreams?: {
    transactional?: string | null;
    broadcast?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tenant-stripe-configs".
 */
export interface TenantStripeConfig {
  id: number;
  tenant: number | Tenant;
  stripeSecretKey: string;
  stripePublishableKey: string;
  stripeAccountId: string;
  stripeWebhookSecret: string;
  defaultCurrency: 'US' | 'EU' | 'GB' | 'CA' | 'AF' | 'AX' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO';
  paymentMethods:
    | 'american_express'
    | 'diners_club'
    | 'mastercard'
    | 'visa'
    | 'apple_pay'
    | 'google_pay'
    | 'microsoft_pay'
    | 'paypal'
    | 'alipay'
    | 'wechat_pay'
    | 'unionpay'
    | 'jcb'
    | 'klarna'
    | 'afterpay'
    | 'ideal';
  successUrl: string;
  cancelUrl: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscribers".
 */
export interface Subscriber {
  id: number;
  email: {
    email_address: string;
    email_lists: (number | EmailList)[];
  };
  subscription_management: {
    email_status: 'Active' | 'Unsubscribed';
    email_permission_status: 'Express' | 'Implied';
    confirmed_opt_in_date: string;
    confirmed_opt_in_source: string;
    confirmed_opt_out_date: string;
    confirmed_opt_out_source: string;
    confirmed_opt_out_reason: string;
  };
  tenant: number | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "email-lists".
 */
export interface EmailList {
  id: number;
  name: string;
  tenant: number | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "opt-in-opt-out-history".
 */
export interface OptInOptOutHistory {
  id: number;
  subscriber: number | Subscriber;
  opt_type: 'Opt-In' | 'Opt-Out';
  date: string;
  source?: string | null;
  reason?: string | null;
  tenant: number | Tenant;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  layout: (
    | {
        invertBackground?: boolean | null;
        columns?:
          | {
              size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
              richText: {
                [k: string]: unknown;
              }[];
              enableLink?: boolean | null;
              link?: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: number | Page;
                } | null;
                url?: string | null;
                label: string;
                appearance?: ('default' | 'primary' | 'secondary') | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'content';
      }
    | {
        form: number | Form;
        enableIntro?: boolean | null;
        introContent?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'formBlock';
      }
    | {
        invertBackground?: boolean | null;
        position?: ('default' | 'fullscreen') | null;
        media: number | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'mediaBlock';
      }
    | {
        introContent: {
          [k: string]: unknown;
        }[];
        populateBy?: ('collection' | 'selection') | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'archive';
      }
  )[];
  content?: {
    root: {
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  title: string;
  image: number | Media;
  category: (number | Category)[];
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: number | Media | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  category: (number | Category)[];
  layout: (
    | {
        invertBackground?: boolean | null;
        columns?:
          | {
              size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
              richText: {
                [k: string]: unknown;
              }[];
              enableLink?: boolean | null;
              link?: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: number | Page;
                } | null;
                url?: string | null;
                label: string;
                appearance?: ('default' | 'primary' | 'secondary') | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'content';
      }
    | {
        form: number | Form;
        enableIntro?: boolean | null;
        introContent?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'formBlock';
      }
    | {
        invertBackground?: boolean | null;
        position?: ('default' | 'fullscreen') | null;
        media: number | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'mediaBlock';
      }
    | {
        introContent: {
          [k: string]: unknown;
        }[];
        populateBy?: ('collection' | 'selection') | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'archive';
      }
  )[];
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: number | Media | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms".
 */
export interface Form {
  id: number;
  title: string;
  fields?:
    | (
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            defaultValue?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checkbox';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'country';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'email';
          }
        | {
            message?: {
              root: {
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                type: string;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'message';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'number';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            options?:
              | {
                  label: string;
                  value: string;
                  id?: string | null;
                }[]
              | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'select';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'state';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'textarea';
          }
      )[]
    | null;
  submitButtonLabel?: string | null;
  confirmationType?: ('message' | 'redirect') | null;
  confirmationMessage?: {
    root: {
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  redirect?: {
    type?: ('reference' | 'custom') | null;
    reference?:
      | ({
          relationTo: 'pages';
          value: number | Page;
        } | null)
      | ({
          relationTo: 'posts';
          value: number | Post;
        } | null)
      | ({
          relationTo: 'events';
          value: number | Event;
        } | null);
    url?: string | null;
  };
  emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        message?: {
          root: {
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            type: string;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: number;
  eventDetails: {
    title: string;
    category: (number | Category)[];
    description: string;
    image: number | Media;
    eventType: 'inPerson' | 'virtual';
    dateTime: string;
    timeZone: 'UTC-12' | 'UTC-11' | 'UTC+14';
  };
  locationDetails?: {};
  virtualDetails?: {
    platform?: (number | null) | Platform;
    linkUrl?: string | null;
  };
  tickets?: {
    price?: number | null;
    salesTaxPercentage?: number | null;
    fees?: number | null;
    totalPrice?: number | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "platforms".
 */
export interface Platform {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "locations".
 */
export interface Location {
  id: number;
  location?: string | null;
  city: string;
  state?: string | null;
  country: string;
  nextEvent?: (number | null) | Event;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsletters".
 */
export interface Newsletter {
  id: number;
  title?: string | null;
  templates?: (string | null) | PostmarkTemplate;
  content?:
    | {
        text: string;
        id?: string | null;
        blockName?: string | null;
        blockType: 'text';
      }[]
    | null;
  emailLists?: (number | EmailList)[] | null;
  status?: ('draft' | 'scheduled' | 'sent') | null;
  scheduledSendDate?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "postmark-templates".
 */
export interface PostmarkTemplate {
  name?: string | null;
  id: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions".
 */
export interface FormSubmission {
  id: number;
  form: number | Form;
  submissionData?:
    | {
        field: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: number;
  title?: string | null;
  priority?: number | null;
  doc:
    | {
        relationTo: 'posts';
        value: number | Post;
      }
    | {
        relationTo: 'events';
        value: number | Event;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: number;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "siteSettings".
 */
export interface Settings {
  id: number;
  postsPage?: (number | null) | Page;
  projectsPage?: (number | null) | Page;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}