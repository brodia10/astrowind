// @ts-nocheck
/* eslint-disable */

// absolutely remove those lines when you are done with testing deployment lol ^^ ignoring typescript errors

import dotenv from 'dotenv'
import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { buildConfig } from 'payload/config'

// Stripe Imports

import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { postgresAdapter } from '@payloadcms/db-postgres'

// Plugin Imports
import formBuilder from "@payloadcms/plugin-form-builder"
import search from "@payloadcms/plugin-search"
import seo from '@payloadcms/plugin-seo'
import comments from 'payload-plugin-comments'

import { Events } from './collections/Events'
import { Media } from './collections/Media'
import Pages from './collections/Pages'
import { PostCategories } from './collections/PostCategories'
import { Posts } from './collections/Posts'
import { Tenants } from './collections/Tenants/Tenants'
import { Users } from './collections/Users'

// Branding Imports
import { Icon } from './components/icon'
import { Logo } from './components/logo'

// Plugin Imports
import { slateEditor } from '@payloadcms/richtext-slate'
import GlobalPlans from './collections/GlobalPlans'
import { TenantEmailConfigs } from './collections/Tenants/TenantEmailConfigs'
import TenantPlans from './collections/Tenants/TenantPlans'
import { TenantStripeConfigs } from './collections/Tenants/TenantStripeConfigs'
import commentsConfig from './plugins/comments'
import formBuilderConfig from './plugins/formBuilder.config'
import searchOptions from './plugins/search'
import seoGenerator from './plugins/seoGenerator'


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
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
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
  collections: [Users, TenantStripeConfigs, TenantEmailConfigs, GlobalPlans, TenantPlans, Tenants, Media, Posts, Pages, PostCategories, Events],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), formBuilder(formBuilderConfig), seo(seoGenerator), search(searchOptions), comments(commentsConfig),], // pass the stripe config to the stripe plugin
  // Configure the Mongoose adapter here
  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url: process.env.DATABASE_URI,
  }),
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URI,
  //   },
  // }),
})


