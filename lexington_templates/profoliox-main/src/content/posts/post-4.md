---
pubDate: 2022-08-08
title: Best Practices for Responsive Web Design
author: Profolio X
description: "Responsive web design (RWD) is essential in today's mobile-first world, but implementing it can be tricky. In this post, we'll share best practices for RWD, from fluid grids and flexible images to media queries and responsive typography. By following these tips, you can ensure that your website looks great and functions well on any device."
image:
  url: "https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  alt: "The word “astro” against an illustration of planets and stars."
tags: ["astro", "successes"]
---
This theme comes with the [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) integration installed and configured in your `astro.config.mjs` config file. If you prefer not to use MDX, you can disable support by removing the integration from your config file.
## Why MDX?
MDX is a special flavor of Markdown that supports embedded JavaScript & JSX syntax. This unlocks the ability to [mix JavaScript and UI Components into your Markdown content](https://docs.astro.build/en/guides/markdown-content/#mdx-features) for things like interactive charts or alerts.
If you have existing content authored in MDX, this integration will hopefully make migrating to Astro a breeze.
## Example
Here is how you import and use a UI component inside of MDX.
When you open this page in the browser, you should see the clickable button below.
## More Links
- [MDX Syntax Documentation](https://mdxjs.com/docs/what-is-mdx)
- [Astro Usage Documentation](https://docs.astro.build/en/guides/markdown-content/#markdown-and-mdx-pages)
- **Note:** [Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives) are still required to create interactive components. Otherwise, all components in your MDX will render as static HTML (no JavaScript) by default.