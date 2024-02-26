---
pubDate: 2022-07-08
title: Uses Shiki to style code
author: Flaco
description: "It uses TextMate grammar to tokenize strings, and colors the tokens with VS Code themes. In short, Shiki generates HTML that looks exactly like your code in VS Code, and it works great in your static website generator (or your dynamic website)."
image:
  url: "https://images.pexels.com/photos/6192117/pexels-photo-6192117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  alt: "Thumbnails of websites from the Astro Showcase site."
tags: ["lexington","blogging"]
---

 It uses TextMate grammar to tokenize strings, and colors the tokens with VS Code themes. In short, Shiki generates HTML that looks exactly like your code in VS Code, and it works great in your static website generator.
#### It's simple to use:
```js
// Example JavaScript
const shiki = require('shiki')
shiki.getHighlighter({
    theme: 'sequoia-monochrome'
}).then(highlighter => {
    console.log(highlighter.codeToHtml(`console.log('shiki');`, {
        lang: 'js'
    }))
})
// <pre class="shiki" style="background-color: #2e3440"><code>
//   <!-- Highlighted Code -->
// </code></pre>
```
### Here's Shiki using Shiki ( how meta ) and markdown-it to generate this page:
```js
const fs = require('fs')
const markdown = require('markdown-it')
const shiki = require('shiki')
shiki.getHighlighter({
  theme: 'sequoia-monochrome'
}).then(highlighter => {
  const md = markdown({
    html: true,
    highlight: (code, lang) => {
      return highlighter.codeToHtml(code, { lang })
    }
  })
  const html = md.render(fs.readFileSync('index.md', 'utf-8'))
  const out = `
    <title>Shiki</title>
    <link rel="stylesheet" href="style.css">
    ${html}
    <script src="index.js"></script>
  `
  fs.writeFileSync('index.html', out)
  console.log('done')
})
```
### Shiki can load any VS Code themes.:
```js
import { tokenColors } from "./custom-theme.json";
// https://astro.build/config
// VS Code Theme is:
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: {
        name: "custom",
        type: "dark",
        settings: tokenColors,
      },
      wrap: true,
      skipInline: false,
      drafts: false,
    },
  },
});
```
