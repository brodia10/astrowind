// @ts-nocheck
/* eslint-disable */

// absolutely remove those lines when you are done with testing deployment lol ^^ ignoring typescript errors

import dotenv from 'dotenv'
import path from 'path'

// Adapter Imports
import { postgresAdapter } from '@payloadcms/db-postgres'

// Payload Imports
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import formBuilder from "@payloadcms/plugin-form-builder"
import search from "@payloadcms/plugin-search"
import seo from '@payloadcms/plugin-seo'
import { slateEditor } from '@payloadcms/richtext-slate'
import comments from 'payload-plugin-comments'
import { buildConfig } from 'payload/config'

// Plugin Config Imports
import commentsConfig from './plugins/comments'
import formBuilderConfig from './plugins/formBuilder.config'
import searchOptions from './plugins/search'
import seoGenerator from './plugins/seoGenerator'

// Collection Imports
import Contacts from './collections/Contacts'
import EmailLists from './collections/EmailLists'
import { Events } from './collections/Events'
import GlobalPlans from './collections/GlobalPlans'
import { Media } from './collections/Media'
import OptInOptOutHistory from './collections/OptInOptOutHistory'
import Pages from './collections/Pages'
import { PostCategories } from './collections/PostCategories'
import { Posts } from './collections/Posts'
import { TenantEmailConfigs } from './collections/Tenants/TenantEmailConfigs'
import TenantPlans from './collections/Tenants/TenantPlans'
import { TenantStripeConfigs } from './collections/Tenants/TenantStripeConfigs'
import { Tenants } from './collections/Tenants/Tenants'
import { Users } from './collections/Users'

// Branding Imports
import { Icon } from './components/icon'
import { Logo } from './components/logo'


dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

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
      // afterNavLinks: [SiteLink],
      // afterDashboard: [SiteLink],
    },
  },
  editor: slateEditor({}),
  collections: [Users, TenantStripeConfigs, TenantEmailConfigs, GlobalPlans, TenantPlans, Contacts, EmailLists, OptInOptOutHistory, Tenants, Media, Posts, Pages, PostCategories, Events,],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), formBuilder(formBuilderConfig), seo(seoGenerator), search(searchOptions), comments(commentsConfig),],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})


