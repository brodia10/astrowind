import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { postgresAdapter } from '@payloadcms/db-postgres'
import formBuilder from "@payloadcms/plugin-form-builder"
import seo from '@payloadcms/plugin-seo'

import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { PostCategories } from './collections/PostCategories'
import { Posts } from './collections/Posts'
import Tenants from './collections/Tenants'
import Users from './collections/Users'
import formBuilderConfig from './plugins/formBuilder.config'
import seoGenerator from './plugins/seoGenerator'
console.log('process.env.DATABASE_URI', process.env.DATABASE_URI)


export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    // meta: {
    //   titleSuffix: '',
    //   favicon: '/assets/favicon.svg',
    //   ogImage: '/assets/logo.svg',
    // },
  },
  editor: slateEditor({}),
  collections: [Users, Media, Posts, PostCategories, Events, Tenants],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), formBuilder(formBuilderConfig), seo(seoGenerator)],
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

