// @ts-nocheck
/* eslint-disable */

// absolutely remove those lines when you are done with testing deployment lol ^^ ignoring typescript errors

import dotenv from 'dotenv'
import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { postgresAdapter } from '@payloadcms/db-postgres'
import formBuilder from "@payloadcms/plugin-form-builder"
import search from "@payloadcms/plugin-search"
import seo from '@payloadcms/plugin-seo'
import comments from 'payload-plugin-comments'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import Pages from './collections/Pages'
import { PostCategories } from './collections/PostCategories'
import { Posts } from './collections/Posts'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'

// Branding Imports
import { Icon } from './components/icon'
import { Logo } from './components/logo'

// Plugin Imports
import commentsConfig from './plugins/comments'
import formBuilderConfig from './plugins/formBuilder.config'
import searchOptions from './plugins/search'
import seoGenerator from './plugins/seoGenerator'


console.log('process.env.DATABASE_URI', process.env.DATABASE_URI)

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
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
      collections: ['pages', 'posts', 'events', 'comments', 'customForms'], // The collections to enable Live Preview on (globals are also possible)
    },
    meta: {
      titleSuffix: '- Custom Title',
      favicon: '/assets/favicon.svg',
      ogImage: '/assets/logo.svg',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },

  editor: slateEditor({}),
  collections: [Users, Tenants, Media, Posts, Pages, PostCategories, Events],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), formBuilder(formBuilderConfig), seo(seoGenerator), search(searchOptions), comments(commentsConfig),],
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


