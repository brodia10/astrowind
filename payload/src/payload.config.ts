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
import { TenantStripeConfigs } from './collections/Tenants/TenantStripeConfigs'
import { Tenants } from './collections/Tenants/Tenants'
import { Users } from './collections/Users'

// Branding Imports
import { payloadCloud } from '@payloadcms/plugin-cloud'
import search from "@payloadcms/plugin-search"
import seo from '@payloadcms/plugin-seo'
import { CallToAction } from './blocks/CallToAction'
import { Content } from './blocks/Content'
import { FormBlock } from './blocks/Form'
import Categories from './collections/Categories'
import Events from './collections/Events'
import Locations from './collections/Locations'
import Platforms from './collections/Platform'
import Subscribers from './collections/Subscribers'
import { Icon } from './components/icon'
import { Logo } from './components/logo'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import { Footer } from './globals/footer'
import searchOptions from './plugins/search'
import seoGenerator from './plugins/seoGenerator'


// Resolve .env
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

// Aliases for excluding server modules from the React Admin bundle. See here https://payloadcms.com/docs/admin/excluding-server-code
const mockModulePath = path.resolve(__dirname, 'mocks/modules.js')
const fullFilePath = path.resolve(
  __dirname,
  'collections/Tenants/TenantEmailConfigs/hooks/configurePostmark'
)

export default buildConfig({
  // serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: process.env.CORS_DOMAINS ? process.env.CORS_DOMAINS.split(',') : "*",
  rateLimit: {
    trustProxy: true
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
          [fullFilePath]: mockModulePath,
        },
        fallback: { // Extend this section with additional polyfills
          os: require.resolve('os-browserify/browser'),
          stream: require.resolve('stream-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          url: require.resolve('url/'),
          zlib: require.resolve('browserify-zlib'),
          crypto: require.resolve('crypto-browserify'),
          util: require.resolve('util/'),
          assert: require.resolve('assert/'),
          fs: false, // fs is typically not needed on the client side
          net: false, // net is not available on the client side
          tls: false, // tls is not available on the client side
          dns: false, // dns is not available on the client side
          child_process: false, // child_process is not available on the client side
        },
      },
    }),
    livePreview: {
      url: 'http://localhost:4321', // The URL to your front-end, this can also be a function (see below)
      collections: ['pages', 'posts', 'events', 'comments', 'forms'], // The collections to enable Live Preview on (globals are also possible)
      globals: ['header', 'footer', 'settings'],
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
    components: {
      graphics: {
        Logo,
        Icon,
      },
      // afterNavLinks: [],
      // afterDashboard: [SiteLink],
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
  collections: [Users, TenantStripeConfigs, TenantEmailConfigs, Subscribers, EmailLists, OptInOptOutHistory, Tenants, Media, Categories, Posts, Pages, Events, Locations, Platforms],
  globals: [Header, Footer, Settings],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), formBuilder(formBuilderConfig), seo(seoGenerator), search(searchOptions),],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
