import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { postgresAdapter } from '@payloadcms/db-postgres'
import formBuilder from "@payloadcms/plugin-form-builder"
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { PostCategories } from './collections/PostCategories'
import { Posts } from './collections/Posts'
import SEO from './collections/SEO'
import Users from './collections/Users'
import formBuilderConfig from './formBuilder.config'

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
  collections: [Users, Media, Posts, PostCategories, Events, SEO],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), formBuilder(formBuilderConfig)],
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


