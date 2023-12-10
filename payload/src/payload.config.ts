import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { Events } from './collections/Events'
import { FormSubmissions } from './collections/FormSubmissions'
import { Forms } from './collections/Forms'
import { Media } from './collections/Media'
import { PostCategories } from './collections/PostCategories'
import { Posts } from './collections/Posts'
import SEO from './collections/SEO'
import Users from './collections/Users'

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
  collections: [Users, Media, Posts, PostCategories, Events, Forms, FormSubmissions, SEO],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
