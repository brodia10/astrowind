import type { CollectionConfig } from 'payload/types'

import { ColourPickerField, TelephoneField } from '@nouance/payload-better-fields-plugin'
import { tenantAdmins } from './access/tenantAdmins'
import generateTenantSubdomains from './hooks/generateSubdomains'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: tenantAdmins,
    read: tenantAdmins,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  hooks: {
    beforeChange: [generateTenantSubdomains],
  },
  admin: {
    useAsTitle: 'company.name',
    group: 'Team'
  },
  labels: {
    singular: 'Account Settings',
    plural: 'Account Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          description: 'Manage your social media links and brand assets',
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'Brand',
                  description: 'Manage your company information, brand assets, and theme colors.',
                  fields: [
                    {
                      name: 'brandAssets',
                      label: 'Brand Assets',
                      type: 'group',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'logo',
                              label: 'Logo',
                              type: 'upload',
                              relationTo: 'media',
                              admin: {
                                width: '50%',
                                description: 'Upload your company logo.',
                              },
                            },
                            {
                              name: 'icon',
                              label: 'Icon',
                              type: 'upload',
                              relationTo: 'media',
                              admin: {
                                width: '50%',
                                description: 'Upload your company icon.',
                              },
                            },
                          ],
                        },
                      ],
                    },
                    // Separate Group for Theme Colors
                    {
                      name: 'themeColors',
                      label: 'Theme Colors',
                      type: 'group',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            // Assuming ColourPickerField is correctly structured for your setup
                            ...ColourPickerField(
                              {
                                name: 'primaryColor',
                                defaultValue: 'hsla(54, 100%, 50%, 1)',
                                admin: {
                                  width: '50%',
                                  description: 'Choose the primary color for your brand.',
                                },
                              },
                              {
                                type: 'hslA',
                              },
                            ),
                            ...ColourPickerField(
                              {
                                name: 'secondaryColor',
                                defaultValue: 'hsla(211, 100%, 50%, 1)',
                                admin: {
                                  width: '50%',
                                  description: 'Choose the secondary color for your brand.',
                                },
                              },
                              {
                                type: 'hslA',
                              },
                            ),
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ]
        },
        {
          label: 'Company',
          name: 'company',
          description: 'Manage your general settings here.',
          admin: { position: 'sidebar' },
          fields: [
            // Row for Telephone and Business Hours
            {
              name: 'name',
              label: 'Company Name',
              type: 'text',
              admin: {
                placeholder: 'My Company',
                position: 'sidebar'
              }
            },
            {
              name: 'telephone',
              label: 'Contact',
              type: 'group',
              fields: [
                ...TelephoneField({
                  name: 'telephone',
                  admin: {
                    placeholder: '+1 2133 734 253',
                    description: "Add your phone number here.",
                    position: 'sidebar',
                  },
                }),
                {
                  name: 'businessHours',
                  label: 'Business Hours',
                  type: 'textarea',

                  admin: {
                    position: 'sidebar',
                    description: 'Add your business hours here.'
                  },
                },
              ],
            },
            // Row for Address Details: Street Address and City
            {
              type: 'row',
              fields: [
                {
                  name: 'streetAddress',
                  label: 'Street Address',
                  type: 'text',
                  admin: {
                    placeholder: '123 Main St.',
                    width: '75%', // Increased width for better alignment
                  },
                },
                {
                  name: 'city',
                  label: 'City',
                  type: 'text',
                  admin: {
                    placeholder: 'Naples',
                    width: '25%',
                  },
                },
              ],
            },
            // Row for State/Province, Postal Code, and Country
            {
              type: 'row',
              fields: [
                {
                  name: 'state',
                  label: 'State/Province',
                  type: 'text',
                  admin: {
                    placeholder: 'Campania',
                    width: '33.33%',
                  },
                },
                {
                  name: 'postalCode',
                  label: 'Postal Code',
                  type: 'text',
                  admin: {
                    placeholder: '80100',
                    width: '33.33%',
                  },
                },
                {
                  name: 'country',
                  label: 'Country',
                  type: 'text',
                  admin: {
                    placeholder: 'Italy',
                    width: '33.33%',
                  },
                },
              ],
            },
          ],

        },
        {
          label: 'Domains',
          description: 'A domain is your website name (bloomcms.io) where your website lives. All domains, including your free Bloom subdomain and any custom domains, come with free SSL certificates for security.',
          fields: [
            {
              name: "domains",
              label: "Domains",
              type: "array",
              index: true,
              fields: [
                {
                  name: "domain",
                  type: "text",
                  required: true,
                  admin: {
                    placeholder: "example.com",
                    description: "Enter your custom domain (e.g., yourdomain.com) and configure it by adding a CNAME record pointing to your Bloom subdomain. Detailed instructions and links to popular domain registrars' documentation are provided below.",
                  }
                },
                {
                  name: "autoGenerated",
                  type: "checkbox",
                  required: true,
                  defaultValue: false,
                  admin: {
                    description: "This domain was automatically generated for your site by Bloom. All free domains come with free SSL Certificates."
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
          description: 'Manage your tenant\'s email configuration settings here. This includes configuring SMTP settings, sender information, and more.',
          fields: [
            {
              name: 'emailConfig',
              label: 'Email',
              type: 'relationship',
              relationTo: 'tenant-email-configs',
              required: false,
              unique: true, // Ensures that each tenant is linked to a unique email configuration
              admin: {
                description: 'The email configuration associated with this tenant. This allows for customization of email settings specific to each tenant.',
              },
            }
          ]
        },
      ],
    },
  ],
}
