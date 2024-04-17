// @ts-nocheck
/* eslint-disable */

// absolutely remove those lines when you are done with testing deployment lol ^^ ignoring typescript errors

import dotenv from 'dotenv'
import path from 'path'

// Adapter Imports
import { postgresAdapter } from '@payloadcms/db-postgres'

// Payload Imports
import { webpackBundler } from '@payloadcms/bundler-webpack'
import formBuilder from "@payloadcms/plugin-form-builder"
import {
  BlocksFeature,
  LinkFeature,
  UploadFeature, lexicalEditor
} from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

// Plugin Config Imports
import formBuilderConfig from './plugins/formBuilder.config'

// Collection Imports
import EmailLists from './collections/EmailLists'
import { Media } from './collections/Media'
import OptInOptOutHistory from './collections/OptInOptOutHistory'
import Pages from './collections/Pages'
import { Posts } from './collections/Posts'
import { TenantEmailConfigs } from './collections/Tenants/TenantEmailConfigs'
import { Tenants } from './collections/Tenants/Tenants'
import { Users } from './collections/Users'

// Branding Imports
import { payloadCloud } from '@payloadcms/plugin-cloud'
import seo from '@payloadcms/plugin-seo'
import stripePlugin from '@payloadcms/plugin-stripe'
import { swagger } from 'payload-swagger'
import { CallToAction } from './blocks/CallToAction'
import { Content } from './blocks/Content'
import { FormBlock } from './blocks/Form'
import Categories from './collections/Categories'
import { Customers } from './collections/Customers'
import Events from './collections/Events'
import { Footer } from './collections/Footer'
import { Header } from './collections/Header'
import Locations from './collections/Locations'
import Newsletters from './collections/Newsletters'
import { Plans } from './collections/Plans'
import Platforms from './collections/Platform'
import { PostmarkTemplates } from './collections/PostmarkTemplates'
import Subscribers from './collections/Subscribers'
import { TenantStripeConfigs } from './collections/Tenants/TenantStripeConfigs'
import { Icon } from './components/Icon'
import { Logo } from './components/Logo'
import PricingPage from './components/PricingPage'
import StripeCheckoutForm from './components/StripeCheckoutForm'
import StripeCheckoutReturn from './components/StripeCheckoutReturn'
import seoGenerator from './plugins/seoGenerator'
import stripeConfig from './plugins/stripeConfig'

// Resolve .env
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

// Aliases for excluding server modules from the React Admin bundle. See here https://payloadcms.com/docs/admin/excluding-server-code
// Define the path to your mock module
const mockModulePath = path.resolve(__dirname, 'mocks/modules.js');

// Correctly specify each module's full file path that you wish to mock
const configurePostmark = path.resolve(__dirname, 'collections/Tenants/TenantEmailConfigs/hooks/configurePostmark.ts');
const configureStripeOnCustomDomainCreation = path.resolve(__dirname, 'collections/Tenants/Tenants/hooks/configureStripeOnCustomDomainCreation.ts');
const createPriceInStripe = path.resolve(__dirname, 'collections/Plans/hooks/createPriceInStripe.ts');

export default buildConfig({
  // serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: process.env.CORS_DOMAINS ? process.env.CORS_DOMAINS.split(',') : "*",
  rateLimit: {
    trustProxy: true
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    // css: path.resolve(__dirname, 'relative/path/to/stylesheet.scss'),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
          // Alias each server module path to the mockModulePath individually
          [configurePostmark]: mockModulePath,
          [configureStripeOnCustomDomainCreation]: mockModulePath,
          [createPriceInStripe]: mockModulePath,
        },
        fallback: { // Extend this section with additional polyfills
          os: require.resolve('os-browserify/browser'),
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer/'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          url: require.resolve('url/'),
          zlib: require.resolve('browserify-zlib'),
          crypto: require.resolve('crypto-browserify'),
          util: require.resolve('util/'),
          assert: require.resolve('assert/'),
          vm: require.resolve('vm-browserify'),
          fs: false, // fs is typically not needed on the client side
          net: false, // net is not available on the client side
          tls: false, // tls is not available on the client side
          dns: false, // dns is not available on the client side
          child_process: false, // child_process is not available on the client side
        },
      },
    }),
    components: {
      // Nav: {},
      graphics: {
        Logo: Logo,
        Icon: Icon,
      },
      // afterDashboard: [],
      // afterLogin: [],
      // beforeDashboard: [],
      // afterNavLinks: [],
      // actions: [],
      views: {
        // Account: [],
        // Dashboard: [],
        PricingPage: {
          Component: PricingPage,
          path: '/plans'
        },
        StripeCheckoutForm: {
          Component: StripeCheckoutForm,
          path: '/checkout/:priceId',
        },
        StripeCheckoutReturn: {
          Component: StripeCheckoutReturn,
          path: '/return',
          exact: true,
        },
      },
      // providers: [],
    },
    livePreview: {
      url: 'http://localhost:4321', // The URL to your front-end, this can also be a function (see below)
      collections: ['header', 'footer', 'pages', 'posts', 'events', 'comments', 'forms'], // The collections to enable Live Preview on (globals are also possible)
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: {
      titleSuffix: '- Bloom CMS',
      favicon: '/assets/icon.png',
      ogImage: '/assets/logo-with-image.png',
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      LinkFeature({
        // Example showing how to customize the built-in fields
        // of the Link feature
        fields: [
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            hasMany: true,
            options: ['noopener', 'noreferrer', 'nofollow'],
            admin: {
              description:
                'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
            },
          },
        ],
      }),
      UploadFeature({
        collections: {
          uploads: {
            // Example showing how to customize the built-in fields
            // of the Upload feature
            fields: [
              {
                name: 'caption',
                type: 'richText',
                editor: lexicalEditor(),
              },
            ],
          },
        },
      }),
      // This is incredibly powerful. You can re-use your Payload blocks
      // directly in the Lexical editor as follows:
      BlocksFeature({
        blocks: [
          // Banner,
          CallToAction,
          Media,
          FormBlock,
          Content,
        ],
      }),
    ]
  }),
  collections: [
    Users,
    TenantEmailConfigs,
    TenantStripeConfigs,
    Subscribers,
    EmailLists,
    OptInOptOutHistory,
    Customers,
    Plans,
    Tenants,
    Media,
    Categories,
    Posts,
    Pages,
    Events,
    Locations,
    Platforms,
    Newsletters,
    PostmarkTemplates,
    Header,
    Footer
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), stripePlugin(stripeConfig), formBuilder(formBuilderConfig), seo(seoGenerator),
  //    sentry({
  //   dsn: process.env.SENTRY_DSN,
  //   options: {
  //     init: {
  //       debug: process.env.SENTRY_DEBUG || false,
  //       environment: process.env.NODE_ENV,
  //       tracesSampleRate: 1.0,
  //     },
  //     requestHandler: {
  //       serverName: false,
  //       user: ["email"],
  //     },
  //     captureErrors: [400, 403, 404, 401, 405, 500, 502, 503],
  //   }
  // }),
  swagger({
    disableAccessAnalysis: true,
    exclude: {
      authPaths: false,
      authCollection: false,
      passwordRecovery: false,
      preferences: false,
      custom: false
    },
    routes: {
      swagger: '/api/docs', // Swagger UI route
      specs: '/api/specs', // OpenAPI specs route
      // license: '/api/license' // license route
    },
    ui: {
      deepLinking: true,
      displayOperationId: true,
    },
    throwOnError: true,
  }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    migrationDir: 'src/migrations'
  }),
})
