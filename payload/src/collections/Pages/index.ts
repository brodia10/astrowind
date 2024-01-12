import type { CollectionConfig } from 'payload/types'
import { CallToAction } from '../../blocks/CallToAction'
import { CardGrid } from '../../blocks/CardGrid'
import { CaseStudiesHighlight } from '../../blocks/CaseStudiesHighlight'
import { CaseStudyCards } from '../../blocks/CaseStudyCards'
import { CodeFeature } from '../../blocks/CodeFeature'
import { Content } from '../../blocks/Content'
import { ContentGrid } from '../../blocks/ContentGrid'
import { ExampleTabs } from '../../blocks/ExampleTabs'
import { FormBlock } from '../../blocks/Form'
import { HoverHighlights } from '../../blocks/HoverHighlights'
import { LinkGrid } from '../../blocks/LinkGrid'
import { MediaBlock } from '../../blocks/MediaBlock'
import { MediaContent } from '../../blocks/MediaContent'
import { Pricing } from '../../blocks/Pricing'
import { Slider } from '../../blocks/Slider'
import { Steps } from '../../blocks/Steps'
import { StickyHighlights } from '../../blocks/StickyHighlights'
import { fullTitle } from '../../fields/fullTitle'
import { hero } from '../../fields/hero'
import { formatPreviewURL } from '../../utilities/formatPreviewURL'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'fullTitle',
    preview: doc => formatPreviewURL('pages', doc),
    defaultColumns: ['fullTitle', 'slug', 'createdAt', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    create: loggedIn && tenantAdmins,
    read: tenants,
    readVersions: tenants,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  hooks: {
    // afterChange: [
    //   ({ req: { payload }, doc }) => {
    //     revalidatePage({
    //       payload,
    //       collection: { slug: 'pages' }, // Update the collection property to be of type SanitizedCollectionConfig
    //       doc,
    //     })
    //   },
    // ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    fullTitle,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                CallToAction,
                CardGrid,
                CaseStudyCards,
                CaseStudiesHighlight,
                CodeFeature,
                Content,
                ContentGrid,
                FormBlock,
                HoverHighlights,
                LinkGrid,
                MediaBlock,
                MediaContent,
                Pricing,
                Slider,
                Steps,
                StickyHighlights,
                ExampleTabs,
              ],
            },
          ],
        },

      ],
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
