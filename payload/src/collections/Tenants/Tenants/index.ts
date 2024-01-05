import type { CollectionConfig } from 'payload/types'

import { superAdmins } from '../../../access/superAdmins'
import { tenantAdmins } from './access/tenantAdmins'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: superAdmins,
    read: tenantAdmins,
    update: tenantAdmins,
    delete: superAdmins,
  },
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Tenant',
    plural: 'Tenants',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          description: 'Manage your general settings here.',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'App Name',
              admin: { placeholder: 'Bloom', width: '25%', position: 'sidebar', description: 'The name of your app.' },
            },

            {
              name: 'streetAddress',
              label: 'Street Address',
              type: 'text',
              admin: {
                placeholder: '123 Main St.',
                width: '50%', // Adjust width as necessary
              },
            },
            {
              name: 'city',
              label: 'City',
              type: 'text',
              admin: {
                placeholder: 'Naples',
                width: '25%', // Adjust width as necessary
              },
            },
            {
              name: 'state',
              label: 'State/Province',
              type: 'text',
              admin: {
                placeholder: 'Campania',
                width: '25%', // Adjust width as necessary
              },
            },
            {
              name: 'postalCode',
              label: 'Postal Code',
              type: 'text',
              admin: {
                placeholder: '80100',
                width: '25%', // Adjust width as necessary
              },
            },
            {
              name: 'country',
              label: 'Country',
              type: 'text',
              admin: {
                placeholder: 'Italy',
                width: '25%', // Adjust width as necessary
              },
            },
            {
              name: 'contactEmail',
              label: 'Contact Email',
              type: 'email',
              admin: {
                placeholder: 'help@mycompany.com',
                width: '50%', // Adjust width as necessary
              },
            },
            {
              name: 'telephone',
              label: 'Telephone Number',
              type: 'text',
              admin: {
                placeholder: '+39 081 123 4567',
                width: '50%', // Adjust width as necessary
              },
            },
            {
              name: 'businessHours',
              label: 'Business Hours',
              type: 'text',
              admin: {
                width: '100%', // This field will take the full width of the row
              },
            },
          ],
        },
        {
          label: 'Brand',
          description: 'Manage your social media links and brand assets',
          fields: [
            // Branding Assets
            {
              name: 'brand_assets',
              label: 'Logo & Icon',
              type: 'group',
              fields: [
                {
                  name: 'logo',
                  label: 'Logo',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'icon',
                  label: 'Icon',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            // Social Networks
            {
              name: 'social_networks',
              label: 'Social Networks',
              type: 'group',
              fields: [
                { name: 'instagram', label: 'Instagram', type: 'text' },
                { name: 'facebook', label: 'Facebook', type: 'text' },
                { name: 'youtube', label: 'YouTube', type: 'text' },
                { name: 'twitter', label: 'Twitter', type: 'text' },
                { name: 'linkedin', label: 'LinkedIn', type: 'text' },
                { name: 'pinterest', label: 'Pinterest', type: 'text' },
                { name: 'snapchat', label: 'Snapchat', type: 'text' },
                { name: 'reddit', label: 'Reddit', type: 'text' },
                { name: 'tiktok', label: 'TikTok', type: 'text' },
                { name: 'tumblr', label: 'Tumblr', type: 'text' },
              ],
            },
            // Financial Platforms
            {
              name: 'financial_platforms',
              label: 'Financial Platforms',
              type: 'group',
              fields: [
                { name: 'venmo', label: 'Venmo', type: 'text' },
                { name: 'paypal', label: 'PayPal', type: 'text' },
                { name: 'patreon', label: 'Patreon', type: 'text' },
                { name: 'cashapp', label: 'CashApp', type: 'text' },
              ],
            },
            // Professional Networks
            {
              name: 'professional_networks',
              label: 'Professional Networks',
              type: 'group',
              fields: [
                { name: 'linkedin', label: 'LinkedIn', type: 'text' },
                { name: 'behance', label: 'Behance', type: 'text' },
                { name: 'dribbble', label: 'Dribbble', type: 'text' },
              ],
            },
            // Messaging Platforms
            {
              name: 'messaging_platforms',
              label: 'Messaging Platforms',
              type: 'group',
              fields: [
                { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
                { name: 'telegram', label: 'Telegram', type: 'text' },
                { name: 'signal', label: 'Signal', type: 'text' },
                { name: 'wechat', label: 'WeChat', type: 'text' },
                { name: 'line', label: 'Line', type: 'text' },
                { name: 'discord', label: 'Discord', type: 'text' },
                { name: 'slack', label: 'Slack', type: 'text' },
              ],
            },
            // Content Platforms
            {
              name: 'content_platforms',
              label: 'Content Platforms',
              type: 'group',
              fields: [
                { name: 'medium', label: 'Medium', type: 'text' },
                { name: 'spotify', label: 'Spotify', type: 'text' },
                { name: 'twitch', label: 'Twitch', type: 'text' },
                { name: 'vimeo', label: 'Vimeo', type: 'text' },
                { name: 'soundcloud', label: 'SoundCloud', type: 'text' },
                { name: 'bandcamp', label: 'Bandcamp', type: 'text' },
                { name: 'mixcloud', label: 'Mixcloud', type: 'text' },
                { name: 'flickr', label: 'Flickr', type: 'text' },
              ],
            },
            // Developer Platforms
            {
              name: 'developer_platforms',
              label: 'Developer Platforms',
              type: 'group',
              fields: [
                { name: 'github', label: 'GitHub', type: 'text' },
                { name: 'threads', label: 'Threads', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Domains',
          description: 'Manage your domains. All domains, including your automatically assigned Bloom subdomain and any custom domains, come with free SSL certificates for security.',
          fields: [
            {
              name: "freeBloomSubdomain",
              label: "Automatically assigned Bloom subdomain for your app",
              type: "text",
              defaultValue: "yourapp.bloomcms.io",
              admin: {
                placeholder: "yourapp.bloomcms.io",
                description: "Your automatically assigned Bloom subdomain."
              }
            },
            {
              name: "domains",
              label: "Custom Domains",
              type: "array",
              index: true,
              fields: [
                {
                  name: "domain",
                  type: "text",
                  required: true,
                  admin: {
                    placeholder: "example.com",
                    description: "Enter your custom domain (e.g., yourdomain.com) and configure it by adding a CNAME record pointing to your Bloom subdomain. Detailed instructions and links to popular domain registrars' documentation are provided below."
                  }
                }
              ],
              admin: {
                position: "sidebar",
                description: "To connect your custom domain, add a CNAME record in your DNS settings. The record should point to your Bloom subdomain (e.g., user123.bloomcms.io). This process typically takes a few minutes to a few hours. Refer to the following guides based on your domain registrar:\n- [GoDaddy DNS Management](https://www.godaddy.com/help/add-a-cname-record-19236)\n- [Namecheap Advanced DNS](https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-a-cname-record-for-my-domain/)\n- [Google Domains DNS Settings](https://support.google.com/domains/answer/9211383?hl=en)\n- [Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html)\n- [Cloudflare DNS Records](https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare)"
              }
            }
          ]
        },
        {
          label: 'Email',
          fields: [
            {
              name: 'emailConfig',
              label: 'Email Integration',
              type: 'relationship',
              relationTo: 'tenant-email-configs',
              required: false,
              hasMany: false,
              admin: {
                description: 'Manage your email integration here. Bloom provides email through resend by default. This includes SMTP and API keys for sending transactional emails.',
              },
            },
          ],
        },
        {
          label: 'Payments',
          description: 'Easily accept payments from your customers',
          fields: [
            {
              name: 'stripeConfig',
              label: 'Stripe Configuration',
              type: 'relationship',
              relationTo: 'tenant-stripe-configs',
              hasMany: false,
              required: false,
              admin: {
                description: 'Select the Stripe configuration for this tenant. This contains all the necessary Stripe details.',
              },
            },
          ],
        },
        {
          label: 'Plan',
          description: 'Your Bloom plan and billing',
          fields: [
            {
              name: 'globalPlan',
              type: 'relationship',
              relationTo: 'global-plans',
              required: true,
              hasMany: false,
            },
          ],
        },
      ],
    },
  ],
}
