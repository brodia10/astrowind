import type { CollectionConfig } from 'payload/types'
import { CallToAction } from '../blocks/CallToAction'
import { CardGrid } from '../blocks/CardGrid'
import { CaseStudiesHighlight } from '../blocks/CaseStudiesHighlight'
import { CodeFeature } from '../blocks/CodeFeature'
import { Content } from '../blocks/Content'
import { ContentGrid } from '../blocks/ContentGrid'
import { FormBlock } from '../blocks/Form'
import { HoverHighlights } from '../blocks/HoverHighlights'
import { LinkGrid } from '../blocks/LinkGrid'
import { MediaBlock } from '../blocks/Media'
import { MediaContent } from '../blocks/MediaContent'
import { Pricing } from '../blocks/Pricing'
import { ReusableContent } from '../blocks/ReusableContent'
import { Slider } from '../blocks/Slider'
import { Steps } from '../blocks/Steps'
import { StickyHighlights } from '../blocks/StickyHighlights'
import richText from '../fields/richText'
import largeBody from '../fields/richText/largeBody'
import { revalidatePage } from '../utilities/revalidatePage'
import { tenantAdmins } from './Users/access/tenantAdmins'


export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    // preview: doc => FormBlockatPreviewURL('case-studies', doc),
  },
  versions: {
    drafts: true,
  },
  access: {
    create: tenantAdmins,
    read: tenantAdmins,
    readVersions: tenantAdmins,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  hooks: {
    afterChange: [
      ({ req: { payload }, doc }) => {
        revalidatePage({
          payload,
          collection: 'case-studies',
          doc,
        })
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    richText({
      name: 'introContent',
    }, {
      elements: ['h1', largeBody],
      leaves: ['underline'],
    }),
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        CallToAction,
        CardGrid,
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
        ReusableContent,
        Slider,
        Steps,
        StickyHighlights,
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
